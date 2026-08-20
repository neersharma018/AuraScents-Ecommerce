import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://roykoyizzvqkenoxxtpw.supabase.co',
  'sb_publishable_VI2EMkeELoBJEkDWKRXlFQ_NpYj7v0N'
);

async function checkDb() {
  const { data: cats } = await supabase.from('categories').select('*');
  console.log('Categories:', cats);
  
  const { data: prods } = await supabase.from('products').select('*');
  console.log('Products count:', prods?.length);
  console.log('Products:', JSON.stringify(prods?.map(p => ({
    id: p.id, 
    key: p.key, 
    name: p.name, 
    category_id: p.category_id,
    image: p.image
  })), null, 2));
}

checkDb();
