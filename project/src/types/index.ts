// types.ts

export interface User {
  id: string;
  name: string;
  email: string;
  vendorId?: string;
  role?: 'vendor' | 'admin';
  isVerified?: boolean;
  createdAt?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  upiId: string;
  location?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void; // ✅ This is fine
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  isVerified: boolean;
  qrCode: string;
  upiId: string;
  category: string;
  rating: number;
  totalOrders: number;
  joinedAt: string;
}

export interface CartRenovation {
  id: string;
  vendorId: string;
  status: 'requested' | 'approved' | 'in-progress' | 'completed' | 'rejected';
  requestedAt: string;
  estimatedCompletion?: string;
  cost: number;
  description: string;
  images: string[];
  progress: {
    step: number;
    totalSteps: number;
    stepName: string;
    completedAt?: string;
  };
}

export interface Loan {
  id: string;
  vendorId: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'disbursed' | 'repaid';
  appliedAt: string;
  approvedAt?: string;
  interestRate: number;
  tenure: number;
  monthlyEmi: number;
  nextDueDate?: string;
  remainingAmount: number;
}
