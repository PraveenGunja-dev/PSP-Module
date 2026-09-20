import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Save, Send, CheckCircle, Upload, History, LogOut, Plus, Sun, Moon, XCircle, Highlighter, Edit3, Grid3x3, FileSpreadsheet } from 'lucide-react';
import { ExcelGrid } from './ExcelGrid';
import { ResourceGrid } from './ResourceGrid';
import { CreateIssueDialog, IssueData } from './CreateIssueDialog';
import { RejectDialog } from './RejectDialog';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { getSheetConfig, getColumnsWithDates, getYesterdayDate, getTodayDate } from '../lib/sheetConfigs';
import { generateSampleData } from '../lib/sampleDataGenerator';
import { HistoryDialog } from './HistoryDialog';
import { IssueLogDialog } from './IssueLogDialog';
import { ReportsView } from './ReportsView';
import { NotificationPanel } from './NotificationPanel';
import { getProjectNotifications } from '../lib/notificationData';
import adaniLogo from 'figma:asset/6f29c1a0f289e97c582d0783215dfe3554c97f37.png';

interface SheetViewPageProps {
  sheetName: string;
  projectName: string;
  userRole: 'supervisor' | 'sitepm' | 'admin';
  allSheets: { name: string; status: 'draft' | 'submitted' | 'approved' | 'pushed' | 'rejected' }[];
  currentSheetStatus: 'draft' | 'submitted' | 'approved' | 'pushed' | 'rejected';
  onBack: () => void;
  onStatusChange: (status: string, remarks?: string) => void;
  onSheetChange: (sheetName: string) => void;
  onLogout?: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export function SheetViewPage({ 
  sheetName, 
  projectName, 
  userRole, 
  allSheets,
  currentSheetStatus,
  onBack,
  onStatusChange,
  onSheetChange,
  onLogout,
  theme,
  onToggleTheme
}: SheetViewPageProps) {
  const [activeAdminTab, setActiveAdminTab] = useState<'live' | 'reports'>('live');
  const [activeSheet, setActiveSheet] = useState(sheetName);
  
  // Synchronously initialize data for all sheets so data is loaded instantly on mount
  const [sheetData, setSheetData] = useState<Record<string, any[]>>(() => {
    const initialData: Record<string, any[]> = {};
    allSheets.forEach(sheet => {
      if (sheet.name !== 'Add Sheet') {
        initialData[sheet.name] = generateSampleData(sheet.name, 8);
      }
    });
    return initialData;
  });

  const [showHistory, setShowHistory] = useState(false);
  const [showCreateIssue, setShowCreateIssue] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState<Record<string, Set<string>>>({});
  const [reviewMode, setReviewMode] = useState<'highlight' | 'edit'>('highlight'); // For SitePM review mode

  const projectNotifications = getProjectNotifications(projectName, allSheets);

  // Keep activeSheet in sync if sheetName prop changes
  useEffect(() => {
    setActiveSheet(sheetName);
  }, [sheetName]);

  // Ensure sheetData is populated for new or missing sheets
  useEffect(() => {
    if (!sheetData[activeSheet]) {
      setSheetData(prev => ({
        ...prev,
        [activeSheet]: generateSampleData(activeSheet, 8)
      }));
    }
  }, [activeSheet, sheetData]);

  // Get current sheet configuration
  const currentConfig = getSheetConfig(activeSheet);
  const currentColumns = getColumnsWithDates(activeSheet);

  const currentData = sheetData[activeSheet] || generateSampleData(activeSheet, 8);

  const handleSheetChange = (newSheet: string) => {
    setActiveSheet(newSheet);
    onSheetChange(newSheet);
  };

  // Determine if user can edit
  const canEdit = () => {
    const currentSheet = allSheets.find(s => s.name === activeSheet);
    if (!currentSheet) return false;
    
    if (userRole === 'admin') return true;
    if (userRole === 'supervisor' && (currentSheet.status === 'draft' || currentSheet.status === 'rejected')) return true;
    // SitePM can edit only in edit mode
    if (userRole === 'sitepm' && currentSheet.status === 'submitted' && reviewMode === 'edit') return true;
    return false;
  };

  // Determine if user can highlight (SitePM reviewing submitted sheets)
  const canHighlight = () => {
    const currentSheet = allSheets.find(s => s.name === activeSheet);
    if (!currentSheet) return false;
    // SitePM can highlight only in highlight mode
    return userRole === 'sitepm' && currentSheet.status === 'submitted' && reviewMode === 'highlight';
  };

  // Check if SitePM is reviewing
  const isReviewing = () => {
    const currentSheet = allSheets.find(s => s.name === activeSheet);
    if (!currentSheet) return false;
    return userRole === 'sitepm' && currentSheet.status === 'submitted';
  };

  const handleSave = () => {
    toast.success('Changes saved successfully!');
  };

  const handleSubmit = () => {
    // Clear highlights when submitting
    setHighlightedCells({
      ...highlightedCells,
      [activeSheet]: new Set()
    });
    onStatusChange('submitted');
    toast.success('Sheet submitted for PM approval!');
  };

  const handleApprove = () => {
    const approvalDate = new Date().toISOString();
    onStatusChange('approved');
    toast.success('Sheet approved! Forwarded to PMAG Admin.');
  };

  const handlePushToP6 = async () => {
    toast.loading('Pushing data to P6 database...');
    await new Promise(resolve => setTimeout(resolve, 2000));
    onStatusChange('pushed');
    toast.success('Data successfully pushed to P6 database!');
  };

  const handleCreateIssue = (issueData: IssueData) => {
    // Add new issue to Break Down Report data
    const currentIssueData = sheetData['Break Down Report'] || [];
    const newSlNo = currentIssueData.length + 1;
    
    const newIssueRow = {
      'SL.NO': newSlNo,
      'Equipment': issueData.description,
      'Location': '',
      'Breakdown Description': issueData.actionRequired,
      'Start Date': issueData.startDate,
      'End Date': issueData.finishedDate,
      'Down Time (Hrs)': issueData.totalDelayedDays,
      'Status': issueData.issueStatus,
      'Action Taken': issueData.remarks,
      'Remarks': issueData.attachmentName || ''
    };
    
    setSheetData({
      ...sheetData,
      'Break Down Report': [...currentIssueData, newIssueRow]
    });
    
    toast.success('Breakdown entry added successfully!');
  };

  const handleReject = (remarks: string) => {
    onStatusChange('rejected', remarks);
    toast.error(`Sheet rejected! Sent back to supervisor with remarks.`, {
      description: remarks
    });
  };

  const getStatusBadge = () => {
    const currentSheet = allSheets.find(s => s.name === activeSheet);
    if (!currentSheet) return null;
    
    const isLight = theme === 'light';
    
    switch (currentSheet.status) {
      case 'draft':
        return <Badge variant="outline" className={`${isLight ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-amber-900/30 text-amber-300 border-amber-700'} px-3 py-1`}>Draft</Badge>;
      case 'submitted':
        return <Badge className={`${isLight ? 'bg-blue-100 text-blue-700' : 'bg-blue-900/30 text-blue-300 border-2 border-blue-700'} px-3 py-1`}>Submitted</Badge>;
      case 'approved':
        return <Badge className={`${isLight ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-300 border-2 border-green-700'} px-3 py-1`}>Approved</Badge>;
      case 'pushed':
        return <Badge className={`${isLight ? 'bg-purple-100 text-purple-700' : 'bg-purple-900/30 text-purple-300 border-2 border-purple-700'} px-3 py-1`}>Pushed to P6</Badge>;
      case 'rejected':
        return <Badge className={`${isLight ? 'bg-red-100 text-red-700' : 'bg-red-900/30 text-red-300 border-2 border-red-700'} px-3 py-1`}>Rejected</Badge>;
    }
  };

  const renderActionButtons = () => {
    const currentSheet = allSheets.find(s => s.name === activeSheet);
    if (!currentSheet) return null;
    
    if (userRole === 'supervisor' && (currentSheet.status === 'draft' || currentSheet.status === 'rejected')) {
      return (
        <>
          <Button 
            onClick={handleSave}
            className="bg-white text-black hover:bg-gray-100 border border-gray-300 font-semibold shadow-md"
          >
            <Save className="w-4 h-4 mr-2 text-black" />
            Save Draft
          </Button>
          <Button 
            onClick={handleSubmit}
            className="text-white font-semibold shadow-lg border border-emerald-400/30 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
          >
            <Send className="w-4 h-4 mr-2" />
            Submit for Approval
          </Button>
        </>
      );
    }

    if (userRole === 'sitepm' && currentSheet.status === 'submitted') {
      return (
        <>
          <Button 
            onClick={() => setShowRejectDialog(true)}
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg rounded-xl"
          >
            <XCircle className="w-4 h-4 mr-2" />
            Reject
          </Button>
          <Button 
            onClick={handleApprove}
            className="text-white font-semibold shadow-lg border border-emerald-400/30 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Approve & Forward to Admin
          </Button>
        </>
      );
    }

    if (userRole === 'admin') {
      if (currentSheet.status === 'approved') {
        return (
          <Button 
            onClick={handlePushToP6}
            className="text-white font-semibold shadow-lg border border-blue-400/30 rounded-xl"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' }}
          >
            <Upload className="w-4 h-4 mr-2" />
            Push Data to P6
          </Button>
        );
      }
      return (
        <Button 
          onClick={handleSave}
          className="text-white font-semibold shadow-lg border border-emerald-400/30 rounded-xl"
          style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' }}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      );
    }

    return null;
  };

  const isLight = theme === 'light';

  return (
    <div className="min-h-screen" style={{ backgroundColor: isLight ? '#F3F2F1' : '#1a1625' }}>
      <header className="relative z-50 shadow-xl p-6 border-b-4" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)', borderColor: '#7C3A8A' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white px-4 py-2 rounded-xl shadow-lg">
              <img src={adaniLogo} alt="Adani Renewables" className="h-12 w-auto object-contain" />
            </div>
            {userRole !== 'supervisor' && (
              <Button 
                onClick={onBack}
                variant="ghost"
                className="text-white hover:bg-white/20 rounded-xl p-3"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div className="border-l-2 border-white/30 pl-4">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl text-white font-bold">{activeSheet}</h1>
                <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full font-semibold border border-white/30">
                  PSP Module
                </span>
              </div>
              <p className="text-pink-200 mt-0.5 text-sm">{projectName} • Role: {userRole === 'supervisor' ? 'Site Supervisor' : userRole === 'sitepm' ? 'Site PM' : 'PMAG Admin'}</p>
            </div>
            <div className="ml-4">
              {getStatusBadge()}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {userRole === 'admin' && (
              <div className="flex items-center bg-black/30 p-1 rounded-xl border border-white/20 backdrop-blur-md mr-2">
                <button
                  onClick={() => setActiveAdminTab('live')}
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
            {activeSheet === 'Break Down Report' && (
              <Button 
                onClick={() => setShowCreateIssue(true)}
                className="text-white font-semibold shadow-lg border border-amber-400/30 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Breakdown
              </Button>
            )}
            {renderActionButtons()}
            {userRole === 'supervisor' && onLogout && (
              <Button 
                onClick={onLogout}
                className="bg-slate-800/80 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-md shadow-lg rounded-xl"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="w-full px-6 py-4">
        {userRole === 'admin' && activeAdminTab === 'reports' ? (
          <ReportsView projectName={projectName} theme={theme} />
        ) : (
          <>
            {/* Info Card */}
            <Card data-aos="fade-down" className={`mb-4 p-4 border-l-4 shadow-lg ${
              isLight 
                ? 'bg-white border-0' 
                : 'bg-gradient-to-r from-purple-950/50 to-pink-950/30 border-pink-700/50'
            }`} style={{ borderLeftColor: isLight ? '#667eea' : '#BD3861' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${isLight ? 'text-gray-600' : 'text-purple-200'}`}>
                    {canEdit() ? (
                      <span className={isLight ? 'text-green-600' : 'text-green-300'}>✓ You can edit this sheet ({userRole === 'supervisor' ? 'Site Supervisor Mode' : userRole === 'sitepm' ? 'Site PM Edit Mode' : 'PMAG Admin Mode'})</span>
                    ) : (
                      <span className={isLight ? 'text-orange-600' : 'text-orange-300'}>⚠ View only - {
                        userRole === 'supervisor' ? 'Sheet already submitted' :
                        userRole === 'sitepm' ? currentSheetStatus === 'draft' ? 'Waiting for Supervisor submission' : 'Review and approve sheet' :
                        'PMAG Admin view'
                      }</span>
                    )}
                  </p>
                  {currentConfig.hasDateColumns && (
                    <p className={`text-xs mt-1 ${isLight ? 'text-gray-500' : 'text-pink-200/80'}`}>
                      Date columns update daily: Yesterday ({getYesterdayDate()}) | Today ({getTodayDate()})
                    </p>
                  )}
                </div>
                {userRole === 'admin' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowHistory(true)}
                    className={`rounded-xl ${
                      isLight 
                        ? '' 
                        : 'border-purple-700 text-purple-300 hover:bg-purple-900/30 hover:text-white'
                    }`}
                  >
                    <History className="w-4 h-4 mr-2" />
                    View History
                  </Button>
                )}
              </div>
            </Card>

            {/* Sheet Tabs */}
            <Tabs value={activeSheet} onValueChange={handleSheetChange} className="mb-6" data-aos="fade-up">
              <TabsList className={`w-full justify-start overflow-x-auto flex-wrap h-auto border-2 shadow-lg p-2 rounded-xl ${
                isLight 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gradient-to-r from-purple-950/70 to-pink-950/50 border-purple-800/60'
              }`}>
                {allSheets.filter(s => s.name !== 'Add Sheet').map((sheet) => (
                  <TabsTrigger 
                    key={sheet.name} 
                    value={sheet.name}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      isLight
                        ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-700'
                        : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white text-purple-200 hover:text-white hover:bg-purple-900/30'
                    }`}
                  >
                    {sheet.name}
                    {sheet.status === 'submitted' && <span className={`ml-2 text-xs ${isLight ? '' : 'text-pink-300'}`}>●</span>}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value={activeSheet} className="mt-6">
                {/* Review Mode Toggle for SitePM */}
                {isReviewing() && (
                  <div className={`mb-4 p-3 rounded-lg border-2 flex items-center gap-3 ${
                    isLight 
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300' 
                      : 'bg-gradient-to-r from-purple-900/30 to-pink-900/20 border-purple-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${isLight ? 'text-gray-700' : 'text-purple-200'}`}>
                        Review Mode:
                      </span>
                      <div className={`flex gap-2 p-1 rounded-lg ${
                        isLight ? 'bg-white' : 'bg-purple-950/50'
                      }`}>
                        <Button
                          size="sm"
                          onClick={() => setReviewMode('highlight')}
                          className={`${
                            reviewMode === 'highlight'
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                              : isLight 
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40'
                          }`}
                        >
                          <Highlighter className="w-4 h-4 mr-2" />
                          Highlight Issues
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setReviewMode('edit')}
                          className={`${
                            reviewMode === 'edit'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                              : isLight 
                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                : 'bg-purple-900/30 text-purple-300 hover:bg-purple-800/40'
                          }`}
                        >
                          <Edit3 className="w-4 h-4 mr-2" />
                          Edit & Correct
                        </Button>
                      </div>
                    </div>
                    <div className={`ml-auto text-xs ${isLight ? 'text-gray-600' : 'text-purple-300'}`}>
                      {reviewMode === 'highlight' ? (
                        <span>💡 Click cells to highlight problem areas before rejecting</span>
                      ) : (
                        <span>✏️ Edit cells to make corrections directly</span>
                      )}
                    </div>
                  </div>
                )}

                {currentConfig.isResourceSheet ? (
                  <ResourceGrid 
                    key={activeSheet}
                    data={currentData} 
                    columns={currentColumns}
                    onDataChange={(newData) => {
                      setSheetData(prev => ({
                        ...prev,
                        [activeSheet]: newData
                      }));
                    }}
                    editable={canEdit()}
                    dateColumnColors={currentConfig.dateColumnColors}
                    theme={theme}
                    highlightedCells={highlightedCells[activeSheet] || new Set()}
                    onHighlightChange={(newHighlightedSet) => {
                      setHighlightedCells(prev => ({
                        ...prev,
                        [activeSheet]: newHighlightedSet
                      }));
                    }}
                    canHighlight={canHighlight()}
                  />
                ) : (
                  <ExcelGrid 
                    key={activeSheet}
                    data={currentData} 
                    columns={currentColumns}
                    onDataChange={(newData) => {
                      setSheetData(prev => ({
                        ...prev,
                        [activeSheet]: newData
                      }));
                    }}
                    editable={canEdit()}
                    dateColumnColors={currentConfig.dateColumnColors}
                    theme={theme}
                    highlightedCells={highlightedCells[activeSheet] || new Set()}
                    onHighlightChange={(newHighlightedSet) => {
                      setHighlightedCells(prev => ({
                        ...prev,
                        [activeSheet]: newHighlightedSet
                      }));
                    }}
                    canHighlight={canHighlight()}
                  />
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>

      {/* History Dialog */}
      <HistoryDialog 
        open={showHistory}
        onOpenChange={setShowHistory}
        sheetName={activeSheet}
        theme={theme}
      />

      {/* Create Issue Dialog */}
      <CreateIssueDialog 
        open={showCreateIssue}
        onOpenChange={setShowCreateIssue}
        onSubmit={handleCreateIssue}
        theme={theme}
      />

      {/* Reject Dialog */}
      <RejectDialog 
        open={showRejectDialog}
        onOpenChange={setShowRejectDialog}
        onSubmit={handleReject}
        theme={theme}
      />
    </div>
  );
}