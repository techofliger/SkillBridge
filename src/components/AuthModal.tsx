import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  X, 
  LogIn, 
  UserPlus, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, role: UserRole, name: string) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialRole = 'student',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [orgName, setOrgName] = useState('');

  if (!isOpen) return null;

  // Preset demo accounts for quick click
  const handleDemoFill = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('student.rahul@college.edu');
      setPassword('••••••••');
      setFullName('Rahul Sharma');
    } else if (role === 'academia') {
      setEmail('dean.engineering@university.edu');
      setPassword('••••••••');
      setFullName('Dr. Arvind Sen');
      setOrgName('Apex Technical University');
    } else {
      setEmail('hr.tech@abctechnologies.com');
      setPassword('••••••••');
      setFullName('Vikram Malhotra');
      setOrgName('ABC Technologies');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email.trim() || `${selectedRole}@skillbridge.org`;
    const finalName = fullName.trim() || (selectedRole === 'student' ? 'Rahul Sharma' : selectedRole === 'academia' ? 'Dean Arvind Sen' : 'HR Lead');
    onLoginSuccess(finalEmail, selectedRole, finalName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {isSignUp ? 'Create SkillBridge Account' : 'Login to SkillBridge'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Academia–Industry Collaboration & Placement
              </p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector: I am a: [Student] [Academia] [Industry] */}
        <div className="pt-4 pb-2">
          <label className="text-xs font-bold text-slate-700 block mb-2">
            I am a:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              id="auth-role-student-btn"
              type="button"
              onClick={() => setSelectedRole('student')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                selectedRole === 'student'
                  ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold ring-2 ring-blue-100'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span className="text-xs">Student</span>
            </button>

            <button
              id="auth-role-academia-btn"
              type="button"
              onClick={() => setSelectedRole('academia')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                selectedRole === 'academia'
                  ? 'border-purple-600 bg-purple-50 text-purple-700 font-bold ring-2 ring-purple-100'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Building2 className="w-4 h-4 text-purple-600" />
              <span className="text-xs">Academia</span>
            </button>

            <button
              id="auth-role-industry-btn"
              type="button"
              onClick={() => setSelectedRole('industry')}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                selectedRole === 'industry'
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-bold ring-2 ring-indigo-100'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="text-xs">Industry</span>
            </button>
          </div>
        </div>

        {/* Quick Demo Pre-fill Bar */}
        <div className="mt-2 mb-4 p-2 bg-slate-50 rounded-xl flex items-center justify-between text-[11px] text-slate-500">
          <span>Quick Demo fill:</span>
          <button
            type="button"
            onClick={() => handleDemoFill(selectedRole)}
            className="text-blue-600 font-bold hover:underline cursor-pointer"
          >
            Auto-fill {selectedRole} credentials
          </button>
        </div>

        {/* Form: Email, Password, Name */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isSignUp && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name / Contact Person</label>
              <input
                id="auth-name-input"
                type="text"
                placeholder={selectedRole === 'student' ? 'e.g. Rahul Sharma' : 'e.g. Dr. A. Sen'}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email</label>
            <input
              id="auth-email-input"
              type="email"
              required
              placeholder="e.g. user@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input
              id="auth-password-input"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons: Login / Create Account */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSignUp ? <UserPlus className="w-3.5 h-3.5" /> : <LogIn className="w-3.5 h-3.5" />}
              <span>{isSignUp ? 'Create Account' : 'Login'}</span>
            </button>

            <button
              id="toggle-auth-mode-btn"
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
