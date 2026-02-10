"""
whatismydns — Flask Backend (v3)
Comprehensive DNS + WHOIS + SSL + HTTP lookup + What's My IP tool.
No paid APIs. Free geo via ip-api.com.
Multi-language SEO optimized.
"""

import re
import json
import socket
import ssl

import datetime
from flask import Flask, render_template, jsonify, request

import dns.resolver
import dns.reversename
import whois

app = Flask(__name__)


# ═══════════════════════════════════════════════════════════════
#  HELPERS
# ═══════════════════════════════════════════════════════════════

def validate_domain(domain: str) -> str:
    """Clean and validate a domain string."""
    domain = domain.strip().lower()
    domain = re.sub(r'^https?://', '', domain)
    domain = domain.split('/')[0].split(':')[0]
    if not re.match(r'^([a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$', domain):
        raise ValueError(f"Invalid domain: {domain}")
    return domain


def resolve_records(domain: str, rdtype: str, timeout: float = 5.0):
    """Resolve DNS records of a specific type."""
    results = []
    try:
        resolver = dns.resolver.Resolver()
        resolver.timeout = timeout
        resolver.lifetime = timeout
        answers = resolver.resolve(domain, rdtype)
        ttl = answers.rrset.ttl if answers.rrset else None

        for rdata in answers:
            entry = {"value": rdata.to_text(), "ttl": ttl}

            if rdtype == "MX":
                entry["priority"] = rdata.preference
                entry["exchange"] = str(rdata.exchange)

            if rdtype == "SOA":
                entry.update({
                    "mname":   str(rdata.mname),
                    "rname":   str(rdata.rname),
                    "serial":  rdata.serial,
                    "refresh": rdata.refresh,
                    "retry":   rdata.retry,
                    "expire":  rdata.expire,
                    "minimum": rdata.minimum,
                })

            results.append(entry)
    except Exception:
        pass
    return results


def get_ip_addresses(domain: str):
    """Resolve IPv4 / IPv6 via socket.getaddrinfo."""
    ipv4, ipv6 = [], []
    try:
        for fam, _, _, _, addr in socket.getaddrinfo(domain, None):
            ip = addr[0]
            if fam == socket.AF_INET and ip not in ipv4:
                ipv4.append(ip)
            elif fam == socket.AF_INET6 and ip not in ipv6:
                ipv6.append(ip)
    except Exception:
        pass
    return ipv4, ipv6


def reverse_dns(ip: str) -> str | None:
    """PTR lookup."""
    try:
        rev = dns.reversename.from_address(ip)
        ans = dns.resolver.resolve(rev, "PTR")
        return str(ans[0])
    except Exception:
        return None


def ping_domain(domain: str) -> dict:
    """Reachability test via TCP socket (serverless-compatible)."""
    import time
    try:
        times = []
        for _ in range(2):
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(3)
            start = time.time()
            sock.connect((domain, 443))
            elapsed = (time.time() - start) * 1000  # ms
            times.append(elapsed)
            sock.close()
        avg_ms = int(sum(times) / len(times))
        return {"reachable": True, "avg_ms": avg_ms}
    except Exception:
        return {"reachable": False, "avg_ms": None}


def get_geo_info(ip: str) -> dict | None:
    """Free geo lookup via ip-api.com."""
    import urllib.request
    try:
        url = f"http://ip-api.com/json/{ip}?fields=status,country,countryCode,regionName,city,isp,org,as,query,lat,lon,timezone"
        req = urllib.request.Request(url, headers={"User-Agent": "MyDNS/3.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            d = json.loads(resp.read().decode())
            if d.get("status") == "success":
                return {
                    "ip":           d.get("query"),
                    "country":      d.get("country"),
                    "countryCode":  d.get("countryCode"),
                    "region":       d.get("regionName"),
                    "city":         d.get("city"),
                    "isp":          d.get("isp"),
                    "org":          d.get("org"),
                    "asn":          d.get("as"),
                    "lat":          d.get("lat"),
                    "lon":          d.get("lon"),
                    "timezone":     d.get("timezone"),
                }
    except Exception:
        pass
    return None


def _dt_to_str(dt):
    """Convert datetime / list-of-datetimes to ISO string."""
    if isinstance(dt, list):
        dt = dt[0] if dt else None
    if isinstance(dt, datetime.datetime):
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    return str(dt) if dt else None


def get_whois_info(domain: str) -> dict | None:
    """WHOIS lookup for domain registration / expiry dates."""
    try:
        w = whois.whois(domain)
        if not w or not w.domain_name:
            return None

        domain_name = w.domain_name
        if isinstance(domain_name, list):
            domain_name = domain_name[0]

        return {
            "domain_name":      str(domain_name) if domain_name else None,
            "registrar":        w.registrar,
            "creation_date":    _dt_to_str(w.creation_date),
            "expiration_date":  _dt_to_str(w.expiration_date),
            "updated_date":     _dt_to_str(w.updated_date),
            "name_servers":     list(set(
                [str(ns).lower() for ns in w.name_servers]
            )) if w.name_servers else [],
            "status":           w.status if isinstance(w.status, list) else (
                [w.status] if w.status else []
            ),
            "registrant_country": getattr(w, 'country', None),
            "dnssec":           getattr(w, 'dnssec', None),
        }
    except Exception:
        return None


def get_ssl_info(domain: str) -> dict | None:
    """Fetch SSL certificate information."""
    try:
        ctx = ssl.create_default_context()
        with ctx.wrap_socket(socket.socket(), server_hostname=domain) as s:
            s.settimeout(5)
            s.connect((domain, 443))
            cert = s.getpeercert()

        subject = dict(x[0] for x in cert.get("subject", []))
        issuer  = dict(x[0] for x in cert.get("issuer", []))

        not_before = cert.get("notBefore")
        not_after  = cert.get("notAfter")

        # Parse dates
        fmt = "%b %d %H:%M:%S %Y %Z"
        exp_dt = datetime.datetime.strptime(not_after, fmt) if not_after else None
        days_left = (exp_dt - datetime.datetime.utcnow()).days if exp_dt else None

        return {
            "subject":       subject.get("commonName", "—"),
            "issuer":        issuer.get("organizationName", issuer.get("commonName", "—")),
            "not_before":    not_before,
            "not_after":     not_after,
            "days_left":     days_left,
            "serial_number": cert.get("serialNumber"),
            "version":       cert.get("version"),
            "san":           [e[1] for e in cert.get("subjectAltName", [])],
        }
    except Exception:
        return None


def get_http_headers(domain: str) -> dict | None:
    """Fetch HTTP response headers."""
    import urllib.request
    try:
        req = urllib.request.Request(
            f"https://{domain}",
            method="HEAD",
            headers={"User-Agent": "MyDNS/3.0"},
        )
        with urllib.request.urlopen(req, timeout=5) as resp:
            important = [
                "Server", "Content-Type", "X-Powered-By",
                "Strict-Transport-Security", "X-Frame-Options",
                "X-Content-Type-Options", "Content-Security-Policy",
                "X-XSS-Protection", "Referrer-Policy",
                "Permissions-Policy",
            ]
            headers = {}
            for key in important:
                val = resp.headers.get(key)
                if val:
                    headers[key] = val
            return headers if headers else None
    except Exception:
        return None


def get_visitor_ip():
    """Get the real IP address of the visitor."""
    # Check proxy headers first
    if request.headers.get('X-Forwarded-For'):
        ip = request.headers['X-Forwarded-For'].split(',')[0].strip()
    elif request.headers.get('X-Real-IP'):
        ip = request.headers['X-Real-IP']
    else:
        ip = request.remote_addr
    return ip


# ═══════════════════════════════════════════════════════════════
#  ROUTES
# ═══════════════════════════════════════════════════════════════

@app.route("/")
def index():
    return render_template("index.html")


# SEO-friendly language-specific routes
@app.route("/uz")
@app.route("/uz/dns-tekshirish")
@app.route("/uz/mening-ip-manzilim")
def index_uz():
    return render_template("index.html", lang="uz")


@app.route("/ru")
@app.route("/ru/dns-proverka")
@app.route("/ru/moy-ip-adres")
def index_ru():
    return render_template("index.html", lang="ru")


@app.route("/en")
@app.route("/en/dns-lookup")
@app.route("/en/whats-my-ip")
def index_en():
    return render_template("index.html", lang="en")


# Category pages for SEO
@app.route("/<lang>/dns-checker")
@app.route("/<lang>/whois-lookup")
@app.route("/<lang>/ssl-checker")
@app.route("/<lang>/ip-lookup")
def category_pages(lang):
    if lang not in ('uz', 'ru', 'en'):
        return render_template("index.html")
    return render_template("index.html", lang=lang)


@app.route("/api/myip")
def api_myip():
    """Get visitor's IP address and geo information."""
    ip = get_visitor_ip()
    geo = get_geo_info(ip)

    if geo:
        return jsonify({
            "ip":           geo["ip"],
            "country":      geo["country"],
            "countryCode":  geo["countryCode"],
            "region":       geo["region"],
            "city":         geo["city"],
            "isp":          geo["isp"],
            "org":          geo["org"],
            "asn":          geo["asn"],
            "lat":          geo["lat"],
            "lon":          geo["lon"],
            "timezone":     geo["timezone"],
        })
    else:
        # Return the IP even if geo lookup fails
        return jsonify({
            "ip":           ip,
            "country":      None,
            "countryCode":  None,
            "region":       None,
            "city":         None,
            "isp":          None,
            "org":          None,
            "asn":          None,
            "lat":          None,
            "lon":          None,
            "timezone":     None,
        })


@app.route("/api/lookup", methods=["POST"])
def api_lookup():
    """Main DNS lookup endpoint — returns comprehensive JSON."""
    data = request.get_json(silent=True) or {}
    raw = data.get("domain", "").strip()

    if not raw:
        return jsonify({"error": "Domain is required."}), 400

    try:
        domain = validate_domain(raw)
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

    # Domain existence check
    domain_exists = True
    try:
        dns.resolver.resolve(domain, "A")
    except dns.resolver.NXDOMAIN:
        domain_exists = False
    except Exception:
        pass

    # DNS records
    records = {}
    for rtype in ("A", "AAAA", "NS", "MX", "TXT", "CNAME", "SOA"):
        records[rtype] = resolve_records(domain, rtype)

    # IPs
    ipv4, ipv6 = get_ip_addresses(domain)
    primary_ip = ipv4[0] if ipv4 else None

    # Reverse DNS
    ptr = reverse_dns(primary_ip) if primary_ip else None

    # Geo
    geo = get_geo_info(primary_ip) if primary_ip else None

    # Ping
    ping = ping_domain(domain)

    # WHOIS
    whois_info = get_whois_info(domain)

    # SSL
    ssl_info = get_ssl_info(domain)

    # HTTP headers
    http_headers = get_http_headers(domain)

    return jsonify({
        "domain":       domain,
        "exists":       domain_exists,
        "ip_addresses": {"ipv4": ipv4, "ipv6": ipv6},
        "records":      records,
        "reverse_dns":  ptr,
        "geo":          geo,
        "ping":         ping,
        "whois":        whois_info,
        "ssl":          ssl_info,
        "http_headers": http_headers,
    })


# ═══════════════════════════════════════════════════════════════
#  SITEMAP for SEO
# ═══════════════════════════════════════════════════════════════

@app.route("/sitemap.xml")
def sitemap():
    """Generate dynamic sitemap for SEO."""
    base = request.url_root.rstrip('/')
    pages = [
        "/", "/uz", "/ru", "/en",
        "/uz/dns-tekshirish", "/uz/mening-ip-manzilim",
        "/ru/dns-proverka", "/ru/moy-ip-adres",
        "/en/dns-lookup", "/en/whats-my-ip",
        "/uz/dns-checker", "/uz/whois-lookup", "/uz/ssl-checker", "/uz/ip-lookup",
        "/ru/dns-checker", "/ru/whois-lookup", "/ru/ssl-checker", "/ru/ip-lookup",
        "/en/dns-checker", "/en/whois-lookup", "/en/ssl-checker", "/en/ip-lookup",
    ]

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'

    for page in pages:
        xml += f'  <url>\n'
        xml += f'    <loc>{base}{page}</loc>\n'
        xml += f'    <changefreq>weekly</changefreq>\n'
        xml += f'    <priority>{"1.0" if page == "/" else "0.8"}</priority>\n'
        xml += f'  </url>\n'

    xml += '</urlset>'

    return xml, 200, {'Content-Type': 'application/xml'}


@app.route("/robots.txt")
def robots():
    """Robots.txt for SEO."""
    base = request.url_root.rstrip('/')
    txt = f"""User-agent: *
Allow: /
Sitemap: {base}/sitemap.xml
"""
    return txt, 200, {'Content-Type': 'text/plain'}


# ═══════════════════════════════════════════════════════════════
#  RUN
# ═══════════════════════════════════════════════════════════════

if __name__ == "__main__":
    app.run(debug=True, port=5000)
