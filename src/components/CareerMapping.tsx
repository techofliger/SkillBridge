import React, { useState } from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  ChevronRight,
  ExternalLink,
  Layers,
  GraduationCap
} from 'lucide-react';
import { careerPaths } from '../data/mockData';
import { CareerPath, NavTab, SkillProfileItem } from '../types';

interface CareerMappingProps {
  onNavigate: (tab: NavTab) => void;
  userSkills?: SkillProfileItem[];
}

export const CareerMapping: React.FC<CareerMappingProps> = ({ onNavigate, userSkills }) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(careerPaths[0]);

  // Default simulated student skill proficiency map
  const studentSkillProficiencies: Record<string, number> = {
    Java: 80,
    Python: 65,
    SQL: 70,
    Git: 85,
    DSA: 58,
    Communication: 75,
    'Problem Solving': 60,
    Excel: 60,
    Statistics: 45,
    Networking: 40,
    Linux: 50,
    'Security Fundamentals': 35,
    Cloud: 45,
    Docker: 30,
    'CI/CD': 35,
  };

  // Required skill threshold baseline is 75%
  const REQUIRED_BENCHMARK = 75;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Curriculum to Industry Alignment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Career Skill Mapping
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Match your current academic skill profile against real industry benchmarks, pinpoint skill deficits, and follow targeted learning tracks.
        </p>
      </div>

      {/* Career Selection Cards Grid */}
      <div className="mb-10">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Select Target Role
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {careerPaths.map((career) => {
            const isSelected = selectedCareer.id === career.id;

            return (
              <div
                key={career.id}
                id={`career-card-${career.id}`}
                onClick={() => setSelectedCareer(career)}
                className={`bg-white rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 ring-2 ring-blue-100 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        Active Role
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {career.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                    {career.description}
                  </p>

                  {/* Required Skills Chips */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {career.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
                    <span>View Skill Requirements</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Flow Section: Your Skills → Required Skills → Skill Gap → Recommended Learning */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Flow Breadcrumb Header */}
        <div className="mb-8 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            <span className="text-blue-600">1. Your Skills</span>
            <span className="text-slate-300">→</span>
            <span className="text-indigo-600">2. Required Skills</span>
            <span className="text-slate-300">→</span>
            <span className="text-amber-600">3. Skill Gap</span>
            <span className="text-slate-300">→</span>
            <span className="text-purple-600">4. Recommended Learning</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Detailed Skill Mapping: {selectedCareer.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Benchmark vs. Industry threshold (75% proficiency standard)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Typical Compensation:</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                {selectedCareer.avgSalary}
              </span>
            </div>
          </div>
        </div>

        {/* Visual Skill Gap Comparison Table / Bars */}
        <div className="space-y-4 mb-10">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Competency Comparison</span>
            <span className="text-slate-400">Target Standard: 75%</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {selectedCareer.requiredSkills.map((skill) => {
              const currentScore = studentSkillProficiencies[skill] || 50;
              const hasDeficit = currentScore < REQUIRED_BENCHMARK;
              const gapDelta = REQUIRED_BENCHMARK - currentScore;

              return (
                <div
                  key={skill}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{skill}</span>
                      {hasDeficit ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Skill Gap: -{gapDelta}%</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Meets Standard</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-slate-600">
                        Current: <strong className="text-slate-900">{currentScore}%</strong>
                      </span>
                      <span className="text-slate-400">|</span>
                      <span className="text-slate-600">
                        Industry Required: <strong className="text-blue-700">{REQUIRED_BENCHMARK}%</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress visualization comparing current vs required */}
                  <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        hasDeficit ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${currentScore}%` }}
                    />
                    {/* Marker for required 75% */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 z-10"
                      style={{ left: `${REQUIRED_BENCHMARK}%` }}
                      title="Industry Requirement (75%)"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Learning Modules for Selected Career */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                <span>Recommended Learning Pathways</span>
              </h3>
              <p className="text-xs text-slate-500">
                Curated courses and projects to bridge your identified deficits for {selectedCareer.title}.
              </p>
            </div>

            <button
              id="find-internships-for-role-btn"
              onClick={() => onNavigate('opportunities')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Open Internships for this role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {selectedCareer.recommendedLearning.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md">
                      {item.type}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                    {item.topic}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Partner: {item.provider}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-purple-100/80">
                  <a
                    href="#learning"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
                  >
                    <span>Start Learning Track</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
