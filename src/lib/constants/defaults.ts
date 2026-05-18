import type { Offering, ContactInfo, SeoMetadata } from "@/lib/types";

export const DEFAULT_OFFERINGS: Offering[] = [
  {
    id: "1",
    slug: "financial-planning",
    title: "Financial Planning",
    short_desc: "Personalized goal planning aligned with your life milestones.",
    full_desc:
      "Comprehensive family goal planning with risk-profile assessment, investment horizon analysis, and personalized recommendations tailored to your unique situation.",
    features: [
      "Family goal planning",
      "Risk-profile assessment",
      "Investment horizon analysis",
      "Personalized recommendations",
    ],
    icon_name: "Target",
    is_published: true,
    sort_order: 1,
    updated_at: "",
  },
  {
    id: "2",
    slug: "mutual-funds",
    title: "Mutual Funds",
    short_desc: "SIP, STP, SWP, and lumpsum across all fund categories.",
    full_desc:
      "Curated mutual fund portfolios spanning equity, debt, hybrid, and sectoral categories. Systematic investment plans designed for long-term wealth creation.",
    features: [
      "Systematic Investment Plans (SIP)",
      "Systematic Transfer Plans (STP)",
      "Systematic Withdrawal Plans (SWP)",
      "Lumpsum investments",
    ],
    icon_name: "TrendingUp",
    is_published: true,
    sort_order: 2,
    updated_at: "",
  },
  {
    id: "3",
    slug: "portfolio-management",
    title: "Portfolio Management Services (PMS)",
    short_desc: "Research-driven sophisticated investment for HNI clients.",
    full_desc:
      "Sophisticated investment options for high-net-worth individuals. Research-driven strategies with active portfolio management and transparent reporting.",
    features: [
      "Research-driven stock selection",
      "Active portfolio monitoring",
      "Customized strategies",
      "Detailed performance reporting",
    ],
    icon_name: "BarChart3",
    is_published: true,
    sort_order: 3,
    updated_at: "",
  },
  {
    id: "4",
    slug: "aif",
    title: "Alternative Investment Funds (AIF)",
    short_desc: "Beyond mutual funds — industry-research backed alternatives.",
    full_desc:
      "Access to alternative asset classes beyond conventional mutual funds. Industry research backed investment in private equity, hedge funds, and structured products.",
    features: [
      "Private equity access",
      "Hedge fund strategies",
      "Structured products",
      "Industry research backed",
    ],
    icon_name: "Layers",
    is_published: true,
    sort_order: 4,
    updated_at: "",
  },
  {
    id: "5",
    slug: "algo-plans",
    title: "Proprietary Algorithm-Based Plans",
    short_desc: "Algorithmic SIP and lumpsum for superior risk-adjusted returns.",
    full_desc:
      "Proprietary algorithms drive our systematic investment plans delivering superior risk-adjusted returns. Data-driven signals replace human emotion from investment decisions.",
    features: [
      "Algorithmic SIP (superior returns)",
      "Algorithmic Lumpsum",
      "Data-driven signals",
      "Emotion-free investing",
    ],
    icon_name: "Cpu",
    is_published: true,
    sort_order: 5,
    updated_at: "",
  },
  {
    id: "6",
    slug: "insurance",
    title: "Insurance Products",
    short_desc: "Life, Health, and General Insurance under one roof.",
    full_desc:
      "Comprehensive insurance solutions covering life, health, and general insurance needs. Proper risk coverage is the foundation of any sound financial plan.",
    features: [
      "Life Insurance",
      "Health Insurance",
      "General Insurance (car/motor)",
      "Risk assessment consultation",
    ],
    icon_name: "Shield",
    is_published: true,
    sort_order: 6,
    updated_at: "",
  },
];

export const DEFAULT_CONTACT: ContactInfo[] = [
  {
    id: "1",
    type: "office",
    label: "Hyderabad Office",
    value:
      "3rd Floor, 91 Springboard, Mytri Square, 2-41/11, 6/2, Gachibowli - Miyapur Rd, Prashanth Nagar Colony, Hyderabad, Telangana 500084",
    meta: { city: "Hyderabad", state: "Telangana", is_primary: true },
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "2",
    type: "office",
    label: "Bengaluru Office",
    value:
      "91springboard Outer Ring Road (ORR), 512/10, Service Lane Mahadevapura, Bengaluru, Karnataka 560048",
    meta: { city: "Bengaluru", state: "Karnataka", is_primary: false },
    is_visible: true,
    sort_order: 2,
  },
  {
    id: "3",
    type: "phone",
    label: "Landline",
    value: "040-7963-2712",
    meta: { is_primary: false },
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "4",
    type: "phone",
    label: "Mobile",
    value: "+91-6200059635",
    meta: { is_primary: true },
    is_visible: true,
    sort_order: 4,
  },
  {
    id: "5",
    type: "email",
    label: "General Enquiry",
    value: "care@echowin.in",
    meta: { is_primary: true },
    is_visible: true,
    sort_order: 5,
  },
  {
    id: "6",
    type: "email",
    label: "Managing Director",
    value: "tanmay.harsh@echowin.in",
    meta: { is_primary: false },
    is_visible: true,
    sort_order: 6,
  },
  {
    id: "7",
    type: "whatsapp",
    label: "WhatsApp",
    value: "+91-6200059635",
    meta: { is_primary: true },
    is_visible: true,
    sort_order: 7,
  },
];

export const DEFAULT_SEO: Record<string, SeoMetadata> = {
  home: {
    id: "1",
    page: "home",
    title:
      "Echowin Wealth — Data-Driven Financial Advisory & Investment Management",
    description:
      "Powered by Data Analytics & Investment Algorithms. AMFI (SEBI) Registered Mutual Fund Distributor. Financial Advisory and Investment Management in Hyderabad & Bengaluru.",
    og_title: "Echowin Wealth — Data-Driven Financial Advisory",
    og_description:
      "AMFI (SEBI) Registered. Algorithm-backed wealth management for every one.",
    og_image_url: null,
    canonical_url: "https://echowin.in",
    keywords: [
      "financial advisor hyderabad",
      "mutual fund distributor",
      "investment management",
      "SIP",
      "PMS",
      "AIF",
    ],
  },
};

export const DEFAULT_CONTENT: Record<string, Record<string, string>> = {
  "home.hero.headline": "Powered by Data Analytics & Investment Algorithms",
  "home.hero.subheadline":
    "Echowin Wealth is a Financial Advisory and Investment Management Firm",
  "home.hero.cta_text": "Sign Up",
  "home.hero.cta_url": "https://forms.gle/Ms74pz9vdEqfs6u99",
  "home.hero.name_change_notice":
    "Formerly HealthofWealth Financial Advisors Private Limited",
  "home.trust.amfi_label": "AMFI (SEBI) Registered Mutual Fund Distributor",
  "home.trust.startup_label": "Startup India Recognised",
  "about.mission.headline": "Our Mission",
  "about.mission.body":
    "To look after the best financial interests of each of our clients",
  "about.philosophy.headline": "Our Philosophy",
  "about.philosophy.body":
    "Bringing top notch investment solutions for every one",
  "about.approach.headline": "Process Centric Data Backed Approach",
  "about.approach.subheadline":
    "Analytics Backed Quality Investing Recommendations",
} as unknown as Record<string, Record<string, string>>;
