# 🛡️ CyberSOC Dashboard — Security Operations Center Console

A high-fidelity, real-time **Security Operations Center (SOC) Monitoring Dashboard** built entirely using **pure vanilla JavaScript, HTML5 Canvas, and modern CSS3**. Featuring a sleek dark-cyberpunk glassmorphic aesthetic, it simulates an enterprise-grade incident response console without relying on heavy frameworks or external charting libraries.

---

## 🚀 Core Subsystem Features

* **Real-Time Simulation Engine (`DataEngine`):** Procedurally generates randomized security logs, indicator mutations, firewall messages, authentication telemetry, backup schedules, and modern zero-day CVE vulnerability data.


* **Zero-Dependency Data Visualization (`ChartManager`):** Renders high-performance performance graphics directly on responsive HTML5 Canvas nodes using custom drawing paths and cubic ease-out animations.


* *Event Timeline:* Interactive smoothed Bezier curve area chart tracking rolling system logs over the last 24 hours.


* *Severity Distribution:* Segmented dynamic donut chart tracking ongoing incident triage levels.


* *Compliance Metric:* Adaptive horizontal gradient chart assessing dynamic patching statuses across organizational nodes.




* **Interactive Orchestration Pipeline (`DashboardApp`):** Coordinates global loop orchestrations, caches DOM nodes, triggers alert notification panels, handles manual "Apply Patch" executions, and structures internal relative time calculations.



---

## 📁 Repository Structure

The layout is built with three streamlined, production-ready files:

```bash
├── index.html       # Structural skeleton, semantic metric widgets, and native SVG vectors.
├── index.css        # Cyberpunk design system tokens, layout models, and glassmorphic utilities.
└── app.js           # Core execution module: contains the data simulator, canvas engine, and state controller.

```

### Module Blueprint

1. **`DataEngine`**: Houses underlying probability schemas, network subnets, IP randomizers, mock message pools, and metric generation logic.


2. **`ChartManager`**: Handles canvas context pre-rendering logic, DPI scale adaptations, text layout measurements, grids, and drawing routines.


3. **`DashboardApp`**: The interface controller managing global timed loops, relative timeframe formatting, view synchronization, and interactive UI component responses.



---

## 🛠️ Tech Stack & UI Profile

| Architectural Layer | Technical Implementation |
| --- | --- |
| **Language Runtime** | Vanilla ES6+ JavaScript (Strict OOP, Encapsulated Module Pattern)

 |
| **Graphics Interface** | HTML5 Native Canvas API (`2D Context`)

 |
| **Layout Layer** | Semantic HTML5 & Responsive Inline SVG Graphics

 |
| **Styling Paradigm** | Flexbox & CSS Grid Layouts, Glassmorphism, Root Custom Properties, CSS Animations

 |
| **Typography Framework** | Inter Font Family Integration

 |

---

## 📈 System Optimizations

### ⚡ Retina / High-DPI Canvas Scaling

To avoid blurry line paths on dense screen configurations, the `ChartManager` computes the backing store `devicePixelRatio` to stretch canvas dimensional matrices instantly:

```javascript
const dpr = window.devicePixelRatio || 1;
const rect = canvas.getBoundingClientRect();
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);

```

### ⏱️ Staggered Performance Interval Matrix

To optimize main-thread parsing speeds, the application uses decoupled, async-staggered update parameters instead of checking every state within a single block:

* **Global KPI Indicators:** Evaluated every `10,000ms`

* **Network Chronograph Timeline:** Rebalanced every `15,000ms`

* **Asset Severity Metrics:** Recomputed every `20,000ms`

* **Incident Streaming Pipeline:** Randomized distribution delay loop between `3,000ms` and `8,000ms`


---

## ⚙️ Quick Start

This application requires **zero installations, dependencies, or bundlers**.

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/soc-dashboard.git
cd soc-dashboard

```



```
2.  **Launch the Environment:**
    * Double-click `index.html` to execute the system instantly inside any modern desktop web browser.
    * *Alternatively, launch via a standard local server for advanced testing:*
    ```bash
    # Python 3.x Environment
    python -m http.server 8080
    
    # Node / NPM Environments
    npx serve 
