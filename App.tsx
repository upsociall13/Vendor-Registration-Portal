
import React, { useState, useEffect } from "react";
import { AppView, VendorProfile, Language } from "./types";
import RegistrationFlow from "./components/RegistrationFlow";
import VendorPortal from "./components/VendorPortal";
import AdminDashboard from "./components/AdminDashboard";
import ArchitectureView from "./components/ArchitectureView";
import { getRisks } from "./constants";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);
  const [lang, setLang] = useState<Language>("en");

  // Load profile from local storage on mount for offline/persistent access
  useEffect(() => {
    const savedProfile = localStorage.getItem('up-vikas-profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setVendorProfile(profile);
        setCurrentView(AppView.VENDOR_DASHBOARD);
      } catch (e) {
        console.error("Failed to parse saved profile", e);
        localStorage.removeItem('up-vikas-profile');
      }
    }
  }, []);

  const handleRegistrationComplete = (profile: VendorProfile) => {
    setVendorProfile(profile);
    // Auto-save on registration
    localStorage.setItem('up-vikas-profile', JSON.stringify(profile));
    setCurrentView(AppView.VENDOR_DASHBOARD);
  };

  const handleUpdateProfile = (updatedProfile: VendorProfile) => {
    setVendorProfile(updatedProfile);
    // Persist changes
    localStorage.setItem('up-vikas-profile', JSON.stringify(updatedProfile));
  };

  const t = {
    en: {
      brand: "UP-Vikas",
      subBrand: "Digital Infrastructure",
      arch: "Architecture",
      analytics: "Analytics",
      help: "Help Desk",
      register: "Register Now",
      dashboard: "Vendor Dashboard",
      heroTitle1: "Empowering",
      heroTitle2: "UP's Small Vendors",
      heroSub:
        "One registration, endless possibilities. Access credit, social security, and markets through the UP-Vikas Digital Infrastructure.",
      startReg: "Start Self-Registration",
      deptName: "Department of MSME & Export Promotion",
      cmVision: "Visionary Leadership",
      cmTitle: "Leadership Message",
      cmPost: "Empowering Small Vendors",
      cmQuote:
        '"Our goal is to create an inclusive ecosystem for every vendor across Uttar Pradesh."',
      govUP: "Government of Uttar Pradesh",
    },
    hi: {
      brand: "यूपी-विकास",
      subBrand: "डिजिटल बुनियादी ढांचा",
      arch: "आर्किटेक्चर",
      analytics: "एनालिटिक्स",
      help: "सहायता केंद्र",
      register: "अभी पंजीकरण करें",
      dashboard: "विक्रेता डैशबोर्ड",
      heroTitle1: "सशक्त बनते",
      heroTitle2: "यूपी के छोटे विक्रेता",
      heroSub: "एक पंजीकरण, असीमित संभावनाएं। यूपी-विकास डिजिटल बुनियादी ढांचे के माध्यम से औपचारिक ऋण, सामाजिक सुरक्षा और वैश्विक बाजारों तक पहुंचें।",
      startReg: "स्व-पंजीकरण शुरू करें",
      deptName: "MSME एवं निर्यात प्रोत्साहन विभाग",
      cmVision: "दूरदर्शी नेतृत्व",
      cmTitle: "नेतृत्व संदेश",
      cmPost: "छोटे विक्रेताओं को सशक्त बनाना",
      cmQuote: '"हमारा लक्ष्य उत्तर प्रदेश के प्रत्येक विक्रेता के लिए एक समावेशी पारिस्थितिकी तंत्र बनाना है।"',
      govUP: "उत्तर प्रदेश सरकार",
    }
  }[lang];

  const Navbar = () => (
    <nav className="bg-white/90 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => setCurrentView(AppView.LANDING)}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Uttar_Pradesh.svg" alt="UP Logo" className="w-10 h-10 shadow-lg shadow-orange-200 rounded-xl" />
          <div>
            <span className="font-black text-2xl tracking-tight text-slate-800 block leading-none">
              {t.brand}
            </span>
            <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">
              {t.subBrand}
            </span>
          </div>
        </div>
        
        <div className="hidden lg:flex gap-8 text-sm font-bold text-slate-600">
          <button onClick={() => setCurrentView(AppView.ARCH_DESIGN)} className="hover:text-orange-600 transition-all uppercase tracking-tight">{t.arch}</button>
          <button onClick={() => setCurrentView(AppView.ADMIN_ANALYTICS)} className="hover:text-orange-600 transition-all uppercase tracking-tight">{t.analytics}</button>
          <a href="#" className="hover:text-orange-600 transition-all uppercase tracking-tight">{t.help}</a>
        </div>

        <div className="flex gap-3 items-center">
          <button 
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"
          >
            {lang === 'en' ? 'हिन्दी' : 'EN'}
          </button>
          {vendorProfile ? (
            <button 
              onClick={() => setCurrentView(AppView.VENDOR_DASHBOARD)}
              className="bg-orange-50 text-orange-700 border border-orange-200 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-100 transition-all"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {t.dashboard}
            </button>
          ) : (
            <button 
              onClick={() => setCurrentView(AppView.REGISTRATION)}
              className="bg-orange-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all active:scale-95"
            >
              {t.register}
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <Navbar />

      <main>
        {currentView === AppView.LANDING && (
          <div className="animate-fadeIn">
            <div className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-transparent pt-16 pb-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  
                  {/* LEFT SECTION */}
                  <div className="lg:col-span-7 space-y-8">
                    <div className="inline-flex items-center gap-2 bg-white border border-orange-100 px-4 py-1.5 rounded-full shadow-sm">
                      <span className="flex h-2 w-2 rounded-full bg-orange-600"></span>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        {t.deptName}
                      </span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tight">
                      {t.heroTitle1}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        {t.heroTitle2}
                      </span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                      {t.heroSub}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        onClick={() => setCurrentView(AppView.REGISTRATION)}
                        className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group"
                      >
                        {t.startReg}
                        <span className="group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="lg:col-span-5 relative">
                    <div className="absolute -inset-4 bg-orange-200 rounded-[3rem] blur-3xl opacity-30 animate-pulse"></div>

                    <div className="relative bg-white rounded-[2.5rem] shadow-2xl border border-orange-50 overflow-hidden group">
                      <div className="aspect-[4/5] relative">
                        <img
                          src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1000"
                          alt="UP Vikas Banner"
                          className="w-full h-full object-cover object-center"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent"></div>

                        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                          <p className="text-orange-400 font-bold text-xs uppercase tracking-[0.25em] mb-3 italic">
                            {t.cmVision}
                          </p>
                          <h3 className="text-4xl font-black mb-1 leading-none tracking-tight">
                            {t.cmTitle}
                          </h3>
                          <p className="text-slate-300 font-bold text-sm uppercase tracking-widest opacity-90">
                            {t.cmPost}
                          </p>
                        </div>
                      </div>

                      <div className="p-10 bg-gradient-to-br from-orange-600 to-red-600 text-white">
                        <blockquote className="text-xl font-medium italic leading-relaxed text-orange-50">
                          {t.cmQuote}
                        </blockquote>

                        <div className="mt-6 flex items-center gap-4 border-t border-white/20 pt-6">
                          <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center font-black text-xs">
                            UP
                          </div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                            {t.govUP}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === AppView.REGISTRATION && (
          <RegistrationFlow
            lang={lang}
            onComplete={handleRegistrationComplete}
            onCancel={() => setCurrentView(AppView.LANDING)}
          />
        )}

        {currentView === AppView.VENDOR_DASHBOARD && vendorProfile && (
          <VendorPortal
            profile={vendorProfile}
            lang={lang}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentView === AppView.ADMIN_ANALYTICS && (
          <AdminDashboard lang={lang} />
        )}

        {currentView === AppView.ARCH_DESIGN && (
          <ArchitectureView lang={lang} />
        )}
      </main>
    </div>
  );
};

export default App;
