import React, { useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Users, 
  UserCheck, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Building, 
  MapPin, 
  Clock, 
  Send,
  X,
  GraduationCap
} from 'lucide-react';
import { Candidate, Opportunity, OpportunityType } from '../types';
import { recommendedCandidates } from '../data/mockData';

interface IndustryDashboardProps {
  onPostOpportunity: (opp: Partial<Opportunity>) => void;
  activeInternshipsCount?: number;
  jobPostsCount?: number;
  applicationsCount?: number;
  matchedCandidatesCount?: number;
}

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({
  onPostOpportunity,
  activeInternshipsCount = 4,
  jobPostsCount = 6,
  applicationsCount = 28,
  matchedCandidatesCount = 14,
}) => {
  // Post Opportunity Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<OpportunityType>('Internship');
  const [requiredSkills, setRequiredSkills] = useState('Java, SQL, Git');
  const [location, setLocation] = useState('Remote');
  const [duration, setDuration] = useState('3 Months');
  const [description, setDescription] = useState('');
  const [postSuccess, setPostSuccess] = useState(false);

  // Candidate Profile Modal State
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  const handleSubmitOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const skillsArray = requiredSkills
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onPostOpportunity({
      title,
      type,
      requiredSkills: skillsArray,
      location,
      duration,
      description,
      company: 'Acme Technologies (Your Org)',
      stipendOrSalary: type === 'Internship' ? '₹25,000 / month' : '₹8.0 - 12.0 LPA',
      workMode: location.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid',
      postedDate: 'Just now',
    });

    setPostSuccess(true);
    setTitle('');
    setDescription('');
    setTimeout(() => setPostSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
              <Building className="w-3.5 h-3.5 text-indigo-600" />
              <span>Industry Recruiter Workspace</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Industry Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Source pre-assessed campus talent, post internship opportunities, and collaborate directly with universities.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Talent Pipeline:</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Recruitment Drive</span>
            </span>
          </div>
        </div>
      </div>

      {/* 4 Cards: Active Internships, Job Posts, Applications, Matched Candidates */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Internships */}
        <div id="industry-stat-active-internships" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Internships</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Briefcase className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{activeInternshipsCount}</div>
          <div className="mt-1 text-[11px] text-blue-600 font-semibold">2 expiring this week</div>
        </div>

        {/* Job Posts */}
        <div id="industry-stat-job-posts" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Job Posts</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900">{jobPostsCount}</div>
          <div className="mt-1 text-[11px] text-indigo-600 font-semibold">Pre-placement Offers (PPO)</div>
        </div>

        {/* Applications */}
        <div id="industry-stat-applications" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applications</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-purple-600">{applicationsCount}</div>
          <div className="mt-1 text-[11px] text-slate-500 font-medium">+9 in the last 24h</div>
        </div>

        {/* Matched Candidates */}
        <div id="industry-stat-matched-candidates" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Matched Candidates</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-600">{matchedCandidatesCount}</div>
          <div className="mt-1 text-[11px] text-emerald-700 font-semibold">&gt;80% verified skill match</div>
        </div>
      </div>

      {/* Main Sections: Post an Opportunity & Recommended Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (5 Cols): Post an Opportunity */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <PlusCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Post an Opportunity</h2>
                <p className="text-[11px] text-slate-500">Reach verified student cohorts across 200+ engineering institutes</p>
              </div>
            </div>

            <form id="post-opportunity-form" onSubmit={handleSubmitOpportunity} className="space-y-3.5 text-xs">
              {/* Opportunity Title */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Opportunity Title *</label>
                <input
                  id="post-opp-title"
                  type="text"
                  required
                  placeholder="e.g. Backend Software Engineer Intern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Type & Duration */}
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type *</label>
                  <select
                    id="post-opp-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as OpportunityType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Job">Job Post</option>
                    <option value="Project">Live Project</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Duration *</label>
                  <input
                    id="post-opp-duration"
                    type="text"
                    required
                    placeholder="e.g. 3 Months / Full-time"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Location & Required Skills */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Location / Work Mode *</label>
                <input
                  id="post-opp-location"
                  type="text"
                  required
                  placeholder="e.g. Remote or Bengaluru, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Required Skills (comma separated) *
                </label>
                <input
                  id="post-opp-skills"
                  type="text"
                  required
                  placeholder="e.g. Java, SQL, Git"
                  value={requiredSkills}
                  onChange={(e) => setRequiredSkills(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Description *</label>
                <textarea
                  id="post-opp-description"
                  rows={3}
                  required
                  placeholder="Detail role expectations, team stack, and eligibility criteria..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {postSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Opportunity published successfully! It is now live in the marketplace.</span>
                </div>
              )}

              <button
                id="submit-post-opportunity-btn"
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Post Opportunity</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column (7 Cols): Recommended Candidates */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recommended Candidates</h2>
                <p className="text-[11px] text-slate-500">Students whose assessed competencies match your active openings</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Top Matches
              </span>
            </div>

            {/* Candidate Cards Grid */}
            <div className="space-y-3">
              {recommendedCandidates.map((cand) => (
                <div
                  key={cand.id}
                  id={`candidate-card-${cand.id}`}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{cand.name}</h3>
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        Skill Match: {cand.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{cand.college} · {cand.degree}</span>
                    </div>

                    {/* Skill Checkmarks requested: Java ✓, SQL ✓, Git ✓ */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {cand.verifiedSkills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200"
                        >
                          <span>{skill}</span>
                          <span className="text-emerald-600 font-bold">✓</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Button: View Profile */}
                  <div className="shrink-0">
                    <button
                      id={`view-profile-${cand.id}`}
                      onClick={() => {
                        setSelectedCandidate(cand);
                        setInviteSent(false);
                      }}
                      className="w-full sm:w-auto px-3.5 py-1.5 text-xs font-bold text-slate-800 hover:text-blue-600 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  {selectedCandidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500">{selectedCandidate.college}</p>
                </div>
              </div>
              <button
                id="close-candidate-modal-btn"
                onClick={() => setSelectedCandidate(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Degree:</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.degree}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Graduation Year:</span>
                  <span className="font-semibold text-slate-800">{selectedCandidate.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Skill Match:</span>
                  <span className="font-bold text-blue-600">{selectedCandidate.matchScore}% Verified</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Availability:</span>
                  <span className="font-semibold text-emerald-700">{selectedCandidate.availableFor}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1.5">Verified Industry Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.verifiedSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-semibold text-xs flex items-center gap-1">
                      <span>{s}</span>
                      <span>✓</span>
                    </span>
                  ))}
                </div>
              </div>

              {inviteSent ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Interview invitation and assessment challenge dispatched to {selectedCandidate.name}!</span>
                </div>
              ) : (
                <p className="text-slate-500 text-[11px]">
                  Connecting initiates an automated interview pipeline and shares student college verification credentials.
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                id="close-candidate-btn"
                onClick={() => setSelectedCandidate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Close
              </button>

              {!inviteSent && (
                <button
                  id="send-interview-invite-btn"
                  onClick={() => setInviteSent(true)}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Invite to Interview</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
