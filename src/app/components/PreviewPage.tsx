import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ExcelGrid } from './ExcelGrid';
import { toast } from 'sonner';

interface PreviewPageProps {
  projectName: string;
  onBack: () => void;
}

export function PreviewPage({ projectName, onBack }: PreviewPageProps) {
  const [isPushing, setIsPushing] = useState(false);
  const [isPushed, setIsPushed] = useState(false);

  const columns = [
    'Activities',
    'Plot',
    'New Block Nom',
    'Priority',
    'Contractor Name',
    'Scope',
    'Actual',
    '% Completion',
    'Remarks'
  ];

  const dprData = [
    {
      'Activities': 'Site Preparation',
      'Plot': 'A-101',
      'New Block Nom': 'Block 1',
      'Priority': 'High',
      'Contractor Name': 'ABC Construction',
      'Scope': 'Excavation and leveling',
      'Actual': '85%',
      '% Completion': '85',
      'Remarks': 'On track'
    },
    {
      'Activities': 'Foundation Work',
      'Plot': 'A-102',
      'New Block Nom': 'Block 1',
      'Priority': 'High',
      'Contractor Name': 'XYZ Builders',
      'Scope': 'Concrete foundation',
      'Actual': '60%',
      '% Completion': '60',
      'Remarks': 'Material delay'
    }
  ];

  const summaryData = [
    {
      'Activities': 'Phase 1 Completion',
      'Plot': 'All',
      'New Block Nom': 'Block 1-3',
      'Priority': 'High',
      'Contractor Name': 'Multiple',
      'Scope': 'Overall progress',
      'Actual': '72%',
      '% Completion': '72',
      'Remarks': 'Ahead of schedule'
    }
  ];

  const manpowerData = [
    {
      'Activities': 'Labor Allocation',
      'Plot': 'A-101',
      'New Block Nom': 'Block 1',
      'Priority': 'High',
      'Contractor Name': 'ABC Construction',
      'Scope': '50 workers',
      'Actual': '48 workers',
      '% Completion': '96',
      'Remarks': '2 on leave'
    }
  ];

  const handlePushToP6 = async () => {
    setIsPushing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPushing(false);
    setIsPushed(true);
    toast.success('Data successfully pushed to P6 database!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F3F2F1' }}>
      <header className="shadow-sm p-6" style={{ backgroundColor: '#002D72' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button 
              onClick={onBack}
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl text-white">Preview & Push to P6</h1>
              <p className="text-gray-300 mt-1">{projectName}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <Card className="p-6 mb-6" style={{ borderColor: '#00A3A1', borderWidth: '2px' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl mb-2" style={{ color: '#002D72' }}>
                Ready to Push Data
              </h2>
              <p className="text-gray-600">
                Review the combined data from all sheets before pushing to P6 database
              </p>
            </div>
            <Button 
              onClick={handlePushToP6}
              disabled={isPushing || isPushed}
              className="text-white flex items-center gap-2 px-8 h-12"
              style={{ backgroundColor: isPushed ? '#22c55e' : '#00A3A1' }}
            >
              {isPushing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Pushing...
                </>
              ) : isPushed ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Pushed Successfully
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Push to P6 Database
                </>
              )}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <Tabs defaultValue="dpr" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="dpr">DPR Sheet</TabsTrigger>
              <TabsTrigger value="summary">Summary Sheet</TabsTrigger>
              <TabsTrigger value="manpower">Manpower Sheet</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dpr">
              <div className="mb-4">
                <h3 className="text-lg" style={{ color: '#002D72' }}>DPR Data Preview</h3>
                <p className="text-sm text-gray-600">{dprData.length} rows</p>
              </div>
              <ExcelGrid 
                data={dprData} 
                columns={columns}
                editable={false}
              />
            </TabsContent>
            
            <TabsContent value="summary">
              <div className="mb-4">
                <h3 className="text-lg" style={{ color: '#002D72' }}>Summary Data Preview</h3>
                <p className="text-sm text-gray-600">{summaryData.length} rows</p>
              </div>
              <ExcelGrid 
                data={summaryData} 
                columns={columns}
                editable={false}
              />
            </TabsContent>
            
            <TabsContent value="manpower">
              <div className="mb-4">
                <h3 className="text-lg" style={{ color: '#002D72' }}>Manpower Data Preview</h3>
                <p className="text-sm text-gray-600">{manpowerData.length} rows</p>
              </div>
              <ExcelGrid 
                data={manpowerData} 
                columns={columns}
                editable={false}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
}
