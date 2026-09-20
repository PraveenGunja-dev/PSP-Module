import { useState } from 'react';
import { 
  FileSpreadsheet, 
  LogOut, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  BarChart3,
  Users,
  ClipboardList,
  TrendingUp,
  Package,
  Cpu,
  FileCheck,
  Grid3x3,
  ChevronRight,
  AlertTriangle,
  Calendar,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from './ui/button';
import { NotificationPanel } from './NotificationPanel';
import { getProjectNotifications } from '../lib/notificationData';
import { ReportsView } from './ReportsView';
import { AdminAnalyticsCharts } from './AdminAnalyticsCharts';
import adaniLogo from 'figma:asset/6f29c1a0f289e97c582d0783215dfe3554c97f37.png';

interface SheetData {
  name: string;
  status: 'draft' | 'submitted' | 'approved' | 'pushed';
  lastApprovedDate?: string;
}

interface DashboardProps {
  projectName: string;
  userName: string;
  userRole: 'supervisor' | 'sitepm' | 'admin';
  sheets: SheetData[];
  onSheetClick: (sheetName: string) => void;
  onLogout: () => void;
  projectDates?: {
    planStart: string;
    planEnd: string;
    actualStart: string;
    actualEnd: string;
  };
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function Dashboard({ projectName, userName, userRole, sheets, onSheetClick, onLogout, projectDates, theme, onToggleTheme }: DashboardProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'live' | 'reports'>('live');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'submitted' | 'approved'>('all');
  const projectNotifications = getProjectNotifications(projectName, sheets);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return { bg: '#f59e0b', text: 'DRAFT' };
      case 'submitted': return { bg: '#3b82f6', text: 'SUBMITTED' };
      case 'approved': return { bg: '#10b981', text: 'APPROVED' };
      case 'pushed': return { bg: '#8b5cf6', text: 'PUSHED' };
      default: return { bg: '#6b7280', text: status };
    }
  };

  const getSheetIcon = (sheetName: string) => {
    switch (sheetName) {
      case 'Summary': return <BarChart3 className="w-5 h-5" />;
      case 'Vendor Block': return <Package className="w-5 h-5" />;
      case 'DP IDT': return <ClipboardList className="w-5 h-5" />;
      case 'DP Qty': return <TrendingUp className="w-5 h-5" />;
      case 'DP BLOCK': return <Grid3x3 className="w-5 h-5" />;
      case 'Manpower': return <Users className="w-5 h-5" />;
      case 'Resource': return <Cpu className="w-5 h-5" />;
      case 'MMS & RFI': return <FileCheck className="w-5 h-5" />;
      case 'Issue Log Sheet': return <AlertTriangle className="w-5 h-5" />;
      default: return <FileSpreadsheet className="w-5 h-5" />;
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'supervisor': return 'Site Supervisor';
      case 'sitepm': return 'Site PM';
      case 'admin': return 'PMAG Admin';
      default: return role;
    }
  };

  const totalSheets = sheets.filter(s => s.name !== 'Add Sheet').length;
  const approvedSheets = sheets.filter(s => s.status === 'approved' || s.status === 'pushed').length;
  const submittedSheets = sheets.filter(s => s.status === 'submitted').length;
  const draftSheets = sheets.filter(s => s.status === 'draft' || s.status === 'rejected').length;

  const filteredSheets = sheets.filter(s => {
    if (s.name === 'Add Sheet') return false;
    if (statusFilter === 'all') return true;
    if (statusFilter === 'draft') return s.status === 'draft' || s.status === 'rejected';
    if (statusFilter === 'submitted') return s.status === 'submitted';
    if (statusFilter === 'approved') return s.status === 'approved' || s.status === 'pushed';
    return true;
  });

  const isLight = theme === 'light';

  return (
    <div className="min-h-screen flex flex-col overflow-y-auto" style={{ background: isLight ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #dbeafe 100%)' : '#1a1625' }}>
      {/* Header */}
      <header className="relative z-50 shadow-lg p-4 border-b-2" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)', borderColor: '#7C3A8A' }}>
        <div className="max-w-[1800px] mx-auto">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-lg">
                <img src={adaniLogo} alt="Adani Renewables" className="h-9 w-auto object-contain" />
              </div>
              <div className="border-l-2 border-white/30 pl-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl text-white font-bold">{projectName}</h1>
                  <span className="bg-white/20 text-white text-xs px-2.5 py-0.5 rounded-full font-semibold border border-white/30">
                    PSP Module
                  </span>
                </div>
                <p className="text-pink-200 text-xs mt-0.5">Project Dashboard • Progress Status Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {userRole === 'admin' && (
                <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/20 backdrop-blur-md mr-2">
                  <button
                    onClick={() => onSheetClick(sheets.find(s => s.name !== 'Add Sheet')?.name || 'Main Work-Summary')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeAdminTab === 'live'
                        ? 'bg-white text-purple-950 shadow-md scale-105'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Grid3x3 className="w-3.5 h-3.5" />
                    Live Sheets
                  </button>
                  <button
                    onClick={() => setActiveAdminTab('reports')}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeAdminTab === 'reports'
                        ? 'bg-emerald-500 text-white shadow-md scale-105'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    Reports
                  </button>
                </div>
              )}
              <Button
                onClick={onToggleTheme}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 p-3 rounded-xl"
              >
                {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              <NotificationPanel notifications={projectNotifications} theme={theme} />
              <div className="text-right px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-white text-sm">{userName}</p>
                <p className="text-xs text-pink-200">{getRoleDisplay(userRole)}</p>
              </div>
              <Button 
                onClick={onLogout}
                className="bg-slate-800/80 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md shadow-lg rounded-xl px-4 py-2"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
          
          {projectDates && (
            <div className="grid grid-cols-4 gap-2">
              <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-pink-200 uppercase tracking-wider mb-0.5">Plan Start</p>
                <p className="text-white text-sm">{projectDates.planStart}</p>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-pink-200 uppercase tracking-wider mb-0.5">Plan End</p>
                <p className="text-white text-sm">{projectDates.planEnd}</p>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-pink-200 uppercase tracking-wider mb-0.5">Actual Start</p>
                <p className="text-white text-sm">{projectDates.actualStart}</p>
              </div>
              <div className="px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <p className="text-xs text-pink-200 uppercase tracking-wider mb-0.5">Actual End</p>
                <p className="text-white text-sm">{projectDates.actualEnd}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 p-6 overflow-hidden">
        <div className="max-w-[1800px] mx-auto h-full flex flex-col">
          {userRole === 'admin' && activeAdminTab === 'reports' ? (
            <ReportsView projectName={projectName} theme={theme} />
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div 
                  onClick={() => setStatusFilter('all')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer shadow-md hover:shadow-xl ${
                    statusFilter === 'all' 
                      ? (isLight ? 'ring-2 ring-purple-500 border-purple-500 scale-[1.02] bg-purple-50/80' : 'ring-2 ring-purple-400 border-purple-400 scale-[1.02] bg-purple-950/80')
                      : (isLight ? 'bg-white border-blue-200 hover:border-blue-400' : 'bg-gray-900 border-purple-900/50 hover:border-purple-700')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-1 ${isLight ? 'text-gray-600 font-semibold' : 'text-purple-200 font-semibold'}`}>Total Sheets</p>
                      <p className={`text-3xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{totalSheets}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
                      <FileSpreadsheet className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('draft')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer shadow-md hover:shadow-xl ${
                    statusFilter === 'draft' 
                      ? (isLight ? 'ring-2 ring-amber-500 border-amber-500 scale-[1.02] bg-amber-50/80' : 'ring-2 ring-amber-400 border-amber-400 scale-[1.02] bg-amber-950/80')
                      : (isLight ? 'bg-white border-amber-200 hover:border-amber-400' : 'bg-gray-900 border-purple-900/50 hover:border-purple-700')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-1 ${isLight ? 'text-amber-700 font-semibold' : 'text-amber-300 font-semibold'}`}>Draft</p>
                      <p className={`text-3xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{draftSheets}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-500 shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('submitted')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer shadow-md hover:shadow-xl ${
                    statusFilter === 'submitted' 
                      ? (isLight ? 'ring-2 ring-cyan-500 border-cyan-500 scale-[1.02] bg-cyan-50/80' : 'ring-2 ring-cyan-400 border-cyan-400 scale-[1.02] bg-cyan-950/80')
                      : (isLight ? 'bg-white border-cyan-200 hover:border-cyan-400' : 'bg-gray-900 border-purple-900/50 hover:border-purple-700')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-1 ${isLight ? 'text-cyan-700 font-semibold' : 'text-cyan-300 font-semibold'}`}>Submitted</p>
                      <p className={`text-3xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{submittedSheets}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500 shadow-lg">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setStatusFilter('approved')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer shadow-md hover:shadow-xl ${
                    statusFilter === 'approved' 
                      ? (isLight ? 'ring-2 ring-emerald-500 border-emerald-500 scale-[1.02] bg-emerald-50/80' : 'ring-2 ring-emerald-400 border-emerald-400 scale-[1.02] bg-emerald-950/80')
                      : (isLight ? 'bg-white border-emerald-200 hover:border-emerald-400' : 'bg-gray-900 border-purple-900/50 hover:border-purple-700')
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs uppercase tracking-wider mb-1 ${isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-300 font-semibold'}`}>Approved</p>
                      <p className={`text-3xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>{approvedSheets}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-500 shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sheets Grid / List */}
              <div data-aos="fade-up" data-aos-delay="200" className={`flex-1 rounded-2xl p-6 shadow-xl border-2 overflow-hidden flex flex-col ${
                isLight 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gray-900 border-purple-900/50'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className={`text-xl font-bold flex items-center gap-2 ${isLight ? 'text-gray-800' : 'text-white'}`}>
                      Project Sheets Overview
                      {statusFilter !== 'all' && (
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          isLight 
                            ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                            : 'bg-purple-900/60 text-purple-200 border border-purple-700'
                        }`}>
                          Filtered: {statusFilter.toUpperCase()}
                        </span>
                      )}
                    </h2>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                      {statusFilter === 'all' ? 'Showing all sheets. Click any KPI card above to filter dynamically.' : `Filtered by ${statusFilter} status. Click any card to switch filter.`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusFilter !== 'all' && (
                      <button
                        onClick={() => setStatusFilter('all')}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                          isLight 
                            ? 'text-purple-600 border-purple-300 hover:bg-purple-50' 
                            : 'text-purple-300 border-purple-700 hover:bg-purple-900/40'
                        }`}
                      >
                        Reset Filter
                      </button>
                    )}
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${
                      isLight 
                        ? 'bg-gray-100 text-gray-700 border-gray-300' 
                        : 'bg-purple-900/30 text-purple-200 border-purple-700'
                    }`}>
                      {filteredSheets.length} / {totalSheets} Sheets
                    </span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b-2 ${
                        isLight 
                          ? 'border-gray-200 text-gray-600 bg-gray-50' 
                          : 'border-purple-900/50 text-purple-200 bg-purple-950/30'
                      }`}>
                        <th className="p-3 text-xs uppercase tracking-wider">Sheet Name</th>
                        <th className="p-3 text-xs uppercase tracking-wider">Status</th>
                        <th className="p-3 text-xs uppercase tracking-wider">Last Modified / Approved</th>
                        <th className="p-3 text-xs uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSheets.map((sheet) => {
                        const statusConfig = getStatusColor(sheet.status);
                        return (
                          <tr 
                            key={sheet.name}
                            onClick={() => onSheetClick(sheet.name)}
                            className={`border-b transition-all cursor-pointer group ${
                              isLight 
                                ? 'border-gray-100 hover:bg-blue-50/50' 
                                : 'border-purple-900/30 hover:bg-purple-900/20'
                            }`}
                          >
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                  isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/50 text-pink-300'
                                }`}>
                                  {getSheetIcon(sheet.name)}
                                </div>
                                <span className={`font-semibold ${isLight ? 'text-gray-800' : 'text-white'}`}>{sheet.name}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-semibold text-white inline-block shadow-sm"
                                style={{ backgroundColor: statusConfig.bg }}
                              >
                                {statusConfig.text}
                              </span>
                            </td>
                            <td className="p-3">
                              <span className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                {sheet.lastApprovedDate ? new Date(sheet.lastApprovedDate).toLocaleString() : 'Recently updated'}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isLight 
                                  ? 'bg-gray-100 group-hover:bg-blue-100' 
                                  : 'bg-gray-800 group-hover:bg-purple-900/50'
                              }`}>
                                <ChevronRight className={`w-5 h-5 group-hover:translate-x-0.5 transition-all ${
                                  isLight ? 'text-gray-600 group-hover:text-blue-600' : 'text-gray-400 group-hover:text-pink-400'
                                }`} />
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admin Analytics Section: Bar Graph, Pie Chart & Heatmap Heap Graph */}
              {userRole === 'admin' && (
                <AdminAnalyticsCharts projectName={projectName} theme={theme} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
