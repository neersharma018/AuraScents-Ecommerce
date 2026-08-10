import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', key: '', price: 0, stock: 100, image: '', notes: '', description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) console.error("Error fetching products:", error);
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          ...newProduct,
          rating: 5,
          reviews: 0
        }])
        .select()
        .single();
        
      if (error) {
        console.error(error);
        alert(`Error adding product: ${error.message} (Code: ${error.code})`);
      } else if (data) {
        setProducts([data, ...products]);
        setShowAdd(false);
        setNewProduct({ name: '', key: '', price: 0, stock: 100, image: '', notes: '', description: '' });
        alert("Product added successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Unexpected error: " + (err as Error).message);
    }
  };

  const toggleFeatured = async (product: any) => {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id);
      
    if (!error) {
      setProducts(products.map(p => p.id === product.id ? {...p, is_featured: !product.is_featured} : p));
    }
  };

  const handleSeedPerfumes = async () => {
    if (!confirm("This will add 7 new premium perfumes to your database. Continue?")) return;
    setLoading(true);
    
    const newPerfumes = [
      { name: 'Velvet Orchid', key: 'velvet-orchid', price: 395, stock: 50, image: '/assets/white_bloom.jpg', notes: 'Black Orchid · Patchouli · Truffle', description: 'A luxurious and sensual fragrance of rich, dark accords.', is_featured: false, rating: 5, reviews: 0 },
      { name: 'Luminous Citrus', key: 'luminous-citrus', price: 280, stock: 75, image: '/assets/ocean_mist.jpg', notes: 'Bergamot · Neroli · Vetiver', description: 'Bright, effervescent, and undeniably uplifting.', is_featured: false, rating: 5, reviews: 0 },
      { name: 'Santal Rouge', key: 'santal-rouge', price: 410, stock: 30, image: '/assets/royal_oud.jpg', notes: 'Sandalwood · Cardamom · Violet', description: 'An intoxicating blend of creamy sandalwood and warm spices.', is_featured: true, rating: 5, reviews: 0 },
      { name: 'Noir Mystique', key: 'noir-mystique', price: 460, stock: 25, image: '/assets/midnight_noir.jpg', notes: 'Incense · Dark Chocolate · Amber', description: 'Deeply mysterious, a fragrance for the night.', is_featured: false, rating: 5, reviews: 0 },
      { name: 'Fleur d\'Or', key: 'fleur-d-or', price: 340, stock: 60, image: '/assets/velvet_amber.jpg', notes: 'Ylang-Ylang · Vanilla · Musk', description: 'Golden, floral, and deeply addictive.', is_featured: false, rating: 5, reviews: 0 },
      { name: 'Azure Breeze', key: 'azure-breeze', price: 250, stock: 100, image: '/assets/ocean_mist.jpg', notes: 'Sea Salt · Sage · Driftwood', description: 'Crisp, aquatic, and refreshing as the ocean breeze.', is_featured: false, rating: 5, reviews: 0 },
      { name: 'Imperial Leather', key: 'imperial-leather', price: 520, stock: 15, image: '/assets/midnight_noir.jpg', notes: 'Russian Leather · Birch · Juniper', description: 'A commanding, smoky leather scent of absolute authority.', is_featured: true, rating: 5, reviews: 0 }
    ];

    try {
      const { error } = await supabase.from('products').insert(newPerfumes);
      if (error) {
        alert("Error seeding products: " + error.message);
      } else {
        alert(`Successfully added ${newPerfumes.length} new perfumes!`);
        fetchProducts(); // Refresh the list
      }
    } catch (err) {
      alert("Unexpected error: " + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        <div className="flex gap-4">
          <button 
            onClick={handleSeedPerfumes}
            className="bg-[var(--gold)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
          >
            Generate 7 Perfumes
          </button>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-[var(--matte-black)] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            {showAdd ? 'Cancel' : 'Add Product'}
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 mb-8 max-w-2xl">
          <h3 className="text-lg font-bold mb-4">Create New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value, key: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Key (URL Slug)</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50" value={newProduct.key} readOnly />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input required type="number" className="w-full border border-gray-300 rounded-lg p-2" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input required type="number" className="w-full border border-gray-300 rounded-lg p-2" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2" placeholder="/assets/image.jpg" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (e.g. Amber · Vanilla · Tonka Bean)</label>
              <input required type="text" className="w-full border border-gray-300 rounded-lg p-2" value={newProduct.notes} onChange={e => setNewProduct({...newProduct, notes: e.target.value})} />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required className="w-full border border-gray-300 rounded-lg p-2" rows={3} value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-[var(--gold)] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">Loading products...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">No products found.</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.key}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-900">${product.price}</td>
                  <td className="p-4 text-sm text-gray-900">{product.stock}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => toggleFeatured(product)}
                      className={`px-2 py-1 text-[10px] uppercase font-bold rounded-full transition-colors ${
                        product.is_featured 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {product.is_featured ? 'Featured' : 'Standard'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
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

export default AdminProducts;
