import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, Upload, X, Paperclip } from 'lucide-react';
import { toast } from 'sonner';

interface CreateIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (issueData: IssueData) => void;
  theme?: 'light' | 'dark';
}

export interface IssueData {
  description: string;
  startDate: string;
  finishedDate: string;
  totalDelayedDays: string;
  issueStatus: string;
  actionRequired: string;
  remarks: string;
  attachment?: File | null;
  attachmentName?: string;
}

export function CreateIssueDialog({ open, onOpenChange, onSubmit, theme = 'light' }: CreateIssueDialogProps) {
  const [formData, setFormData] = useState<IssueData>({
    description: '',
    startDate: '',
    finishedDate: '',
    totalDelayedDays: '',
    issueStatus: '',
    actionRequired: '',
    remarks: '',
    attachmentName: ''
  });

  const handleChange = (field: keyof IssueData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      attachment: file,
      attachmentName: file ? file.name : ''
    }));
    if (file) {
      toast.success(`File "${file.name}" attached successfully!`);
    }
  };

  const removeAttachment = () => {
    setFormData(prev => ({
      ...prev,
      attachment: null,
      attachmentName: ''
    }));
    toast.info('Attachment removed');
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.description || !formData.startDate || !formData.issueStatus) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSubmit(formData);
    
    // Reset form
    setFormData({
      description: '',
      startDate: '',
      finishedDate: '',
      totalDelayedDays: '',
      issueStatus: '',
      actionRequired: '',
      remarks: '',
      attachmentName: ''
    });
    
    toast.success('Issue created successfully!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="pb-3 border-b-2" style={{ borderColor: '#0B74B0' }}>
          <DialogTitle className="text-2xl flex items-center gap-3" style={{ color: '#0B74B0' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0B74B0 0%, #00A3A1 100%)' }}>
              <Plus className="w-6 h-6 text-white" />
            </div>
            Create New Issue
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="description" className="text-sm" style={{ color: '#1a365d' }}>
                Description of Hindrance <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Enter issue description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm" style={{ color: '#1a365d' }}>
                Start Date <span className="text-red-500">*</span>
              </Label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange('startDate', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="finishedDate" className="text-sm" style={{ color: '#1a365d' }}>
                Finished Date
              </Label>
              <input
                id="finishedDate"
                type="date"
                value={formData.finishedDate}
                onChange={(e) => handleChange('finishedDate', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalDelayedDays" className="text-sm" style={{ color: '#1a365d' }}>
                Total Delayed Days
              </Label>
              <Input
                id="totalDelayedDays"
                type="number"
                placeholder="0"
                value={formData.totalDelayedDays}
                onChange={(e) => handleChange('totalDelayedDays', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issueStatus" className="text-sm" style={{ color: '#1a365d' }}>
                Issue Status <span className="text-red-500">*</span>
              </Label>
              <Input
                id="issueStatus"
                placeholder="e.g., Open, In Progress, Resolved"
                value={formData.issueStatus}
                onChange={(e) => handleChange('issueStatus', e.target.value)}
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="actionRequired" className="text-sm" style={{ color: '#1a365d' }}>
                Action Required
              </Label>
              <Textarea
                id="actionRequired"
                placeholder="Enter required actions"
                value={formData.actionRequired}
                onChange={(e) => handleChange('actionRequired', e.target.value)}
                className="h-16"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="remarks" className="text-sm" style={{ color: '#1a365d' }}>
                Remarks
              </Label>
              <Textarea
                id="remarks"
                placeholder="Enter any additional remarks"
                value={formData.remarks}
                onChange={(e) => handleChange('remarks', e.target.value)}
                className="h-16"
              />
            </div>

            <div className="col-span-2 space-y-2">
              <Label className="text-sm" style={{ color: '#1a365d' }}>
                Attachment
              </Label>
              {formData.attachmentName ? (
                <div className="flex items-center gap-2 p-3 border rounded-md bg-blue-50">
                  <Paperclip className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-blue-700 truncate flex-1" title={formData.attachmentName}>
                    {formData.attachmentName}
                  </span>
                  <button
                    onClick={removeAttachment}
                    className="text-red-500 hover:text-red-700 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed rounded-md p-4 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-blue-600">Click to upload file</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      handleFileUpload(file);
                    }}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="text-white"
            style={{ background: 'linear-gradient(135deg, #0B74B0 0%, #00A3A1 100%)' }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Issue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
