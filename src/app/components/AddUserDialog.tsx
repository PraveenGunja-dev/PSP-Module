import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export type ManagedRole = 'sitepm' | 'supervisor';

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableRoles: ManagedRole[];
  onSubmit: (name: string, role: ManagedRole) => void;
}

const roleLabels: Record<ManagedRole, string> = {
  sitepm: 'Site PM',
  supervisor: 'Site Supervisor',
};

export function AddUserDialog({ open, onOpenChange, availableRoles, onSubmit }: AddUserDialogProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState<ManagedRole | ''>('');

  const handleSubmit = () => {
    if (!name.trim()) {
      toast.error('Please enter a name');
      return;
    }
    if (!role) {
      toast.error('Please select a role');
      return;
    }

    onSubmit(name.trim(), role);
    toast.success(`${name.trim()} added as ${roleLabels[role]}`);
    setName('');
    setRole('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-3 border-b-2" style={{ borderColor: '#75479C' }}>
          <DialogTitle className="text-xl flex items-center gap-3" style={{ color: '#75479C' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            Add User
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="user-name">Name <span className="text-red-500">*</span></Label>
            <Input
              id="user-name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Role <span className="text-red-500">*</span></Label>
            <Select value={role} onValueChange={(v) => setRole(v as ManagedRole)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((r) => (
                  <SelectItem key={r} value={r}>{roleLabels[r]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3 border-t">
          <Button onClick={() => onOpenChange(false)} variant="outline" className="border-gray-300">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="text-white"
            style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
