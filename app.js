/* ============================================================
   Security Operations Center Dashboard — app.js
   Pure vanilla JavaScript, no frameworks or chart libraries.
   ============================================================ */

// ────────────────────────────────────────────────────────────
// 1. DataEngine — generates realistic simulated SOC data
// ────────────────────────────────────────────────────────────
class DataEngine {
  constructor() {
    this.alertIdCounter = 1000;

    this.firewallMessages = [
      'Blocked incoming connection from suspicious IP',
      'Port scan detected on ports 22-443',
      'DDoS traffic spike — rate limiting engaged',
      'Outbound connection to known C2 server blocked',
      'GeoIP policy violation — connection from restricted region',
      'Fragmented packet attack mitigated',
      'SYN flood detected on port 80',
      'DNS tunneling attempt blocked',
    ];

    this.idsMessages = [
      'Malware signature match — Trojan.GenericKD',
      'SQL injection attempt on /api/login',
      'Cross-site scripting payload detected',
      'Anomalous data exfiltration — 4.2 GB outbound',
      'Zero-day exploit attempt (CVE-2026-31337)',
      'Privilege escalation detected — uid 0 shell',
      'Lateral movement via SMB relay',
      'Reverse shell callback on port 4444',
    ];

    this.authMessages = [
      'Brute force login attempt — 47 failures in 60 s',
      'Unauthorized SSH attempt from external IP',
      'MFA bypass attempt detected',
      'Service account used outside business hours',
      'Password spray attack against Active Directory',
      'Certificate expiry warning — 3 days remaining',
      'Impossible travel login — New York → Tokyo in 12 min',
      'Dormant account reactivated after 180 days',
    ];

    this.alertTitles = [
      'Ransomware Indicator Detected',
      'Suspicious Outbound Traffic',
      'Credential Stuffing Attack',
      'Unauthorized Access Attempt',
      'Data Loss Prevention Trigger',
      'Endpoint Anomaly Detected',
      'Phishing Campaign Identified',
      'Insider Threat Indicator',
      'Cryptomining Activity',
      'Rogue Device on Network',
    ];

    this.alertDescriptions = [
      'Multiple indicators of compromise detected on endpoint WS-0142. Immediate investigation recommended.',
      'Abnormal volume of HTTPS traffic to unclassified external domain. Possible data exfiltration.',
      'Over 12,000 unique credential pairs tested against VPN gateway in the last hour.',
      'Repeated failed access to restricted file share from user account jdoe@corp.',
      'Sensitive PII data pattern matched in outbound email attachment.',
      'Endpoint agent reported unauthorized kernel module loaded on server DB-PROD-03.',
      'Bulk email campaign impersonating IT Help Desk detected by mail gateway.',
      'User downloaded 8.4 GB of source code repositories within 15 minutes.',
      'GPU utilization spike on web server cluster — possible cryptojacking payload.',
      'Unregistered MAC address detected on VLAN 10 (executive network segment).',
    ];

    this.cveDescriptions = [
      'Remote code execution in OpenSSL handshake',
      'Privilege escalation via kernel race condition',
      'Buffer overflow in HTTP/2 HEADERS frame parsing',
      'Authentication bypass in LDAP module',
      'Denial of service via malformed DNS response',
      'Information disclosure through timing side-channel',
      'Arbitrary file write via path traversal',
      'Memory corruption in TLS 1.3 session resumption',
      'CSRF token bypass in admin panel',
      'Deserialization RCE in Java management interface',
      'XML external entity injection in SOAP endpoint',
      'Integer overflow in image processing library',
    ];

    this.systems = [
      'Web Server Cluster', 'Database Server', 'Mail Gateway',
      'VPN Appliance', 'Active Directory DC', 'DNS Server',
      'Load Balancer', 'SIEM Collector', 'Endpoint Fleet',
      'Cloud Workloads', 'Container Orchestrator', 'CI/CD Pipeline',
    ];

    this.backupNames = [
      'prod-db-full', 'mail-archive', 'ad-system-state',
      'file-server-incr', 'web-app-snapshot', 'config-backup',
      'log-archive-weekly', 'vm-snapshot-cluster', 'siem-index-backup',
      'cert-store-backup',
    ];
  }

  randomIP() {
    const subnets = ['10.0', '172.16', '192.168', '203.0.113', '198.51.100'];
    const sub = this.randomChoice(subnets);
    return `${sub}.${this.rand(1, 254)}.${this.rand(1, 254)}`;
  }

  randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateLogEvent() {
    const sources = ['Firewall', 'IDS', 'Authentication'];
    const source = this.randomChoice(sources);
    const typePools = { Firewall: this.firewallMessages, IDS: this.idsMessages, Authentication: this.authMessages };
    const typeWeights = [0.45, 0.30, 0.18, 0.07]; // INFO, WARNING, ERROR, CRITICAL
    const types = ['INFO', 'WARNING', 'ERROR', 'CRITICAL'];
    const r = Math.random();
    let cum = 0, type = 'INFO';
    for (let i = 0; i < typeWeights.length; i++) {
      cum += typeWeights[i];
      if (r < cum) { type = types[i]; break; }
    }
    return {
      source,
      type,
      message: this.randomChoice(typePools[source]),
      timestamp: new Date(),
      ip: this.randomIP(),
    };
  }

  generateAlert() {
    const sevWeights = [0.12, 0.25, 0.38, 0.25];
    const sevs = ['critical', 'high', 'medium', 'low'];
    const r = Math.random();
    let cum = 0, severity = 'low';
    for (let i = 0; i < sevWeights.length; i++) {
      cum += sevWeights[i];
      if (r < cum) { severity = sevs[i]; break; }
    }
    const idx = this.rand(0, this.alertTitles.length - 1);
    return {
      id: `ALT-${++this.alertIdCounter}`,
      severity,
      title: this.alertTitles[idx],
      description: this.alertDescriptions[idx],
      source: this.randomChoice(['Firewall', 'IDS', 'SIEM', 'EDR', 'DLP']),
      timestamp: new Date(),
      status: this.randomChoice(['new', 'new', 'new', 'investigating']),
    };
  }

  generateBackupEntry() {
    const statWeights = [0.72, 0.10, 0.18];
    const stats = ['completed', 'failed', 'in-progress'];
    const r = Math.random();
    let cum = 0, status = 'completed';
    for (let i = 0; i < statWeights.length; i++) {
      cum += statWeights[i];
      if (r < cum) { status = stats[i]; break; }
    }
    const sizeGB = (Math.random() * 120 + 0.5).toFixed(1);
    const hoursAgo = this.rand(0, 72);
    const ts = new Date(Date.now() - hoursAgo * 3600000);
    return {
      name: this.randomChoice(this.backupNames),
      size: `${sizeGB} GB`,
      timestamp: ts,
      encrypted: Math.random() > 0.15,
      status,
    };
  }

  generatePatchEntry() {
    const year = this.randomChoice([2025, 2026]);
    const num = this.rand(10000, 99999);
    const sevs = ['critical', 'high', 'medium', 'low'];
    const severity = this.randomChoice(sevs);
    const statusWeights = [0.45, 0.40, 0.15];
    const statuses = ['pending', 'applied', 'failed'];
    const r = Math.random();
    let cum = 0, status = 'pending';
    for (let i = 0; i < statusWeights.length; i++) {
      cum += statusWeights[i];
      if (r < cum) { status = statuses[i]; break; }
    }
    return {
      cve: `CVE-${year}-${num}`,
      description: this.randomChoice(this.cveDescriptions),
      severity,
      system: this.randomChoice(this.systems),
      status,
    };
  }

  generateTimelineData(hours = 24) {
    const data = [];
    for (let i = 0; i < hours; i++) {
      const base = 40 + Math.sin(i / 3) * 25;
      data.push(Math.max(5, Math.round(base + (Math.random() - 0.5) * 30)));
    }
    return data;
  }

  generateSeverityCounts(scale = 1) {
    return {
      critical: Math.round((this.rand(8, 22)) * scale),
      high: Math.round((this.rand(25, 55)) * scale),
      medium: Math.round((this.rand(60, 130)) * scale),
      low: Math.round((this.rand(100, 250)) * scale),
    };
  }

  generateComplianceData() {
    return [
      { label: 'OS Patches', value: this.rand(72, 99) },
      { label: 'Firmware', value: this.rand(55, 95) },
      { label: 'Applications', value: this.rand(65, 98) },
      { label: 'Security Tools', value: this.rand(80, 100) },
      { label: 'Drivers', value: this.rand(60, 96) },
    ];
  }
}

// ────────────────────────────────────────────────────────────
// 2. ChartManager — pure-canvas chart drawing
// ────────────────────────────────────────────────────────────
class ChartManager {
  prepareCanvas(canvas) {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: rect.height };
  }

  // ── Event Timeline (area + line chart) ─────────────────
  drawEventTimeline(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const pad = { top: 20, right: 20, bottom: 30, left: 40 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const maxVal = Math.max(...data) * 1.15;
    const points = data.map((v, i) => ({
      x: pad.left + (i / (data.length - 1)) * cw,
      y: pad.top + ch - (v / maxVal) * ch,
    }));

    let progress = 0;
    const totalFrames = 50;

    const draw = () => {
      progress++;
      const t = Math.min(progress / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const visibleCount = Math.ceil(points.length * ease);

      ctx.clearRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 5; i++) {
        const y = pad.top + (ch / 5) * i;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
      }

      // Y-axis labels
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 5; i++) {
        const y = pad.top + (ch / 5) * i;
        const val = Math.round(maxVal - (maxVal / 5) * i);
        ctx.fillText(val, pad.left - 6, y + 3);
      }

      // X-axis labels
      ctx.textAlign = 'center';
      for (let i = 0; i < data.length; i += 3) {
        const x = pad.left + (i / (data.length - 1)) * cw;
        ctx.fillText(`${String(i).padStart(2, '0')}:00`, x, h - 6);
      }

      // Build path
      const slice = points.slice(0, visibleCount);
      if (slice.length < 2) { if (t < 1) requestAnimationFrame(draw); return; }

      // Bezier helper
      const path = new Path2D();
      path.moveTo(slice[0].x, slice[0].y);
      for (let i = 1; i < slice.length; i++) {
        const prev = slice[i - 1];
        const cur = slice[i];
        const cpx1 = prev.x + (cur.x - prev.x) * 0.4;
        const cpx2 = cur.x - (cur.x - prev.x) * 0.4;
        path.bezierCurveTo(cpx1, prev.y, cpx2, cur.y, cur.x, cur.y);
      }

      // Area fill
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
      grad.addColorStop(0, 'rgba(0,229,255,0.35)');
      grad.addColorStop(1, 'rgba(0,229,255,0.0)');
      const area = new Path2D(path);
      const last = slice[slice.length - 1];
      area.lineTo(last.x, pad.top + ch);
      area.lineTo(slice[0].x, pad.top + ch);
      area.closePath();
      ctx.fillStyle = grad;
      ctx.fill(area);

      // Line
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.stroke(path);

      // Dots
      slice.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.fill();
      });

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  // ── Severity Donut ─────────────────────────────────────
  drawSeverityDonut(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const cx = w / 2, cy = h / 2;
    const outerR = Math.min(cx, cy) - 10;
    const innerR = outerR * 0.62;
    const gap = 0.03; // radians gap between segments

    const colors = { critical: '#ff1744', high: '#ffab00', medium: '#00e5ff', low: '#00e676' };
    const keys = ['critical', 'high', 'medium', 'low'];
    const total = keys.reduce((s, k) => s + (data[k] || 0), 0);

    let progress = 0;
    const totalFrames = 45;

    const draw = () => {
      progress++;
      const t = Math.min(progress / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      ctx.clearRect(0, 0, w, h);

      let startAngle = -Math.PI / 2;
      keys.forEach(key => {
        const slice = (data[key] || 0) / total;
        const sweep = (Math.PI * 2 * slice - gap) * ease;
        if (sweep <= 0) return;

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, innerR, startAngle + sweep, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[key];
        ctx.fill();

        startAngle += Math.PI * 2 * slice;
      });

      // Center text
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 26px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(total * ease), cx, cy - 6);
      ctx.font = '11px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText('Total Events', cx, cy + 14);

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  // ── Compliance Horizontal Bar Chart ────────────────────
  drawComplianceBar(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const pad = { top: 10, right: 50, bottom: 10, left: 110 };
    const barH = 18;
    const spacing = 8;
    const maxBarW = w - pad.left - pad.right;

    let progress = 0;
    const totalFrames = 40;

    const draw = () => {
      progress++;
      const t = Math.min(progress / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      ctx.clearRect(0, 0, w, h);

      data.forEach((item, i) => {
        const y = pad.top + i * (barH + spacing);
        const barW = (item.value / 100) * maxBarW * ease;

        // Label
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, pad.left - 10, y + barH / 2);

        // Bar background
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.roundRect(pad.left, y, maxBarW, barH, 4);
        ctx.fill();

        // Bar fill gradient
        const grad = ctx.createLinearGradient(pad.left, 0, pad.left + maxBarW, 0);
        if (item.value < 70) {
          grad.addColorStop(0, '#ff1744'); grad.addColorStop(1, '#ff6e40');
        } else if (item.value < 85) {
          grad.addColorStop(0, '#ffab00'); grad.addColorStop(1, '#ffd740');
        } else {
          grad.addColorStop(0, '#00e676'); grad.addColorStop(1, '#69f0ae');
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(pad.left, y, Math.max(0, barW), barH, 4);
        ctx.fill();

        // Percentage
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.round(item.value * ease)}%`, pad.left + maxBarW + 8, y + barH / 2);
      });

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }
}

// ────────────────────────────────────────────────────────────
// 3. DashboardApp — main application controller
// ────────────────────────────────────────────────────────────
class DashboardApp {
  constructor() {
    this.data = new DataEngine();
    this.charts = new ChartManager();
    this.alerts = [];
    this.kpiState = {
      events: 0, alerts: 0, backup: 0, patch: 0,
      prevEvents: 0, prevAlerts: 0, prevBackup: 0, prevPatch: 0,
    };
    this.severityFilter = '24H';
  }

  // ── Bootstrap ──────────────────────────────────────────
  init() {
    this.cacheDOM();
    this.startClock();
    this.updateKPIs();
    this.initCharts();
    this.startAlertFeed();
    this.updateBackupStatus();
    this.updatePatchManagement();
    this.updateLogTable();
    this.initSidebarNav();
    this.bindMiscEvents();

    // Staggered intervals
    setInterval(() => this.updateKPIs(), 10000);
    setInterval(() => this.refreshTimeline(), 15000);
    setInterval(() => this.updateLogTable(), 12000);
    setInterval(() => this.updateBackupStatus(), 30000);
    setInterval(() => this.updatePatchManagement(), 45000);
    setInterval(() => this.refreshSeverityDonut(), 20000);
  }

  cacheDOM() {
    this.dom = {
      clock: document.getElementById('liveClock'),
      kpiEvents: document.getElementById('kpiEvents'),
      kpiAlerts: document.getElementById('kpiAlerts'),
      kpiBackup: document.getElementById('kpiBackup'),
      kpiPatch: document.getElementById('kpiPatch'),
      kpiEventsTrend: document.getElementById('kpiEventsTrend'),
      kpiAlertsTrend: document.getElementById('kpiAlertsTrend'),
      kpiBackupTrend: document.getElementById('kpiBackupTrend'),
      kpiPatchTrend: document.getElementById('kpiPatchTrend'),
      eventChart: document.getElementById('eventTimelineChart'),
      logTableBody: document.getElementById('logTableBody'),
      anomalyCount: document.getElementById('anomalyCount'),
      severityChart: document.getElementById('severityChart'),
      alertFeed: document.getElementById('alertFeed'),
      alertCount: document.getElementById('alertCount'),
      backupProgress: document.getElementById('backupProgress'),
      backupPercent: document.getElementById('backupPercent'),
      lastBackupCheck: document.getElementById('lastBackupCheck'),
      totalBackups: document.getElementById('totalBackups'),
      encryptedBackups: document.getElementById('encryptedBackups'),
      failedBackups: document.getElementById('failedBackups'),
      backupLog: document.getElementById('backupLog'),
      complianceChart: document.getElementById('complianceChart'),
      compliancePercent: document.getElementById('compliancePercent'),
      patchList: document.getElementById('patchList'),
    };
  }

  // ── Clock ──────────────────────────────────────────────
  startClock() {
    const tick = () => {
      const now = new Date();
      if (this.dom.clock) {
        this.dom.clock.textContent = now.toLocaleTimeString('en-GB', {
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
        });
      }
    };
    tick();
    setInterval(tick, 1000);
  }

  // ── KPI Cards ──────────────────────────────────────────
  updateKPIs() {
    const d = this.data;
    const newEvents = d.rand(12400, 18900);
    const newAlerts = d.rand(35, 120);
    const newBackup = d.rand(85, 99);
    const newPatch = d.rand(70, 96);

    this.kpiState.prevEvents = this.kpiState.events || newEvents;
    this.kpiState.prevAlerts = this.kpiState.alerts || newAlerts;
    this.kpiState.prevBackup = this.kpiState.backup || newBackup;
    this.kpiState.prevPatch = this.kpiState.patch || newPatch;

    this.kpiState.events = newEvents;
    this.kpiState.alerts = newAlerts;
    this.kpiState.backup = newBackup;
    this.kpiState.patch = newPatch;

    this.animateNumber(this.dom.kpiEvents, this.kpiState.prevEvents, newEvents, 900);
    this.animateNumber(this.dom.kpiAlerts, this.kpiState.prevAlerts, newAlerts, 900);
    this.animateNumber(this.dom.kpiBackup, this.kpiState.prevBackup, newBackup, 900, '%');
    this.animateNumber(this.dom.kpiPatch, this.kpiState.prevPatch, newPatch, 900, '%');

    this.setTrend(this.dom.kpiEventsTrend, this.kpiState.prevEvents, newEvents);
    this.setTrend(this.dom.kpiAlertsTrend, this.kpiState.prevAlerts, newAlerts, true);
    this.setTrend(this.dom.kpiBackupTrend, this.kpiState.prevBackup, newBackup);
    this.setTrend(this.dom.kpiPatchTrend, this.kpiState.prevPatch, newPatch);
  }

  setTrend(el, prev, cur, invertColor = false) {
    if (!el) return;
    const diff = cur - prev;
    const pct = prev === 0 ? 0 : Math.abs((diff / prev) * 100).toFixed(1);
    const up = diff >= 0;
    const arrow = up ? '▲' : '▼';
    const color = invertColor ? (up ? '#ff1744' : '#00e676') : (up ? '#00e676' : '#ff1744');
    el.innerHTML = `<span style="color:${color}">${arrow} ${pct}%</span>`;
  }

  animateNumber(el, start, end, duration, suffix = '') {
    if (!el) return;
    const startTime = performance.now();
    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = Math.round(start + (end - start) * ease);
      el.textContent = current.toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // ── Charts ─────────────────────────────────────────────
  initCharts() {
    this.timelineData = this.data.generateTimelineData();
    this.severityCounts = this.data.generateSeverityCounts();
    this.complianceData = this.data.generateComplianceData();

    if (this.dom.eventChart) this.charts.drawEventTimeline(this.dom.eventChart, this.timelineData);
    if (this.dom.severityChart) this.charts.drawSeverityDonut(this.dom.severityChart, this.severityCounts);
    if (this.dom.complianceChart) this.charts.drawComplianceBar(this.dom.complianceChart, this.complianceData);

    this.updateSeverityLegend();

    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        if (this.dom.eventChart) this.charts.drawEventTimeline(this.dom.eventChart, this.timelineData);
        if (this.dom.severityChart) this.charts.drawSeverityDonut(this.dom.severityChart, this.severityCounts);
        if (this.dom.complianceChart) this.charts.drawComplianceBar(this.dom.complianceChart, this.complianceData);
      }, 200);
    });
  }

  refreshTimeline() {
    this.timelineData = this.data.generateTimelineData();
    if (this.dom.eventChart) this.charts.drawEventTimeline(this.dom.eventChart, this.timelineData);
  }

  refreshSeverityDonut() {
    const scaleMap = { '1H': 0.15, '6H': 0.5, '24H': 1, '7D': 4.5 };
    const scale = scaleMap[this.severityFilter] || 1;
    this.severityCounts = this.data.generateSeverityCounts(scale);
    if (this.dom.severityChart) this.charts.drawSeverityDonut(this.dom.severityChart, this.severityCounts);
    this.updateSeverityLegend();
  }

  updateSeverityLegend() {
    const idMap = { critical: 'criticalCount', high: 'highCount', medium: 'mediumCount', low: 'lowCount' };
    Object.entries(idMap).forEach(([key, id]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = this.severityCounts[key] || 0;
    });
  }

  // ── Alert Feed ─────────────────────────────────────────
  startAlertFeed() {
    // Seed a few alerts immediately
    for (let i = 0; i < 5; i++) this.pushAlert();
    this.scheduleNextAlert();
  }

  scheduleNextAlert() {
    const delay = this.data.rand(3000, 8000);
    setTimeout(() => {
      this.pushAlert();
      this.scheduleNextAlert();
    }, delay);
  }

  pushAlert() {
    const alert = this.data.generateAlert();
    this.alerts.unshift(alert);
    if (this.alerts.length > 50) this.alerts.pop();

    if (this.dom.alertFeed) {
      const el = this.createAlertElement(alert);
      this.dom.alertFeed.prepend(el);
      while (this.dom.alertFeed.children.length > 50) {
        this.dom.alertFeed.removeChild(this.dom.alertFeed.lastChild);
      }
    }
    if (this.dom.alertCount) {
      this.dom.alertCount.textContent = this.alerts.filter(a => a.status === 'new').length;
    }
  }

  createAlertElement(alert) {
    const div = document.createElement('div');
    div.className = `alert-item alert-item--${alert.severity}`;
    div.style.animation = 'slideIn 0.3s ease';
    div.innerHTML = `
      <div class="alert-severity-stripe"></div>
      <div class="alert-content">
        <div class="alert-header">
          <span class="alert-title">${alert.title}</span>
          <span class="badge badge--${alert.severity}">${alert.severity}</span>
        </div>
        <p class="alert-description">${alert.description}</p>
        <div class="alert-meta">
          <span class="alert-source">${alert.source}</span>
          <span class="alert-time">${this.formatRelativeTime(alert.timestamp)}</span>
        </div>
      </div>`;
    return div;
  }

  // ── Backup Status ──────────────────────────────────────
  updateBackupStatus() {
    const pct = this.data.rand(85, 98);
    const entries = [];
    const count = this.data.rand(8, 10);
    for (let i = 0; i < count; i++) entries.push(this.data.generateBackupEntry());

    // Progress ring (SVG circle — circumference = 2πr)
    if (this.dom.backupProgress) {
      const r = parseFloat(this.dom.backupProgress.getAttribute('r')) || 54;
      const circumference = 2 * Math.PI * r;
      this.dom.backupProgress.style.strokeDasharray = `${circumference}`;
      const offset = circumference - (pct / 100) * circumference;
      this.dom.backupProgress.style.transition = 'stroke-dashoffset 1s ease';
      this.dom.backupProgress.style.strokeDashoffset = offset;
    }
    if (this.dom.backupPercent) this.dom.backupPercent.textContent = `${pct}%`;
    if (this.dom.lastBackupCheck) {
      this.dom.lastBackupCheck.textContent = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit', minute: '2-digit',
      });
    }

    const total = entries.length;
    const encrypted = entries.filter(e => e.encrypted).length;
    const failed = entries.filter(e => e.status === 'failed').length;
    if (this.dom.totalBackups) this.dom.totalBackups.textContent = total;
    if (this.dom.encryptedBackups) this.dom.encryptedBackups.textContent = encrypted;
    if (this.dom.failedBackups) this.dom.failedBackups.textContent = failed;

    if (this.dom.backupLog) {
      this.dom.backupLog.innerHTML = entries.map(e => {
        const statusClass = e.status === 'completed' ? 'success'
          : e.status === 'failed' ? 'danger' : 'warning';
        const icon = e.status === 'completed' ? '✓'
          : e.status === 'failed' ? '✗' : '⟳';
        return `<li class="backup-log-item backup-log-item--${statusClass}">
          <span class="backup-icon">${icon}</span>
          <span class="backup-name">${e.name}</span>
          <span class="backup-size">${e.size}</span>
          <span class="backup-encrypted">${e.encrypted ? '🔒' : '🔓'}</span>
          <span class="backup-time">${this.formatRelativeTime(e.timestamp)}</span>
        </li>`;
      }).join('');
    }
  }

  // ── Patch Management ───────────────────────────────────
  updatePatchManagement() {
    const count = this.data.rand(8, 12);
    const patches = [];
    for (let i = 0; i < count; i++) patches.push(this.data.generatePatchEntry());

    const applied = patches.filter(p => p.status === 'applied').length;
    const pending = patches.filter(p => p.status === 'pending').length;
    const failed = patches.filter(p => p.status === 'failed').length;
    const criticalMissing = patches.filter(p => p.severity === 'critical' && p.status !== 'applied').length;
    const compPct = Math.round((applied / patches.length) * 100);
    if (this.dom.compliancePercent) this.dom.compliancePercent.textContent = `${compPct}%`;

    // Update stat boxes
    const patchUpToDate = document.getElementById('patchUpToDate');
    const patchPending = document.getElementById('patchPending');
    const patchCritical = document.getElementById('patchCritical');
    const vulnCount = document.getElementById('vulnCount');
    if (patchUpToDate) patchUpToDate.textContent = applied;
    if (patchPending) patchPending.textContent = pending;
    if (patchCritical) patchCritical.textContent = criticalMissing;
    if (vulnCount) vulnCount.textContent = pending + failed;

    if (this.dom.patchList) {
      this.dom.patchList.innerHTML = patches.map((p, idx) => {
        const btnClass = p.status === 'applied' ? 'btn-success' : 'btn-primary';
        const btnText = p.status === 'applied' ? 'Applied ✓' : p.status === 'failed' ? 'Retry' : 'Apply';
        const disabled = p.status === 'applied' ? 'disabled' : '';
        return `<div class="patch-item" data-idx="${idx}">
          <div class="patch-info">
            <span class="patch-cve">${p.cve}</span>
            <span class="patch-desc">${p.description}</span>
            <span class="badge badge--${p.severity}">${p.severity}</span>
          </div>
          <div class="patch-meta">
            <span class="patch-system">${p.system}</span>
            <button class="btn-sm ${btnClass}" ${disabled}
              onclick="window.__soc.applyPatch(this)">${btnText}</button>
          </div>
        </div>`;
      }).join('');
    }

    // Refresh compliance bar chart
    this.complianceData = this.data.generateComplianceData();
    if (this.dom.complianceChart) this.charts.drawComplianceBar(this.dom.complianceChart, this.complianceData);
  }

  applyPatch(btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    btn.textContent = 'Applying…';
    btn.classList.add('btn-working');
    setTimeout(() => {
      btn.textContent = 'Applied ✓';
      btn.classList.remove('btn-working', 'btn-primary');
      btn.classList.add('btn-success');
      btn.closest('.patch-item').classList.add('patch-item--applied');
    }, this.data.rand(800, 2000));
  }

  // ── Log Table ──────────────────────────────────────────
  updateLogTable() {
    const sources = [
      { name: 'Firewall', events: this.data.rand(3800, 6200), anomalies: this.data.rand(5, 25) },
      { name: 'IDS', events: this.data.rand(1800, 3500), anomalies: this.data.rand(12, 40) },
      { name: 'Auth System', events: this.data.rand(900, 2100), anomalies: this.data.rand(2, 12) },
    ];

    const totalAnomalies = sources.reduce((s, r) => s + r.anomalies, 0);
    if (this.dom.anomalyCount) this.dom.anomalyCount.textContent = totalAnomalies;

    if (this.dom.logTableBody) {
      this.dom.logTableBody.innerHTML = sources.map(s => {
        const statusLabel = s.anomalies > 25 ? 'Critical' : s.anomalies > 10 ? 'Warning' : 'Healthy';
        const statusClass = s.anomalies > 25 ? 'critical' : s.anomalies > 10 ? 'warning' : 'healthy';
        return `<tr>
          <td>${s.name}</td>
          <td>${s.events.toLocaleString()}</td>
          <td>${s.anomalies}</td>
          <td><span class="status-badge status-badge--${statusClass}">${statusLabel}</span></td>
        </tr>`;
      }).join('');
    }

    // Update sidebar source counts
    const sourceSpans = {
      Firewall: document.querySelector('[data-source-count="firewall"]'),
      IDS: document.querySelector('[data-source-count="ids"]'),
      'Auth System': document.querySelector('[data-source-count="auth"]'),
    };
    sources.forEach(s => {
      const el = sourceSpans[s.name];
      if (el) el.textContent = s.events.toLocaleString();
    });

    // Also try .log-sources spans in order
    const logSourceSpans = document.querySelectorAll('.log-sources .source-count');
    sources.forEach((s, i) => {
      if (logSourceSpans[i]) logSourceSpans[i].textContent = s.events.toLocaleString();
    });
  }

  // ── Sidebar Navigation ─────────────────────────────────
  initSidebarNav() {
    const navItems = document.querySelectorAll('[data-section]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        navItems.forEach(n => n.classList.remove('active'));
        item.classList.add('active');

        const sectionId = item.getAttribute('data-section');
        const target = document.getElementById(sectionId);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Mobile sidebar close
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && window.innerWidth < 1024) {
          sidebar.classList.remove('sidebar--open');
        }
      });
    });

    // Mobile toggle
    const toggle = document.querySelector('.sidebar-toggle, .menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('sidebar--open'));
    }
  }

  // ── Misc Bindings ──────────────────────────────────────
  bindMiscEvents() {
    // Expose applyPatch globally for inline onclick
    window.__soc = this;

    // Notification bell dropdown
    const bell = document.getElementById('notificationBtn');
    if (bell) {
      bell.addEventListener('click', (e) => {
        e.stopPropagation();
        let dropdown = document.querySelector('.notification-dropdown');
        if (!dropdown) {
          dropdown = document.createElement('div');
          dropdown.className = 'notification-dropdown';
          bell.parentElement.style.position = 'relative';
          bell.parentElement.appendChild(dropdown);
        }
        const visible = dropdown.classList.toggle('notification-dropdown--visible');
        if (visible) {
          const recent = this.alerts.slice(0, 5);
          dropdown.innerHTML = `<div class="notification-dropdown-header">Recent Alerts</div>` +
            recent.map(a => `<div class="notification-item notification-item--${a.severity}">
              <strong>${a.title}</strong>
              <span class="notification-time">${this.formatRelativeTime(a.timestamp)}</span>
            </div>`).join('') +
            (recent.length === 0 ? '<div class="notification-empty">No recent alerts</div>' : '');
        }
      });
      document.addEventListener('click', () => {
        const dd = document.querySelector('.notification-dropdown--visible');
        if (dd) dd.classList.remove('notification-dropdown--visible');
      });
    }

    // Severity filter tabs (1H, 6H, 24H, 7D)
    const filterBtns = document.querySelectorAll('[data-range]');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.severityFilter = btn.getAttribute('data-range').toUpperCase();
        this.refreshSeverityDonut();
      });
    });

    // Run Backup button
    const runBackupBtn = document.getElementById('runBackupBtn');
    if (runBackupBtn) {
      runBackupBtn.addEventListener('click', () => {
        runBackupBtn.disabled = true;
        runBackupBtn.textContent = 'Running…';
        runBackupBtn.classList.add('btn-working');

        let simPct = 0;
        const simInterval = setInterval(() => {
          simPct += this.data.rand(5, 15);
          if (simPct >= 100) {
            simPct = 100;
            clearInterval(simInterval);
            runBackupBtn.textContent = 'Run Backup';
            runBackupBtn.disabled = false;
            runBackupBtn.classList.remove('btn-working');

            // Add new entry to log
            const entry = this.data.generateBackupEntry();
            entry.status = 'completed';
            entry.timestamp = new Date();
            if (this.dom.backupLog) {
              const li = document.createElement('li');
              li.className = 'backup-log-item backup-log-item--success';
              li.style.animation = 'slideIn 0.3s ease';
              li.innerHTML = `
                <span class="backup-icon">✓</span>
                <span class="backup-name">${entry.name}</span>
                <span class="backup-size">${entry.size}</span>
                <span class="backup-encrypted">${entry.encrypted ? '🔒' : '🔓'}</span>
                <span class="backup-time">just now</span>`;
              this.dom.backupLog.prepend(li);
            }
          }
        }, 300);
      });
    }

    // Log source filter dropdown
    const logFilter = document.querySelector('#logSourceFilter, .log-source-filter');
    if (logFilter) {
      logFilter.addEventListener('change', () => {
        const val = logFilter.value.toLowerCase();
        if (!this.dom.logTableBody) return;
        const rows = this.dom.logTableBody.querySelectorAll('tr');
        rows.forEach(row => {
          const src = row.children[0]?.textContent.toLowerCase() || '';
          row.style.display = (val === 'all' || src.includes(val)) ? '' : 'none';
        });
      });
    }
  }

  // ── Utilities ──────────────────────────────────────────
  formatRelativeTime(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 10) return 'just now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }
}

// ────────────────────────────────────────────────────────────
// 4. Initialization
// ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const app = new DashboardApp();
  app.init();
});
