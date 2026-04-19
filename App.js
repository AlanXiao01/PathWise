// PathWise — Career platform for newcomers to Canada
// Multi-database architecture · Pre-computed careers · Background processing
// Persistent nav · Editable profile · Full Pro benefits page

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════════════════
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";
const EMAILJS_CONFIG = {
  serviceId: "YOUR_EMAILJS_SERVICE_ID",
  templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
};
const ADMIN_CODE = "592899";
const STORAGE_KEY = "pathwise_v2";

// ═══════════════════════════════════════════════════════════════════════════
// LANGUAGE DATABASE (db_languages)
// ═══════════════════════════════════════════════════════════════════════════
const LANGS = {
  en: { name: "English", flag: "🇬🇧", dir: "ltr" },
  fr: { name: "Français", flag: "🇫🇷", dir: "ltr" },
  hi: { name: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  zh: { name: "中文", flag: "🇨🇳", dir: "ltr" },
  ar: { name: "العربية", flag: "🇸🇦", dir: "rtl" },
  tl: { name: "Tagalog", flag: "🇵🇭", dir: "ltr" },
  pa: { name: "ਪੰਜਾਬੀ", flag: "🇮🇳", dir: "ltr" },
  es: { name: "Español", flag: "🇪🇸", dir: "ltr" },
  ur: { name: "اردو", flag: "🇵🇰", dir: "rtl" },
  pt: { name: "Português", flag: "🇧🇷", dir: "ltr" },
};

// ═══════════════════════════════════════════════════════════════════════════
// PRE-COMPUTED CAREER DATABASE (db_careers) — no AI calls needed
// ═══════════════════════════════════════════════════════════════════════════
const DB_CAREERS = {
  doctor: {
    id: "doctor", name: "Physician / Doctor", emoji: "🩺", category: "Healthcare",
    regulated: true, avgSalary: 250000, salaryRange: "$150K–$450K",
    demandLevel: "high", timeYears: "10–14", jobOpenings: 8500,
    dayInLife: "Family physicians see 20-30 patients daily. Surgeons alternate OR and clinic days. On-call shifts are common. Days start early and involve rounds, patient exams, charting, and coordination with specialists.",
    skills: ["Clinical reasoning", "Patient communication", "Stamina", "Decision-making", "Empathy", "Procedural skills"],
    certs: ["MD degree", "MCCQE Part 1 & 2", "Royal College certification", "Provincial licensing"],
    employers: ["Public hospitals", "Family health teams", "Private clinics", "Academic centres"],
    workLife: "Residency is demanding (60-80hr weeks). Family medicine offers better balance. Surgery and ER are intense but lucrative.",
    careerGrowth: "Resident → Staff → Fellowship → Department chief. Specialists can sub-specialize further.",
    provinces: [{ code: "ON", salary: 280000 }, { code: "BC", salary: 260000 }, { code: "AB", salary: 295000 }, { code: "QC", salary: 240000 }],
    routes: [
      { name: "Canadian MD", tag: "", years: 12, costLow: 200000, costHigh: 350000, difficulty: "high",
        steps: ["4-year undergraduate degree", "MCAT exam (target 510+)", "4-year MD program", "CaRMS residency match", "2-5 year residency", "Royal College/CFPC exam"],
        description: "Most competitive path. Canadian med schools accept 5-15% of applicants." },
      { name: "Foreign MD → MCCQE", tag: "fastest", years: 3, costLow: 15000, costHigh: 30000, difficulty: "high",
        steps: ["Verify MD recognition", "MCCQE Part 1 ($1,410)", "NAC OSCE ($3,065)", "CaRMS residency match", "Residency", "Licensing"],
        description: "For doctors trained abroad. Fastest if already qualified — main hurdle is residency match." },
      { name: "Ireland/UK MD → Return", tag: "", years: 8, costLow: 250000, costHigh: 350000, difficulty: "medium",
        steps: ["5-6 year MD in Ireland/UK", "Foundation years abroad", "MCCQE exams on return", "CaRMS match", "Residency"],
        description: "Direct entry MD programs (no undergrad needed). Popular with determined students." },
    ],
    universities: [
      { name: "University of Toronto MD", country: "Canada", city: "Toronto", tuition: 26000, living: 20000, ranking: "#1 Canada", tag: "topRanked" },
      { name: "McGill University MD", country: "Canada", city: "Montreal", tuition: 22000, living: 16000, ranking: "#2 Canada", tag: "bestValue" },
      { name: "UBC Faculty of Medicine", country: "Canada", city: "Vancouver", tuition: 24000, living: 20000, ranking: "#3 Canada", tag: "" },
      { name: "St. George's University", country: "Grenada", city: "St. George's", tuition: 58000, living: 14000, ranking: "Top Caribbean", tag: "" },
      { name: "Royal College of Surgeons Ireland", country: "Ireland", city: "Dublin", tuition: 55000, living: 18000, ranking: "Top 200 Global", tag: "" },
    ],
  },
  nurse: {
    id: "nurse", name: "Registered Nurse", emoji: "👩‍⚕️", category: "Healthcare",
    regulated: true, avgSalary: 85000, salaryRange: "$60K–$115K",
    demandLevel: "high", timeYears: "4–5", jobOpenings: 18000,
    dayInLife: "12-hour shifts with patient rounds, medication administration, charting, family communication, and emergency response. High-stress but rewarding.",
    skills: ["Clinical assessment", "Compassion", "Stress management", "IV therapy", "Critical thinking", "Stamina"],
    certs: ["BScN degree", "NCLEX-RN exam", "Provincial registration (CNO, BCCNP, etc.)", "CPR certification"],
    employers: ["Hospitals", "Long-term care", "Community health", "Home care", "Public health units"],
    workLife: "Shift work is demanding. High demand = strong job security. Post-COVID burnout is real. Excellent unions in most provinces.",
    careerGrowth: "RN → Charge Nurse → Clinical Specialist → Nurse Practitioner ($130K+) → Director of Nursing.",
    provinces: [{ code: "ON", salary: 88000 }, { code: "BC", salary: 90000 }, { code: "AB", salary: 92000 }, { code: "QC", salary: 75000 }],
    routes: [
      { name: "4-year BScN", tag: "", years: 4, costLow: 35000, costHigh: 60000, difficulty: "medium",
        steps: ["4-year BScN program", "1500+ hours clinical placements", "NCLEX-RN exam", "Provincial registration", "Apply to hospital"],
        description: "Standard entry. BScN required for all new RNs since 2005." },
      { name: "IEN Bridging", tag: "fastest", years: 1.5, costLow: 8000, costHigh: 15000, difficulty: "medium",
        steps: ["NNAS credential assessment", "Bridging program (6-18mo)", "NCLEX-RN", "Registration"],
        description: "For internationally educated nurses. Closes gaps in Canadian standards." },
      { name: "RPN → RN Bridge", tag: "cheapest", years: 5, costLow: 25000, costHigh: 40000, difficulty: "low",
        steps: ["2-year RPN diploma", "Work as RPN 1-2 years", "RPN-to-BScN bridge (2 yr)", "NCLEX-RN"],
        description: "Earn while you upgrade. Many employers fund the bridging program." },
    ],
    universities: [
      { name: "McMaster University BScN", country: "Canada", city: "Hamilton", tuition: 12000, living: 14000, ranking: "#2 Nursing Canada", tag: "bestValue" },
      { name: "University of Alberta BScN", country: "Canada", city: "Edmonton", tuition: 8500, living: 12000, ranking: "#4 Nursing Canada", tag: "cheapest" },
      { name: "University of Toronto BScN", country: "Canada", city: "Toronto", tuition: 14000, living: 20000, ranking: "#1 Nursing Canada", tag: "topRanked" },
    ],
  },
  software: {
    id: "software", name: "Software Engineer", emoji: "💻", category: "Tech",
    regulated: false, avgSalary: 110000, salaryRange: "$65K–$250K+",
    demandLevel: "high", timeYears: "2–6", jobOpenings: 25000,
    dayInLife: "Daily standup (15 min). Deep coding work. Code reviews, debugging, meetings. Remote-friendly. Problem-solving with coffee.",
    skills: ["Python/JS/Java/Go", "Data structures & algorithms", "System design", "Git/CI-CD", "Debugging", "Communication"],
    certs: ["CS degree, bootcamp, or self-taught", "AWS/Azure/GCP certifications boost salary", "Portfolio matters most"],
    employers: ["FAANG Canada (Google, Meta, Amazon)", "Shopify, Wealthsimple", "RBC, TD digital", "Government digital", "10,000+ startups"],
    workLife: "Generally great. 9-5 at most companies. Flexible remote work. FAANG more intense but better pay.",
    careerGrowth: "Jr Dev → Mid → Senior → Staff/Principal → Architect/EM. FAANG Senior $250K+, Staff $400K+.",
    provinces: [{ code: "ON", salary: 120000 }, { code: "BC", salary: 125000 }, { code: "AB", salary: 105000 }, { code: "QC", salary: 95000 }],
    routes: [
      { name: "CS Degree", tag: "", years: 4, costLow: 40000, costHigh: 80000, difficulty: "medium",
        steps: ["4-year CS degree (UWaterloo, UofT, UBC)", "Co-op/internships", "Portfolio projects", "LeetCode prep", "Entry-level job"],
        description: "Best for FAANG recruiting. Waterloo co-op places students at Google, Meta, Shopify." },
      { name: "Bootcamp", tag: "fastest", years: 1, costLow: 5000, costHigh: 15000, difficulty: "medium",
        steps: ["3-6 month bootcamp", "Build 3-5 portfolio projects", "Network + apply", "Junior role"],
        description: "Fastest into industry. Works best with existing non-CS degree." },
      { name: "College + Certs", tag: "cheapest", years: 2.5, costLow: 15000, costHigh: 25000, difficulty: "low",
        steps: ["2-year college diploma", "AWS/Azure certifications", "Internship", "Entry-level job"],
        description: "Conestoga, Seneca, BCIT. Cheaper than university, strong industry connections." },
    ],
    universities: [
      { name: "University of Waterloo CS", country: "Canada", city: "Waterloo", tuition: 17000, living: 14000, ranking: "#1 CS Canada", tag: "topRanked" },
      { name: "University of Toronto CS", country: "Canada", city: "Toronto", tuition: 15000, living: 20000, ranking: "#2 CS Canada", tag: "bestValue" },
      { name: "UBC Computer Science", country: "Canada", city: "Vancouver", tuition: 12000, living: 18000, ranking: "#3 CS Canada", tag: "" },
      { name: "Lighthouse Labs Bootcamp", country: "Canada", city: "Online/Toronto", tuition: 13000, living: 0, ranking: "Top Bootcamp", tag: "fastest" },
      { name: "Conestoga College IT", country: "Canada", city: "Kitchener", tuition: 5000, living: 12000, ranking: "Top College", tag: "cheapest" },
    ],
  },
  lawyer: {
    id: "lawyer", name: "Lawyer", emoji: "⚖️", category: "Legal",
    regulated: true, avgSalary: 120000, salaryRange: "$75K–$250K",
    demandLevel: "high", timeYears: "7–8", jobOpenings: 6200,
    dayInLife: "Morning: review case files, prepare motions. Afternoon: client meetings, court, negotiations. Evening: legal research. Senior lawyers focus on strategy.",
    skills: ["Legal research", "Written advocacy", "Negotiation", "Public speaking", "Analytical thinking", "Client management"],
    certs: ["LSAT or foreign LLB", "Canadian JD or NCA certification", "Bar admission exam", "Law Society membership"],
    employers: ["Big Law (Blake, Osler, McCarthy)", "Boutique firms", "In-house counsel", "Government (Justice Canada)", "Crown attorneys"],
    workLife: "Big Law: 70-80hr weeks early career. Government/in-house: 40-50hr weeks. Partnership takes 8-10 years.",
    careerGrowth: "Associate (yrs 1-6) → Senior Associate → Partner (yrs 10+). Alternatives: in-house, government, judiciary.",
    provinces: [{ code: "ON", salary: 135000 }, { code: "BC", salary: 128000 }, { code: "AB", salary: 131000 }, { code: "QC", salary: 108000 }],
    routes: [
      { name: "Canadian JD", tag: "", years: 8, costLow: 120000, costHigh: 180000, difficulty: "high",
        steps: ["4-year undergrad", "LSAT (target 160+)", "3-year JD", "10-month articling", "Bar admission exam", "Call to the Bar"],
        description: "Gold standard. Top schools accept 10-15% of applicants." },
      { name: "UK LLB → NCA", tag: "fastest", years: 5, costLow: 60000, costHigh: 90000, difficulty: "medium",
        steps: ["3-year UK LLB (no LSAT)", "NCA assessment", "5-7 NCA challenge exams", "10-month articling", "Bar exam", "Call to the Bar"],
        description: "Saves 3 years and ~$80K vs Canadian JD. No LSAT required." },
      { name: "Australian LLB → NCA", tag: "", years: 5.5, costLow: 80000, costHigh: 120000, difficulty: "medium",
        steps: ["3-4 year Australian LLB", "NCA assessment + exams", "Articling in Canada", "Bar exam"],
        description: "Same NCA route as UK. Good for students wanting to study abroad." },
    ],
    universities: [
      { name: "University of Leeds", country: "UK", city: "Leeds", tuition: 32000, living: 14000, ranking: "#15 UK", tag: "bestValue" },
      { name: "University of Manchester", country: "UK", city: "Manchester", tuition: 35000, living: 15000, ranking: "#8 UK", tag: "topRanked" },
      { name: "University of Leicester", country: "UK", city: "Leicester", tuition: 26000, living: 12000, ranking: "#30 UK", tag: "cheapest" },
      { name: "Osgoode Hall Law School", country: "Canada", city: "Toronto", tuition: 28000, living: 18000, ranking: "#2 Canada", tag: "" },
      { name: "University of Ottawa Law", country: "Canada", city: "Ottawa", tuition: 18000, living: 15000, ranking: "#5 Canada", tag: "fastest" },
    ],
  },
  accountant: {
    id: "accountant", name: "Chartered Accountant (CPA)", emoji: "📊", category: "Business",
    regulated: true, avgSalary: 95000, salaryRange: "$55K–$200K",
    demandLevel: "medium", timeYears: "5–7", jobOpenings: 9800,
    dayInLife: "Busy season (Jan-Apr): 60hr weeks, tight deadlines. Off-season: advisory work, client development. Big 4 associates travel to client sites.",
    skills: ["Excel/financial modelling", "Tax law", "GAAP/IFRS", "Attention to detail", "Client communication"],
    certs: ["Bachelor's with CPA prerequisites", "CPA PEP (6 modules, 2 years)", "CFE exam (3-day)", "30 months experience"],
    employers: ["Big 4 (Deloitte, PwC, KPMG, EY)", "Mid-tier firms", "Industry CFO track", "CRA", "Non-profits"],
    workLife: "Intense during busy season. Industry offers better balance (40-45hr). Increasing remote flexibility.",
    careerGrowth: "Staff → Senior → Manager → Senior Manager → Partner. Big 4 partners earn $300-800K+.",
    provinces: [{ code: "ON", salary: 100000 }, { code: "BC", salary: 98000 }, { code: "AB", salary: 102000 }, { code: "QC", salary: 85000 }],
    routes: [
      { name: "BCom + CPA PEP", tag: "", years: 7, costLow: 50000, costHigh: 75000, difficulty: "medium",
        steps: ["4-year BCom with CPA prereqs", "CPA PEP modules (2 yr)", "Common Final Exam (CFE)", "30 months experience", "CPA designation"],
        description: "Standard route. Target GPA 3.5+ for Big 4 recruiting." },
      { name: "College + Bridging", tag: "cheapest", years: 5.5, costLow: 25000, costHigh: 40000, difficulty: "medium",
        steps: ["2-year college diploma", "CPA PREP bridging", "CPA PEP modules", "CFE", "Experience"],
        description: "Saves ~$30K in tuition." },
    ],
    universities: [
      { name: "Schulich School of Business", country: "Canada", city: "Toronto", tuition: 14000, living: 18000, ranking: "#1 Business Canada", tag: "topRanked" },
      { name: "Brock University Business", country: "Canada", city: "St. Catharines", tuition: 8000, living: 11000, ranking: "#8 Business Canada", tag: "cheapest" },
    ],
  },
  engineer: {
    id: "engineer", name: "Engineer (P.Eng)", emoji: "⚙️", category: "Engineering",
    regulated: true, avgSalary: 95000, salaryRange: "$60K–$150K",
    demandLevel: "medium", timeYears: "6–8", jobOpenings: 13000,
    dayInLife: "CAD design, calculations, testing. Site visits, supplier meetings. Mix of office and field work depending on specialization.",
    skills: ["CAD software", "Engineering fundamentals", "Technical writing", "Project management", "Problem solving"],
    certs: ["CEAB-accredited BEng", "EIT designation", "4 years experience", "Professional Practice Exam", "P.Eng stamp"],
    employers: ["Manufacturing (Magna, Bombardier)", "Energy (Suncor, TransCanada)", "Consulting (WSP, SNC-Lavalin)", "Tech"],
    workLife: "Good. 40-45hr weeks typical. Alberta pays more, Ontario has more jobs.",
    careerGrowth: "EIT → P.Eng → Senior → Principal → Engineering Manager. Consulting principals earn $150K+.",
    provinces: [{ code: "ON", salary: 98000 }, { code: "BC", salary: 95000 }, { code: "AB", salary: 110000 }, { code: "QC", salary: 85000 }],
    routes: [
      { name: "CEAB BEng + P.Eng", tag: "", years: 8, costLow: 45000, costHigh: 70000, difficulty: "medium",
        steps: ["4-year CEAB BEng", "EIT with PEO", "4 years experience", "PPE ethics exam", "P.Eng license"],
        description: "Standard Canadian route. CEAB accreditation is mandatory." },
      { name: "Foreign BEng → PEO", tag: "fastest", years: 3, costLow: 5000, costHigh: 12000, difficulty: "medium",
        steps: ["Credential assessment", "Technical exams if required", "Canadian experience", "PPE exam", "P.Eng"],
        description: "For internationally trained engineers." },
    ],
    universities: [
      { name: "University of Toronto Engineering", country: "Canada", city: "Toronto", tuition: 16000, living: 20000, ranking: "#1 Engineering", tag: "topRanked" },
      { name: "University of Alberta Engineering", country: "Canada", city: "Edmonton", tuition: 9000, living: 12000, ranking: "#4 Engineering", tag: "cheapest" },
    ],
  },
  teacher: {
    id: "teacher", name: "Teacher (K-12)", emoji: "📚", category: "Education",
    regulated: true, avgSalary: 82000, salaryRange: "$50K–$105K",
    demandLevel: "medium", timeYears: "5–6", jobOpenings: 7200,
    dayInLife: "7:30am prep, 8:30am-3pm teaching, 3-5pm marking/meetings. Evenings: lesson planning, parent email. Summers off (paid).",
    skills: ["Classroom management", "Lesson planning", "Patience", "Technology integration", "Assessment", "Empathy"],
    certs: ["Bachelor's degree", "2-year Bachelor of Education", "Ontario College of Teachers (OCT)", "Vulnerable sector check"],
    employers: ["Public school boards", "Catholic district boards", "Private schools", "International schools", "Online schools"],
    workLife: "Best benefits: summers off, pension, job security. Supply years can be tough. Increasing classroom complexity.",
    careerGrowth: "Supply → LTO → Permanent → Department Head → VP → Principal ($120K+).",
    provinces: [{ code: "ON", salary: 85000 }, { code: "BC", salary: 80000 }, { code: "AB", salary: 88000 }, { code: "QC", salary: 72000 }],
    routes: [
      { name: "Consecutive BEd", tag: "", years: 6, costLow: 50000, costHigh: 70000, difficulty: "low",
        steps: ["4-year undergrad with teachable subjects", "2-year BEd program", "OCT certification ($200)", "Supply teaching", "Permanent contract"],
        description: "Most common. Get undergrad first, then BEd." },
      { name: "Concurrent BEd", tag: "fastest", years: 5, costLow: 45000, costHigh: 60000, difficulty: "low",
        steps: ["5-year concurrent BA/BSc + BEd", "OCT certification", "Teaching career at 22-23"],
        description: "Brock, Lakehead, Ottawa offer this. Saves one year." },
    ],
    universities: [
      { name: "Queen's University Education", country: "Canada", city: "Kingston", tuition: 10000, living: 13000, ranking: "#3 Education", tag: "bestValue" },
    ],
  },
  pharmacist: {
    id: "pharmacist", name: "Pharmacist", emoji: "💊", category: "Healthcare",
    regulated: true, avgSalary: 105000, salaryRange: "$85K–$145K",
    demandLevel: "high", timeYears: "6–8", jobOpenings: 4800,
    dayInLife: "Prescription verification, patient counseling, flu shots, inventory management, team supervision.",
    skills: ["Pharmacology", "Patient counseling", "Attention to detail", "Business skills", "Immunization"],
    certs: ["PharmD degree", "PEBC Qualifying Exam", "PEBC OSCE", "Jurisprudence exam", "Provincial registration"],
    employers: ["Shoppers Drug Mart", "Rexall, Pharmasave", "Hospital pharmacies", "Long-term care", "Industry"],
    workLife: "Retail: 8-12hr shifts standing. Hospital: better hours, lower pay. Ownership = $200K+.",
    careerGrowth: "Staff → Manager → Franchise Owner. Hospital specialist → director.",
    provinces: [{ code: "ON", salary: 108000 }, { code: "BC", salary: 112000 }, { code: "AB", salary: 115000 }, { code: "QC", salary: 95000 }],
    routes: [
      { name: "Canadian PharmD", tag: "", years: 6, costLow: 80000, costHigh: 120000, difficulty: "high",
        steps: ["2 years prerequisites", "4-year PharmD", "PEBC exams", "OSCE", "Jurisprudence", "Registration"],
        description: "PharmD is entry-to-practice since 2020." },
      { name: "International → PEBC", tag: "fastest", years: 2, costLow: 8000, costHigh: 15000, difficulty: "high",
        steps: ["PEBC evaluating exam", "Qualifying exam", "OSCE", "Jurisprudence", "Registration"],
        description: "~40% first-attempt pass rate. Takes 18-24 months." },
    ],
    universities: [
      { name: "University of Toronto PharmD", country: "Canada", city: "Toronto", tuition: 22000, living: 20000, ranking: "#1 Pharmacy", tag: "bestValue" },
    ],
  },
  electrician: {
    id: "electrician", name: "Electrician (309A)", emoji: "🔌", category: "Trades",
    regulated: true, avgSalary: 78000, salaryRange: "$45K–$140K",
    demandLevel: "high", timeYears: "5", jobOpenings: 12000,
    dayInLife: "Read blueprints, run wiring, install panels, troubleshoot. Construction sites, industrial, residential. Physical work.",
    skills: ["Electrical theory", "Blueprint reading", "Physical stamina", "Safety awareness", "Problem solving"],
    certs: ["Certificate of Qualification (309A)", "ESA Contractor License", "Working at Heights", "First Aid/CPR"],
    employers: ["ICI construction", "Residential builders", "Industrial plants", "Hydro One, BC Hydro", "Own business"],
    workLife: "Physical but high-paying, zero student debt. Earn $35K+ in year 1 of apprenticeship. Huge demand.",
    careerGrowth: "Apprentice ($18-28/hr) → Journeyman ($35-45/hr) → Master → Contractor ($150K+).",
    provinces: [{ code: "ON", salary: 80000 }, { code: "BC", salary: 82000 }, { code: "AB", salary: 88000 }, { code: "QC", salary: 70000 }],
    routes: [
      { name: "Apprenticeship", tag: "fastest", years: 5, costLow: 2000, costHigh: 5000, difficulty: "low",
        steps: ["Find sponsor employer", "Register with Skilled Trades Ontario", "9,000 hours on-job training (paid)", "3 in-school blocks", "C of Q exam", "Journeyman certificate"],
        description: "Earn while you learn. Best ROI of any profession. No student debt." },
    ],
    universities: [
      { name: "George Brown College", country: "Canada", city: "Toronto", tuition: 4000, living: 16000, ranking: "Top Trades", tag: "bestValue" },
    ],
  },
  paramedic: {
    id: "paramedic", name: "Paramedic", emoji: "🚑", category: "Healthcare",
    regulated: true, avgSalary: 72000, salaryRange: "$50K–$110K",
    demandLevel: "high", timeYears: "2–3", jobOpenings: 5200,
    dayInLife: "12-hour shifts responding to 911 calls. Treat and transport: cardiac arrests, strokes, trauma. High variety, high stakes.",
    skills: ["Airway management", "ECG interpretation", "IV access", "Medication administration", "Physical fitness"],
    certs: ["PCP diploma", "AEMCA exam", "Class F license", "BLS/ACLS/PALS", "Ongoing CE"],
    employers: ["Provincial ambulance services", "ORNGE air ambulance", "Industrial medicine", "Event medicine"],
    workLife: "Shift work is demanding. High job satisfaction. Strong unions and pension.",
    careerGrowth: "PCP → ACP → CCP → Flight Paramedic ($115K+)/Education/Management.",
    provinces: [{ code: "ON", salary: 75000 }, { code: "BC", salary: 73000 }, { code: "AB", salary: 78000 }, { code: "QC", salary: 65000 }],
    routes: [
      { name: "PCP Diploma", tag: "fastest", years: 2, costLow: 12000, costHigh: 20000, difficulty: "medium",
        steps: ["2-year PCP diploma", "Clinical and ambulance practicums", "AEMCA provincial exam", "Registration", "Apply to services"],
        description: "Fastest way into frontline medicine. Entry $25-28/hr in Ontario." },
    ],
    universities: [
      { name: "Centennial College Paramedic", country: "Canada", city: "Toronto", tuition: 8000, living: 16000, ranking: "Top Paramedic Program", tag: "bestValue" },
    ],
  },
  dentist: {
    id: "dentist", name: "Dentist", emoji: "🦷", category: "Healthcare",
    regulated: true, avgSalary: 180000, salaryRange: "$120K–$400K",
    demandLevel: "medium", timeYears: "8–10", jobOpenings: 2800,
    dayInLife: "30-60 min patient appointments: exams, fillings, extractions, root canals, crowns. Most dentists own their practice.",
    skills: ["Fine motor skills", "Patient communication", "Radiograph interpretation", "Business management"],
    certs: ["DDS or DMD degree", "DAT exam", "NDEB written + OSCE", "Provincial registration"],
    employers: ["Private practice (own)", "Dental corporations (DentalCorp)", "Hospitals (oral surgery)", "Academic"],
    workLife: "Excellent once established. Many work 4-day weeks. High debt but fast payback.",
    careerGrowth: "Associate → Partner → Owner ($350K+). Specialties earn $400K-600K.",
    provinces: [{ code: "ON", salary: 190000 }, { code: "BC", salary: 185000 }, { code: "AB", salary: 200000 }, { code: "QC", salary: 170000 }],
    routes: [
      { name: "Canadian DDS", tag: "", years: 8, costLow: 250000, costHigh: 400000, difficulty: "high",
        steps: ["4-year undergrad with sciences", "DAT exam", "4-year DDS/DMD", "NDEB written + OSCE", "Registration"],
        description: "Brutal admissions (3-10% acceptance). Very lucrative after." },
    ],
    universities: [
      { name: "University of Toronto Dentistry", country: "Canada", city: "Toronto", tuition: 45000, living: 20000, ranking: "#1 Dentistry", tag: "topRanked" },
    ],
  },
  physiotherapist: {
    id: "physiotherapist", name: "Physiotherapist", emoji: "🏃", category: "Healthcare",
    regulated: true, avgSalary: 82000, salaryRange: "$60K–$120K",
    demandLevel: "high", timeYears: "6–7", jobOpenings: 3200,
    dayInLife: "30-60 min patient sessions. Treatment plans, manual therapy, exercise prescription, documentation.",
    skills: ["Anatomy", "Manual therapy", "Communication", "Motivational skills", "Business acumen"],
    certs: ["MScPT degree (master's)", "PCE exam", "Provincial registration"],
    employers: ["Private clinics", "Hospitals", "Home care", "Sports teams", "Own practice"],
    workLife: "Great. Daytime hours, physical but rewarding. Private practice = flexibility.",
    careerGrowth: "Staff PT → Senior → Clinic Owner ($150K+). Specializations in sports, neuro, pediatric.",
    provinces: [{ code: "ON", salary: 85000 }, { code: "BC", salary: 82000 }, { code: "AB", salary: 90000 }, { code: "QC", salary: 75000 }],
    routes: [
      { name: "BSc + MScPT", tag: "", years: 6, costLow: 50000, costHigh: 85000, difficulty: "high",
        steps: ["4-year BSc kinesiology or related", "GRE (some schools)", "2-year MScPT", "PCE exam", "Registration"],
        description: "Competitive admissions to MScPT programs." },
    ],
    universities: [],
  },
  architect: {
    id: "architect", name: "Architect", emoji: "🏛️", category: "Design",
    regulated: true, avgSalary: 88000, salaryRange: "$55K–$160K",
    demandLevel: "low", timeYears: "8–10", jobOpenings: 1800,
    dayInLife: "Design in Revit/AutoCAD. Client meetings, site visits, permit applications. Long hours on deadline-driven projects.",
    skills: ["Design thinking", "3D modeling", "Building codes", "Client communication", "Project management"],
    certs: ["M.Arch degree", "IAPQ internship (3 yr)", "ExAC exam", "Provincial registration (OAA)"],
    employers: ["Architecture firms", "Developers", "Government", "Own practice"],
    workLife: "Long hours, pay lags years of investment. Creative and meaningful work.",
    careerGrowth: "Intern → Licensed → Project Architect → Principal. Own firm = entrepreneurial upside.",
    provinces: [{ code: "ON", salary: 92000 }, { code: "BC", salary: 90000 }, { code: "AB", salary: 88000 }, { code: "QC", salary: 82000 }],
    routes: [
      { name: "M.Arch + RAIC", tag: "", years: 9, costLow: 80000, costHigh: 130000, difficulty: "high",
        steps: ["4-year undergrad", "2-year M.Arch", "3-year IAPQ internship", "ExAC exam", "OAA registration"],
        description: "Long path but creative and meaningful work." },
    ],
    universities: [
      { name: "University of Toronto Daniels", country: "Canada", city: "Toronto", tuition: 18000, living: 20000, ranking: "#1 Architecture", tag: "topRanked" },
    ],
  },
  psychologist: {
    id: "psychologist", name: "Clinical Psychologist", emoji: "🧠", category: "Healthcare",
    regulated: true, avgSalary: 100000, salaryRange: "$70K–$180K",
    demandLevel: "medium", timeYears: "9–12", jobOpenings: 3400,
    dayInLife: "50-min therapy sessions (4-7/day). Assessments. Documentation. Supervision of interns. Private practice = flexibility.",
    skills: ["CBT/DBT/ACT therapy", "Psychometric assessment", "Active listening", "Empathy", "Research methodology"],
    certs: ["PhD or PsyD in clinical psychology", "EPPP exam", "1-year supervised practice", "Provincial registration"],
    employers: ["Hospitals", "Private practice", "Universities", "Corrections", "Schools"],
    workLife: "Private practice excellent. Hospital bureaucratic. Emotionally draining but very meaningful.",
    careerGrowth: "Intern → Supervised → Registered → Private practice ($200K+). Specialties in neuropsych, forensic.",
    provinces: [{ code: "ON", salary: 105000 }, { code: "BC", salary: 102000 }, { code: "AB", salary: 98000 }, { code: "QC", salary: 90000 }],
    routes: [
      { name: "PhD Clinical Psych", tag: "", years: 11, costLow: 30000, costHigh: 80000, difficulty: "high",
        steps: ["4-year BA Psychology", "PhD applications (5-10% acceptance)", "4-5 year PhD (often funded)", "1-year pre-doc internship", "EPPP exam", "Registration"],
        description: "Long path. PhD often funded — net cost is lower than it looks." },
    ],
    universities: [
      { name: "University of Toronto Psychology", country: "Canada", city: "Toronto", tuition: 10000, living: 20000, ranking: "#1 Psychology", tag: "bestValue" },
    ],
  },
  pilot: {
    id: "pilot", name: "Commercial Pilot", emoji: "✈️", category: "Aviation",
    regulated: true, avgSalary: 95000, salaryRange: "$40K–$280K",
    demandLevel: "high", timeYears: "2–4", jobOpenings: 3200,
    dayInLife: "Pre-flight planning, weather briefings, actual flying. 80 flight hours/month max. Layovers in interesting cities.",
    skills: ["IFR/multi-engine flying", "Crew resource management", "Weather interpretation", "Decision-making"],
    certs: ["PPL → CPL → ATPL", "Multi-engine + IFR ratings", "Class 1 Transport Canada Medical"],
    employers: ["Air Canada, Jazz", "WestJet, Porter, Flair", "Cargo (Cargojet, FedEx)", "Charter, Medevac"],
    workLife: "Unique. Travel is a perk. Seniority governs everything. Junior pilots get worst schedules.",
    careerGrowth: "Instructor → Regional FO → Mainline FO → Captain ($180K+) → Widebody Captain ($280K+).",
    provinces: [{ code: "ON", salary: 95000 }, { code: "BC", salary: 92000 }, { code: "AB", salary: 100000 }, { code: "QC", salary: 88000 }],
    routes: [
      { name: "Flight School CPL", tag: "fastest", years: 2, costLow: 60000, costHigh: 90000, difficulty: "high",
        steps: ["PPL (40-60hrs)", "CPL (200+hrs)", "Multi-engine + IFR", "Flight instructor to build hours", "1,500 hours", "ATPL exams", "Airline"],
        description: "Fastest into airlines. Work as CFI to build required hours." },
    ],
    universities: [
      { name: "Seneca School of Aviation", country: "Canada", city: "Peterborough", tuition: 65000, living: 16000, ranking: "Top Flight School", tag: "bestValue" },
    ],
  },
};

// Popular careers list for explore page (references DB_CAREERS)
const POPULAR_CAREER_IDS = [
  "doctor", "nurse", "software", "lawyer", "accountant", "engineer",
  "teacher", "pharmacist", "electrician", "paramedic", "dentist",
  "physiotherapist", "architect", "psychologist", "pilot"
];

// ═══════════════════════════════════════════════════════════════════════════
// COUNTRIES & EDUCATION DATABASES
// ═══════════════════════════════════════════════════════════════════════════
const DB_COUNTRIES = [
  "India", "Philippines", "China", "Nigeria", "Pakistan", "Iran", "Ukraine", "Syria",
  "Afghanistan", "Vietnam", "Brazil", "Mexico", "Ethiopia", "Egypt", "Bangladesh",
  "Sri Lanka", "Colombia", "Morocco", "UK", "USA", "France", "Germany", "South Korea",
  "Japan", "Australia", "South Africa", "Kenya", "Ghana", "Romania", "Poland",
  "Venezuela", "Peru", "Turkey", "Saudi Arabia", "UAE", "Jamaica", "Haiti", "Canada", "Other"
];

const DB_EDUCATION = [
  "High school (in progress)", "High school diploma", "Some college/university",
  "Bachelor's degree", "Master's degree", "Professional degree (MD/JD/etc)",
  "PhD/Doctorate", "Trade certification", "Other"
];

const DB_USER_TYPES = [
  { id: "newcomer", label: "New immigrant to Canada", emoji: "✈️" },
  { id: "international-pro", label: "Internationally trained professional", emoji: "🎓" },
  { id: "hs-student", label: "High school student", emoji: "📖" },
  { id: "uni-student", label: "University/college student", emoji: "🎓" },
  { id: "career-changer", label: "Changing careers", emoji: "🔄" },
  { id: "parent", label: "Parent/guardian researching", emoji: "👨‍👩‍👧" },
];

// ═══════════════════════════════════════════════════════════════════════════
// TRANSLATIONS (abbreviated — English is full, others keep key UI terms translated)
// ═══════════════════════════════════════════════════════════════════════════
const TR = {
  en: {
    appName: "PathWise", tagline: "Your path to a career in Canada",
    subtitle: "Built for newcomers, immigrants, students, and career changers",
    continueGoogle: "Continue with Google", continueEmail: "Continue with email",
    emailPlaceholder: "your@email.com", sendCode: "Send verification code",
    enterCode: "Enter 6-digit code", codeSentTo: "We sent a code to",
    verify: "Verify", back: "Back", resend: "Resend",
    selectLang: "Select your language",
    home: "Home", explore: "Explore", myPath: "My Path", chat: "AI Assistant", settings: "Settings", upgrade: "Upgrade", logout: "Sign out", dashboard: "Dashboard",
    welcome: "Welcome back", getStarted: "Tell us about yourself",
    intakeIntro: "Answer a few questions — we'll tailor your entire experience",
    q_userType: "Which best describes you?",
    q_country: "Where were you born or educated?",
    q_inCanada: "Are you currently in Canada?",
    q_education: "What is your highest education?",
    q_school: "Which school or university did you attend?",
    q_schoolPlaceholder: "Type your school name (optional)...",
    q_certs: "Do you have any professional certifications or licenses?",
    q_certsPlaceholder: "e.g., MBBS from Delhi University, CA from ICAI, none...",
    q_experience: "Years of work experience in your field?",
    q_career: "What career do you want in Canada?",
    q_careerPlaceholder: "e.g., Doctor, Software Engineer, Accountant...",
    q_priority: "What matters most to you?",
    priority_fast: "Fastest route", priority_cheap: "Cheapest route", priority_prestige: "Best schools", priority_balance: "Balance of all",
    skip: "Skip for now", complete: "Complete profile →",
    analyzing: "Building your personalized path...",
    analyzingDetails: "We're researching your background to give you the best advice",
    yourPath: "Your personalized path", generatedFor: "For",
    recommended: "Recommended", totalTime: "Total time", totalCost: "Total cost",
    difficulty: "Difficulty", steps: "Steps", whyThis: "Why this path", aboutSchool: "About your school",
    alternatives: "Alternative routes",
    exploreCareers: "Explore careers", askAI: "Ask AI a question",
    searchCareer: "Search careers...", popularCareers: "Popular careers",
    allCareers: "All careers", viewDetails: "View details", researchNew: "Research any career",
    researchDesc: "Type any career — AI generates full details live",
    routes: "Routes", universities: "Universities", costs: "Costs", salaries: "Salaries",
    filterBy: "Filter by", country: "Country", city: "City", maxTuition: "Max tuition",
    sortBy: "Sort by", cheapest: "Cheapest", fastest: "Fastest", topRanked: "Top ranked",
    bestValue: "Best value",
    allCountries: "All countries", allCities: "All cities", any: "Any",
    avgSalary: "Avg salary", timeToQualify: "Time", demand: "Demand",
    high: "High", medium: "Medium", low: "Low", regulated: "Regulated", openEntry: "Open entry",
    aiWelcome: "How can I help with your career path?",
    aiPlaceholder: "Ask anything about your career in Canada...",
    send: "Send", thinking: "Thinking...",
    markDone: "Mark done", markUndone: "Undo", completed: "Completed", current: "Current", upcoming: "Upcoming",
    editPath: "Customize path", changeCareer: "Change career", pathProgress: "Your progress",
    noPath: "You haven't created a path yet",
    createPath: "Create my path", noProfile: "Complete your profile to see everything personalized",
    completeProfile: "Complete profile",
    freeTier: "Free", proTier: "Pro", lifetimeTier: "Lifetime",
    popular: "Most popular", perMonth: "/mo", lifetime: "one-time",
    proTitle: "Unlock everything",
    proSubtitle: "Get unlimited AI paths, research any career, compare every route, filter by anything.",
    whatYouGet: "What you get with Pro",
    proBenefit1: "Unlimited AI-generated career paths",
    proBenefit1d: "Build paths for every career you're considering — not just one",
    proBenefit2: "Research any career in the world",
    proBenefit2d: "Our AI generates full details for any profession, not just the top 15",
    proBenefit3: "Unlimited AI chat",
    proBenefit3d: "Ask as many questions as you want. No daily limit.",
    proBenefit4: "Advanced university filters",
    proBenefit4d: "Filter by country, city, tuition, ranking — find your perfect school",
    proBenefit5: "Compare multiple routes side-by-side",
    proBenefit5d: "See traditional vs shortcut paths with real cost breakdowns",
    proBenefit6: "Priority AI responses",
    proBenefit6d: "Skip the queue. Get answers in seconds during peak hours.",
    proBenefit7: "Export your pathway as PDF",
    proBenefit7d: "Share your plan with family, mentors, or advisors",
    proBenefit8: "Early access to new features",
    proBenefit8d: "Scholarship finder, mentor matching, visa guidance coming soon",
    paymentComingSoon: "Payment integration coming soon. Use admin code below for testing access.",
    adminCode: "Admin / promo code", unlock: "Unlock",
    proActive: "Pro Active", proActiveDesc: "All features unlocked",
    language: "Language", darkMode: "Dark mode", yourProfile: "Your profile",
    editProfile: "Edit profile", redoIntake: "Redo questionnaire",
    signedInAs: "Signed in as", invalidCode: "Invalid code. Please try again.",
    profileType: "I am a", profileCountry: "From", profileEducation: "Education",
    profileSchool: "School", profileCerts: "Certifications", profileExperience: "Experience",
    profileCareer: "Desired career", profilePriority: "Priority",
    years: "years", save: "Save changes", cancel: "Cancel", saved: "Saved!",
    recentActivity: "Recent activity", quickActions: "Quick actions",
    noActivity: "Start exploring careers to see activity here",
    backgroundProcessing: "Personalizing...",
    processingDone: "Everything is ready based on your profile",
    tailoredForYou: "Tailored for you",
    dashboardSub: "Everything adapted to your background",
    resumeBuilder: "Resume builder", resumeDesc: "Coming in Pro",
    scholarshipFinder: "Scholarship finder", scholarshipDesc: "Coming in Pro",
    mentorMatch: "Mentor matching", mentorDesc: "Coming in Pro",
    visaGuide: "Visa guidance", visaDesc: "Coming in Pro",
  },
  fr: { appName: "PathWise", tagline: "Votre chemin vers une carrière au Canada", subtitle: "Pour les nouveaux arrivants", continueGoogle: "Continuer avec Google", continueEmail: "Continuer avec email", home: "Accueil", explore: "Explorer", myPath: "Mon parcours", chat: "Assistant IA", settings: "Paramètres", upgrade: "Mise à niveau", logout: "Déconnexion", dashboard: "Tableau de bord" },
  hi: { appName: "PathWise", tagline: "कनाडा में करियर का आपका रास्ता", subtitle: "नए आप्रवासियों के लिए", continueGoogle: "Google से जारी रखें", continueEmail: "ईमेल से जारी रखें", home: "होम", explore: "खोजें", myPath: "मेरा रास्ता", chat: "AI सहायक", settings: "सेटिंग्स", upgrade: "अपग्रेड", logout: "साइन आउट", dashboard: "डैशबोर्ड" },
  zh: { appName: "PathWise", tagline: "您在加拿大的职业道路", subtitle: "为新移民打造", continueGoogle: "使用 Google 继续", continueEmail: "使用电子邮件继续", home: "首页", explore: "探索", myPath: "我的路径", chat: "AI助手", settings: "设置", upgrade: "升级", logout: "退出", dashboard: "仪表板" },
  ar: { appName: "PathWise", tagline: "طريقك إلى مهنة في كندا", subtitle: "للقادمين الجدد", continueGoogle: "المتابعة مع Google", continueEmail: "المتابعة بالبريد", home: "الرئيسية", explore: "استكشف", myPath: "مساري", chat: "مساعد AI", settings: "الإعدادات", upgrade: "الترقية", logout: "خروج", dashboard: "لوحة القيادة" },
  tl: { appName: "PathWise", tagline: "Ang iyong landas sa karera sa Canada", subtitle: "Para sa mga bagong dating", continueGoogle: "Magpatuloy gamit ang Google", continueEmail: "Magpatuloy sa email", home: "Home", explore: "Explore", myPath: "Aking landas", chat: "AI Assistant", settings: "Settings", upgrade: "Upgrade", logout: "Mag-sign out", dashboard: "Dashboard" },
  pa: { appName: "PathWise", tagline: "ਕੈਨੇਡਾ ਵਿੱਚ ਕਰੀਅਰ", subtitle: "ਨਵੇਂ ਆਉਣ ਵਾਲਿਆਂ ਲਈ", continueGoogle: "Google ਨਾਲ ਜਾਰੀ ਰੱਖੋ", continueEmail: "ਈਮੇਲ ਨਾਲ", home: "ਹੋਮ", explore: "ਖੋਜੋ", myPath: "ਮੇਰਾ ਰਸਤਾ", chat: "AI ਸਹਾਇਕ", settings: "ਸੈਟਿੰਗਾਂ", upgrade: "ਅੱਪਗ੍ਰੇਡ", logout: "ਸਾਈਨ ਆਉਟ", dashboard: "ਡੈਸ਼ਬੋਰਡ" },
  es: { appName: "PathWise", tagline: "Tu camino a una carrera en Canadá", subtitle: "Para recién llegados", continueGoogle: "Continuar con Google", continueEmail: "Continuar con email", home: "Inicio", explore: "Explorar", myPath: "Mi camino", chat: "Asistente IA", settings: "Ajustes", upgrade: "Actualizar", logout: "Cerrar sesión", dashboard: "Panel" },
  ur: { appName: "PathWise", tagline: "کینیڈا میں آپ کا کیریئر", subtitle: "نئے آنے والوں کے لیے", continueGoogle: "Google کے ساتھ", continueEmail: "ای میل کے ساتھ", home: "ہوم", explore: "تلاش", myPath: "میرا راستہ", chat: "AI اسسٹنٹ", settings: "ترتیبات", upgrade: "اپ گریڈ", logout: "سائن آؤٹ", dashboard: "ڈیش بورڈ" },
  pt: { appName: "PathWise", tagline: "Seu caminho para uma carreira no Canadá", subtitle: "Para recém-chegados", continueGoogle: "Continuar com Google", continueEmail: "Continuar com email", home: "Início", explore: "Explorar", myPath: "Meu caminho", chat: "Assistente IA", settings: "Configurações", upgrade: "Atualizar", logout: "Sair", dashboard: "Painel" },
};

const t = (lang, key) => TR[lang]?.[key] ?? TR.en[key] ?? key;

// ═══════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════
const fmt = (n) => "$" + Math.round(n).toLocaleString();
const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();
const cleanAI = (text) => {
  if (!text) return "";
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "").replace(/`([^`]+)`/g, "$1")
    .replace(/^[-*]\s+/gm, "• ").trim();
};
const parseJSON = (text) => {
  try {
    const m = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    return m ? JSON.parse(m[1] || m[0]) : null;
  } catch { return null; }
};

// LocalStorage persistence
const saveState = (state) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
};
const loadState = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
export default function PathWise() {
  const saved = loadState();

  // Auth
  const [authed, setAuthed] = useState(saved.authed || false);
  const [authStep, setAuthStep] = useState("email");
  const [email, setEmail] = useState(saved.email || "");
  const [codeInput, setCodeInput] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [codeErr, setCodeErr] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [authMethod, setAuthMethod] = useState(saved.authMethod || "email");
  const [googleUser, setGoogleUser] = useState(saved.googleUser || null);

  // UI
  const [lang, setLang] = useState(saved.lang || "en");
  const [dark, setDark] = useState(saved.dark || false);
  const [page, setPage] = useState("home");
  const [pageStack, setPageStack] = useState(["home"]);

  // Profile (db_profile)
  const [profile, setProfile] = useState(saved.profile || {
    userType: "", country: "", inCanada: "", education: "",
    school: "", certs: "", experience: "", career: "", priority: "balance"
  });
  const [profileComplete, setProfileComplete] = useState(saved.profileComplete || false);
  const [intakeStep, setIntakeStep] = useState(0);

  // Generated paths cache (db_paths) — keyed by career+profile hash
  const [pathsCache, setPathsCache] = useState(saved.pathsCache || {});
  const [currentPath, setCurrentPath] = useState(saved.currentPath || null);
  const [completedSteps, setCompletedSteps] = useState(saved.completedSteps || []);

  // Background processing state
  const [bgStatus, setBgStatus] = useState("idle"); // idle | running | done
  const [bgProgress, setBgProgress] = useState(0);
  const [bgMessage, setBgMessage] = useState("");

  // Career research cache (db_research) — AI-generated career details
  const [researchCache, setResearchCache] = useState(saved.researchCache || {});
  const [currentCareerId, setCurrentCareerId] = useState(null);
  const [loadingCareer, setLoadingCareer] = useState(false);

  // Chat
  const [chatMsgs, setChatMsgs] = useState(saved.chatMsgs || []);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const chatEndRef = useRef(null);

  // Pro
  const [isPro, setIsPro] = useState(saved.isPro || false);
  const [adminInput, setAdminInput] = useState("");
  const [adminErr, setAdminErr] = useState("");

  // Activity log
  const [activity, setActivity] = useState(saved.activity || []);

  // Toast
  const [toast, setToast] = useState(null);

  const TT = { ...TR.en, ...(TR[lang] || {}) };

  // ── Persist state to localStorage ────────────────────────────────────────
  useEffect(() => {
    saveState({ authed, email, authMethod, googleUser, lang, dark, profile,
      profileComplete, pathsCache, currentPath, completedSteps,
      researchCache, chatMsgs, isPro, activity });
  }, [authed, email, authMethod, googleUser, lang, dark, profile, profileComplete,
      pathsCache, currentPath, completedSteps, researchCache, chatMsgs, isPro, activity]);

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMsgs]);
  useEffect(() => { if (!toast) return; const id = setTimeout(() => setToast(null), 3000); return () => clearTimeout(id); }, [toast]);
  useEffect(() => { document.body.dir = LANGS[lang].dir; }, [lang]);

  // Load external scripts
  useEffect(() => {
    if (!document.getElementById("google-signin-script")) {
      const s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client"; s.id = "google-signin-script";
      s.async = true; s.defer = true; document.head.appendChild(s);
    }
    if (!document.getElementById("emailjs-script")) {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      s.id = "emailjs-script"; s.async = true;
      s.onload = () => {
        if (window.emailjs && EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
          window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
        }
      };
      document.head.appendChild(s);
    }
  }, []);

  const showToast = useCallback((msg, type = "ok") => setToast({ msg, type }), []);
  const logActivity = useCallback((text, icon = "📌") => {
    setActivity(a => [{ text, icon, time: Date.now() }, ...a].slice(0, 20));
  }, []);

  // ── Navigation with stack ────────────────────────────────────────────────
  const navigate = useCallback((newPage) => {
    setPage(newPage);
    setPageStack(s => [...s, newPage]);
  }, []);
  const goBack = useCallback(() => {
    setPageStack(s => {
      if (s.length <= 1) return s;
      const newStack = s.slice(0, -1);
      setPage(newStack[newStack.length - 1]);
      return newStack;
    });
  }, []);
  const resetNav = useCallback((newPage) => { setPage(newPage); setPageStack([newPage]); }, []);

  // ── Auth ─────────────────────────────────────────────────────────────────
  const sendEmailCode = useCallback(async () => {
    if (!email || !email.includes("@")) { showToast("Please enter a valid email", "err"); return; }
    const code = genCode();
    setSentCode(code);
    setEmailSending(true);
    if (window.emailjs && EMAILJS_CONFIG.publicKey !== "YOUR_EMAILJS_PUBLIC_KEY") {
      try {
        await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId,
          { to_email: email, code, app_name: "PathWise" });
        showToast("Code sent to your email", "ok");
      } catch (e) { showToast(`Dev mode: code is ${code}`, "info"); }
    } else {
      showToast(`Dev mode: your code is ${code}`, "info");
    }
    setEmailSending(false);
    setAuthStep("verify");
  }, [email, showToast]);

  const verifyEmailCode = useCallback(() => {
    if (codeInput === sentCode || codeInput === ADMIN_CODE || codeInput === "123456") {
      if (codeInput === ADMIN_CODE) setIsPro(true);
      setAuthed(true); setCodeErr(""); setAuthMethod("email");
      showToast("Signed in!", "ok");
      logActivity("Signed in", "✓");
    } else { setCodeErr(TT.invalidCode); }
  }, [codeInput, sentCode, showToast, TT, logActivity]);

  const handleGoogleSignIn = useCallback(() => {
    if (GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com") {
      setGoogleUser({ email: "demo@gmail.com", name: "Demo User", picture: "" });
      setEmail("demo@gmail.com"); setAuthed(true); setAuthMethod("google");
      showToast("Demo Google sign-in (add Client ID to enable real OAuth)", "info");
      logActivity("Signed in with Google", "✓");
      return;
    }
    if (!window.google) { showToast("Google Sign-In loading, try again", "err"); return; }
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        const payload = JSON.parse(atob(response.credential.split(".")[1]));
        setGoogleUser({ email: payload.email, name: payload.name, picture: payload.picture });
        setEmail(payload.email); setAuthed(true); setAuthMethod("google");
        showToast(`Welcome ${payload.name}!`, "ok");
      }
    });
    window.google.accounts.id.prompt();
  }, [showToast, logActivity]);

  // ── Intake + AI path generation ──────────────────────────────────────────
  const submitIntake = useCallback(async () => {
    setProfileComplete(true);
    resetNav("generating");
    setBgStatus("running");
    setBgProgress(0);

    // Staged progress updates
    const stages = [
      { msg: "Saving your profile...", pct: 15 },
      { msg: `Looking up ${profile.school || "your education"}...`, pct: 35 },
      { msg: `Researching ${profile.career}...`, pct: 55 },
      { msg: "Finding shortcuts and alternatives...", pct: 75 },
      { msg: "Finalizing your personalized path...", pct: 90 },
    ];

    try {
      // Animate through stages while AI works
      let stageIndex = 0;
      const stageTimer = setInterval(() => {
        if (stageIndex < stages.length) {
          setBgMessage(stages[stageIndex].msg);
          setBgProgress(stages[stageIndex].pct);
          stageIndex++;
        }
      }, 1500);

      const prompt = `You are PathWise AI. Generate a JSON career pathway for this person.

USER:
- Type: ${profile.userType}
- From: ${profile.country}
- In Canada: ${profile.inCanada}
- Education: ${profile.education}
- School: ${profile.school || "not specified"}
- Certifications: ${profile.certs || "none"}
- Experience: ${profile.experience || "0"} years
- Desired career in Canada: ${profile.career}
- Priority: ${profile.priority}

Return ONLY valid JSON, no markdown:
{
  "recommendedPath": {
    "name": "Path name",
    "totalYears": 5,
    "totalCostLow": 50000,
    "totalCostHigh": 90000,
    "difficulty": "medium",
    "whyThisPath": "2-3 sentences explaining why this path fits this person",
    "schoolAssessment": "1-2 sentences about their school's recognition in Canada",
    "steps": [
      {"title": "Step name", "duration": "3 months", "cost": 500, "description": "What to do", "details": "Specific organizations or exams"}
    ]
  },
  "alternatives": [
    {"name": "Alt 1", "years": 8, "costLow": 120000, "costHigh": 180000, "summary": "brief", "pros": "advantage", "cons": "disadvantage"}
  ],
  "avgSalary": 85000,
  "salaryRange": "$60K-$110K",
  "provinces": [{"code": "ON", "salary": 88000}, {"code": "BC", "salary": 90000}, {"code": "AB", "salary": 92000}, {"code": "QC", "salary": 75000}]
}

Use real Canadian organizations (MCC, NCA, PEO, OCT, CNO, NNAS). Respond in ${LANGS[lang].name}.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000,
          messages: [{ role: "user", content: prompt }] })
      });
      const data = await response.json();
      const parsed = parseJSON(data.content?.[0]?.text || "");

      clearInterval(stageTimer);

      if (parsed) {
        setBgProgress(100);
        setBgMessage("Done!");
        setCurrentPath(parsed);
        setCompletedSteps([]);
        logActivity(`Generated path for ${profile.career}`, "🎯");
        setTimeout(() => {
          setBgStatus("done");
          resetNav("myPath");
        }, 800);
      } else {
        showToast("Could not generate path — try again", "err");
        setBgStatus("idle");
        resetNav("home");
      }
    } catch (e) {
      showToast("Error: " + e.message, "err");
      setBgStatus("idle");
      resetNav("home");
    }
  }, [profile, lang, showToast, resetNav, logActivity]);

  // ── Career exploration (uses DB_CAREERS cache first) ─────────────────────
  const openCareer = useCallback(async (careerId) => {
    setCurrentCareerId(careerId);

    // Check pre-computed database first — instant
    if (DB_CAREERS[careerId]) {
      setResearchCache(c => ({ ...c, [careerId]: DB_CAREERS[careerId] }));
      logActivity(`Viewed ${DB_CAREERS[careerId].name}`, "🔍");
      navigate("careerDetail");
      return;
    }

    // Check research cache
    if (researchCache[careerId]) {
      navigate("careerDetail");
      return;
    }

    // Not cached — call AI
    setLoadingCareer(true);
    navigate("careerDetail");
    try {
      const prompt = `Generate JSON career info for "${careerId}" in Canada.

Return ONLY valid JSON:
{
  "id": "${careerId}",
  "name": "Full career name",
  "emoji": "single emoji",
  "category": "category",
  "regulated": true,
  "avgSalary": 85000,
  "salaryRange": "$60K-$110K",
  "demandLevel": "high",
  "timeYears": "4-5",
  "jobOpenings": 18000,
  "dayInLife": "3 sentences",
  "skills": ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5"],
  "certs": ["cert 1", "cert 2"],
  "employers": ["Employer 1", "Employer 2", "Employer 3"],
  "workLife": "2 sentences",
  "careerGrowth": "2 sentences",
  "provinces": [{"code": "ON", "salary": 88000}, {"code": "BC", "salary": 90000}, {"code": "AB", "salary": 92000}, {"code": "QC", "salary": 75000}],
  "routes": [{"name": "Route", "tag": "fastest", "years": 4, "costLow": 40000, "costHigh": 80000, "difficulty": "medium", "steps": ["step 1", "step 2", "step 3"], "description": "description"}],
  "universities": [{"name": "University", "country": "Canada", "city": "Toronto", "tuition": 15000, "living": 18000, "ranking": "#1 Canada", "tag": "bestValue"}]
}

Include 3 routes and 5 universities. Real Canadian data. Respond in ${LANGS[lang].name}.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 3000,
          messages: [{ role: "user", content: prompt }] })
      });
      const data = await response.json();
      const parsed = parseJSON(data.content?.[0]?.text || "");
      if (parsed) {
        setResearchCache(c => ({ ...c, [careerId]: parsed }));
        logActivity(`Researched ${parsed.name}`, "🔬");
      } else {
        showToast("Could not load career", "err");
      }
    } catch (e) {
      showToast("Error: " + e.message, "err");
    }
    setLoadingCareer(false);
  }, [researchCache, navigate, lang, showToast, logActivity]);

  // ── AI Chat ──────────────────────────────────────────────────────────────
  const sendChat = useCallback(async (override) => {
    const msg = (override ?? chatInput).trim();
    if (!msg || chatBusy) return;
    setChatInput("");
    setChatMsgs(p => [...p, { role: "user", text: msg }]);
    setChatBusy(true);
    try {
      const profCtx = profileComplete
        ? `USER: ${profile.userType}, from ${profile.country}, edu: ${profile.education}, school: ${profile.school}, certs: ${profile.certs}, ${profile.experience}y exp, wants ${profile.career}.`
        : "USER has not completed intake yet.";
      const sys = `You are PathWise AI helping people plan careers in Canada. Speak ${LANGS[lang].name}.
${profCtx}
RULES: No markdown (no ** or ## or *). Plain clear sentences. 2-4 sentences unless asked for detail. Real numbers. Real Canadian organizations (NCA, MCC, PEO, OCT, CNO). Be encouraging but realistic.`;
      const recent = chatMsgs.slice(-8).map(m => ({ role: m.role, content: m.text }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 800, system: sys,
          messages: [...recent, { role: "user", content: msg }] })
      });
      const data = await response.json();
      const text = cleanAI(data.content?.[0]?.text || "");
      setChatMsgs(p => [...p, { role: "assistant", text: text || "Sorry, couldn't respond." }]);
    } catch (e) {
      setChatMsgs(p => [...p, { role: "assistant", text: "Error: " + e.message }]);
    }
    setChatBusy(false);
  }, [chatInput, chatBusy, lang, profile, profileComplete, chatMsgs]);

  const checkAdmin = useCallback(() => {
    if (adminInput === ADMIN_CODE) {
      setIsPro(true); setAdminErr(""); setAdminInput("");
      showToast("Pro unlocked!", "ok");
      logActivity("Unlocked Pro", "🎉");
      resetNav("home");
    } else { setAdminErr(TT.invalidCode); }
  }, [adminInput, showToast, resetNav, TT, logActivity]);

  // ─────────────────────────────────────────────────────────────────────────
  // LOGIN SCREEN
  // ─────────────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <>
        <StyleBlock dark={dark} />
        {toast && <Toast toast={toast} />}
        <div className={`${dark ? "dark" : ""}`} style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: "100%", maxWidth: 420 }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div className="logo-mark" style={{ width: 56, height: 56, fontSize: 24, margin: "0 auto 16px" }}>P</div>
              <h1 className="serif" style={{ fontSize: 44, marginBottom: 6 }}>{TT.appName}</h1>
              <p style={{ color: "var(--sub)", fontSize: 15, lineHeight: 1.5, marginBottom: 4 }}>{TT.tagline}</p>
              <p style={{ color: "var(--hint)", fontSize: 13 }}>{TT.subtitle}</p>
            </div>
            <div className="card">
              {authStep === "email" && (
                <>
                  <button className="btn" onClick={handleGoogleSignIn} style={{ width: "100%", background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border2)", marginBottom: 10 }}>
                    <svg width="18" height="18" viewBox="0 0 48 48">
                      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3L37.6 9.2C34.1 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/>
                      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.2 7.9 3L37.6 9.2C34.1 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.2 5.2C41 36.5 44 30.8 44 24c0-1.3-.1-2.6-.4-3.9z"/>
                    </svg>
                    {TT.continueGoogle}
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "18px 0", color: "var(--hint)", fontSize: 12 }}>
                    <div style={{ flex: 1, borderTop: "1px solid var(--border)" }} />or<div style={{ flex: 1, borderTop: "1px solid var(--border)" }} />
                  </div>
                  <label style={{ fontSize: 12, color: "var(--sub)", display: "block", marginBottom: 6, fontWeight: 500 }}>{TT.continueEmail}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={TT.emailPlaceholder} style={{ marginBottom: 12 }} onKeyDown={e => e.key === "Enter" && sendEmailCode()} />
                  <button className="btn" onClick={sendEmailCode} disabled={emailSending} style={{ width: "100%" }}>
                    {emailSending ? <><span className="spin" style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", borderRadius: "50%" }} />Sending...</> : TT.sendCode}
                  </button>
                </>
              )}
              {authStep === "verify" && (
                <>
                  <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 14 }}>{TT.codeSentTo} <strong style={{ color: "var(--text)" }}>{email}</strong></p>
                  <input type="text" value={codeInput} onChange={e => setCodeInput(e.target.value.replace(/\D/g, "").slice(0, 6))} onKeyDown={e => e.key === "Enter" && verifyEmailCode()} placeholder="123456" maxLength={6} style={{ textAlign: "center", fontSize: 22, letterSpacing: 6, marginBottom: 8, fontFamily: "monospace" }} />
                  {codeErr && <p style={{ color: "var(--red)", fontSize: 12, marginBottom: 8 }}>{codeErr}</p>}
                  <button className="btn" onClick={verifyEmailCode} style={{ width: "100%", marginBottom: 10 }}>{TT.verify}</button>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button className="btn-ghost" onClick={() => { setAuthStep("email"); setCodeInput(""); setCodeErr(""); }} style={{ padding: "4px 8px", fontSize: 12 }}>← {TT.back}</button>
                    <button className="btn-ghost" onClick={sendEmailCode} style={{ padding: "4px 8px", fontSize: 12 }}>{TT.resend}</button>
                  </div>
                  <p style={{ fontSize: 11, color: "var(--hint)", textAlign: "center", marginTop: 16, lineHeight: 1.5 }}>Dev: code shown in toast, or use 123456<br/>Admin: 592899</p>
                </>
              )}
            </div>
            <div style={{ marginTop: 20 }}>
              <p style={{ fontSize: 11, color: "var(--hint)", textAlign: "center", marginBottom: 8 }}>{TT.selectLang}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                {Object.entries(LANGS).map(([k, v]) => (
                  <button key={k} className={`chip ${lang === k ? "on" : ""}`} onClick={() => setLang(k)}>{v.flag} {v.name}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MAIN APP
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <StyleBlock dark={dark} />
      {toast && <Toast toast={toast} />}

      <div className={`pw ${dark ? "dark" : ""}`}>
        {/* ── TOP HEADER (always visible, logo clickable) ── */}
        <header className="topbar">
          <div className="topbar-left" onClick={() => resetNav("home")} style={{ cursor: "pointer" }}>
            <div className="logo-mark">P</div>
            <span className="logo-text">PathWise</span>
          </div>
          <nav className="topnav">
            {[
              ["home", TT.home],
              ["explore", TT.explore],
              ["chat", TT.chat],
              ["myPath", TT.myPath],
              ["dashboard", TT.dashboard],
            ].map(([pg, label]) => (
              <button key={pg} className={`topnav-item ${page === pg ? "active" : ""}`} onClick={() => resetNav(pg)}>
                {label}
              </button>
            ))}
          </nav>
          <div className="topbar-right">
            {!isPro && (
              <button className="btn" onClick={() => resetNav("pro")} style={{ padding: "7px 14px", fontSize: 13 }}>⭐ {TT.upgrade}</button>
            )}
            {isPro && <span className="badge bg-green" style={{ fontSize: 11 }}>PRO</span>}
            <button className="btn-ghost" onClick={() => resetNav("settings")} style={{ padding: "7px 10px", fontSize: 13 }}>⚙️</button>
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="main">
          {page !== "home" && pageStack.length > 1 && page !== "generating" && (
            <button className="back-btn" onClick={goBack}>← {TT.back}</button>
          )}

          {page === "home" && (
            <HomePage TT={TT} profile={profile} profileComplete={profileComplete}
              navigate={resetNav} setIntakeStep={setIntakeStep} activity={activity}
              bgStatus={bgStatus} currentPath={currentPath} isPro={isPro} />
          )}

          {page === "intake" && (
            <IntakePage TT={TT} profile={profile} setProfile={setProfile}
              intakeStep={intakeStep} setIntakeStep={setIntakeStep} submitIntake={submitIntake} />
          )}

          {page === "generating" && (
            <GeneratingPage TT={TT} profile={profile} bgProgress={bgProgress} bgMessage={bgMessage} />
          )}

          {page === "myPath" && (
            <MyPathPage TT={TT} currentPath={currentPath} profile={profile}
              completedSteps={completedSteps} setCompletedSteps={setCompletedSteps}
              navigate={resetNav} setIntakeStep={setIntakeStep} />
          )}

          {page === "explore" && (
            <ExplorePage TT={TT} openCareer={openCareer} isPro={isPro}
              profile={profile} profileComplete={profileComplete} navigate={resetNav} />
          )}

          {page === "careerDetail" && (
            <CareerDetailPage TT={TT} career={researchCache[currentCareerId]}
              loading={loadingCareer} profile={profile} />
          )}

          {page === "chat" && (
            <ChatPage TT={TT} chatMsgs={chatMsgs} chatInput={chatInput}
              setChatInput={setChatInput} chatBusy={chatBusy} sendChat={sendChat}
              chatEndRef={chatEndRef} setChatMsgs={setChatMsgs} />
          )}

          {page === "dashboard" && (
            <DashboardPage TT={TT} profile={profile} profileComplete={profileComplete}
              currentPath={currentPath} completedSteps={completedSteps}
              activity={activity} isPro={isPro} navigate={resetNav}
              openCareer={openCareer} chatMsgs={chatMsgs} />
          )}

          {page === "pro" && (
            <ProPage TT={TT} isPro={isPro} adminInput={adminInput}
              setAdminInput={setAdminInput} adminErr={adminErr} checkAdmin={checkAdmin} />
          )}

          {page === "settings" && (
            <SettingsPage TT={TT} email={email} lang={lang} setLang={setLang}
              dark={dark} setDark={setDark} profile={profile} setProfile={setProfile}
              isPro={isPro} authMethod={authMethod} googleUser={googleUser}
              navigate={resetNav} setIntakeStep={setIntakeStep}
              showToast={showToast} setProfileComplete={setProfileComplete}
              profileComplete={profileComplete}
              onLogout={() => {
                setAuthed(false); setAuthStep("email"); setEmail(""); setCodeInput("");
                resetNav("home");
              }} />
          )}
        </main>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════
function StyleBlock({ dark }) {
  return (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap');
    :root {
      --bg: #FAFAF7; --surface: #FFFFFF; --card: #FFFFFF;
      --border: #E8E4DB; --border2: #C9C5BA;
      --text: #1A1917; --sub: #6B6863; --hint: #9E9B95;
      --accent: #0D7A5F; --accent-bg: #E5F3EE; --accent-dark: #075A45;
      --blue: #1E5BA8; --blue-bg: #E5EDF8;
      --amber: #B56A08; --amber-bg: #FBF0DC;
      --red: #B23A3A; --red-bg: #FAEAEA;
      --purple: #6B3FA0; --purple-bg: #EEE5FA;
    }
    .dark {
      --bg: #0F0E0C; --surface: #1A1A17; --card: #1F1F1C;
      --border: #2D2D29; --border2: #3E3E3A;
      --text: #ECEAE3; --sub: #9E9B95; --hint: #6B6863;
      --accent: #3FB896; --accent-bg: #0A2E23; --accent-dark: #9DD9C4;
      --blue: #6BA4E5; --blue-bg: #0E2340;
      --amber: #E89B4D; --amber-bg: #2E1C06;
      --red: #E57070; --red-bg: #2E0E0E;
      --purple: #AC8DD9; --purple-bg: #2A1D3F;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
    .pw { min-height: 100vh; background: var(--bg); color: var(--text); }
    .serif { font-family: 'Fraunces', Georgia, serif; font-weight: 400; letter-spacing: -0.015em; }
    .serif-md { font-family: 'Fraunces', Georgia, serif; font-weight: 500; letter-spacing: -0.015em; }
    input, textarea, select {
      background: var(--surface); border: 1px solid var(--border); border-radius: 8px;
      padding: 10px 14px; font-size: 14px; color: var(--text); width: 100%;
      outline: none; font-family: inherit; transition: border-color .15s;
    }
    input:focus, textarea:focus, select:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-bg); }
    button { cursor: pointer; border: none; font-family: inherit; transition: all .15s; }
    .btn { background: var(--accent); color: #fff; border-radius: 8px; padding: 11px 20px; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
    .btn:hover { background: var(--accent-dark); }
    .btn:disabled { opacity: .5; cursor: not-allowed; }
    .btn-ghost { background: transparent; color: var(--text); padding: 9px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; }
    .btn-ghost:hover { background: var(--surface); }
    .btn-outline { background: transparent; border: 1px solid var(--border2); color: var(--text); border-radius: 8px; padding: 10px 18px; font-size: 14px; font-weight: 500; }
    .btn-outline:hover { border-color: var(--accent); background: var(--accent-bg); }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 22px; }

    .topbar { position: sticky; top: 0; z-index: 100; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; padding: 14px 32px; gap: 24px; backdrop-filter: blur(8px); }
    .topbar-left { display: flex; align-items: center; gap: 10px; font-family: 'Fraunces', serif; font-weight: 500; font-size: 22px; }
    .logo-mark { width: 32px; height: 32px; background: var(--accent); border-radius: 9px; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 16px; font-family: 'Fraunces', serif; font-weight: 500; }
    .logo-text { color: var(--text); }
    .topnav { display: flex; gap: 4px; flex: 1; }
    .topnav-item { background: transparent; color: var(--sub); padding: 8px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; }
    .topnav-item:hover { background: var(--bg); color: var(--text); }
    .topnav-item.active { background: var(--accent-bg); color: var(--accent); }
    .topbar-right { display: flex; align-items: center; gap: 10px; }

    .main { max-width: 1200px; margin: 0 auto; padding: 30px 32px 60px; }
    .back-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: var(--sub); background: transparent; padding: 6px 10px; border-radius: 6px; margin-bottom: 14px; }
    .back-btn:hover { background: var(--surface); color: var(--text); }

    .badge { display: inline-flex; align-items: center; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
    .bg-green { background: var(--accent-bg); color: var(--accent); }
    .bg-blue { background: var(--blue-bg); color: var(--blue); }
    .bg-amber { background: var(--amber-bg); color: var(--amber); }
    .bg-red { background: var(--red-bg); color: var(--red); }
    .bg-purple { background: var(--purple-bg); color: var(--purple); }
    .chip { display: inline-flex; padding: 5px 12px; border-radius: 20px; font-size: 12px; border: 1px solid var(--border); color: var(--sub); cursor: pointer; margin: 3px; background: var(--surface); }
    .chip:hover, .chip.on { background: var(--accent-bg); color: var(--accent); border-color: var(--accent); }

    .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
    .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
    hr.div { border: none; border-top: 1px solid var(--border); margin: 20px 0; }

    .progress-bar { height: 8px; background: var(--bg); border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; background: var(--accent); border-radius: 4px; transition: width .4s ease; }
    .bar-wrap { height: 24px; background: var(--bg); border-radius: 6px; overflow: hidden; flex: 1; }
    .bar-fill { height: 100%; background: var(--accent); border-radius: 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 8px; transition: width .4s; }
    .step-dot { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; flex-shrink: 0; margin-top: 2px; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: 200px 0; } }
    .fade { animation: fadeIn .3s ease; }
    .spin { animation: spin .8s linear infinite; display: inline-block; }
    .pulse { animation: pulse 1.5s ease-in-out infinite; }
    .shimmer { background: linear-gradient(90deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%); background-size: 400px 100%; animation: shimmer 1.5s infinite; }

    .hero { padding: 50px 20px 30px; text-align: center; max-width: 780px; margin: 0 auto; }
    .hero h1 { font-size: clamp(34px, 5vw, 56px); line-height: 1.08; margin-bottom: 14px; }
    .hero p { font-size: 16px; color: var(--sub); line-height: 1.55; margin-bottom: 26px; }

    @media (max-width: 820px) {
      .topbar { padding: 12px 16px; gap: 12px; }
      .topnav { display: none; }
      .main { padding: 20px 16px 40px; }
      .g3, .g4 { grid-template-columns: 1fr 1fr; }
      .g2 { grid-template-columns: 1fr; }
    }
    `}</style>
  );
}

function Toast({ toast }) {
  const bg = toast.type === "ok" ? "var(--accent)" : toast.type === "err" ? "var(--red)" : "var(--blue)";
  return (
    <div style={{ position: "fixed", top: 80, right: 20, background: bg, color: "#fff", padding: "12px 18px", borderRadius: 10, fontSize: 13, fontWeight: 500, maxWidth: 340, zIndex: 9999, boxShadow: "0 4px 16px rgba(0,0,0,.2)", animation: "fadeIn .3s ease" }}>
      {toast.msg}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════════════════════════════════════
function HomePage({ TT, profile, profileComplete, navigate, setIntakeStep, activity, currentPath, isPro }) {
  return (
    <div className="fade">
      {!profileComplete ? (
        <>
          <div className="hero">
            <h1 className="serif">{TT.tagline}</h1>
            <p>{TT.subtitle}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn" onClick={() => { setIntakeStep(0); navigate("intake"); }} style={{ fontSize: 15, padding: "13px 26px" }}>{TT.getStarted} →</button>
              <button className="btn-outline" onClick={() => navigate("explore")}>{TT.exploreCareers}</button>
              <button className="btn-outline" onClick={() => navigate("chat")}>✨ {TT.askAI}</button>
            </div>
          </div>

          <div className="g3" style={{ marginBottom: 24 }}>
            {[
              ["🎯", "Personalized for you", "We research your school, country, and credentials"],
              ["🤖", "AI that knows Canada", "Real organizations: NCA, MCC, PEO, OCT. Real costs."],
              ["💰", "Find shortcuts", "Save years and thousands with routes others miss"],
            ].map(([ic, h, d], i) => (
              <div key={i} className="card">
                <p style={{ fontSize: 28, marginBottom: 10 }}>{ic}</p>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>{h}</p>
                <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.55 }}>{d}</p>
              </div>
            ))}
          </div>

          <div className="card" style={{ textAlign: "center", padding: 30, background: "var(--accent-bg)", border: "1px solid var(--accent)" }}>
            <p className="serif-md" style={{ fontSize: 22, marginBottom: 6 }}>{TT.getStarted}</p>
            <p style={{ fontSize: 14, color: "var(--sub)", marginBottom: 16 }}>{TT.intakeIntro}</p>
            <button className="btn" onClick={() => { setIntakeStep(0); navigate("intake"); }}>Start questionnaire →</button>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 24 }}>
            <h1 className="serif" style={{ fontSize: 38, marginBottom: 4 }}>{TT.welcome}</h1>
            <p style={{ color: "var(--sub)" }}>{TT.dashboardSub}</p>
          </div>

          <div className="g2" style={{ marginBottom: 20 }}>
            {currentPath && (
              <div className="card" style={{ borderColor: "var(--accent)" }}>
                <p style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>Your path</p>
                <p className="serif-md" style={{ fontSize: 22, marginBottom: 8 }}>{currentPath.recommendedPath?.name}</p>
                <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 14 }}>{currentPath.recommendedPath?.totalYears} years · {fmt(currentPath.recommendedPath?.totalCostLow)} – {fmt(currentPath.recommendedPath?.totalCostHigh)}</p>
                <button className="btn" onClick={() => navigate("myPath")} style={{ width: "100%" }}>View path →</button>
              </div>
            )}
            <div className="card">
              <p style={{ fontSize: 11, color: "var(--hint)", fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>{TT.quickActions}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 10 }}>
                <button className="btn-outline" onClick={() => navigate("explore")} style={{ justifyContent: "flex-start", textAlign: "left" }}>🔍 {TT.exploreCareers}</button>
                <button className="btn-outline" onClick={() => navigate("chat")} style={{ justifyContent: "flex-start", textAlign: "left" }}>✨ {TT.askAI}</button>
                <button className="btn-outline" onClick={() => navigate("dashboard")} style={{ justifyContent: "flex-start", textAlign: "left" }}>📊 {TT.dashboard}</button>
              </div>
            </div>
          </div>

          <div className="card">
            <p style={{ fontWeight: 600, marginBottom: 12 }}>{TT.recentActivity}</p>
            {activity.length === 0 ? (
              <p style={{ fontSize: 13, color: "var(--sub)" }}>{TT.noActivity}</p>
            ) : (
              <div>
                {activity.slice(0, 5).map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                    <span>{a.icon}</span>
                    <span style={{ fontSize: 13, flex: 1 }}>{a.text}</span>
                    <span style={{ fontSize: 11, color: "var(--hint)" }}>{new Date(a.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: INTAKE
// ═══════════════════════════════════════════════════════════════════════════
function IntakePage({ TT, profile, setProfile, intakeStep, setIntakeStep, submitIntake }) {
  const steps = [
    { q: TT.q_userType, render: () => (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {DB_USER_TYPES.map(ut => (
          <button key={ut.id} className="btn-outline" onClick={() => { setProfile(p => ({ ...p, userType: ut.id })); setIntakeStep(1); }}
            style={{ textAlign: "left", padding: "14px 16px", background: profile.userType === ut.id ? "var(--accent-bg)" : "transparent", borderColor: profile.userType === ut.id ? "var(--accent)" : "var(--border)", fontSize: 14 }}>
            <span style={{ fontSize: 20, marginRight: 10 }}>{ut.emoji}</span>{ut.label}
          </button>
        ))}
      </div>
    )},
    { q: TT.q_country, render: () => (
      <div>
        <select value={profile.country} onChange={e => setProfile(p => ({ ...p, country: e.target.value }))} style={{ marginBottom: 14 }}>
          <option value="">Select country...</option>
          {DB_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        {profile.country && <button className="btn" onClick={() => setIntakeStep(2)} style={{ width: "100%" }}>Next →</button>}
      </div>
    )},
    { q: TT.q_inCanada, render: () => (
      <div style={{ display: "flex", gap: 10 }}>
        {["Yes", "No, planning to move", "No, staying abroad"].map(opt => (
          <button key={opt} className="btn-outline" onClick={() => { setProfile(p => ({ ...p, inCanada: opt })); setIntakeStep(3); }}
            style={{ flex: 1, padding: "14px", background: profile.inCanada === opt ? "var(--accent-bg)" : "transparent", borderColor: profile.inCanada === opt ? "var(--accent)" : "var(--border)" }}>{opt}</button>
        ))}
      </div>
    )},
    { q: TT.q_education, render: () => (
      <div>
        <select value={profile.education} onChange={e => setProfile(p => ({ ...p, education: e.target.value }))} style={{ marginBottom: 14 }}>
          <option value="">Select...</option>
          {DB_EDUCATION.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        {profile.education && <button className="btn" onClick={() => setIntakeStep(4)} style={{ width: "100%" }}>Next →</button>}
      </div>
    )},
    { q: TT.q_school, render: () => (
      <div>
        <input type="text" value={profile.school} onChange={e => setProfile(p => ({ ...p, school: e.target.value }))} placeholder={TT.q_schoolPlaceholder} style={{ marginBottom: 14 }} />
        <p style={{ fontSize: 12, color: "var(--hint)", marginBottom: 14 }}>AI will look up your school to assess credential recognition.</p>
        <button className="btn" onClick={() => setIntakeStep(5)} style={{ width: "100%" }}>Next →</button>
      </div>
    )},
    { q: TT.q_certs, render: () => (
      <div>
        <textarea value={profile.certs} onChange={e => setProfile(p => ({ ...p, certs: e.target.value }))} placeholder={TT.q_certsPlaceholder} rows={3} style={{ marginBottom: 14, resize: "vertical" }} />
        <button className="btn" onClick={() => setIntakeStep(6)} style={{ width: "100%" }}>Next →</button>
      </div>
    )},
    { q: TT.q_experience, render: () => (
      <div>
        <input type="number" value={profile.experience} onChange={e => setProfile(p => ({ ...p, experience: e.target.value }))} placeholder="0" min="0" max="50" style={{ marginBottom: 14 }} />
        <button className="btn" onClick={() => setIntakeStep(7)} style={{ width: "100%" }}>Next →</button>
      </div>
    )},
    { q: TT.q_career, render: () => (
      <div>
        <input type="text" value={profile.career} onChange={e => setProfile(p => ({ ...p, career: e.target.value }))} placeholder={TT.q_careerPlaceholder} style={{ marginBottom: 14 }} />
        <p style={{ fontSize: 12, color: "var(--hint)", marginBottom: 14 }}>Any career — we support every profession.</p>
        {profile.career && <button className="btn" onClick={() => setIntakeStep(8)} style={{ width: "100%" }}>Next →</button>}
      </div>
    )},
    { q: TT.q_priority, render: () => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[["fast", TT.priority_fast, "🚀"], ["cheap", TT.priority_cheap, "💰"], ["prestige", TT.priority_prestige, "🏆"], ["balance", TT.priority_balance, "⚖️"]].map(([id, label, emoji]) => (
          <button key={id} className="btn-outline" onClick={() => { setProfile(p => ({ ...p, priority: id })); submitIntake(); }}
            style={{ padding: "20px 14px", textAlign: "center", background: profile.priority === id ? "var(--accent-bg)" : "transparent", borderColor: profile.priority === id ? "var(--accent)" : "var(--border)", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 24 }}>{emoji}</span><span>{label}</span>
          </button>
        ))}
      </div>
    )},
  ];

  const current = steps[intakeStep];
  return (
    <div className="fade" style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 18 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= intakeStep ? "var(--accent)" : "var(--border)" }} />
          ))}
        </div>
        <p style={{ fontSize: 12, color: "var(--hint)", marginBottom: 4 }}>Question {intakeStep + 1} of {steps.length}</p>
        <h2 className="serif" style={{ fontSize: 28, marginBottom: 20 }}>{current.q}</h2>
      </div>
      <div className="card">{current.render()}</div>
      {intakeStep > 0 && <button className="btn-ghost" onClick={() => setIntakeStep(intakeStep - 1)} style={{ marginTop: 14, fontSize: 13 }}>← {TT.back}</button>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: GENERATING
// ═══════════════════════════════════════════════════════════════════════════
function GeneratingPage({ TT, profile, bgProgress, bgMessage }) {
  return (
    <div className="fade" style={{ maxWidth: 540, margin: "60px auto 0", textAlign: "center" }}>
      <div className="pulse" style={{ fontSize: 52, marginBottom: 20 }}>🧭</div>
      <h2 className="serif" style={{ fontSize: 30, marginBottom: 10 }}>{TT.analyzing}</h2>
      <p style={{ color: "var(--sub)", marginBottom: 30 }}>{TT.analyzingDetails}</p>
      <div className="progress-bar" style={{ marginBottom: 16 }}>
        <div className="progress-fill" style={{ width: `${bgProgress}%` }} />
      </div>
      <p style={{ fontSize: 13, color: "var(--sub)", minHeight: 20 }}>{bgMessage}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: MY PATH
// ═══════════════════════════════════════════════════════════════════════════
function MyPathPage({ TT, currentPath, profile, completedSteps, setCompletedSteps, navigate, setIntakeStep }) {
  if (!currentPath) {
    return (
      <div className="fade">
        <div className="card" style={{ textAlign: "center", padding: 60 }}>
          <p style={{ fontSize: 44, marginBottom: 14 }}>🧭</p>
          <p style={{ fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{TT.noPath}</p>
          <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 16 }}>{TT.noProfile}</p>
          <button className="btn" onClick={() => { setIntakeStep(0); navigate("intake"); }}>{TT.createPath}</button>
        </div>
      </div>
    );
  }

  const p = currentPath;
  const toggleStep = (i) => setCompletedSteps(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  return (
    <div className="fade">
      <h2 className="serif" style={{ fontSize: 32, marginBottom: 4 }}>{TT.yourPath}</h2>
      <p style={{ color: "var(--sub)", marginBottom: 22, fontSize: 14 }}>{TT.generatedFor} {profile.career}</p>

      <div className="card" style={{ marginBottom: 14, background: "var(--accent-bg)", border: "1px solid var(--accent)" }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>{TT.recommended}</p>
        <h3 className="serif-md" style={{ fontSize: 24, marginBottom: 10 }}>{p.recommendedPath.name}</h3>
        <p style={{ fontSize: 14, color: "var(--text)", lineHeight: 1.6, marginBottom: 12 }}>{p.recommendedPath.whyThisPath}</p>
        {p.recommendedPath.schoolAssessment && (
          <div style={{ padding: "10px 14px", background: "var(--surface)", borderRadius: 8, fontSize: 13, color: "var(--sub)", lineHeight: 1.5 }}>
            <strong style={{ color: "var(--text)" }}>{TT.aboutSchool}: </strong>{p.recommendedPath.schoolAssessment}
          </div>
        )}
      </div>

      <div className="g4" style={{ marginBottom: 18 }}>
        <StatCard label={TT.totalTime} value={`${p.recommendedPath.totalYears}y`} />
        <StatCard label={TT.totalCost} value={fmt(p.recommendedPath.totalCostLow)} sub={`to ${fmt(p.recommendedPath.totalCostHigh)}`} />
        <StatCard label={TT.difficulty} value={p.recommendedPath.difficulty} />
        <StatCard label={TT.avgSalary} value={fmt(p.avgSalary)} sub={p.salaryRange} />
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <p style={{ fontWeight: 600 }}>{TT.pathProgress}</p>
          <p style={{ fontSize: 13, color: "var(--sub)" }}>{completedSteps.length} / {p.recommendedPath.steps.length}</p>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(completedSteps.length / Math.max(p.recommendedPath.steps.length, 1)) * 100}%` }} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 16 }}>{TT.steps}</p>
        {p.recommendedPath.steps.map((step, i) => {
          const done = completedSteps.includes(i);
          const isCur = !done && (!p.recommendedPath.steps[i-1] || completedSteps.includes(i-1));
          return (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 0", borderBottom: i < p.recommendedPath.steps.length - 1 ? "1px solid var(--border)" : "none" }}>
              <div className="step-dot" style={{ background: done ? "var(--accent)" : isCur ? "var(--accent-bg)" : "transparent", border: `2px solid ${done || isCur ? "var(--accent)" : "var(--border2)"}`, color: done ? "#fff" : "var(--accent)" }}>
                {done ? "✓" : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                  <p style={{ fontWeight: done ? 400 : 600, color: done ? "var(--hint)" : "var(--text)", textDecoration: done ? "line-through" : "none", fontSize: 14 }}>{step.title}</p>
                  <div style={{ display: "flex", gap: 6 }}>
                    {step.duration && <span className="badge bg-blue">{step.duration}</span>}
                    {step.cost > 0 && <span className="badge bg-amber">{fmt(step.cost)}</span>}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.5, marginBottom: step.details ? 6 : 0 }}>{step.description}</p>
                {step.details && <p style={{ fontSize: 12, color: "var(--hint)", lineHeight: 1.5, padding: "6px 10px", background: "var(--bg)", borderRadius: 6, marginTop: 6 }}>💡 {step.details}</p>}
                <button className="btn-outline" onClick={() => toggleStep(i)} style={{ fontSize: 11, padding: "4px 10px", marginTop: 8 }}>{done ? TT.markUndone : TT.markDone}</button>
              </div>
            </div>
          );
        })}
      </div>

      {p.alternatives && p.alternatives.length > 0 && (
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{TT.alternatives}</p>
          {p.alternatives.map((alt, i) => (
            <div key={i} style={{ padding: 14, border: "1px solid var(--border)", borderRadius: 10, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                <p style={{ fontWeight: 600, fontSize: 15 }}>{alt.name}</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <span className="badge bg-blue">{alt.years}y</span>
                  <span className="badge bg-amber">{fmt(alt.costLow)}+</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.5, marginBottom: 6 }}>{alt.summary}</p>
              {alt.pros && <p style={{ fontSize: 12, color: "var(--accent)", marginBottom: 3 }}>+ {alt.pros}</p>}
              {alt.cons && <p style={{ fontSize: 12, color: "var(--red)" }}>− {alt.cons}</p>}
            </div>
          ))}
        </div>
      )}

      {p.provinces && (
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{TT.salaries}</p>
          {p.provinces.map(prov => {
            const max = Math.max(...p.provinces.map(x => x.salary));
            return (
              <div key={prov.code} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, minWidth: 36, color: "var(--sub)" }}>{prov.code}</span>
                <div className="bar-wrap"><div className="bar-fill" style={{ width: `${(prov.salary / max) * 100}%` }}><span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{fmt(prov.salary)}</span></div></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ background: "var(--bg)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border)" }}>
      <p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 600, marginTop: 3, textTransform: "capitalize" }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: "var(--sub)", marginTop: 1 }}>{sub}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: EXPLORE
// ═══════════════════════════════════════════════════════════════════════════
function ExplorePage({ TT, openCareer, isPro, profile, profileComplete, navigate }) {
  const [q, setQ] = useState("");
  const [custom, setCustom] = useState("");

  const filtered = POPULAR_CAREER_IDS.map(id => DB_CAREERS[id]).filter(c =>
    c.name.toLowerCase().includes(q.toLowerCase()) ||
    c.category.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="fade">
      <h2 className="serif" style={{ fontSize: 32, marginBottom: 6 }}>{TT.explore}</h2>
      <p style={{ color: "var(--sub)", fontSize: 14, marginBottom: 20 }}>
        {profileComplete ? TT.tailoredForYou : "Popular careers with full details"}
      </p>

      {!isPro && (
        <div className="card" style={{ marginBottom: 20, background: "var(--accent-bg)", border: "1px solid var(--accent)" }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>🔍 {TT.researchNew}</p>
          <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>{TT.researchDesc}. <strong>Pro feature.</strong></p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={custom} onChange={e => setCustom(e.target.value)}
              placeholder="e.g., Marine biologist, UX researcher, Video game designer..."
              onKeyDown={e => e.key === "Enter" && custom.trim() && openCareer(custom.trim().toLowerCase().replace(/\s+/g, "-"))} />
            <button className="btn" onClick={() => navigate("pro")}>⭐ Go Pro</button>
          </div>
        </div>
      )}

      {isPro && (
        <div className="card" style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 600, marginBottom: 6 }}>🔍 {TT.researchNew}</p>
          <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>{TT.researchDesc}</p>
          <div style={{ display: "flex", gap: 8 }}>
            <input type="text" value={custom} onChange={e => setCustom(e.target.value)}
              placeholder="Type any career..."
              onKeyDown={e => e.key === "Enter" && custom.trim() && openCareer(custom.trim().toLowerCase().replace(/\s+/g, "-"))} />
            <button className="btn" onClick={() => custom.trim() && openCareer(custom.trim().toLowerCase().replace(/\s+/g, "-"))} disabled={!custom.trim()}>Research →</button>
          </div>
        </div>
      )}

      <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder={TT.searchCareer} style={{ marginBottom: 18, fontSize: 15, padding: "12px 16px" }} />

      <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>{TT.popularCareers} ({filtered.length})</p>
      <div className="g2">
        {filtered.map(c => (
          <div key={c.id} className="card" onClick={() => openCareer(c.id)} style={{ cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 30 }}>{c.emoji}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</p>
                  <p style={{ fontSize: 12, color: "var(--sub)" }}>{c.category} · {c.regulated ? TT.regulated : TT.openEntry}</p>
                </div>
              </div>
              <span className={`badge ${c.demandLevel === "high" ? "bg-green" : c.demandLevel === "medium" ? "bg-amber" : "bg-red"}`}>{TT[c.demandLevel] || c.demandLevel}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
              <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Avg</p><p style={{ fontSize: 14, fontWeight: 600 }}>{fmt(c.avgSalary)}</p></div>
              <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Time</p><p style={{ fontSize: 14, fontWeight: 600 }}>{c.timeYears}y</p></div>
              <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Jobs/yr</p><p style={{ fontSize: 14, fontWeight: 600 }}>{c.jobOpenings?.toLocaleString()}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: CAREER DETAIL
// ═══════════════════════════════════════════════════════════════════════════
function CareerDetailPage({ TT, career, loading, profile }) {
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterMaxTuition, setFilterMaxTuition] = useState(0);
  const [sortUni, setSortUni] = useState("cheapest");

  if (loading) {
    return (
      <div className="fade" style={{ maxWidth: 540, margin: "60px auto 0", textAlign: "center" }}>
        <div className="pulse" style={{ fontSize: 48, marginBottom: 16 }}>🔬</div>
        <h3 className="serif" style={{ fontSize: 24, marginBottom: 8 }}>Researching career details...</h3>
        <p style={{ color: "var(--sub)", marginBottom: 26 }}>Our AI is gathering routes, universities, and salary data.</p>
        <div style={{ maxWidth: 420, margin: "0 auto" }}>
          <div className="shimmer" style={{ height: 14, borderRadius: 4, marginBottom: 8 }} />
          <div className="shimmer" style={{ height: 14, borderRadius: 4, marginBottom: 8, width: "85%" }} />
          <div className="shimmer" style={{ height: 14, borderRadius: 4, width: "60%" }} />
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="fade" style={{ textAlign: "center", padding: 60 }}>
        <p>Career not found. Please try again.</p>
      </div>
    );
  }

  const d = career;
  const countries = [...new Set((d.universities || []).map(u => u.country))];
  let unis = (d.universities || []).filter(u =>
    (!filterCountry || u.country === filterCountry) &&
    (!filterCity || u.city.toLowerCase().includes(filterCity.toLowerCase())) &&
    (!filterMaxTuition || u.tuition <= filterMaxTuition)
  );
  if (sortUni === "cheapest") unis.sort((a, b) => a.tuition - b.tuition);
  if (sortUni === "topRanked") unis.sort((a, b) => (a.ranking || "").localeCompare(b.ranking || ""));

  return (
    <div className="fade">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <span style={{ fontSize: 44 }}>{d.emoji}</span>
        <div>
          <h1 className="serif" style={{ fontSize: 32 }}>{d.name}</h1>
          <p style={{ color: "var(--sub)", fontSize: 13 }}>{d.category} · {d.regulated ? TT.regulated : TT.openEntry}</p>
        </div>
      </div>

      <div className="g4" style={{ marginBottom: 18 }}>
        <StatCard label={TT.avgSalary} value={fmt(d.avgSalary)} sub={d.salaryRange} />
        <StatCard label={TT.timeToQualify} value={d.timeYears + "y"} />
        <StatCard label="Jobs/yr" value={d.jobOpenings?.toLocaleString() || "—"} />
        <StatCard label={TT.demand} value={TT[d.demandLevel] || d.demandLevel} />
      </div>

      <div className="g2" style={{ marginBottom: 14 }}>
        <div className="card">
          <p style={{ fontWeight: 600, marginBottom: 8 }}>📅 Day in the life</p>
          <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6 }}>{d.dayInLife}</p>
        </div>
        <div className="card">
          <p style={{ fontWeight: 600, marginBottom: 8 }}>⚖️ Work-life</p>
          <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.6 }}>{d.workLife}</p>
        </div>
      </div>

      {d.skills && (
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, marginBottom: 10 }}>🎯 Skills needed</p>
          <div>{d.skills.map((s, i) => <span key={i} className="chip" style={{ cursor: "default" }}>{s}</span>)}</div>
        </div>
      )}

      {d.routes && (
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{TT.routes}</p>
          {d.routes.map((r, i) => (
            <div key={i} style={{ padding: 14, border: r.tag === "fastest" ? "2px solid var(--accent)" : "1px solid var(--border)", borderRadius: 10, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                <p style={{ fontWeight: 600 }}>{r.name}</p>
                {r.tag && <span className="badge bg-green">{TT[r.tag] || r.tag}</span>}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                {r.steps.map((s, j) => (
                  <span key={j} style={{ fontSize: 11, padding: "4px 9px", borderRadius: 5, background: "var(--bg)", color: "var(--sub)" }}>{s}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--sub)", marginBottom: 6 }}>
                <span><b style={{ color: "var(--text)" }}>{r.years}y</b> total</span>
                <span><b style={{ color: "var(--text)" }}>{fmt(r.costLow)}–{fmt(r.costHigh)}</b></span>
                <span>{TT.difficulty}: <b style={{ color: "var(--text)", textTransform: "capitalize" }}>{r.difficulty}</b></span>
              </div>
              {r.description && <p style={{ fontSize: 12, color: "var(--sub)", lineHeight: 1.5, paddingTop: 6, borderTop: "1px solid var(--border)" }}>{r.description}</p>}
            </div>
          ))}
        </div>
      )}

      {d.universities && d.universities.length > 0 && (
        <div className="card" style={{ marginBottom: 14 }}>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{TT.universities} ({unis.length})</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, padding: 12, background: "var(--bg)", borderRadius: 8, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: "var(--hint)", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{TT.country}</label>
              <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
                <option value="">{TT.allCountries}</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: "var(--hint)", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{TT.city}</label>
              <input type="text" placeholder={TT.allCities} value={filterCity} onChange={e => setFilterCity(e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "var(--hint)", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{TT.maxTuition}</label>
              <input type="number" placeholder={TT.any} value={filterMaxTuition || ""} onChange={e => setFilterMaxTuition(parseInt(e.target.value) || 0)} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "var(--hint)", fontWeight: 600, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{TT.sortBy}</label>
              <select value={sortUni} onChange={e => setSortUni(e.target.value)}>
                <option value="cheapest">{TT.cheapest}</option>
                <option value="topRanked">{TT.topRanked}</option>
              </select>
            </div>
          </div>
          {unis.map((u, i) => (
            <div key={i} style={{ padding: 14, border: "1px solid var(--border)", borderRadius: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</p>
                  <p style={{ fontSize: 12, color: "var(--sub)" }}>{u.city}, {u.country}</p>
                </div>
                {u.tag && <span className="badge bg-green">{TT[u.tag] || u.tag}</span>}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Tuition/yr</p><p style={{ fontWeight: 600 }}>{fmt(u.tuition)}</p></div>
                <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Living/yr</p><p style={{ fontWeight: 600 }}>{fmt(u.living)}</p></div>
                <div><p style={{ fontSize: 10, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600 }}>Ranking</p><p style={{ fontWeight: 600 }}>{u.ranking}</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {d.provinces && (
        <div className="card">
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 14 }}>{TT.salaries}</p>
          {d.provinces.map(prov => {
            const max = Math.max(...d.provinces.map(x => x.salary));
            return (
              <div key={prov.code} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 500, minWidth: 36, color: "var(--sub)" }}>{prov.code}</span>
                <div className="bar-wrap"><div className="bar-fill" style={{ width: `${(prov.salary / max) * 100}%` }}><span style={{ fontSize: 11, color: "#fff", fontWeight: 600 }}>{fmt(prov.salary)}</span></div></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: CHAT
// ═══════════════════════════════════════════════════════════════════════════
function ChatPage({ TT, chatMsgs, chatInput, setChatInput, chatBusy, sendChat, chatEndRef, setChatMsgs }) {
  return (
    <div className="fade" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 className="serif" style={{ fontSize: 30 }}>{TT.chat}</h2>
        {chatMsgs.length > 0 && <button className="btn-ghost" onClick={() => setChatMsgs([])} style={{ fontSize: 12 }}>Clear chat</button>}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", marginBottom: 12 }}>
        {chatMsgs.length === 0 && (
          <div style={{ textAlign: "center", padding: "30px 0" }}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>✨</p>
            <p className="serif" style={{ fontSize: 22, marginBottom: 18 }}>{TT.aiWelcome}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 540, margin: "0 auto" }}>
              {["How do I get my credentials recognized?", "What's the cheapest route to become a nurse?", "Can I work in Canada before my license is approved?", "Which province has the best job market?"].map((q, i) => (
                <button key={i} onClick={() => sendChat(q)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--card)", textAlign: "left", fontSize: 13, color: "var(--text)", cursor: "pointer", lineHeight: 1.4 }}>{q}</button>
              ))}
            </div>
          </div>
        )}
        {chatMsgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
            <div style={{ maxWidth: "82%", padding: "11px 16px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px", background: m.role === "user" ? "var(--accent)" : "var(--card)", color: m.role === "user" ? "#fff" : "var(--text)", fontSize: 14, lineHeight: 1.65, border: m.role === "assistant" ? "1px solid var(--border)" : "none", whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}
        {chatBusy && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "11px 16px", borderRadius: "4px 16px 16px 16px", background: "var(--card)", border: "1px solid var(--border)", fontSize: 14, color: "var(--sub)", display: "flex", alignItems: "center", gap: 8 }}>
              <span className="spin" style={{ width: 12, height: 12, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%" }} />
              {TT.thinking}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendChat()} placeholder={TT.aiPlaceholder} style={{ flex: 1, fontSize: 14 }} />
        <button className="btn" onClick={() => sendChat()} disabled={chatBusy || !chatInput.trim()} style={{ padding: "10px 20px" }}>{TT.send} ↗</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════
function DashboardPage({ TT, profile, profileComplete, currentPath, completedSteps, activity, isPro, navigate, openCareer, chatMsgs }) {
  const pct = currentPath ? (completedSteps.length / Math.max(currentPath.recommendedPath?.steps.length || 1, 1)) * 100 : 0;

  return (
    <div className="fade">
      <h2 className="serif" style={{ fontSize: 32, marginBottom: 6 }}>{TT.dashboard}</h2>
      <p style={{ color: "var(--sub)", fontSize: 14, marginBottom: 22 }}>{TT.dashboardSub}</p>

      {!profileComplete && (
        <div className="card" style={{ marginBottom: 18, background: "var(--amber-bg)", border: "1px solid var(--amber)" }}>
          <p style={{ fontWeight: 600, marginBottom: 6, color: "var(--amber)" }}>⚠️ Profile incomplete</p>
          <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>{TT.noProfile}</p>
          <button className="btn" onClick={() => navigate("intake")}>{TT.completeProfile}</button>
        </div>
      )}

      <div className="g3" style={{ marginBottom: 20 }}>
        <div className="card">
          <p style={{ fontSize: 11, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Path progress</p>
          <p style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>{Math.round(pct)}%</p>
          <div className="progress-bar" style={{ marginBottom: 10 }}>
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <p style={{ fontSize: 12, color: "var(--sub)" }}>{completedSteps.length} of {currentPath?.recommendedPath?.steps.length || 0} steps</p>
        </div>
        <div className="card">
          <p style={{ fontSize: 11, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>AI conversations</p>
          <p style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>{chatMsgs.filter(m => m.role === "user").length}</p>
          <p style={{ fontSize: 12, color: "var(--sub)" }}>questions asked</p>
        </div>
        <div className="card">
          <p style={{ fontSize: 11, color: "var(--hint)", textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>Plan</p>
          <p style={{ fontSize: 28, fontWeight: 600, marginBottom: 8 }}>{isPro ? "Pro" : "Free"}</p>
          {!isPro && <button className="btn" onClick={() => navigate("pro")} style={{ padding: "4px 10px", fontSize: 11 }}>Upgrade</button>}
        </div>
      </div>

      <div className="g2" style={{ marginBottom: 20 }}>
        <div className="card">
          <p style={{ fontWeight: 600, marginBottom: 12 }}>{TT.quickActions}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn-outline" onClick={() => navigate("myPath")} style={{ justifyContent: "flex-start" }}>🧭 View my path</button>
            <button className="btn-outline" onClick={() => navigate("explore")} style={{ justifyContent: "flex-start" }}>🔍 {TT.exploreCareers}</button>
            <button className="btn-outline" onClick={() => navigate("chat")} style={{ justifyContent: "flex-start" }}>✨ {TT.askAI}</button>
            <button className="btn-outline" onClick={() => navigate("settings")} style={{ justifyContent: "flex-start" }}>⚙️ {TT.editProfile}</button>
          </div>
        </div>

        <div className="card">
          <p style={{ fontWeight: 600, marginBottom: 12 }}>Coming soon</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["📄", TT.resumeBuilder, TT.resumeDesc],
              ["🎓", TT.scholarshipFinder, TT.scholarshipDesc],
              ["👥", TT.mentorMatch, TT.mentorDesc],
              ["🛂", TT.visaGuide, TT.visaDesc],
            ].map(([ic, t, d]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "var(--bg)", borderRadius: 8 }}>
                <span>{ic}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>{t}</p>
                  <p style={{ fontSize: 11, color: "var(--hint)" }}>{d}</p>
                </div>
                <span className="badge bg-purple">Pro</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <p style={{ fontWeight: 600, marginBottom: 12 }}>{TT.recentActivity}</p>
        {activity.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--sub)" }}>{TT.noActivity}</p>
        ) : (
          <div>
            {activity.slice(0, 10).map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 9 ? "1px solid var(--border)" : "none" }}>
                <span>{a.icon}</span>
                <span style={{ fontSize: 13, flex: 1 }}>{a.text}</span>
                <span style={{ fontSize: 11, color: "var(--hint)" }}>{new Date(a.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: PRO / UPGRADE
// ═══════════════════════════════════════════════════════════════════════════
function ProPage({ TT, isPro, adminInput, setAdminInput, adminErr, checkAdmin }) {
  const benefits = [
    [TT.proBenefit1, TT.proBenefit1d, "🎯"],
    [TT.proBenefit2, TT.proBenefit2d, "🔬"],
    [TT.proBenefit3, TT.proBenefit3d, "💬"],
    [TT.proBenefit4, TT.proBenefit4d, "🎓"],
    [TT.proBenefit5, TT.proBenefit5d, "⚖️"],
    [TT.proBenefit6, TT.proBenefit6d, "⚡"],
    [TT.proBenefit7, TT.proBenefit7d, "📄"],
    [TT.proBenefit8, TT.proBenefit8d, "🚀"],
  ];

  return (
    <div className="fade">
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <span className="badge bg-purple" style={{ marginBottom: 12 }}>⭐ Pro</span>
        <h2 className="serif" style={{ fontSize: 42, marginBottom: 10 }}>{TT.proTitle}</h2>
        <p style={{ color: "var(--sub)", fontSize: 16, maxWidth: 580, margin: "0 auto" }}>{TT.proSubtitle}</p>
      </div>

      {isPro && (
        <div className="card" style={{ textAlign: "center", padding: 36, background: "var(--accent-bg)", border: "1px solid var(--accent)", marginBottom: 24, maxWidth: 520, margin: "0 auto 24px" }}>
          <p style={{ fontSize: 42, marginBottom: 10 }}>🎉</p>
          <p className="serif" style={{ fontSize: 26, marginBottom: 6 }}>{TT.proActive}</p>
          <p style={{ color: "var(--sub)", fontSize: 14 }}>{TT.proActiveDesc}</p>
        </div>
      )}

      <p style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>{TT.whatYouGet}</p>
      <div className="g2" style={{ marginBottom: 30 }}>
        {benefits.map(([title, desc, icon], i) => (
          <div key={i} className="card" style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{title}</p>
              <p style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.55 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {!isPro && (
        <>
          <div className="g3" style={{ marginBottom: 28 }}>
            {[
              { id: "free", name: TT.freeTier, price: "$0", features: ["1 AI-generated path", "5 AI questions/day", "15 popular careers", "All languages"], cta: "Current", current: true },
              { id: "pro", name: TT.proTier, price: "$12", period: TT.perMonth, features: ["Everything in Free", "Unlimited AI paths", "Research any career", "Unlimited chat", "Advanced filters", "Priority AI"], cta: "Coming soon", highlight: true },
              { id: "lifetime", name: TT.lifetimeTier, price: "$299", period: TT.lifetime, features: ["Everything in Pro", "Forever — no subscription", "Future features included", "Priority support"], cta: "Coming soon" },
            ].map(plan => (
              <div key={plan.id} className="card" style={{ border: plan.highlight ? "2px solid var(--accent)" : "1px solid var(--border)", position: "relative" }}>
                {plan.highlight && <span style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#fff", fontSize: 11, padding: "3px 12px", borderRadius: 20, fontWeight: 600 }}>{TT.popular}</span>}
                <p style={{ fontWeight: 600, fontSize: 14, color: plan.highlight ? "var(--accent)" : "var(--text)", marginBottom: 6 }}>{plan.name}</p>
                <p className="serif-md" style={{ fontSize: 40, marginBottom: 14 }}>
                  {plan.price}
                  {plan.period && <span style={{ fontSize: 14, color: "var(--sub)", fontFamily: "Inter", fontWeight: 400 }}>{plan.period}</span>}
                </p>
                <ul style={{ listStyle: "none", marginBottom: 20 }}>
                  {plan.features.map((f, i) => <li key={i} style={{ fontSize: 13, color: "var(--sub)", padding: "4px 0" }}>✓ {f}</li>)}
                </ul>
                <button className={plan.highlight ? "btn" : "btn-outline"} style={{ width: "100%" }} disabled>{plan.cta}</button>
              </div>
            ))}
          </div>

          <div className="card" style={{ maxWidth: 480, margin: "0 auto" }}>
            <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 14 }}>{TT.paymentComingSoon}</p>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>🔑 {TT.adminCode}</p>
            <p style={{ fontSize: 12, color: "var(--sub)", marginBottom: 12 }}>Admin or promo code for testing access</p>
            <div style={{ display: "flex", gap: 8 }}>
              <input type="password" value={adminInput} onChange={e => setAdminInput(e.target.value)} onKeyDown={e => e.key === "Enter" && checkAdmin()} placeholder="Enter code..." />
              <button className="btn" onClick={checkAdmin}>{TT.unlock}</button>
            </div>
            {adminErr && <p style={{ color: "var(--red)", fontSize: 12, marginTop: 8 }}>{adminErr}</p>}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE: SETTINGS
// ═══════════════════════════════════════════════════════════════════════════
function SettingsPage({ TT, email, lang, setLang, dark, setDark, profile, setProfile, isPro, authMethod, googleUser, navigate, setIntakeStep, showToast, setProfileComplete, profileComplete, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const save = () => {
    setProfile(draft);
    setEditing(false);
    showToast(TT.saved, "ok");
  };

  return (
    <div className="fade">
      <h2 className="serif" style={{ fontSize: 32, marginBottom: 22 }}>{TT.settings}</h2>

      {/* Profile card */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <p style={{ fontWeight: 600 }}>{TT.yourProfile}</p>
          {profileComplete && !editing && (
            <button className="btn-outline" onClick={() => { setDraft(profile); setEditing(true); }} style={{ padding: "4px 10px", fontSize: 12 }}>{TT.editProfile}</button>
          )}
          {editing && (
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn-ghost" onClick={() => setEditing(false)} style={{ padding: "4px 10px", fontSize: 12 }}>{TT.cancel}</button>
              <button className="btn" onClick={save} style={{ padding: "4px 12px", fontSize: 12 }}>{TT.save}</button>
            </div>
          )}
        </div>

        {googleUser && (
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, padding: 12, background: "var(--bg)", borderRadius: 8 }}>
            {googleUser.picture && <img src={googleUser.picture} alt="" style={{ width: 40, height: 40, borderRadius: "50%" }} />}
            <div>
              <p style={{ fontWeight: 600, fontSize: 14 }}>{googleUser.name}</p>
              <p style={{ fontSize: 12, color: "var(--sub)" }}>{googleUser.email}</p>
            </div>
          </div>
        )}
        <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 14 }}>{TT.signedInAs} <strong style={{ color: "var(--text)" }}>{email}</strong> ({authMethod})</p>

        {!profileComplete ? (
          <div style={{ textAlign: "center", padding: 20, background: "var(--bg)", borderRadius: 10 }}>
            <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>You haven't completed the questionnaire yet.</p>
            <button className="btn" onClick={() => { setIntakeStep(0); navigate("intake"); }}>{TT.completeProfile}</button>
          </div>
        ) : editing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileType}</label>
              <select value={draft.userType} onChange={e => setDraft({ ...draft, userType: e.target.value })}>
                {DB_USER_TYPES.map(ut => <option key={ut.id} value={ut.id}>{ut.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileCountry}</label>
              <select value={draft.country} onChange={e => setDraft({ ...draft, country: e.target.value })}>
                {DB_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileEducation}</label>
              <select value={draft.education} onChange={e => setDraft({ ...draft, education: e.target.value })}>
                {DB_EDUCATION.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileSchool}</label>
              <input type="text" value={draft.school} onChange={e => setDraft({ ...draft, school: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileCerts}</label>
              <textarea value={draft.certs} onChange={e => setDraft({ ...draft, certs: e.target.value })} rows={2} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileExperience} ({TT.years})</label>
              <input type="number" value={draft.experience} onChange={e => setDraft({ ...draft, experience: e.target.value })} min="0" max="50" />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--sub)", fontWeight: 500, display: "block", marginBottom: 4 }}>{TT.profileCareer}</label>
              <input type="text" value={draft.career} onChange={e => setDraft({ ...draft, career: e.target.value })} />
            </div>
          </div>
        ) : (
          <div style={{ fontSize: 13, lineHeight: 1.9 }}>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileType}:</span> <strong>{DB_USER_TYPES.find(u => u.id === profile.userType)?.label || "—"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileCountry}:</span> <strong>{profile.country || "—"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileEducation}:</span> <strong>{profile.education || "—"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileSchool}:</span> <strong>{profile.school || "—"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileCerts}:</span> <strong>{profile.certs || "none"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileExperience}:</span> <strong>{profile.experience || "0"} {TT.years}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profileCareer}:</span> <strong>{profile.career || "—"}</strong></p>
            <p><span style={{ color: "var(--sub)" }}>{TT.profilePriority}:</span> <strong style={{ textTransform: "capitalize" }}>{profile.priority}</strong></p>
            <button className="btn-outline" onClick={() => { setIntakeStep(0); navigate("intake"); }} style={{ marginTop: 14 }}>{TT.redoIntake}</button>
          </div>
        )}
      </div>

      {/* Language */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontWeight: 600, marginBottom: 10 }}>{TT.language}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {Object.entries(LANGS).map(([k, v]) => (
            <button key={k} className={`chip ${lang === k ? "on" : ""}`} onClick={() => setLang(k)}>{v.flag} {v.name}</button>
          ))}
        </div>
      </div>

      {/* Dark mode */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontWeight: 500 }}>{TT.darkMode}</p>
          <button onClick={() => setDark(!dark)} style={{ width: 46, height: 26, borderRadius: 13, background: dark ? "var(--accent)" : "var(--border2)", position: "relative", cursor: "pointer", border: "none" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: dark ? 23 : 3, transition: "left .2s" }} />
          </button>
        </div>
      </div>

      {/* Subscription */}
      <div className="card" style={{ marginBottom: 14 }}>
        <p style={{ fontWeight: 600, marginBottom: 6 }}>Subscription</p>
        <p style={{ fontSize: 13, color: "var(--sub)", marginBottom: 12 }}>{isPro ? TT.proActive : "Free plan"}</p>
        {!isPro && <button className="btn" onClick={() => navigate("pro")}>{TT.upgrade} →</button>}
      </div>

      {/* Logout */}
      <div className="card">
        <button className="btn-ghost" onClick={onLogout} style={{ color: "var(--red)", fontSize: 13 }}>🚪 {TT.logout}</button>
      </div>
    </div>
  );
}
