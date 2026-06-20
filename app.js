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
    this.riskTitles = [
      { title: 'Exposed S3 Bucket containing backup logs', cat: 'Cloud Security', score: 15, sev: 'high' },
      { title: 'Outdated TLS version (1.0) on legacy API', cat: 'Network Security', score: 8, sev: 'medium' },
      { title: 'Unrestricted egress on dev environment', cat: 'Infrastructure', score: 12, sev: 'high' },
      { title: 'Lack of offline backups for active directory config', cat: 'Business Continuity', score: 20, sev: 'critical' },
      { title: 'Shared service account passwords in plaintext', cat: 'Access Control', score: 16, sev: 'critical' },
      { title: 'API Key exposed in public frontend repository', cat: 'Application Security', score: 18, sev: 'critical' },
      { title: 'Missing MFA on legacy VPN gateway', cat: 'Access Control', score: 15, sev: 'high' },
      { title: 'No egress filtering on production database subnet', cat: 'Network Security', score: 10, sev: 'high' }
    ];
    this.auditEvents = [
      { action: 'Privilege Escalation', user: 'jdoe@corp.local', detail: 'Granted Domain Admin rights', status: 'warning', icon: '⚠' },
      { action: 'Dormant Account Cleaned', user: 'system-agent', detail: 'Deactivated account testuser_99', status: 'pass', icon: '✓' },
      { action: 'MFA Enforced', user: 'sec-admin', detail: 'Enforced MFA on account billing-api', status: 'pass', icon: '✓' },
      { action: 'Unauthorized Sudo Attempt', user: 'developer_temp', detail: 'Attempted sudo on DB-PROD-01', status: 'fail', icon: '✗' },
      { action: 'Access Policy Update', user: 'sec-admin', detail: 'Restricted access to AWS root account', status: 'pass', icon: '✓' },
      { action: 'SSH Key Added', user: 'r&d-lead', detail: 'Authorized new SSH key for repo-server', status: 'warning', icon: '⚠' }
    ];
    this.phishingCampaignsList = [
      { title: 'Q2 Phishing Simulation', detail: 'Departmental testing using IT helpdesk template', passPct: 91, clickPct: 7, failPct: 2 },
      { title: 'Urgent Password Reset Simulation', detail: 'Company-wide simulated credential harvesting', passPct: 84, clickPct: 11, failPct: 5 },
      { title: 'Package Delivery SMS Exercise', detail: 'SMS-based smishing simulation for sales team', passPct: 88, clickPct: 10, failPct: 2 },
      { title: 'HR Annual Review Alert Simulation', detail: 'Simulated phishing using benefit renewal template', passPct: 92, clickPct: 6, failPct: 2 }
    ];

    this.penTestScripts = {
      sql_injection: [
        '[*] Launching SQL Injection simulation against DB-PROD...',
        '[*] Scanning target url: http://db-prod.corp.local/api/query?id=1...',
        '[!] Detected vulnerable parameter: "id"',
        '[*] Injecting payload: 1 UNION SELECT username, password_hash FROM users...',
        '[*] Extracting admin password hash: $2a$12$L7R2eX98...',
        '[+] Password extracted successfully!',
        '[*] Executing database log cleanup script...',
        '[+] SQL Injection Simulation COMPLETED. Status: SUCCESS'
      ],
      credential_stuffing: [
        '[*] Initializing Credential Stuffing against VPN gateway...',
        '[*] Target endpoint: https://vpn.corp.local/login...',
        '[*] Loading list of 5,000 breached account credentials...',
        '[*] Spawning 10 parallel authentication threads...',
        '[!] Thread 3: Authentication success for user: admin@corp.local',
        '[!] Hijacking session token: sess_948f98c8f0003...',
        '[-] Attempting bypass MFA - MFA Prompt triggered!',
        '[!] MFA Response timeout (MFA not completed)',
        '[-] Simulation FAILED. Target MFA policy successfully blocked authentication.'
      ],
      rce_exploit: [
        '[*] Targeting Web Server Cluster for Remote Code Execution...',
        '[*] Port scanning target... Open ports: 80, 443, 8080',
        '[*] Identified software: Apache Tomcat v9.0.37 (Vulnerable to CVE-2026-31337)',
        '[*] Sending crafted HTTP request payload containing shellcode...',
        '[*] Exploit payload executed successfully on remote server',
        '[!] Spawning reverse shell payload connection...',
        '[!] Callback received: Connection from 10.0.4.15 -> 203.0.113.88:4444',
        '[+] Established active shell session! uid: 0 (root)',
        '[+] Simulation COMPLETED. Status: SUCCESS'
      ],
      priv_escalation: [
        '[*] Initializing Privilege Escalation simulation...',
        '[*] Target environment: Server DB-PROD-02 (Linux Kernel 5.15)',
        '[*] Uploading exploit payload: DirtyPipe exploit...',
        '[*] Compiling exploit binary payload...',
        '[*] Executing exploit code to modify page cache memory...',
        '[!] Exploiting Kernel pipe buffer vulnerability...',
        '[!] Spawning sub-shell process...',
        '[+] Privilege escalation SUCCESS. Switched to uid 0 (root)',
        '[+] Simulation COMPLETED. Status: SUCCESS'
      ]
    };

    this.threatHuntData = {
      powershell_egress: [
        { title: 'Suspicious PowerShell Outbound Web Request', ip: '10.0.15.82', desc: 'PowerShell process initiating outbound connection to 198.51.100.22 on TCP 4444', severity: 'critical' },
        { title: 'Base64 Encoded PowerShell Script Executed', ip: '10.0.22.105', desc: 'PowerShell.exe executed with hidden window and encoded command argument', severity: 'high' }
      ],
      registry_run_keys: [
        { title: 'Registry Run Key Modification', ip: '10.0.15.110', desc: 'Regedit process modified HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', severity: 'high' },
        { title: 'New Startup Script Registered', ip: '10.0.8.214', desc: 'Startup batch script added to directory HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\RunServices', severity: 'medium' }
      ],
      lsass_memory_dump: [
        { title: 'LSASS Memory Process Access', ip: '10.0.4.12', desc: 'lsass.exe memory was accessed by anomalous process dump-tool.exe', severity: 'critical' },
        { title: 'Procdump Tool Executed on DC', ip: '10.0.1.10', desc: 'Sysinternals Procdump tool executed targeting Local Security Authority Subsystem', severity: 'critical' }
      ],
      suspicious_scheduled_tasks: [
        { title: 'New Scheduled Task Created', ip: '10.0.14.99', desc: 'Task scheduler registered new daily task pointing to Temp directory', severity: 'medium' }
      ]
    };
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

  generateVulnTrendData() {
    return [45, 42, 38, 32, 29, 27, 24, 18];
  }

  generateScanHistory() {
    return [
      { title: 'Full Network Scan', detail: '142 hosts audited, 3 critical issues found', time: '12h ago', status: 'critical', icon: '✗' },
      { title: 'Quick Web App Scan', detail: 'API endpoints audited, no criticals found', time: '1d ago', status: 'passed', icon: '✓' },
      { title: 'Credentialed Host Audit', detail: '80 servers audited, 4 warnings flagged', time: '2d ago', status: 'warning', icon: '⚠' },
      { title: 'External Range Audit', detail: 'IP block 203.0.113.0/24 audited, clean', time: '5d ago', status: 'passed', icon: '✓' }
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

  drawVulnTrend(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const pad = { top: 15, right: 15, bottom: 25, left: 35 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;
    const maxVal = Math.max(...data) * 1.15;
    const points = data.map((v, i) => ({
      x: pad.left + (i / (data.length - 1)) * cw,
      y: pad.top + ch - (v / maxVal) * ch,
    }));

    let progress = 0;
    const totalFrames = 40;

    const draw = () => {
      progress++;
      const t = Math.min(progress / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 3; i++) {
        const y = pad.top + (ch / 3) * i;
        ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(w - pad.right, y); ctx.stroke();
      }

      // Labels
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '9px Inter, sans-serif';
      ctx.textAlign = 'right';
      for (let i = 0; i <= 3; i++) {
        const y = pad.top + (ch / 3) * i;
        const val = Math.round(maxVal - (maxVal / 3) * i);
        ctx.fillText(val, pad.left - 6, y + 3);
      }

      ctx.textAlign = 'center';
      const labels = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      for (let i = 0; i < data.length; i++) {
        const x = pad.left + (i / (data.length - 1)) * cw;
        ctx.fillText(labels[i] || '', x, h - 4);
      }

      const visiblePoints = points.map(p => ({
        x: p.x,
        y: pad.top + ch - (pad.top + ch - p.y) * ease
      }));

      ctx.beginPath();
      ctx.moveTo(visiblePoints[0].x, visiblePoints[0].y);
      for (let i = 1; i < visiblePoints.length; i++) {
        ctx.lineTo(visiblePoints[i].x, visiblePoints[i].y);
      }
      ctx.strokeStyle = '#ff1744';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Area fill
      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + ch);
      grad.addColorStop(0, 'rgba(255,23,68,0.2)');
      grad.addColorStop(1, 'rgba(255,23,68,0.0)');
      ctx.fillStyle = grad;
      ctx.lineTo(visiblePoints[visiblePoints.length - 1].x, pad.top + ch);
      ctx.lineTo(visiblePoints[0].x, pad.top + ch);
      ctx.closePath();
      ctx.fill();

      // Dots
      visiblePoints.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ff1744';
        ctx.fill();
      });

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  drawAccessDistribution(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const cx = w / 2, cy = h / 2;
    const outerR = Math.min(cx, cy) - 10;
    const innerR = outerR * 0.6;
    const gap = 0.04;

    const colors = { Admin: '#ff1744', User: '#00e5ff', Service: '#d500f9', Guest: '#00e676' };
    const keys = Object.keys(data);
    const total = keys.reduce((s, k) => s + data[k], 0);

    let progress = 0;
    const totalFrames = 40;

    const draw = () => {
      progress++;
      const t = Math.min(progress / totalFrames, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      ctx.clearRect(0, 0, w, h);

      let startAngle = -Math.PI / 2;
      keys.forEach(key => {
        const slice = data[key] / total;
        const sweep = (Math.PI * 2 * slice - gap) * ease;
        if (sweep <= 0) return;

        ctx.beginPath();
        ctx.arc(cx, cy, outerR, startAngle, startAngle + sweep);
        ctx.arc(cx, cy, innerR, startAngle + sweep, startAngle, true);
        ctx.closePath();
        ctx.fillStyle = colors[key] || '#90caf9';
        ctx.fill();

        startAngle += Math.PI * 2 * slice;
      });

      // Center text
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = 'bold 20px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(total * ease), cx, cy - 5);
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText('Active Sessions', cx, cy + 12);

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  drawTrainingCompletion(canvas, data) {
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const pad = { top: 10, right: 45, bottom: 10, left: 55 };
    const barH = 14;
    const spacing = 6;
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
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.label, pad.left - 10, y + barH / 2);

        // Bar background
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        ctx.beginPath();
        ctx.roundRect(pad.left, y, maxBarW, barH, 3);
        ctx.fill();

        // Bar fill
        const grad = ctx.createLinearGradient(pad.left, 0, pad.left + maxBarW, 0);
        grad.addColorStop(0, '#d500f9'); grad.addColorStop(1, '#f50057');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(pad.left, y, Math.max(0, barW), barH, 3);
        ctx.fill();

        // Percentage
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${Math.round(item.value * ease)}%`, pad.left + maxBarW + 8, y + barH / 2);
      });

      if (t < 1) requestAnimationFrame(draw);
    };
    requestAnimationFrame(draw);
  }

  drawLiveNetworkChart(canvas, data) {
    if (!canvas) return;
    const { ctx, w, h } = this.prepareCanvas(canvas);
    const pad = { top: 10, right: 10, bottom: 15, left: 10 };
    const cw = w - pad.left - pad.right;
    const ch = h - pad.top - pad.bottom;

    ctx.clearRect(0, 0, w, h);

    // Draw grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    const cols = 8;
    for (let i = 0; i <= cols; i++) {
      const x = pad.left + (cw / cols) * i;
      ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + ch); ctx.stroke();
    }
    const rows = 4;
    for (let i = 0; i <= rows; i++) {
      const y = pad.top + (ch / rows) * i;
      ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + cw, y); ctx.stroke();
    }

    const plotLine = (pointsArray, strokeColor, fillColor) => {
      if (pointsArray.length < 2) return;
      const maxVal = 100;
      const points = pointsArray.map((v, i) => ({
        x: pad.left + (i / (pointsArray.length - 1)) * cw,
        y: pad.top + ch - (Math.min(maxVal, v) / maxVal) * ch
      }));

      // Area path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.lineTo(points[points.length - 1].x, pad.top + ch);
      ctx.lineTo(points[0].x, pad.top + ch);
      ctx.closePath();
      ctx.fillStyle = fillColor;
      ctx.fill();

      // Line path
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    plotLine(data.ingress, '#00e5ff', 'rgba(0, 229, 255, 0.04)');
    plotLine(data.egress, '#d500f9', 'rgba(213, 0, 249, 0.04)');
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
    this.vulnState = { critical: 2, high: 7, medium: 14, low: 22 };
    this.scanHistory = [];
    this.penTestSims = [];
    this.threatHuntLog = [];
    this.lastScanTimestamp = null;
    this.lastAuditTimestamp = null;
    this.lastHuntTimestamp = null;
    this.liveTrafficHistory = {
      ingress: Array.from({ length: 40 }, () => Math.floor(Math.random() * 40 + 10)),
      egress: Array.from({ length: 40 }, () => Math.floor(Math.random() * 60 + 15)),
    };
    this.agentStates = [
      { name: 'auditd', status: 'Running', cpu: 0.8, mem: 12 },
      { name: 'edr-agent', status: 'Running', cpu: 1.2, mem: 45 },
      { name: 'wazuh-agent', status: 'Running', cpu: 2.1, mem: 34 },
      { name: 'clamav-daemon', status: 'Idle', cpu: 0.0, mem: 128 },
      { name: 'snort-ids', status: 'Running', cpu: 4.8, mem: 92 },
    ];
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
    this.updateVulnerabilityScanning();
    this.updateRiskAssessments();
    this.updateAccessManagement();
    this.updateSecurityAwarenessTraining();
    this.updatePenTestSimLog();
    this.updateThreatHuntLog();
    this.updateLiveResources();
    this.updateAgentDaemonsTable();
    this.drawLiveNetworkChart();
    this.initSidebarNav();
    this.bindMiscEvents();

    // Staggered intervals
    setInterval(() => this.updateKPIs(), 10000);
    setInterval(() => this.refreshTimeline(), 15000);
    setInterval(() => this.updateLogTable(), 12000);
    setInterval(() => this.updateBackupStatus(), 30000);
    setInterval(() => this.updatePatchManagement(), 45000);
    setInterval(() => this.refreshSeverityDonut(), 20000);
    setInterval(() => this.updateVulnerabilityScanning(), 60000);
    setInterval(() => this.updateAccessManagement(), 50000);

    // Live Monitor updates
    setInterval(() => {
      this.updateLiveResources();
      this.updateAgentDaemonsTable();
      this.tickLiveTrafficData();
      this.drawLiveNetworkChart();
    }, 1000);

    setInterval(() => {
      this.pushLivePacketEvent();
    }, 800);
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
      runScanBtn: document.getElementById('runScanBtn'),
      scanProgressContainer: document.getElementById('scanProgressContainer'),
      scanProgressBar: document.getElementById('scanProgressBar'),
      scanProgressText: document.getElementById('scanProgressText'),
      vulnCritical: document.getElementById('vulnCritical'),
      vulnHigh: document.getElementById('vulnHigh'),
      vulnMedium: document.getElementById('vulnMedium'),
      vulnLow: document.getElementById('vulnLow'),
      vulnTrendChart: document.getElementById('vulnTrendChart'),
      lastScanTime: document.getElementById('lastScanTime'),
      hostsScanned: document.getElementById('hostsScanned'),
      scanHistoryList: document.getElementById('scanHistoryList'),
      overallRiskScore: document.getElementById('overallRiskScore'),
      riskMatrix: document.getElementById('riskMatrix'),
      riskRegister: document.getElementById('riskRegister'),
      totalUsers: document.getElementById('totalUsers'),
      mfaEnabled: document.getElementById('mfaEnabled'),
      privilegedAccounts: document.getElementById('privilegedAccounts'),
      dormantAccounts: document.getElementById('dormantAccounts'),
      mfaPercent: document.getElementById('mfaPercent'),
      mfaBar: document.getElementById('mfaBar'),
      accessChart: document.getElementById('accessChart'),
      runAuditBtn: document.getElementById('runAuditBtn'),
      auditLog: document.getElementById('auditLog'),
      trainingPercent: document.getElementById('trainingPercent'),
      trainingProgress: document.getElementById('trainingProgress'),
      trainingRingPercent: document.getElementById('trainingRingPercent'),
      trainEnrolled: document.getElementById('trainEnrolled'),
      trainCompleted: document.getElementById('trainCompleted'),
      trainOverdue: document.getElementById('trainOverdue'),
      trainingChart: document.getElementById('trainingChart'),
      phishingCampaigns: document.getElementById('phishingCampaigns'),
      phishPassed: document.getElementById('phishPassed'),
      phishClicked: document.getElementById('phishClicked'),
      phishFailed: document.getElementById('phishFailed'),
      phishingLog: document.getElementById('phishingLog'),
      penTestBtn: document.getElementById('startPenTestBtn'),
      penTestTarget: document.getElementById('penTestTarget'),
      penTestVector: document.getElementById('penTestVector'),
      penTestConsole: document.getElementById('penTestConsole'),
      penTestSimCount: document.getElementById('penTestSimCount'),
      penTestLog: document.getElementById('penTestLog'),
      penTestStatus: document.getElementById('penTestStatus'),
      startHuntBtn: document.getElementById('startHuntBtn'),
      huntQuery: document.getElementById('huntQuery'),
      radarSweep: document.getElementById('radarSweep'),
      radarStatusText: document.getElementById('radarStatusText'),
      threatHuntCount: document.getElementById('threatHuntCount'),
      threatHuntLog: document.getElementById('threatHuntLog'),
      lastHuntTime: document.getElementById('lastHuntTime'),
      cpuLoadBar: document.getElementById('cpuLoadBar'),
      cpuLoadValue: document.getElementById('cpuLoadValue'),
      ramUsageBar: document.getElementById('ramUsageBar'),
      ramUsageValue: document.getElementById('ramUsageValue'),
      agentTableBody: document.getElementById('agentTableBody'),
      liveNetworkChart: document.getElementById('liveNetworkChart'),
      livePacketStream: document.getElementById('livePacketStream'),
      liveEgressRate: document.getElementById('liveEgressRate'),
      liveIngressRate: document.getElementById('liveIngressRate'),
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
    this.vulnTrendData = this.data.generateVulnTrendData();
    this.accessData = { Admin: 8, User: 110, Service: 20, Guest: 4 };
    this.trainingData = [
      { label: 'IT', value: 98 },
      { label: 'Eng', value: 95 },
      { label: 'Sales', value: 82 },
      { label: 'HR', value: 92 },
      { label: 'Finance', value: 88 },
    ];

    if (this.dom.eventChart) this.charts.drawEventTimeline(this.dom.eventChart, this.timelineData);
    if (this.dom.severityChart) this.charts.drawSeverityDonut(this.dom.severityChart, this.severityCounts);
    if (this.dom.complianceChart) this.charts.drawComplianceBar(this.dom.complianceChart, this.complianceData);
    if (this.dom.vulnTrendChart) this.charts.drawVulnTrend(this.dom.vulnTrendChart, this.vulnTrendData);
    if (this.dom.accessChart) this.charts.drawAccessDistribution(this.dom.accessChart, this.accessData);
    if (this.dom.trainingChart) this.charts.drawTrainingCompletion(this.dom.trainingChart, this.trainingData);

    this.updateSeverityLegend();

    window.addEventListener('resize', () => {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        if (this.dom.eventChart) this.charts.drawEventTimeline(this.dom.eventChart, this.timelineData);
        if (this.dom.severityChart) this.charts.drawSeverityDonut(this.dom.severityChart, this.severityCounts);
        if (this.dom.complianceChart) this.charts.drawComplianceBar(this.dom.complianceChart, this.complianceData);
        if (this.dom.vulnTrendChart) this.charts.drawVulnTrend(this.dom.vulnTrendChart, this.vulnTrendData);
        if (this.dom.accessChart) this.charts.drawAccessDistribution(this.dom.accessChart, this.accessData);
        if (this.dom.trainingChart) this.charts.drawTrainingCompletion(this.dom.trainingChart, this.trainingData);
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

  // ── Vulnerability Scanning ─────────────────────────────
  updateVulnerabilityScanning() {
    if (this.scanHistory.length === 0) {
      this.scanHistory = this.data.generateScanHistory();
    }

    if (this.dom.vulnCritical) this.dom.vulnCritical.textContent = this.vulnState.critical;
    if (this.dom.vulnHigh) this.dom.vulnHigh.textContent = this.vulnState.high;
    if (this.dom.vulnMedium) this.dom.vulnMedium.textContent = this.vulnState.medium;
    if (this.dom.vulnLow) this.dom.vulnLow.textContent = this.vulnState.low;

    if (this.dom.lastScanTime) {
      if (!this.lastScanTimestamp) {
        this.lastScanTimestamp = new Date(Date.now() - 4 * 3600000); // 4h ago
      }
      this.dom.lastScanTime.textContent = this.formatRelativeTime(this.lastScanTimestamp);
    }
    if (this.dom.hostsScanned) this.dom.hostsScanned.textContent = '142';

    if (this.dom.scanHistoryCount) {
      this.dom.scanHistoryCount.textContent = this.scanHistory.length;
    }

    if (this.dom.scanHistoryList) {
      this.dom.scanHistoryList.innerHTML = this.scanHistory.map(h => {
        const itemClass = h.status === 'passed' ? 'passed' : h.status === 'critical' ? 'critical' : 'warning';
        return `<li class="scan-history-item">
          <div class="scan-history-icon ${itemClass}">${h.icon}</div>
          <div class="scan-history-info">
            <span class="scan-history-title">${h.title}</span>
            <span class="scan-history-detail">${h.detail}</span>
          </div>
          <span class="scan-history-time">${h.time}</span>
        </li>`;
      }).join('');
    }
  }

  runVulnerabilityScan() {
    if (!this.dom.runScanBtn) return;
    const btn = this.dom.runScanBtn;
    btn.disabled = true;
    btn.textContent = 'Scanning…';
    btn.classList.add('btn-working');

    if (this.dom.scanProgressContainer) {
      this.dom.scanProgressContainer.style.display = 'flex';
    }
    if (this.dom.scanProgressBar) this.dom.scanProgressBar.style.width = '0%';
    if (this.dom.scanProgressText) this.dom.scanProgressText.textContent = '0%';

    let progress = 0;
    const interval = setInterval(() => {
      progress += this.data.rand(4, 12);
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Run Scan';
          btn.classList.remove('btn-working');
          if (this.dom.scanProgressContainer) {
            this.dom.scanProgressContainer.style.display = 'none';
          }

          // Generate new randomized vulnerability state
          this.vulnState = {
            critical: this.data.rand(0, 3),
            high: this.data.rand(2, 9),
            medium: this.data.rand(8, 18),
            low: this.data.rand(15, 30)
          };
          this.lastScanTimestamp = new Date();

          // Add to scan history
          const types = ['Internal Network Scan', 'Web Application Pentest', 'External Range Audit', 'Credentialed Host Audit'];
          const type = this.data.randomChoice(types);
          const totalVulns = this.vulnState.critical + this.vulnState.high + this.vulnState.medium + this.vulnState.low;
          const status = this.vulnState.critical > 0 ? 'critical' : (this.vulnState.high > 2 ? 'warning' : 'passed');
          const icon = status === 'passed' ? '✓' : status === 'critical' ? '✗' : '⚠';

          this.scanHistory.unshift({
            title: type,
            detail: `142 hosts audited, ${totalVulns} issues flagged`,
            time: 'just now',
            status,
            icon
          });

          this.updateVulnerabilityScanning();

          // Update trend data & replot
          this.vulnTrendData.shift();
          this.vulnTrendData.push(totalVulns);
          if (this.dom.vulnTrendChart) {
            this.charts.drawVulnTrend(this.dom.vulnTrendChart, this.vulnTrendData);
          }
        }, 500);
      }
      if (this.dom.scanProgressBar) this.dom.scanProgressBar.style.width = `${progress}%`;
      if (this.dom.scanProgressText) this.dom.scanProgressText.textContent = `${progress}%`;
    }, 150);
  }

  // ── Risk Assessments ───────────────────────────────────
  updateRiskAssessments() {
    if (!this.riskRegister) {
      this.riskRegister = [
        { title: 'Exposed S3 Bucket containing backup logs', cat: 'Cloud Security', score: 15, sev: 'high' },
        { title: 'Outdated TLS version (1.0) on legacy API', cat: 'Network Security', score: 8, sev: 'medium' },
        { title: 'Unrestricted egress on dev environment', cat: 'Infrastructure', score: 12, sev: 'high' },
        { title: 'Lack of offline backups for active directory config', cat: 'Business Continuity', score: 20, sev: 'critical' },
        { title: 'Shared service account passwords in plaintext', cat: 'Access Control', score: 16, sev: 'critical' }
      ];
    }

    if (this.dom.overallRiskScore) {
      const avgScore = (this.riskRegister.reduce((sum, r) => sum + r.score, 0) / this.riskRegister.length).toFixed(1);
      let label = 'Low';
      let colorClass = 'text-green';
      if (avgScore >= 16) { label = 'Critical'; colorClass = 'text-red'; }
      else if (avgScore >= 12) { label = 'High'; colorClass = 'text-amber'; }
      else if (avgScore >= 6) { label = 'Medium'; colorClass = 'text-cyan'; }

      this.dom.overallRiskScore.textContent = `${label} (${avgScore})`;
      this.dom.overallRiskScore.className = colorClass;
    }

    if (this.dom.openRiskCount) {
      this.dom.openRiskCount.textContent = this.riskRegister.length;
    }

    if (this.dom.riskRegister) {
      this.dom.riskRegister.innerHTML = this.riskRegister.map(r => {
        return `<li class="risk-item risk-${r.sev}">
          <div class="risk-item-info">
            <span class="risk-item-title">${r.title}</span>
            <span class="risk-item-category">${r.cat}</span>
          </div>
          <span class="risk-item-score text-${r.sev === 'critical' ? 'red' : r.sev === 'high' ? 'amber' : r.sev === 'medium' ? 'cyan' : 'green'}">${r.score}</span>
        </li>`;
      }).join('');
    }

    // Generate Risk Matrix cells
    if (this.dom.riskMatrix) {
      this.dom.riskMatrix.innerHTML = '';
      for (let imp = 5; imp >= 1; imp--) {
        for (let lik = 1; lik <= 5; lik++) {
          const score = imp * lik;
          let cellClass = 'r-low';
          if (score >= 16) cellClass = 'r-critical';
          else if (score >= 10) cellClass = 'r-high';
          else if (score >= 5) cellClass = 'r-medium';

          const cell = document.createElement('div');
          cell.className = `risk-cell ${cellClass}`;
          cell.title = `Impact: ${imp}, Likelihood: ${lik} (Score: ${score})`;

          // Count matching open risks in this block
          const count = this.riskRegister.filter(r => {
            if (r.sev === 'critical' && score >= 16 && Math.random() > 0.8) return true;
            if (r.sev === 'high' && score >= 10 && score < 16 && Math.random() > 0.8) return true;
            if (r.sev === 'medium' && score >= 5 && score < 10 && Math.random() > 0.8) return true;
            return false;
          }).length;

          cell.textContent = count > 0 ? count : '';
          this.dom.riskMatrix.appendChild(cell);
        }
      }
    }
  }

  // ── Access Management ──────────────────────────────────
  updateAccessManagement() {
    if (!this.auditEvents) {
      this.auditEvents = this.data.auditEvents;
    }

    if (this.dom.totalUsers) this.dom.totalUsers.textContent = '142';
    if (this.dom.mfaEnabled) this.dom.mfaEnabled.textContent = '135';
    if (this.dom.privilegedAccounts) this.dom.privilegedAccounts.textContent = '8';
    if (this.dom.dormantAccounts) this.dom.dormantAccounts.textContent = '4';

    if (this.dom.mfaPercent) this.dom.mfaPercent.textContent = '95%';
    if (this.dom.mfaBar) this.dom.mfaBar.style.width = '95%';

    if (this.dom.lastAuditTime) {
      if (!this.lastAuditTimestamp) {
        this.lastAuditTimestamp = new Date(Date.now() - 6 * 3600000); // 6h ago
      }
      this.dom.lastAuditTime.textContent = this.formatRelativeTime(this.lastAuditTimestamp);
    }

    if (this.dom.auditLog) {
      this.dom.auditLog.innerHTML = this.auditEvents.map(e => {
        const itemClass = e.status === 'pass' ? 'audit-pass' : e.status === 'warning' ? 'audit-warning' : 'audit-fail';
        return `<li class="audit-item ${itemClass}">
          <div class="audit-icon">${e.icon}</div>
          <div class="audit-content">
            <span class="audit-title">${e.action}</span>
            <span class="audit-detail">${e.detail} (${e.user})</span>
          </div>
          <span class="audit-time">just now</span>
        </li>`;
      }).join('');
    }
  }

  runAccessAudit() {
    if (!this.dom.runAuditBtn) return;
    const btn = this.dom.runAuditBtn;
    btn.disabled = true;
    btn.textContent = 'Auditing…';
    btn.classList.add('btn-working');

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Run Audit';
      btn.classList.remove('btn-working');
      this.lastAuditTimestamp = new Date();

      const newAuditEvents = [
        { action: 'Audit Completed', user: 'system-audit', detail: 'Scan completed on Active Directory domain controllers', status: 'pass', icon: '✓' },
        { action: 'Privileged Access Warning', user: 'adm-webmaster', detail: 'API token access without MFA detected', status: 'warning', icon: '⚠' }
      ];

      this.auditEvents = [...newAuditEvents, ...this.auditEvents].slice(0, 10);
      this.updateAccessManagement();
    }, 1200);
  }

  // ── Security Awareness Training ────────────────────────
  updateSecurityAwarenessTraining() {
    if (!this.phishingLog) {
      this.phishingLog = this.data.phishingCampaignsList;
    }

    const enrolled = 250;
    const completed = 228;
    const overdue = 22;
    const pct = Math.round((completed / enrolled) * 100);

    if (this.dom.trainingPercent) this.dom.trainingPercent.textContent = `${pct}%`;
    if (this.dom.trainingRingPercent) this.dom.trainingRingPercent.textContent = `${pct}%`;

    if (this.dom.trainingProgress) {
      const r = parseFloat(this.dom.trainingProgress.getAttribute('r')) || 70;
      const circumference = 2 * Math.PI * r;
      this.dom.trainingProgress.style.strokeDasharray = `${circumference}`;
      const offset = circumference - (pct / 100) * circumference;
      this.dom.trainingProgress.style.transition = 'stroke-dashoffset 1s ease';
      this.dom.trainingProgress.style.strokeDashoffset = offset;
    }

    if (this.dom.trainEnrolled) this.dom.trainEnrolled.textContent = enrolled;
    if (this.dom.trainCompleted) this.dom.trainCompleted.textContent = completed;
    if (this.dom.trainOverdue) this.dom.trainOverdue.textContent = overdue;

    if (this.dom.phishingCampaigns) this.dom.phishingCampaigns.textContent = this.phishingLog.length;

    // Phishing stats averages
    const avgPass = Math.round(this.phishingLog.reduce((s, c) => s + c.passPct, 0) / this.phishingLog.length);
    const avgClick = Math.round(this.phishingLog.reduce((s, c) => s + c.clickPct, 0) / this.phishingLog.length);
    const avgFail = Math.round(this.phishingLog.reduce((s, c) => s + c.failPct, 0) / this.phishingLog.length);

    if (this.dom.phishPassed) this.dom.phishPassed.textContent = `${avgPass}%`;
    if (this.dom.phishClicked) this.dom.phishClicked.textContent = `${avgClick}%`;
    if (this.dom.phishFailed) this.dom.phishFailed.textContent = `${avgFail}%`;

    if (this.dom.phishingLog) {
      this.dom.phishingLog.innerHTML = this.phishingLog.map(p => {
        return `<li class="phishing-item">
          <div class="phishing-item-info">
            <span class="phishing-item-title">${p.title}</span>
            <span class="phishing-item-detail">${p.detail}</span>
          </div>
          <span class="phishing-item-stat text-cyan">${p.clickPct}% Click / ${p.failPct}% Harvested</span>
        </li>`;
      }).join('');
    }
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

    // Vulnerability Scan button
    const runScanBtn = document.getElementById('runScanBtn');
    if (runScanBtn) {
      runScanBtn.addEventListener('click', () => {
        this.runVulnerabilityScan();
      });
    }

    // Access Audit button
    const runAuditBtn = document.getElementById('runAuditBtn');
    if (runAuditBtn) {
      runAuditBtn.addEventListener('click', () => {
        this.runAccessAudit();
      });
    }

    // Penetration Testing Launch button
    if (this.dom.penTestBtn) {
      this.dom.penTestBtn.addEventListener('click', () => {
        this.runPenTestSimulation();
      });
    }

    // Threat Hunting Scan button
    if (this.dom.startHuntBtn) {
      this.dom.startHuntBtn.addEventListener('click', () => {
        this.runThreatHunt();
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

  // ── Penetration Testing ───────────────────────────────
  updatePenTestSimLog() {
    if (!this.dom.penTestLog) return;
    if (this.penTestSims.length === 0) {
      this.dom.penTestLog.innerHTML = '<li class="pentest-log-placeholder">No simulations run yet. Select target and vector above to initiate.</li>';
      if (this.dom.penTestSimCount) this.dom.penTestSimCount.textContent = '0';
      return;
    }
    if (this.dom.penTestSimCount) this.dom.penTestSimCount.textContent = this.penTestSims.length;
    this.dom.penTestLog.innerHTML = this.penTestSims.map(sim => {
      const statusClass = sim.status.toLowerCase().includes('success') ? 'success' : 'fail';
      return `<li class="pentest-log-item ${statusClass}">
        <div class="pentest-log-info">
          <span class="pentest-log-title">${this.escapeHTML(sim.vectorName)} against ${this.escapeHTML(sim.target)}</span>
          <span class="pentest-log-meta">${this.escapeHTML(sim.status)}</span>
        </div>
        <span class="pentest-log-time">${this.formatRelativeTime(sim.timestamp)}</span>
      </li>`;
    }).join('');
  }

  runPenTestSimulation() {
    if (!this.dom.penTestBtn || !this.dom.penTestConsole) return;
    const target = this.dom.penTestTarget ? this.dom.penTestTarget.value : 'Target';
    const vectorKey = this.dom.penTestVector ? this.dom.penTestVector.value : 'sql_injection';
    const vectorSelect = this.dom.penTestVector;
    const vectorName = vectorSelect ? vectorSelect.options[vectorSelect.selectedIndex].text : 'Vector';

    const script = this.data.penTestScripts[vectorKey] || [];
    if (script.length === 0) return;

    this.dom.penTestBtn.disabled = true;
    this.dom.penTestBtn.textContent = 'Running…';
    this.dom.penTestBtn.classList.add('btn-working');
    if (this.dom.penTestStatus) {
      this.dom.penTestStatus.textContent = 'Executing Simulation';
      this.dom.penTestStatus.className = 'text-amber';
    }

    this.dom.penTestConsole.innerHTML = '';
    let lineIdx = 0;

    const printLine = () => {
      if (lineIdx < script.length) {
        const line = script[lineIdx];
        const span = document.createElement('span');
        span.textContent = line + '\n';
        // Add specific color highlighting for simulation messages
        if (line.startsWith('[+]')) {
          span.style.color = '#00ff66'; // Success green
        } else if (line.startsWith('[!]')) {
          span.style.color = '#ffab00'; // Warning amber
        } else if (line.startsWith('[-]')) {
          span.style.color = '#ff1744'; // Danger red
        } else {
          span.style.color = '#00ff66';
        }
        
        // Remove existing cursor, append content, append new cursor
        const cursor = this.dom.penTestConsole.querySelector('.terminal-cursor');
        if (cursor) cursor.remove();
        
        this.dom.penTestConsole.appendChild(span);
        
        const newCursor = document.createElement('span');
        newCursor.className = 'terminal-cursor';
        this.dom.penTestConsole.appendChild(newCursor);
        
        // Scroll terminal to bottom
        this.dom.penTestConsole.scrollTop = this.dom.penTestConsole.scrollHeight;

        lineIdx++;
        setTimeout(printLine, this.data.rand(500, 1000));
      } else {
        // Simulation finished
        this.dom.penTestBtn.disabled = false;
        this.dom.penTestBtn.textContent = 'Launch Attack';
        this.dom.penTestBtn.classList.remove('btn-working');

        const lastLine = script[script.length - 1] || '';
        const success = lastLine.toLowerCase().includes('success');
        
        if (this.dom.penTestStatus) {
          this.dom.penTestStatus.textContent = success ? 'Complete (Success)' : 'Complete (Failed)';
          this.dom.penTestStatus.className = success ? 'text-green' : 'text-red';
        }

        // Add to completed simulations history
        this.penTestSims.unshift({
          target,
          vectorKey,
          vectorName,
          status: success ? 'SUCCESS' : 'FAILED',
          timestamp: new Date()
        });

        this.updatePenTestSimLog();
      }
    };

    printLine();
  }

  // ── Threat Hunting ─────────────────────────────────────
  updateThreatHuntLog() {
    if (!this.dom.threatHuntLog) return;
    if (this.dom.threatHuntCount) this.dom.threatHuntCount.textContent = this.threatHuntLog.length;
    
    if (this.threatHuntLog.length === 0) {
      this.dom.threatHuntLog.innerHTML = '<li class="pentest-log-placeholder">No threat hunts completed in this session yet. Run Scan above.</li>';
      return;
    }

    this.dom.threatHuntLog.innerHTML = this.threatHuntLog.map(threat => {
      return `<li class="threat-hunt-item" style="border-left-color: ${threat.severity === 'critical' ? 'var(--red)' : (threat.severity === 'high' ? 'var(--amber)' : 'var(--cyan)')}">
        <div class="threat-hunt-info">
          <span class="threat-hunt-title">${this.escapeHTML(threat.title)}</span>
          <span class="threat-hunt-meta">Target IP: ${this.escapeHTML(threat.ip)} — ${this.escapeHTML(threat.desc)}</span>
        </div>
        <span class="threat-hunt-badge badge--${threat.severity}">${this.escapeHTML(threat.severity)}</span>
      </li>`;
    }).join('');
  }

  runThreatHunt() {
    if (!this.dom.startHuntBtn || !this.dom.radarSweep) return;
    const queryKey = this.dom.huntQuery ? this.dom.huntQuery.value : 'powershell_egress';
    const querySelect = this.dom.huntQuery;
    const queryName = querySelect ? querySelect.options[querySelect.selectedIndex].text : 'Query';

    this.dom.startHuntBtn.disabled = true;
    this.dom.startHuntBtn.textContent = 'Hunting…';
    this.dom.startHuntBtn.classList.add('btn-working');

    if (this.dom.radarStatusText) {
      this.dom.radarStatusText.textContent = 'Active Sweep In Progress';
      this.dom.radarStatusText.style.color = 'var(--amber)';
    }

    // Show and trigger radar sweep rotation animation
    this.dom.radarSweep.style.display = 'block';

    // Randomly flash threat blips in the radar grid overlay
    const blips = document.querySelectorAll('.radar-blip');
    blips.forEach(blip => {
      blip.classList.remove('active');
      blip.style.opacity = '0';
      blip.style.transform = 'scale(0)';
      
      // Delay blip flashes for aesthetics
      setTimeout(() => {
        blip.classList.add('active');
      }, this.data.rand(200, 1800));
    });

    setTimeout(() => {
      // Finished sweep
      this.dom.startHuntBtn.disabled = false;
      this.dom.startHuntBtn.textContent = 'Scan Endpoints';
      this.dom.startHuntBtn.classList.remove('btn-working');
      this.dom.radarSweep.style.display = 'none';
      blips.forEach(blip => blip.classList.remove('active'));

      this.lastHuntTimestamp = new Date();
      if (this.dom.lastHuntTime) {
        this.dom.lastHuntTime.textContent = this.formatRelativeTime(this.lastHuntTimestamp);
      }

      // Query mock threat records from the dataset
      const results = this.data.threatHuntData[queryKey] || [];
      if (results.length > 0) {
        if (this.dom.radarStatusText) {
          this.dom.radarStatusText.textContent = `${results.length} IOC Threats Found`;
          this.dom.radarStatusText.style.color = 'var(--red)';
        }

        // Add new threats to log
        results.forEach(res => {
          // Avoid duplicate entries of the same threat
          if (!this.threatHuntLog.some(t => t.title === res.title && t.ip === res.ip)) {
            this.threatHuntLog.unshift({
              ...res,
              timestamp: new Date()
            });
          }
        });
      } else {
        if (this.dom.radarStatusText) {
          this.dom.radarStatusText.textContent = 'Endpoints Verified Clean';
          this.dom.radarStatusText.style.color = 'var(--green)';
        }
      }

      this.updateThreatHuntLog();
    }, 3000);
  }

  escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // ── Live Security & System Monitor ─────────────────────
  updateLiveResources() {
    const cpu = this.data.rand(25, 75);
    const ram = this.data.rand(45, 85);

    if (this.dom.cpuLoadBar) this.dom.cpuLoadBar.style.width = `${cpu}%`;
    if (this.dom.cpuLoadValue) this.dom.cpuLoadValue.textContent = `${cpu}%`;
    if (this.dom.ramUsageBar) this.dom.ramUsageBar.style.width = `${ram}%`;
    if (this.dom.ramUsageValue) this.dom.ramUsageValue.textContent = `${ram}%`;
  }

  updateAgentDaemonsTable() {
    if (!this.dom.agentTableBody) return;

    this.agentStates = this.agentStates.map(agent => {
      let status = agent.status;
      if (Math.random() > 0.90 && agent.name !== 'snort-ids' && agent.name !== 'wazuh-agent') {
        status = status === 'Running' ? 'Idle' : (status === 'Idle' ? 'Verifying' : 'Running');
      }

      let cpu = agent.cpu;
      let mem = agent.mem;

      if (status === 'Running') {
        cpu = Math.max(0.2, (cpu + (Math.random() - 0.5) * 0.4)).toFixed(1);
        mem = Math.max(10, Math.round(mem + (Math.random() - 0.5) * 4));
      } else if (status === 'Verifying') {
        cpu = Math.max(1.5, (cpu + (Math.random() - 0.5) * 0.8)).toFixed(1);
        mem = Math.max(20, Math.round(mem + (Math.random() - 0.5) * 8));
      } else {
        cpu = '0.0';
      }

      return { ...agent, status, cpu, mem };
    });

    this.dom.agentTableBody.innerHTML = this.agentStates.map(agent => {
      let statusBadgeClass = 'healthy';
      if (agent.status === 'Idle') statusBadgeClass = 'warning';
      if (agent.status === 'Verifying') statusBadgeClass = 'info';

      return `<tr>
        <td style="font-family: monospace; font-weight: 600; color: var(--text-primary)">${agent.name}</td>
        <td><span class="status-badge status-badge--${statusBadgeClass}">${agent.status}</span></td>
        <td style="font-variant-numeric: tabular-nums">${agent.cpu}%</td>
        <td style="font-variant-numeric: tabular-nums">${agent.mem} MB</td>
      </tr>`;
    }).join('');
  }

  tickLiveTrafficData() {
    const ingressVal = Math.floor(Math.random() * 40 + 10);
    const egressVal = Math.floor(Math.random() * 60 + 15);

    this.liveTrafficHistory.ingress.shift();
    this.liveTrafficHistory.ingress.push(ingressVal);

    this.liveTrafficHistory.egress.shift();
    this.liveTrafficHistory.egress.push(egressVal);

    if (this.dom.liveIngressRate) this.dom.liveIngressRate.textContent = `${ingressVal} Mbps`;
    if (this.dom.liveEgressRate) this.dom.liveEgressRate.textContent = `${egressVal} Mbps`;
  }

  drawLiveNetworkChart() {
    if (this.dom.liveNetworkChart) {
      this.charts.drawLiveNetworkChart(this.dom.liveNetworkChart, this.liveTrafficHistory);
    }
  }

  pushLivePacketEvent() {
    if (!this.dom.livePacketStream) return;

    const verbs = ['ALLOW', 'ALLOW', 'BLOCKED', 'ALLOW', 'MITIGATED'];
    const protocols = ['TCP', 'UDP', 'HTTPS', 'SSH', 'ICMP', 'DNS'];
    const services = { TCP: 80, UDP: 53, HTTPS: 443, SSH: 22, ICMP: 8, DNS: 53 };

    const verb = this.data.randomChoice(verbs);
    const proto = this.data.randomChoice(protocols);
    const port = services[proto] || this.data.rand(1024, 65535);

    const srcIP = this.data.randomIP();
    const destIP = this.data.randomIP();
    const bytes = this.data.rand(40, 1500);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
    let color = '#00ff66';
    if (verb === 'BLOCKED') color = '#ff1744';
    if (verb === 'MITIGATED') color = '#ffab00';

    const logLine = `[${timeStr}] <span style="color:${color}; font-weight:bold">${verb}</span> ${proto} ${srcIP}:${this.data.rand(3000, 60000)} -> ${destIP}:${port} (${bytes} bytes)\n`;

    const consoleEl = this.dom.livePacketStream;
    const isFirst = consoleEl.innerHTML.includes('Initializing raw packet syslog stream...');
    if (isFirst) {
      consoleEl.innerHTML = logLine;
    } else {
      consoleEl.innerHTML += logLine;
    }

    const lines = consoleEl.innerHTML.split('\n');
    if (lines.length > 50) {
      consoleEl.innerHTML = lines.slice(lines.length - 50).join('\n');
    }

    consoleEl.scrollTop = consoleEl.scrollHeight;
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
