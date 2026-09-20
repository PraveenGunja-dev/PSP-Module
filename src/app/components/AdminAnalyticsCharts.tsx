import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react';

interface AdminAnalyticsChartsProps {
  projectName: string;
  theme?: 'light' | 'dark';
}

export function AdminAnalyticsCharts({ projectName, theme = 'light' }: AdminAnalyticsChartsProps) {
  const isLight = theme === 'light';

  // Bar Graph Data: Plan vs Achieved Quantities by Work Area
  const barData = [
    { area: 'Civil Works', Plan: 85000, Achieved: 74200 },
    { area: 'Powerhouse', Plan: 62000, Achieved: 58400 },
    { area: 'Upper Reservoir', Plan: 110000, Achieved: 98500 },
    { area: 'Pot Head Yard', Plan: 45000, Achieved: 41200 },
    { area: 'Gate Shaft', Plan: 38000, Achieved: 35900 },
  ];

  // Pie Chart Data: Sheet Status Distribution
  const pieData = [
    { name: 'Approved', value: 4, color: '#10b981' },
    { name: 'Submitted', value: 2, color: '#06b6d4' },
    { name: 'Draft', value: 3, color: '#f59e0b' },
    { name: 'Pushed to P6', value: 1, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6 pt-4">
      {/* Header Divider */}
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: isLight ? '#e5e7eb' : '#4c1d95' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg" style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
              PMAG Analytics & Performance Charts
            </h2>
            <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-purple-200'}`}>
              Real-time progress metrics and sheet status breakdown for {projectName}
            </p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
          isLight ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-purple-900/40 text-purple-200 border-purple-700'
        }`}>
          Live Executive View
        </span>
      </div>

      {/* Grid Layout: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Graph: Target vs Actual Execution */}
        <div className={`lg:col-span-2 p-5 rounded-2xl shadow-xl border-2 flex flex-col ${
          isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-purple-900/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-pink-300 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-base font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
                  Target vs Actual Execution Bar Chart
                </h3>
                <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Cumulative Plan vs Achieved Volume (Cum)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1 text-purple-600 dark:text-purple-300">
                <span className="w-3 h-3 rounded-sm bg-purple-600 inline-block"></span> Plan Target
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span> Achieved Qty
              </span>
            </div>
          </div>

          <div className="h-56 w-full max-w-2xl mx-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} barSize={18} barGap={4} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="area" tick={{ fill: isLight ? '#4b5563' : '#cbd5e1', fontSize: 11 }} />
                <YAxis tick={{ fill: isLight ? '#4b5563' : '#cbd5e1', fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isLight ? '#ffffff' : '#1f1735', 
                    borderColor: isLight ? '#e5e7eb' : '#7e22ce',
                    borderRadius: '12px',
                    color: isLight ? '#1f2937' : '#ffffff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="Plan" fill="#75479C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Achieved" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Sheet Status Distribution */}
        <div className={`p-5 rounded-2xl shadow-xl border-2 flex flex-col ${
          isLight ? 'bg-white border-gray-200' : 'bg-gray-900 border-purple-900/50'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 dark:bg-purple-900/60 dark:text-pink-300 flex items-center justify-center">
              <PieChartIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-base font-bold ${isLight ? 'text-gray-800' : 'text-white'}`}>
                Sheet Status Breakdown
              </h3>
              <p className={`text-xs ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Pie Chart Status Summary</p>
            </div>
          </div>

          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isLight ? '#ffffff' : '#1f1735', 
                    borderColor: isLight ? '#e5e7eb' : '#7e22ce',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t" style={{ borderColor: isLight ? '#f3f4f6' : '#374151' }}>
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between px-2 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className={`text-xs font-medium ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>{item.name}</span>
                </div>
                <span className={`text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
