import { useState } from 'react';
import { Bell, X, ExternalLink, Check, AlertCircle, XCircle, MessageSquare, Upload, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Notification, getUnreadCount } from '../lib/notificationData';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationPanelProps {
  notifications: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  theme: 'light' | 'dark';
}

export function NotificationPanel({ notifications, onNotificationClick, theme }: NotificationPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const unreadCount = getUnreadCount(notifications);

  const handleNotificationClick = (notification: Notification) => {
    setExpandedId(expandedId === notification.id ? null : notification.id);
  };

  const formatDate = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateLabel = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    
    if (date.toDateString() === today.toDateString()) {
      dateLabel = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      dateLabel = 'Yesterday';
    }

    return `${dateLabel} at ${timeStr}`;
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'submitted': return '#3b82f6';
      case 'pushed': return '#8b5cf6';
      case 'commented': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'approved': return <Check className="w-4 h-4 text-white" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-white" />;
      case 'submitted': return <Upload className="w-4 h-4 text-white" />;
      case 'pushed': return <Upload className="w-4 h-4 text-white" />;
      case 'commented': return <MessageSquare className="w-4 h-4 text-white" />;
      default: return <AlertCircle className="w-4 h-4 text-white" />;
    }
  };

  const isLight = theme === 'light';

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="relative text-white hover:bg-white/20 p-3 rounded-xl"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Blurred Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9998] bg-black/30"
              style={{ backdropFilter: 'blur(8px)' }}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
              }}
              className={`absolute right-0 top-full mt-2 w-[720px] max-w-[calc(100vw-2rem)] rounded-2xl shadow-2xl border-2 z-[9999] overflow-hidden ${
                isLight 
                  ? 'bg-white/95 border-gray-200' 
                  : 'bg-[#1f1735]/95 border-purple-700/60'
              }`}
              style={{ backdropFilter: 'blur(20px)' }}
            >
              <div className={`p-4 sm:p-5 border-b-2 flex items-center justify-between ${
                isLight 
                  ? 'border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50' 
                  : 'border-purple-800/60'
              }`} style={!isLight ? { background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' } : {}}>
                <div>
                  <h3 className={`text-xl sm:text-2xl ${isLight ? 'text-gray-800' : 'text-white'}`}>Notifications</h3>
                  <p className={`text-xs sm:text-sm mt-0.5 ${isLight ? 'text-gray-600' : 'text-pink-100'}`}>{unreadCount} unread notifications</p>
                </div>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="sm"
                  className={`rounded-full p-2 ${
                    isLight ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/20'
                  }`}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="max-h-[calc(75vh-80px)] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className={`p-8 text-center ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="divide-y" style={{ borderColor: isLight ? '#e5e7eb' : '#4c1d95' }}>
                    <AnimatePresence initial={false}>
                      {notifications.map((notification) => {
                        const isExpanded = expandedId === notification.id;
                        return (
                          <motion.div
                            key={notification.id}
                            initial={false}
                            className={`transition-colors ${
                              !notification.read 
                                ? isLight 
                                  ? 'bg-blue-50/50' 
                                  : 'bg-purple-900/20'
                                : isLight
                                  ? 'bg-white'
                                  : 'bg-transparent'
                            } ${isLight ? 'hover:bg-blue-50' : 'hover:bg-purple-900/10'}`}
                          >
                            {/* Notification Header - Always Visible */}
                            <div 
                              className="p-3 sm:p-4 cursor-pointer"
                              onClick={() => handleNotificationClick(notification)}
                            >
                              <div className="flex items-center justify-between gap-2 sm:gap-3">
                                {/* Unread Indicator */}
                                {!notification.read && (
                                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                    isLight ? 'bg-blue-500' : 'bg-pink-400'
                                  } animate-pulse`}></div>
                                )}
                                
                                {/* Activity Icon */}
                                <div 
                                  className="w-9 h-9 rounded-lg flex items-center justify-center shadow-md flex-shrink-0"
                                  style={{ backgroundColor: getActivityColor(notification.activity) }}
                                >
                                  {getActivityIcon(notification.activity)}
                                </div>
                                
                                {/* Project Name */}
                                <div className="flex-1 min-w-0" style={{ maxWidth: '200px' }}>
                                  <span className={`text-xs sm:text-sm uppercase tracking-wide truncate block ${
                                    isLight ? 'text-gray-800 font-bold' : 'text-pink-300 font-bold'
                                  }`} title={notification.projectName}>{notification.projectName}</span>
                                </div>
                                
                                {/* Sheet Name */}
                                <div className="flex-1 min-w-0">
                                  <p className={`text-xs sm:text-sm truncate ${isLight ? 'text-gray-800 font-medium' : 'text-white font-medium'}`} title={notification.sheetName}>
                                    {notification.sheetName}
                                  </p>
                                </div>
                                
                                {/* Activity Badge */}
                                <span 
                                  className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-md flex-shrink-0"
                                  style={{ backgroundColor: getActivityColor(notification.activity) }}
                                >
                                  {notification.activity}
                                </span>
                                
                                {/* Time */}
                                <div className={`text-xs flex-shrink-0 ${isLight ? 'text-gray-500' : 'text-gray-400'}`} style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                  {formatDate(notification.date, notification.time)}
                                </div>
                                
                                {/* Expand Arrow */}
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                  className="flex-shrink-0"
                                >
                                  <ChevronDown 
                                    className={`w-4 h-4 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}
                                  />
                                </motion.div>
                              </div>
                            </div>

                            {/* Expanded Content - Shows when clicked */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ 
                                    height: 'auto', 
                                    opacity: 1,
                                    transition: {
                                      height: {
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1]
                                      },
                                      opacity: {
                                        duration: 0.3,
                                        delay: 0.1,
                                        ease: [0.4, 0, 0.2, 1]
                                      }
                                    }
                                  }}
                                  exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    transition: {
                                      height: {
                                        duration: 0.3,
                                        ease: [0.4, 0, 0.2, 1]
                                      },
                                      opacity: {
                                        duration: 0.2,
                                        ease: [0.4, 0, 0.2, 1]
                                      }
                                    }
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className={`px-4 pb-4 border-t ${
                                    isLight ? 'bg-gray-50/80 border-gray-200' : 'bg-gray-900/30 border-purple-900/30'
                                  }`} style={{ backdropFilter: 'blur(10px)' }}>
                                    <motion.div 
                                      initial={{ y: -10 }}
                                      animate={{ y: 0 }}
                                      transition={{ duration: 0.3, delay: 0.1 }}
                                      className="pt-4 space-y-3"
                                    >
                                      {/* Remarks */}
                                      <div>
                                        <label className={`text-xs uppercase tracking-wider mb-2 block ${
                                          isLight ? 'text-gray-600 font-semibold' : 'text-purple-300 font-semibold'
                                        }`}>Remarks</label>
                                        <div className={`border-2 rounded-lg p-3 shadow-sm ${
                                          isLight 
                                            ? 'bg-white border-gray-200' 
                                            : 'bg-gray-900/50 border-purple-800/50'
                                        }`}>
                                          <p className={`text-sm leading-relaxed ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                                            {notification.remarks}
                                          </p>
                                        </div>
                                      </div>

                                      {/* Go to Link */}
                                      <Button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (onNotificationClick) {
                                            onNotificationClick(notification);
                                          }
                                          setExpandedId(null);
                                          setIsOpen(false);
                                        }}
                                        className="w-full text-white shadow-lg py-2.5 text-sm rounded-lg hover:shadow-xl transition-all"
                                        style={{ background: 'linear-gradient(135deg, #75479C 0%, #BD3861 100%)' }}
                                      >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Go to {notification.sheetName}
                                      </Button>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
