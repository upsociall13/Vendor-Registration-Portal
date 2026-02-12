
import { Scheme, RiskMitigation, Language } from './types';

export const getSchemes = (lang: Language): Scheme[] => [
  {
    id: 'PMSV',
    name: lang === 'hi' ? 'पीएम स्वनिधि' : 'PM SVANidhi',
    description: lang === 'hi' ? 'रेहड़ी-पटरी वालों के लिए कार्यशील पूंजी ऋण।' : 'Working capital loan for street vendors.',
    benefits: lang === 'hi' ? '₹10,000 - ₹50,000 कम ब्याज पर ऋण।' : '₹10,000 - ₹50,000 credit at low interest.',
    eligibility: lang === 'hi' ? 'शहरी क्षेत्रों के रेहड़ी-पटरी वाले जिनके पास पहचान पत्र (CoV) है।' : 'Urban street vendors in possession of Certificate of Vending (CoV).',
    status: 'ACTIVE'
  },
  {
    id: 'ESHR',
    name: lang === 'hi' ? 'ई-श्रम सुरक्षा' : 'e-Shram Suraksha',
    description: lang === 'hi' ? 'दुर्घटना बीमा और सामाजिक सुरक्षा।' : 'Accidental insurance and social security.',
    benefits: lang === 'hi' ? '₹2 लाख का दुर्घटना मृत्यु कवर।' : '2 Lakh accidental death cover.',
    eligibility: lang === 'hi' ? 'असंगठित क्षेत्र के श्रमिक जिनकी आयु 16-59 वर्ष के बीच है।' : 'Unorganized sector workers aged between 16-59 years.',
    status: 'ACTIVE'
  },
  {
    id: 'UPMSY',
    name: lang === 'hi' ? 'यूपी मुख्यमंत्री स्वरोजगार योजना' : 'UP Mukhyamantri Swarojgar Yojana',
    description: lang === 'hi' ? 'सूक्ष्म उद्यमों के लिए राज्य सहायता।' : 'State support for micro-enterprises.',
    benefits: lang === 'hi' ? '₹25 लाख तक की लागत पर 25% सब्सिडी।' : '25% subsidy on project costs up to ₹25 Lakh.',
    eligibility: lang === 'hi' ? 'उत्तर प्रदेश के मूल निवासी, न्यूनतम 10वीं पास और 18+ वर्ष।' : 'Permanent resident of UP, min 10th pass, and 18+ years old.',
    status: 'NOT_APPLIED'
  },
  {
    id: 'PMSBY',
    name: lang === 'hi' ? 'पीएम सुरक्षा बीमा योजना' : 'PM Suraksha Bima Yojana',
    description: lang === 'hi' ? 'कम लागत वाला व्यक्तिगत दुर्घटना बीमा।' : 'Low-cost personal accident insurance.',
    benefits: lang === 'hi' ? '₹2 लाख का कवर केवल ₹20 वार्षिक प्रीमियम पर।' : '₹2 Lakh cover at just ₹20 annual premium.',
    eligibility: lang === 'hi' ? '18-70 वर्ष की आयु के सभी बचत बैंक खाताधारक।' : 'All savings bank account holders aged 18-70 years.',
    status: 'PENDING'
  }
];

export const getRisks = (lang: Language): RiskMitigation[] => [
  {
    risk: lang === 'hi' ? "फर्जी विक्रेता (आधार दोहराव)" : "Ghost Vendors (Aadhaar duplication)",
    mitigation: lang === 'hi' ? "बायोमेट्रिक प्रमाणीकरण + फेस-ऑथ।" : "Biometric auth + Periodic face-auth via AI mobile app."
  },
  {
    risk: lang === 'hi' ? "क्रेडिट डिफॉल्ट (NPA)" : "Credit Default (NPAs)",
    mitigation: lang === 'hi' ? "UPI ऑटो-डेबिट के माध्यम से दैनिक भुगतान।" : "Daily micro-repayments via UPI auto-debit tied to sales."
  },
  {
    risk: lang === 'hi' ? "डिजिटल साक्षरता की कमी" : "Digital Literacy Gap",
    mitigation: lang === 'hi' ? "राशन की दुकानों और CSC केंद्रों के माध्यम से सहायता।" : "Assisted registration through Ration shops & Common Service Centres (CSCs)."
  },
  {
    risk: lang === 'hi' ? "डेटा गोपनीयता की चिंता" : "Data Privacy Concerns",
    mitigation: lang === 'hi' ? "DEPA (डेटा सशक्तिकरण) अनुपालन।" : "Strict DEPA (Data Empowerment and Protection Architecture) compliance."
  }
];

export const SCHEMES = getSchemes('en');
export const RISKS = getRisks('en');
