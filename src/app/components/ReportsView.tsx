import { useState } from 'react';
import { FileSpreadsheet, Download, Search, FileText, CheckCircle, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface ReportsViewProps {
  projectName: string;
  theme?: 'light' | 'dark';
}

export function ReportsView({ projectName, theme = 'light' }: ReportsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const isLight = theme === 'light';

  const mockReportsData = [
    { id: 1, name: 'Main Work Progress Summary', category: 'Main Work-Summary', date: '19-Sep-2026', scope: '143,741 Cum', status: 'Approved', generatedBy: 'PMAG Admin' },
    { id: 2, name: 'BOQ Execution & Cost Breakdown', category: 'BOQ Details', date: '18-Sep-2026', scope: '₹1,240.5 Lakhs', status: 'In Progress', generatedBy: 'Site PM' },
    { id: 3, name: 'Primavera P6 Sync Audit Log', category: 'P6 Sync Status', date: '19-Sep-2026', scope: '12 Activities', status: 'Synced', generatedBy: 'System Auto-Sync' },
    { id: 4, name: 'Plant & Machinery Utilization Log', category: 'Plant & Machinery', date: '17-Sep-2026', scope: '24 Machines', status: 'Operational', generatedBy: 'Site Supervisor' },
    { id: 5, name: 'Hindrance & Delay Mitigation Report', category: 'Hindrance', date: '16-Sep-2026', scope: '3 Issues', status: 'Resolved', generatedBy: 'Site PM' },
    { id: 6, name: 'Monthly DPR Target vs Actuals', category: 'DPR Main Work', date: '15-Sep-2026', scope: '8 Work Areas', status: 'On Track', generatedBy: 'PMAG Admin' },
    { id: 7, name: 'Manpower Allocation & Resource Log', category: 'Manpower', date: '14-Sep-2026', scope: '185 Workers', status: 'Approved', generatedBy: 'Site Supervisor' },
  ];

  const filteredReports = mockReportsData.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.generatedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (reportName: string) => {
    toast.success(`Downloading ${reportName}.xlsx...`);
  };

  return (
    <div className="flex flex-col h-full space-y-4" data-aos="fade-up">
      {/* Header Bar */}
      <div className={`p-5 rounded-2xl shadow-lg border flex flex-wrap items-center justify-between gap-4 ${
        isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-purple-900/50'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-md">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className={`text-lg font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
              PMAG Project Reports
            </h2>
            <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
              Generated reports summary for {projectName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-gray-400' : 'text-gray-500'}`} />
            <Input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 h-9 text-xs rounded-xl ${isLight ? 'bg-gray-50 border-gray-300' : 'bg-gray-800 border-gray-700 text-white'}`}
            />
          </div>

          <Button
            onClick={() => handleDownload('Master_PMAG_Report')}
            className="h-9 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Download All (.xlsx)
          </Button>
        </div>
      </div>

      {/* Simple Mock Data Table */}
      <div className={`flex-1 rounded-2xl p-6 shadow-xl border overflow-hidden flex flex-col ${
        isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-purple-900/50'
      }`}>
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left border-collapse" style={{ fontSize: '13px' }}>
            <thead>
              <tr className={`border-b-2 ${
                isLight ? 'border-gray-200 text-gray-600 bg-gray-50' : 'border-purple-900/50 text-purple-200 bg-purple-950/30'
              }`}>
                <th className="p-3 text-xs uppercase tracking-wider w-12 text-center">#</th>
                <th className="p-3 text-xs uppercase tracking-wider">Report Name</th>
                <th className="p-3 text-xs uppercase tracking-wider">Category / Sheet</th>
                <th className="p-3 text-xs uppercase tracking-wider">Date</th>
                <th className="p-3 text-xs uppercase tracking-wider">Total Scope</th>
                <th className="p-3 text-xs uppercase tracking-wider">Status</th>
                <th className="p-3 text-xs uppercase tracking-wider">Generated By</th>
                <th className="p-3 text-xs uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((row, idx) => (
                <tr key={row.id} className={`border-b transition-all ${
                  isLight ? 'border-gray-100 hover:bg-purple-50/40' : 'border-purple-900/30 hover:bg-purple-900/20'
                }`}>
                  <td className="p-3 text-center font-mono opacity-60 text-xs">{idx + 1}</td>
                  <td className="p-3 font-semibold">{row.name}</td>
                  <td className="p-3 font-medium text-xs opacity-80">{row.category}</td>
                  <td className="p-3 font-mono text-xs">{row.date}</td>
                  <td className="p-3 font-mono text-xs">{row.scope}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      row.status === 'Approved' || row.status === 'Synced'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : row.status === 'In Progress' || row.status === 'Operational' || row.status === 'On Track'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs opacity-80">{row.generatedBy}</td>
                  <td className="p-3 text-center">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownload(row.name)}
                      className={`h-8 px-3 text-xs rounded-lg ${
                        isLight ? 'hover:bg-purple-50 text-purple-700 border-purple-200' : 'border-purple-700 text-purple-300 hover:bg-purple-900/30'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5 mr-1" />
                      Excel
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
