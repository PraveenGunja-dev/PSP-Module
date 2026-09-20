import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  User, 
  FileEdit, 
  Send, 
  CheckCircle, 
  Upload, 
  Eye,
  AlertTriangle,
  Clock,
  MessageSquare
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sheetName: string;
  theme?: 'light' | 'dark';
}

interface HistoryEntry {
  id: number;
  action: string;
  user: string;
  role: string;
  timestamp: string;
  status: string;
  changes?: string;
}

export function HistoryDialog({ open, onOpenChange, sheetName, theme = 'light' }: HistoryDialogProps) {
  // Sample history data
  const historyData: HistoryEntry[] = [
    {
      id: 1,
      action: 'Created',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-15T09:00:00',
      status: 'draft',
      changes: 'Sheet created with initial structure'
    },
    {
      id: 2,
      action: 'Data Entry',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-20T10:30:00',
      status: 'draft',
      changes: 'Added 7 rows of activity data with completion percentages'
    },
    {
      id: 3,
      action: 'Data Updated',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-22T14:15:00',
      status: 'draft',
      changes: 'Updated completion percentages for 5 activities'
    },
    {
      id: 4,
      action: 'Submitted',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-23T16:45:00',
      status: 'submitted',
      changes: 'Submitted for Site PM approval'
    },
    {
      id: 5,
      action: 'Reviewed',
      user: 'sitepm',
      role: 'Site PM',
      timestamp: '2025-10-24T11:20:00',
      status: 'submitted',
      changes: 'Reviewed data and requested minor corrections in Block 3 activities'
    },
    {
      id: 6,
      action: 'Data Corrected',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-24T15:30:00',
      status: 'draft',
      changes: 'Corrected activity percentages as requested by Site PM'
    },
    {
      id: 7,
      action: 'Re-submitted',
      user: 'supervisor',
      role: 'Site Supervisor',
      timestamp: '2025-10-24T16:00:00',
      status: 'submitted',
      changes: 'Re-submitted after corrections'
    },
    {
      id: 8,
      action: 'Approved',
      user: 'sitepm',
      role: 'Site PM',
      timestamp: '2025-10-25T10:30:00',
      status: 'approved',
      changes: 'Approved and forwarded to PMAG Admin'
    },
    {
      id: 9,
      action: 'Verified',
      user: 'admin',
      role: 'PMAG Admin',
      timestamp: '2025-10-26T09:15:00',
      status: 'approved',
      changes: 'Verified data accuracy and completeness against project requirements'
    },
    {
      id: 10,
      action: 'Data Adjustment',
      user: 'admin',
      role: 'PMAG Admin',
      timestamp: '2025-10-27T13:45:00',
      status: 'approved',
      changes: 'Minor adjustments to align with P6 database schema requirements'
    },
    {
      id: 11,
      action: 'Pushed to P6',
      user: 'admin',
      role: 'PMAG Admin',
      timestamp: '2025-10-28T11:00:00',
      status: 'pushed',
      changes: 'Successfully pushed data to Primavera P6 database'
    }
  ];

  const isLight = theme === 'light';

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className={`px-3 py-1 text-xs ${isLight ? 'bg-amber-100 text-amber-700 border-amber-300' : 'bg-amber-900/30 text-amber-300 border-amber-700'}`}>Draft</Badge>;
      case 'submitted':
        return <Badge className={`px-3 py-1 text-xs ${isLight ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-blue-900/30 text-blue-300 border-2 border-blue-700'}`}>Submitted</Badge>;
      case 'approved':
        return <Badge className={`px-3 py-1 text-xs ${isLight ? 'bg-green-100 text-green-700 border-green-300' : 'bg-green-900/30 text-green-300 border-2 border-green-700'}`}>Approved</Badge>;
      case 'pushed':
        return <Badge className={`px-3 py-1 text-xs ${isLight ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-purple-900/30 text-purple-300 border-2 border-purple-700'}`}>Pushed</Badge>;
      default:
        return null;
    }
  };

  const getActionIcon = (action: string) => {
    const iconClass = "w-4 h-4";
    switch (action) {
      case 'Created':
        return <FileEdit className={`${iconClass} ${isLight ? 'text-gray-500' : 'text-white'}`} />;
      case 'Data Entry':
      case 'Data Updated':
      case 'Data Corrected':
      case 'Data Adjustment':
        return <FileEdit className={`${iconClass} ${isLight ? 'text-blue-500' : 'text-white'}`} />;
      case 'Submitted':
      case 'Re-submitted':
        return <Send className={`${iconClass} ${isLight ? 'text-blue-600' : 'text-white'}`} />;
      case 'Reviewed':
        return <Eye className={`${iconClass} ${isLight ? 'text-orange-500' : 'text-white'}`} />;
      case 'Approved':
        return <CheckCircle className={`${iconClass} ${isLight ? 'text-green-500' : 'text-white'}`} />;
      case 'Verified':
        return <CheckCircle className={`${iconClass} ${isLight ? 'text-green-600' : 'text-white'}`} />;
      case 'Pushed to P6':
        return <Upload className={`${iconClass} ${isLight ? 'text-purple-500' : 'text-white'}`} />;
      default:
        return <Clock className={`${iconClass} ${isLight ? 'text-gray-400' : 'text-white'}`} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getGradientColor = (status: string) => {
    switch (status) {
      case 'pushed':
        return 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
      case 'approved':
        return 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      case 'submitted':
        return 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)';
      default:
        return isLight ? 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' : 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)';
    }
  };

  return (
    <>
      {/* Blurred Backdrop */}
      {open && (
        <div 
          className="fixed inset-0 z-50 bg-black/40"
          style={{ backdropFilter: 'blur(8px)' }}
          onClick={() => onOpenChange(false)}
        />
      )}
      
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className={`w-[90vw] max-w-[90vh] h-[90vw] max-h-[90vh] p-0 gap-0 overflow-hidden z-50 ${
            isLight ? 'bg-white/95' : 'bg-[#1f1735]/95 border-purple-700/60'
          }`} 
          style={{ backdropFilter: 'blur(20px)', aspectRatio: '1/1' }}
        >
          {/* Header - Fixed */}
          <DialogHeader className={`px-12 py-7 border-b-2 flex-shrink-0 ${isLight ? 'border-gray-200' : 'border-purple-800/60'}`}>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
                <Clock className="w-8 h-8 text-white" />
              </div>
              <div>
                <DialogTitle className={`text-3xl ${isLight ? 'text-gray-800' : 'text-white'}`}>
                  Change History
                </DialogTitle>
                <p className={`text-base mt-1 ${isLight ? 'text-gray-600' : 'text-purple-300'}`}>
                  {sheetName} - Complete audit trail with {historyData.length} entries
                </p>
              </div>
            </div>
          </DialogHeader>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-hidden px-12 py-7">
            <ScrollArea className="h-full pr-6">
              <div className="space-y-3">
                {historyData.map((entry, index) => (
                  <div key={entry.id} className="relative">
                    {/* Connecting Line */}
                    {index < historyData.length - 1 && (
                      <div 
                        className={`absolute left-4 top-12 w-0.5 ${isLight ? 'opacity-20' : 'opacity-30'}`}
                        style={{ 
                          background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)',
                          height: 'calc(100% + 12px)'
                        }}
                      />
                    )}
                    
                    <Card 
                      className={`p-3 shadow-md hover:shadow-lg transition-all border ${
                        isLight 
                          ? 'bg-white/90 border-gray-200 hover:border-blue-400' 
                          : 'bg-gradient-to-r from-purple-950/60 to-pink-950/30 border-purple-800/50 hover:border-purple-600'
                      } relative overflow-hidden`}
                      style={{ backdropFilter: 'blur(10px)' }}
                    >
                      {/* Decorative left border */}
                      <div 
                        className="absolute top-0 left-0 bottom-0 w-1"
                        style={{ background: getGradientColor(entry.status) }}
                      />
                      
                      <div className="flex items-start gap-3 pl-2">
                        {/* Icon Circle */}
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center shadow-md flex-shrink-0 z-10"
                          style={{ background: getGradientColor(entry.status) }}
                        >
                          {getActionIcon(entry.action)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          {/* Header Row: Action + Status + Date */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h3 className={`text-base ${isLight ? 'text-gray-800' : 'text-white'}`}>
                                {entry.action}
                              </h3>
                              {getStatusBadge(entry.status)}
                            </div>
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
                              isLight ? 'bg-gray-100 text-gray-600' : 'bg-purple-900/30 text-purple-300'
                            }`}>
                              <Calendar className="w-3.5 h-3.5" />
                              <span className="text-xs whitespace-nowrap">{formatTimestamp(entry.timestamp)}</span>
                            </div>
                          </div>
                          
                          {/* User Row */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${
                              isLight ? 'bg-blue-50' : 'bg-blue-900/20'
                            }`}>
                              <User className={`w-3.5 h-3.5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
                              <span className={`text-xs ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{entry.user}</span>
                              <span className={isLight ? 'text-gray-400' : 'text-gray-500'}>•</span>
                              <span className={`text-xs ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{entry.role}</span>
                            </div>
                          </div>
                          
                          {/* Remarks/Changes Row */}
                          {entry.changes && (
                            <div>
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <MessageSquare className={`w-3 h-3 ${isLight ? 'text-gray-500' : 'text-purple-400'}`} />
                                <span className={`text-xs uppercase tracking-wider ${isLight ? 'text-gray-600 font-semibold' : 'text-purple-300 font-semibold'}`}>
                                  Remarks
                                </span>
                              </div>
                              <div 
                                className={`p-2 rounded-md border-l-2 ${
                                  isLight ? 'bg-gray-50' : 'bg-gray-900/30'
                                }`}
                                style={{ 
                                  borderLeftColor: entry.status === 'pushed' ? '#8b5cf6' :
                                    entry.status === 'approved' ? '#10b981' :
                                    entry.status === 'submitted' ? '#0ea5e9' : '#6b7280'
                                }}
                              >
                                <p className={`text-xs leading-relaxed ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                                  {entry.changes}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
