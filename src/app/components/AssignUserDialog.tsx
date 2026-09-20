import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import type { ManagedRole } from './AddUserDialog';

export interface ManagedUser {
  id: string;
  name: string;
  role: ManagedRole;
  projects: string[];
}

interface AssignUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  users: ManagedUser[];
  onSubmit: (userId: string) => void;
}

const roleLabels: Record<ManagedRole, string> = {
  sitepm: 'Site PM',
  supervisor: 'Site Supervisor',
};

export function AssignUserDialog({ open, onOpenChange, projectName, users, onSubmit }: AssignUserDialogProps) {
  const [userId, setUserId] = useState('');

  const assignedUsers = users.filter((u) => u.projects.includes(projectName));

  const handleSubmit = () => {
    if (!userId) {
      toast.error('Please select a user to assign');
      return;
    }

    const user = users.find((u) => u.id === userId);
    onSubmit(userId);
    toast.success(`${user?.name} assigned to ${projectName}`);
    setUserId('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader className="pb-3 border-b-2" style={{ borderColor: '#75479C' }}>
          <DialogTitle className="text-xl flex items-center gap-3" style={{ color: '#75479C' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
              <UserCheck className="w-5 h-5 text-white" />
            </div>
            Assign to {projectName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {assignedUsers.length > 0 && (
            <div className="space-y-2">
              <Label>Currently Assigned</Label>
              <div className="flex flex-wrap gap-2">
                {assignedUsers.map((u) => (
                  <span key={u.id} className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300">
                    {u.name} · {roleLabels[u.role]}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>User <span className="text-red-500">*</span></Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users.length === 0 && (
                  <div className="px-3 py-2 text-sm text-gray-500">No users available. Add one first.</div>
                )}
                {users.map((u) => (
                  <SelectItem key={u.id} value={u.id}>
                    {u.name} · {roleLabels[u.role]}
                  </SelectItem>
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
            <UserCheck className="w-4 h-4 mr-2" />
            Assign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
