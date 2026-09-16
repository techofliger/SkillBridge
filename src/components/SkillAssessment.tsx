import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  AlertCircle, 
  BookOpen, 
  TrendingUp, 
  Award,
  Layers
} from 'lucide-react';
import { assessmentQuestions } from '../data/mockData';
import { SkillLevel, NavTab } from '../types';

interface SkillAssessmentProps {
  onNavigate: (tab: NavTab) => void;
  onAssessmentCompleted?: (score: number, gaps: string[]) => void;
}

export const SkillAssessment: React.FC<SkillAssessmentProps> = ({
  onNavigate,
  onAssessmentCompleted,
}) => {
  // Store selected option per question ID: { q1: 'Intermediate', ... }
  const [answers, setAnswers] = useState<Record<string, SkillLevel>>({
    q1: 'Intermediate',
    q2: 'Basic',
    q3: 'Intermediate',
    q4: 'Basic',
    q5: 'Beginner',
    q6: 'Intermediate',
    q7: 'Advanced',
    q8: 'Basic',
    q9: 'Basic',
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'technical' | 'soft'>('all');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultScore, setResultScore] = useState<number>(72);
  const [identifiedGaps, setIdentifiedGaps] = useState<string[]>([
    'SQL Query Optimization & Database Indexing',
    'Data Structures: Graph Traversals & Dynamic Programming',
    'Cybersecurity: Penetration Testing & OWASP Hardening',
    'Root-cause Problem Solving under ambiguity',
  ]);

  const handleSelectOption = (questionId: string, level: SkillLevel) => {
    setAnswers((prev) => ({ ...prev, [questionId]: level }));
  };

  const calculateResults = () => {
    let totalPoints = 0;
    const questionsCount = assessmentQuestions.length;
    const gaps: string[] = [];

    assessmentQuestions.forEach((q) => {
      const selected = answers[q.id];
      const opt = q.options.find((o) => o.label === selected);
      const points = opt ? opt.points : 50;
      totalPoints += points;

      if (points <= 50) {
        if (q.domain === 'Programming') gaps.push('Algorithmic problem solving and clean OOP modularity');
        else if (q.domain === 'Database') gaps.push('SQL Query Optimization & Database Indexing');
        else if (q.domain === 'Web Development') gaps.push('Full-stack API architecture and state management');
        else if (q.domain === 'Data Structures') gaps.push('Data Structures: Graph Traversals & Dynamic Programming');
        else if (q.domain === 'Cybersecurity') gaps.push('Cybersecurity: Network protocols & OWASP Vulnerabilities');
        else if (q.domain === 'Communication') gaps.push('Technical documentation and cross-stakeholder speaking');
        else if (q.domain === 'Teamwork') gaps.push('Agile sprint collaboration and code review contribution');
        else if (q.domain === 'Problem Solving') gaps.push('First-principles debugging and root-cause analysis');
        else if (q.domain === 'Leadership') gaps.push('Technical initiative ownership and junior peer mentorship');
      }
    });

    const score = Math.round(totalPoints / questionsCount);
    setResultScore(score);
    const finalGaps = gaps.length > 0 ? gaps : ['Keep challenging yourself with advanced system design projects'];
    setIdentifiedGaps(finalGaps);
    setIsSubmitted(true);

    if (onAssessmentCompleted) {
      onAssessmentCompleted(score, finalGaps);
    }
  };

  const filteredQuestions = assessmentQuestions.filter((q) => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const technicalQuestionsCount = assessmentQuestions.filter((q) => q.category === 'technical').length;
  const softQuestionsCount = assessmentQuestions.filter((q) => q.category === 'soft').length;

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Skill Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Skill Assessment
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Answer the following questionnaire to benchmark your technical and soft skills, identify core skill gaps, and generate your career roadmap.
        </p>
      </div>

      {isSubmitted ? (
        /* Results View */
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
          {/* Main Score Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Assessment Complete
                </span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  Your Overall Skill Score
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Based on 9 technical and interpersonal competency domains.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center bg-blue-50 border border-blue-200 rounded-2xl p-4 min-w-[130px]">
                  <span className="text-4xl font-black text-blue-600">{resultScore}%</span>
                  <div className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider mt-0.5">
                    {resultScore >= 75 ? 'Industry Ready' : resultScore >= 60 ? 'Competent' : 'Developing'}
                  </div>
                </div>
              </div>
            </div>

            {/* Identified Skill Gaps Box */}
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Identified Skill Gaps ({identifiedGaps.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                These are the key areas where bridging your knowledge will significantly increase your internship and placement match rate.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {identifiedGaps.map((gap, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-slate-800"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      !
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">{gap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                id="retake-assessment-btn"
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Assessment</span>
              </button>

              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <button
                  id="view-career-mapping-btn"
                  onClick={() => onNavigate('mapping')}
                  className="px-5 py-2.5 text-xs font-bold text-slate-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span>View Career Skill Mapping</span>
                </button>

                <button
                  id="view-opportunities-btn"
                  onClick={() => onNavigate('opportunities')}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Matched Openings</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Assessment Form View */
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between bg-white rounded-xl p-2 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1">
              <button
                id="filter-all-questions"
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Domains ({assessmentQuestions.length})
              </button>

              <button
                id="filter-technical-questions"
                onClick={() => setActiveCategory('technical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'technical'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Technical Skills ({technicalQuestionsCount})
              </button>

              <button
                id="filter-soft-questions"
                onClick={() => setActiveCategory('soft')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  activeCategory === 'soft'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Soft Skills ({softQuestionsCount})
              </button>
            </div>

            <div className="hidden sm:block text-xs text-slate-500 font-medium pr-2">
              Select your current comfort level
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q, qIndex) => {
              const selectedValue = answers[q.id];

              return (
                <div
                  key={q.id}
                  id={`assessment-question-card-${q.id}`}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      q.category === 'technical'
                        ? 'bg-blue-50 text-blue-700 border border-blue-100'
                        : 'bg-purple-50 text-purple-700 border border-purple-100'
                    }`}>
                      {q.domain}
                    </span>

                    <span className="text-xs font-semibold text-slate-400">
                      Domain {qIndex + 1}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-4">
                    {q.question}
                  </h3>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {q.options.map((opt) => {
                      const isOptionSelected = selectedValue === opt.label;

                      return (
                        <button
                          key={opt.label}
                          id={`opt-${q.id}-${opt.label.toLowerCase()}`}
                          type="button"
                          onClick={() => handleSelectOption(q.id, opt.label)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isOptionSelected
                              ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-100'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-bold ${
                                isOptionSelected ? 'text-blue-700' : 'text-slate-800'
                              }`}>
                                {opt.label}
                              </span>
                              {isOptionSelected && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              {opt.description}
                            </p>
                          </div>
                          <div className="mt-2 text-[10px] font-medium text-slate-400">
                            {opt.points} pts
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submit Assessment Button */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Ready to benchmark your profile?</h4>
              <p className="text-xs text-slate-500">
                All 9 domains configured. You can re-assess at any time as you acquire new certifications.
              </p>
            </div>

            <button
              id="submit-assessment-btn"
              onClick={calculateResults}
              className="w-full sm:w-auto px-7 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
