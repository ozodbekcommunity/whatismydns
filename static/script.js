/**
 * whatismydns — Frontend Logic
 * Multi-language (uz / ru / en), DNS + WHOIS + SSL + HTTP lookup + What's My IP
 * Two-panel layout: Sidebar IP | Main DNS Lookup
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════
  //  TRANSLATIONS
  // ═══════════════════════════════════════════════════════════

  const LANG = {
    en: {
      heroBadge: "Free DNS & IP Lookup Tool",
      heroTitle1: "Analyze Any ",
      heroTitle2: "Domain ",
      heroTitle3: "in Seconds",
      heroSub: "Comprehensive DNS, WHOIS, SSL, IP lookup & What's My IP — no API keys required.",
      inputPlaceholder: "Enter a domain, e.g. google.com",
      btnCheck: "Check",
      quickLabel: "Try:",
      errorEmpty: "Please enter a domain name.",
      errorGeneric: "Failed to connect to server.",
      sidebarIpTitle: "Your IP Address",
      myipLoading: "Detecting...",
      myipLabel: "Your IP Address",
      myipCountry: "Country",
      myipCity: "City / Region",
      myipISP: "ISP / Provider",
      myipTimezone: "Timezone",
      myipCopied: "Copied!",
      catDNS: "DNS Lookup",
      catWHOIS: "WHOIS",
      catSSL: "SSL Checker",
      catIP: "IP Lookup",
      reachable: "Reachable",
      unreachable: "Unreachable",
      ping: "Ping",
      statRecords: "DNS Records",
      statPing: "Avg Ping",
      statSSL: "SSL Days Left",
      statExpiry: "Domain Expiry",
      secIP: "IP Addresses",
      secA: "A Records",
      secAAAA: "AAAA Records",
      secNS: "NS Records",
      secMX: "MX Records",
      secTXT: "TXT Records",
      secCNAME: "CNAME Records",
      secSOA: "SOA Record",
      secPTR: "Reverse DNS (PTR)",
      secGeo: "Geo & Network Info",
      secWHOIS: "WHOIS / Domain Info",
      secSSL: "SSL Certificate",
      secHTTP: "HTTP Security Headers",
      thAddress: "Address",
      thTTL: "TTL",
      thNameserver: "Nameserver",
      thPriority: "Priority",
      thExchange: "Exchange",
      thValue: "Value",
      thAlias: "Alias",
      thHeader: "Header",
      kvIPv4: "IPv4",
      kvIPv6: "IPv6",
      kvPrimaryNS: "Primary NS",
      kvAdminEmail: "Admin Email",
      kvSerial: "Serial",
      kvRefresh: "Refresh",
      kvRetry: "Retry",
      kvExpire: "Expire",
      kvMinTTL: "Min TTL",
      kvPTR: "PTR",
      kvCountry: "Country",
      kvRegion: "Region",
      kvCity: "City",
      kvISP: "ISP",
      kvOrg: "Organization",
      kvASN: "ASN",
      kvRegistrar: "Registrar",
      kvCreated: "Created",
      kvExpires: "Expires",
      kvUpdated: "Updated",
      kvNameservers: "Nameservers",
      kvStatus: "Status",
      kvDNSSEC: "DNSSEC",
      kvSubject: "Subject",
      kvIssuer: "Issuer",
      kvValidFrom: "Valid From",
      kvValidTo: "Valid To",
      kvDaysLeft: "Days Left",
      kvSAN: "Alt Names",
      noRecords: "No records found",
      noPTR: "No PTR record found",
      footer1: "whatismydns — Free DNS Lookup & IP Address Tool",
      footer2: "No API keys required",
      seoDnsTitle: "DNS Lookup Tool",
      seoDnsText: "Check A, AAAA, NS, MX, TXT, CNAME, and SOA records for any domain. Our free DNS checker provides comprehensive domain analysis with real-time results.",
      seoWhoisTitle: "WHOIS Lookup",
      seoWhoisText: "Find domain registration details including registrar, creation date, expiration date, nameservers, and DNSSEC status. Free WHOIS domain lookup.",
      seoSslTitle: "SSL Certificate Checker",
      seoSslText: "Verify SSL certificate validity, issuer, expiration date, and Subject Alternative Names. Ensure your website's security with our free SSL checker.",
      seoIpTitle: "What's My IP Address",
      seoIpText: "Instantly detect your public IP address, country, city, ISP, and timezone. Free IP geolocation service with accurate results.",
      flinkDns: "DNS Lookup",
      flinkWhois: "WHOIS",
      flinkSsl: "SSL Checker",
      flinkIp: "What's My IP",
      flinkIpLookup: "IP Lookup",
    },

    ru: {
      heroBadge: "Бесплатный DNS и IP инструмент",
      heroTitle1: "Анализ любого ",
      heroTitle2: "домена ",
      heroTitle3: "за секунды",
      heroSub: "Полный DNS, WHOIS, SSL, IP анализ и определение IP — без API-ключей.",
      inputPlaceholder: "Введите домен, например google.com",
      btnCheck: "Проверить",
      quickLabel: "Примеры:",
      errorEmpty: "Пожалуйста, введите доменное имя.",
      errorGeneric: "Не удалось подключиться к серверу.",
      sidebarIpTitle: "Ваш IP-адрес",
      myipLoading: "Определение...",
      myipLabel: "Ваш IP-адрес",
      myipCountry: "Страна",
      myipCity: "Город / Регион",
      myipISP: "Провайдер",
      myipTimezone: "Часовой пояс",
      myipCopied: "Скопировано!",
      catDNS: "DNS Проверка",
      catWHOIS: "WHOIS",
      catSSL: "SSL Проверка",
      catIP: "IP Поиск",
      reachable: "Доступен",
      unreachable: "Недоступен",
      ping: "Пинг",
      statRecords: "DNS записей",
      statPing: "Сред. пинг",
      statSSL: "SSL дней",
      statExpiry: "Срок домена",
      secIP: "IP адреса",
      secA: "A записи",
      secAAAA: "AAAA записи",
      secNS: "NS записи",
      secMX: "MX записи",
      secTXT: "TXT записи",
      secCNAME: "CNAME записи",
      secSOA: "SOA запись",
      secPTR: "Обратный DNS (PTR)",
      secGeo: "Гео и сеть",
      secWHOIS: "WHOIS / Инфо о домене",
      secSSL: "SSL сертификат",
      secHTTP: "HTTP заголовки безопасности",
      thAddress: "Адрес",
      thTTL: "TTL",
      thNameserver: "Сервер имён",
      thPriority: "Приоритет",
      thExchange: "Обменник",
      thValue: "Значение",
      thAlias: "Алиас",
      thHeader: "Заголовок",
      kvIPv4: "IPv4",
      kvIPv6: "IPv6",
      kvPrimaryNS: "Основной NS",
      kvAdminEmail: "Email админа",
      kvSerial: "Серийный №",
      kvRefresh: "Обновление",
      kvRetry: "Повтор",
      kvExpire: "Истечение",
      kvMinTTL: "Мин TTL",
      kvPTR: "PTR",
      kvCountry: "Страна",
      kvRegion: "Регион",
      kvCity: "Город",
      kvISP: "Провайдер",
      kvOrg: "Организация",
      kvASN: "ASN",
      kvRegistrar: "Регистратор",
      kvCreated: "Создан",
      kvExpires: "Истекает",
      kvUpdated: "Обновлён",
      kvNameservers: "NS серверы",
      kvStatus: "Статус",
      kvDNSSEC: "DNSSEC",
      kvSubject: "Субъект",
      kvIssuer: "Издатель",
      kvValidFrom: "Действ. с",
      kvValidTo: "Действ. до",
      kvDaysLeft: "Осталось дней",
      kvSAN: "Альт. имена",
      noRecords: "Записи не найдены",
      noPTR: "PTR запись не найдена",
      footer1: "whatismydns — Бесплатный DNS и IP инструмент",
      footer2: "Без API-ключей",
      seoDnsTitle: "DNS Проверка доменов",
      seoDnsText: "Проверяйте A, AAAA, NS, MX, TXT, CNAME и SOA записи для любого домена. Бесплатный DNS-чекер с мгновенными результатами.",
      seoWhoisTitle: "WHOIS поиск домена",
      seoWhoisText: "Находите данные регистрации домена: регистратор, дата создания, дата истечения, серверы имён и статус DNSSEC.",
      seoSslTitle: "Проверка SSL сертификата",
      seoSslText: "Проверяйте валидность SSL-сертификата, издателя, дату истечения и альтернативные имена. Бесплатная проверка безопасности.",
      seoIpTitle: "Мой IP-адрес",
      seoIpText: "Мгновенно определите свой публичный IP-адрес, страну, город, провайдера и часовой пояс. Бесплатная служба геолокации.",
      flinkDns: "DNS Проверка",
      flinkWhois: "WHOIS",
      flinkSsl: "SSL Проверка",
      flinkIp: "Мой IP",
      flinkIpLookup: "IP Поиск",
    },

    uz: {
      heroBadge: "Bepul DNS va IP vositasi",
      heroTitle1: "Har qanday ",
      heroTitle2: "domenni ",
      heroTitle3: "tahlil qiling",
      heroSub: "DNS, WHOIS, SSL, IP tahlili va IP manzilni aniqlash — API kalitsiz.",
      inputPlaceholder: "Domen kiriting, masalan google.com",
      btnCheck: "Tekshirish",
      quickLabel: "Sinab ko'ring:",
      errorEmpty: "Iltimos, domen nomini kiriting.",
      errorGeneric: "Serverga ulanib bo'lmadi.",
      sidebarIpTitle: "Sizning IP manzilingiz",
      myipLoading: "Aniqlanmoqda...",
      myipLabel: "Sizning IP manzilingiz",
      myipCountry: "Davlat",
      myipCity: "Shahar / Viloyat",
      myipISP: "Provayder",
      myipTimezone: "Vaqt zonasi",
      myipCopied: "Nusxalandi!",
      catDNS: "DNS Tekshirish",
      catWHOIS: "WHOIS",
      catSSL: "SSL Tekshirish",
      catIP: "IP Aniqlash",
      reachable: "Mavjud",
      unreachable: "Mavjud emas",
      ping: "Ping",
      statRecords: "DNS yozuvlar",
      statPing: "O'rt. Ping",
      statSSL: "SSL kunlar",
      statExpiry: "Domen muddati",
      secIP: "IP manzillar",
      secA: "A yozuvlar",
      secAAAA: "AAAA yozuvlar",
      secNS: "NS yozuvlar",
      secMX: "MX yozuvlar",
      secTXT: "TXT yozuvlar",
      secCNAME: "CNAME yozuvlar",
      secSOA: "SOA yozuv",
      secPTR: "Teskari DNS (PTR)",
      secGeo: "Geo va tarmoq",
      secWHOIS: "WHOIS / Domen ma'lumoti",
      secSSL: "SSL sertifikati",
      secHTTP: "HTTP xavfsizlik sarlavhalari",
      thAddress: "Manzil",
      thTTL: "TTL",
      thNameserver: "Nom serveri",
      thPriority: "Ustunlik",
      thExchange: "Almashish",
      thValue: "Qiymat",
      thAlias: "Taxallus",
      thHeader: "Sarlavha",
      kvIPv4: "IPv4",
      kvIPv6: "IPv6",
      kvPrimaryNS: "Asosiy NS",
      kvAdminEmail: "Admin email",
      kvSerial: "Seriya №",
      kvRefresh: "Yangilash",
      kvRetry: "Qayta urinish",
      kvExpire: "Tugash",
      kvMinTTL: "Min TTL",
      kvPTR: "PTR",
      kvCountry: "Davlat",
      kvRegion: "Viloyat",
      kvCity: "Shahar",
      kvISP: "Provayder",
      kvOrg: "Tashkilot",
      kvASN: "ASN",
      kvRegistrar: "Ro'yxatdan o'tkazuvchi",
      kvCreated: "Yaratilgan",
      kvExpires: "Tugaydi",
      kvUpdated: "Yangilangan",
      kvNameservers: "NS serverlar",
      kvStatus: "Holat",
      kvDNSSEC: "DNSSEC",
      kvSubject: "Subyekt",
      kvIssuer: "Beruvchi",
      kvValidFrom: "Amal qiladi",
      kvValidTo: "Tugaydi",
      kvDaysLeft: "Kunlar qoldi",
      kvSAN: "Alt nomlar",
      noRecords: "Yozuvlar topilmadi",
      noPTR: "PTR yozuv topilmadi",
      footer1: "whatismydns — Bepul DNS va IP aniqlash vositasi",
      footer2: "API kalitlarsiz",
      seoDnsTitle: "DNS Tekshirish vositasi",
      seoDnsText: "Har qanday domen uchun A, AAAA, NS, MX, TXT, CNAME va SOA yozuvlarini tekshiring. Bepul DNS tekshiruvi real vaqtda natijalar beradi.",
      seoWhoisTitle: "WHOIS domen qidirish",
      seoWhoisText: "Domen ro'yxatdan o'tkazish ma'lumotlarini toping: registrator, yaratilgan sana, tugash sanasi, nom serverlari va DNSSEC holati.",
      seoSslTitle: "SSL Sertifikat tekshiruvi",
      seoSslText: "SSL sertifikat amal qilishini, beruvchini, tugash sanasini va muqobil nomlarini tekshiring. Bepul xavfsizlik tekshiruvi.",
      seoIpTitle: "Mening IP manzilim",
      seoIpText: "Umumiy IP manzilingizni, davlatingizni, shahringizni, provayderingizni va vaqt zonangizni darhol aniqlang. Bepul geolokatsiya xizmati.",
      flinkDns: "DNS Tekshirish",
      flinkWhois: "WHOIS",
      flinkSsl: "SSL Tekshirish",
      flinkIp: "Mening IP",
      flinkIpLookup: "IP Aniqlash",
    },
  };

  // Country flags
  const countryFlags = {
    'UZ': '🇺🇿', 'RU': '🇷🇺', 'US': '🇺🇸', 'GB': '🇬🇧', 'DE': '🇩🇪',
    'FR': '🇫🇷', 'JP': '🇯🇵', 'KR': '🇰🇷', 'CN': '🇨🇳', 'IN': '🇮🇳',
    'BR': '🇧🇷', 'CA': '🇨🇦', 'AU': '🇦🇺', 'IT': '🇮🇹', 'ES': '🇪🇸',
    'NL': '🇳🇱', 'SE': '🇸🇪', 'NO': '🇳🇴', 'FI': '🇫🇮', 'DK': '🇩🇰',
    'PL': '🇵🇱', 'TR': '🇹🇷', 'SA': '🇸🇦', 'AE': '🇦🇪', 'KZ': '🇰🇿',
    'TJ': '🇹🇯', 'KG': '🇰🇬', 'TM': '🇹🇲', 'AF': '🇦🇫', 'PK': '🇵🇰',
    'IR': '🇮🇷', 'UA': '🇺🇦', 'BY': '🇧🇾', 'GE': '🇬🇪', 'AZ': '🇦🇿',
    'MD': '🇲🇩', 'LV': '🇱🇻', 'LT': '🇱🇹', 'EE': '🇪🇪', 'CZ': '🇨🇿',
    'SK': '🇸🇰', 'HU': '🇭🇺', 'RO': '🇷🇴', 'BG': '🇧🇬', 'HR': '🇭🇷',
    'RS': '🇷🇸', 'SI': '🇸🇮', 'BA': '🇧🇦', 'ME': '🇲🇪', 'MK': '🇲🇰',
    'AL': '🇦🇱', 'GR': '🇬🇷', 'CY': '🇨🇾', 'MT': '🇲🇹', 'SG': '🇸🇬',
    'MY': '🇲🇾', 'TH': '🇹🇭', 'VN': '🇻🇳', 'PH': '🇵🇭', 'ID': '🇮🇩',
    'MX': '🇲🇽', 'AR': '🇦🇷', 'CL': '🇨🇱', 'CO': '🇨🇴', 'PE': '🇵🇪',
    'ZA': '🇿🇦', 'NG': '🇳🇬', 'EG': '🇪🇬', 'KE': '🇰🇪', 'MA': '🇲🇦',
    'IL': '🇮🇱', 'IE': '🇮🇪', 'PT': '🇵🇹', 'AT': '🇦🇹', 'CH': '🇨🇭',
    'BE': '🇧🇪', 'LU': '🇱🇺', 'NZ': '🇳🇿', 'TW': '🇹🇼', 'HK': '🇭🇰',
  };

  function getFlagEmoji(countryCode) {
    if (!countryCode) return '🌍';
    return countryFlags[countryCode.toUpperCase()] || '🌍';
  }

  // ═══════════════════════════════════════════════════════════
  //  STATE
  // ═══════════════════════════════════════════════════════════

  let currentLang = localStorage.getItem('mydns_lang') || 'en';
  let lastData = null;
  let myIpData = null;

  function t(key) {
    return (LANG[currentLang] && LANG[currentLang][key]) || LANG.en[key] || key;
  }

  // ═══════════════════════════════════════════════════════════
  //  DOM
  // ═══════════════════════════════════════════════════════════

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const form = $('#search-form');
  const input = $('#domain-input');
  const btnCheck = $('#btn-check');
  const errorToast = $('#error-toast');
  const errorText = $('#error-text');
  const skeleton = $('#skeleton-area');
  const results = $('#results');

  // ═══════════════════════════════════════════════════════════
  //  MOBILE SIDEBAR TOGGLE
  // ═══════════════════════════════════════════════════════════

  const sidebar = $('#sidebar');
  const mobileToggle = $('#mobile-toggle');
  const sidebarOverlay = $('#sidebar-overlay');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      sidebarOverlay.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  LANGUAGE
  // ═══════════════════════════════════════════════════════════

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('mydns_lang', lang);

    document.documentElement.lang = lang === 'uz' ? 'uz' : lang === 'ru' ? 'ru' : 'en';

    $$('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    // Hero
    $('#hero-badge-text').textContent = t('heroBadge');
    $('#hero-t1').textContent = t('heroTitle1');
    $('#hero-t2').textContent = t('heroTitle2');
    $('#hero-t3').textContent = t('heroTitle3');
    $('#hero-sub').textContent = t('heroSub');
    input.placeholder = t('inputPlaceholder');
    $('#btn-label').textContent = t('btnCheck');
    $('#quick-label').textContent = t('quickLabel');

    // Sidebar IP
    $('#sidebar-ip-title').textContent = t('sidebarIpTitle');
    $('#myip-loading-text').textContent = t('myipLoading');
    $('#myip-country-label').textContent = t('myipCountry');
    $('#myip-city-label').textContent = t('myipCity');
    $('#myip-isp-label').textContent = t('myipISP');
    $('#myip-tz-label').textContent = t('myipTimezone');

    // Categories
    $('#cat-dns-text').textContent = t('catDNS');
    $('#cat-whois-text').textContent = t('catWHOIS');
    $('#cat-ssl-text').textContent = t('catSSL');
    $('#cat-ip-text').textContent = t('catIP');

    // SEO content
    $('#seo-dns-title').textContent = t('seoDnsTitle');
    $('#seo-dns-text').textContent = t('seoDnsText');
    $('#seo-whois-title').textContent = t('seoWhoisTitle');
    $('#seo-whois-text').textContent = t('seoWhoisText');
    $('#seo-ssl-title').textContent = t('seoSslTitle');
    $('#seo-ssl-text').textContent = t('seoSslText');
    $('#seo-ip-title').textContent = t('seoIpTitle');
    $('#seo-ip-text').textContent = t('seoIpText');

    // Footer
    $('#footer-1').textContent = t('footer1');
    $('#footer-2').textContent = t('footer2');

    // Footer links
    $('#flink-dns').textContent = t('flinkDns');
    $('#flink-whois').textContent = t('flinkWhois');
    $('#flink-ssl').textContent = t('flinkSsl');
    $('#flink-ip').textContent = t('flinkIp');
    $('#flink-iplookup').textContent = t('flinkIpLookup');

    // Page title
    const titles = {
      en: "whatismydns — Free DNS Lookup, WHOIS, SSL Checker & What's My IP",
      ru: "whatismydns — Бесплатная проверка DNS, WHOIS, SSL и Мой IP адрес",
      uz: "whatismydns — Bepul DNS tekshirish, WHOIS, SSL va Mening IP manzilim",
    };
    document.title = titles[lang] || titles.en;

    // Meta description
    const metas = {
      en: "whatismydns — Free online DNS lookup, WHOIS, SSL checker, and IP address tool. Find your IP, country, and analyze any domain instantly.",
      ru: "whatismydns — Бесплатная онлайн проверка DNS, WHOIS, SSL и определение IP-адреса.",
      uz: "whatismydns — Bepul onlayn DNS tekshirish, WHOIS, SSL va IP manzil aniqlash vositasi.",
    };
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = metas[lang] || metas.en;

    if (lastData) renderResults(lastData);
  }

  window.setPageLang = function (lang) {
    if (LANG[lang]) setLang(lang);
  };

  $$('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // ═══════════════════════════════════════════════════════════
  //  WHAT'S MY IP
  // ═══════════════════════════════════════════════════════════

  async function fetchMyIP() {
    const loadingEl = $('#myip-loading');
    const contentEl = $('#myip-content');

    try {
      const resp = await fetch('/api/myip');
      const data = await resp.json();
      myIpData = data;

      $('#myip-ip').textContent = data.ip || '—';
      $('#myip-country').textContent = data.country
        ? `${data.country}${data.region ? ', ' + data.region : ''}`
        : '—';
      $('#myip-city').textContent = data.city || '—';
      $('#myip-isp').textContent = data.isp || data.org || '—';
      $('#myip-timezone').textContent = data.timezone || '—';

      const flag = getFlagEmoji(data.countryCode);
      $('#myip-flag').textContent = flag;

      loadingEl.style.display = 'none';
      contentEl.style.display = 'block';

    } catch (err) {
      try {
        const resp = await fetch('https://api.ipify.org?format=json');
        const data = await resp.json();
        $('#myip-ip').textContent = data.ip || '—';
        $('#myip-country').textContent = '—';
        $('#myip-city').textContent = '—';
        $('#myip-isp').textContent = '—';
        $('#myip-timezone').textContent = '—';
        loadingEl.style.display = 'none';
        contentEl.style.display = 'block';
      } catch (e) {
        loadingEl.innerHTML = '<span style="color:var(--red);">⚠ Could not detect IP</span>';
      }
    }
  }

  // Copy IP
  const copyBtn = $('#myip-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const ip = $('#myip-ip').textContent;
      if (ip && ip !== '—') {
        navigator.clipboard.writeText(ip).then(() => {
          copyBtn.classList.add('copied');
          setTimeout(() => copyBtn.classList.remove('copied'), 1500);
        });
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  //  UTILITIES
  // ═══════════════════════════════════════════════════════════

  function esc(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  function showError(msg) {
    errorText.textContent = msg;
    errorToast.classList.add('visible');
  }

  function hideError() {
    errorToast.classList.remove('visible');
  }

  function setLoading(on) {
    if (on) {
      btnCheck.classList.add('loading');
      btnCheck.disabled = true;
      skeleton.classList.add('visible');
      results.classList.remove('visible');
    } else {
      btnCheck.classList.remove('loading');
      btnCheck.disabled = false;
      skeleton.classList.remove('visible');
    }
  }

  // Quick domain chips
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      input.value = chip.dataset.domain;
      form.dispatchEvent(new Event('submit'));
    });
  });

  // Category chips
  $$('.cat-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const target = chip.getAttribute('href');
      if (target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // ═══════════════════════════════════════════════════════════
  //  SECTION BUILDER
  // ═══════════════════════════════════════════════════════════

  function sectionHTML(id, icon, color, titleKey, badge, body) {
    return `
      <div class="section open" id="sec-${id}">
        <div class="section-head" onclick="this.parentElement.classList.toggle('open')">
          <div class="sec-icon ${color}">${icon}</div>
          <div class="sec-title">${t(titleKey)}</div>
          ${badge !== null ? `<span class="sec-badge">${badge}</span>` : ''}
          <span class="sec-chevron">▼</span>
        </div>
        <div class="sec-body">${body}</div>
      </div>`;
  }

  function tableHTML(rows, cols) {
    if (!rows || !rows.length) return `<div class="empty">${t('noRecords')}</div>`;
    let h = '<table class="dtable"><thead><tr>';
    cols.forEach(c => h += `<th>${t(c.th)}</th>`);
    h += '</tr></thead><tbody>';
    rows.forEach(r => {
      h += '<tr>';
      cols.forEach(c => {
        const v = typeof c.key === 'function' ? c.key(r) : (r[c.key] ?? '—');
        h += `<td>${esc(String(v))}</td>`;
      });
      h += '</tr>';
    });
    h += '</tbody></table>';
    return h;
  }

  function kvHTML(items) {
    let h = '<div class="kv-grid">';
    items.forEach(([k, v, cls]) => {
      h += `<div class="kv-row">
        <span class="kv-key">${esc(t(k))}</span>
        <span class="kv-val${cls ? ' ' + cls : ''}">${esc(String(v ?? '—'))}</span>
      </div>`;
    });
    h += '</div>';
    return h;
  }

  // ═══════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════

  function renderResults(data) {
    let html = '';
    const on = data.ping && data.ping.reachable;
    const ip1 = data.ip_addresses.ipv4[0] || '—';
    const pingMs = data.ping?.avg_ms ? `${data.ping.avg_ms} ms` : '—';

    // Banner
    html += `
      <div class="result-banner">
        <div class="status-ring ${on ? 'online' : 'offline'}">${on ? '✓' : '✗'}</div>
        <div class="banner-info">
          <div class="banner-domain">${esc(data.domain)}</div>
          <div class="banner-tags">
            <span class="tag"><span class="tag-dot ${on ? 'green' : 'red'}"></span>${on ? t('reachable') : t('unreachable')}</span>
            <span class="tag"><span class="tag-dot blue"></span>IP: ${esc(ip1)}</span>
            <span class="tag"><span class="tag-dot amber"></span>${t('ping')}: ${esc(pingMs)}</span>
          </div>
        </div>
      </div>`;

    // Stats
    const totalRecs = Object.values(data.records).reduce((s, a) => s + a.length, 0);
    const sslDays = data.ssl?.days_left ?? '—';
    const sslColor = typeof sslDays === 'number' ? (sslDays > 30 ? 'green' : sslDays > 7 ? 'amber' : 'red') : 'blue';
    const expiry = data.whois?.expiration_date ? data.whois.expiration_date.split(' ')[0] : '—';

    html += `
      <div class="stats-row">
        <div class="stat-card"><div class="stat-label">${t('statRecords')}</div><div class="stat-value violet">${totalRecs}</div></div>
        <div class="stat-card"><div class="stat-label">${t('statPing')}</div><div class="stat-value ${on ? 'green' : 'red'}">${esc(pingMs)}</div></div>
        <div class="stat-card"><div class="stat-label">${t('statSSL')}</div><div class="stat-value ${sslColor}">${sslDays}</div></div>
        <div class="stat-card"><div class="stat-label">${t('statExpiry')}</div><div class="stat-value amber">${esc(expiry)}</div></div>
      </div>`;

    // IP Addresses
    const ipItems = [];
    data.ip_addresses.ipv4.forEach((ip, i) => ipItems.push([`kvIPv4`, `#${i + 1}: ${ip}`]));
    data.ip_addresses.ipv6.forEach((ip, i) => ipItems.push([`kvIPv6`, `#${i + 1}: ${ip}`]));
    if (!ipItems.length) ipItems.push(['kvIPv4', '—']);
    html += sectionHTML('ip', '🌐', 'indigo', 'secIP',
      data.ip_addresses.ipv4.length + data.ip_addresses.ipv6.length,
      kvHTML(ipItems));

    // A
    html += sectionHTML('a', '📋', 'cyan', 'secA', data.records.A.length,
      tableHTML(data.records.A, [
        { th: 'thAddress', key: 'value' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // AAAA
    html += sectionHTML('aaaa', '📋', 'cyan', 'secAAAA', data.records.AAAA.length,
      tableHTML(data.records.AAAA, [
        { th: 'thAddress', key: 'value' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // NS
    html += sectionHTML('ns', '🖧', 'emerald', 'secNS', data.records.NS.length,
      tableHTML(data.records.NS, [
        { th: 'thNameserver', key: 'value' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // MX
    html += sectionHTML('mx', '✉', 'orange', 'secMX', data.records.MX.length,
      tableHTML(data.records.MX, [
        { th: 'thPriority', key: 'priority' },
        { th: 'thExchange', key: 'exchange' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // TXT
    html += sectionHTML('txt', '📝', 'amber', 'secTXT', data.records.TXT.length,
      tableHTML(data.records.TXT, [
        { th: 'thValue', key: 'value' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // CNAME
    html += sectionHTML('cname', '🔗', 'indigo', 'secCNAME', data.records.CNAME.length,
      tableHTML(data.records.CNAME, [
        { th: 'thAlias', key: 'value' },
        { th: 'thTTL', key: 'ttl' },
      ]));

    // SOA
    if (data.records.SOA.length > 0) {
      const s = data.records.SOA[0];
      html += sectionHTML('soa', '🏛', 'rose', 'secSOA', null,
        kvHTML([
          ['kvPrimaryNS', s.mname],
          ['kvAdminEmail', s.rname],
          ['kvSerial', s.serial],
          ['kvRefresh', `${s.refresh}s`],
          ['kvRetry', `${s.retry}s`],
          ['kvExpire', `${s.expire}s`],
          ['kvMinTTL', `${s.minimum}s`],
          ['thTTL', s.ttl],
        ]));
    }

    // PTR
    html += sectionHTML('ptr', '🔄', 'cyan', 'secPTR', null,
      kvHTML([['kvPTR', data.reverse_dns || t('noPTR')]]));

    // Geo
    if (data.geo) {
      html += sectionHTML('geo', '📍', 'emerald', 'secGeo', null,
        kvHTML([
          ['kvCountry', data.geo.country],
          ['kvRegion', data.geo.region],
          ['kvCity', data.geo.city],
          ['kvISP', data.geo.isp],
          ['kvOrg', data.geo.org],
          ['kvASN', data.geo.asn],
        ]));
    }

    // WHOIS
    if (data.whois) {
      const w = data.whois;
      const items = [
        ['kvRegistrar', w.registrar],
        ['kvCreated', w.creation_date],
        ['kvExpires', w.expiration_date, w.expiration_date ? 'amber' : ''],
        ['kvUpdated', w.updated_date],
        ['kvDNSSEC', w.dnssec],
      ];
      if (w.name_servers?.length) {
        items.push(['kvNameservers', w.name_servers.join(', ')]);
      }
      if (w.status?.length) {
        items.push(['kvStatus', w.status.join(', ')]);
      }
      html += sectionHTML('whois', '📄', 'violet', 'secWHOIS', null, kvHTML(items));
    }

    // SSL
    if (data.ssl) {
      const c = data.ssl;
      const daysClass = c.days_left > 30 ? 'green' : c.days_left > 7 ? 'amber' : 'red';
      html += sectionHTML('ssl', '🔒', 'emerald', 'secSSL', null,
        kvHTML([
          ['kvSubject', c.subject],
          ['kvIssuer', c.issuer],
          ['kvValidFrom', c.not_before],
          ['kvValidTo', c.not_after],
          ['kvDaysLeft', c.days_left, daysClass],
          ['kvSAN', c.san?.join(', ') || '—'],
        ]));
    }

    // HTTP Headers
    if (data.http_headers) {
      let pills = '';
      for (const [k, v] of Object.entries(data.http_headers)) {
        pills += `<div class="header-pill">
          <span class="header-pill-name">${esc(k)}</span>
          <span class="header-pill-val">${esc(v)}</span>
        </div>`;
      }
      html += sectionHTML('http', '🛡', 'rose', 'secHTTP', Object.keys(data.http_headers).length,
        pills || `<div class="empty">${t('noRecords')}</div>`);
    }

    results.innerHTML = html;
    results.classList.add('visible');
  }

  // ═══════════════════════════════════════════════════════════
  //  SUBMIT
  // ═══════════════════════════════════════════════════════════

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const domain = input.value.trim();
    if (!domain) {
      showError(t('errorEmpty'));
      input.focus();
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch('/api/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const json = await resp.json();
      if (!resp.ok) throw new Error(json.error || 'Unknown error');
      lastData = json;
      renderResults(json);
    } catch (err) {
      showError(err.message || t('errorGeneric'));
    } finally {
      setLoading(false);
    }
  });

  // ═══════════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════════

  setLang(currentLang);
  input.focus();
  fetchMyIP();

})();
