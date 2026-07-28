import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);
      
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } else {
      alert("Error updating order: " + error.message);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock size={16} className="text-yellow-500" />;
      case 'processing': return <Package size={16} className="text-blue-500" />;
      case 'shipped': return <Truck size={16} className="text-purple-500" />;
      case 'delivered': return <CheckCircle size={16} className="text-green-500" />;
      case 'cancelled': return <XCircle size={16} className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Orders</h2>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">Loading orders...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">No orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">#{order.id.substring(0, 8)}</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric', month: 'short', day: '2-digit',
                      hour: '2-digit', minute: '2-digit'
                    }).format(new Date(order.created_at))}
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-medium text-gray-900">
                      {order.shipping_address?.firstName} {order.shipping_address?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{order.shipping_address?.email}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-900">${order.total_amount}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <select 
                      className="text-xs border border-gray-300 rounded p-1"
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
