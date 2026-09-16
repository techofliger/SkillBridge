import React from 'react';
import { UserCheck, Compass, Zap, Handshake, ArrowRight, ArrowDown } from 'lucide-react';
import { NavTab } from '../types';

interface HowItWorksProps {
  onNavigate: (tab: NavTab) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  const steps = [
    {
      num: '1',
      title: 'Create Profile',
      desc: 'Student, Academia or Industry creates an account with verified credentials.',
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      actionTab: 'dashboard' as NavTab,
      actionLabel: 'Select Role',
    },
    {
      num: '2',
      title: 'Assess & Map Skills',
      desc: 'Students complete a simple technical + soft-skill assessment to identify gaps.',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      actionTab: 'assessment' as NavTab,
      actionLabel: 'Take Test',
    },
    {
      num: '3',
      title: 'Find Matches',
      desc: 'The system matches skills with suitable job roles, internships and curated learning paths.',
      icon: <Zap className="w-5 h-5 text-purple-600" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      actionTab: 'mapping' as NavTab,
      actionLabel: 'View Paths',
    },
    {
      num: '4',
      title: 'Apply & Collaborate',
      desc: 'Students apply for opportunities while academia and industry actively collaborate.',
      icon: <Handshake className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      actionTab: 'opportunities' as NavTab,
      actionLabel: 'Explore Openings',
    },
  ];

  return (
    <section className="py-16 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A continuous loop connecting student competency, academic learning, and corporate hiring.
          </p>
        </div>

        {/* Responsive Grid with Step Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={step.num}
              id={`how-it-works-step-${step.num}`}
              className="relative bg-slate-50/70 hover:bg-slate-50 border border-slate-200 rounded-2xl p-6 transition-all hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Step header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                    {step.icon}
                  </div>
                  <span className="text-xs font-black tracking-widest text-slate-400 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                    STEP 0{step.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <button
                  id={`step-cta-${step.num}`}
                  onClick={() => onNavigate(step.actionTab)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
