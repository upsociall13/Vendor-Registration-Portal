
import React, { useState, useRef, useEffect } from 'react';
import { VendorProfile, Language, Scheme, Notification } from '../types';
import { getSchemes } from '../constants';

interface VendorPortalProps { 
  profile: VendorProfile; 
  lang: Language;
  onUpdateProfile?: (updatedProfile: VendorProfile) => void;
}

const PLACEHOLDER_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aiden",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo"
];

const VendorIDCard = ({ profile, profilePic, lang, t, id }: { 
  profile: VendorProfile, 
  profilePic?: string, 
  lang: Language, 
  t: any,
  id: string 
}) => {
  // Generate a functional verification URL for the QR code
  const verificationData = `https://up-vikas.gov.in/verify?id=${profile.id}&name=${encodeURIComponent(profile.name)}&aadhaar=${profile.aadhaarLastFour}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(verificationData)}&color=0f172a&bgcolor=ffffff&margin=1`;

  return (
    <div id={id} className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 aspect-[1.58/1] w-full max-w-[600px] mx-auto flex flex-col relative tracking-tight">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 md:p-5 flex items-center justify-between text-white border-b-4 border-orange-400 relative z-10">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <div className="w-8 h-8 md:w-14 md:h-14 bg-white rounded-lg md:rounded-2xl flex items-center justify-center shadow-xl overflow-hidden flex-shrink-0 border-2 border-white/20">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/b/b5/Seal_of_Uttar_Pradesh.svg" 
              alt="UP Government" 
              className="w-[85%] h-[85%] object-contain"
            />
          </div>
          <div className="min-w-0 flex flex-col justify-center">
            <p className="text-[7px] md:text-[11px] font-black uppercase tracking-[0.05em] leading-tight whitespace-nowrap">
              {lang === 'hi' ? 'उत्तर प्रदेश सरकार' : 'GOVERNMENT OF UTTAR PRADESH'}
            </p>
            <p className="text-[6px] md:text-[9px] font-bold opacity-90 uppercase leading-tight mt-0.5 truncate">
              {t.deptMsme}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0 pl-2">
          <p className="text-[12px] md:text-2xl font-black italic tracking-tighter leading-none">UP-Vikas</p>
          <p className="text-[5px] md:text-[9px] font-bold opacity-75 uppercase tracking-widest mt-0.5 whitespace-nowrap">Identity Portal</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-3 md:p-8 grid grid-cols-[auto_1fr_auto] gap-3 md:gap-8 relative overflow-hidden items-start guilloche-bg">
        {/* Profile Photo with Verification Stamp */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-28 md:w-36 md:h-44 bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner flex-shrink-0 relative">
             {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl opacity-10">👤</div>
             )}
             <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none" />
          </div>
          
          {/* Official Verification Stamp */}
          <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 w-10 h-10 md:w-20 md:h-20 bg-white rounded-full shadow-lg border border-blue-100 flex items-center justify-center p-0.5 z-20 overflow-hidden ring-4 ring-white">
            <div className="w-full h-full rounded-full border-2 border-blue-600 border-dashed flex flex-col items-center justify-center text-[3px] md:text-[6px] font-black text-blue-700 uppercase leading-none text-center">
              <svg className="w-2 h-2 md:w-5 md:h-5 text-blue-600 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Verified By</span>
              <span className="md:mt-0.5">UIDAI & NPCI</span>
            </div>
          </div>
        </div>

        {/* Details - Central Column */}
        <div className="flex flex-col h-full justify-between min-w-0 py-1">
          <div className="space-y-1 md:space-y-2">
            <p className="text-[7px] md:text-[11px] font-black text-orange-600 uppercase tracking-widest leading-none">
              {lang === 'hi' ? 'नाम / Name' : 'NAME'}
            </p>
            <h4 className="text-sm md:text-3xl font-black text-slate-900 leading-[1] uppercase tracking-tighter break-words overflow-hidden">
              {profile.name}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-6 mt-2 md:mt-4">
            <div className="space-y-0.5 md:space-y-1">
              <p className="text-[6px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                {lang === 'hi' ? 'पंजीकरण तिथि' : 'REG. DATE'}
              </p>
              <p className="text-[8px] md:text-sm font-black text-slate-700 whitespace-nowrap">{profile.registrationDate}</p>
            </div>
            <div className="space-y-0.5 md:space-y-1">
              <p className="text-[6px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                {lang === 'hi' ? 'आधार (अंतिम ४)' : 'AADHAAR (L4)'}
              </p>
              <p className="text-[8px] md:text-sm font-black text-slate-700">XXXX XXXX {profile.aadhaarLastFour}</p>
            </div>
          </div>

          <div className="pt-2 md:pt-6 space-y-0.5 md:space-y-1 border-t border-slate-100">
            <p className="text-[6px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">VENDOR ID</p>
            <p className="text-[10px] md:text-2xl font-black text-slate-900 tracking-[0.1em] md:tracking-[0.15em] leading-none">
               {profile.id.replace('UPV-', '').match(/.{1,3}/g)?.join(' ')}
            </p>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-2 md:gap-4 flex-shrink-0 w-16 md:w-32 py-1">
          <div className="p-1 md:p-2 bg-white rounded-lg md:rounded-2xl shadow-lg border border-slate-100 w-full aspect-square flex items-center justify-center">
            <img 
              src={qrCodeUrl} 
              alt="Verification QR" 
              className="w-full h-full object-contain mix-blend-multiply" 
              crossOrigin="anonymous"
            />
          </div>
          <div className="flex items-center gap-1 md:gap-1.5 bg-green-100 px-1.5 md:px-3 py-0.5 md:py-1 rounded-full border border-green-200 shadow-sm">
            <div className="w-1 h-1 md:w-2 md:h-2 bg-green-600 rounded-full animate-pulse" />
            <span className="text-[5px] md:text-[9px] font-black uppercase text-green-700 tracking-widest">SECURE</span>
          </div>
        </div>

        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.02] select-none rotate-[-15deg] z-0">
           <span className="text-[6rem] md:text-[14rem] font-black uppercase tracking-tighter">UP-VIKAS</span>
        </div>
      </div>

      {/* Verified By / Authorities Section */}
      <div className="px-3 md:px-8 pb-3 md:pb-5 flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-2 md:gap-4">
          <p className="text-[5px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">VERIFIED BY</p>
          <div className="flex items-center gap-2 md:gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <img src="https://uidai.gov.in/images/logo/aadhaar_english_logo.svg" alt="UIDAI" className="h-3 md:h-5 object-contain" />
            <img src="https://www.npci.org.in/images/npci/NPCI_Logo.svg" alt="NPCI" className="h-3 md:h-5 object-contain" />
            <div className="text-[6px] md:text-[9px] font-black text-blue-600 border border-blue-200 px-1 md:px-1.5 rounded bg-blue-50">ONDC</div>
          </div>
        </div>
        <div className="flex gap-1.5">
           <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-orange-400" />
           <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-white border border-slate-200" />
           <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-green-400" />
        </div>
      </div>
    </div>
  );
};

const VendorPortal: React.FC<VendorPortalProps> = ({ profile, lang, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'id' | 'credit' | 'schemes'>('id');
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'PAYMENT' | 'VENDOR' | null>(null);
  
  // Set default profile picture based on name or ID if it doesn't exist
  const defaultAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.id || profile.name}`;
  const [profilePic, setProfilePic] = useState<string | undefined>(profile.profilePicture || defaultAvatar);
  
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showIdCardModal, setShowIdCardModal] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'IDLE' | 'SAVING' | 'SUCCESS'>('IDLE');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isOfflineReady, setIsOfflineReady] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: lang === 'hi' ? 'नई योजना पात्रता' : 'New Scheme Eligibility',
      message: lang === 'hi' ? 'पीएम स्वनिधि 2.0 अब आपके लिए उपलब्ध है!' : 'PM SVANidhi 2.0 is now available for you!',
      type: 'SCHEME',
      date: '2h ago',
      isRead: false
    },
    {
      id: '2',
      title: lang === 'hi' ? 'ऋण स्वीकृत' : 'Loan Approved',
      message: lang === 'hi' ? 'आपका ₹15,000 सूक्ष्म ऋण वितरण के लिए तैयार है। ' : 'Your ₹15,000 micro-loan is ready for disbursal.',
      type: 'LOAN',
      date: '5h ago',
      isRead: false
    }
  ]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoCanvasRef = useRef<HTMLCanvasElement>(null);

  // Check if profile is already in local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('up-vikas-profile');
    if (saved) setIsOfflineReady(true);
  }, []);

  const t = {
    en: {
      idTab: 'Identity',
      creditTab: 'Banking',
      schemesTab: 'Schemes',
      profMgmt: 'Profile Management',
      takePhoto: 'Take Photo',
      uploadImg: 'Upload Image',
      selectAvatar: 'Select Placeholder',
      trustCenter: 'Trust Center',
      verifPayment: 'Verify Payment',
      verifID: 'Verify Peer Identity',
      scanPeer: 'Scan Peer ID QR',
      merchantCode: 'Merchant Access Code',
      downloadPdf: 'View ID Card',
      downloadIdCard: 'Download PDF',
      saveOffline: 'Save for Offline',
      offlineSuccess: 'Identity Saved Locally',
      offlineReady: 'Offline Ready',
      printTag: 'Print Tag',
      verifNode: 'Verified Node',
      dpiScore: 'DPI Credit Score',
      loans: 'Instant Micro-Loans',
      apply: 'Apply with 1-Tap',
      entitlements: 'Automatic Entitlements',
      activate: 'Activate Social Cover',
      successMsg: 'Verification Success',
      errorMsg: 'Verification Failed',
      verified: 'Verified',
      capture: 'Capture Photo',
      close: 'Close',
      govUp: 'Government of Uttar Pradesh',
      deptMsme: 'Dept. of MSME & Export Promotion',
      vendorIdLabel: 'Vendor ID',
      dobLabel: 'Reg. Date',
      genderLabel: 'Category',
      footerText: 'UP-Vikas: Empowering Informal Economy',
      printCard: 'Print / Save PDF',
      verifiedBy: 'Verified By',
      eligibilityLabel: 'Eligibility Criteria',
      benefitsLabel: 'Core Benefit',
      statusActive: 'Active',
      statusPending: 'Pending',
      statusNotApplied: 'Not Applied',
      applyNow: 'Apply Now',
      notifications: 'Notifications',
      noNotif: 'No new notifications',
      markRead: 'Mark all as read'
    },
    hi: {
      idTab: 'पहचान',
      creditTab: 'बैंकिंग',
      schemesTab: 'योजनाएं',
      profMgmt: 'प्रोफ़ाइल प्रबंधन',
      takePhoto: 'फोटो लें',
      uploadImg: 'छवि अपलोड करें',
      selectAvatar: 'अवतार चुनें',
      trustCenter: 'ट्रस्ट सेंटर',
      verifPayment: 'भुगतान सत्यापित करें',
      verifID: 'पीयर पहचान सत्यापित करें',
      scanPeer: 'पीयर ID QR स्कैन करें',
      merchantCode: 'विक्रेता एक्सेस कोड',
      downloadPdf: 'ID कार्ड देखें',
      downloadIdCard: 'ID कार्ड डाउनलोड करें',
      saveOffline: 'ऑफलाइन के लिए सहेजें',
      offlineSuccess: 'पहचान स्थानीय रूप से सहेजी गई',
      offlineReady: 'ऑफलाइन तैयार',
      printTag: 'ट्रस्ट टैग',
      verifNode: 'सत्यापित नोड',
      dpiScore: 'DPI क्रेडिट स्कोर',
      loans: 'त्वरित सूक्ष्म ऋण',
      apply: '1-टैप से आवेदन करें',
      entitlements: 'स्वचालित पात्रता',
      activate: 'सामाजिक कवर सक्रिय करें',
      successMsg: 'सत्यापन सफल',
      errorMsg: 'सत्यापन विफल',
      verified: 'सत्यापित',
      capture: 'फोटो खींचें',
      close: 'बंद करें',
      govUp: 'उत्तर प्रदेश सरकार',
      deptMsme: 'MSME एवं निर्यात प्रोत्साहन विभाग',
      vendorIdLabel: 'विक्रेता आईडी',
      dobLabel: 'पंजीकरण तिथि',
      genderLabel: 'श्रेणी',
      footerText: 'यूपी-विकास: अनौपचारिक अर्थव्यवस्था को सशक्त बनाना',
      printCard: 'प्रिंट / PDF सेव करें',
      verifiedBy: 'द्वारा सत्यापित',
      eligibilityLabel: 'पात्रता मानदंड',
      benefitsLabel: 'मुख्य लाभ',
      statusActive: 'सक्रिय',
      statusPending: 'लंबित',
      statusNotApplied: 'आवेदन नहीं किया',
      applyNow: 'अभी आवेदन करें',
      notifications: 'सूचनाएं',
      noNotif: 'कोई नई सूचना नहीं',
      markRead: 'सभी को पढ़ा हुआ मानें'
    }
  }[lang];

  const schemes = getSchemes(lang);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const startScan = (type: 'PAYMENT' | 'VENDOR') => {
    setScanType(type);
    setIsScanning(true);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    if ((isScanning && scanType) || isTakingPhoto) {
      const startCamera = async () => {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: isTakingPhoto ? 'user' : 'environment',
              width: { ideal: 1024 },
              height: { ideal: 1024 }
            } 
          });
          if (videoRef.current) videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("Camera error:", err);
          setIsScanning(false);
          setIsTakingPhoto(false);
        }
      };
      startCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isScanning, scanType, isTakingPhoto]);

  useEffect(() => {
    if (profilePic !== profile.profilePicture && onUpdateProfile) {
      onUpdateProfile({ ...profile, profilePicture: profilePic });
    }
  }, [profilePic, profile, onUpdateProfile]);

  const capturePhoto = () => {
    setFlash(true);
    setIsCapturing(true);
    
    if (videoRef.current && photoCanvasRef.current) {
      const video = videoRef.current;
      const canvas = photoCanvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isTakingPhoto) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        
        setTimeout(() => {
          setProfilePic(dataUrl);
          setIsTakingPhoto(false);
          setIsCapturing(false);
          setFlash(false);
        }, 300);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveOffline = () => {
    setSaveStatus('SAVING');
    try {
      const profileToSave = {
        ...profile,
        profilePicture: profilePic
      };
      localStorage.setItem('up-vikas-profile', JSON.stringify(profileToSave));
      
      setTimeout(() => {
        setSaveStatus('SUCCESS');
        setIsOfflineReady(true);
        setTimeout(() => setSaveStatus('IDLE'), 3000);
      }, 800);
    } catch (e) {
      console.error("Failed to save profile locally", e);
      setSaveStatus('IDLE');
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    // Prefer the hidden, standard-sized card for better PDF aspect ratio and resolution
    const element = document.getElementById('direct-download-card') || document.getElementById('printable-id-card');
    
    if (element && (window as any).html2pdf) {
      const opt = {
        margin: [0.5, 0.5],
        filename: `${profile.name}_UPVikas_ID.pdf`,
        image: { type: 'jpeg', quality: 1.0 },
        html2canvas: { 
          scale: 4, 
          useCORS: true, 
          letterRendering: true, 
          logging: false,
          allowTaint: true
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
      };
      try {
        await (window as any).html2pdf().from(element).set(opt).save();
      } catch (error) {
        console.error("PDF generation failed", error);
        alert("Download failed. Please try again.");
      }
    } else {
      console.error("PDF generator or target element not found");
    }
    setIsDownloading(false);
  };

  const NotificationDrawer = () => (
    <div className="fixed inset-0 z-[110] animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNotifications(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">{t.notifications}</h3>
            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">{unreadCount} {lang === 'hi' ? 'नई' : 'New'}</p>
          </div>
          <button onClick={() => setShowNotifications(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-30 text-center space-y-4">
              <div className="text-6xl">🔔</div>
              <p className="font-bold text-slate-500">{t.noNotif}</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className={`p-5 rounded-[2rem] border transition-all ${notif.isRead ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-orange-100 shadow-md shadow-orange-50 ring-1 ring-orange-50'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                    notif.type === 'SCHEME' ? 'bg-orange-100 text-orange-600' :
                    notif.type === 'LOAN' ? 'bg-green-100 text-green-600' :
                    notif.type === 'PAYMENT' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {notif.type === 'SCHEME' ? '🎁' : notif.type === 'LOAN' ? '⚡' : notif.type === 'PAYMENT' ? '💳' : '🔔'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-black text-slate-900 text-sm leading-tight">{notif.title}</h4>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter whitespace-nowrap">{notif.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50">
          <button onClick={markAllAsRead} className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200">
            {t.markRead}
          </button>
        </div>
      </div>
    </div>
  );

  const ScannerOverlay = () => (
    <div className="fixed inset-0 bg-slate-950 z-[100] flex flex-col items-center justify-center p-6 animate-fadeIn transition-colors duration-300">
      <div className={`relative w-full aspect-square max-w-[340px] overflow-hidden rounded-[4rem] border-4 ${isCapturing ? 'border-white' : scanType === 'VENDOR' ? 'border-emerald-500' : 'border-slate-800'} shadow-[0_0_150px_rgba(0,0,0,1)] bg-slate-900 transition-all duration-100`}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          className={`w-full h-full object-cover transition-all duration-300 ${isCapturing ? 'brightness-150 scale-105' : 'brightness-100'} ${isTakingPhoto ? 'scale-x-[-1]' : ''}`} 
        />
        
        <div className="absolute inset-0 border-[40px] border-slate-950/40 pointer-events-none" />
        
        {isTakingPhoto && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[85%] h-[85%] border-2 border-white/20 rounded-full border-dashed animate-pulse"></div>
          </div>
        )}

        {isScanning && !isTakingPhoto && (
          <div className={`absolute top-0 left-0 right-0 h-1 animate-scanLine z-20 ${scanType === 'VENDOR' ? 'text-emerald-500' : 'text-orange-500'}`}>
            {/* Primary Sharp Laser Line */}
            <div className="absolute inset-0 bg-current shadow-[0_0_15px_currentColor]" />
            {/* Pulsing Subtle Glow Layer */}
            <div className="absolute inset-0 bg-current opacity-60 blur-2xl animate-scanPulse scale-y-[8] origin-center" />
          </div>
        )}

        {flash && (
          <div className="absolute inset-0 bg-white z-50 animate-pulse" />
        )}

        <div className="absolute bottom-10 left-0 right-0 text-center z-30">
          <p className="text-[10px] font-black text-white uppercase tracking-[0.2em] bg-black/40 inline-block px-4 py-1.5 rounded-full backdrop-blur-md">
            {scanType === 'VENDOR' ? (lang === 'hi' ? 'पीयर ID सत्यापन' : 'PEER ID VERIFICATION') : (lang === 'hi' ? 'भुगतान सत्यापन' : 'PAYMENT VERIFICATION')}
          </p>
        </div>
      </div>

      <div className="mt-12 flex gap-4 w-full max-w-[340px]">
        <button 
          onClick={() => { setIsScanning(false); setIsTakingPhoto(false); setScanType(null); }} 
          className="flex-1 bg-white/10 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] active:scale-95 transition-transform"
        >
          {t.close}
        </button>
        {isTakingPhoto && (
          <button 
            onClick={capturePhoto}
            disabled={isCapturing}
            className="flex-[2] bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-900/40 active:scale-95 transition-all disabled:opacity-50"
          >
            {isCapturing ? '...' : t.capture}
          </button>
        )}
      </div>
      <canvas ref={photoCanvasRef} className="hidden" />
    </div>
  );

  const IDCardModal = () => (
    <div className="fixed inset-0 bg-slate-900/98 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full space-y-6 md:space-y-8 no-print animate-fadeIn">
        <div className="flex justify-between items-center text-white px-2">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-widest leading-none">{lang === 'hi' ? 'आपका डिजिटल कार्ड' : 'YOUR DIGITAL ID CARD'}</h2>
          <button onClick={() => setShowIdCardModal(false)} className="bg-white/10 p-2.5 md:p-3 rounded-full hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <VendorIDCard profile={profile} profilePic={profilePic} lang={lang} t={t} id="printable-id-card" />

        <div className="flex flex-col sm:flex-row gap-4 px-2">
          <button onClick={() => setShowIdCardModal(false)} className="flex-1 bg-slate-800 text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-slate-700 transition-all active:scale-95">
            {t.close}
          </button>
          <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex-[2] bg-orange-600 text-white py-4 md:py-6 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[10px] md:text-[11px] shadow-2xl shadow-orange-900/40 hover:bg-orange-500 transition-all active:scale-95">
            {isDownloading ? '...' : `${t.downloadIdCard} 📥`}
          </button>
        </div>
      </div>
    </div>
  );

  const getStatusBadge = (status?: Scheme['status']) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <div className="flex items-center gap-1.5 bg-green-100 px-3 py-1 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-600 rounded-full" />
            <span className="text-[9px] font-black uppercase text-green-700 tracking-widest">{t.statusActive}</span>
          </div>
        );
      case 'PENDING':
        return (
          <div className="flex items-center gap-1.5 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase text-amber-700 tracking-widest">{t.statusPending}</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            <div className="w-2 h-2 bg-slate-400 rounded-full" />
            <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{t.statusNotApplied}</span>
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 animate-fadeIn pb-32">
      {(isScanning || isTakingPhoto) && <ScannerOverlay />}
      {showIdCardModal && <IDCardModal />}
      {showNotifications && <NotificationDrawer />}
      
      {/* Hidden container for PDF generation to ensure perfect rendering without impacting UI */}
      <div className="fixed top-[-9999px] left-[-9999px]">
         <div style={{ width: '800px' }}>
            <VendorIDCard profile={profile} profilePic={profilePic} lang={lang} t={t} id="direct-download-card" />
         </div>
      </div>
      
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-orange-50 flex items-center gap-5 relative overflow-hidden group">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black overflow-hidden shadow-inner flex-shrink-0">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="opacity-80">{profile.name.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-black text-slate-900 leading-tight tracking-tight truncate">{profile.name}</h2>
            <div className="flex items-center gap-1.5 bg-orange-100 px-2.5 py-1 rounded-full border border-orange-200 shadow-sm">
               <span className="text-[9px] text-orange-700 font-black uppercase tracking-widest leading-none">{t.verified}</span>
               <div className="w-3.5 h-3.5 bg-orange-600 rounded-full flex items-center justify-center">
                 <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="5">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                 </svg>
               </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
             <p className="text-xs font-bold text-orange-600 uppercase tracking-[0.15em] leading-none">{profile.category}</p>
             {isOfflineReady && (
               <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                 <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{t.offlineReady}</span>
               </div>
             )}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-[10px] text-slate-400 font-bold tracking-wider leading-none">{profile.id}</p>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>

        <button 
          onClick={() => setShowNotifications(true)}
          className="absolute top-6 right-6 w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-xl shadow-sm hover:bg-slate-100 transition-colors group/bell"
        >
          <span>🔔</span>
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-bounce">
              {unreadCount}
            </div>
          )}
        </button>
      </div>

      <div className="flex bg-slate-100 p-1.5 rounded-3xl shadow-inner">
        {(['id', 'credit', 'schemes'] as const).map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)} 
            className={`flex-1 py-4 rounded-[1.25rem] text-[10px] font-black tracking-[0.1em] uppercase transition-all duration-300 ${activeTab === tab ? 'bg-white text-orange-600 shadow-xl scale-100' : 'text-slate-400 scale-95 opacity-70'}`}
          >
            {tab === 'id' ? t.idTab : tab === 'credit' ? t.creditTab : t.schemesTab}
          </button>
        ))}
      </div>

      {activeTab === 'id' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.25em] mb-8">{t.profMgmt}</h3>
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-8">
                <div className="w-28 h-28 bg-slate-50 rounded-[2.5rem] overflow-hidden border-2 border-slate-100 shadow-inner group relative">
                  {profilePic ? (
                    <img src={profilePic} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-10">👤</div>
                  )}
                </div>
                <div className="flex-1 space-y-4">
                  <button onClick={() => setIsTakingPhoto(true)} className="w-full bg-slate-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-100 active:scale-95">
                    📸 {t.takePhoto}
                  </button>
                  <label className="block w-full bg-white text-slate-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center border-2 border-slate-100 cursor-pointer hover:bg-slate-50 transition-all active:scale-95">
                    📁 {t.uploadImg}
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
              <div className="space-y-5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.selectAvatar}</p>
                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-hide">
                  {PLACEHOLDER_AVATARS.map((avatar, idx) => (
                    <button key={idx} onClick={() => setProfilePic(avatar)} className={`w-16 h-16 rounded-[1.5rem] flex-shrink-0 border-4 transition-all p-1 shadow-sm ${profilePic === avatar ? 'border-orange-500 bg-orange-50 scale-110 shadow-orange-100 rotate-3' : 'border-slate-50 bg-slate-50 hover:border-slate-200 opacity-60 hover:opacity-100'}`}>
                      <img src={avatar} alt="Avatar option" className="w-full h-full rounded-[1rem]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* New Prominent Peer Verification Action */}
          <div className="bg-gradient-to-br from-emerald-600 to-cyan-700 p-8 rounded-[3rem] shadow-xl shadow-emerald-900/10 border border-emerald-400/20 text-white relative overflow-hidden group">
             <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-4xl shadow-inner backdrop-blur-md border border-white/20">
                   🤳
                </div>
                <div className="flex-1 text-center md:text-left">
                   <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-2">{t.verifID}</h3>
                   <p className="text-[10px] font-bold text-emerald-50 opacity-80 uppercase tracking-widest leading-relaxed">
                      {lang === 'hi' ? 'अन्य विक्रेताओं के डिजिटल प्रमाणपत्रों का मिलान करें' : 'Validate other vendor credentials instantly via DPI scan'}
                   </p>
                </div>
                <button 
                  onClick={() => startScan('VENDOR')}
                  className="w-full md:w-auto bg-white text-emerald-700 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  {t.scanPeer}
                </button>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100">
            <h3 className="font-black text-slate-800 uppercase text-[11px] tracking-[0.25em] mb-8">{t.trustCenter}</h3>
            <div className="grid grid-cols-2 gap-5">
              <button onClick={() => startScan('PAYMENT')} className="p-7 bg-orange-50/50 rounded-[2.5rem] border border-orange-100/50 text-left hover:bg-orange-50 transition-all hover:shadow-lg group active:scale-95">
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">💳</div>
                <p className="font-black text-slate-800 text-sm leading-tight group-hover:text-orange-700">{t.verifPayment}</p>
                <div className="mt-3 w-8 h-1 bg-orange-400 rounded-full transition-all group-hover:w-full" />
              </button>
              <button onClick={() => startScan('VENDOR')} className="p-7 bg-blue-50/50 rounded-[2.5rem] border border-blue-100/50 text-left hover:bg-blue-50 transition-all hover:shadow-lg group active:scale-95">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform">🆔</div>
                <p className="font-black text-slate-800 text-sm leading-tight group-hover:text-blue-700">{lang === 'hi' ? 'ID सत्यापन' : 'Identity Verification'}</p>
                <div className="mt-3 w-8 h-1 bg-blue-400 rounded-full transition-all group-hover:w-full" />
              </button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[4rem] shadow-2xl border border-orange-50 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-orange-500 to-red-600" />
            <div className="relative inline-block mb-8 p-4 bg-slate-50 rounded-[3rem] shadow-inner group-hover:scale-105 transition-transform duration-500">
               <img src={profile.qrCode} alt="Merchant QR" className="w-48 h-48" />
               <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-xl">🛡️</div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{t.merchantCode}</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex gap-4">
                <button 
                  onClick={() => setShowIdCardModal(true)} 
                  className="flex-1 bg-slate-900 text-white text-[10px] font-black uppercase py-5 rounded-[2rem] hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                  🪪 {t.downloadPdf}
                </button>
                <button 
                  onClick={handleDownloadPDF} 
                  disabled={isDownloading} 
                  className="flex-1 bg-orange-600 text-white text-[10px] font-black uppercase py-5 rounded-[2rem] shadow-xl shadow-orange-200 hover:bg-orange-500 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isDownloading ? '...' : `📥 ${t.downloadIdCard}`}
                </button>
              </div>
              
              <button 
                onClick={handleSaveOffline}
                disabled={saveStatus !== 'IDLE'}
                className={`w-full py-5 rounded-[2rem] text-[11px] font-black uppercase transition-all active:scale-95 flex items-center justify-center gap-3 border-2 ${
                  saveStatus === 'SUCCESS' 
                  ? 'bg-green-100 text-green-700 border-green-200 shadow-lg shadow-green-100' 
                  : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
                }`}
              >
                {saveStatus === 'SAVING' ? (
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
                ) : saveStatus === 'SUCCESS' ? (
                  <>✅ {t.offlineSuccess}</>
                ) : (
                  <>💾 {t.saveOffline}</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'credit' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-50 rounded-full blur-3xl opacity-50" />
            <p className="text-[11px] text-slate-400 font-black uppercase tracking-[0.25em] mb-10 leading-none">{t.dpiScore}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-8xl font-black text-slate-900 tracking-tighter leading-none">{profile.creditScore}</span>
              <div className="flex flex-col">
                <span className="text-xs font-black text-green-600 uppercase tracking-widest">Growth</span>
                <span className="text-sm font-bold text-green-600 leading-none">▲ 12pts</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
            <h4 className="font-black text-slate-900 uppercase text-[11px] tracking-[0.25em] mb-8">{t.loans}</h4>
            <div className="space-y-8">
               <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Pre-approved Limit</p>
                  <p className="text-4xl font-black text-slate-900">₹15,000</p>
               </div>
               <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-200 active:scale-95 transition-transform">
                 ⚡ {t.apply}
               </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'schemes' && (
        <div className="space-y-10 animate-fadeIn px-1 pb-10">
          <h3 className="font-black text-slate-900 uppercase text-[11px] px-4 opacity-40 tracking-[0.25em]">{t.entitlements}</h3>
          {schemes.map(scheme => (
            <div key={scheme.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 relative group hover:border-orange-200 transition-all shadow-sm hover:shadow-xl overflow-hidden">
              <div className="absolute top-8 right-8">{getStatusBadge(scheme.status)}</div>
              <div className="mb-8">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-inner mb-6">🎁</div>
                <h4 className="font-black text-3xl text-slate-900 mb-3 leading-tight pr-24">{scheme.name}</h4>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">{scheme.description}</p>
              </div>
              <div className="space-y-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 shadow-inner">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">{t.benefitsLabel}</p>
                   <p className="text-base font-black text-slate-800 leading-tight">{scheme.benefits}</p>
                </div>
                <div className="bg-blue-50/30 p-6 rounded-3xl border border-blue-50 shadow-sm">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-3">{t.eligibilityLabel}</p>
                   <p className="text-sm font-bold text-slate-700 leading-relaxed">{scheme.eligibility}</p>
                </div>
              </div>
              {scheme.status === 'ACTIVE' ? (
                <button disabled className="w-full bg-green-50 text-green-600 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-widest border-2 border-green-100 cursor-not-allowed">
                  ✓ {t.statusActive}
                </button>
              ) : scheme.status === 'PENDING' ? (
                <button disabled className="w-full bg-amber-50 text-amber-600 py-6 rounded-[2.5rem] text-[11px] font-black uppercase tracking-widest border-2 border-amber-100 cursor-wait">
                  ⏳ {t.statusPending}
                </button>
              ) : (
                <button className="w-full bg-slate-900 text-white py-6 rounded-[2.5rem] text-[11px] font-black uppercase shadow-2xl shadow-slate-100 active:scale-95 transition-transform tracking-widest">
                  {t.applyNow} ✦
                </button>
              )}
            </div>
          ))}
        </div>