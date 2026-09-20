import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Plus, Highlighter } from 'lucide-react';
import { Button } from './ui/button';
import { getYesterdayDate, getTodayDate } from '../lib/sheetConfigs';

interface ResourceGridProps {
  data: any[];
  columns: string[];
  onDataChange?: (data: any[]) => void;
  editable?: boolean;
  dateColumnColors?: {
    yesterday: string;
    today: string;
  };
  theme?: 'light' | 'dark';
  highlightedCells?: Set<string>;
  onHighlightChange?: (highlightedCells: Set<string>) => void;
  canHighlight?: boolean;
}

export function ResourceGrid({ 
  data, 
  columns, 
  onDataChange, 
  editable = true, 
  dateColumnColors, 
  theme = 'light',
  highlightedCells = new Set(),
  onHighlightChange,
  canHighlight = false
}: ResourceGridProps) {
  const [gridData, setGridData] = useState(data);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);

  // Sync state when data prop changes
  useEffect(() => {
    setGridData(data);
  }, [data]);

  const calculateTotal = (row: any) => {
    const yesterdayDate = getYesterdayDate();
    const todayDate = getTodayDate();
    
    let total = 0;
    columns.forEach(col => {
      if (col !== 'Type of Machine' && col !== 'Total' && col !== 'Remarks') {
        const value = parseInt(row[col]) || 0;
        total += value;
      }
    });
    return total.toString();
  };

  const handleCellChange = (rowIndex: number, columnKey: string, value: string) => {
    const newData = [...gridData];
    newData[rowIndex] = { ...newData[rowIndex], [columnKey]: value };
    
    // Auto-calculate total if a day column is changed
    if (columnKey !== 'Type of Machine' && columnKey !== 'Total' && columnKey !== 'Remarks') {
      newData[rowIndex]['Total'] = calculateTotal(newData[rowIndex]);
    }
    
    setGridData(newData);
    onDataChange?.(newData);
  };

  const addRow = () => {
    const newRow: any = {};
    columns.forEach(col => {
      newRow[col] = col === 'Total' ? '0' : '';
    });
    const newData = [...gridData, newRow];
    setGridData(newData);
    onDataChange?.(newData);
  };

  const isDateColumn = (column: string) => {
    const yesterdayDate = getYesterdayDate();
    const todayDate = getTodayDate();
    return column === yesterdayDate || column === todayDate;
  };

  const getDateColumnColor = (column: string) => {
    if (!dateColumnColors) {
      return theme === 'light' ? '#fef3c7' : '#78350f';
    }
    
    const yesterdayDate = getYesterdayDate();
    const todayDate = getTodayDate();
    
    if (column === yesterdayDate) return dateColumnColors.yesterday;
    if (column === todayDate) return dateColumnColors.today;
    return theme === 'light' ? '#ffffff' : '#1f1735';
  };

  const getColumnWidth = (column: string) => {
    if (column === 'Type of Machine') return '150px';
    if (column === 'Total') return '80px';
    if (isDateColumn(column)) return '100px';
    if (column === 'Remarks') return '150px';
    return '100px';
  };

  const getDateLabel = (column: string) => {
    const yesterdayDate = getYesterdayDate();
    const todayDate = getTodayDate();
    
    if (column === yesterdayDate) return 'Yesterday';
    if (column === todayDate) return 'Today';
    return '';
  };

  const isLight = theme === 'light';

  const toggleCellHighlight = (rowIndex: number, column: string) => {
    if (!canHighlight || !onHighlightChange) return;
    
    const cellKey = `${rowIndex}-${column}`;
    const newHighlighted = new Set(highlightedCells);
    
    if (newHighlighted.has(cellKey)) {
      newHighlighted.delete(cellKey);
    } else {
      newHighlighted.add(cellKey);
    }
    
    onHighlightChange(newHighlighted);
  };

  const isCellHighlighted = (rowIndex: number, column: string) => {
    return highlightedCells.has(`${rowIndex}-${column}`);
  };

  const handleDragStart = (rowIndex: number, column: string) => {
    if (!canHighlight) return;
    setDragStartCell(`${rowIndex}-${column}`);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStartCell(null);
  };

  const handleDragOver = (rowIndex: number, column: string) => {
    if (!isDragging || !dragStartCell) return;
    const newHighlighted = new Set(highlightedCells);
    newHighlighted.add(`${rowIndex}-${column}`);
    onHighlightChange?.(newHighlighted);
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 rounded-none overflow-auto shadow-sm" 
        style={{ 
          maxHeight: 'calc(100vh - 280px)',
          borderColor: isLight ? '#9ca3af' : '#7e22ce'
        }}
      >
        <table className="w-full border-collapse" style={{ fontSize: '11px', tableLayout: 'fixed' }}>
          <thead className="sticky top-0 z-20">
            <tr style={{ background: isLight ? '#e5e7eb' : 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}>
              <th 
                className="sticky left-0 z-30 text-center" 
                style={{ 
                  background: isLight ? '#e5e7eb' : 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)',
                  width: '40px',
                  minWidth: '40px',
                  maxWidth: '40px',
                  border: isLight ? '1px solid #9ca3af' : '1px solid #a855f7',
                  borderRight: isLight ? '2px solid #6b7280' : '2px solid #c026d3',
                  padding: '6px 4px',
                  color: isLight ? '#374151' : '#ffffff',
                  fontSize: '11px',
                  fontWeight: '700'
                }}
              >
                #
              </th>
              {columns.map((column) => (
                <th 
                  key={column}
                  style={{
                    backgroundColor: isDateColumn(column) ? getDateColumnColor(column) : 
                                    column === 'Total' ? (isLight ? '#dcfce7' : '#065f46') : 'transparent',
                    width: getColumnWidth(column),
                    minWidth: getColumnWidth(column),
                    maxWidth: getColumnWidth(column),
                    border: isLight ? '1px solid #9ca3af' : '1px solid #a855f7',
                    borderBottom: isDateColumn(column) ? (isLight ? '2px solid #667eea' : '2px solid #ec4899') : 
                                 column === 'Total' ? (isLight ? '2px solid #10b981' : '2px solid #34d399') : 
                                 (isLight ? '1px solid #9ca3af' : '1px solid #a855f7'),
                    padding: '6px 4px',
                    textAlign: 'left',
                    color: isLight ? '#1f2937' : '#ffffff',
                    fontSize: '11px',
                    fontWeight: '700',
                    lineHeight: '1.2',
                    whiteSpace: 'normal',
                    wordWrap: 'break-word'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span>{column}</span>
                    {isDateColumn(column) && (
                      <span style={{ 
                        color: isLight ? '#667eea' : '#fbbf24',
                        fontSize: '9px',
                        fontWeight: '600'
                      }}>
                        ({getDateLabel(column)})
                      </span>
                    )}
                    {column === 'Total' && (
                      <span style={{ 
                        color: isLight ? '#10b981' : '#34d399',
                        fontSize: '9px',
                        fontWeight: '600'
                      }}>
                        (Auto-calc)
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gridData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                style={{ 
                  backgroundColor: isLight 
                    ? (rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb')
                    : (rowIndex % 2 === 0 ? '#2d1b4e' : '#251640')
                }}
                className={isLight ? 'hover:bg-blue-50' : 'hover:bg-purple-900/40'}
              >
                <td 
                  className="sticky left-0 z-10 text-center"
                  style={{ 
                    backgroundColor: isLight 
                      ? (rowIndex % 2 === 0 ? '#f3f4f6' : '#e5e7eb')
                      : (rowIndex % 2 === 0 ? '#4c1d95' : '#5b21b6'),
                    border: isLight ? '1px solid #9ca3af' : '1px solid #a855f7',
                    borderRight: isLight ? '2px solid #6b7280' : '2px solid #c026d3',
                    padding: '4px',
                    color: isLight ? '#6b7280' : '#e9d5ff',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                >
                  {rowIndex + 1}
                </td>
                {columns.map((column) => {
                  const isHighlighted = isCellHighlighted(rowIndex, column);
                  const cellKey = `${rowIndex}-${column}`;
                  
                  return (
                    <td 
                      key={cellKey}
                      onClick={() => canHighlight && column !== 'Total' && toggleCellHighlight(rowIndex, column)}
                      onDragStart={() => handleDragStart(rowIndex, column)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(rowIndex, column);
                      }}
                      draggable={canHighlight && column !== 'Total'}
                      style={{
                        backgroundColor: isHighlighted 
                          ? (isLight ? '#fef08a' : '#854d0e')
                          : isDateColumn(column) ? getDateColumnColor(column) : 
                            column === 'Total' ? (isLight ? '#dcfce7' : '#065f46') : 'transparent',
                        border: isLight ? '1px solid #d1d5db' : '1px solid #7e22ce',
                        padding: '0',
                        width: getColumnWidth(column),
                        minWidth: getColumnWidth(column),
                        maxWidth: getColumnWidth(column),
                        position: 'relative',
                        cursor: canHighlight && column !== 'Total' ? 'pointer' : 'default'
                      }}
                    >
                      {isHighlighted && (
                        <div 
                          style={{
                            position: 'absolute',
                            top: '2px',
                            right: '2px',
                            width: '0',
                            height: '0',
                            borderLeft: '8px solid transparent',
                            borderTop: isLight ? '8px solid #f59e0b' : '8px solid #fbbf24',
                            zIndex: 5
                          }}
                        />
                      )}
                      {column === 'Total' ? (
                        <div 
                          style={{ 
                            padding: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: isLight ? '#10b981' : '#34d399',
                            minHeight: '32px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {row[column] || '0'}
                        </div>
                      ) : editable ? (
                        <Input
                          value={row[column] || ''}
                          onChange={(e) => handleCellChange(rowIndex, column, e.target.value)}
                          onFocus={() => setSelectedCell(cellKey)}
                          onBlur={() => setSelectedCell(null)}
                          className={`border-0 rounded-none focus-visible:ring-1 focus-visible:ring-offset-0 h-8 px-2 ${
                          isLight 
                            ? 'focus-visible:ring-blue-500 text-gray-900' 
                            : 'focus-visible:ring-pink-500 bg-transparent'
                        } ${selectedCell === cellKey ? 'ring-2' : ''}`}
                          style={{ 
                            backgroundColor: 'transparent',
                            color: isDateColumn(column) ? '#000000' : (isLight ? '#111827' : '#ffffff'),
                            fontSize: '11px',
                            fontWeight: isDateColumn(column) ? '600' : '400'
                          }}
                        />
                      ) : (
                        <div 
                          style={{ 
                            padding: '6px',
                            fontSize: '11px',
                            fontWeight: isDateColumn(column) ? '600' : '400',
                            color: isDateColumn(column) ? '#000000' : (isLight ? '#1f2937' : '#e9d5ff'),
                            minHeight: '32px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          {row[column] || ''}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}