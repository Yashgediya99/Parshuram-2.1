// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Ticket, Alert } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import {
//   Shield,
//   AlertTriangle,
//   Clock,
//   User,
//   MessageSquare,
//   Paperclip,
//   ArrowUpCircle,
//   Send,
//   ArrowLeft
// } from 'lucide-react';

// // You would fetch this data from your state management or API
// const mockAlerts: Alert[] = [
//     { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
// ];

// interface TicketDetailsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const ticket = tickets.find(t => t.id === id);
//   const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

//   const [newComment, setNewComment] = useState('');

//   if (!ticket) {
//     return (
//       <div className="text-center py-12 text-white">
//         <h1 className="text-2xl font-bold">Ticket not found</h1>
//         <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">Back to Tickets</Link>
//       </div>
//     );
//   }

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;

//     const comment = {
//       id: `C-${Date.now()}`,
//       author: user?.email || 'Unknown User',
//       timestamp: new Date().toISOString(),
//       comment: newComment,
//     };

//     setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...(t.comments || []), comment], updatedAt: new Date().toISOString() } : t));
//     setNewComment('');
//   };
  
//   const handleEscalate = (newLevel: 'soc-l2' | 'soc-l3' | 'soc-l4') => {
//       setTickets(tickets.map(t => t.id === id ? {
//           ...t,
//           assignee: newLevel.toUpperCase(),
//           elevatedTo: newLevel,
//           elevatedBy: user?.email,
//           elevatedAt: new Date().toISOString(),
//           status: 'triaged',
//           updatedAt: new Date().toISOString()
//       } : t));
//   };


//   return (
//     <div className="px-4 py-6 text-white">
//         <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6">
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to Ticket Dashboard
//         </Link>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Ticket Details */}
//         <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="border-b border-gray-700 pb-4 mb-4">
//             <h1 className="text-2xl font-bold">{ticket.title}</h1>
//             <p className="text-gray-400">ID: {ticket.id}</p>
//           </div>
//           <p className="text-gray-300 mb-6">{ticket.description}</p>
          
//           {relatedAlert && (
//             <div className="bg-gray-700 p-4 rounded-lg mb-6">
//                 <h3 className="font-semibold mb-2 text-lg text-blue-300">Linked SIEM Alert</h3>
//                 <p><strong>Alert ID:</strong> <Link to={`/alerts`} className="text-blue-400 hover:underline">{relatedAlert.id}</Link></p>
//                 <p><strong>Message:</strong> {relatedAlert.message}</p>
//                 <p><strong>Source:</strong> {relatedAlert.agentName} ({relatedAlert.agentId})</p>
//             </div>
//           )}

//           {/* Analyst Updates */}
//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg">Investigation Timeline</h3>
//             {ticket.comments?.map(comment => (
//                  <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
//                     <div className="flex justify-between items-center mb-1">
//                         <p className="font-semibold text-blue-400">{comment.author}</p>
//                         <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
//                     </div>
//                     <p className="text-gray-300">{comment.comment}</p>
//                 </div>
//             ))}
//              <div className="bg-gray-700 p-3 rounded-lg flex items-start space-x-3">
//                 <User className="h-6 w-6 text-gray-400 mt-2"/>
//                 <div className="flex-1">
//                     <textarea 
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full bg-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Add investigation notes..."
//                         rows={3}
//                     />
//                     <div className="flex justify-end mt-2">
//                         <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
//                             <Send className="h-4 w-4"/>
//                             <span>Add Note</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar with Actions */}
//         <div className="space-y-6">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Ticket Status</h3>
//                 <div className="space-y-3">
//                     <p><strong>Severity:</strong> <span className={`font-bold text-${ticket.severity === 'critical' ? 'red' : ticket.severity === 'high' ? 'orange' : 'yellow'}-400`}>{ticket.severity.toUpperCase()}</span></p>
//                     <p><strong>State:</strong> <span className="font-bold">{ticket.status.toUpperCase()}</span></p>
//                     <p><strong>Assigned Group:</strong> <span className="font-bold">{ticket.assignee}</span></p>
//                     <p><strong>Reporter:</strong> {ticket.reporter}</p>
//                 </div>
//             </div>
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Actions</h3>
//                 <div className="space-y-3">
//                     <button className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                         <Paperclip className="h-4 w-4"/>
//                         <span>Attach Evidence</span>
//                     </button>
//                     {user?.role === 'soc-l1' && <button onClick={() => handleEscalate('soc-l2')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L2</span></button>}
//                     {user?.role === 'soc-l2' && <button onClick={() => handleEscalate('soc-l3')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L3</span></button>}
//                     {user?.role === 'soc-l3' && <button onClick={() => handleEscalate('soc-l4')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L4</span></button>}
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsPage;







// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Ticket, Alert } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import {
//   ArrowLeft,
//   User,
//   Send,
//   Paperclip,
//   ArrowUpCircle,
//   CheckCircle, // Import CheckCircle icon
// } from 'lucide-react';

// const mockAlerts: Alert[] = [
//     { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
// ];

// interface TicketDetailsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const ticket = tickets.find(t => t.id === id);
//   const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

//   const [newComment, setNewComment] = useState('');

//   if (!ticket) {
//     return (
//       <div className="text-center py-12 text-white">
//         <h1 className="text-2xl font-bold">Ticket Not Found</h1>
//         <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">
//           <ArrowLeft className="inline-block h-4 w-4 mr-2" />
//           Back to Ticket Dashboard
//         </Link>
//       </div>
//     );
//   }

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;

//     const comment = {
//       id: `C-${Date.now()}`,
//       author: user?.email || 'Unknown User',
//       timestamp: new Date().toISOString(),
//       comment: newComment,
//     };

//     setTickets(tickets.map(t => t.id === id ? { ...t, comments: [...(t.comments || []), comment], updatedAt: new Date().toISOString() } : t));
//     setNewComment('');
//   };

//   const handleEscalate = (newLevel: 'soc-l2' | 'soc-l3' | 'soc-l4') => {
//       setTickets(tickets.map(t => t.id === id ? {
//           ...t,
//           assignee: newLevel.toUpperCase().replace('-', ' '),
//           elevatedTo: newLevel,
//           elevatedBy: user?.email,
//           elevatedAt: new Date().toISOString(),
//           status: 'triaged',
//           updatedAt: new Date().toISOString()
//       } : t));
//   };

//   const handleResolveTicket = () => {
//     setTickets(tickets.map(t => t.id === id ? {
//         ...t,
//         status: 'resolved',
//         updatedAt: new Date().toISOString(),
//     } : t));
//   };

//   return (
//     <div className="px-4 py-6 text-white">
//         <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6">
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to Ticket Dashboard
//         </Link>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
//           <div className="border-b border-gray-700 pb-4 mb-4">
//             <h1 className="text-2xl font-bold">{ticket.title}</h1>
//             <p className="text-gray-400">ID: {ticket.id}</p>
//           </div>
//           <p className="text-gray-300 mb-6 whitespace-pre-wrap">{ticket.description}</p>
          
//           {relatedAlert && (
//             <div className="bg-gray-700 p-4 rounded-lg mb-6">
//                 <h3 className="font-semibold mb-2 text-lg text-blue-300">Linked SIEM Alert</h3>
//                 <p><strong>Alert ID:</strong> <Link to={`/alerts`} className="text-blue-400 hover:underline">{relatedAlert.id}</Link></p>
//                 <p><strong>Message:</strong> {relatedAlert.message}</p>
//                 <p><strong>Source:</strong> {relatedAlert.agentName} ({relatedAlert.agentId})</p>
//             </div>
//           )}

//           <div className="space-y-4">
//             <h3 className="font-semibold text-lg">Investigation Timeline</h3>
//             {ticket.comments?.map(comment => (
//                  <div key={comment.id} className="bg-gray-700 p-3 rounded-lg">
//                     <div className="flex justify-between items-center mb-1">
//                         <p className="font-semibold text-blue-400">{comment.author}</p>
//                         <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
//                     </div>
//                     <p className="text-gray-300">{comment.comment}</p>
//                 </div>
//             ))}
//              <div className="bg-gray-700 p-3 rounded-lg flex items-start space-x-3">
//                 <User className="h-6 w-6 text-gray-400 mt-2"/>
//                 <div className="flex-1">
//                     <textarea 
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full bg-gray-600 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Add investigation notes..."
//                         rows={3}
//                     />
//                     <div className="flex justify-end mt-2">
//                         <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
//                             <Send className="h-4 w-4"/>
//                             <span>Add Note</span>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Ticket Status</h3>
//                 <div className="space-y-3">
//                     <p><strong>Severity:</strong> <span className={`font-bold text-${ticket.severity === 'critical' ? 'red' : ticket.severity === 'high' ? 'orange' : 'yellow'}-400`}>{ticket.severity.toUpperCase()}</span></p>
//                     <p><strong>State:</strong> <span className="font-bold">{ticket.status.toUpperCase()}</span></p>
//                     <p><strong>Assigned Group:</strong> <span className="font-bold">{ticket.assignee}</span></p>
//                     <p><strong>Reporter:</strong> {ticket.reporter}</p>
//                 </div>
//             </div>
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
//                 <h3 className="font-semibold mb-4 text-lg">Actions</h3>
//                 <div className="space-y-3">
//                     <button className="w-full px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
//                         <Paperclip className="h-4 w-4"/>
//                         <span>Attach Evidence</span>
//                     </button>
//                     {user?.role === 'soc-l1' && <button onClick={() => handleEscalate('soc-l2')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L2</span></button>}
//                     {user?.role === 'soc-l2' && <button onClick={() => handleEscalate('soc-l3')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L3</span></button>}
//                     {user?.role === 'soc-l3' && <button onClick={() => handleEscalate('soc-l4')} className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"><ArrowUpCircle className="h-4 w-4"/><span>Escalate to SOC L4</span></button>}
                    
//                     {/* NEW BUTTON to resolve ticket */}
//                     {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
//                         <button 
//                             onClick={handleResolveTicket}
//                             className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
//                         >
//                             <CheckCircle className="h-4 w-4"/>
//                             <span>Resolve Ticket</span>
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsPage;



// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Ticket, Alert, Attachment } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import { ArrowLeft, User, Send, Paperclip } from 'lucide-react';

// const mockAlerts: Alert[] = [
//     { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
// ];

// interface TicketDetailsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const ticket = tickets.find(t => t.id === id);
//   const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

//   const [newComment, setNewComment] = useState('');
//   const [newStatus, setNewStatus] = useState(ticket?.status || 'open');
//   const [newSeverity, setNewSeverity] = useState(ticket?.severity || 'medium');

//   if (!ticket) {
//     return (
//       <div className="text-center py-12 text-white">
//         <h1 className="text-2xl font-bold">Ticket not found</h1>
//         <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">Back to Tickets</Link>
//       </div>
//     );
//   }

//   const handleSubmitComment = () => {
//     const updates: Partial<Ticket> = {
//         status: newStatus,
//         severity: newSeverity,
//         updatedAt: new Date().toISOString(),
//     };

//     if (newComment.trim()) {
//         const comment = {
//           id: `C-${Date.now()}`,
//           author: user?.email || 'Unknown',
//           timestamp: new Date().toISOString(),
//           comment: newComment,
//           attachments: [], // Add attachment logic here
//         };
//         updates.comments = [...(ticket.comments || []), comment];
//     }

//     setTickets(tickets.map(t => t.id === id ? { ...t, ...updates } : t));
//     setNewComment('');
//   };

//   const AttachmentList: React.FC<{ attachments: Attachment[] }> = ({ attachments }) => (
//     <div className="mt-2 flex flex-wrap gap-2">
//         {attachments.map(att => (
//             <a href="#" key={att.id} className="bg-gray-600 px-2 py-1 rounded text-xs text-blue-300 hover:bg-gray-500 flex items-center space-x-1">
//                 <Paperclip className="h-3 w-3"/>
//                 <span>{att.fileName} ({att.fileSize})</span>
//             </a>
//         ))}
//     </div>
//   );

//   return (
//     <div className="px-4 py-6 text-white max-w-4xl mx-auto">
//       <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-4">
//         <ArrowLeft className="h-4 w-4 mr-1" />
//         Back to Dashboard
//       </Link>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg">
//         <div className="p-6 border-b border-gray-700">
//             <h1 className="text-2xl font-bold">{ticket.title}</h1>
//             <p className="text-sm text-gray-400">Reported by {ticket.reporter} on {new Date(ticket.createdAt).toLocaleDateString()}</p>
//         </div>
        
//         {/* Ticket Description */}
//         <div className="p-6 border-b border-gray-700">
//             <p className="whitespace-pre-wrap">{ticket.description}</p>
//             {ticket.attachments && ticket.attachments.length > 0 && <AttachmentList attachments={ticket.attachments} />}
//         </div>
        
//         {/* Comments */}
//         <div className="p-6 space-y-4">
//              {ticket.comments?.map(comment => (
//                  <div key={comment.id} className="flex space-x-3">
//                      <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1"/>
//                      <div className="flex-1 bg-gray-700 rounded-lg p-3">
//                         <div className="flex justify-between items-center mb-1">
//                             <p className="font-semibold text-blue-400">{comment.author}</p>
//                             <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
//                         </div>
//                         <p className="text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
//                         {comment.attachments && comment.attachments.length > 0 && <AttachmentList attachments={comment.attachments} />}
//                      </div>
//                  </div>
//              ))}
//         </div>

//         {/* Action Form */}
//         <div className="p-6 border-t border-gray-700 bg-gray-800 rounded-b-lg">
//              <div className="flex space-x-3">
//                 <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1"/>
//                 <div className="flex-1">
//                     <textarea 
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Add a comment..."
//                         rows={4}
//                     />
//                     <div className="mt-2 flex flex-wrap items-center gap-4">
//                         <div className="flex items-center space-x-2">
//                              <label className="text-sm">Status:</label>
//                              <select value={newStatus} onChange={e => setNewStatus(e.target.value as Ticket['status'])} className="px-3 py-1 bg-gray-700 border border-gray-600 rounded">
//                                 <option value="open">Open</option>
//                                 <option value="triaged">Triaged</option>
//                                 <option value="in-progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                              </select>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <label className="text-sm">Severity:</label>
//                              <select value={newSeverity} onChange={e => setNewSeverity(e.target.value as Ticket['severity'])} className="px-3 py-1 bg-gray-700 border border-gray-600 rounded">
//                                 <option value="low">Low</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="high">High</option>
//                                 <option value="critical">Critical</option>
//                              </select>
//                         </div>
//                         <button className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 text-sm flex items-center space-x-1">
//                             <Paperclip className="h-4 w-4"/>
//                             <span>Attach File</span>
//                         </button>
//                         <button onClick={handleSubmitComment} className="ml-auto px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
//                             Submit
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsPage;

// last V1

// import React, { useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { Ticket, Alert, Attachment } from '../../types';
// import { useAuth } from '../../context/AuthContext';
// import { ArrowLeft, User, Send, Paperclip } from 'lucide-react';

// const mockAlerts: Alert[] = [
//     { id: 'ALT-002', agentId: 'WIN-001', agentName: 'DESKTOP-ABC123', type: 'security', message: 'Multiple failed login attempts detected', severity: 'critical', timestamp: '2025-01-02T14:20:00Z', acknowledged: false },
// ];

// interface TicketDetailsPageProps {
//   tickets: Ticket[];
//   setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
// }

// const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAuth();
//   const ticket = tickets.find(t => t.id === id);
//   const relatedAlert = mockAlerts.find(a => a.id === ticket?.relatedAlertId);

//   const [newComment, setNewComment] = useState('');
//   const [newStatus, setNewStatus] = useState(ticket?.status || 'open');
//   const [newSeverity, setNewSeverity] = useState(ticket?.severity || 'medium');

//   if (!ticket) {
//     return (
//       <div className="text-center py-12 text-white">
//         <h1 className="text-2xl font-bold">Ticket Not Found</h1>
//         <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">
//           <ArrowLeft className="inline-block h-4 w-4 mr-2" />
//           Back to Ticket Dashboard
//         </Link>
//       </div>
//     );
//   }

//   const handleSubmitComment = () => {
//     const updates: Partial<Ticket> = {
//         status: newStatus,
//         severity: newSeverity,
//         updatedAt: new Date().toISOString(),
//     };

//     if (newComment.trim()) {
//         const comment = {
//           id: `C-${Date.now()}`,
//           author: user?.email || 'Unknown',
//           timestamp: new Date().toISOString(),
//           comment: newComment,
//           attachments: [],
//         };
//         updates.comments = [...(ticket.comments || []), comment];
//     }

//     setTickets(tickets.map(t => t.id === id ? { ...t, ...updates } : t));
//     setNewComment('');
//   };

//   const AttachmentList: React.FC<{ attachments: Attachment[] }> = ({ attachments }) => (
//     <div className="mt-2 flex flex-wrap gap-2">
//         {attachments.map(att => (
//             <a href="#" key={att.id} className="bg-gray-600 px-2 py-1 rounded text-xs text-blue-300 hover:bg-gray-500 flex items-center space-x-1">
//                 <Paperclip className="h-3 w-3"/>
//                 <span>{att.fileName} ({att.fileSize})</span>
//             </a>
//         ))}
//     </div>
//   );

//   return (
//     <div className="px-4 py-6 text-white max-w-4xl mx-auto">
//       <Link to="/tickets" className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-4">
//         <ArrowLeft className="h-4 w-4 mr-1" />
//         Back to Dashboard
//       </Link>

//       <div className="bg-gray-800 border border-gray-700 rounded-lg">
//         <div className="p-6 border-b border-gray-700">
//             <h1 className="text-2xl font-bold">{ticket.title}</h1>
//             <p className="text-sm text-gray-400">Reported by {ticket.reporter} on {new Date(ticket.createdAt).toLocaleDateString()}</p>
//         </div>
        
//         <div className="p-6 border-b border-gray-700">
//             <p className="whitespace-pre-wrap">{ticket.description}</p>
//             {ticket.attachments && ticket.attachments.length > 0 && <AttachmentList attachments={ticket.attachments} />}
//         </div>
        
//         <div className="p-6 space-y-4">
//              {ticket.comments?.map(comment => (
//                  <div key={comment.id} className="flex space-x-3">
//                      <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1"/>
//                      <div className="flex-1 bg-gray-700 rounded-lg p-3">
//                         <div className="flex justify-between items-center mb-1">
//                             <p className="font-semibold text-blue-400">{comment.author}</p>
//                             <p className="text-xs text-gray-400">{new Date(comment.timestamp).toLocaleString()}</p>
//                         </div>
//                         <p className="text-gray-300 whitespace-pre-wrap">{comment.comment}</p>
//                         {comment.attachments && comment.attachments.length > 0 && <AttachmentList attachments={comment.attachments} />}
//                      </div>
//                  </div>
//              ))}
//         </div>

//         <div className="p-6 border-t border-gray-700 bg-gray-800 rounded-b-lg">
//              <div className="flex space-x-3">
//                 <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1"/>
//                 <div className="flex-1">
//                     <textarea 
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                         className="w-full bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Add a comment..."
//                         rows={4}
//                     />
//                     <div className="mt-2 flex flex-wrap items-center gap-4">
//                         <div className="flex items-center space-x-2">
//                              <label className="text-sm">Status:</label>
//                              <select value={newStatus} onChange={e => setNewStatus(e.target.value as Ticket['status'])} className="px-3 py-1 bg-gray-700 border border-gray-600 rounded">
//                                 <option value="open">Open</option>
//                                 <option value="triaged">Triaged</option>
//                                 <option value="in-progress">In Progress</option>
//                                 <option value="resolved">Resolved</option>
//                              </select>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                             <label className="text-sm">Severity:</label>
//                              <select value={newSeverity} onChange={e => setNewSeverity(e.target.value as Ticket['severity'])} className="px-3 py-1 bg-gray-700 border border-gray-600 rounded">
//                                 <option value="low">Low</option>
//                                 <option value="medium">Medium</option>
//                                 <option value="high">High</option>
//                                 <option value="critical">Critical</option>
//                              </select>
//                         </div>
//                         <button className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 text-sm flex items-center space-x-1">
//                             <Paperclip className="h-4 w-4"/>
//                             <span>Attach File</span>
//                         </button>
//                         <button onClick={handleSubmitComment} className="ml-auto px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold">
//                             Submit
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TicketDetailsPage;




import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ticket, Alert, Attachment, TicketComment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, User, Paperclip, ArrowUpCircle, CheckCircle, AlertTriangle, Clock, Users } from 'lucide-react';

const mockAlerts: Alert[] = [
  {
    id: 'ALT-002',
    agentId: 'WIN-001',
    agentName: 'DESKTOP-ABC123',
    type: 'security',
    message: 'Multiple failed login attempts detected',
    severity: 'critical',
    timestamp: '2025-01-02T14:20:00Z',
    acknowledged: false,
  },
];

interface TicketDetailsPageProps {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}

const TicketDetailsPage: React.FC<TicketDetailsPageProps> = ({ tickets, setTickets }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const ticket = tickets.find((t) => t.id === id);
  const relatedAlert = mockAlerts.find((a) => a.id === ticket?.relatedAlertId);

  const [newComment, setNewComment] = useState('');
  const [newStatus, setNewStatus] = useState(ticket?.status || 'open');
  const [newSeverity, setNewSeverity] = useState(ticket?.severity || 'medium');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!ticket) {
    return (
      <div className="text-center py-12 text-white">
        <h1 className="text-2xl font-bold">Ticket Not Found</h1>
        <Link to="/tickets" className="text-blue-400 hover:underline mt-4 inline-block">
          <ArrowLeft className="inline-block h-4 w-4 mr-1" />
          Back to Ticket Dashboard
        </Link>
      </div>
    );
  }

  const addContributor = (currentContributors: string[], newUserEmail: string): string[] => {
    if (!currentContributors.includes(newUserEmail)) {
      return [...currentContributors, newUserEmail];
    }
    return currentContributors;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateTicket = () => {
    const newUpdates: TicketComment[] = ticket.updates ? [...ticket.updates] : [];
    const updatedContributors = user?.email ? addContributor(ticket.contributors || [], user.email) : ticket.contributors;
    const newAttachmentNames: string[] = uploadedFiles.map(file => file.name);

    const updates: Partial<Ticket> = {
        status: newStatus,
        severity: newSeverity,
        updatedAt: new Date().toISOString(),
        contributors: updatedContributors,
    };

    if (newComment.trim() || newAttachmentNames.length > 0) {
        const comment = {
          id: `C-${Date.now()}`,
          author: user?.email || 'Unknown',
          timestamp: new Date().toISOString(),
          message: newComment,
          attachments: newAttachmentNames,
          status: newStatus,
          severity: newSeverity,
        };
        newUpdates.push(comment);
    }
    
    setTickets(tickets.map(t => t.id === id ? { ...t, ...updates, updates: newUpdates } : t));
    setNewComment('');
    setUploadedFiles([]);
  };
  
  const handleEscalate = (newLevel: 'soc-l2' | 'soc-l3' | 'soc-l4') => {
      const updatedContributors = user?.email ? addContributor(ticket.contributors || [], user.email) : ticket.contributors;

      const updatedTicket = {
          ...ticket,
          assignee: newLevel.toUpperCase().replace('-', ' '),
          status: 'under_review' as Ticket['status'],
          updatedAt: new Date().toISOString(),
          contributors: updatedContributors,
          updates: [...(ticket.updates || []), {
              id: `C-${Date.now()}`,
              author: user?.email || 'Unknown',
              timestamp: new Date().toISOString(),
              message: `Escalated to ${newLevel.toUpperCase().replace('-', ' ')}.`,
              attachments: [],
              status: 'under_review' as Ticket['status'],
              severity: ticket.severity,
          }],
      };
      setTickets(tickets.map(t => t.id === id ? updatedTicket : t));
  };
  
  const handleResolveTicket = () => {
      const updatedContributors = user?.email ? addContributor(ticket.contributors || [], user.email) : ticket.contributors;
      const newStatusAfterResolve = 'closed';

      const updatedTicket = {
          ...ticket,
          status: newStatusAfterResolve as Ticket['status'],
          updatedAt: new Date().toISOString(),
          contributors: updatedContributors,
          updates: [...(ticket.updates || []), {
              id: `C-${Date.now()}`,
              author: user?.email || 'Unknown',
              timestamp: new Date().toISOString(),
              message: 'Ticket has been resolved and closed.',
              attachments: [],
              status: newStatusAfterResolve as Ticket['status'],
              severity: ticket.severity,
          }],
      };
      setTickets(tickets.map(t => t.id === id ? updatedTicket : t));
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-900 text-red-300 border-red-500';
      case 'high': return 'bg-orange-900 text-orange-300 border-orange-500';
      case 'medium': return 'bg-yellow-900 text-yellow-300 border-yellow-500';
      case 'low': return 'bg-blue-900 text-blue-300 border-blue-500';
      case 'urgent': return 'bg-purple-900 text-purple-300 border-purple-500';
      default: return 'bg-gray-900 text-gray-300 border-gray-500';
    }
  };

  const AttachmentList: React.FC<{ files: Attachment[] }> = ({ files }) => (
    <div className="mt-2 flex flex-wrap gap-2">
      {files.map((att) => (
        <a
          href="#"
          key={att.id}
          className="bg-gray-600 px-2 py-1 rounded text-xs text-blue-300 hover:bg-gray-500 flex items-center space-x-1"
        >
          <Paperclip className="h-3 w-3" />
          <span>
            {att.fileName} ({att.fileSize})
          </span>
        </a>
      ))}
    </div>
  );

  const UpdateAttachmentsList: React.FC<{ attachments: string[] }> = ({ attachments }) => (
    <div className="mt-2 flex flex-wrap gap-2">
      {attachments.map((fileName, index) => (
        <a
          href="#"
          key={index}
          className="bg-gray-600 px-2 py-1 rounded text-xs text-blue-300 hover:bg-gray-500 flex items-center space-x-1"
        >
          <Paperclip className="h-3 w-3" />
          <span>{fileName}</span>
        </a>
      ))}
    </div>
  );
  
  const formatAssignedLevel = (assignee: string | undefined): string => {
    if (!assignee) return 'N/A';
    return assignee.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="px-4 py-6 text-white">
      <Link
        to="/tickets"
        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Dashboard
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-lg p-6">
          <div className="border-b border-gray-700 pb-4 mb-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{ticket.title}</h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getSeverityColor(
                  ticket.severity,
                )}`}
              >
                {ticket.severity}
              </span>
            </div>
            <p className="text-sm text-gray-400">ID: {ticket.id}</p>
          </div>
          <p className="text-gray-300 mb-6 whitespace-pre-wrap">{ticket.description}</p>
          {ticket.files && ticket.files.length > 0 && (
            <div className="bg-gray-700 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2 text-lg text-blue-300">Ticket Files</h3>
              <AttachmentList files={ticket.files} />
            </div>
          )}

          {relatedAlert && (
            <div className="bg-gray-700 p-4 rounded-lg mt-6">
              <h3 className="font-semibold mb-2 text-lg text-blue-300">Linked SIEM Alert</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p>
                  <strong>Alert ID:</strong>{' '}
                  <Link to={`/alerts`} className="text-blue-400 hover:underline">
                    {relatedAlert.id}
                  </Link>
                </p>
                <p>
                  <strong>Message:</strong> {relatedAlert.message}
                </p>
                <p>
                  <strong>Source:</strong> {relatedAlert.agentName} ({relatedAlert.agentId})
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <h3 className="font-semibold text-lg border-b border-gray-700 pb-2">Investigation Timeline</h3>
            {ticket.updates?.map((update) => (
              <div key={update.id} className="flex space-x-3">
                <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1" />
                <div className="flex-1 bg-gray-700 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold text-blue-400">{update.author}</p>
                    <p className="text-xs text-gray-400">{new Date(update.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    {update.status && (
                      <span className="capitalize">
                        Status: <span className="font-bold">{update.status.replace('_', ' ')}</span>
                      </span>
                    )}
                    {update.severity && (
                      <span className="capitalize">
                        Severity: <span className="font-bold">{update.severity}</span>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{update.message}</p>
                  {update.attachments && update.attachments.length > 0 && <UpdateAttachmentsList attachments={update.attachments} />}
                </div>
              </div>
            ))}
            <div className="flex space-x-3 mt-6">
              <User className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-gray-700 rounded-md p-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add a comment or update ticket..."
                  rows={4}
                />
                <div className="mt-2 flex flex-wrap items-center gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Status:</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as Ticket['status'])}
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded"
                    >
                      <option value="open">Open</option>
                      <option value="under_review">Under Review</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">Severity:</label>
                    <select
                      value={newSeverity}
                      onChange={(e) => setNewSeverity(e.target.value as Ticket['severity'])}
                      className="px-3 py-1 bg-gray-700 border border-gray-600 rounded"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 bg-gray-600 rounded-lg hover:bg-gray-500 text-sm flex items-center space-x-1"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span>Attach File</span>
                  </button>
                  <div className="flex-1">
                    {uploadedFiles.map((file, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 mr-2 text-xs font-medium text-white bg-gray-700 rounded-full">
                        {file.name}
                        <button type="button" onClick={() => handleRemoveFile(index)} className="ml-1 text-gray-400 hover:text-white">x</button>
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={handleUpdateTicket}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Ticket Information</h3>
            <div className="space-y-3">
                <p className="text-sm text-gray-400">
                    <strong>Ticket ID:</strong> {ticket.id}
                </p>
                <p className="text-sm text-gray-400">
                    <strong>Reporter:</strong> {ticket.reporter}
                </p>
                <p className="text-sm text-gray-400">
                    <strong>Log Refs:</strong> {ticket.log_refs && ticket.log_refs.length > 0 ? ticket.log_refs.join(', ') : 'N/A'}
                </p>
                <p className="text-sm text-gray-400">
                    <strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}
                </p>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Current Status</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <p>
                  <strong>Severity:</strong>{' '}
                  <span
                    className={`font-bold text-${
                      ticket.severity === 'critical'
                        ? 'red'
                        : ticket.severity === 'high'
                        ? 'orange'
                        : ticket.severity === 'urgent'
                        ? 'purple'
                        : 'yellow'
                    }-400`}
                  >
                    {ticket.severity.toUpperCase()}
                  </span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <p>
                  <strong>State:</strong> <span className="font-bold">{ticket.status.toUpperCase().replace('_', ' ')}</span>
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-400" />
                <p>
                  <strong>Assigned Group:</strong> <span className="font-bold">{ticket.assignee}</span>
                </p>
              </div>
              <p className="text-sm text-gray-400">
                <strong>Last Update:</strong> {new Date(ticket.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Contributors</h3>
            <div className="space-y-2">
                {ticket.contributors && ticket.contributors.length > 0 ? (
                    ticket.contributors.map((contributor, index) => (
                        <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
                            <Users className="h-4 w-4" />
                            <span>{contributor}</span>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No contributors yet.</p>
                )}
            </div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-lg">Actions</h3>
            <div className="space-y-3">
              {ticket.status !== 'closed' && (
                <>
                  {user?.role === formatAssignedLevel(ticket.assignee) && ticket.assignee !== 'SOC L4' && (
                    <button
                      onClick={() => handleEscalate(user.role === 'soc-l1' ? 'soc-l2' : user.role === 'soc-l2' ? 'soc-l3' : 'soc-l4')}
                      className="w-full px-4 py-2 bg-yellow-600 rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <ArrowUpCircle className="h-4 w-4" />
                      <span>Escalate to {user.role === 'soc-l1' ? 'SOC L2' : user.role === 'soc-l2' ? 'SOC L3' : 'SOC L4'}</span>
                    </button>
                  )}
                  <button
                    onClick={handleResolveTicket}
                    className="w-full px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Resolve & Close</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailsPage;