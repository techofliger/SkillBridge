import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Compass, 
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { NavTab, SkillProfileItem } from '../types';

interface StudentDashboardProps {
  studentName?: string;
  skillScore?: number;
  skillsAssessedCount?: number;
  skillGapsCount?: number;
  applicationsCount?: number;
  onNavigate: (tab: NavTab) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  studentName = 'Student',
  skillScore = 72,
  skillsAssessedCount = 18,
  skillGapsCount = 5,
  applicationsCount = 8,
  onNavigate,
}) => {
  // Exact requested skill profile values:
  // Java — 80%, Python — 65%, SQL — 70%, Communication — 75%, Problem Solving — 60%
  const skillProfile: SkillProfileItem[] = [
    { skill: 'Java', levelPercentage: 80, category: 'technical' },
    { skill: 'Python', levelPercentage: 65, category: 'technical' },
    { skill: 'SQL', levelPercentage: 70, category: 'technical' },
    { skill: 'Communication', levelPercentage: 75, category: 'soft' },
    { skill: 'Problem Solving', levelPercentage: 60, category: 'soft' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Welcome, {studentName} 👋</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Track your verified competency scores, review industry skill deficits, and monitor internship applications.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="dashboard-take-assessment-btn"
            onClick={() => onNavigate('assessment')}
            className="px-4 py-2 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>

          <button
            id="dashboard-browse-jobs-btn"
            onClick={() => onNavigate('opportunities')}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Browse Internships</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Skill Score */}
        <div id="stat-card-skill-score" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Score</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{skillScore}%</div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Industry Benchmark: 70%+</span>
          </div>
        </div>

        {/* Card 2: Skills Assessed */}
        <div id="stat-card-skills-assessed" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skills Assessed</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{skillsAssessedCount}</div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">
            Across tech & soft categories
          </div>
        </div>

        {/* Card 3: Skill Gaps */}
        <div id="stat-card-skill-gaps" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skill Gaps</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-amber-600">{skillGapsCount}</div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium">
            High priority bridging needed
          </div>
        </div>

        {/* Card 4: Applications */}
        <div id="stat-card-applications" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applications</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Send className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{applicationsCount}</div>
          <div className="mt-1 text-[11px] text-purple-700 font-medium">
            3 under review by HR
          </div>
        </div>
      </div>

      {/* Main Grid: Skill Profile & Skill Gap Analysis Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Skill Profile Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Skill Profile</h2>
              <p className="text-xs text-slate-500">
                Verified proficiencies from academic course evaluations and technical testing.
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              Active Benchmark
            </span>
          </div>

          <div className="space-y-4">
            {skillProfile.map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-800 flex items-center gap-2">
                    <span>{item.skill}</span>
                    <span className="text-[10px] text-slate-400 capitalize font-normal">
                      ({item.category})
                    </span>
                  </span>
                  <span className="font-bold text-slate-900">{item.levelPercentage}%</span>
                </div>

                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      item.levelPercentage >= 75
                        ? 'bg-blue-600'
                        : item.levelPercentage >= 65
                        ? 'bg-indigo-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.levelPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Overall Profile Maturity: <strong>Good</strong></span>
            <button
              id="student-view-all-mapping-btn"
              onClick={() => onNavigate('mapping')}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Explore All Career Alignments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Skill Gap Analysis Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Skill Gap Analysis</h3>
                <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-wider">
                  Target: Software Developer
                </span>
              </div>
            </div>

            {/* Prompt exact text highlight */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-slate-800 leading-relaxed font-medium mb-4">
              “Improve SQL and Problem Solving to become more suitable for your selected career path.”
            </div>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>SQL:</strong> Advanced joins, indexing & execution query profiling.</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span><strong>Problem Solving:</strong> Algorithmic runtime constraints & recursion.</span>
              </div>
            </div>
          </div>

          {/* Requested Button: View Skill Roadmap */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              id="view-skill-roadmap-btn"
              onClick={() => onNavigate('mapping')}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>View Skill Roadmap</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
