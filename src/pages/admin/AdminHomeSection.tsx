import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const AdminHomeSection: React.FC = () => {
  const [hero, setHero] = useState<any>({
    title: '', subtitle: '', background_image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    setLoading(true);
    const { data } = await supabase.from('home_section').select('*').eq('section_key', 'hero').single();
    if (data) setHero(data);
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('home_section')
      .update({
        title: hero.title,
        subtitle: hero.subtitle,
        background_image: hero.background_image
      })
      .eq('section_key', 'hero');
      
    if (error) {
      alert("Error saving: " + error.message);
    } else {
      alert("Hero section updated successfully!");
    }
    setSaving(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Storefront Customizer</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm max-w-2xl">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title (HTML allowed)</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-2" 
                value={hero.title || ''} 
                onChange={(e) => setHero({...hero, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea 
                className="w-full border border-gray-300 rounded-lg p-2" 
                rows={3} 
                value={hero.subtitle || ''}
                onChange={(e) => setHero({...hero, subtitle: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-lg p-2" 
                value={hero.background_image || ''}
                onChange={(e) => setHero({...hero, background_image: e.target.value})}
              />
            </div>
            
            <div className="pt-4">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-[var(--matte-black)] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[var(--gold)] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHomeSection;
