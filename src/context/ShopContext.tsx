import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

export type Product = {
  id?: string;
  key: string;
  name: string;
  notes: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  desc?: string;
};

type CartItem = Product & { quantity: number; cart_item_id?: string };

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productKey: string) => Promise<void>;
  updateQuantity: (productKey: string, quantity: number) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productKey: string) => boolean;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aurascents_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aurascents_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Fetch from Supabase when user logs in
  useEffect(() => {
    if (!user) {
      // Revert to local storage if logged out
      const savedCart = localStorage.getItem('aurascents_cart');
      const savedWishlist = localStorage.getItem('aurascents_wishlist');
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch Cart
        const { data: cartData } = await supabase
          .from('cart_items')
          .select('id, quantity, products(*)')
          .eq('user_id', user.id);

        if (cartData) {
          const formattedCart = cartData.map((item: any) => ({
            ...item.products,
            quantity: item.quantity,
            cart_item_id: item.id
          }));
          setCart(formattedCart);
        }

        // Fetch Wishlist
        const { data: wishData } = await supabase
          .from('wishlists')
          .select('id, products(*)')
          .eq('user_id', user.id);

        if (wishData) {
          const formattedWishlist = wishData.map((item: any) => item.products);
          setWishlist(formattedWishlist);
        }
      } catch (error) {
        console.error("Error fetching user data from Supabase:", error);
      }
    };

    fetchUserData();
  }, [user]);

  // Sync to local storage only if NOT logged in
  useEffect(() => {
    if (!user) {
      localStorage.setItem('aurascents_cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem('aurascents_wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const getProductId = async (productKey: string) => {
    const { data } = await supabase.from('products').select('id').eq('key', productKey).single();
    return data?.id;
  };

  const addToCart = async (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.key === product.key);
      if (existing) {
        return prev.map(item => item.key === product.key ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });

    if (user) {
      try {
        const productId = product.id || await getProductId(product.key);
        if (productId) {
          // Check if exists in DB
          const { data: existing, error } = await supabase
            .from('cart_items')
            .select('id, quantity')
            .eq('user_id', user.id)
            .eq('product_id', productId)
            .maybeSingle();
            
          if (error) console.error("Error checking cart:", error);
            
          if (existing) {
            await supabase.from('cart_items').update({ quantity: existing.quantity + quantity }).eq('id', existing.id);
          } else {
            await supabase.from('cart_items').insert({ user_id: user.id, product_id: productId, quantity });
          }
        }
      } catch (err) {
        console.error("Error saving to cart in DB:", err);
      }
    }
    showToast(`${product.name} added to cart`, 'success');
  };

  const removeFromCart = async (productKey: string) => {
    const itemToRemove = cart.find(i => i.key === productKey);
    setCart(prev => prev.filter(item => item.key !== productKey));

    if (user && itemToRemove) {
      const productId = itemToRemove.id || await getProductId(productKey);
      if (productId) {
        await supabase.from('cart_items').delete().eq('user_id', user.id).eq('product_id', productId);
      }
    }
  };

  const updateQuantity = async (productKey: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productKey);
      return;
    }
    
    setCart(prev => prev.map(item => item.key === productKey ? { ...item, quantity } : item));

    if (user) {
      const item = cart.find(i => i.key === productKey);
      const productId = item?.id || await getProductId(productKey);
      if (productId) {
        await supabase.from('cart_items').update({ quantity }).eq('user_id', user.id).eq('product_id', productId);
      }
    }
  };

  const toggleWishlist = async (product: Product) => {
    const exists = wishlist.some(item => item.key === product.key);
    
    setWishlist(prev => {
      if (exists) return prev.filter(item => item.key !== product.key);
      return [...prev, product];
    });

    if (user) {
      const productId = product.id || await getProductId(product.key);
      if (productId) {
        if (exists) {
          await supabase.from('wishlists').delete().eq('user_id', user.id).eq('product_id', productId);
        } else {
          await supabase.from('wishlists').insert({ user_id: user.id, product_id: productId });
        }
      }
    }
    
    if (exists) {
      showToast(`${product.name} removed from wishlist`, 'info');
    } else {
      showToast(`${product.name} added to wishlist`, 'success');
    }
  };

  const isInWishlist = (productKey: string) => {
    return wishlist.some(item => item.key === productKey);
  };

  const clearCart = () => {
    setCart([]);
    if (!user) {
      localStorage.removeItem('aurascents_cart');
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider value={{ 
      cart, wishlist, addToCart, removeFromCart, updateQuantity, 
      toggleWishlist, isInWishlist, clearCart, cartTotal, cartCount 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
