import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Building2, 
  Menu, 
  X, 
  ChevronDown, 
  Compass, 
  CheckCircle2, 
  Sparkles,
  LayoutDashboard,
  LogIn
} from 'lucide-react';
import { NavTab, UserRole } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenLogin: () => void;
  isLoggedIn: boolean;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentRole,
  onChangeRole,
  onOpenLogin,
  isLoggedIn,
  userName,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home' as NavTab, label: 'Home' },
    { id: 'assessment' as NavTab, label: 'Skill Assessment' },
    { id: 'mapping' as NavTab, label: 'Career Mapping' },
    { id: 'opportunities' as NavTab, label: 'Opportunities' },
    { id: 'collaboration' as NavTab, label: 'Collaboration' },
    { id: 'dashboard' as NavTab, label: 'Dashboard' },
  ];

  const handleNav = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; badge: string }> = {
    student: {
      label: 'Student',
      icon: <GraduationCap className="w-4 h-4 text-blue-600" />,
      badge: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    academia: {
      label: 'Academia',
      icon: <Building2 className="w-4 h-4 text-purple-600" />,
      badge: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    industry: {
      label: 'Industry',
      icon: <Briefcase className="w-4 h-4 text-indigo-600" />,
      badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <button
              id="brand-logo-btn"
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-100 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  Skill<span className="text-blue-600">Bridge</span>
                </span>
                <span className="hidden sm:block text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                  Academia · Industry · Placement
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Role Switcher & Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Quick Role Switcher Pill */}
            <div className="relative">
              <button
                id="role-switch-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border cursor-pointer hover:shadow-xs transition-all ${roleLabels[currentRole].badge}`}
                title="Switch portal perspective"
              >
                {roleLabels[currentRole].icon}
                <span>Role: {roleLabels[currentRole].label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Perspective
                  </div>
                  {(['student', 'academia', 'industry'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      id={`select-role-${role}`}
                      onClick={() => {
                        onChangeRole(role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left cursor-pointer transition-colors ${
                        currentRole === role
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {roleLabels[role].icon}
                        {roleLabels[role].label}
                      </span>
                      {currentRole === role && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User status or Login */}
            {isLoggedIn ? (
              <button
                id="user-profile-btn"
                onClick={() => handleNav('dashboard')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {userName.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate">{userName}</span>
              </button>
            ) : (
              <button
                id="nav-login-btn"
                onClick={onOpenLogin}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Login
              </button>
            )}

            {/* Primary CTA */}
            <button
              id="nav-get-started-btn"
              onClick={() => handleNav('assessment')}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentTab === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 mb-2">Active View / Role</div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['student', 'academia', 'industry'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  id={`mobile-role-${role}`}
                  onClick={() => onChangeRole(role)}
                  className={`px-2 py-1.5 text-xs rounded-lg border text-center font-medium capitalize ${
                    currentRole === role
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                id="mobile-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg text-center"
              >
                {isLoggedIn ? `Profile (${userName})` : 'Login'}
              </button>
              <button
                id="mobile-get-started-btn"
                onClick={() => handleNav('assessment')}
                className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg text-center shadow-sm"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
