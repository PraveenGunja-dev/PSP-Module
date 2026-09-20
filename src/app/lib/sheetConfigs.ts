// Get yesterday and today dates dynamically
export const getYesterdayDate = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

export const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-GB'); // DD/MM/YYYY format
};

export interface SheetConfig {
  name: string;
  columns: string[];
  hasDateColumns: boolean;
  dateColumnColors?: {
    yesterday: string;
    today: string;
  };
  isResourceSheet?: boolean;
  isMMSSheet?: boolean;
}

export const sheetConfigs: Record<string, SheetConfig> = {
  'Main Work-Summary': {
    name: 'Main Work-Summary',
    columns: [
      'S. No',
      'BOQ Items',
      'Description',
      'Unit',
      'Day Plan',
      'Day Achieved',
      'Month Plan',
      'Month Achieved',
      'FY Plan',
      'FY Achieved',
      'Cum Plan',
      'Cum Achieved',
      'Remarks'
    ],
    hasDateColumns: false
  },
  'BOQ Details': {
    name: 'BOQ Details',
    columns: [
      'BOQ Code',
      'Description',
      'UNIT',
      'BOQ QTY',
      'RATE',
      'AMOUNT',
      'Sep-25',
      'Oct-25',
      'Nov-25',
      'Dec-25',
      'Jan-26',
      'Feb-26',
      'Mar-26',
      'Apr-26',
      'May-26',
      'Jun-26',
      'Jul-26',
      'Aug-26',
      'Sep-26'
    ],
    hasDateColumns: false
  },
  'DPR of Main work': {
    name: 'DPR of Main work',
    columns: [
      'Month',
      'Date',
      'WBS',
      'Sub WBS',
      'BOQ Item No.',
      'EL',
      'Location',
      'Activity',
      'Unit',
      'From RC',
      'To RD',
      "No's",
      'Length',
      'Width',
      'Depth',
      'Theo. Qty',
      'Qty Executed',
      'Remarks'
    ],
    hasDateColumns: false
  },
  'LM Status': {
    name: 'LM Status',
    columns: [
      'S. No',
      'Section',
      'Description',
      'Unit',
      'Total Scope',
      'Cum Achieved',
      'Today Qty',
      'Monthly Achieved',
      'Balance',
      'Status',
      'Remarks'
    ],
    hasDateColumns: false
  },

  'Manpower': {
    name: 'Manpower',
    columns: [
      'S No',
      'Contractor / Agency',
      'Categories',
      'Unit'
    ],
    hasDateColumns: true,
    dateColumnColors: {
      yesterday: '#fecaca', // red-200
      today: '#86efac' // green-300
    }
  },
  'Plant & Machinery': {
    name: 'Plant & Machinery',
    columns: [
      'S No',
      'Equipment Type',
      'Make / Model',
      'Nos',
      'Capacity',
      'Owner',
      'Status',
      'Working',
      'Idle',
      'Breakdown',
      'Remarks'
    ],
    hasDateColumns: false
  },
  'Breakdown Reports': {
    name: 'Breakdown Reports',
    columns: [
      'Date',
      'Machine/Equipment',
      'Breakdown Detail',
      'Breakdown Hours',
      'Remarks'
    ],
    hasDateColumns: false
  },
  'Comments': {
    name: 'Comments',
    columns: [
      'DATE',
      'Additional Comments'
    ],
    hasDateColumns: false
  },
  'Hindrance': {
    name: 'Hindrance',
    columns: [
      'Sr No',
      'Hindrance / Bottleneck',
      'Remark'
    ],
    hasDateColumns: false
  }
};

export const getSheetConfig = (sheetName: string): SheetConfig => {
  return sheetConfigs[sheetName] || sheetConfigs['Main Work-Summary'];
};

export const getColumnsWithDates = (sheetName: string): string[] => {
  const config = getSheetConfig(sheetName);
  if (!config.hasDateColumns) {
    return config.columns;
  }
  
  const yesterdayDate = getYesterdayDate();
  const todayDate = getTodayDate();
  
  // For Manpower sheet - add day columns after fixed columns
  return [...config.columns, yesterdayDate, todayDate, 'Remarks'];
};