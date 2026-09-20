import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Save } from 'lucide-react';
import { toast } from 'sonner';

interface IssueLogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sheetName: string;
}

interface IssueLogEntry {
  slNo: string;
  description: string;
  startDate: string;
  finishedDate: string;
  totalDelayedDays: string;
  issueStatus: string;
  actionRequired: string;
  remarks: string;
}

export function IssueLogDialog({ open, onOpenChange, sheetName }: IssueLogDialogProps) {
  const [issueData, setIssueData] = useState<IssueLogEntry[]>([
    {
      slNo: '1',
      description: 'Material delay from vendor',
      startDate: '2025-10-15',
      finishedDate: '2025-10-20',
      totalDelayedDays: '5',
      issueStatus: 'Resolved',
      actionRequired: 'Expedite next delivery',
      remarks: 'Alternative supplier identified'
    },
    {
      slNo: '2',
      description: 'Weather delay - Heavy rainfall',
      startDate: '2025-10-18',
      finishedDate: '',
      totalDelayedDays: '3',
      issueStatus: 'Ongoing',
      actionRequired: 'Monitor weather forecast',
      remarks: 'Work resumed partially'
    }
  ]);

  const handleCellChange = (rowIndex: number, field: keyof IssueLogEntry, value: string) => {
    const newData = [...issueData];
    newData[rowIndex] = { ...newData[rowIndex], [field]: value };
    setIssueData(newData);
  };

  const addRow = () => {
    setIssueData([
      ...issueData,
      {
        slNo: (issueData.length + 1).toString(),
        description: '',
        startDate: '',
        finishedDate: '',
        totalDelayedDays: '',
        issueStatus: '',
        actionRequired: '',
        remarks: ''
      }
    ]);
  };

  const handleSave = () => {
    toast.success('Issue log saved successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh]">
        <DialogHeader className="pb-4 border-b-2" style={{ borderColor: '#75479C' }}>
          <DialogTitle className="text-2xl flex items-center gap-3" style={{ color: '#75479C' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
              <Save className="w-6 h-6 text-white" />
            </div>
            Issue Log Report - {sheetName}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
          <table className="w-full border-collapse" style={{ fontSize: '13px' }}>
            <thead className="sticky top-0 z-10">
              <tr style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '60px' }}>
                  SL.NO
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '200px' }}>
                  DESCRIPTION OF HINDRENCE
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '130px' }}>
                  START DATE
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '130px' }}>
                  FINISHED DATE
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '120px' }}>
                  TOTAL DELAYED DAYS
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '120px' }}>
                  ISSUE STATUS
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '180px' }}>
                  ACTION REQUIRED
                </th>
                <th style={{ border: '1px solid #9ca3af', padding: '12px 8px', color: 'white', fontSize: '12px', fontWeight: '700', minWidth: '150px' }}>
                  REMARKS
                </th>
              </tr>
            </thead>
            <tbody>
              {issueData.map((row, rowIndex) => (
                <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb' }} className="hover:bg-blue-50">
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.slNo}
                      onChange={(e) => handleCellChange(rowIndex, 'slNo', e.target.value)}
                      className="border-0 rounded-none h-10 text-center"
                      style={{ fontSize: '12px', fontWeight: '600' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.description}
                      onChange={(e) => handleCellChange(rowIndex, 'description', e.target.value)}
                      className="border-0 rounded-none h-10"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <input
                      type="date"
                      value={row.startDate}
                      onChange={(e) => handleCellChange(rowIndex, 'startDate', e.target.value)}
                      className="border-0 rounded-none h-10 w-full px-2"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <input
                      type="date"
                      value={row.finishedDate}
                      onChange={(e) => handleCellChange(rowIndex, 'finishedDate', e.target.value)}
                      className="border-0 rounded-none h-10 w-full px-2"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.totalDelayedDays}
                      onChange={(e) => handleCellChange(rowIndex, 'totalDelayedDays', e.target.value)}
                      className="border-0 rounded-none h-10 text-center"
                      style={{ fontSize: '12px' }}
                      type="number"
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.issueStatus}
                      onChange={(e) => handleCellChange(rowIndex, 'issueStatus', e.target.value)}
                      className="border-0 rounded-none h-10"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.actionRequired}
                      onChange={(e) => handleCellChange(rowIndex, 'actionRequired', e.target.value)}
                      className="border-0 rounded-none h-10"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                  <td style={{ border: '1px solid #d1d5db', padding: '0' }}>
                    <Input
                      value={row.remarks}
                      onChange={(e) => handleCellChange(rowIndex, 'remarks', e.target.value)}
                      className="border-0 rounded-none h-10"
                      style={{ fontSize: '12px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            onClick={addRow}
            className="text-white"
            style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Row
          </Button>
          <Button
            onClick={handleSave}
            className="text-white"
            style={{ background: 'linear-gradient(135deg, #BD3861 0%, #75479C 100%)' }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Issue Log
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
