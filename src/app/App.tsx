import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { ProjectSelectionPage } from './components/ProjectSelectionPage';
import { Dashboard } from './components/Dashboard';
import { SheetViewPage } from './components/SheetViewPage';
import { Toaster } from './components/ui/sonner';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Page = 'login' | 'project-selection' | 'dashboard' | 'sheet-view';
type UserRole = 'supervisor' | 'sitepm' | 'admin';
type ManagedRole = 'sitepm' | 'supervisor';

interface ManagedUser {
  id: string;
  name: string;
  role: ManagedRole;
  projects: string[];
}

interface SheetData {
  name: string;
  status: 'draft' | 'submitted' | 'approved' | 'pushed' | 'rejected';
  lastApprovedDate?: string;
  rejectionRemarks?: string;
  highlightedCells?: Set<string>;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('supervisor');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedSheet, setSelectedSheet] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [projectDates, setProjectDates] = useState({
    planStart: '',
    planEnd: '',
    actualStart: '',
    actualEnd: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Users managed by PMAG admins and Site PMs
  const [users, setUsers] = useState<ManagedUser[]>([
    { id: 'u1', name: 'Rahul Sharma', role: 'sitepm', projects: [] },
    { id: 'u2', name: 'Priya Nair', role: 'supervisor', projects: [] },
    { id: 'u3', name: 'Arjun Mehta', role: 'supervisor', projects: [] },
  ]);

  const handleAddUser = (name: string, role: ManagedRole) => {
    setUsers(prev => [...prev, { id: `u${Date.now()}`, name, role, projects: [] }]);
  };

  const handleAssignProject = (userId: string, projectName: string) => {
    setUsers(prev => prev.map(u =>
      u.id === userId && !u.projects.includes(projectName)
        ? { ...u, projects: [...u.projects, projectName] }
        : u
    ));
  };

  // Initialize sheets with statuses
  const [sheets, setSheets] = useState<SheetData[]>([
    { name: 'Main Work-Summary', status: 'draft' },
    { name: 'BOQ Details', status: 'draft' },
    { name: 'DPR of Main work', status: 'submitted' },
    { name: 'LM Status', status: 'draft' },
    { name: 'Manpower', status: 'approved', lastApprovedDate: '2025-10-25T10:30:00' },
    { name: 'Plant & Machinery', status: 'draft' },
    { name: 'Breakdown Reports', status: 'draft' },
    { name: 'Comments', status: 'draft' },
    { name: 'Hindrance', status: 'draft' },
    { name: 'Add Sheet', status: 'draft' }
  ]);

  const handleLogin = (username: string, role: UserRole) => {
    setUserName(username);
    setUserRole(role);
    setCurrentPage('project-selection');
  };

  const handleProjectFetch = (
    project: string, 
    planStart: string, 
    planEnd: string, 
    actualStart: string, 
    actualEnd: string
  ) => {
    setSelectedProject(project);
    setProjectDates({ planStart, planEnd, actualStart, actualEnd });
    
    // Supervisors go directly to the first sheet, others to dashboard
    if (userRole === 'supervisor') {
      const firstSheet = sheets.find(s => s.name !== 'Add Sheet');
      if (firstSheet) {
        setSelectedSheet(firstSheet.name);
        setCurrentPage('sheet-view');
      } else {
        setCurrentPage('dashboard');
      }
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleSheetClick = (sheetName: string) => {
    if (sheetName === 'Add Sheet') {
      // Future: Open dialog to create new sheet
      return;
    }
    setSelectedSheet(sheetName);
    setCurrentPage('sheet-view');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleStatusChange = (newStatus: string, remarks?: string) => {
    setSheets(sheets.map(sheet => 
      sheet.name === selectedSheet 
        ? { 
            ...sheet, 
            status: newStatus as SheetData['status'],
            lastApprovedDate: (newStatus === 'approved' || newStatus === 'pushed') 
              ? new Date().toISOString() 
              : sheet.lastApprovedDate,
            rejectionRemarks: newStatus === 'rejected' ? remarks : undefined,
            // Clear highlighted cells when status changes to draft (rejected) or when resubmitted
            highlightedCells: (newStatus === 'rejected' || newStatus === 'submitted') ? undefined : sheet.highlightedCells
          }
        : sheet
    ));
  };

  const handleLogout = () => {
    setCurrentPage('login');
    setUserName('');
    setSelectedProject('');
    setSelectedSheet('');
    setProjectDates({ planStart: '', planEnd: '', actualStart: '', actualEnd: '' });
  };

  const getCurrentSheetStatus = () => {
    const sheet = sheets.find(s => s.name === selectedSheet);
    return sheet?.status || 'draft';
  };

  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case 'supervisor':
        return 'Site Supervisor';
      case 'sitepm':
        return 'Site PM';
      case 'admin':
        return 'PMAG Admin';
      default:
        return role;
    }
  };

  return (
    <>
      {currentPage === 'login' && (
        <LoginPage onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />
      )}
      
      {currentPage === 'project-selection' && (
        <ProjectSelectionPage
          onFetch={handleProjectFetch}
          userName={userName}
          userRole={getRoleDisplay(userRole)}
          currentRole={userRole}
          users={users}
          onAddUser={handleAddUser}
          onAssignProject={handleAssignProject}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <Dashboard 
          projectName={selectedProject}
          userName={userName}
          userRole={userRole}
          sheets={sheets}
          onSheetClick={handleSheetClick}
          onLogout={handleLogout}
          projectDates={projectDates}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      
      {currentPage === 'sheet-view' && (
        <SheetViewPage 
          sheetName={selectedSheet}
          projectName={selectedProject}
          userRole={userRole}
          allSheets={sheets}
          currentSheetStatus={getCurrentSheetStatus()}
          onBack={handleBackToDashboard}
          onStatusChange={handleStatusChange}
          onSheetChange={setSelectedSheet}
          onLogout={handleLogout}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      
      <Toaster position="top-right" />
    </>
  );
}