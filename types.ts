
export enum AppView {
  LANDING = 'LANDING',
  REGISTRATION = 'REGISTRATION',
  VENDOR_DASHBOARD = 'VENDOR_DASHBOARD',
  ADMIN_ANALYTICS = 'ADMIN_ANALYTICS',
  ARCH_DESIGN = 'ARCH_DESIGN'
}

export type Language = 'en' | 'hi';

export interface VendorProfile {
  id: string;
  name: string;
  category: string;
  aadhaarLastFour: string;
  phone: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  qrCode: string;
  upiId: string;
  registrationDate: string;
  creditScore: number;
  eligibleSchemes: string[];
  profilePicture?: string;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibility: string;
  status?: 'NOT_APPLIED' | 'PENDING' | 'ACTIVE';
}

export interface RiskMitigation {
  risk: string;
  mitigation: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'SCHEME' | 'LOAN' | 'PAYMENT' | 'SYSTEM';
  date: string;
  isRead: boolean;
}
