/** Content for the About chapters. Facts mirror EXPERIENCE_BANK.md — update both together. */

export type Chapter = { id: string; number: string; label: string };

export const CHAPTERS: readonly Chapter[] = [
  { id: "intro", number: "01", label: "Intro" },
  { id: "approach", number: "02", label: "Approach" },
  { id: "experience", number: "03", label: "Experience" },
  { id: "wins", number: "04", label: "Wins" },
  { id: "education", number: "05", label: "Education" },
  { id: "toolkit", number: "06", label: "Toolkit" },
];

export type Metric = {
  /** Numbers count up when shown; strings appear as-is */
  value: number | string;
  prefix?: string;
  suffix?: string;
  /** Decimal places to show (4.0 is an integer to JS, so GPA needs this) */
  decimals?: number;
  label: string;
};

export type Role = {
  /** Short name for the scrolling index */
  index: string;
  org: string;
  title: string;
  place: string;
  dates: string;
  metrics: readonly [Metric, Metric];
  body: string;
};

export const ROLES: readonly Role[] = [
  {
    index: "Humana",
    org: "Humana",
    title: "Software Engineer Intern",
    place: "Louisville, KY",
    dates: "Summer 2026 → Present",
    metrics: [
      { value: 72, suffix: "%", label: "Faster certification cycles" },
      { value: 18, label: "Python automation scripts" },
    ],
    body: "Deployed AI products to every L2 team through a Vertex AI multi-agent platform with Azure DevOps CI/CD — and cleared a 90-day backlog for 13 engineers.",
  },
  {
    index: "PGA of America",
    org: "The PGA of America",
    title: "Machine Learning Engineer Intern",
    place: "Dallas, TX",
    dates: "May → Aug 2025",
    metrics: [
      { value: 12, label: "ML systems shipped" },
      { value: 500, suffix: "+", label: "Engineers adopted the tooling" },
    ],
    body: "RAG pipelines in Python/FastAPI/Docker with CI/CD alongside 14 ML engineers. Standardized Docker tooling and cleared integration blockers 3 weeks early.",
  },
  {
    index: "Krowe",
    org: "Krowe Technologies",
    title: "Founding Software Engineer",
    place: "Dallas, TX",
    dates: "Aug 2023 → Present",
    metrics: [
      { value: 300, prefix: "$", suffix: "K", label: "Raised" },
      { value: 23, label: "Startups" },
    ],
    body: "Modular agentic AI platform and developer marketplace on React/Next.js and FastAPI, letting AI developers sell custom agentic tools to SMB clients.",
  },
  {
    index: "UT CCBB",
    org: "UT Center for Computational Biology & Bioinformatics",
    title: "Undergraduate Researcher",
    place: "Austin, TX",
    dates: "Nov 2025 → Present",
    metrics: [
      { value: 40, suffix: "%", label: "Fewer data errors" },
      { value: "HPC", label: "Pipelines on TACC clusters" },
    ],
    body: "Python ML pipeline identifying genomic mutation sites in time-series data, with automated statistical validation and reproducible Git workflows on Linux.",
  },
  {
    index: "Nixar",
    org: "Nixar Solutions",
    title: "Software Engineer Intern",
    place: "Allen, TX",
    dates: "May → Aug 2024",
    metrics: [
      { value: 18, suffix: "%", label: "Conversion lift" },
      { value: 533, suffix: "%", label: "Interaction growth" },
    ],
    body: "Five-figure revenue shipping React/Next.js features with multi-agent AI pipelines. A/B tests and KPI dashboards that boosted reach 582%.",
  },
  {
    index: "TCG",
    org: "Technology Consulting Group",
    title: "Technology Consultant",
    place: "Austin, TX",
    dates: "Aug 2025 → Present",
    metrics: [
      { value: 120, prefix: "$", suffix: "K", label: "Raise enabled for XFund" },
      { value: 27, label: "States mapped" },
    ],
    body: "Agentic investment-diligence system on the Claude API for XFund ($190M fund), plus a 27-state geospatial pipeline and dashboard for Well Water Finders.",
  },
  {
    index: "Texas Convergent",
    org: "Texas Convergent",
    title: "Software Engineer",
    place: "Austin, TX",
    dates: "Jul 2025 → Present",
    metrics: [
      { value: 35, suffix: "%", label: "Throughput gain, AMOS Labs" },
      { value: "Live", label: "HealthKit athlete dashboards" },
    ],
    body: "TypeScript recursive AI agent for AMOS Labs (Capital Factory), and a React Native/Node.js app streaming Apple HealthKit biometrics to live athlete dashboards.",
  },
  {
    index: "B.A.X.A.",
    org: "Business Analytics Association",
    title: "ML & Software Developer",
    place: "Austin, TX",
    dates: "Jul 2025 → Present",
    metrics: [
      { value: 1, suffix: "st", label: "Of 150 teams, T-Mobile Hackathon" },
      { value: 140, label: "Members served" },
    ],
    body: "NumPy/Keras ML pipeline for a 140-member analytics club, plus a React/Supabase member portal tracking engagement across 8 monthly events.",
  },
];

export const PRINCIPLES = [
  {
    word: "SHIP",
    body: "End-to-end ownership, from first commit to production — founding engineer at Krowe, and enterprise AI deployed to every Humana L2 team.",
  },
  {
    word: "MEASURE",
    body: "Evals, telemetry, and statistical validation so features stay reliable after launch — the habit behind 40% fewer data errors in genomics research.",
  },
  {
    word: "ITERATE",
    body: "Clear APIs and reproducible workflows make the next version cheap. Latency and correctness are hard constraints.",
  },
] as const;

export const FOCUS_AREAS = [
  "Agentic tooling",
  "Multi-agent orchestration",
  "RAG & embeddings",
  "Statistical validation at scale",
] as const;

export type Win = {
  value: number;
  prefix?: string;
  suffix?: string;
  /** Shown after the number in smaller type, e.g. "/ 150" */
  of?: string;
  title: string;
  detail: string;
};

/** The two headline wins get the large tiles */
export const HEADLINE_WINS: readonly Win[] = [
  {
    value: 1,
    suffix: "st",
    title: "Best Overall — HBA×CSBA Hack Day",
    detail: "Keystone: a LangGraph/Gemini multi-agent real estate platform, built in 5 hours.",
  },
  {
    value: 1,
    suffix: "st",
    of: "/ 150",
    title: "1st of 150 teams — T-Mobile Hackathon",
    detail: "NumPy/Keras ML pipeline with the Business Analytics Association.",
  },
];

export const WINS: readonly Win[] = [
  { value: 300, prefix: "$", suffix: "K", title: "Raised", detail: "Founding engineer, Krowe" },
  { value: 120, prefix: "$", suffix: "K", title: "Raise enabled", detail: "XFund diligence, TCG" },
  { value: 1000, suffix: "+", title: "Students served", detail: "Campus Connect AI" },
  { value: 72, suffix: "%", title: "Faster cert cycles", detail: "Humana" },
];

export const EDUCATION = {
  school: "The University of Texas at Austin",
  degrees: ["B.S. Computer Science", "B.S. Statistics & Data Science"],
  gpa: 4.0,
  graduation: "May 2028",
  research: {
    title: "Undergraduate Researcher",
    lab: "UT Center for Computational Biology & Bioinformatics",
    dates: "Nov 2025 → Present",
    body: "Identifying genomic mutation sites in time-series data with a Python ML pipeline on TACC HPC clusters — automated statistical validation cut data errors 40%.",
  },
} as const;

export const TOOLKIT = [
  {
    group: "Languages & frameworks",
    items: ["Python", "TypeScript", "JavaScript", "React", "Node.js", "FastAPI", "LangGraph", "TensorFlow", "Keras"],
  },
  {
    group: "Infrastructure & AI",
    items: ["PostgreSQL", "MongoDB", "Docker", "AWS", "Azure DevOps", "CI/CD", "Git", "Supabase", "RAG", "Vector embeddings"],
  },
] as const;

export const INTRO_STATS: readonly Metric[] = [
  { value: 4, decimals: 1, label: "GPA" },
  { value: 2, label: "B.S. degrees" },
  { value: 8, label: "Roles" },
  { value: 2, suffix: "×", label: "Hackathon wins" },
];
