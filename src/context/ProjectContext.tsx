import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, DetailTabId, ActiveModuleId, Milestone, Task, ProjectDocument, TeamMember } from '../types';
import { INITIAL_PROJECTS } from '../data/seedData';

interface ProjectContextType {
  projects: Project[];
  activeModule: ActiveModuleId;
  activeProjectId: string | null;
  activeDetailTab: DetailTabId;
  selectedMilestoneId: string | null;
  viewMode: 'list' | 'grid';
  isSidebarCollapsed: boolean;
  theme: string;
  isAuthenticated: boolean;

  // Filters
  searchQuery: string;
  statusFilter: string;
  cityFilter: string;
  sortOption: string;

  // Setters & Actions
  setActiveModule: (module: ActiveModuleId) => void;
  selectProject: (id: string | null) => void;
  setActiveDetailTab: (tab: DetailTabId) => void;
  setSelectedMilestoneId: (id: string | null) => void;
  setViewMode: (mode: 'list' | 'grid') => void;
  toggleSidebar: () => void;
  setTheme: (theme: string) => void;
  login: () => void;
  logout: () => void;

  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: string) => void;
  setCityFilter: (c: string) => void;
  setSortOption: (sort: string) => void;

  // Domain mutations on local mock state
  addProject: (newProj: Omit<Project, 'id' | 'milestones' | 'documents' | 'clientDetails' | 'teamMembers'>) => void;
  toggleTaskCompletion: (projectId: string, milestoneId: string, taskId: string) => void;
  addTaskToMilestone: (projectId: string, milestoneId: string, task: Omit<Task, 'id' | 'milestoneId'>) => void;
  addMilestoneToProject: (projectId: string, milestone: Omit<Milestone, 'id' | 'tasks' | 'openTaskCount' | 'doneTaskCount'>) => void;
  addDocumentToProject: (projectId: string, document: Omit<ProjectDocument, 'id'>) => void;
  addTeamMemberToProject: (projectId: string, member: Omit<TeamMember, 'id'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activeModule, setActiveModule] = useState<ActiveModuleId>('projects');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<DetailTabId>('overview');
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>('ms-101');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [theme, setThemeState] = useState<string>('blue');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All Cities');
  const [sortOption, setSortOption] = useState<string>('Date (Newest)');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'obsidian') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
  };

  const selectProject = (id: string | null) => {
    const proj = projects.find((p) => p.id === id);
    const firstMsId = proj?.milestones[0]?.id || null;
    setActiveProjectId(id);
    setActiveModule('projects');
    setActiveDetailTab('overview');
    setSelectedMilestoneId(firstMsId);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const addProject = (newProj: Omit<Project, 'id' | 'milestones' | 'documents' | 'clientDetails' | 'teamMembers'>) => {
    const id = `proj-${Date.now()}`;
    const initials = newProj.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
    const created: Project = {
      ...newProj,
      id,
      avatarInitials: initials,
      milestones: [],
      documents: [],
      clientDetails: {
        name: newProj.client,
        role: 'Client Representative',
        email: 'client@valueconstructions.in',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        billingAddress: newProj.location,
        gstin: '29AAACV0000E1Z0',
        pan: 'AAACV0000E',
        preferredHours: '10:00 AM – 06:00 PM IST',
        avatarInitials: 'CL',
      },
      teamMembers: [],
    };
    setProjects((prev) => [created, ...prev]);
  };

  const toggleTaskCompletion = (projectId: string, milestoneId: string, taskId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((ms) => {
          if (ms.id !== milestoneId) return ms;
          const updatedTasks = ms.tasks.map((t) => {
            if (t.id !== taskId) return t;
            return { ...t, completed: !t.completed };
          });
          const doneCount = updatedTasks.filter((t) => t.completed).length;
          const openCount = updatedTasks.length - doneCount;
          const pct = updatedTasks.length === 0 ? 0 : Math.round((doneCount / updatedTasks.length) * 100);
          return {
            ...ms,
            tasks: updatedTasks,
            doneTaskCount: doneCount,
            openTaskCount: openCount,
            completionPercentage: pct,
          };
        });
        return { ...proj, milestones: updatedMilestones };
      })
    );
  };

  const addTaskToMilestone = (projectId: string, milestoneId: string, taskData: Omit<Task, 'id' | 'milestoneId'>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const updatedMilestones = proj.milestones.map((ms) => {
          if (ms.id !== milestoneId) return ms;
          const newTask: Task = {
            ...taskData,
            id: `tsk-${Date.now()}`,
            milestoneId,
          };
          const updatedTasks = [...ms.tasks, newTask];
          const doneCount = updatedTasks.filter((t) => t.completed).length;
          const openCount = updatedTasks.length - doneCount;
          const pct = Math.round((doneCount / updatedTasks.length) * 100);
          return {
            ...ms,
            tasks: updatedTasks,
            taskCount: updatedTasks.length,
            doneTaskCount: doneCount,
            openTaskCount: openCount,
            completionPercentage: pct,
          };
        });
        return { ...proj, milestones: updatedMilestones };
      })
    );
  };

  const addMilestoneToProject = (
    projectId: string,
    msData: Omit<Milestone, 'id' | 'tasks' | 'openTaskCount' | 'doneTaskCount'>
  ) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newMs: Milestone = {
          ...msData,
          id: `ms-${Date.now()}`,
          tasks: [],
          openTaskCount: msData.taskCount || 0,
          doneTaskCount: 0,
        };
        return { ...proj, milestones: [...proj.milestones, newMs] };
      })
    );
  };

  const addDocumentToProject = (projectId: string, docData: Omit<ProjectDocument, 'id'>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const newDoc: ProjectDocument = {
          ...docData,
          id: `doc-${Date.now()}`,
        };
        return { ...proj, documents: [newDoc, ...proj.documents] };
      })
    );
  };

  const addTeamMemberToProject = (projectId: string, memberData: Omit<TeamMember, 'id'>) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        const initials = memberData.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();
        const newMem: TeamMember = {
          ...memberData,
          id: `tm-${Date.now()}`,
          avatarInitials: initials,
        };
        return { ...proj, teamMembers: [...proj.teamMembers, newMem] };
      })
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        activeModule,
        activeProjectId,
        activeDetailTab,
        selectedMilestoneId,
        viewMode,
        isSidebarCollapsed,
        theme,
        isAuthenticated,
        searchQuery,
        statusFilter,
        cityFilter,
        sortOption,
        setActiveModule,
        selectProject,
        setActiveDetailTab,
        setSelectedMilestoneId,
        setViewMode,
        toggleSidebar,
        setTheme,
        login,
        logout,
        setSearchQuery,
        setStatusFilter,
        setCityFilter,
        setSortOption,
        addProject,
        toggleTaskCompletion,
        addTaskToMilestone,
        addMilestoneToProject,
        addDocumentToProject,
        addTeamMemberToProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};
