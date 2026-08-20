import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

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

  const { showToast } = useToast();

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
        showToast(`Error adding product: ${error.message}`, 'error');
      } else if (data) {
        setProducts([data, ...products]);
        setShowAdd(false);
        setNewProduct({ name: '', key: '', price: 0, stock: 100, image: '', notes: '', description: '' });
        showToast("Product added successfully!", 'success');
      }
    } catch (err) {
      console.error(err);
      showToast("Unexpected error: " + (err as Error).message, 'error');
    }
  };

  const toggleFeatured = async (product: any) => {
    const { error } = await supabase
      .from('products')
      .update({ is_featured: !product.is_featured })
      .eq('id', product.id);
      
    if (!error) {
      setProducts(products.map(p => p.id === product.id ? {...p, is_featured: !product.is_featured} : p));
      showToast(product.is_featured ? 'Removed from featured' : 'Added to featured', 'info');
    }
  };

  const handleSeedPerfumes = async () => {
    if (!confirm("This will clear all existing products and seed the database with the new 12 curated AuraScents products. Continue?")) return;
    setLoading(true);
    
    try {
      // 1. Fetch Categories
      const { data: categories, error: catError } = await supabase.from('categories').select('*');
      if (catError) throw catError;
      
      const sigId = categories.find(c => c.slug === 'signature')?.id;
      const privId = categories.find(c => c.slug === 'private-blend')?.id;

      if (!sigId || !privId) throw new Error("Categories not found!");

      // 2. Clear existing products (cascades to cart_items/wishlists safely)
      const { data: existingProducts } = await supabase.from('products').select('id');
      if (existingProducts && existingProducts.length > 0) {
        for (const p of existingProducts) {
          await supabase.from('products').delete().eq('id', p.id);
        }
      }

      // 3. Define new products
      const newPerfumes = [
        // Signature Collection
        { name: 'Royal Oud', key: 'royal-oud', price: 450, stock: 100, image: '/assets/royal_oud.jpg', notes: 'Oud · Sandalwood · Cedar', description: 'The most luxurious perfume. Pure sophistication and elegance.', is_featured: true, category_id: sigId },
        { name: 'White Bloom', key: 'white-bloom', price: 360, stock: 100, image: '/assets/white_bloom.jpg', notes: 'Jasmine · Tuberose · Musk', description: 'A delicate, fresh floral composition perfectly balanced for the modern aesthete.', is_featured: false, category_id: sigId },
        { name: 'Midnight Noir', key: 'midnight-noir', price: 420, stock: 100, image: '/assets/midnight_noir.jpg', notes: 'Leather · Tobacco · Smoke', description: 'An intense, masculine fragrance that commands absolute attention in any room.', is_featured: true, category_id: sigId },
        { name: 'Velvet Amber', key: 'velvet-amber', price: 380, stock: 100, image: '/assets/velvet_amber.jpg', notes: 'Amber · Vanilla · Tonka Bean', description: 'Warm, intimate, and utterly addictive amber notes enveloping the senses.', is_featured: false, category_id: sigId },
        { name: 'Ocean Mist', key: 'ocean-mist', price: 340, stock: 100, image: '/assets/ocean_mist.jpg', notes: 'Sea Salt · Bergamot · Driftwood', description: 'Fresh, ozonic, and deeply relaxing. A breath of coastal perfection.', is_featured: false, category_id: sigId },
        { name: 'Signature Gold', key: 'signature-gold', price: 395, stock: 100, image: '/assets/hero_bottle.jpg', notes: 'Saffron · Rose · Patchouli', description: 'Our flagship signature scent. The gold standard of luxury perfumery.', is_featured: true, category_id: sigId },
        // Private Blend
        { name: 'Amber Royale', key: 'amber-royale', price: 520, stock: 50, image: '/assets/amber_royale.jpg', notes: 'Precious Amber · Myrrh · Labdanum', description: 'An ultra-exclusive blend reserved for true connoisseurs of rare resins.', is_featured: false, category_id: privId },
        { name: 'Velvet Santal', key: 'velvet-santal', price: 480, stock: 50, image: '/assets/velvet_santal.jpg', notes: 'Mysore Sandalwood · Cardamom · Iris', description: 'The smoothest sandalwood imaginable, wrapped in velvet iris petals.', is_featured: false, category_id: privId },
        { name: 'Noir Suede', key: 'noir-suede', price: 495, stock: 50, image: '/assets/noir_suede.jpg', notes: 'Black Suede · Saffron · Birch Tar', description: 'A dark, textural masterpiece mimicking the finest bespoke leather.', is_featured: false, category_id: privId },
        { name: 'Rose Obscura', key: 'rose-obscura', price: 460, stock: 50, image: '/assets/rose_obscura.jpg', notes: 'Black Rose · Truffle · Dark Woods', description: 'A hypnotic, shadowy interpretation of the classic rose.', is_featured: false, category_id: privId },
        { name: 'Oud Eclipse', key: 'oud-eclipse', price: 550, stock: 25, image: '/assets/oud_eclipse.jpg', notes: 'Aged Oud · Incense · Black Pepper', description: 'Our rarest oud offering. A total sensory eclipse of dark, resinous wood.', is_featured: false, category_id: privId },
        { name: 'Silver Smoke', key: 'silver-smoke', price: 475, stock: 50, image: '/assets/silver_smoke.jpg', notes: 'Silver Frankincense · Vetiver · Ash', description: 'Ethereal, cold incense smoke lingering over ancient stones.', is_featured: false, category_id: privId }
      ];

      // 4. Insert New Products
      const { error } = await supabase.from('products').insert(newPerfumes);
      if (error) throw error;
      
      showToast(`Successfully seeded 12 premium products!`, 'success');
      fetchProducts();
    } catch (err) {
      showToast("Error during seed: " + (err as Error).message, 'error');
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
            Execute Catalog Seed (12 Products)
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
