import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Award, 
  AlertTriangle, 
  Handshake, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { academiaData } from '../data/mockData';
import { NavTab } from '../types';

interface AcademiaDashboardProps {
  onNavigate: (tab: NavTab) => void;
}

export const AcademiaDashboard: React.FC<AcademiaDashboardProps> = ({ onNavigate }) => {
  const [showRequirementsModal, setShowRequirementsModal] = useState(false);
  const [activeCurriculumFilter, setActiveCurriculumFilter] = useState('All');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold mb-2">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>University Dean & Faculty Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Academia Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Analyze aggregate student cohorts, pinpoint syllabus gaps vs. corporate expectations, and align credit modules.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="academia-initiate-collab-btn"
              onClick={() => onNavigate('collaboration')}
              className="px-4 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-xl border border-purple-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>MoU Collaborations</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div id="academia-stat-total-students" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Students</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{academiaData.totalStudents.toLocaleString()}</div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">B.Tech & MCA Enrolled</div>
        </div>

        {/* Average Skill Score */}
        <div id="academia-stat-avg-score" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Skill Score</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600">{academiaData.avgSkillScore}%</div>
          <div className="mt-1 text-[11px] text-emerald-700 font-semibold">+4% vs. previous semester</div>
        </div>

        {/* Common Skill Gaps */}
        <div id="academia-stat-common-gaps" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Common Skill Gaps</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-amber-600">{academiaData.commonSkillGaps}</div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium">Primary curricular focus areas</div>
        </div>

        {/* Industry Collaborations */}
        <div id="academia-stat-collaborations" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry Collaborations</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Handshake className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-purple-600">{academiaData.industryCollaborations}</div>
          <div className="mt-1 text-[11px] text-purple-700 font-medium">Active corporate MoUs</div>
        </div>
      </div>

      {/* Main Grid: Top Skill Gaps Chart & Industry Skill Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Top Skill Gaps Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Top Skill Gaps</h2>
                <p className="text-xs text-slate-500">
                  Percentage of students testing below the corporate recruitment threshold.
                </p>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                Cohort Analytics
              </span>
            </div>

            {/* Simple Bar Chart for Prompt exact values: DSA - 42%, SQL - 35%, Communication - 28%, Cloud - 24% */}
            <div className="space-y-4">
              {academiaData.topSkillGaps.map((item) => (
                <div key={item.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-800">{item.skill}</span>
                    <span className="font-bold text-slate-900">{item.gapPercentage}% Deficit</span>
                  </div>

                  <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                      style={{ width: `${item.gapPercentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 text-right">
                    Affects ~{Math.round((item.gapPercentage / 100) * academiaData.totalStudents)} students
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Data updated from latest term assessments</span>
            <button
              id="map-curriculum-gaps-btn"
              onClick={() => onNavigate('mapping')}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Map with Job Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 6 Cols: Industry Skill Insights */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Industry Skill Insights</h2>
                <p className="text-xs text-slate-500">
                  Real-time demand signals extracted from 350+ active recruiter postings.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Live Pulse
              </span>
            </div>

            {/* Prompt exact text: "Most requested skills by industry" */}
            <div className="mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
                Most requested skills by industry
              </span>

              {/* Tags: Java | Python | SQL | Cloud | AI/ML | Communication */}
              <div className="flex flex-wrap gap-2">
                {academiaData.industrySkillInsights.map((skill, index) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Curriculum Alignment Recommendations */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                <span>Recommended Curriculum Upgrades</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Integrate hands-on SQL query profiling into 3rd semester DBMS labs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Add mandatory cloud containerization (Docker) to elective courses.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Requested Button: View Industry Requirements */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              id="view-industry-requirements-btn"
              onClick={() => setShowRequirementsModal(true)}
              className="w-full py-3 px-4 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>View Industry Requirements</span>
            </button>
          </div>
        </div>
      </div>

      {/* Industry Requirements Detailed Modal */}
      {showRequirementsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
                  Corporate Advisory Panel
                </span>
                <h3 className="text-lg font-bold text-slate-900">Industry Skill Requirements</h3>
              </div>
              <button
                id="close-req-modal-btn"
                onClick={() => setShowRequirementsModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold px-2 py-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-600">
              <p>
                Based on standardized requirements synthesized from leading tech recruiters (TCS, Infosys, Wipro, Amazon, Google, Startups):
              </p>

              <div className="space-y-2.5">
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">1. Practical Coding over Theory</strong>
                  <p className="text-slate-600">70% of hiring assessments require running code, passing unit tests, and Git commit histories.</p>
                </div>
                <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">2. Production Databases & APIs</strong>
                  <p className="text-slate-600">Industry demands real SQL databases (PostgreSQL/MySQL) with indexing and REST API consumption.</p>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">3. Agile & Soft Skills</strong>
                  <p className="text-slate-600">Cross-functional team communication and sprint demo presentations are essential for PPO conversions.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
              <button
                id="close-req-modal-bottom-btn"
                onClick={() => setShowRequirementsModal(false)}
                className="px-4 py-2 text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg"
              >
                Close Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
