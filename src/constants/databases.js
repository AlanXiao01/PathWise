export const LANGS = {
  en: { name: 'English', dir: 'ltr', flag: '🇬🇧' },
  fr: { name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  hi: { name: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  zh: { name: '中文', dir: 'ltr', flag: '🇨🇳' },
  ar: { name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  tl: { name: 'Tagalog', dir: 'ltr', flag: '🇵🇭' },
  pa: { name: 'ਪੰਜਾਬੀ', dir: 'ltr', flag: '🇮🇳' },
  es: { name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  ur: { name: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  pt: { name: 'Português', dir: 'ltr', flag: '🇧🇷' },
};

export const DB_USER_TYPES = [
  { id: 'immigrant', label: 'International immigrant', emoji: '🌍' },
  { id: 'student', label: 'International student', emoji: '🎓' },
  { id: 'career_changer', label: 'Career changer in Canada', emoji: '🔄' },
  { id: 'refugee', label: 'Refugee/claimant', emoji: '🏠' },
];

export const DB_COUNTRIES = [
  'India', 'Philippines', 'Pakistan', 'China', 'Nigeria', 'Mexico', 'Bangladesh', 'Vietnam',
  'Iran', 'United Kingdom', 'United States', 'France', 'Australia', 'Germany', 'South Africa',
  'Brazil', 'Japan', 'South Korea', 'Egypt', 'Poland', 'Syria', 'Ukraine', 'Iraq', 'Kenya',
];

export const DB_EDUCATION = [
  'High School / Secondary',
  'Some College / Vocational',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate (PhD)',
  'Professional Degree (MD, JD, etc)',
  'Medical/Health Professional',
  'Trade Certification',
];

export const DB_CAREERS = {
  doctor: {
    id: 'doctor',
    name: 'Medical Doctor',
    emoji: '👨‍⚕️',
    category: 'Healthcare',
    regulated: true,
    timeYears: '5-7',
    avgSalary: 260000,
    salaryRange: '$180K-$380K',
    demandLevel: 'high',
    jobOpenings: 8000,
    dayInLife: 'See patients, conduct exams, diagnose conditions, and prescribe treatments. In hospitals, clinics, or private practice.',
    workLife: 'Irregular hours including nights, weekends, and on-call duties. High-stress environment requiring emotional resilience.',
    careerGrowth: 'Specialize in surgery, cardiology, psychiatry, or other fields. Advance to hospital leadership or private practice ownership.',
    provinces: [{ code: 'ON', salary: 270000 }, { code: 'BC', salary: 250000 }, { code: 'AB', salary: 290000 }, { code: 'QC', salary: 240000 }],
    pathways: {
      international: {
        assessment: 'Medical Council of Canada Evaluating Examination (MCCEE) + Medical Council of Canada Qualifying Examination (MCCQE)',
        bridging: '3-6 months of supervised practice, additional exams for specialty',
        visa: 'Express Entry (Federal Skilled Worker) or Provincial Nominee Program',
        cost: '$15,000-$50,000',
        time: '2-4 years'
      },
      canadian: {
        assessment: 'Medical school (4 years) + residency (2-7 years)',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$200,000-$400,000',
        time: '6-11 years'
      }
    },
    requirements: ['MD degree', 'Clinical experience', 'English/French proficiency', 'Clean criminal record'],
    shortcuts: ['Practice Ready Assessment (PRA) for some countries', 'Alternative pathways for refugees'],
    universities: ['University of Toronto', 'McGill University', 'University of British Columbia'],
    employers: ['Hospitals', 'Clinics', 'Private practice', 'Government health services']
  },
  nurse: {
    id: 'nurse',
    name: 'Registered Nurse (RN)',
    emoji: '👩‍⚕️',
    category: 'Healthcare',
    regulated: true,
    timeYears: '2-4',
    avgSalary: 75000,
    salaryRange: '$55K-$95K',
    demandLevel: 'high',
    jobOpenings: 45000,
    dayInLife: 'Monitor vital signs, administer medications, assist doctors, and provide patient care in hospitals and clinics.',
    workLife: 'Shift work including nights and weekends. Physically demanding with high patient interaction.',
    careerGrowth: 'Become a Nurse Practitioner, Nursing Manager, or specialize in critical care or emergency nursing.',
    provinces: [{ code: 'ON', salary: 78000 }, { code: 'BC', salary: 76000 }, { code: 'AB', salary: 82000 }, { code: 'QC', salary: 70000 }],
    pathways: {
      international: {
        assessment: 'NCLEX-RN exam + provincial registration exam',
        bridging: 'Language proficiency + competency assessment',
        visa: 'Express Entry or Provincial Nominee Program',
        cost: '$5,000-$15,000',
        time: '1-2 years'
      },
      canadian: {
        assessment: 'Nursing degree (4 years) + registration',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$40,000-$80,000',
        time: '4 years'
      }
    },
    requirements: ['Nursing degree', 'Clinical experience', 'English/French proficiency', 'CPR certification'],
    shortcuts: ['Fast-track for internationally educated nurses', 'Bridging programs'],
    universities: ['University of Toronto', 'McMaster University', 'University of Alberta'],
    employers: ['Hospitals', 'Long-term care', 'Community health', 'Private clinics']
  },
  engineer: {
    id: 'engineer',
    name: 'Software Engineer',
    emoji: '👨‍💻',
    category: 'Technology',
    regulated: false,
    timeYears: '4',
    avgSalary: 110000,
    salaryRange: '$80K-$180K',
    demandLevel: 'high',
    jobOpenings: 12000,
    dayInLife: 'Write code, design systems, debug applications, and collaborate with teams to build software solutions.',
    workLife: 'Flexible hours, often remote. Fast-paced and collaborative environment with continuous learning.',
    careerGrowth: 'Become a Team Lead, Architect, or move into Product Management or AI/ML specialization.',
    provinces: [{ code: 'ON', salary: 115000 }, { code: 'BC', salary: 120000 }, { code: 'AB', salary: 105000 }, { code: 'QC', salary: 100000 }],
    pathways: {
      international: {
        assessment: 'Degree assessment + work experience evaluation',
        bridging: 'None typically required',
        visa: 'Express Entry (Federal Skilled Worker)',
        cost: '$1,000-$5,000',
        time: '6 months-1 year'
      },
      canadian: {
        assessment: 'Computer Science degree (4 years)',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$40,000-$120,000',
        time: '4 years'
      }
    },
    requirements: ['Computer Science degree', 'Programming skills', 'English proficiency'],
    shortcuts: ['Express Entry points for education/experience', 'Tech sector targeted draws'],
    universities: ['University of Waterloo', 'University of Toronto', 'McGill University'],
    employers: ['Tech companies', 'Banks', 'Government', 'Startups']
  },
  accountant: {
    id: 'accountant',
    name: 'Chartered Accountant (CA)',
    emoji: '💼',
    category: 'Finance',
    regulated: true,
    timeYears: '4-5',
    avgSalary: 85000,
    salaryRange: '$60K-$140K',
    demandLevel: 'medium',
    jobOpenings: 6000,
    dayInLife: 'Prepare tax returns, audit financial statements, advise on business finances, and ensure compliance.',
    workLife: 'Seasonal busy periods (tax season). Office-based with attention to detail and accuracy required.',
    careerGrowth: 'Become a CPA partner, corporate CFO, or specialize in forensic accounting.',
    provinces: [{ code: 'ON', salary: 88000 }, { code: 'BC', salary: 84000 }, { code: 'AB', salary: 92000 }, { code: 'QC', salary: 80000 }],
    pathways: {
      international: {
        assessment: 'CPA qualification exams + experience assessment',
        bridging: 'Professional education program',
        visa: 'Express Entry or Provincial Nominee',
        cost: '$10,000-$25,000',
        time: '2-3 years'
      },
      canadian: {
        assessment: 'Accounting degree + CPA designation',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$30,000-$60,000',
        time: '4-5 years'
      }
    },
    requirements: ['Accounting degree', 'CPA exams', 'Work experience', 'Ethics course'],
    shortcuts: ['Mutual Recognition Agreements', 'Fast-track for UK/Ireland CAs'],
    universities: ['University of Toronto', 'Queen\'s University', 'University of British Columbia'],
    employers: ['Accounting firms', 'Corporations', 'Government', 'Consulting']
  },
  lawyer: {
    id: 'lawyer',
    name: 'Lawyer (JD)',
    emoji: '⚖️',
    category: 'Law',
    regulated: true,
    timeYears: '4-5',
    avgSalary: 95000,
    salaryRange: '$70K-$200K',
    demandLevel: 'medium',
    jobOpenings: 4000,
    dayInLife: 'Research law, draft documents, represent clients, negotiate settlements, and argue cases.',
    workLife: 'Long hours, especially in litigation. High-stress deadlines and client management.',
    careerGrowth: 'Partner in law firm, corporate counsel, judge, or specialize in immigration or corporate law.',
    provinces: [{ code: 'ON', salary: 98000 }, { code: 'BC', salary: 92000 }, { code: 'AB', salary: 105000 }, { code: 'QC', salary: 88000 }],
    pathways: {
      international: {
        assessment: 'Bar admission exams + articling program',
        bridging: 'Legal education assessment',
        visa: 'Express Entry or Provincial Nominee',
        cost: '$15,000-$40,000',
        time: '2-4 years'
      },
      canadian: {
        assessment: 'Law degree (3 years) + bar admission',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$60,000-$150,000',
        time: '3-4 years'
      }
    },
    requirements: ['Law degree', 'Bar exams', 'Articling', 'Character reference'],
    shortcuts: ['National Committee on Accreditation', 'Fast-track for UK lawyers'],
    universities: ['University of Toronto', 'McGill University', 'University of British Columbia'],
    employers: ['Law firms', 'Government', 'Corporations', 'Legal aid']
  },
  teacher: {
    id: 'teacher',
    name: 'High School Teacher',
    emoji: '👩‍🏫',
    category: 'Education',
    regulated: true,
    timeYears: '3-4',
    avgSalary: 65000,
    salaryRange: '$50K-$85K',
    demandLevel: 'high',
    jobOpenings: 8500,
    dayInLife: 'Teach classes, prepare lessons, grade assignments, and engage students in learning.',
    workLife: 'Standard school hours with evenings for grading. Summers off but planning required.',
    careerGrowth: 'Become Department Head, Principal, or specialize in gifted education or special needs.',
    provinces: [{ code: 'ON', salary: 68000 }, { code: 'BC', salary: 62000 }, { code: 'AB', salary: 70000 }, { code: 'QC', salary: 60000 }],
    pathways: {
      international: {
        assessment: 'Teaching certificate + subject exams',
        bridging: 'Teacher education program',
        visa: 'Express Entry or Provincial Nominee',
        cost: '$5,000-$20,000',
        time: '1-3 years'
      },
      canadian: {
        assessment: 'Education degree + teaching certificate',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$20,000-$50,000',
        time: '4-5 years'
      }
    },
    requirements: ['Education degree', 'Teaching certificate', 'Criminal record check', 'Subject expertise'],
    shortcuts: ['International Teacher Assessment and Recognition', 'Provincial bridging programs'],
    universities: ['Ontario Institute for Studies in Education', 'University of British Columbia', 'University of Alberta'],
    employers: ['Public schools', 'Private schools', 'Colleges', 'Tutoring centers']
  },
  electrician: {
    id: 'electrician',
    name: 'Electrician',
    emoji: '⚡',
    category: 'Trades',
    regulated: true,
    timeYears: '4-5',
    avgSalary: 70000,
    salaryRange: '$50K-$95K',
    demandLevel: 'high',
    jobOpenings: 15000,
    dayInLife: 'Install wiring, repair electrical systems, troubleshoot issues, and follow safety codes.',
    workLife: 'Hands-on work, sometimes hazardous. Variable hours including emergency calls.',
    careerGrowth: 'Become a Master Electrician, start own business, or supervise crews.',
    provinces: [{ code: 'ON', salary: 72000 }, { code: 'BC', salary: 75000 }, { code: 'AB', salary: 78000 }, { code: 'QC', salary: 68000 }],
    pathways: {
      international: {
        assessment: 'Trade certification + exam',
        bridging: 'Apprenticeship program',
        visa: 'Express Entry (Federal Skilled Trades)',
        cost: '$2,000-$10,000',
        time: '1-2 years'
      },
      canadian: {
        assessment: 'Apprenticeship (4-5 years) + certification',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$5,000-$15,000',
        time: '4-5 years'
      }
    },
    requirements: ['Trade certification', 'Apprenticeship', 'Safety training', 'Electrical code knowledge'],
    shortcuts: ['Red Seal certification recognition', 'Express Entry for skilled trades'],
    universities: ['Apprenticeship programs', 'Technical colleges', 'Trade schools'],
    employers: ['Construction companies', 'Electrical contractors', 'Manufacturing', 'Maintenance services']
  },
  physiotherapist: {
    id: 'physiotherapist',
    name: 'Physiotherapist',
    emoji: '💪',
    category: 'Healthcare',
    regulated: true,
    timeYears: '3-4',
    avgSalary: 72000,
    salaryRange: '$55K-$95K',
    demandLevel: 'high',
    jobOpenings: 3500,
    dayInLife: 'Assess and treat musculoskeletal injuries, design exercise programs, and help patients recover.',
    workLife: 'Regular office hours. Physically demanding with patient interaction and empathy required.',
    careerGrowth: 'Open private clinic, specialize in sports medicine, or become clinical supervisor.',
    provinces: [{ code: 'ON', salary: 74000 }, { code: 'BC', salary: 76000 }, { code: 'AB', salary: 72000 }, { code: 'QC', salary: 68000 }],
    pathways: {
      international: {
        assessment: 'Physiotherapy Competency Exam + clinical assessment',
        bridging: 'Bridging program for internationally educated PTs',
        visa: 'Express Entry or Provincial Nominee',
        cost: '$8,000-$20,000',
        time: '1-3 years'
      },
      canadian: {
        assessment: 'Physiotherapy degree + clinical internship',
        bridging: 'None required',
        visa: 'Canadian citizen/PR',
        cost: '$40,000-$80,000',
        time: '4-5 years'
      }
    },
    requirements: ['Physiotherapy degree', 'Clinical internship', 'Licensing exam', 'CPR certification'],
    shortcuts: ['Canadian Alliance of Physiotherapy Regulators assessment', 'Bridging programs'],
    universities: ['University of Toronto', 'McMaster University', 'University of British Columbia'],
    employers: ['Hospitals', 'Private clinics', 'Sports teams', 'Rehabilitation centers']
  },
};

export const POPULAR_CAREER_IDS = ['doctor', 'nurse', 'engineer', 'accountant', 'lawyer', 'teacher', 'electrician', 'physiotherapist'];
