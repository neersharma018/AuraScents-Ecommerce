import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, X } from 'lucide-react';

const AdminCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount_percentage: 10 });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
    if (!error && data) setCoupons(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || newCoupon.discount_percentage <= 0 || newCoupon.discount_percentage > 100) {
      alert("Invalid coupon details");
      return;
    }
    
    const { data, error } = await supabase
      .from('coupons')
      .insert([{ 
        code: newCoupon.code.toUpperCase(), 
        discount_percentage: newCoupon.discount_percentage,
        is_active: true
      }])
      .select()
      .single();
      
    if (error) {
      alert("Error adding coupon: " + error.message);
    } else if (data) {
      setCoupons([data, ...coupons]);
      setShowAdd(false);
      setNewCoupon({ code: '', discount_percentage: 10 });
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('coupons')
      .update({ is_active: !currentStatus })
      .eq('id', id);
      
    if (!error) {
      setCoupons(coupons.map(c => c.id === id ? { ...c, is_active: !currentStatus } : c));
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    
    const { error } = await supabase.from('coupons').delete().eq('id', id);
    if (!error) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Manage Coupons</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[var(--matte-black)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[var(--gold)] transition-colors"
        >
          {showAdd ? <X size={16} /> : <Plus size={16} />}
          {showAdd ? 'Cancel' : 'Add Coupon'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 max-w-lg">
          <h3 className="text-lg font-bold mb-4">Create New Coupon</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
              <input 
                type="text" 
                required
                className="w-full border border-gray-300 rounded-lg p-2 uppercase" 
                placeholder="e.g. SUMMER20"
                value={newCoupon.code}
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percentage (%)</label>
              <input 
                type="number" 
                required
                min="1" max="100"
                className="w-full border border-gray-300 rounded-lg p-2" 
                value={newCoupon.discount_percentage}
                onChange={e => setNewCoupon({...newCoupon, discount_percentage: parseInt(e.target.value)})}
              />
            </div>
            <button type="submit" className="bg-[var(--gold)] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
              Save Coupon
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Discount</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading coupons...</td></tr>
            ) : coupons.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No coupons found.</td></tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-900 tracking-wider">{coupon.code}</td>
                  <td className="p-4 text-sm font-medium text-[var(--gold)]">{coupon.discount_percentage}% OFF</td>
                  <td className="p-4 text-sm text-gray-500">
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(coupon.created_at))}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleActive(coupon.id, coupon.is_active)}
                      className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full transition-colors ${
                        coupon.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {coupon.is_active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="p-4">
                    <button onClick={() => deleteCoupon(coupon.id)} className="text-red-500 hover:text-red-700 transition-colors" aria-label="Delete">
                      <Trash2 size={16} />
                    </button>
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

export default AdminCoupons;
