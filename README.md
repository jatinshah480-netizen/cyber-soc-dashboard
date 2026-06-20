# 🛡️ Advanced Security Operations Center & Cybersecurity Mission Control

An enterprise-grade, real-time **Security Operations Center (SOC) Console** combined with an interactive **Cybersecurity Mission Control & Training Hub**. This fully unified, frameworkless suite is engineered entirely using **pure vanilla JavaScript, HTML5 Canvas, and modern CSS3**, providing a rich interactive playground for security telemetry, offensive attack simulation, and defensive incident response validation without third-party chart engines or dependencies.

The platform effectively bundles two interconnected architectures into a single, seamless product ecosystem.

---

## 🎨 System Architecture Overview

The codebase is split logically between an active network-wide monitoring node and a structured, hands-on operator simulation lab.

```bash
├── index.html            # Core SOC Monitoring Dashboard interface[cite: 10]
├── index.css             # Root dark-cyberpunk glassmorphic layout tokens[cite: 9]
├── app.js                # SOC background simulation loops, metrics, and canvas drawing engine[cite: 4]
│
├── cybersecurity.html    # Interactive Cybersecurity Training Center module[cite: 5]
├── cyber-tasks.css       # Neon structural design stylesheets, hero vectors, and fluid parallax paths[cite: 6, 7]
└── cyber-tasks.js        # Mission Control task validation algorithms and logic handler

```

---

## 🚀 Core Subsystem Features

### 1. Live SOC Monitoring Console (`index.html` & `app.js`)

* **Procedural Telemetry Engine (`DataEngine`):** Live model generating randomized proxy logs, integrity alerts, credential mutations, intrusion indicators, and system diagnostic records.


* **Zero-Dependency Performance Analytics (`ChartManager`):** Utilizes direct HTML5 Canvas geometric mappings and Bezier curves to chart a rolling 24-Hour Event Timeline, Severity queues, and dynamic Asset Compliance maps.


* **Live Traffic Ingestion & Health Ticker:** Streams an ongoing area chart plotting incoming ingress and egress packet thresholds alongside native resource monitors tracking system daemons (`snort-ids`, `wazuh-agent`, etc.).


* **Offensive Testing Playground:** Simulates realistic red-team pipelines directly inside an interactive, printing terminal window (SQL Injections, Apache RCE exploits, Credential Stuffing) coupled with an endpoint radar scanner checking for latent Indicators of Compromise (IOCs).



### 2. Cybersecurity Training Center (`cybersecurity.html` & `cyber-tasks.js`)

* **OP-01 Log Triage Lab:** Analyzes raw SIEM dump telemetry to correctly identify and check ongoing attacks.


* **OP-02 Vulnerability Lifecycle:** Executes network scanner evaluations and accurately matches discovered CVE indexes with production-safe vendor patches.


* **OP-03 Sequential Incident Response:** A real-time incident controller that tests speed and sequence protocols to lock out accounts, block payloads, and securely restore corrupted segments from offline backups before threat spread factors break network thresholds.


* **OP-04 Identity Governance:** Enforces access management audits against privilege inflation threats, toggling Multi-Factor Authentication (MFA) mandates or issuing directory suspensions against high-risk contractor assets.


* **OP-05 Phishing Triage Simulator:** An inbound mail queue audit suite designed to analyze sender authentication vectors and hover link tooltips to expose social engineering templates.


* **Verifiable Specialist Certification:** A dynamic script validation loop assessing task variables across all 5 operational exercises to generate and print a customized graduation layout.



---

## 🛠️ Unified Technical Stack

| System Layer | Technical Framework |
| --- | --- |
| **Execution Layer** | Strict Object-Oriented Vanilla ES6+ JavaScript (Zero external scripts or node modules).

 |
| **Graphics Middleware** | HTML5 Native Canvas API using low-level dynamic render context paths.

 |
| **Interface Blueprint** | Semantic HTML5 Mock Structures & Responsive Vector Graphics.

 |
| **Styling Paradigm** | Flexbox & CSS Grid, Glassmorphism, root UI token custom properties, localized scrollbars.

 |
| **Typography Framework** | Google Inter Display and monospace terminal families.

 |

---

## 📈 System Optimizations

### ⚡ Retina-Crisp Canvas Scalers

The canvas layouts adapt automatically to rich viewport setups (DPI/Retina monitors) by actively pulling physical bounding rect constraints against structural device pixel parameters before resetting context factors:

```javascript
const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);

```

### ⏱️ Staggered Non-Blocking Performance Matrix

Update threads run asynchronously on isolated interval timers to decouple telemetry overhead from core frame rendering timelines:

* **Live Bandwidth Traffic Ticks:** Refreshes dynamically every `1,000ms`

* **KPI Telemetry Cards:** Synchronizes globally every `10,000ms`

* **Network Chronograph Timelines:** Renders area structures every `15,000ms`

* **Patch Queue Engine Compliance:** Evaluates missing packages every `45,000ms`


---

## ⚙️ Quick Start

This project requires zero package compilation, initialization tasks, or server dependencies.

1. **Clone the Architecture:**
```bash
git clone https://github.com/your-username/unified-soc-suite.git
cd unified-soc-suite

```



```
2.  **Launch Ecosystem Viewports:**
    *   Open `index.html` inside any modern browser to track live operational logs[cite: 10].
    *   Navigate to the lower menu block inside the sidebar nav layout and click **"Mission Control"** to immediately split out and launch the standalone training room simulator (`cybersecurity.html`)[cite: 10].
    *   *Alternatively, easily launch via light local HTTP web servers for developer environment tracking:*
        ```bash
        # Python 3 Environments
        python -m http.server 8080
        
        # Node NPM Ecosystems
        npx serve .

