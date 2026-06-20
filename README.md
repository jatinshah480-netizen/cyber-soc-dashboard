# 🛡️ Cyber SOC Dashboard

A real-time **Security Operations Center (SOC) console** combined with an interactive **Cybersecurity Training Hub**. Built entirely with **vanilla JavaScript, HTML5 Canvas, and CSS3** — no frameworks, no chart libraries, no dependencies. The goal was to understand SOC operations and core security concepts deeply enough to model their logic in working code, not just read about them.

The project bundles two connected modules into one suite.

---

## 🎨 Architecture

```bash
├── index.html            # SOC monitoring dashboard
├── index.css             # Dark glassmorphic dashboard layout
├── app.js                # SOC simulation loops, metrics, canvas rendering engine
│
├── cybersecurity.html    # Cybersecurity training center
├── cyber-tasks.css       # Training center styling and layout
└── cyber-tasks.js        # Mission task logic and validation
```

---

## 🚀 Core Features

### 1. Live SOC Monitoring Console (`index.html` + `app.js`)

- **Telemetry Engine:** Generates simulated proxy logs, integrity alerts, credential anomalies, and intrusion indicators in real time
- **Canvas-based Analytics:** Custom-built charts (no chart library) for a rolling 24-hour event timeline, severity queues, and asset compliance status
- **Live Traffic & Health Ticker:** Streaming ingress/egress traffic chart alongside simulated service health monitors (`snort-ids`, `wazuh-agent`, etc.)
- **Offensive Testing Playground:** An interactive terminal simulating red-team scenarios (SQL injection, RCE exploitation, credential stuffing) paired with an IOC (Indicator of Compromise) scanner

### 2. Cybersecurity Training Center (`cybersecurity.html` + `cyber-tasks.js`)

- **OP-01 — Log Triage:** Analyze raw SIEM log data to identify active attacks
- **OP-02 — Vulnerability Management:** Match discovered CVEs to the correct vendor patches
- **OP-03 — Incident Response:** Sequence-based simulator for containing breaches — lock accounts, block payloads, and restore from backup within a time threshold
- **OP-04 — Identity Governance:** Enforce MFA policies and suspend high-risk contractor accounts to prevent privilege misuse
- **OP-05 — Phishing Triage:** Inspect sender authentication and links to identify social-engineering attempts
- **Certification:** Tracks performance across all 5 modules and generates a completion summary

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Logic | Vanilla ES6+ JavaScript (no external libraries) |
| Graphics | HTML5 Canvas API |
| Structure | Semantic HTML5 |
| Styling | CSS Grid, Flexbox, glassmorphism, CSS custom properties |
| Typography | Inter (UI), monospace (terminal) |

---

## ⚙️ Implementation Notes

**Retina/DPI-aware canvas scaling:**

```javascript
const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
```

**Independent update intervals** to keep telemetry simulation decoupled from rendering performance:

- Live traffic ticker — every 1s
- KPI cards — every 10s
- Event timeline — every 15s
- Patch compliance check — every 45s

---

## 🚀 Quick Start

No build step, no dependencies, no server required.

```bash
git clone https://github.com/jatinshah480-netizen/cyber-soc-dashboard.git
cd cyber-soc-dashboard
```

Then either:
- Open `index.html` directly in any modern browser to view the SOC dashboard, and use the sidebar **"Mission Control"** link to open the training hub (`cybersecurity.html`)

- Or serve it locally:
```bash
python -m http.server 8080
# or
npx serve .
```

