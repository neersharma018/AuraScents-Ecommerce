import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { TrendingUp, Users, Package, ShoppingBag } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    customers: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Products Count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
        
      // Orders Count & Revenue
      const { data: orders } = await supabase
        .from('orders')
        .select('total_amount, status');
        
      // User Roles (Customers)
      const { count: customerCount } = await supabase
        .from('user_roles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer');

      let rev = 0;
      if (orders) {
        rev = orders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      }

      setStats({
        products: productCount || 0,
        orders: orders?.length || 0,
        customers: customerCount || 0,
        revenue: rev
      });
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Revenue', value: `$${stats.revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}`, icon: <TrendingUp size={24} className="text-green-600" />, bg: 'bg-green-50' },
    { title: 'Total Orders', value: stats.orders, icon: <ShoppingBag size={24} className="text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Total Customers', value: stats.customers, icon: <Users size={24} className="text-purple-600" />, bg: 'bg-purple-50' },
    { title: 'Products', value: stats.products, icon: <Package size={24} className="text-orange-600" />, bg: 'bg-orange-50' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-full ${stat.bg}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Welcome to AuraScents Admin</h3>
        <p className="text-gray-600">
          This is your central command center. Use the sidebar to navigate through your products, orders, categories, and storefront customizations. 
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
