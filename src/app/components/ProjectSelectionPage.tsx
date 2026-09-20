import { useState } from 'react';
import { Building2, Calendar, ChevronRight, TrendingUp, Users, Sun, Moon, UserPlus, UserCheck } from 'lucide-react';
import { Button } from './ui/button';
import { NotificationPanel } from './NotificationPanel';
import { allNotifications } from '../lib/notificationData';
import { AddUserDialog, type ManagedRole } from './AddUserDialog';
import { AssignUserDialog, type ManagedUser } from './AssignUserDialog';
import adaniLogo from 'figma:asset/6f29c1a0f289e97c582d0783215dfe3554c97f37.png';

interface ProjectSelectionPageProps {
  onFetch: (project: string, planStart: string, planEnd: string, actualStart: string, actualEnd: string) => void;
  userName: string;
  userRole: string;
  currentRole: 'supervisor' | 'sitepm' | 'admin';
  users: ManagedUser[];
  onAddUser: (name: string, role: ManagedRole) => void;
  onAssignProject: (userId: string, projectName: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function ProjectSelectionPage({ onFetch, userName, userRole, currentRole, users, onAddUser, onAssignProject, theme, onToggleTheme }: ProjectSelectionPageProps) {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [assignProject, setAssignProject] = useState<string | null>(null);

  // PMAG admins can add/assign Site PMs and Supervisors; Site PMs can add/assign Supervisors only
  const assignableRoles: ManagedRole[] =
    currentRole === 'admin' ? ['sitepm', 'supervisor'] :
    currentRole === 'sitepm' ? ['supervisor'] : [];
  const canManageUsers = assignableRoles.length > 0;
  const assignableUsers = users.filter(u => assignableRoles.includes(u.role));
  const projects = [
    { 
      name: 'Project Gandikota - Phase 1',
      planStart: '2025-01-01',
      planEnd: '2025-12-31',
      actualStart: '2025-01-15',
      actualEnd: '2025-10-29'
    },
    { 
      name: 'Project Kalahandi - Phase 2',
      planStart: '2025-02-01',
      planEnd: '2025-11-30',
      actualStart: '2025-02-10',
      actualEnd: '2025-09-15'
    },
    { 
      name: 'Project Bilaspur - Site A',
      planStart: '2025-03-01',
      planEnd: '2026-02-28',
      actualStart: '2025-03-15',
      actualEnd: '2025-12-20'
    },
    { 
      name: 'Project Sivasagar - Block B',
      planStart: '2025-01-10',
      planEnd: '2025-10-15',
      actualStart: '2025-01-20',
      actualEnd: '2025-08-30'
    },
    { 
      name: 'Project Deogarh - Site C',
      planStart: '2025-04-01',
      planEnd: '2026-03-31',
      actualStart: '2025-04-10',
      actualEnd: '2025-11-25'
    },
    { 
      name: 'Project Chikmagalur - Zone D',
      planStart: '2025-05-01',
      planEnd: '2026-04-30',
      actualStart: '2025-05-15',
      actualEnd: '2026-01-10'
    }
  ];

  const handleProjectClick = (project: typeof projects[0]) => {
    onFetch(project.name, project.planStart, project.planEnd, project.actualStart, project.actualEnd);
  };

  const isLight = theme === 'light';

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: isLight ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)' : '#1a1625' }}>
      {/* Header */}
      <header className="relative z-50 shadow-lg p-4 border-b-2" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)', borderColor: '#7C3A8A' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg">
              <img src={adaniLogo} alt="Adani Renewables" className="h-10 w-auto object-contain" />
            </div>
            <div className="border-l-2 border-white/30 pl-4">
              <h1 className="text-2xl text-white">Project Management Hub</h1>
              <p className="text-sm text-pink-200">Welcome, {userName} • {userRole.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {canManageUsers && (
              <Button
                onClick={() => setAddUserOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl px-4 py-2"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            )}
            <Button
              onClick={onToggleTheme}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 p-3 rounded-xl"
            >
              {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <NotificationPanel notifications={allNotifications} theme={theme} />
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <div className="mb-8">
            <h2 className={`text-4xl mb-2 ${isLight ? 'text-gray-800' : 'text-white'}`}>Your Projects</h2>
            <p className={`text-lg ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>Select a project to access dashboards and data sheets</p>
          </div>

          <div className="space-y-2">
            {projects.map((project, index) => (
              <div
                key={project.name}
                className={`cursor-pointer group relative overflow-hidden rounded-lg border-2 transition-all duration-300 hover:shadow-lg ${ 
                  isLight 
                    ? 'bg-white border-blue-200 hover:border-blue-400' 
                    : 'bg-gradient-to-r from-purple-950/50 to-pink-950/30 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ background: isLight ? 'linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 197, 253, 0.05) 100%)' : 'linear-gradient(90deg, rgba(117, 71, 156, 0.15) 0%, rgba(189, 56, 97, 0.15) 100%)' }}></div>
                
                <div className="relative p-4">
                  <div className="flex items-center justify-between gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform flex-shrink-0" 
                      style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Project Name and Dates - All in one line */}
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <h3 className={`text-lg transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                        isLight 
                          ? 'text-gray-800 group-hover:text-blue-600' 
                          : 'text-white group-hover:text-pink-300'
                      }`} style={{ minWidth: '300px', maxWidth: '300px' }}>
                        {project.name}
                      </h3>
                      
                      {/* Planned Dates */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          isLight ? 'bg-emerald-100' : 'bg-emerald-900/30'
                        }`}>
                          <Calendar className={`w-3.5 h-3.5 ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`} />
                        </div>
                        <div>
                          <span className={`text-xs uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'} mr-2`}>Plan:</span>
                          <span className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{project.planStart} → {project.planEnd}</span>
                        </div>
                      </div>
                      
                      {/* Actual Dates */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                          isLight ? 'bg-blue-100' : 'bg-purple-900/30'
                        }`}>
                          <TrendingUp className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-purple-400'}`} />
                        </div>
                        <div>
                          <span className={`text-xs uppercase tracking-wider ${isLight ? 'text-gray-500' : 'text-gray-400'} mr-2`}>Actual:</span>
                          <span className={`text-sm ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{project.actualStart} → {project.actualEnd}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Team Count, Assign and Arrow */}
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="flex items-center gap-2">
                        <Users className={`w-4 h-4 ${isLight ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`text-sm ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{12 + index * 3} members</span>
                      </div>

                      {canManageUsers && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAssignProject(project.name);
                          }}
                          className="text-white px-3 py-1.5 h-auto rounded-lg text-xs"
                          style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}
                        >
                          <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                          Assign
                        </Button>
                      )}

                      <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                        isLight 
                          ? 'bg-blue-50 group-hover:bg-blue-100' 
                          : 'bg-purple-900/30 group-hover:bg-purple-900/50'
                      }`}>
                        <ChevronRight className={`w-5 h-5 group-hover:translate-x-1 transition-all ${
                          isLight ? 'text-blue-600' : 'text-pink-400'
                        }`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddUserDialog
        open={addUserOpen}
        onOpenChange={setAddUserOpen}
        availableRoles={assignableRoles}
        onSubmit={onAddUser}
      />

      <AssignUserDialog
        open={assignProject !== null}
        onOpenChange={(open) => !open && setAssignProject(null)}
        projectName={assignProject || ''}
        users={assignableUsers}
        onSubmit={(userId) => assignProject && onAssignProject(userId, assignProject)}
      />
    </div>
  );
}
