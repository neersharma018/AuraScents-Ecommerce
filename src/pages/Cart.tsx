import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Shopping Cart | AuraScents</title>
      </Helmet>

      <div className="pt-32 pb-24 min-h-screen bg-[var(--bg-ivory)]">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="serif text-4xl text-[var(--text-main)]">Your <span className="text-gold-italic">Cart</span></h1>
          </motion.div>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <p className="text-[var(--text-muted)] mb-6">Your shopping cart is currently empty.</p>
              <Link to="/" className="inline-flex items-center justify-center h-12 px-8 bg-[var(--matte-black)] text-white uppercase tracking-widest text-xs rounded-full hover:bg-[var(--gold)] transition-colors">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <motion.div 
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 relative group"
                  >
                    <div className="w-32 h-32 bg-gray-50 rounded-xl p-2 flex-shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between w-full">
                      <div className="mb-4 sm:mb-0">
                        <Link to={`/product/${item.key}`} className="serif text-2xl text-[var(--text-main)] hover:text-[var(--gold)] transition-colors block mb-1">{item.name}</Link>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-2">100ML Extrait</p>
                        <p className="serif text-xl text-[var(--text-main)]">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="flex items-center border border-[var(--border-dark)] rounded-full px-3 h-10">
                          <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="p-1 hover:text-[var(--gold)] transition-colors"><Minus size={14} /></button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="p-1 hover:text-[var(--gold)] transition-colors"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.key)} className="text-gray-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[var(--matte-black)] text-white p-8 rounded-3xl sticky top-32"
                >
                  <h3 className="serif text-2xl mb-6">Order Summary</h3>
                  <div className="space-y-4 text-sm border-b border-white/10 pb-6 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span>Complimentary</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Taxes</span>
                      <span>Calculated at checkout</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-8">
                    <span className="serif text-xl">Total</span>
                    <span className="serif text-2xl text-[var(--gold)]">${cartTotal}</span>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full h-14 bg-white text-[var(--matte-black)] uppercase tracking-widest text-xs font-medium rounded-full flex items-center justify-center gap-2 hover:bg-[var(--gold)] hover:text-white transition-colors"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
