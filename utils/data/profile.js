// =====================================================================
// Roshan Kumar - portfolio data (single source of truth for the site)
// Derived from the master job profile (2026-11-03). Only public-facing
// facts live here: no CTC, job preferences or internal notes.
// Every line must stay TRUE.
// =====================================================================

export const profile = {
  name: "Roshan Kumar",
  firstName: "Roshan",
  lastName: "Kumar",
  headline: "Software Engineer",
  roles: ["Software Engineer", "AI Engineer", "Full-Stack Developer", "IoT & Embedded Apps"],
  location: "Bengaluru, Karnataka, India",
  email: "roshanhere03@gmail.com",
  phone: "+91-7368827906",
  photo: "/profile.png",
  resume: "https://drive.google.com/file/d/1oSVCI2Y-PrSV-HDcHWjp8fnnjUXFo_LA/view?usp=sharing",
  available: "Open to full-time roles · Batch 2026",
  tagline: "I take a client's problem all the way to a tested, deployed solution.",
  summary:
    "Software engineer (MCA 2026, CGPA 8.6) who takes a client's problem all the way to a tested, deployed solution. I owned the architecture of a fitness startup's app that connects to a Bluetooth Low Energy wearable, and built an all-in-one ERP for a JSW vendor that recouped ₹74,071 in missed GST credit. Strong in C++ and Python; hands-on with machine learning, computer vision, NLP/LLMs, REST APIs, Docker and CI, and databases (PostgreSQL, Supabase, MongoDB, Redis).",
  links: {
    github: "https://github.com/roshankumar1204",
    linkedin: "https://www.linkedin.com/in/roshan-kumar1204/",
    portfolio: "https://rizhu.netlify.app/",
  },
};

// Headline numbers (all from real work)
export const stats = [
  { value: 74071, prefix: "₹", label: "missed GST credit recouped", format: "inr" },
  { value: 150, suffix: "+", label: "employees the ERP is built for" },
  { value: 183, label: "pytest tests on one platform" },
  { value: 30, suffix: "+", label: "athletes tested the AI vision feature" },
];

// What I do (creative bento)
export const focusAreas = [
  {
    title: "Hardware meets software",
    body: "BLE wearables, device SDKs as native modules, sensor payload parsing, and reconnects that survive real-world signal drops.",
    tags: ["BLE / GATT", "React Native", "Sensor data"],
  },
  {
    title: "AI & agentic systems",
    body: "Vision LLMs, RAG, MCP-style tool calling and structured-output validation, so the model's answers get checked before anything ships.",
    tags: ["LLMs", "RAG", "LangChain", "MediaPipe"],
  },
  {
    title: "Data & backend",
    body: "Reconciliation, deduplication and schema-drift detection on PostgreSQL / Supabase behind FastAPI, Flask and Node APIs.",
    tags: ["FastAPI", "PostgreSQL", "Supabase"],
  },
  {
    title: "Ship it",
    body: "Docker on Google Cloud Run, Cloud Scheduler and Tasks, GitHub Actions CI, RLS, audit logs and automated backups.",
    tags: ["Docker", "Cloud Run", "CI/CD"],
  },
];

export const experience = [
  {
    title: "Contract Software Developer",
    company: "Shubham Engineering",
    context: "Industrial engineering contractor · vendor to JSW",
    period: "Jul 2026 - Present",
    tech: ["React", "Supabase (PostgreSQL)", "Row-Level Security", "Supabase Auth", "Google Drive backup"],
    metrics: [
      { value: "₹74,071", label: "credit recouped" },
      { value: "2-3 days → min", label: "statutory filing" },
      { value: "150+", label: "employees served" },
    ],
    achievements: [
      "Built and deployed an all-in-one ERP that replaced the company's Excel-and-email work for attendance, wages, ESIC/PF and GST, built for daily use by 150+ employees with role-based access.",
      "GST reconciliation: matched vendor credit notes against filed returns, reconciling ₹4,11,509 and recouping ₹74,071 in missed credit.",
      "One-click statutory files: ESIC, PF, wage and attendance records filled and downloaded in JSW's required formats, cutting a 2-3 day manual task to minutes.",
      "Secured with Row-Level Security and Supabase Auth, with an automated monthly backup to Google Drive.",
      "Gathered requirements directly from the owners and accounts team; shipped in short iterations, plus the company's first official website.",
    ],
  },
  {
    title: "Application Development Contributor (Architecture & Backend)",
    company: "Vyanx",
    context: "Fitness & sports startup · athlete app paired with a BLE wearable · Play Store beta",
    period: "2026",
    tech: ["React Native 0.76", "TypeScript", "Zustand", "React Navigation 7", "Firebase", "BLE SDK (native module)", "MediaPipe Pose"],
    metrics: [
      { value: "30+", label: "athletes tested" },
      { value: "5-stage", label: "BLE start-up sync" },
      { value: "0-100", label: "performance score" },
    ],
    achievements: [
      "Owned the app architecture for the wearable: the device SDK wrapped as a native module, BLE notifications routed through one event manager into a central Zustand store, so no screen talks to the hardware directly.",
      "Designed the BLE connection lifecycle: staged start-up sync, periodic battery and wellness polling, and exponential-backoff reconnect (3 s base, 30 s cap, 5 attempts).",
      "Wrote parsers for heart rate, HRV, SpO2, sleep stages and wrist temperature, with debounced local snapshots every 4 s so data survives app restarts.",
      "Turned raw readings into validated scores: performance (0-100), recovery, endurance, live fatigue-drop % and automatic weak-point detection.",
      "Built the Firebase backend (Auth + Firestore): device-ownership binding, a real-time leaderboard, and throttled progress writes.",
      "Built an AI vision feature with MediaPipe Pose that analyses an athlete's form from the camera and generates a personalised training plan; tested with 30+ athletes.",
    ],
  },
  {
    title: "Associate Software Engineer Intern",
    company: "Mphasis",
    context: "IT services",
    period: "Mar 2026 - May 2026",
    tech: ["Python", "scikit-learn", "Power BI"],
    metrics: [
      { value: "hours → min", label: "manual analysis" },
      { value: "ML", label: "integrated into data pipelines" },
    ],
    achievements: [
      "Built automated Python data pipelines with an integrated scikit-learn predictive model for business forecasting, reducing manual analysis from hours to minutes.",
      "Designed reusable preprocessing and feature-engineering modules shared across analytics workflows.",
      "Integrated ML prediction services into existing data pipelines and reported outputs in Power BI.",
    ],
  },
];

export const projects = [
  {
    name: "Soni Vault",
    kind: "Document AI for GST invoices",
    url: "https://soni-vault.netlify.app",
    featured: true,
    hue: 155,
    tech: ["Python", "Vision LLM", "LangChain", "Structured output"],
    summary:
      "A vision LLM reads a scanned GST bill and returns structured JSON. A validation layer checks GSTIN format and totals, and anything uncertain goes to a CA review queue, so nothing is filed unchecked.",
    achievements: [
      "Capture-to-review pipeline: vision LLM extracts date, vendor GSTIN, invoice number, taxable value, taxes and total as structured JSON.",
      "Validation checks GSTIN format and that taxable value + taxes = total; uncertain fields go to a confirm screen and a CA review queue.",
      "In beta with 2 CA firms.",
    ],
    badge: "Beta · 2 CA firms",
  },
  {
    name: "Cloner",
    kind: "Website-to-code generator",
    url: "https://cloner.live",
    featured: true,
    hue: 265,
    tech: ["Playwright", "Selenium", "React", "Tailwind", "LLMs", "Cloud Run"],
    summary:
      "Turns any live website into clean HTML or React + Tailwind code. Semantic analysis keeps the layout and strips hydration scripts and trackers.",
    achievements: [
      "End-to-end pipeline that converts any live website into clean HTML or React + Tailwind code.",
      "LLM code generation tuned to keep hallucination low; outputs a ready-to-run project.",
      "Deployed on Google Cloud Run; cuts manual front-end recreation from hours to under 2 minutes.",
    ],
    badge: "< 2 min per site",
  },
  {
    name: "Soni Joining Desk",
    kind: "Production AI platform",
    url: "",
    hue: 25,
    tech: ["Flask", "LangChain", "MCP", "RAG", "Cloud Run", "PostgreSQL", "pytest"],
    summary:
      "The core LLM engine behind Joining Desk and Soni Vault: tool calling, RAG memory and real-time voice over WebSocket, running on Cloud Run with scheduled jobs.",
    achievements: [
      "Core LLM engine (MCP-style tool calling, RAG conversational memory, LangChain orchestration), with real-time voice via Google Cloud TTS over WebSocket.",
      "Scheduled jobs on Cloud Scheduler + Cloud Tasks with OIDC service-account auth; secrets in Secret Manager.",
      "/health with deep DB and schema checks, structured JSON logs, and a job_runs table recording every run and AI call.",
      "RLS on every table, audit log, weekly encrypted backups via GitHub Actions, 183 pytest tests.",
    ],
    badge: "183 tests",
  },
  {
    name: "AI Spend Observability",
    kind: "Data connector platform",
    url: "https://ai-usage-ledger.vercel.app/",
    hue: 195,
    tech: ["FastAPI", "PostgreSQL", "React", "TypeScript", "TanStack Query", "OAuth2"],
    summary:
      "One canonical event schema that ChatGPT, Copilot and Cursor usage all map into, with hashed deduplication, late-cost backfill and schema-drift alerts.",
    achievements: [
      "Canonical AIUsageEvent schema; adding a new vendor takes one parser file.",
      "Deterministic dedup via hashed keys; late-cost backfill patches the existing row.",
      "Drift detection raises DRIFT_DETECTED on silent field renames or removals.",
      "Pluggable auth and pagination connectors with OAuth2 token caching; snapshot regression tests per vendor.",
    ],
    badge: "Drift detection",
  },
  {
    name: "Timeline Editor",
    kind: "Agentic AI video editor",
    url: "https://github.com/roshankumar1204/timiline_video-editor/",
    hue: 320,
    tech: ["React", "FastAPI", "LangChain", "RAG", "pytest"],
    summary:
      "An LLM agent searches the transcript with embeddings and issues structured tool calls against a Lamport-timestamped op-log, so its edits stay safe when several people edit at once.",
    achievements: [
      "Agent retrieves transcript context via embeddings (RAG) and issues structured tool calls against a Lamport-timestamped op-log.",
      "LLM-issued operations stay idempotent and safe under concurrent edits; merge → materialize → render pipeline.",
      "pytest suite for convergence, determinism and idempotency, plus a concurrent-editor simulation.",
    ],
    badge: "Lamport op-log",
  },
  {
    name: "ISL Translator",
    kind: "Indian Sign Language → Hindi",
    url: "https://github.com/roshankumar1204/ISL",
    hue: 45,
    tech: ["Python", "MediaPipe", "BiLSTM", "LLMs"],
    summary:
      "Extracts 21 hand landmarks per frame from the camera, recognises dynamic gestures with a BiLSTM, and turns the predictions into Hindi sentences in real time.",
    achievements: [
      "Real-time pipeline: 21-point hand landmarks → BiLSTM sequence model → LLM-built Hindi sentences.",
    ],
    badge: "Real-time CV",
  },
  {
    name: "Workflow Automation",
    kind: "Node-based pipeline builder",
    url: "https://vectorshift-tau.vercel.app/",
    hue: 120,
    tech: ["React", "ReactFlow", "FastAPI", "Tailwind"],
    summary:
      "A drag-and-drop pipeline canvas with a FastAPI backend that validates the DAG with three-state DFS cycle detection every time you save.",
    achievements: [
      "Node-based drag-and-drop pipeline canvas with React Flow.",
      "FastAPI DFS cycle detection (3-state) validates the DAG and returns node count, edge count and DAG status on every save.",
      "Workflow persistence, import/export and execution metadata via REST APIs.",
    ],
    badge: "DAG validation",
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Python", "C++", "SQL", "TypeScript", "JavaScript", "Java"] },
  { label: "AI / ML", items: ["LLMs", "RAG", "LangChain", "MCP / tool calling", "Multi-agent systems", "Vision LLMs", "Embeddings", "scikit-learn", "BiLSTM", "MediaPipe", "Prompt engineering"] },
  { label: "Backend", items: ["FastAPI", "Flask", "Node.js", "REST APIs", "WebSocket", "Microservices", "OAuth2 / OIDC", "Firebase"] },
  { label: "Frontend & Mobile", items: ["React", "React Native", "Angular", "TanStack Query", "Zustand", "Tailwind CSS", "ReactFlow", "Recharts"] },
  { label: "Data", items: ["PostgreSQL", "Supabase", "MongoDB", "Redis", "Reconciliation", "Deduplication", "Schema-drift detection", "Power BI"] },
  { label: "Cloud & DevOps", items: ["Docker", "Google Cloud Run", "Cloud Scheduler", "Cloud Tasks", "Secret Manager", "GitHub Actions", "CI/CD", "Linux", "Vercel", "Netlify"] },
  { label: "IoT & Hardware", items: ["Bluetooth Low Energy", "GATT notifications", "Wearable sensors", "Device SDK integration", "Android BLE"] },
  { label: "Testing & Security", items: ["pytest", "Playwright", "Selenium", "Snapshot testing", "Row-Level Security", "RBAC", "Audit logging"] },
];

export const learning = ["Kubernetes", "LangGraph", "Kafka", "AWS Bedrock", "Prometheus", "Grafana"];

export const education = [
  {
    degree: "MCA, Master of Computer Applications",
    institution: "Presidency University, Bengaluru",
    year: "2026",
    score: "CGPA 8.6 / 10",
  },
  {
    degree: "BCA, Bachelor of Computer Applications",
    institution: "Amity University, Ranchi",
    year: "2024",
    score: "CGPA 7.65 / 10",
  },
];

export const certifications = [
  "AWS SimuLearn: Cloud Practitioner",
  "Java (HackerRank)",
];
