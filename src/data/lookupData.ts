// ====================================================================
// DONO JAHA (D O N O   J A H A)
// Master Normalized Lookup Datasets
// Provides authoritative, searchable datasets for Location, Education,
// Profession, Income, and Partner Preferences.
// ====================================================================

export interface CountryItem {
  id: string;
  code: string;
  name: string;
}

export interface StateItem {
  id: string;
  countryId: string;
  code: string;
  name: string;
}

export interface CityItem {
  id: string;
  stateId: string;
  name: string;
  isPopular?: boolean;
}

export interface EducationItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
  shortName: string;
}

export interface ProfessionCategory {
  id: string;
  name: string;
  icon?: string;
}

export interface ProfessionItem {
  id: string;
  categoryId: string;
  categoryName: string;
  name: string;
}

export interface IncomeItem {
  id: string;
  minAmount: number;
  label: string;
}

// -------------------------------------------------------------
// 1. COUNTRIES
// -------------------------------------------------------------
export const COUNTRIES: CountryItem[] = [
  { id: 'country-in', code: 'IN', name: 'India' },
  { id: 'country-ae', code: 'AE', name: 'United Arab Emirates (UAE)' },
  { id: 'country-sa', code: 'SA', name: 'Saudi Arabia' },
  { id: 'country-qa', code: 'QA', name: 'Qatar' },
  { id: 'country-uk', code: 'GB', name: 'United Kingdom' },
  { id: 'country-us', code: 'US', name: 'United States' },
  { id: 'country-ca', code: 'CA', name: 'Canada' },
];

// -------------------------------------------------------------
// 2. INDIAN STATES & UNION TERRITORIES (All 36 States & UTs)
// -------------------------------------------------------------
export const INDIAN_STATES: StateItem[] = [
  { id: 'state-up', countryId: 'country-in', code: 'UP', name: 'Uttar Pradesh' },
  { id: 'state-mh', countryId: 'country-in', code: 'MH', name: 'Maharashtra' },
  { id: 'state-dl', countryId: 'country-in', code: 'DL', name: 'Delhi NCR' },
  { id: 'state-tg', countryId: 'country-in', code: 'TG', name: 'Telangana' },
  { id: 'state-ka', countryId: 'country-in', code: 'KA', name: 'Karnataka' },
  { id: 'state-gj', countryId: 'country-in', code: 'GJ', name: 'Gujarat' },
  { id: 'state-br', countryId: 'country-in', code: 'BR', name: 'Bihar' },
  { id: 'state-wb', countryId: 'country-in', code: 'WB', name: 'West Bengal' },
  { id: 'state-mp', countryId: 'country-in', code: 'MP', name: 'Madhya Pradesh' },
  { id: 'state-rj', countryId: 'country-in', code: 'RJ', name: 'Rajasthan' },
  { id: 'state-tn', countryId: 'country-in', code: 'TN', name: 'Tamil Nadu' },
  { id: 'state-kl', countryId: 'country-in', code: 'KL', name: 'Kerala' },
  { id: 'state-ap', countryId: 'country-in', code: 'AP', name: 'Andhra Pradesh' },
  { id: 'state-pb', countryId: 'country-in', code: 'PB', name: 'Punjab' },
  { id: 'state-hr', countryId: 'country-in', code: 'HR', name: 'Haryana' },
  { id: 'state-jk', countryId: 'country-in', code: 'JK', name: 'Jammu & Kashmir' },
  { id: 'state-jh', countryId: 'country-in', code: 'JH', name: 'Jharkhand' },
  { id: 'state-as', countryId: 'country-in', code: 'AS', name: 'Assam' },
  { id: 'state-od', countryId: 'country-in', code: 'OD', name: 'Odisha' },
  { id: 'state-uk', countryId: 'country-in', code: 'UK', name: 'Uttarakhand' },
  { id: 'state-ch', countryId: 'country-in', code: 'CH', name: 'Chandigarh' },
  { id: 'state-ga', countryId: 'country-in', code: 'GA', name: 'Goa' },
  { id: 'state-hp', countryId: 'country-in', code: 'HP', name: 'Himachal Pradesh' },
  { id: 'state-cg', countryId: 'country-in', code: 'CG', name: 'Chhattisgarh' },
  { id: 'state-la', countryId: 'country-in', code: 'LA', name: 'Ladakh' },
];

// -------------------------------------------------------------
// 3. NORMALIZED CITIES & DISTRICTS (Searchable with state references)
// -------------------------------------------------------------
export const CITIES: CityItem[] = [
  // Uttar Pradesh
  { id: 'city-noida', stateId: 'state-up', name: 'Noida', isPopular: true },
  { id: 'city-lucknow', stateId: 'state-up', name: 'Lucknow', isPopular: true },
  { id: 'city-kanpur', stateId: 'state-up', name: 'Kanpur', isPopular: true },
  { id: 'city-agra', stateId: 'state-up', name: 'Agra' },
  { id: 'city-varanasi', stateId: 'state-up', name: 'Varanasi' },
  { id: 'city-meerut', stateId: 'state-up', name: 'Meerut' },
  { id: 'city-aligarh', stateId: 'state-up', name: 'Aligarh', isPopular: true },
  { id: 'city-bareilly', stateId: 'state-up', name: 'Bareilly' },
  { id: 'city-moradabad', stateId: 'state-up', name: 'Moradabad' },
  { id: 'city-ghaziabad', stateId: 'state-up', name: 'Ghaziabad', isPopular: true },
  { id: 'city-gorakhpur', stateId: 'state-up', name: 'Gorakhpur' },
  { id: 'city-saharanpur', stateId: 'state-up', name: 'Saharanpur' },

  // Maharashtra
  { id: 'city-mumbai', stateId: 'state-mh', name: 'Mumbai', isPopular: true },
  { id: 'city-pune', stateId: 'state-mh', name: 'Pune', isPopular: true },
  { id: 'city-nagpur', stateId: 'state-mh', name: 'Nagpur' },
  { id: 'city-thane', stateId: 'state-mh', name: 'Thane', isPopular: true },
  { id: 'city-navi-mumbai', stateId: 'state-mh', name: 'Navi Mumbai', isPopular: true },
  { id: 'city-aurangabad', stateId: 'state-mh', name: 'Chhatrapati Sambhajinagar (Aurangabad)', isPopular: true },
  { id: 'city-nashik', stateId: 'state-mh', name: 'Nashik' },
  { id: 'city-solapur', stateId: 'state-mh', name: 'Solapur' },
  { id: 'city-kolhapur', stateId: 'state-mh', name: 'Kolhapur' },

  // Delhi NCR
  { id: 'city-delhi-central', stateId: 'state-dl', name: 'New Delhi (Central)', isPopular: true },
  { id: 'city-delhi-south', stateId: 'state-dl', name: 'South Delhi', isPopular: true },
  { id: 'city-delhi-north', stateId: 'state-dl', name: 'North Delhi' },
  { id: 'city-delhi-east', stateId: 'state-dl', name: 'East Delhi' },
  { id: 'city-delhi-west', stateId: 'state-dl', name: 'West Delhi' },
  { id: 'city-gurgaon', stateId: 'state-dl', name: 'Gurugram (Gurgaon)', isPopular: true },
  { id: 'city-faridabad', stateId: 'state-dl', name: 'Faridabad' },

  // Telangana
  { id: 'city-hyderabad', stateId: 'state-tg', name: 'Hyderabad', isPopular: true },
  { id: 'city-secunderabad', stateId: 'state-tg', name: 'Secunderabad', isPopular: true },
  { id: 'city-warangal', stateId: 'state-tg', name: 'Warangal' },
  { id: 'city-nizamabad', stateId: 'state-tg', name: 'Nizamabad' },
  { id: 'city-karimnagar', stateId: 'state-tg', name: 'Karimnagar' },

  // Karnataka
  { id: 'city-bangalore', stateId: 'state-ka', name: 'Bengaluru (Bangalore)', isPopular: true },
  { id: 'city-mysore', stateId: 'state-ka', name: 'Mysuru (Mysore)' },
  { id: 'city-mangalore', stateId: 'state-ka', name: 'Mangaluru (Mangalore)' },
  { id: 'city-hubli', stateId: 'state-ka', name: 'Hubli-Dharwad' },
  { id: 'city-belgaum', stateId: 'state-ka', name: 'Belagavi (Belgaum)' },
  { id: 'city-gulbarga', stateId: 'state-ka', name: 'Kalaburagi (Gulbarga)' },

  // Gujarat
  { id: 'city-ahmedabad', stateId: 'state-gj', name: 'Ahmedabad', isPopular: true },
  { id: 'city-surat', stateId: 'state-gj', name: 'Surat', isPopular: true },
  { id: 'city-vadodara', stateId: 'state-gj', name: 'Vadodara (Baroda)' },
  { id: 'city-rajkot', stateId: 'state-gj', name: 'Rajkot' },
  { id: 'city-bhavnagar', stateId: 'state-gj', name: 'Bhavnagar' },

  // Bihar
  { id: 'city-patna', stateId: 'state-br', name: 'Patna', isPopular: true },
  { id: 'city-gaya', stateId: 'state-br', name: 'Gaya' },
  { id: 'city-bhagalpur', stateId: 'state-br', name: 'Bhagalpur' },
  { id: 'city-muzaffarpur', stateId: 'state-br', name: 'Muzaffarpur' },
  { id: 'city-darbhanga', stateId: 'state-br', name: 'Darbhanga' },

  // West Bengal
  { id: 'city-kolkata', stateId: 'state-wb', name: 'Kolkata', isPopular: true },
  { id: 'city-howrah', stateId: 'state-wb', name: 'Howrah' },
  { id: 'city-asansol', stateId: 'state-wb', name: 'Asansol' },
  { id: 'city-siliguri', stateId: 'state-wb', name: 'Siliguri' },

  // Madhya Pradesh
  { id: 'city-bhopal', stateId: 'state-mp', name: 'Bhopal', isPopular: true },
  { id: 'city-indore', stateId: 'state-mp', name: 'Indore', isPopular: true },
  { id: 'city-gwalior', stateId: 'state-mp', name: 'Gwalior' },
  { id: 'city-jabalpur', stateId: 'state-mp', name: 'Jabalpur' },

  // Jammu & Kashmir
  { id: 'city-srinagar', stateId: 'state-jk', name: 'Srinagar', isPopular: true },
  { id: 'city-jammu', stateId: 'state-jk', name: 'Jammu' },
  { id: 'city-anantnag', stateId: 'state-jk', name: 'Anantnag' },

  // Rajasthan
  { id: 'city-jaipur', stateId: 'state-rj', name: 'Jaipur', isPopular: true },
  { id: 'city-jodhpur', stateId: 'state-rj', name: 'Jodhpur' },
  { id: 'city-udaipur', stateId: 'state-rj', name: 'Udaipur' },
  { id: 'city-kota', stateId: 'state-rj', name: 'Kota' },
];

// -------------------------------------------------------------
// 4. STRUCTURED EDUCATION LOOKUP DATASET
// -------------------------------------------------------------
export const EDUCATION_LOOKUP: EducationItem[] = [
  // Medicine & Healthcare
  { id: 'edu-mbbs-md', categoryId: 'cat-med', categoryName: 'Medicine / Healthcare', name: 'M.B.B.S., MD / MS (Doctor)', shortName: 'MBBS, MD' },
  { id: 'edu-bds-mds', categoryId: 'cat-med', categoryName: 'Medicine / Healthcare', name: 'BDS / MDS (Dentistry)', shortName: 'BDS / MDS' },
  { id: 'edu-bpharm', categoryId: 'cat-med', categoryName: 'Medicine / Healthcare', name: 'B.Pharm / M.Pharm (Pharmacy)', shortName: 'B.Pharm' },
  { id: 'edu-physio', categoryId: 'cat-med', categoryName: 'Medicine / Healthcare', name: 'BPT / MPT (Physiotherapy)', shortName: 'Physiotherapy' },
  { id: 'edu-nursing', categoryId: 'cat-med', categoryName: 'Medicine / Healthcare', name: 'B.Sc / M.Sc Nursing', shortName: 'Nursing' },

  // Engineering & Technology
  { id: 'edu-btech-cs', categoryId: 'cat-eng', categoryName: 'Engineering & Tech', name: 'B.E. / B.Tech (Computer Science / IT)', shortName: 'B.Tech CS/IT' },
  { id: 'edu-btech-core', categoryId: 'cat-eng', categoryName: 'Engineering & Tech', name: 'B.E. / B.Tech (Mechanical / Civil / Electrical)', shortName: 'B.Tech Core' },
  { id: 'edu-mtech', categoryId: 'cat-eng', categoryName: 'Engineering & Tech', name: 'M.Tech / M.E. / MS in Engineering', shortName: 'M.Tech / MS' },
  { id: 'edu-mca', categoryId: 'cat-eng', categoryName: 'Engineering & Tech', name: 'BCA / MCA (Computer Applications)', shortName: 'MCA / BCA' },

  // Management & Finance
  { id: 'edu-mba-premier', categoryId: 'cat-mgmt', categoryName: 'Management & Finance', name: 'MBA / PGDM (Premier / Top Tier)', shortName: 'MBA' },
  { id: 'edu-ca', categoryId: 'cat-mgmt', categoryName: 'Management & Finance', name: 'Chartered Accountant (CA / CFA / CPA)', shortName: 'CA / CFA' },
  { id: 'edu-bba', categoryId: 'cat-mgmt', categoryName: 'Management & Finance', name: 'BBA / BBM / BMS', shortName: 'BBA / BMS' },
  { id: 'edu-mcom', categoryId: 'cat-mgmt', categoryName: 'Management & Finance', name: 'B.Com / M.Com (Commerce)', shortName: 'B.Com / M.Com' },

  // Law & Civil Services
  { id: 'edu-llb-llm', categoryId: 'cat-law', categoryName: 'Law & Legal', name: 'LL.B. / LL.M. (Advocate / Lawyer)', shortName: 'LLB / LLM' },

  // Doctorate & Research
  { id: 'edu-phd', categoryId: 'cat-phd', categoryName: 'Doctorate & Research', name: 'Ph.D. / Doctorate / Post-Doctoral', shortName: 'Ph.D.' },

  // Islamic Studies
  { id: 'edu-alimiyyah', categoryId: 'cat-deen', categoryName: 'Islamic Education', name: 'Alimiyyah / Alim / Fazil (Islamic Scholar)', shortName: 'Alim / Scholar' },
  { id: 'edu-hifz', categoryId: 'cat-deen', categoryName: 'Islamic Education', name: 'Hafiz-ul-Quran with Secular Graduation', shortName: 'Hafiz + Graduate' },

  // Arts, Science & Humanities
  { id: 'edu-ba-ma', categoryId: 'cat-arts', categoryName: 'Arts & Humanities', name: 'B.A. / M.A. (Arts, Literature, Psychology)', shortName: 'B.A. / M.A.' },
  { id: 'edu-bsc-msc', categoryId: 'cat-sci', categoryName: 'Pure Sciences', name: 'B.Sc. / M.Sc. (Physics, Chemistry, Maths)', shortName: 'B.Sc. / M.Sc.' },
  { id: 'edu-design', categoryId: 'cat-arts', categoryName: 'Design & Architecture', name: 'B.Des / M.Des / B.Arch (Architecture)', shortName: 'B.Arch / Design' },
];

// -------------------------------------------------------------
// 5. STRUCTURED PROFESSION CATEGORIES & PROFESSIONS
// (Directly modeled on the Shaadi reference layout)
// -------------------------------------------------------------
export const PROFESSION_CATEGORIES: ProfessionCategory[] = [
  { id: 'prof-cat-it', name: 'IT & Software Engineering', icon: 'laptop-code' },
  { id: 'prof-cat-med', name: 'Medical & Healthcare', icon: 'stethoscope' },
  { id: 'prof-cat-fin', name: 'Accounting, Banking & Finance', icon: 'account-balance' },
  { id: 'prof-cat-eng', name: 'Engineering (Non-IT)', icon: 'engineering' },
  { id: 'prof-cat-edu', name: 'Education & Training', icon: 'school' },
  { id: 'prof-cat-biz', name: 'Business / Entrepreneur', icon: 'business-center' },
  { id: 'prof-cat-arch', name: 'Architecture & Design', icon: 'design-services' },
  { id: 'prof-cat-legal', name: 'Legal & Judiciary', icon: 'gavel' },
  { id: 'prof-cat-sales', name: 'Sales & Marketing', icon: 'trending-up' },
  { id: 'prof-cat-gov', name: 'Civil Services & Government', icon: 'account-balance' },
  { id: 'prof-cat-air', name: 'Airline & Aviation', icon: 'flight' },
  { id: 'prof-cat-hr', name: 'Administration & HR', icon: 'people' },
  { id: 'prof-cat-media', name: 'Advertising, Media & Entertainment', icon: 'camera' },
  { id: 'prof-cat-home', name: 'Non Working / Homemaker', icon: 'home' },
  { id: 'prof-cat-other', name: 'Others', icon: 'more-horiz' },
];

export const PROFESSIONS_LOOKUP: ProfessionItem[] = [
  // IT & Software
  { id: 'prof-swe', categoryId: 'prof-cat-it', categoryName: 'IT & Software Engineering', name: 'Software Architect / Tech Lead' },
  { id: 'prof-sde', categoryId: 'prof-cat-it', categoryName: 'IT & Software Engineering', name: 'Software Engineer / Developer' },
  { id: 'prof-data', categoryId: 'prof-cat-it', categoryName: 'IT & Software Engineering', name: 'Data Scientist / AI Engineer' },
  { id: 'prof-qa', categoryId: 'prof-cat-it', categoryName: 'IT & Software Engineering', name: 'Product Manager / Tech Management' },
  { id: 'prof-devops', categoryId: 'prof-cat-it', categoryName: 'IT & Software Engineering', name: 'Cloud / DevOps / Cyber Security' },

  // Medical & Healthcare
  { id: 'prof-doctor', categoryId: 'prof-cat-med', categoryName: 'Medical & Healthcare', name: 'Doctor / Physician (MBBS, MD)' },
  { id: 'prof-surgeon', categoryId: 'prof-cat-med', categoryName: 'Medical & Healthcare', name: 'Surgeon / Specialist' },
  { id: 'prof-dentist', categoryId: 'prof-cat-med', categoryName: 'Medical & Healthcare', name: 'Dentist (BDS, MDS)' },
  { id: 'prof-pharmacist', categoryId: 'prof-cat-med', categoryName: 'Medical & Healthcare', name: 'Pharmacist' },
  { id: 'prof-psychologist', categoryId: 'prof-cat-med', categoryName: 'Medical & Healthcare', name: 'Psychologist / Counselor' },

  // Accounting & Finance
  { id: 'prof-ca', categoryId: 'prof-cat-fin', categoryName: 'Accounting, Banking & Finance', name: 'Chartered Accountant (CA)' },
  { id: 'prof-banker', categoryId: 'prof-cat-fin', categoryName: 'Accounting, Banking & Finance', name: 'Investment Banker / Analyst' },
  { id: 'prof-finance-mgr', categoryId: 'prof-cat-fin', categoryName: 'Accounting, Banking & Finance', name: 'Finance Manager / Auditor' },

  // Engineering
  { id: 'prof-civil', categoryId: 'prof-cat-eng', categoryName: 'Engineering (Non-IT)', name: 'Civil Engineer' },
  { id: 'prof-mech', categoryId: 'prof-cat-eng', categoryName: 'Engineering (Non-IT)', name: 'Mechanical / Electrical Engineer' },

  // Education
  { id: 'prof-prof', categoryId: 'prof-cat-edu', categoryName: 'Education & Training', name: 'Professor / College Lecturer' },
  { id: 'prof-teacher', categoryId: 'prof-cat-edu', categoryName: 'Education & Training', name: 'School Educator / Academician' },
  { id: 'prof-islamic-teacher', categoryId: 'prof-cat-edu', categoryName: 'Education & Training', name: 'Islamic Scholar / Quran Teacher' },

  // Business
  { id: 'prof-biz-owner', categoryId: 'prof-cat-biz', categoryName: 'Business / Entrepreneur', name: 'Business Owner / Industrialist' },
  { id: 'prof-startup', categoryId: 'prof-cat-biz', categoryName: 'Business / Entrepreneur', name: 'Startup Founder / Director' },

  // Architecture & Design
  { id: 'prof-architect', categoryId: 'prof-cat-arch', categoryName: 'Architecture & Design', name: 'Architect (B.Arch)' },
  { id: 'prof-designer', categoryId: 'prof-cat-arch', categoryName: 'Architecture & Design', name: 'UI/UX & Product Designer' },
  { id: 'prof-interior', categoryId: 'prof-cat-arch', categoryName: 'Architecture & Design', name: 'Interior Designer' },

  // Legal
  { id: 'prof-advocate', categoryId: 'prof-cat-legal', categoryName: 'Legal & Judiciary', name: 'Advocate / High Court Lawyer' },
  { id: 'prof-legal-advisor', categoryId: 'prof-cat-legal', categoryName: 'Legal & Judiciary', name: 'Corporate Legal Counsel' },

  // Civil Services
  { id: 'prof-ias-ips', categoryId: 'prof-cat-gov', categoryName: 'Civil Services & Government', name: 'IAS / IPS / Civil Services Officer' },
  { id: 'prof-gov-officer', categoryId: 'prof-cat-gov', categoryName: 'Civil Services & Government', name: 'PSU / Central Government Officer' },

  // Aviation
  { id: 'prof-pilot', categoryId: 'prof-cat-air', categoryName: 'Airline & Aviation', name: 'Commercial Pilot' },
  { id: 'prof-aviation-crew', categoryId: 'prof-cat-air', categoryName: 'Airline & Aviation', name: 'Aviation Ground / Operations Staff' },

  // Non-Working
  { id: 'prof-homemaker', categoryId: 'prof-cat-home', categoryName: 'Non Working / Homemaker', name: 'Homemaker' },
];

// -------------------------------------------------------------
// 6. ANNUAL INCOME RANGES
// -------------------------------------------------------------
export const INCOME_RANGES: IncomeItem[] = [
  { id: 'inc-any', minAmount: 0, label: 'Open to All' },
  { id: 'inc-under-5', minAmount: 300000, label: 'Under ₹5 Lakhs' },
  { id: 'inc-5-10', minAmount: 500000, label: '₹5 - ₹10 Lakhs' },
  { id: 'inc-10-15', minAmount: 1000000, label: '₹10 - ₹15 Lakhs' },
  { id: 'inc-15-25', minAmount: 1500000, label: '₹15 - ₹25 Lakhs' },
  { id: 'inc-25-50', minAmount: 2500000, label: '₹25 - ₹50 Lakhs' },
  { id: 'inc-50-plus', minAmount: 5000000, label: '₹50 Lakhs and above' },
  { id: 'inc-1-cr-plus', minAmount: 10000000, label: '₹1 Crore and above' },
];

// -------------------------------------------------------------
// 7. MARITAL STATUSES
// -------------------------------------------------------------
export const MARITAL_STATUSES = [
  { id: 'ms-never-married', label: 'Never Married' },
  { id: 'ms-divorced', label: 'Divorced' },
  { id: 'ms-widowed', label: 'Widowed' },
  { id: 'ms-annulled', label: 'Awaiting Divorce' },
];

// -------------------------------------------------------------
// 8. MOTHER TONGUES / LANGUAGES
// -------------------------------------------------------------
export const MOTHER_TONGUES = [
  { id: 'lang-urdu', label: 'Urdu' },
  { id: 'lang-hindi', label: 'Hindi' },
  { id: 'lang-english', label: 'English' },
  { id: 'lang-bengali', label: 'Bengali' },
  { id: 'lang-telugu', label: 'Telugu' },
  { id: 'lang-tamil', label: 'Tamil' },
  { id: 'lang-gujarati', label: 'Gujarati' },
  { id: 'lang-kannada', label: 'Kannada' },
  { id: 'lang-malayalam', label: 'Malayalam' },
  { id: 'lang-marathi', label: 'Marathi' },
  { id: 'lang-punjabi', label: 'Punjabi' },
  { id: 'lang-kashmiri', label: 'Kashmiri' },
  { id: 'lang-arabic', label: 'Arabic' },
];
