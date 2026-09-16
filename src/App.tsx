import React, { useState } from 'react';
import { 
  NavTab, 
  UserRole, 
  Opportunity, 
  UserProfile,
  SkillProfileItem 
} from './types';
import { initialOpportunities, initialStudentSkills } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorks } from './components/HowItWorks';
import { CollaborationSection } from './components/CollaborationSection';
import { SkillAssessment } from './components/SkillAssessment';
import { CareerMapping } from './components/CareerMapping';
import { Opportunities } from './components/Opportunities';
import { StudentDashboard } from './components/StudentDashboard';
import { IndustryDashboard } from './components/IndustryDashboard';
import { AcademiaDashboard } from './components/AcademiaDashboard';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [currentRole, setCurrentRole] = useState<UserRole>('student');
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Rahul Sharma',
    role: 'student',
    email: 'rahul.s@college.edu',
    organization: 'Apex Engineering College',
  });

  // Dynamic Prototype State
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [applicationsCount, setApplicationsCount] = useState(8);
  const [skillScore, setSkillScore] = useState(72);
  const [skillGapsCount, setSkillGapsCount] = useState(5);
  const [userSkills, setUserSkills] = useState<SkillProfileItem[]>(initialStudentSkills);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers
  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChangeRole = (role: UserRole) => {
    setCurrentRole(role);
    setUserProfile((prev) => ({
      ...prev,
      role,
      name: role === 'student' ? 'Rahul Sharma' : role === 'academia' ? 'Dr. Arvind Sen' : 'Vikram Malhotra',
      organization: role === 'student' ? 'Apex Engineering College' : role === 'academia' ? 'National Institute of Tech' : 'ABC Technologies',
    }));
    triggerToast(`Switched perspective to ${role.toUpperCase()} mode`);
  };

  const handleLoginSuccess = (email: string, role: UserRole, name: string) => {
    setIsLoggedIn(true);
    setCurrentRole(role);
    setUserProfile({
      name,
      role,
      email,
      organization: role === 'student' ? 'Apex Engineering College' : role === 'academia' ? 'National Institute of Tech' : 'ABC Technologies',
    });
    triggerToast(`Logged in successfully as ${name} (${role})`);
    setCurrentTab('dashboard');
  };

  const handleApplyOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, applied: true } : opp))
    );
    setApplicationsCount((prev) => prev + 1);
    triggerToast('Application submitted! Your skill-verified profile was shared.');
  };

  const handlePostOpportunity = (newOppData: Partial<Opportunity>) => {
    const createdOpp: Opportunity = {
      id: `opp-${Date.now()}`,
      title: newOppData.title || 'New Opportunity',
      company: newOppData.company || userProfile.organization || 'Partner Industry',
      type: newOppData.type || 'Internship',
      location: newOppData.location || 'Remote',
      workMode: newOppData.workMode || 'Remote',
      duration: newOppData.duration || '3 Months',
      stipendOrSalary: newOppData.stipendOrSalary || '₹25,000 / month',
      requiredSkills: newOppData.requiredSkills || ['Java', 'SQL', 'Git'],
      description: newOppData.description || 'New opportunity created via Industry Dashboard.',
      postedDate: 'Just now',
      applied: false,
    };

    setOpportunities((prev) => [createdOpp, ...prev]);
    triggerToast('New opportunity published to the SkillBridge marketplace!');
  };

  const handleAssessmentCompleted = (score: number, gaps: string[]) => {
    setSkillScore(score);
    setSkillGapsCount(gaps.length);
    triggerToast(`Assessment completed! Updated Skill Score: ${score}%`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        currentRole={currentRole}
        onChangeRole={handleChangeRole}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userProfile.name}
      />

      {/* Primary Page Content */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <div>
            <HeroSection
              onNavigate={handleSelectTab}
              onSelectRole={handleChangeRole}
            />
            <HowItWorks onNavigate={handleSelectTab} />
            <CollaborationSection onCollaborateClick={() => handleSelectTab('collaboration')} />
          </div>
        )}

        {currentTab === 'assessment' && (
          <SkillAssessment
            onNavigate={handleSelectTab}
            onAssessmentCompleted={handleAssessmentCompleted}
          />
        )}

        {currentTab === 'mapping' && (
          <CareerMapping
            onNavigate={handleSelectTab}
            userSkills={userSkills}
          />
        )}

        {currentTab === 'opportunities' && (
          <Opportunities
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            applicationsCount={applicationsCount}
          />
        )}

        {currentTab === 'collaboration' && (
          <CollaborationSection />
        )}

        {currentTab === 'dashboard' && (
          <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Dashboard Role Switcher Bar */}
            <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 pl-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Portal View:
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  id="dashboard-switch-student"
                  onClick={() => handleChangeRole('student')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentRole === 'student'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </button>

                <button
                  id="dashboard-switch-academia"
                  onClick={() => handleChangeRole('academia')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentRole === 'academia'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Academia View</span>
                </button>

                <button
                  id="dashboard-switch-industry"
                  onClick={() => handleChangeRole('industry')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    currentRole === 'industry'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Industry View</span>
                </button>
              </div>
            </div>

            {/* Render Selected Role Dashboard */}
            {currentRole === 'student' && (
              <StudentDashboard
                studentName={userProfile.name}
                skillScore={skillScore}
                skillsAssessedCount={18}
                skillGapsCount={skillGapsCount}
                applicationsCount={applicationsCount}
                onNavigate={handleSelectTab}
              />
            )}

            {currentRole === 'academia' && (
              <AcademiaDashboard onNavigate={handleSelectTab} />
            )}

            {currentRole === 'industry' && (
              <IndustryDashboard
                onPostOpportunity={handlePostOpportunity}
                activeInternshipsCount={opportunities.filter((o) => o.type === 'Internship').length}
                jobPostsCount={opportunities.filter((o) => o.type === 'Job').length}
                applicationsCount={28}
                matchedCandidatesCount={14}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleSelectTab}
        onSelectRole={handleChangeRole}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialRole={currentRole}
      />
    </div>
  );
}
