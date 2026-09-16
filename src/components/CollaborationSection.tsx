import React, { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Send, 
  BookOpen, 
  Users, 
  Code, 
  Award,
  Sparkles
} from 'lucide-react';

interface CollaborationSectionProps {
  onCollaborateClick?: () => void;
}

export const CollaborationSection: React.FC<CollaborationSectionProps> = ({ onCollaborateClick }) => {
  const [selectedCollab, setSelectedCollab] = useState<string | null>(null);
  const [proposalSent, setProposalSent] = useState(false);
  const [activePartner, setActivePartner] = useState<'academia' | 'industry'>('academia');

  const collabOptions = [
    {
      id: 'internships',
      title: 'Internship Programs',
      description: 'Structured 3-6 month semester credit-bearing internship pipelines tailored to academic calendars.',
      icon: <Briefcase className="w-5 h-5 text-blue-600" />,
      tag: 'High Impact',
      stats: '450+ Active Slots',
    },
    {
      id: 'live-projects',
      title: 'Live Projects',
      description: 'Industry engineering problem statements solved by student cohorts as accredited capstone projects.',
      icon: <Code className="w-5 h-5 text-indigo-600" />,
      tag: 'Hands-on',
      stats: '120+ Submissions',
    },
    {
      id: 'industry-talks',
      title: 'Industry Talks & Workshops',
      description: 'Weekly tech masterclasses, guest lectures, and corporate mentorship from leading practitioners.',
      icon: <Users className="w-5 h-5 text-purple-600" />,
      tag: 'Knowledge Share',
      stats: '80+ Annual Sessions',
    },
    {
      id: 'curriculum',
      title: 'Curriculum Collaboration',
      description: 'Periodic syllabus reviews with corporate leaders to integrate contemporary cloud, AI, and DevOps requirements.',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      tag: 'Strategic',
      stats: '34 Syllabi Modernized',
    },
    {
      id: 'apprenticeships',
      title: 'Apprenticeships & Placement',
      description: 'Pre-placement offers (PPOs) and continuous dual-learning pathways for final-year undergraduates.',
      icon: <Award className="w-5 h-5 text-amber-600" />,
      tag: 'Career Ready',
      stats: '94% Conversion Rate',
    },
  ];

  return (
    <section id="collaboration-section" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Institutional Synergy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Connect Academia with Industry
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Bridging theoretical university curricula with real-world corporate expectations through mutually accredited programs.
          </p>
        </div>

        {/* Bridge Visualization: University → Bridge/Platform → Industry */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* University Node */}
            <div className="w-full md:w-1/3 bg-blue-50/60 rounded-xl p-5 border border-blue-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white mx-auto flex items-center justify-center mb-3 shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">University / College</h3>
              <p className="text-xs text-slate-600 mt-1">
                Provides talent pool, structured academic credits, and research faculty.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-white px-2.5 py-1 rounded-full border border-blue-200">
                <span>Verified Institutes</span>
              </div>
            </div>

            {/* Central Bridge Connection */}
            <div className="w-full md:w-1/3 flex flex-col items-center justify-center text-center px-4">
              <div className="flex items-center justify-center gap-2 mb-2 w-full">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-300 to-indigo-500" />
                <div className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>SkillBridge</span>
                </div>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-indigo-500 to-purple-300" />
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-1">
                University <span className="text-indigo-600 font-bold mx-1">→</span> Industry
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Curriculum Alignment · Skill Gap Mapping · Direct Recruitment
              </p>
            </div>

            {/* Industry Node */}
            <div className="w-full md:w-1/3 bg-purple-50/60 rounded-xl p-5 border border-purple-200 text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white mx-auto flex items-center justify-center mb-3 shadow-xs">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Industry / Corporate</h3>
              <p className="text-xs text-slate-600 mt-1">
                Offers technical requirements, live projects, stipends, and placement offers.
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-purple-700 bg-white px-2.5 py-1 rounded-full border border-purple-200">
                <span>Vetted Tech Companies</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Collaboration Options */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>Collaboration Pathways</span>
            <span className="text-xs font-normal text-slate-500">
              (Select an initiative to initiate collaboration)
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collabOptions.map((opt) => {
              const isSelected = selectedCollab === opt.id;
              return (
                <div
                  key={opt.id}
                  id={`collab-card-${opt.id}`}
                  onClick={() => setSelectedCollab(opt.id)}
                  className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        {opt.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {opt.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1.5">{opt.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{opt.description}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">{opt.stats}</span>
                    <span className="font-bold text-indigo-600 flex items-center gap-1">
                      {isSelected ? 'Selected' : 'Initiate'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Quick Proposal Action Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  MoU & Partnership
                </span>
                <h4 className="text-lg font-bold text-white mt-1 mb-2">
                  Launch Institutional Partnership
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Colleges and corporate HR teams can exchange standard Memorandum of Understanding (MoU) agreements in under 5 minutes.
                </p>
              </div>

              <div className="mt-6">
                {proposalSent ? (
                  <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs p-2.5 rounded-xl flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>MoU interest request received! Partner coordinator will connect.</span>
                  </div>
                ) : (
                  <button
                    id="initiate-collab-mou-btn"
                    onClick={() => {
                      setProposalSent(true);
                      setTimeout(() => setProposalSent(false), 4000);
                    }}
                    className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Request Collaboration MoU</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
