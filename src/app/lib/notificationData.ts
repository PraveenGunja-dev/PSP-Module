export interface Notification {
  id: string;
  projectName: string;
  sheetName: string;
  activity: 'approved' | 'rejected' | 'submitted' | 'pushed' | 'commented';
  date: string;
  time: string;
  remarks: string;
  link: string;
  read: boolean;
}

export const getProjectNotifications = (
  projectName?: string,
  sheets?: { name: string; status: string; rejectionRemarks?: string }[]
): Notification[] => {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const proj = projectName || 'Project Gandikota - Phase 1';

  const defaultNotifications: Notification[] = [
    {
      id: 'n1',
      projectName: proj,
      sheetName: 'DPR of Main work',
      activity: 'submitted',
      date: today,
      time: '11:45 AM',
      remarks: 'DPR of Main work sheet submitted by Site Supervisor. Awaiting Site PM review.',
      link: '/project/dpr-main-work',
      read: false
    },
    {
      id: 'n2',
      projectName: proj,
      sheetName: 'Manpower',
      activity: 'approved',
      date: today,
      time: '10:30 AM',
      remarks: 'Manpower log sheet approved by Site PM. Forwarded to PMAG Admin.',
      link: '/project/manpower',
      read: false
    },
    {
      id: 'n3',
      projectName: proj,
      sheetName: 'BOQ Details',
      activity: 'commented',
      date: today,
      time: '09:15 AM',
      remarks: 'BOQ execution quantity logs updated for current month targets.',
      link: '/project/boq-details',
      read: false
    },
    {
      id: 'n4',
      projectName: proj,
      sheetName: 'Main Work-Summary',
      activity: 'pushed',
      date: yesterday,
      time: '04:20 PM',
      remarks: 'Main Work Summary data successfully pushed and synced with Primavera P6.',
      link: '/project/main-summary',
      read: true
    },
    {
      id: 'n5',
      projectName: proj,
      sheetName: 'Breakdown Reports',
      activity: 'rejected',
      date: yesterday,
      time: '02:10 PM',
      remarks: 'Breakdown report sent back for revision: Please verify equipment down time hours.',
      link: '/project/breakdown',
      read: true
    },
    {
      id: 'n6',
      projectName: proj,
      sheetName: 'Plant & Machinery',
      activity: 'approved',
      date: yesterday,
      time: '11:00 AM',
      remarks: 'Plant & Machinery availability and status log reviewed and approved.',
      link: '/project/plant-machinery',
      read: true
    }
  ];

  if (sheets && sheets.length > 0) {
    const dynamicFromSheets: Notification[] = sheets
      .filter(s => s.status !== 'draft')
      .map((s, idx) => ({
        id: `dyn-${idx}-${s.name}`,
        projectName: proj,
        sheetName: s.name,
        activity: (s.status === 'pushed' ? 'pushed' : s.status === 'approved' ? 'approved' : s.status === 'submitted' ? 'submitted' : s.status === 'rejected' ? 'rejected' : 'commented') as Notification['activity'],
        date: today,
        time: `${10 + (idx % 8)}:00 AM`,
        remarks: s.rejectionRemarks || `Sheet "${s.name}" status updated to ${s.status.toUpperCase()}.`,
        link: `/sheet/${s.name}`,
        read: false
      }));

    if (dynamicFromSheets.length > 0) {
      const existingSheetNames = new Set(dynamicFromSheets.map(d => d.sheetName));
      const filteredDefaults = defaultNotifications.filter(d => !existingSheetNames.has(d.sheetName));
      return [...dynamicFromSheets, ...filteredDefaults];
    }
  }

  return defaultNotifications;
};

export const allNotifications: Notification[] = getProjectNotifications();

export const getUnreadCount = (notifications: Notification[]): number => {
  return notifications.filter(n => !n.read).length;
};
