import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(name)') // Removed auth.users to avoid RLS silent failures
      .order('created_at', { ascending: false });
      
    if (!error && data) setReviews(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ status: newStatus })
      .eq('id', id);
      
    if (!error) {
      setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (!error) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Reviews</h2>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Review</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading reviews...</td></tr>
            ) : reviews.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">No reviews found.</td></tr>
            ) : (
              reviews.map((review) => (
                <tr key={review.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-900">{review.products?.name || 'Unknown Product'}</td>
                  <td className="p-4 text-sm text-[var(--gold)]">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-900 max-w-xs truncate" title={review.comment}>{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(review.created_at))}
                    </p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full ${
                      review.status === 'approved' ? 'bg-green-100 text-green-800' :
                      review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {review.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateStatus(review.id, 'approved')} className="text-green-500 hover:text-green-700" title="Approve">
                        <CheckCircle size={16} />
                      </button>
                      <button onClick={() => updateStatus(review.id, 'rejected')} className="text-red-500 hover:text-red-700" title="Reject">
                        <XCircle size={16} />
                      </button>
                      <button onClick={() => deleteReview(review.id)} className="text-gray-400 hover:text-gray-700 ml-2" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default AdminReviews;
