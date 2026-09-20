import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { XCircle } from 'lucide-react';

interface RejectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (remarks: string) => void;
  theme: 'light' | 'dark';
}

export function RejectDialog({ open, onOpenChange, onSubmit, theme }: RejectDialogProps) {
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!remarks.trim()) {
      setError('Remarks are mandatory for rejection');
      return;
    }
    
    onSubmit(remarks);
    setRemarks('');
    setError('');
    onOpenChange(false);
  };

  const handleClose = () => {
    setRemarks('');
    setError('');
    onOpenChange(false);
  };

  const isLight = theme === 'light';

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent 
        className={`max-w-2xl ${
          isLight 
            ? 'bg-white' 
            : 'bg-gradient-to-br from-purple-950 to-purple-900 border-purple-700'
        }`}
      >
        <DialogHeader>
          <DialogTitle className={`text-2xl flex items-center gap-2 ${
            isLight ? 'text-gray-900' : 'text-white'
          }`}>
            <XCircle className="w-6 h-6 text-red-500" />
            Reject Sheet
          </DialogTitle>
          <DialogDescription className={isLight ? 'text-gray-600' : 'text-purple-200'}>
            Please provide mandatory remarks for rejection. The sheet will be sent back to the supervisor for corrections.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label 
              htmlFor="remarks" 
              className={`text-sm mb-2 block ${
                isLight ? 'text-gray-700' : 'text-purple-200'
              }`}
            >
              Rejection Remarks <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="remarks"
              value={remarks}
              onChange={(e) => {
                setRemarks(e.target.value);
                setError('');
              }}
              placeholder="Specify the issues found and corrections needed. You can mention specific cells or areas that need attention..."
              rows={6}
              className={`${
                isLight 
                  ? 'bg-white border-gray-300 text-gray-900' 
                  : 'bg-purple-900/50 border-purple-700 text-white placeholder:text-purple-300'
              } ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className={`p-3 rounded-lg ${
            isLight ? 'bg-amber-50 border border-amber-200' : 'bg-amber-900/20 border border-amber-700'
          }`}>
            <p className={`text-sm ${isLight ? 'text-amber-800' : 'text-amber-200'}`}>
              💡 <strong>Tip:</strong> You can highlight specific cells in the sheet before rejecting to help the supervisor identify problem areas.
            </p>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              onClick={handleClose}
              variant="outline"
              className={isLight ? '' : 'border-purple-700 text-purple-200 hover:bg-purple-900/30'}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <XCircle className="w-4 h-4 mr-2" />
              Reject Sheet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}