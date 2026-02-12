
import React, { useState, useRef, useEffect } from 'react';
import { VendorProfile, Language } from '../types';

interface RegistrationFlowProps {
  onComplete: (profile: VendorProfile) => void;
  onCancel: () => void;
  lang: Language;
}

const CATEGORIES = [
  { id: 'Street Food', en: 'Street Food', hi: 'रेहड़ी-पटरी भोजन', icon: '🍲' },
  { id: 'Retail', en: 'Retail/Kirana', hi: 'किराना/रिटेल', icon: '🏪' },
  { id: 'Fruits', en: 'Fruits/Veg', hi: 'फल/सब्जी', icon: '🍎' },
  { id: 'Services', en: 'Services', hi: 'सेवाएं', icon: '🛠️' },
  { id: 'Artisan', en: 'Artisan', hi: 'कारीगर', icon: '🎨' },
  { id: 'Other', en: 'Other', hi: 'अन्य', icon: '✨' }
];

const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ onComplete, onCancel, lang }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isCapturingSelfie, setIsCapturingSelfie] = useState(false);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<'aligning' | 'ready' | 'processing'>('aligning');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    aadhaar: '',
    category: 'Street Food',
    businessLocation: ''
  });

  const t = {
    en: {
      terminate: 'Terminate',
      dpiVerif: 'DPI Verification',
      runAI: 'Running AI Face-Matching Algorithm...',
      crossRef: 'Cross-referencing UIDAI Records',
      integrity: 'Data Integrity Check',
      passed: 'PASSED',
      step1Title: 'Vendor Details',
      step1Sub: 'Step 1: Primary Onboarding',
      legalName: 'Full Legal Name',
      aadhaarLabel: 'Aadhaar Card Number',
      addressLabel: 'Residential Address',
      catLabel: 'Business Category',
      locLabel: 'Business Location',
      continue: 'Confirm Identity & Continue',
      step2Title: 'Identity Check',
      step2Sub: 'Step 2: Biometric Evidence',
      faceScan: 'Digital Face Scan',
      aadhaarUpload: 'Aadhaar Card Upload',
      finish: 'Start Final DPI Verification',
      back: 'Back to Details',
      cancel: 'Cancel',
      capture: 'Capture Face Scan',
      placeholderName: 'As per Aadhaar card',
      placeholderAadhaar: '12-digit number',
      placeholderAddress: 'Complete house address',
      placeholderLoc: 'Area, District, Pincode'
    },
    hi: {
      terminate: 'समाप्त करें',
      dpiVerif: 'DPI सत्यापन',
      runAI: 'AI फेस-मैचिंग एल्गोरिदम चल रहा है...',
      crossRef: 'UIDAI रिकॉर्ड्स के साथ मिलान',
      integrity: 'डेटा अखंडता जांच',
      passed: 'सफल',
      step1Title: 'विक्रेता विवरण',
      step1Sub: 'चरण 1: प्राथमिक ऑनबोर्डिंग',
      legalName: 'पूर्ण कानूनी नाम',
      aadhaarLabel: 'आधार कार्ड संख्या',
      addressLabel: 'आवासीय पता',
      catLabel: 'व्यापार श्रेणी',
      locLabel: 'व्यापार स्थान',
      continue: 'पहचान की पुष्टि करें और आगे बढ़ें',
      step2Title: 'पहचान जांच',
      step2Sub: 'चरण 2: बायोमेट्रिक साक्ष्य',
      faceScan: 'डिजिटल फेस स्कैन',
      aadhaarUpload: 'आधार कार्ड अपलोड',
      finish: 'अंतिम DPI सत्यापन शुरू करें',
      back: 'विवरण पर वापस जाएं',
      cancel: 'रद्द करें',
      capture: 'चेहरा स्कैन कैप्चर करें',
      placeholderName: 'आधार कार्ड के अनुसार',
      placeholderAadhaar: '12-अंकों की संख्या',
      placeholderAddress: 'पूरा घर का पता',
      placeholderLoc: 'क्षेत्र, जिला, पिनकोड'
    }
  }[lang];

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    if (isCapturingSelfie) {
      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setTimeout(() => setScanStatus('ready'), 2000);
          }
        } catch (err) {
          alert("Camera access is required.");
          setIsCapturingSelfie(false);
        }
      };
      startCamera();
    }
    return () => stream?.getTracks().forEach(track => track.stop());
  }, [isCapturingSelfie]);

  const handleStartStep2 = () => {
    setStep(2);
    setIsCapturingSelfie(true);
  };

  const takeSelfie = () => {
    setScanStatus('processing');
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setTimeout(() => {
          setSelfie(dataUrl);
          setIsCapturingSelfie(false);
          setScanStatus('aligning');
        }, 1500);
      }
    }
  };

  const handleAadhaarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAadhaarPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      const newProfile: VendorProfile = {
        id: `UPV-${Math.floor(Math.random() * 900000 + 100000)}`,
        name: formData.name || 'Vendor Name',
        category: formData.category,
        aadhaarLastFour: formData.aadhaar.slice(-4),
        phone: '9988776655',
        location: {
          lat: 26.8467,
          lng: 80.9462,
          address: formData.businessLocation
        },
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=UPV-AUTH-${formData.aadhaar.slice(-4)}`,
        upiId: `upv.${formData.aadhaar.slice(-4)}@upi`,
        registrationDate: new Date().toLocaleDateString(),
        creditScore: 710,
        eligibleSchemes: ['PM SVANidhi', 'e-Shram', 'UPMSY'],
        profilePicture: selfie || undefined
      };
      onComplete(newProfile);
    }, 4000);
  };

  return (
    <div className="max-w-xl mx-auto min-h-[90vh] flex flex-col justify-center animate-fadeIn px-4 py-12">
      <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(249,115,22,0.12)] p-10 border border-orange-50 relative overflow-hidden">
        <div className="flex justify-between items-center mb-10">
          <div className="flex gap-3">
            {[1, 2].map(i => (
              <div key={i} className={`h-2 w-16 rounded-full transition-all duration-700 ${step >= i ? 'bg-orange-500 shadow-md shadow-orange-200' : 'bg-slate-100'}`} />
            ))}
          </div>
          <button onClick={onCancel} className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] hover:text-red-500">{t.terminate}</button>
        </div>

        {loading ? (
          <div className="text-center py-16 space-y-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 border-8 border-orange-50 rounded-full"></div>
              <div className="absolute top-0 left-0 w-24 h-24 border-8 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-3xl">🛡️</div>
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-slate-900">{t.dpiVerif}</h3>
              <p className="text-slate-500 font-bold text-sm animate-pulse">{t.runAI}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t.crossRef}</p>
            </div>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{t.step1Title}</h2>
                  <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">{t.step1Sub}</p>
                </div>
                
                <div className="grid gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.legalName}</label>
                    <input type="text" placeholder={t.placeholderName} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none transition-all focus:border-orange-200 focus:bg-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.aadhaarLabel}</label>
                    <input type="number" placeholder={t.placeholderAadhaar} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none transition-all focus:border-orange-200 focus:bg-white" value={formData.aadhaar} onChange={(e) => setFormData({...formData, aadhaar: e.target.value})} />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{t.catLabel}</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`flex items-center p-4 rounded-2xl border-2 transition-all gap-4 ${
                            formData.category === cat.id
                              ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md ring-1 ring-orange-200'
                              : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'
                          }`}
                        >
                          <div className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl ${formData.category === cat.id ? 'bg-white shadow-sm' : 'bg-slate-200/50 opacity-70'}`}>
                            {cat.icon}
                          </div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-left leading-none">
                            {lang === 'hi' ? cat.hi : cat.en}
                          </span>
                          {formData.category === cat.id && (
                            <div className="ml-auto w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{t.addressLabel}</label>
                    <textarea placeholder={t.placeholderAddress} className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] outline-none transition-all focus:border-orange-200 focus:bg-white h-24 resize-none" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                  </div>
                </div>

                <button onClick={handleStartStep2} disabled={!formData.name || !formData.aadhaar || !formData.address} className="w-full bg-slate-900 text-white py-6 rounded-[1.75rem] font-black text-lg disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-slate-200">
                  {t.continue} →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-10">
                <div className="text-center">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{t.step2Title}</h2>
                  <p className="text-slate-400 font-bold mt-2 text-sm uppercase tracking-widest">{t.step2Sub}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.faceScan}</p>
                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-orange-200 hover:bg-slate-50" onClick={() => setIsCapturingSelfie(true)}>
                      {selfie ? <img src={selfie} alt="Selfie" className="w-full h-full object-cover" /> : <div className="text-3xl">👤</div>}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{t.aadhaarUpload}</p>
                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center group hover:border-orange-200 hover:bg-slate-50 transition-all">
                      <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleAadhaarUpload} />
                      {aadhaarPhoto ? <img src={aadhaarPhoto} alt="Aadhaar" className="w-full h-full object-cover" /> : <span className="text-5xl opacity-40 group-hover:opacity-100 transition-opacity">🆔</span>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-6 rounded-[1.75rem] font-black text-lg">
                    {t.back}
                  </button>
                  <button onClick={handleFinish} disabled={!selfie || !aadhaarPhoto} className="flex-[2] bg-orange-600 text-white py-6 rounded-[1.75rem] font-black text-lg disabled:opacity-50 transition-all active:scale-95 shadow-xl shadow-orange-200">
                    {t.finish} 🛡️
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {isCapturingSelfie && (
        <div className="fixed inset-0 bg-slate-950/98 z-[100] flex flex-col items-center justify-center p-6 backdrop-blur-xl">
          <div className="relative w-full aspect-square max-w-[340px] rounded-[4rem] overflow-hidden border-2 border-white/10 shadow-[0_0_50px_rgba(249,115,22,0.3)]">
            <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${scanStatus === 'processing' ? 'blur-2xl' : ''}`} />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 border-[30px] border-slate-950/40 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-2 border-white/20 rounded-full border-dashed animate-pulse"></div>
          </div>
          <div className="mt-14 flex gap-4 w-full max-w-[340px]">
            <button onClick={() => setIsCapturingSelfie(false)} className="flex-1 bg-white/5 text-white py-5 rounded-[2rem] font-bold text-xs hover:bg-white/10 transition-all uppercase tracking-widest">{t.cancel}</button>
            <button onClick={takeSelfie} disabled={scanStatus !== 'ready'} className="flex-[2] bg-orange-600 text-white py-5 rounded-[2rem] font-black text-xs disabled:opacity-30 transition-all active:scale-95 uppercase tracking-widest shadow-lg shadow-orange-900/20">{t.capture}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationFlow;
