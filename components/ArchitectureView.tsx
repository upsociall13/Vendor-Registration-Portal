
import React from 'react';
import { Language } from '../types';

interface ArchitectureViewProps {
  lang?: Language;
}

const ArchitectureView: React.FC<ArchitectureViewProps> = ({ lang = 'en' }) => {
  const t = {
    en: {
      title: 'System Architecture & DPI Strategy',
      sub: 'How UP-Vikas transforms the informal economy through India Stack.',
      highLevel: 'High-Level Flow',
      idTitle: '1. Identity & Consent',
      idDetail1: 'Aadhaar Vault: No storing of full Aadhaar numbers; using tokens.',
      idDetail2: 'Consent Manager: Vendor explicitly grants access to transaction data for loans.',
      idDetail3: 'QR Identity: A revocable, verifiable digital certificate.',
      creditTitle: '2. Credit & Banking',
      creditDetail1: 'Cash-flow Scoring: Unlike CIBIL, this looks at daily UPI velocity.',
      creditDetail2: 'Flash Credits: Sachet-sized loans (₹500 for daily stock) with same-day repayment.',
      creditDetail3: 'Auto-Sweep: Integration with Jan Dhan accounts for low-cost ops.',
      whyTitle: 'Why this succeeds over past schemes?',
      why1Title: 'Single Source of Truth',
      why1Desc: 'One registration for PM-SVANidhi, e-Shram, and Ration benefits. No redundant data entry.',
      why2Title: 'Data as Collateral',
      why2Desc: 'Turning digital payment history into a credit-worthy asset for street vendors.',
      why3Title: 'Interoperability',
      why3Desc: 'The Vendor ID works across ONDC for sales and Municipality for permits.'
    },
    hi: {
      title: 'सिस्टम आर्किटेक्चर और DPI रणनीति',
      sub: 'कैसे यूपी-विकास इंडिया स्टैक के माध्यम से अनौपचारिक अर्थव्यवस्था को बदलता है।',
      highLevel: 'उच्च-स्तरीय प्रवाह (Flow)',
      idTitle: '1. पहचान और सहमति',
      idDetail1: 'आधार वॉल्ट: पूरे आधार नंबर को स्टोर नहीं करना; टोकन का उपयोग करना।',
      idDetail2: 'सहमति प्रबंधक: विक्रेता स्पष्ट रूप से ऋण के लिए लेनदेन डेटा तक पहुंच प्रदान करता है।',
      idDetail3: 'क्यूआर पहचान: एक प्रतिसंहरणीय, सत्यापन योग्य डिजिटल प्रमाण पत्र।',
      creditTitle: '2. क्रेडिट और बैंकिंग',
      creditDetail1: 'कैश-फ्लो स्कोरिंग: सिबिल के विपरीत, यह दैनिक यूपीआई वेग को देखता है।',
      creditDetail2: 'फ्लैश क्रेडिट: उसी दिन चुकौती के साथ छोटे आकार के ऋण (दैनिक स्टॉक के लिए ₹500)।',
      creditDetail3: 'ऑटो-स्वीप: कम लागत वाले संचालन के लिए जन धन खातों के साथ एकीकरण।',
      whyTitle: 'यह पिछली योजनाओं की तुलना में क्यों सफल है?',
      why1Title: 'सत्य का एकल स्रोत',
      why1Desc: 'पीएम-स्वनिधि, ई-श्रम और राशन लाभों के लिए एक ही पंजीकरण। बार-बार डेटा भरने की आवश्यकता नहीं।',
      why2Title: 'डेटा को संपार्श्विक (Collateral) के रूप में',
      why2Desc: 'डिजिटल भुगतान इतिहास को रेहड़ी-पटरी वालों के लिए ऋण-योग्य संपत्ति में बदलना।',
      why3Title: 'इंटरऑपरेबिलिटी',
      why3Desc: 'विक्रेता आईडी बिक्री के लिए ONDC और परमिट के लिए नगर पालिका में काम करती है।'
    }
  }[lang];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 animate-fadeIn pb-24">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">{t.title}</h1>
        <p className="text-slate-500 font-medium">{t.sub}</p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-orange-600 uppercase tracking-widest text-xs">{t.highLevel}</h2>
        <div className="bg-slate-950 p-6 rounded-lg font-mono text-xs leading-relaxed whitespace-pre overflow-x-auto border border-slate-800 text-orange-400">
{`[Vendor Interface] <---(1)---> [UP-Vikas DPI Layer] <---(2)---> [India Stack]
       |                            |                           |
       |                            |                           |--> [Aadhaar/UIDAI] (Identity)
       |                            |                           |--> [UPI/NPCI] (Payments)
       |                            |                           |--> [AA/Account Aggregator] (Credit)
       |                            |                           |--> [ONDC] (Market Access)
       |                            |
       |----(3)-----> [Banks/Fintechs] (Cash-flow Lending)
       |----(4)-----> [Govt Entities] (DBT/Schemes/Social Security)
       |----(5)-----> [Municipalities] (Licensing/Zone Management)`}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 group hover:border-orange-200 transition-all">
          <h3 className="font-black text-slate-900 text-lg mb-4">{t.idTitle}</h3>
          <ul className="space-y-4 text-slate-600 font-medium text-sm">
            <li className="flex gap-3 items-start">
              <span className="text-orange-500 mt-1">▹</span>
              {t.idDetail1}
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-orange-500 mt-1">▹</span>
              {t.idDetail2}
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-orange-500 mt-1">▹</span>
              {t.idDetail3}
            </li>
          </ul>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 group hover:border-blue-200 transition-all">
          <h3 className="font-black text-slate-900 text-lg mb-4">{t.creditTitle}</h3>
          <ul className="space-y-4 text-slate-600 font-medium text-sm">
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">▹</span>
              {t.creditDetail1}
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">▹</span>
              {t.creditDetail2}
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-blue-500 mt-1">▹</span>
              {t.creditDetail3}
            </li>
          </ul>
        </div>
      </div>

      <section className="bg-orange-600 p-10 rounded-[3rem] text-white shadow-2xl shadow-orange-200">
        <h2 className="text-2xl font-black mb-10 tracking-tight">{t.whyTitle}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">01</div>
            <h4 className="font-black text-lg">{t.why1Title}</h4>
            <p className="text-sm text-orange-50 leading-relaxed font-medium">{t.why1Desc}</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">02</div>
            <h4 className="font-black text-lg">{t.why2Title}</h4>
            <p className="text-sm text-orange-50 leading-relaxed font-medium">{t.why2Desc}</p>
          </div>
          <div className="space-y-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">03</div>
            <h4 className="font-black text-lg">{t.why3Title}</h4>
            <p className="text-sm text-orange-50 leading-relaxed font-medium">{t.why3Desc}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArchitectureView;
