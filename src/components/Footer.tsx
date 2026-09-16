import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { NavTab, UserRole } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  onSelectRole: (role: UserRole) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectRole }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-slate-900">
                Skill<span className="text-blue-600">Bridge</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement.
            </p>
          </div>

          {/* Platform Nav */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('assessment')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Skill Assessment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('mapping')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Career Mapping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Internships & Placement
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Stakeholder Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <button
                  onClick={() => {
                    onSelectRole('student');
                    onNavigate('dashboard');
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Student Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRole('academia');
                    onNavigate('dashboard');
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Academia Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectRole('industry');
                    onNavigate('dashboard');
                  }}
                  className="hover:text-blue-600 transition-colors"
                >
                  Industry Recruiter Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collaboration')}
                  className="hover:text-blue-600 transition-colors"
                >
                  Institutional MoUs
                </button>
              </li>
            </ul>
          </div>

          {/* Problem Statement Note */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Mission Statement
            </h4>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 leading-relaxed">
              Empowering higher education institutes and corporations to bridge the technical curriculum gap through automated skill mapping and verified internship placement.
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} SkillBridge. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Accreditation Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
