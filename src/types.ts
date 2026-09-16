export type UserRole = 'student' | 'academia' | 'industry';

export type NavTab = 
  | 'home'
  | 'assessment'
  | 'mapping'
  | 'opportunities'
  | 'dashboard'
  | 'collaboration';

export interface UserProfile {
  name: string;
  role: UserRole;
  email: string;
  organization?: string; // College or Company
  avatar?: string;
}

export type SkillLevel = 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced';

export interface AssessmentQuestion {
  id: string;
  category: 'technical' | 'soft';
  domain: string; // e.g. Programming, Database, Communication
  question: string;
  options: {
    label: SkillLevel;
    points: number; // 25, 50, 75, 100
    description: string;
  }[];
}

export interface SkillProfileItem {
  skill: string;
  levelPercentage: number;
  category: 'technical' | 'soft';
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  recommendedLearning: {
    topic: string;
    type: 'Course' | 'Certification' | 'Project';
    duration: string;
    provider: string;
  }[];
  avgSalary?: string;
  marketDemand?: 'Very High' | 'High' | 'Growing';
}

export type OpportunityType = 'Internship' | 'Job' | 'Project';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  type: OpportunityType;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  duration: string;
  stipendOrSalary: string;
  requiredSkills: string[];
  description: string;
  postedDate: string;
  applied?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  college: string;
  degree: string;
  year: string;
  matchScore: number;
  verifiedSkills: string[];
  availableFor: string;
  email: string;
}

export interface AcademiaMetric {
  totalStudents: number;
  avgSkillScore: number;
  commonSkillGaps: number;
  industryCollaborations: number;
}
