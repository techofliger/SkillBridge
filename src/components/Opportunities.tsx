import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building, 
  Send,
  X,
  DollarSign
} from 'lucide-react';
import { Opportunity, OpportunityType } from '../types';

interface OpportunitiesProps {
  opportunities: Opportunity[];
  onApplyOpportunity: (id: string) => void;
  applicationsCount: number;
}

export const Opportunities: React.FC<OpportunitiesProps> = ({
  opportunities,
  onApplyOpportunity,
  applicationsCount,
}) => {
  const [activeTab, setActiveTab] = useState<'All' | OpportunityType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState('All');
  const [selectedLocationFilter, setSelectedLocationFilter] = useState('All');
  const [selectedDurationFilter, setSelectedDurationFilter] = useState('All');

  // Modal state for View & Apply
  const [viewingOpp, setViewingOpp] = useState<Opportunity | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applicantNote, setApplicantNote] = useState('');

  // Extract unique filters
  const allSkills = Array.from(
    new Set(opportunities.flatMap((o) => o.requiredSkills))
  );

  const filteredOpportunities = opportunities.filter((opp) => {
    // Tab filter
    if (activeTab !== 'All' && opp.type !== activeTab) return false;

    // Search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesTitle = opp.title.toLowerCase().includes(q);
      const matchesCompany = opp.company.toLowerCase().includes(q);
      const matchesSkills = opp.requiredSkills.some((s) => s.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCompany && !matchesSkills) return false;
    }

    // Skill filter
    if (selectedSkillFilter !== 'All') {
      if (!opp.requiredSkills.includes(selectedSkillFilter)) return false;
    }

    // Location filter
    if (selectedLocationFilter !== 'All') {
      if (selectedLocationFilter === 'Remote' && opp.workMode !== 'Remote') return false;
      if (selectedLocationFilter === 'On-site' && opp.workMode !== 'On-site') return false;
      if (selectedLocationFilter === 'Hybrid' && opp.workMode !== 'Hybrid') return false;
    }

    // Duration filter
    if (selectedDurationFilter !== 'All') {
      if (!opp.duration.toLowerCase().includes(selectedDurationFilter.toLowerCase())) return false;
    }

    return true;
  });

  const handleOpenApplyModal = (opp: Opportunity) => {
    setViewingOpp(opp);
    setApplySuccess(opp.applied || false);
    setApplicantNote('');
  };

  const handleConfirmApply = () => {
    if (!viewingOpp) return;
    onApplyOpportunity(viewingOpp.id);
    setApplySuccess(true);
    setTimeout(() => {
      setViewingOpp(null);
      setApplySuccess(false);
    }, 2200);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Vetted Industry Marketplace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Internship & Placement Opportunities
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Discover verified internships, pre-placement jobs, and corporate live projects matching your skill assessment profile.
        </p>
      </div>

      {/* Tabs: Internships | Jobs | Projects */}
      <div className="flex items-center justify-center mb-6">
        <div className="bg-slate-200/80 p-1.5 rounded-xl inline-flex gap-1">
          {(['All', 'Internship', 'Job', 'Project'] as const).map((tab) => (
            <button
              key={tab}
              id={`tab-opportunities-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'All' ? 'All Opportunities' : `${tab}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="search-opps-input"
              type="text"
              placeholder="Search by role, company, or skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Skill Filter */}
          <div>
            <select
              id="filter-skill-select"
              value={selectedSkillFilter}
              onChange={(e) => setSelectedSkillFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Required Skills</option>
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  Skill: {skill}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <select
              id="filter-location-select"
              value={selectedLocationFilter}
              onChange={(e) => setSelectedLocationFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <select
              id="filter-duration-select"
              value={selectedDurationFilter}
              onChange={(e) => setSelectedDurationFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="All">All Durations</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="Full-time">Full-time Job</option>
            </select>
          </div>
        </div>

        {/* Clear Filters indicator */}
        {(searchQuery || selectedSkillFilter !== 'All' || selectedLocationFilter !== 'All' || selectedDurationFilter !== 'All') && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredOpportunities.length} matches</span>
            <button
              id="clear-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedSkillFilter('All');
                setSelectedLocationFilter('All');
                setSelectedDurationFilter('All');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Opportunity Cards Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Briefcase className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No opportunities found</h3>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search criteria or reset filters to see all available openings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              id={`opportunity-card-${opp.id}`}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Type badge and stipend */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      opp.type === 'Internship'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : opp.type === 'Job'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}
                  >
                    {opp.type}
                  </span>

                  <span className="text-xs font-bold text-slate-700">
                    {opp.stipendOrSalary}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {opp.title}
                </h3>

                {/* Company Name */}
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company: {opp.company}</span>
                </div>

                {/* Meta details: Location & Duration */}
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl">
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">Location: {opp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Duration: {opp.duration}</span>
                  </div>
                </div>

                {/* Required Skills list */}
                <div className="mb-4">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                    Required Skills:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {opp.description}
                </p>
              </div>

              {/* View & Apply Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">{opp.postedDate}</span>

                {opp.applied ? (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Applied</span>
                  </span>
                ) : (
                  <button
                    id={`apply-btn-${opp.id}`}
                    onClick={() => handleOpenApplyModal(opp)}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>View & Apply</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View & Apply Modal */}
      {viewingOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                  {viewingOpp.type} Opportunity
                </span>
                <h3 className="text-lg font-bold text-slate-900">{viewingOpp.title}</h3>
                <p className="text-xs text-slate-500">{viewingOpp.company} · {viewingOpp.location}</p>
              </div>
              <button
                id="close-apply-modal-btn"
                onClick={() => setViewingOpp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 block text-[11px]">Duration:</span>
                  <span className="font-bold text-slate-800">{viewingOpp.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Compensation:</span>
                  <span className="font-bold text-emerald-700">{viewingOpp.stipendOrSalary}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Required Skills:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewingOpp.requiredSkills.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 mb-1">Role Description:</h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {viewingOpp.description}
                </p>
              </div>

              {/* Applicant cover brief */}
              <div>
                <label className="font-bold text-slate-800 block mb-1 text-xs">
                  Applicant Brief / Why You're a Fit:
                </label>
                <textarea
                  id="apply-note-textarea"
                  rows={2}
                  value={applicantNote}
                  onChange={(e) => setApplicantNote(e.target.value)}
                  placeholder="e.g., Completed university course in Java & SQL with 80% score..."
                  className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {applySuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Application successfully submitted! Your skill verified profile has been forwarded to {viewingOpp.company}.</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                id="cancel-apply-btn"
                onClick={() => setViewingOpp(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
              >
                Close
              </button>

              {!viewingOpp.applied && !applySuccess && (
                <button
                  id="confirm-submit-application-btn"
                  onClick={handleConfirmApply}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
