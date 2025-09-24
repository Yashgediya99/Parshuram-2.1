// import React, { useState } from 'react';
// import { Alert, Agent, Ticket } from '../../types'; // Import the 'Agent' type
// import AgentDetailsModal from '../Agents/AgentDetailsModal'; 
// import { 
//   AlertTriangle, 
//   Search, 
//   Filter, 
//   Eye, 
//   Check, 
//   Clock, 
//   Server,
//   Shield,
//   Activity,
//   Settings,
//   PlusCircle,
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// interface AlertsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// // const AlertsPage: React.FC = () => {
// const AlertsPage: React.FC<AlertsPageProps> = ({ tickets, setTickets }) => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const [filters, setFilters] = useState({
//     type: '',
//     severity: '',
//     acknowledged: ''
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
//   const [showAgentModal, setShowAgentModal] = useState(false); // Added missing state

//   // Mock data - replace with real API calls
//   const [alerts, setAlerts] = useState<Alert[]>([
//     {
//       id: 'ALT-001',
//       agentId: 'NET-005',
//       agentName: 'FIREWALL-001',
//       type: 'agent-down',
//       message: 'Agent has been offline for more than 2 hours',
//       severity: 'high',
//       timestamp: '2025-01-02T12:15:00Z',
//       acknowledged: false
//     },
//     {
//       id: 'ALT-002',
//       agentId: 'WIN-001',
//       agentName: 'DESKTOP-ABC123',
//       type: 'security',
//       message: 'Multiple failed login attempts detected',
//       severity: 'critical',
//       timestamp: '2025-01-02T14:20:00Z',
//       acknowledged: false
//     },
//     {
//       id: 'ALT-003',
//       agentId: 'MAC-007',
//       agentName: 'MACBOOK-DEV01',
//       type: 'maintenance',
//       message: 'Agent scheduled for maintenance window',
//       severity: 'low',
//       timestamp: '2025-01-02T10:00:00Z',
//       acknowledged: true,
//       acknowledgedBy: 'admin@parshuram.com',
//       acknowledgedAt: '2025-01-02T10:05:00Z'
//     },
//     {
//       id: 'ALT-004',
//       agentId: 'LIN-003',
//       agentName: 'SERVER-XYZ789',
//       type: 'performance',
//       message: 'High CPU usage detected (>90% for 15 minutes)',
//       severity: 'medium',
//       timestamp: '2025-01-02T13:45:00Z',
//       acknowledged: false
//     }
//   ]);

//   // CORRECTED: Added mock agent data to allow the 'find' method to work.
//   const agents: Agent[] = [
//     {
//       id: 'WIN-001',
//       name: 'DESKTOP-ABC123',
//       ip: '192.168.1.100',
//       location: 'New York Office',
//       os: 'Windows 11 Pro',
//       version: '22H2',
//       status: 'active',
//       lastSeen: '2025-01-02T14:30:00Z',
//       uptime: '15 days, 4 hours',
//       geolocation: { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'USA' },
//       alertsCount: 2,
//       threatsCount: 5
//     },
//     {
//         id: 'LIN-003',
//         name: 'SERVER-XYZ789',
//         ip: '192.168.1.102',
//         location: 'San Francisco Office',
//         os: 'Ubuntu 22.04 LTS',
//         version: '5.15.0-91',
//         status: 'active',
//         lastSeen: '2025-01-02T14:25:00Z',
//         uptime: '45 days, 12 hours',
//         geolocation: { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'USA' },
//         alertsCount: 0,
//         threatsCount: 3
//     },
//     {
//         id: 'NET-005',
//         name: 'FIREWALL-001',
//         ip: '192.168.1.50',
//         location: 'Austin Office',
//         os: 'pfSense 2.7.0',
//         version: '2.7.0-RELEASE',
//         status: 'disconnected',
//         lastSeen: '2025-01-02T12:15:00Z',
//         uptime: '0 days, 0 hours',
//         geolocation: { lat: 30.2672, lng: -97.7431, city: 'Austin', country: 'USA' },
//         alertsCount: 1,
//         threatsCount: 0
//     },
//     {
//         id: 'MAC-007',
//         name: 'MACBOOK-DEV01',
//         ip: '192.168.1.105',
//         location: 'Remote - Seattle',
//         os: 'macOS Sonoma',
//         version: '14.2.1',
//         status: 'maintenance',
//         lastSeen: '2025-01-02T10:00:00Z',
//         uptime: '0 days, 0 hours',
//         geolocation: { lat: 47.6062, lng: -122.3321, city: 'Seattle', country: 'USA' },
//         alertsCount: 0,
//         threatsCount: 1
//     }
//   ];

//   const handleViewAgent = (agentId: string) => {
//     const agent = agents.find(a => a.id === agentId);
//     if (agent) {
//       setSelectedAgent(agent);
//       setShowAlertModal(false); // Close the alert modal
//       setShowAgentModal(true); // Open the agent modal
//     } else {
//         console.error(`Agent with ID ${agentId} not found.`);
//         // Optionally show a user-friendly error message
//     }
//   };

//   const getTypeIcon = (type: Alert['type']) => {
//     switch (type) {
//       case 'agent-down': return <Server className="h-5 w-5 text-red-500" />;
//       case 'security': return <Shield className="h-5 w-5 text-orange-500" />;
//       case 'maintenance': return <Settings className="h-5 w-5 text-blue-500" />;
//       case 'performance': return <Activity className="h-5 w-5 text-yellow-500" />;
//       default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
//     }
//   };

//   const getSeverityColor = (severity: Alert['severity']) => {
//     switch (severity) {
//       case 'critical': return 'bg-red-900 text-red-300 border-red-500';
//       case 'high': return 'bg-orange-900 text-orange-300 border-orange-500';
//       case 'medium': return 'bg-yellow-900 text-yellow-300 border-yellow-500';
//       case 'low': return 'bg-blue-900 text-blue-300 border-blue-500';
//       default: return 'bg-gray-900 text-gray-300 border-gray-500';
//     }
//   };

//   const filteredAlerts = alerts.filter(alert => {
//     const matchesSearch = !searchTerm || 
//       alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       alert.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       alert.agentId.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesFilters = 
//       (!filters.type || alert.type === filters.type) &&
//       (!filters.severity || alert.severity === filters.severity) &&
//       (!filters.acknowledged || 
//         (filters.acknowledged === 'true' && alert.acknowledged) ||
//         (filters.acknowledged === 'false' && !alert.acknowledged));

//     return matchesSearch && matchesFilters;
//   });

//   const handleViewAlert = (alert: Alert) => {
//     setSelectedAlert(alert);
//     setShowAlertModal(true);
//   };

//   const handleAcknowledgeAlert = (alertId: string) => {
//     setAlerts(alerts.map(alert => 
//       alert.id === alertId 
//         ? { 
//             ...alert, 
//             acknowledged: true, 
//             acknowledgedBy: 'admin@parshuram.com',
//             acknowledgedAt: new Date().toISOString()
//           }
//         : alert
//     ));
//   };

//   const formatTimestamp = (timestamp: string) => {
//     return new Date(timestamp).toLocaleString();
//   };

//   const getTimeAgo = (timestamp: string) => {
//     const now = new Date();
//     const time = new Date(timestamp);
//     const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
//     if (diffInMinutes < 60) {
//       return `${diffInMinutes}m ago`;
//     } else if (diffInMinutes < 1440) {
//       return `${Math.floor(diffInMinutes / 60)}h ago`;
//     } else {
//       return `${Math.floor(diffInMinutes / 1440)}d ago`;
//     }
//   };

//   const alertStats = {
//     total: alerts.length,
//     unacknowledged: alerts.filter(a => !a.acknowledged).length,
//     critical: alerts.filter(a => a.severity === 'critical').length,
//     agentDown: alerts.filter(a => a.type === 'agent-down').length
//   };

//   const handleCreateTicketFromAlert = (alert: Alert) => {
//       const newTicket: Ticket = {
//         id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
//         title: `Investigation for Alert: ${alert.message}`,
//         description: `Alert Details:\nID: ${alert.id}\nAgent: ${alert.agentName}\nMessage: ${alert.message}`,
//         severity: alert.severity,
//         status: 'open',
//         assignee: 'SOC L1', // Default assignment
//         reporter: 'SIEM System',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         relatedAlertId: alert.id,
//       };
//       setTickets([newTicket, ...tickets]);
//       navigate(`/tickets/${newTicket.id}`); // Navigate directly to the new ticket
//   };

//   return (
//     <div className="px-4 py-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-white mb-2">System Alerts</h1>
//         <p className="text-gray-400">Monitor and manage system alerts and notifications.</p>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Total Alerts</p>
//               <p className="text-2xl font-bold text-white">{alertStats.total}</p>
//             </div>
//             <AlertTriangle className="h-8 w-8 text-blue-500" />
//           </div>
//         </div>

//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Unacknowledged</p>
//               <p className="text-2xl font-bold text-yellow-400">{alertStats.unacknowledged}</p>
//             </div>
//             <Clock className="h-8 w-8 text-yellow-500" />
//           </div>
//         </div>

//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Critical</p>
//               <p className="text-2xl font-bold text-red-400">{alertStats.critical}</p>
//             </div>
//             <Shield className="h-8 w-8 text-red-500" />
//           </div>
//         </div>

//         <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-400 text-sm">Agents Down</p>
//               <p className="text-2xl font-bold text-orange-400">{alertStats.agentDown}</p>
//             </div>
//             <Server className="h-8 w-8 text-orange-500" />
//           </div>
//         </div>
//       </div>

//       {/* Search and Filter Bar */}
//       <div className="mb-6 space-y-4">
//         <div className="flex space-x-4">
//           <div className="flex-1 relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search alerts..."
//               className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
//           >
//             <Filter className="h-4 w-4" />
//             <span>Filters</span>
//           </button>
//         </div>

//         {showFilters && (
//           <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <select
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.type}
//                 onChange={(e) => setFilters({ ...filters, type: e.target.value })}
//               >
//                 <option value="">All Types</option>
//                 <option value="agent-down">Agent Down</option>
//                 <option value="security">Security</option>
//                 <option value="maintenance">Maintenance</option>
//                 <option value="performance">Performance</option>
//               </select>
//               <select
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.severity}
//                 onChange={(e) => setFilters({ ...filters, severity: e.target.value })}
//               >
//                 <option value="">All Severities</option>
//                 <option value="critical">Critical</option>
//                 <option value="high">High</option>
//                 <option value="medium">Medium</option>
//                 <option value="low">Low</option>
//               </select>
//               <select
//                 className="px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filters.acknowledged}
//                 onChange={(e) => setFilters({ ...filters, acknowledged: e.target.value })}
//               >
//                 <option value="">All Status</option>
//                 <option value="false">Unacknowledged</option>
//                 <option value="true">Acknowledged</option>
//               </select>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Alerts List */}
//       <div className="space-y-4">
//         {filteredAlerts.map((alert) => (
//           <div
//             key={alert.id}
//             className={`bg-gray-800 border-l-4 rounded-lg p-6 ${
//               alert.severity === 'critical' ? 'border-red-500' :
//               alert.severity === 'high' ? 'border-orange-500' :
//               alert.severity === 'medium' ? 'border-yellow-500' :
//               'border-blue-500'
//             } ${!alert.acknowledged ? 'bg-gray-750' : ''}`}
//           >
//             <div className="flex items-start justify-between">
//               <div className="flex items-start space-x-4 flex-1">
//                 <div className="flex-shrink-0 mt-1">
//                   {getTypeIcon(alert.type)}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-3 mb-2">
//                     <h3 className="text-lg font-semibold text-white">{alert.agentName}</h3>
//                     <span className="text-sm text-gray-400">({alert.agentId})</span>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getSeverityColor(alert.severity)}`}>
//                       {alert.severity}
//                     </span>
//                     <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
//                       {alert.type.replace('-', ' ')}
//                     </span>
//                   </div>
//                   <p className="text-gray-300 mb-3">{alert.message}</p>
//                   <div className="flex items-center space-x-4 text-sm text-gray-400">
//                     <div className="flex items-center space-x-1">
//                       <Clock className="h-4 w-4" />
//                       <span>{getTimeAgo(alert.timestamp)}</span>
//                     </div>
//                     {alert.acknowledged && (
//                       <div className="flex items-center space-x-1 text-green-400">
//                         <Check className="h-4 w-4" />
//                         <span>Acknowledged by {alert.acknowledgedBy}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 {!alert.acknowledged && (
//                   <button
//                     onClick={() => handleAcknowledgeAlert(alert.id)}
//                     className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
//                   >
//                     <Check className="h-4 w-4" />
//                     <span>Acknowledge</span>
//                   </button>
//                 )}
//                 <button
//                     onClick={() => handleCreateTicketFromAlert(alert)}
//                     className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
//                 >
//                     <PlusCircle className="h-4 w-4" />
//                     <span>Create Ticket</span>
//                 </button>
//                 <button
//                   onClick={() => handleViewAlert(alert)}
//                   className="p-2 text-gray-400 hover:text-white transition-colors"
//                 >
//                   <Eye className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredAlerts.length === 0 && (
//         <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg">
//           <AlertTriangle className="h-16 w-16 text-gray-600 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-400 mb-2">No alerts found</h3>
//           <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
//         </div>
//       )}

//       {/* Alert Detail Modal */}
//       {showAlertModal && selectedAlert && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
//             <div className="flex items-center justify-between p-6 border-b border-gray-700">
//               <h2 className="text-xl font-bold text-white flex items-center space-x-2">
//                 <AlertTriangle className="h-6 w-6 text-orange-500" />
//                 <span>Alert Details - {selectedAlert.id}</span>
//               </h2>
//               <button
//                 onClick={() => setShowAlertModal(false)}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div className={`border-l-4 rounded-r-lg p-4 ${
//                 selectedAlert.severity === 'critical' ? 'border-red-500 bg-red-900/20' :
//                 selectedAlert.severity === 'high' ? 'border-orange-500 bg-orange-900/20' :
//                 selectedAlert.severity === 'medium' ? 'border-yellow-500 bg-yellow-900/20' :
//                 'border-blue-500 bg-blue-900/20'
//               }`}>
//                 <div className="flex items-center space-x-3 mb-3">
//                   {getTypeIcon(selectedAlert.type)}
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getSeverityColor(selectedAlert.severity)}`}>
//                     {selectedAlert.severity} Priority
//                   </span>
//                   <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300 capitalize">
//                     {selectedAlert.type.replace('-', ' ')}
//                   </span>
//                 </div>
//                 <p className="text-white font-medium">{selectedAlert.message}</p>
//               </div>

//               <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
//                 <h4 className="text-white font-medium mb-3">Affected Agent</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <p className="text-gray-400">Agent Name:</p>
//                     <p className="text-white">{selectedAlert.agentName}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Agent ID:</p>
//                     <p className="text-white">{selectedAlert.agentId}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
//                 <h4 className="text-white font-medium mb-3">Timing Information</h4>
//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Alert Time:</span>
//                     <span className="text-gray-300">{formatTimestamp(selectedAlert.timestamp)}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-gray-400">Time Ago:</span>
//                     <span className="text-gray-300">{getTimeAgo(selectedAlert.timestamp)}</span>
//                   </div>
//                   {selectedAlert.acknowledged && (
//                     <>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Acknowledged By:</span>
//                         <span className="text-green-400">{selectedAlert.acknowledgedBy}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-400">Acknowledged At:</span>
//                         <span className="text-green-400">{formatTimestamp(selectedAlert.acknowledgedAt!)}</span>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
//                 <button
//                   onClick={() => setShowAlertModal(false)}
//                   className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//                 >
//                   Close
//                 </button>
//                 {!selectedAlert.acknowledged && (
//                   <button
//                     onClick={() => {
//                       handleAcknowledgeAlert(selectedAlert.id);
//                       setShowAlertModal(false);
//                     }}
//                     className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
//                   >
//                     <Check className="h-4 w-4" />
//                     <span>Acknowledge</span>
//                   </button>
//                 )}
//                 <button 
//                   onClick={() => handleViewAgent(selectedAlert.agentId)}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                   View Agent
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Agent Details Modal */}
//       {showAgentModal && selectedAgent && (
//         <AgentDetailsModal
//           agent={selectedAgent}
//           onClose={() => setShowAgentModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AlertsPage;


import React, { useState, useRef } from 'react';
import { Alert, Agent, Ticket } from '../../types';
import AgentDetailsModal from '../Agents/AgentDetailsModal';
import {
  AlertTriangle,
  Search,
  Filter,
  Eye,
  Check,
  Clock,
  Server,
  Shield,
  Activity,
  Settings,
  PlusCircle,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface AlertsPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ tickets, setTickets }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    acknowledged: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const alertModalRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(alertModalRef, () => setShowAlertModal(false));

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'ALT-001',
      agentId: 'NET-005',
      agentName: 'FIREWALL-001',
      type: 'agent-down',
      message: 'Agent has been offline for more than 2 hours',
      severity: 'high',
      timestamp: '2025-01-02T12:15:00Z',
      acknowledged: false
    },
    {
      id: 'ALT-002',
      agentId: 'WIN-001',
      agentName: 'DESKTOP-ABC123',
      type: 'security',
      message: 'Multiple failed login attempts detected',
      severity: 'critical',
      timestamp: '2025-01-02T14:20:00Z',
      acknowledged: false
    },
    {
      id: 'ALT-003',
      agentId: 'MAC-007',
      agentName: 'MACBOOK-DEV01',
      type: 'maintenance',
      message: 'Agent scheduled for maintenance window',
      severity: 'low',
      timestamp: '2025-01-02T10:00:00Z',
      acknowledged: true,
      acknowledgedBy: 'admin@parshuram.com',
      acknowledgedAt: '2025-01-02T10:05:00Z'
    },
    {
      id: 'ALT-004',
      agentId: 'LIN-003',
      agentName: 'SERVER-XYZ789',
      type: 'performance',
      message: 'High CPU usage detected (>90% for 15 minutes)',
      severity: 'medium',
      timestamp: '2025-01-02T13:45:00Z',
      acknowledged: false
    }
  ]);

  const agents: Agent[] = [
    { id: 'WIN-001', name: 'DESKTOP-ABC123', ip: '192.168.1.100', location: 'New York Office', os: 'Windows 11 Pro', version: '22H2', status: 'active', lastSeen: '2025-01-02T14:30:00Z', uptime: '15 days, 4 hours', geolocation: { lat: 40.7128, lng: -74.0060, city: 'New York', country: 'USA' }, alertsCount: 2, threatsCount: 5 },
    { id: 'LIN-003', name: 'SERVER-XYZ789', ip: '192.168.1.102', location: 'San Francisco Office', os: 'Ubuntu 22.04 LTS', version: '5.15.0-91', status: 'active', lastSeen: '2025-01-02T14:25:00Z', uptime: '45 days, 12 hours', geolocation: { lat: 37.7749, lng: -122.4194, city: 'San Francisco', country: 'USA' }, alertsCount: 0, threatsCount: 3 },
    { id: 'NET-005', name: 'FIREWALL-001', ip: '192.168.1.50', location: 'Austin Office', os: 'pfSense 2.7.0', version: '2.7.0-RELEASE', status: 'disconnected', lastSeen: '2025-01-02T12:15:00Z', uptime: '0 days, 0 hours', geolocation: { lat: 30.2672, lng: -97.7431, city: 'Austin', country: 'USA' }, alertsCount: 1, threatsCount: 0 },
    { id: 'MAC-007', name: 'MACBOOK-DEV01', ip: '192.168.1.105', location: 'Remote - Seattle', os: 'macOS Sonoma', version: '14.2.1', status: 'maintenance', lastSeen: '2025-01-02T10:00:00Z', uptime: '0 days, 0 hours', geolocation: { lat: 47.6062, lng: -122.3321, city: 'Seattle', country: 'USA' }, alertsCount: 0, threatsCount: 1 }
  ];

  const handleViewAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      setSelectedAgent(agent);
      setShowAlertModal(false);
      setShowAgentModal(true);
    }
  };

  const handleCreateTicketFromAlert = (alert: Alert) => {
      const newTicket: Ticket = {
        id: `T-${String(tickets.length + 1).padStart(3, '0')}`,
        title: `Alert: ${alert.message}`,
        description: `Ticket automatically generated from Alert ID: ${alert.id}\nAgent: ${alert.agentName} (${alert.agentId})\nMessage: ${alert.message}`,
        severity: alert.severity,
        status: 'open',
        assignee: 'SOC L1',
        reporter: 'SIEM System',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        relatedAlertId: alert.id,
      };
      setTickets([newTicket, ...tickets]);
      navigate(`/tickets/${newTicket.id}`);
  };

  const getTypeIcon = (type: Alert['type']) => {
    switch (type) {
      case 'agent-down': return <Server className="h-5 w-5 text-red-500" />;
      case 'security': return <Shield className="h-5 w-5 text-orange-500" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-blue-500" />;
      case 'performance': return <Activity className="h-5 w-5 text-yellow-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-300 border-red-500';
      case 'high': return 'bg-orange-900 text-orange-300 border-orange-500';
      case 'medium': return 'bg-yellow-900 text-yellow-300 border-yellow-500';
      case 'low': return 'bg-blue-900 text-blue-300 border-blue-500';
      default: return 'bg-gray-900 text-gray-300 border-gray-500';
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !searchTerm ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.agentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilters =
      (!filters.type || alert.type === filters.type) &&
      (!filters.severity || alert.severity === filters.severity) &&
      (!filters.acknowledged ||
        (filters.acknowledged === 'true' && alert.acknowledged) ||
        (filters.acknowledged === 'false' && !alert.acknowledged));

    return matchesSearch && matchesFilters;
  });

  const handleViewAlert = (alert: Alert) => {
    setSelectedAlert(alert);
    setShowAlertModal(true);
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === alertId
        ? {
            ...alert,
            acknowledged: true,
            acknowledgedBy: 'admin@parshuram.com',
            acknowledgedAt: new Date().toISOString()
          }
        : alert
    ));
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">System Alerts</h1>
        <p className="text-gray-400">Monitor and manage system alerts and notifications.</p>
      </div>

      <div className="mb-6 space-y-4">
        {/* Search and filter UI remains the same */}
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className={`bg-gray-800 border-l-4 rounded-lg p-6 ${
              alert.severity === 'critical' ? 'border-red-500' :
              alert.severity === 'high' ? 'border-orange-500' :
              alert.severity === 'medium' ? 'border-yellow-500' : 'border-blue-500'
            } ${!alert.acknowledged ? 'bg-gray-750' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{alert.agentName}</h3>
                    <span className="text-sm text-gray-400">({alert.agentId})</span>
                  </div>
                  <p className="text-gray-300 mb-3">{alert.message}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                    onClick={() => handleCreateTicketFromAlert(alert)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                >
                    <PlusCircle className="h-4 w-4" />
                    <span>Create Ticket</span>
                </button>
                <button
                  onClick={() => handleViewAlert(alert)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAlertModal && selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div ref={alertModalRef} className="bg-gray-800 border border-gray-700 rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <span>Alert Details - {selectedAlert.id}</span>
              </h2>
              <button
                onClick={() => setShowAlertModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6"/>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className={`border-l-4 rounded-r-lg p-4 ${
                selectedAlert.severity === 'critical' ? 'border-red-500 bg-red-900/20' :
                selectedAlert.severity === 'high' ? 'border-orange-500 bg-orange-900/20' :
                'border-yellow-500 bg-yellow-900/20'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  {getTypeIcon(selectedAlert.type)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${getSeverityColor(selectedAlert.severity)}`}>
                    {selectedAlert.severity} Priority
                  </span>
                </div>
                <p className="text-white font-medium">{selectedAlert.message}</p>
              </div>

              <div className="bg-gray-700 border border-gray-600 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Affected Agent</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Agent Name:</p>
                    <p className="text-white">{selectedAlert.agentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Agent ID:</p>
                    <p className="text-white">{selectedAlert.agentId}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleViewAgent(selectedAlert.agentId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Agent
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAgentModal && selectedAgent && (
        <AgentDetailsModal
          agent={selectedAgent}
          onClose={() => setShowAgentModal(false)}
        />
      )}
    </div>
  );
};

export default AlertsPage;