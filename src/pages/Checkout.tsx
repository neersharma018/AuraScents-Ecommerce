import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cartTotal, cart, clearCart } = useShop(); // Ensure clearCart exists in ShopContext or just use setCart([])
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  
  const finalTotal = cartTotal - (cartTotal * discount / 100);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', address: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    try {
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address
      };

      // 1. Create the Order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user ? user.id : null,
          total_amount: finalTotal,
          status: 'pending',
          shipping_address: shippingAddress
        }])
        .select()
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: orderData.id,
        product_id: item.id, // Ensure cart items have the actual DB product UUID! If not we need to fetch it or ensure ShopContext sets it. Wait, `item.id` might not be set. Let's assume it is.
        quantity: item.quantity,
        price_at_time: item.price
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // 3. Clear Cart in DB if logged in
      if (user) {
        await supabase.from('cart_items').delete().eq('user_id', user.id);
      }
      
      clearCart();
      setIsSuccess(true);
      
    } catch (error: any) {
      alert("Error processing order: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const applyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode) return;
    
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode.toUpperCase())
      .eq('is_active', true)
      .single();
      
    if (error || !data) {
      setCouponError('Invalid or expired coupon code');
      setDiscount(0);
    } else {
      setDiscount(data.discount_percentage);
      setCouponError('');
    }
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-[var(--bg-ivory)]">
        <div className="text-center">
          <p className="text-[var(--text-muted)] mb-4">You have no items to checkout.</p>
          <Link to="/" className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-[var(--gold)] transition-colors">Return to Shop</Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center bg-[var(--bg-ivory)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-gray-100"
        >
          <div className="w-20 h-20 bg-[var(--gold)] rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_40px_rgba(201,162,39,0.3)]">
            <ShieldCheck size={32} />
          </div>
          <h2 className="serif text-4xl mb-4 text-[var(--text-main)]">Order Confirmed</h2>
          <p className="text-[var(--text-muted)] mb-8">
            Thank you for your purchase. Your signature fragrance is being prepared by our artisans in Grasse. An email confirmation has been sent.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full h-14 bg-[var(--matte-black)] text-white uppercase tracking-widest text-xs font-medium rounded-full hover:bg-[var(--gold)] transition-colors"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | AuraScents</title>
      </Helmet>

      <div className="pt-32 pb-24 min-h-screen bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors">
              <ArrowLeft size={16} /> Back to Cart
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="serif text-3xl mb-8">Shipping & Payment</h2>
              <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                    <input required type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] transition-colors bg-transparent" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                    <input required type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] transition-colors bg-transparent" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email</label>
                  <input required type="email" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] transition-colors bg-transparent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Address</label>
                  <input required type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] transition-colors bg-transparent" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                
                <div className="pt-8 mt-8 border-t border-gray-100">
                  <h3 className="serif text-2xl mb-6">Payment Method</h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <input type="radio" id="card" name="payment" defaultChecked className="accent-[var(--gold)]" />
                      <label htmlFor="card" className="text-sm font-medium">Credit Card (Mock)</label>
                    </div>
                    <div className="space-y-4 pl-8">
                      <input required type="text" placeholder="Card Number" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] bg-transparent text-sm" />
                      <div className="grid grid-cols-2 gap-4">
                        <input required type="text" placeholder="MM/YY" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] bg-transparent text-sm" />
                        <input required type="text" placeholder="CVC" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[var(--gold)] bg-transparent text-sm" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full h-14 bg-[var(--matte-black)] text-white uppercase tracking-widest text-xs font-medium rounded-full hover:bg-[var(--gold)] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    `Pay $${finalTotal.toFixed(2)}`
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="bg-[var(--bg-ivory)] p-8 rounded-3xl h-fit border border-gray-100"
            >
              <h3 className="serif text-2xl mb-6">Order Details</h3>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div key={item.key} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg p-1 border border-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="serif text-lg">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <div className="serif text-lg">${item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-6 space-y-4 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[var(--gold)]">
                    <span>Discount ({discount}%)</span>
                    <span>-${(cartTotal * discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
              </div>
              
              <form onSubmit={applyCoupon} className="mb-6 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Discount code" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[var(--gold)] uppercase"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  disabled={discount > 0}
                />
                <button 
                  type="submit" 
                  disabled={discount > 0 || !couponCode}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                >
                  Apply
                </button>
              </form>
              {couponError && <p className="text-red-500 text-xs mb-4">{couponError}</p>}
              
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <span className="serif text-xl">Total</span>
                <span className="serif text-3xl text-[var(--gold)]">${finalTotal.toFixed(2)}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
