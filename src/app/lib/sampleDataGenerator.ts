import { getYesterdayDate, getTodayDate } from './sheetConfigs';

// Helper to generate sample data for different sheet types
export const generateSampleData = (sheetName: string, rowCount: number = 8): any[] => {
  const yesterdayDate = getYesterdayDate();
  const todayDate = getTodayDate();
  
  switch (sheetName) {
    case 'Main Work-Summary':
      return [
        // Civil Works section
        { 'S. No': '1', 'BOQ Items': '', 'Description': 'Civil Works', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
        { 'S. No': 'A', 'BOQ Items': '', 'Description': 'Dam & Upper Reservoir', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
        { 'S. No': '1', 'BOQ Items': 'A.1.1.1', 'Description': 'Excavation Soil', 'Unit': 'Cum', 'Day Plan': '3036', 'Day Achieved': '0.00', 'Month Plan': '85000.00', 'Month Achieved': '18650.00', 'FY Plan': '100000.0', 'FY Achieved': '37073.00', 'Cum Plan': '100000', 'Cum Achieved': '37073.00', 'Remarks': '' },
        { 'S. No': '2', 'BOQ Items': 'A.1.2', 'Description': 'Excavation Hard Rock', 'Unit': 'Cum', 'Day Plan': '5000', 'Day Achieved': '0', 'Month Plan': '140000.00', 'Month Achieved': '8150.00', 'FY Plan': '155000.0', 'FY Achieved': '16310.0', 'Cum Plan': '155000', 'Cum Achieved': '16310.0', 'Remarks': '' },
        // Powerhouse section
        { 'S. No': 'H', 'BOQ Items': '', 'Description': 'Powerhouse, GIS and Pothead Yard', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
        { 'S. No': '', 'BOQ Items': '', 'Description': 'Power house', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
        { 'S. No': '1', 'BOQ Items': 'H.1.1.1', 'Description': 'Excavation', 'Unit': 'Cum', 'Day Plan': '232', 'Day Achieved': '0', 'Month Plan': '8500', 'Month Achieved': '950', 'FY Plan': '13500', 'FY Achieved': '3700', 'Cum Plan': '13500', 'Cum Achieved': '3700', 'Remarks': '2475' },
        { 'S. No': '2', 'BOQ Items': 'H.1.2', 'Description': 'Excavation in Hard Chiselling', 'Unit': 'Cum', 'Day Plan': '36', 'Day Achieved': '0', 'Month Plan': '1000', 'Month Achieved': '0', 'FY Plan': '8000', 'FY Achieved': '0', 'Cum Plan': '8000', 'Cum Achieved': '0', 'Remarks': '' },
        { 'S. No': '3', 'BOQ Items': 'H.2.1.1', 'Description': 'Plain Shotcrete', 'Unit': 'Cum', 'Day Plan': '8', 'Day Achieved': '0', 'Month Plan': '220', 'Month Achieved': '32', 'FY Plan': '370', 'FY Achieved': '114', 'Cum Plan': '370', 'Cum Achieved': '114', 'Remarks': '' },
        { 'S. No': '4', 'BOQ Items': 'H.2.2.1', 'Description': 'Welded Wiremesh 4mm', 'Unit': 'Sqm', 'Day Plan': '61', 'Day Achieved': '0', 'Month Plan': '1700', 'Month Achieved': '186', 'FY Plan': '2800', 'FY Achieved': '850', 'Cum Plan': '2800', 'Cum Achieved': '850', 'Remarks': '' },
        { 'S. No': '5', 'BOQ Items': 'H.2.6.1.2', 'Description': 'SN-32mm', 'Unit': 'Rmt', 'Day Plan': '189', 'Day Achieved': '0', 'Month Plan': '5300', 'Month Achieved': '706', 'FY Plan': '8800', 'FY Achieved': '1/38', 'Cum Plan': '8800', 'Cum Achieved': '1/38', 'Remarks': '' },
        // Pot Head section
        { 'S. No': '', 'BOQ Items': '', 'Description': 'Pot Head', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
        { 'S. No': '1', 'BOQ Items': 'J.1.1.1', 'Description': 'Soft Soil Excavation', 'Unit': 'Cum', 'Day Plan': '0', 'Day Achieved': '0.00', 'Month Plan': '0', 'Month Achieved': '0.00', 'FY Plan': '35000', 'FY Achieved': '32000.00', 'Cum Plan': '35000.00', 'Cum Achieved': '32000.00', 'Remarks': '' },
        { 'S. No': '2', 'BOQ Items': 'J.3.1.2', 'Description': 'Plain Shotcrete', 'Unit': 'Cum', 'Day Plan': '3', 'Day Achieved': '0.00', 'Month Plan': '85', 'Month Achieved': '10.00', 'FY Plan': '1835', 'FY Achieved': '154.00', 'Cum Plan': '1835.00', 'Cum Achieved': '154.00', 'Remarks': '' },
        { 'S. No': '3', 'BOQ Items': 'J.4.2.1', 'Description': 'Welded Wiremesh 4mm', 'Unit': 'Sqm', 'Day Plan': '46', 'Day Achieved': '0.00', 'Month Plan': '1300', 'Month Achieved': '150.00', 'FY Plan': '2250', 'FY Achieved': '585.00', 'Cum Plan': '2250.00', 'Cum Achieved': '585.00', 'Remarks': '' },
        { 'S. No': '4', 'BOQ Items': 'JNS-01', 'Description': 'SDA-32mm', 'Unit': 'Rmt', 'Day Plan': '55', 'Day Achieved': '0.00', 'Month Plan': '1550', 'Month Achieved': '0.00', 'FY Plan': '2450', 'FY Achieved': '0.00', 'Cum Plan': '2450.00', 'Cum Achieved': '0.00', 'Remarks': '' },
        // Gate Shaft section
        { 'S. No': '', 'BOQ Items': '', 'Description': 'Gate Shaft', 'Unit': '', 'Day Plan': '', 'Day Achieved': '', 'Month Plan': '', 'Month Achieved': '', 'FY Plan': '', 'FY Achieved': '', 'Cum Plan': '', 'Cum Achieved': '', 'Remarks': '' },
      ];

    case 'BOQ Details':
      return [
        { 'BOQ Code': '1/1', 'Description': 'Surface Drilling in all types of soil/Murrum/\nExisting Embankment or channel embankment\nin all types of rock is specified three grades\nincluding disposal/stacking', 'UNIT': 'Cum', 'BOQ QTY': '6210', 'RATE': '300', 'AMOUNT': '1863000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '-' },
        { 'BOQ Code': '1/2', 'Description': 'Providing and laying in position plain cement\nconcrete of grade M10 in levelling course in\nunderground structures', 'UNIT': 'Cum', 'BOQ QTY': '450', 'RATE': '5800', 'AMOUNT': '2250000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '-' },
        { 'BOQ Code': '1/3', 'Description': 'Providing and laying in position plain cement\nconcrete of grade M10 in concrete all\nunderground structures', 'UNIT': 'Cum', 'BOQ QTY': '130', 'RATE': '6500', 'AMOUNT': '845000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '-' },
        { 'BOQ Code': '1/4', 'Description': 'Ready mix supply or batched/Weigh stones in cement\nmortar 1:4 using double or single stones in courses\nmechanical/manual', 'UNIT': 'Cum', 'BOQ QTY': '4560', 'RATE': '1700', 'AMOUNT': '8432000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '-' },
        { 'BOQ Code': '1/5', 'Description': 'Inserting units complete as per drawing and\nTechnical Specification', 'UNIT': 'Nos', 'BOQ QTY': '1010', 'RATE': '190', 'AMOUNT': '191900', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '-' },
        // Pot Head section
        { 'BOQ Code': 'Pot Head', 'Description': 'Soft Soil Excavation', 'UNIT': 'Cum', 'BOQ QTY': '35000', 'RATE': '147', 'AMOUNT': '5145000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '1000', 'Jun-26': '20630', 'Jul-26': '10470', 'Aug-26': '', 'Sep-26': '' },
        { 'BOQ Code': 'Pot Head-S', 'Description': 'Plain Shotcrete', 'UNIT': 'Cum', 'BOQ QTY': '175,000', 'RATE': '16000', 'AMOUNT': '2800000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '114', 'Aug-26': '10', 'Sep-26': '' },
        { 'BOQ Code': 'Pot Head-W', 'Description': 'Welded Wiremesh 4mm', 'UNIT': 'Sqm', 'BOQ QTY': '1,200.00', 'RATE': '362', 'AMOUNT': '434400', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '435', 'Aug-26': '150', 'Sep-26': '' },
        { 'BOQ Code': 'Pot Head-R', 'Description': 'SDA-32mm', 'UNIT': 'm', 'BOQ QTY': '1400', 'RATE': '1475', 'AMOUNT': '2065000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '-', 'Sep-26': '' },
        // Gate Shaft section
        { 'BOQ Code': 'GS-E', 'Description': 'Soft Soil Excavation', 'UNIT': 'Cum', 'BOQ QTY': '35000', 'RATE': '147', 'AMOUNT': '5145000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '3900', 'Sep-26': '1700' },
        { 'BOQ Code': 'GS-S', 'Description': 'Plain Shotcrete', 'UNIT': 'Cum', 'BOQ QTY': '175,000', 'RATE': '16000', 'AMOUNT': '2800000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '87', 'Sep-26': '46' },
        { 'BOQ Code': 'GS-W', 'Description': 'Welded Wiremesh 4mm', 'UNIT': 'Sqm', 'BOQ QTY': '1,200.00', 'RATE': '362', 'AMOUNT': '434400', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '750', 'Sep-26': '390' },
        { 'BOQ Code': 'JNS 01', 'Description': 'SDA-32mm', 'UNIT': 'm', 'BOQ QTY': '1400', 'RATE': '1475', 'AMOUNT': '2065000', 'Sep-25': '-', 'Oct-25': '-', 'Nov-25': '-', 'Dec-25': '-', 'Jan-26': '-', 'Feb-26': '-', 'Mar-26': '-', 'Apr-26': '-', 'May-26': '-', 'Jun-26': '-', 'Jul-26': '-', 'Aug-26': '531', 'Sep-26': '288' },
      ];

    case 'DPR of Main work':
      return [
        { 'Month': 'Aug 26', 'Date': '03 08 2026', 'WBS': 'Civil Works', 'Sub WBS': 'Gate Shaft', 'BOQ Item No.': 'CS.S', 'EL': '', 'Location': 'Gate Shaft', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '8.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '03-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Upper Reservoir', 'BOQ Item No.': 'A.1.1', 'EL': '', 'Location': 'UR', 'Activity': 'Soft Soil', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '3800.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '03-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Upper Reservoir', 'BOQ Item No.': 'A.1.2', 'EL': '', 'Location': 'UR', 'Activity': 'Hard Rock', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '400.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'UG', 'BOQ Item No.': 'K.1.1.1', 'EL': '687.9', 'Location': 'MAT', 'Activity': 'Excavation', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '300.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'UG', 'BOQ Item No.': 'K.2.1.1', 'EL': '687.9', 'Location': 'MAT', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '12.00', 'Remarks': 'SFRS' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'UG', 'BOQ Item No.': 'K.3.3.2.1', 'EL': '685', 'Location': 'MAT', 'Activity': 'SN-25mm', 'Unit': 'm', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '52.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'UG', 'BOQ Item No.': 'K.3.3.2.1.1', 'EL': '688.75', 'Location': 'MAT', 'Activity': 'SN-25mm', 'Unit': 'm', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '18.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Adit', 'BOQ Item No.': 'J.2.1.1', 'EL': '370.3', 'Location': 'ADT Bottom', 'Activity': 'Excavation', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '250.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Adit', 'BOQ Item No.': 'J.3.1.1', 'EL': '367', 'Location': 'ADT Bottom', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '130.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'UG', 'BOQ Item No.': 'L.1.1.2', 'EL': '684.3', 'Location': 'CVT', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '0.00', 'Remarks': 'SFRS' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'PH', 'BOQ Item No.': 'H.1.1.1', 'EL': '45.6', 'Location': 'PH', 'Activity': 'Excavation', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '250.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'PH', 'BOQ Item No.': 'H.2.1.1', 'EL': '43.5', 'Location': 'PH', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '8.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'PH', 'BOQ Item No.': 'H.2.2.1', 'EL': '46.8', 'Location': 'PH', 'Activity': 'wiremesh', 'Unit': 'sqm', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '45.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Pot Head', 'BOQ Item No.': 'Pot Head-W', 'EL': '', 'Location': 'Pot head yard', 'Activity': 'wiremesh', 'Unit': 'sqm', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '40.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Pot Head', 'BOQ Item No.': 'Pot Head-S', 'EL': '', 'Location': 'Pot head yard', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '10.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Gate Shaft', 'BOQ Item No.': 'GS.E', 'EL': '', 'Location': 'Gate Shaft', 'Activity': 'soil excavation', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '450.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Gate Shaft', 'BOQ Item No.': 'GS-S', 'EL': '', 'Location': 'Gate Shaft', 'Activity': 'Shotcrete', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '10.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Gate Shaft', 'BOQ Item No.': 'GS-W', 'EL': '', 'Location': 'Gate Shaft', 'Activity': 'wiremesh', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '180.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Upper Reservoir', 'BOQ Item No.': 'A.1.1', 'EL': '', 'Location': 'UR', 'Activity': 'Soft Soil', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '4000.00', 'Remarks': '' },
        { 'Month': 'Aug 26', 'Date': '04-08-2026', 'WBS': 'Civil Works', 'Sub WBS': 'Upper Reservoir', 'BOQ Item No.': 'A.1.2', 'EL': '', 'Location': 'UR', 'Activity': 'Hard Rock', 'Unit': 'Cum', 'From RC': '', 'To RD': '', "No's": '', 'Length': '', 'Width': '', 'Depth': '', 'Theo. Qty': '', 'Qty Executed': '300.00', 'Remarks': '' },
      ];

    case 'LM Status':
      return [
        { 'S. No': '', 'Section': '', 'Description': 'Power House', 'Unit': '', 'Total Scope': '', 'Cum Achieved': '', 'Today Qty': '', 'Monthly Achieved': '', 'Balance': '', 'Status': '', 'Remarks': '' },
        { 'S. No': '2', 'Section': '', 'Description': 'towards Power House', 'Unit': 'Rmt', 'Total Scope': '163', 'Cum Achieved': '163', 'Today Qty': '0.00', 'Monthly Achieved': '163.0', 'Balance': '0.00', 'Status': 'Completed', 'Remarks': '' },
        { 'S. No': '3', 'Section': '', 'Description': 'Power House', 'Unit': 'Rmt', 'Total Scope': '294.00', 'Cum Achieved': '54.00', 'Today Qty': '0.00', 'Monthly Achieved': '54.00', 'Balance': '240.00', 'Status': '', 'Remarks': '' },
        { 'S. No': '', 'Section': 'C', 'Description': 'Tail Race Tunnel (TRT Adit)', 'Unit': '', 'Total Scope': '', 'Cum Achieved': '', 'Today Qty': '', 'Monthly Achieved': '', 'Balance': '', 'Status': '', 'Remarks': '' },
        { 'S. No': '', 'Section': '', 'Description': 'ATSC Upto Junction', 'Unit': 'Rmt', 'Total Scope': '390.00', 'Cum Achieved': '390.00', 'Today Qty': '-', 'Monthly Achieved': '390.00', 'Balance': '0.00', 'Status': 'Completed', 'Remarks': '' },
        { 'S. No': '1', 'Section': '', 'Description': 'ADIT to Surcharge Chamber', 'Unit': 'Rmt', 'Total Scope': '833.38', 'Cum Achieved': '833.38', 'Today Qty': '0.00', 'Monthly Achieved': '833.38', 'Balance': '0.00', 'Status': 'Completed', 'Remarks': '0.00' },
        { 'S. No': '', 'Section': '', 'Description': 'Surcharge Chamber', 'Unit': 'Rmt', 'Total Scope': '270.00', 'Cum Achieved': '13.70', 'Today Qty': '4.00', 'Monthly Achieved': '17.70', 'Balance': '252.30', 'Status': '', 'Remarks': '' },
        { 'S. No': '2', 'Section': '', 'Description': 'Adit to TRT Bottom', 'Unit': 'Rmt', 'Total Scope': '426.35', 'Cum Achieved': '377.00', 'Today Qty': '3.00', 'Monthly Achieved': '380.00', 'Balance': '46.45', 'Status': 'Additionally, two niches with a total length of 16 m were completed.', 'Remarks': '' },
        { 'S. No': '', 'Section': '', 'Description': 'Gate Shaft', 'Unit': '', 'Total Scope': '', 'Cum Achieved': '', 'Today Qty': '', 'Monthly Achieved': '', 'Balance': '', 'Status': '', 'Remarks': '' },
        { 'S. No': '1', 'Section': '', 'Description': 'Gate Shaft Excavation', 'Unit': 'Cum', 'Total Scope': '55000', 'Cum Achieved': '5350.00', 'Today Qty': '250.00', 'Monthly Achieved': '5600.0', 'Balance': '49400', 'Status': 'Heavy Rainfall Hampered work', 'Remarks': '' },
        { 'S. No': '', 'Section': '', 'Description': 'Upper Reservoir', 'Unit': '', 'Total Scope': '', 'Cum Achieved': '', 'Today Qty': '', 'Monthly Achieved': '', 'Balance': '', 'Status': '', 'Remarks': '' },
        { 'S. No': '1', 'Section': '', 'Description': 'Excavation-Soft soil', 'Unit': 'Cum', 'Total Scope': '143741', 'Cum Achieved': '34073.00', 'Today Qty': '3000.00', 'Monthly Achieved': '37073.0', 'Balance': '106668', 'Status': 'Heavy Rainfall Hampered work', 'Remarks': '' },
        { 'S. No': '2', 'Section': '', 'Description': 'Excavation-Hard Rock', 'Unit': 'Cum', 'Total Scope': '1909.00', 'Cum Achieved': '13310.00', 'Today Qty': '3000.00', 'Monthly Achieved': '16310.0', 'Balance': '1893390', 'Status': 'Heavy Rainfall Hampered work', 'Remarks': '' },
      ];


    case 'Manpower':
      return [
        { 'S No': '1', 'Contractor / Agency': "M/s RPPL", 'Categories': 'On Roll Staff', 'Unit': 'Nos', [yesterdayDate]: '99', [todayDate]: '98', 'Remarks': '' },
        { 'S No': '2', 'Contractor / Agency': '', 'Categories': 'PRW Skilled &\nunskilled (Infra works)', 'Unit': 'Nos', [yesterdayDate]: '93', [todayDate]: '93', 'Remarks': '' },
        { 'S No': '3', 'Contractor / Agency': 'Civil work', 'Categories': 'Skilled & unskilled\n(Main Works)', 'Unit': 'Nos', [yesterdayDate]: '284', [todayDate]: '279', 'Remarks': '' },
        { 'S No': '4', 'Contractor / Agency': '', 'Categories': 'Driver/Operator', 'Unit': 'Nos', [yesterdayDate]: '105', [todayDate]: '113', 'Remarks': '' },
        { 'S No': '5', 'Contractor / Agency': '', 'Categories': 'Helpers / essential staffs', 'Unit': 'Nos', [yesterdayDate]: '142', [todayDate]: '143', 'Remarks': '' },
        { 'S No': '6', 'Contractor / Agency': 'Sub-Contractor A', 'Categories': 'Electricians', 'Unit': 'Nos', [yesterdayDate]: '35', [todayDate]: '35', 'Remarks': '' },
        { 'S No': '7', 'Contractor / Agency': 'Sub-Contractor B', 'Categories': 'Welders', 'Unit': 'Nos', [yesterdayDate]: '22', [todayDate]: '24', 'Remarks': '' },
        { 'S No': '8', 'Contractor / Agency': 'Sub-Contractor C', 'Categories': 'Safety Team', 'Unit': 'Nos', [yesterdayDate]: '15', [todayDate]: '15', 'Remarks': '' },
      ];

    case 'Plant & Machinery':
      return [
        { 'S No': '1', 'Equipment Type': 'Excavator 210', 'Make / Model': 'Komatsu PC210', 'Nos': '3', 'Capacity': '21 Ton', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '3', 'Idle': '0', 'Breakdown': '0', 'Remarks': '' },
        { 'S No': '2', 'Equipment Type': 'Excavator 360', 'Make / Model': 'CAT 336', 'Nos': '2', 'Capacity': '36 Ton', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '1', 'Idle': '1', 'Breakdown': '0', 'Remarks': 'Idle due to rain' },
        { 'S No': '3', 'Equipment Type': 'Dump Truck', 'Make / Model': 'Tata Prima', 'Nos': '8', 'Capacity': '25 Ton', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '6', 'Idle': '1', 'Breakdown': '1', 'Remarks': '' },
        { 'S No': '4', 'Equipment Type': 'Wheel Loader', 'Make / Model': 'JCB 432ZX', 'Nos': '2', 'Capacity': '3.2 Cu.m', 'Owner': 'Sub-Con', 'Status': 'Working', 'Working': '2', 'Idle': '0', 'Breakdown': '0', 'Remarks': '' },
        { 'S No': '5', 'Equipment Type': 'Concrete Mixer', 'Make / Model': 'Schwing Stetter', 'Nos': '4', 'Capacity': '1 Cu.m', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '3', 'Idle': '0', 'Breakdown': '1', 'Remarks': 'Drum repair' },
        { 'S No': '6', 'Equipment Type': 'Tower Crane', 'Make / Model': 'Liebherr 280', 'Nos': '1', 'Capacity': '12 Ton', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '1', 'Idle': '0', 'Breakdown': '0', 'Remarks': '' },
        { 'S No': '7', 'Equipment Type': 'Shotcrete Machine', 'Make / Model': 'Putzmeister SPM 4210', 'Nos': '2', 'Capacity': '20 Cu.m/hr', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '2', 'Idle': '0', 'Breakdown': '0', 'Remarks': '' },
        { 'S No': '8', 'Equipment Type': 'Drill Jumbo', 'Make / Model': 'Atlas Copco WE3C', 'Nos': '2', 'Capacity': '3 Boom', 'Owner': 'RPPL', 'Status': 'Working', 'Working': '1', 'Idle': '0', 'Breakdown': '1', 'Remarks': 'Hydraulic leak' },
      ];

    case 'Breakdown Reports':
      return [
        { 'Date': '1-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '2-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '3-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '4-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '5-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '6-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '7-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': 'No Major Breakdowns' },
        { 'Date': '8-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '9-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '10-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '11-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '12-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '13-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
        { 'Date': '14-Aug-2026', 'Machine/Equipment': '', 'Breakdown Detail': '', 'Breakdown Hours': '', 'Remarks': '' },
      ];

    case 'Comments':
      return [
        { 'DATE': '7-Aug-2026', 'Additional Comments': 'MAT Towards Power House - Excavation, Shotcrete & Rock Bolt Installation Work in Progress.\nATSC - Excavation, Shotcrete & False portal Work in Progress.\nAdit Bottom Excavation, Shotcrete & Work in Progress.\nCVT- Transformer Hall - Excavation, Shotcrete, False Portal Work in Progress.\nCVT- Power House Excavation, Shotcrete & Work in Progress\nHotel Building Construction work in progress.\nApproach Road - Soil filling, boulders clearing work is in progress.\nUpper Reservoir - Soil excavation work is in progress.\nPot Yard Excavation, shotcrete, wiremesh and SDA bolt installation work in progress\nGate Shell - Excavation, shotcrete, wiremesh and SDA bolt installation work in progress.' },
        { 'DATE': '8-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '9-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '10-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '11-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '12-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '13-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '14-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '15-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '16-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '17-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '18-Aug-2026', 'Additional Comments': '' },
        { 'DATE': '19-Aug-2026', 'Additional Comments': '' },
      ];

    case 'Hindrance':
      return [
        { 'Sr No': '1', 'Hindrance / Bottleneck': 'PVC perforated pipe', 'Remark': 'As per the drawing, RPPL initially drilled a 76 mm diameter hole, wrapped the assembly with geotextile, and inserted it into the hole. However, due to the geotextile, it could only be inserted up to 5 meters. The assembly was then removed, and drilling was attempted with a 102 mm diameter hole. Even after reaching 9 meters, the drilling did not achieve the targeted depth of 13 meters. As per instructions, RPPL has now commenced drilling at a 20-degree angle.' },
        { 'Sr No': '2', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Due to Red Alert Work Hampered 21.10.2025' },
        { 'Sr No': '3', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Due to Red Alert Work Hampered 22.10.2025' },
        { 'Sr No': '4', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Due to Red Alert Work Hampered 23.10.2025' },
        { 'Sr No': '5', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Due to Red Alert Work Hampered 24.10.2025' },
        { 'Sr No': '6', 'Hindrance / Bottleneck': 'Light Rainfall', 'Remark': 'Due to Red Alert Work Hampered 27.10.2025' },
        { 'Sr No': '7', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Due to Red Alert Work Hampered 28.10.2025' },
        { 'Sr No': '8', 'Hindrance / Bottleneck': 'Light Rainfall', 'Remark': 'Work Hampered due to rainfall on 21.11.2025' },
        { 'Sr No': '9', 'Hindrance / Bottleneck': 'Light Rainfall', 'Remark': 'Work Hampered due to rainfall on 23.11.2025' },
        { 'Sr No': '10', 'Hindrance / Bottleneck': 'Light Rainfall', 'Remark': 'Work Hampered due to rainfall on 10.01.2026' },
        { 'Sr No': '11', 'Hindrance / Bottleneck': 'Light Rainfall', 'Remark': 'Work Hampered due to rainfall on 18.05.2026' },
        { 'Sr No': '12', 'Hindrance / Bottleneck': 'Shortage Cement', 'Remark': 'Work Hampered due to shortage of cement on 05.05.2026' },
        { 'Sr No': '13', 'Hindrance / Bottleneck': 'Shortage Cement', 'Remark': 'Work Hampered due to shortage of cement on 06.05.2026' },
        { 'Sr No': '14', 'Hindrance / Bottleneck': 'Diesel shortage', 'Remark': 'Work Hampered due to diesel shortage on 24.04.2026' },
        { 'Sr No': '15', 'Hindrance / Bottleneck': 'Diesel shortage', 'Remark': 'Work Hampered due to diesel shortage on 25.04.2026' },
        { 'Sr No': '16', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Work Hampered due to rainfall on 28.05.2026' },
        { 'Sr No': '17', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Work Hampered due to rainfall on 30.05.2026' },
        { 'Sr No': '18', 'Hindrance / Bottleneck': 'Heavy Rainfall', 'Remark': 'Work Hampered due to rainfall on 31.05.2026' },
      ];

    default:
      return [];
  }
};