import React from 'react';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  TrendingUp,
  Award
} from 'lucide-react';
import { NavTab, UserRole } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: NavTab) => void;
  onSelectRole: (role: UserRole) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onSelectRole }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Decorative ambient background blur accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-12 left-1/4 w-80 h-80 bg-blue-100/70 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-purple-100/70 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>National Skill Mapping & Placement Collaboration</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            <span className="text-slate-900">Skill</span>
            <span className="text-blue-600">Bridge</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mt-2 block">
              Connecting Academia, Students & Industry
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover the right skills, bridge skill gaps, find opportunities, and build industry-ready careers through real-time competency mapping.
          </p>

          {/* Two Main Call-To-Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="hero-get-started-btn"
              onClick={() => onNavigate('assessment')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="hero-explore-opportunities-btn"
              onClick={() => onNavigate('opportunities')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Explore Opportunities</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 sm:gap-6 text-center max-w-xl mx-auto">
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900">10,000+</div>
              <div className="text-xs text-slate-500 font-medium">Students Assessed</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-blue-600">350+</div>
              <div className="text-xs text-slate-500 font-medium">Industry Partners</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-purple-600">92%</div>
              <div className="text-xs text-slate-500 font-medium">Placement Match</div>
            </div>
          </div>
        </div>

        {/* 3 Simple Cards: Students, Academia, Industry */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Students */}
          <div 
            id="hero-card-students"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Students</h2>
              <p className="text-xs text-slate-500 mb-5">
                Benchmark your readiness against current hiring standards and secure vetted internships.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Assess Skills</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Find Skill Gaps</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Discover Internships</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Apply for Jobs</span>
                </li>
              </ul>
            </div>

            <button
              id="hero-student-action-btn"
              onClick={() => {
                onSelectRole('student');
                onNavigate('assessment');
              }}
              className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Academia */}
          <div 
            id="hero-card-academia"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Academia</h2>
              <p className="text-xs text-slate-500 mb-5">
                Modernize university curricula with live industry analytics and student cohort skill tracking.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>View Industry Skills</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Align Curriculum</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Track Student Skills</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Collaborate with Industry</span>
                </li>
              </ul>
            </div>

            <button
              id="hero-academia-action-btn"
              onClick={() => {
                onSelectRole('academia');
                onNavigate('dashboard');
              }}
              className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Academia Insights</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Industry */}
          <div 
            id="hero-card-industry"
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Industry</h2>
              <p className="text-xs text-slate-500 mb-5">
                Connect directly with pre-assessed talent and establish accredited internship pipelines.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Find Skilled Candidates</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Post Internships</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Post Jobs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Collaborate with Institutes</span>
                </li>
              </ul>
            </div>

            <button
              id="hero-industry-action-btn"
              onClick={() => {
                onSelectRole('industry');
                onNavigate('dashboard');
              }}
              className="mt-6 w-full py-2.5 px-4 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Industry Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
