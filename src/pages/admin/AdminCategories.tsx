import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Trash2, X } from 'lucide-react';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('categories').select('*').order('name');
    if (!error && data) setCategories(data);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return;
    
    const { data, error } = await supabase
      .from('categories')
      .insert([newCat])
      .select()
      .single();
      
    if (error) {
      alert("Error adding category: " + error.message);
    } else if (data) {
      setCategories([...categories, data].sort((a, b) => a.name.localeCompare(b.name)));
      setShowAdd(false);
      setNewCat({ name: '', slug: '', description: '' });
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? Products in this category will lose their category association.")) return;
    
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories(categories.filter(c => c.id !== id));
    } else {
      alert("Error deleting category: " + error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Manage Categories</h2>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-[var(--matte-black)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[var(--gold)] transition-colors"
        >
          {showAdd ? <X size={16} /> : <Plus size={16} />}
          {showAdd ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 max-w-lg">
          <h3 className="text-lg font-bold mb-4">Create New Category</h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                required
                className="w-full border border-gray-300 rounded-lg p-2" 
                placeholder="e.g. Summer Collection"
                value={newCat.name}
                onChange={e => {
                  const name = e.target.value;
                  setNewCat({...newCat, name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')});
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL friendly)</label>
              <input 
                type="text" 
                required
                className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50" 
                value={newCat.slug}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-2" 
                rows={3}
                value={newCat.description}
                onChange={e => setNewCat({...newCat, description: e.target.value})}
              />
            </div>
            <button type="submit" className="bg-[var(--gold)] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
              Save Category
            </button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-gray-500 col-span-full">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-500 col-span-full">No categories found.</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white p-6 rounded-xl border border-gray-200 relative group">
              <button 
                onClick={() => deleteCategory(category.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </button>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-xs text-gray-400 mb-4 font-mono">{category.slug}</p>
              <p className="text-sm text-gray-600">{category.description || 'No description provided.'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
