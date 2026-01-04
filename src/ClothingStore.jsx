import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Trash2, Plus, Minus } from 'lucide-react';

import sarong1 from './assets/sarong1.jpg';
import sarong2 from './assets/sarong2.jpg';
import sarong3 from './assets/sarong3.jpg';
import sarong4 from './assets/sarong4.jpg';

import lungi1 from './assets/lungi1.jpg';
import lungi2 from './assets/lungi2.jpg';
import lungi3 from './assets/lungi3.jpg';
import lungi4 from './assets/lungi4.jpg';

const productImages = {
  sarong1,
  sarong2,
  sarong3,
  sarong4,
  lungi1,
  lungi2,
  lungi3,
  lungi4,
};

export default function ClothingStore() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState('home');
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [checkoutForm, setCheckoutForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: ''
  });
  
  const categories = ['All', 'Women', 'Men', 'Kids', 'Accessories', 'Sale'];
  const featuredProducts = [
    { id: 1, name: 'Traditional Sarong', price: 29.99, category: 'Men', image: productImages.sarong1 },
    { id: 2, name: 'Hand Painted Sarong', price: 59.99, category: 'Women', image: productImages.sarong2 },
    { id: 3, name: 'Cotton Lungi', price: 89.99, category: 'Men', image: productImages.lungi1 },
    { id: 4, name: 'Designer Sarong', price: 45.99, category: 'Accessories', image: productImages.sarong3 },
    { id: 5, name: 'Premium Lungi', price: 69.99, category: 'Women', image: productImages.lungi2 },
    { id: 6, name: 'Kids Sarong', price: 19.99, category: 'Kids', image: productImages.lungi3 },
    { id: 7, name: 'Silk Lungi', price: 79.99, category: 'Women', image: productImages.lungi4 },
    { id: 8, name: 'Classic Sarong', price: 49.99, category: 'Men', image: productImages.sarong4 }
  ];
  
  const addToCart = (p) => {
    const e = cart.find(i => i.id === p.id);
    if (e) setCart(cart.map(i => i.id === p.id ? {...i, quantity: i.quantity + 1} : i));
    else setCart([...cart, {...p, quantity: 1}]);
  };
  
  const toggleFavorite = (p) => {
    const isFav = favorites.some(i => i.id === p.id);
    isFav ? setFavorites(favorites.filter(i => i.id !== p.id)) : setFavorites([...favorites, p]);
  };
  
  const isFavorite = (id) => favorites.some(i => i.id === id);
  const updateQuantity = (id, c) => setCart(cart.map(i => i.id === id ? {...i, quantity: i.quantity + c} : i).filter(i => i.quantity > 0));
  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id));
  const getCartTotal = () => cart.reduce((t, i) => t + (i.price * i.quantity), 0);
  const getCartCount = () => cart.reduce((t, i) => t + i.quantity, 0);
  
  const handleCheckoutSubmit = () => {
    setCheckoutError('');
    const fields = [
      {k: 'firstName', m: 'first name'}, {k: 'lastName', m: 'last name'}, 
      {k: 'email', m: 'email address'}, {k: 'phone', m: 'phone number'}, 
      {k: 'address', m: 'address'}, {k: 'city', m: 'city'}, 
      {k: 'postalCode', m: 'postal code'}, {k: 'country', m: 'country'}
    ];
    for (let f of fields) {
      if (!checkoutForm[f.k]) {
        setCheckoutError(`Please enter your ${f.m}`);
        return;
      }
    }
    setOrderNumber('ORD-' + Date.now().toString().slice(-8));
    setCurrentPage('success');
  };
  
  const handleReturnHome = () => {
    setCart([]);
    setCurrentPage('home');
    setSelectedCategory('All');
    setCheckoutError('');
    setCheckoutForm({firstName: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: ''});
  };
  
  const filteredProducts = selectedCategory === 'All' ? featuredProducts : featuredProducts.filter(p => p.category === selectedCategory);

  const Header = () => (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setCurrentPage('home')} className="text-2xl font-bold text-gray-800">CHATZ STORE</button>
          <nav className="hidden md:flex space-x-8">
            {categories.map(c => <button key={c} className={`${selectedCategory === c ? 'font-semibold text-black' : 'text-gray-600'} hover:text-black`} onClick={() => {setSelectedCategory(c); setCurrentPage('home');}}>{c}</button>)}
          </nav>
          <div className="flex space-x-4 items-center">
            <button className="p-1 text-gray-600 hover:text-black"><User size={20} /></button>
            <button className="p-1 text-gray-600 hover:text-black relative" onClick={() => setCurrentPage('favorites')}>
              <Heart size={20} />
              {favorites.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{favorites.length}</span>}
            </button>
            <button className="p-1 text-gray-600 hover:text-black relative" onClick={() => setCurrentPage('cart')}>
              <ShoppingCart size={20} />
              {getCartCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{getCartCount()}</span>}
            </button>
            <button className="md:hidden p-1 text-gray-600 hover:text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
        {mobileMenuOpen && <nav className="md:hidden pt-4 pb-2"><div className="flex flex-col space-y-3">{categories.map(c => <button key={c} className={`${selectedCategory === c ? 'font-semibold text-black' : 'text-gray-600'} hover:text-black text-left`} onClick={() => {setSelectedCategory(c); setMobileMenuOpen(false); setCurrentPage('home');}}>{c}</button>)}</div></nav>}
      </div>
    </header>
  );

  if (currentPage === 'favorites') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
            {favorites.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Heart size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-medium text-gray-600 mb-4">No favorites yet</h2>
                <p className="text-gray-500 mb-6">Start adding items to your favorites</p>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700" onClick={() => setCurrentPage('home')}>Continue Shopping</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map(p => (
                  <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full text-red-500 shadow-md hover:bg-red-50" onClick={() => toggleFavorite(p)}><Heart size={20} fill="currentColor" /></button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{p.name}</h3>
                      <p className="text-gray-600 mb-3">${p.price.toFixed(2)}</p>
                      <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700" onClick={() => addToCart(p)}>Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'cart') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
                <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700" onClick={() => setCurrentPage('home')}>Continue Shopping</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md">
                  {cart.map(i => (
                    <div key={i.id} className="flex items-center gap-4 p-4 border-b last:border-b-0">
                      <img src={i.image} alt={i.name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-grow">
                        <h3 className="font-medium text-lg">{i.name}</h3>
                        <p className="text-gray-600">${i.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => updateQuantity(i.id, -1)}><Minus size={16} /></button>
                        <span className="w-8 text-center font-medium">{i.quantity}</span>
                        <button className="p-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => updateQuantity(i.id, 1)}><Plus size={16} /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(i.price * i.quantity).toFixed(2)}</p>
                        <button className="text-red-500 hover:text-red-700 mt-2" onClick={() => removeFromCart(i.id)}><Trash2 size={18} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 sticky top-24 h-fit">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>${(getCartTotal() * 0.1).toFixed(2)}</span></div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg"><span>Total</span><span>${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}</span></div>
                  </div>
                  <button className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 mb-2" onClick={() => setCurrentPage('checkout')}>Proceed to Checkout</button>
                  <button className="w-full bg-white text-gray-800 py-3 rounded-md border border-gray-300 hover:bg-gray-50" onClick={() => setCurrentPage('home')}>Continue Shopping</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                {checkoutError && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
                    <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    <span>{checkoutError}</span>
                  </div>
                )}
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium mb-2">First Name</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.firstName} onChange={(e) => setCheckoutForm({...checkoutForm, firstName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-2">Last Name</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.lastName} onChange={(e) => setCheckoutForm({...checkoutForm, lastName: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-2">Email</label><input type="email" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.email} onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-2">Phone</label><input type="tel" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})} /></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-2">Address</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.address} onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-2">City</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.city} onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})} /></div>
                  <div><label className="block text-sm font-medium mb-2">Postal Code</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.postalCode} onChange={(e) => setCheckoutForm({...checkoutForm, postalCode: e.target.value})} /></div>
                  <div className="col-span-2"><label className="block text-sm font-medium mb-2">Country</label><input type="text" className="w-full px-4 py-2 border rounded-md" value={checkoutForm.country} onChange={(e) => setCheckoutForm({...checkoutForm, country: e.target.value})} /></div>
                </div>
                <div className="mt-8 bg-gray-50 rounded-lg p-4">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <label className="flex items-center space-x-3"><input type="checkbox" className="w-5 h-5" defaultChecked /><div><span className="font-medium">Cash on Delivery</span><p className="text-sm text-gray-600">Pay when delivered</p></div></label>
                </div>
                <div className="mt-6 flex gap-4">
                  <button className="flex-1 bg-white text-gray-800 py-3 rounded-md border hover:bg-gray-50" onClick={() => setCurrentPage('cart')}>Back</button>
                  <button className="flex-1 bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700" onClick={handleCheckoutSubmit}>Place Order</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">{cart.map(i => <div key={i.id} className="flex justify-between text-sm"><span>{i.name} × {i.quantity}</span><span>${(i.price * i.quantity).toFixed(2)}</span></div>)}</div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between"><span>Subtotal</span><span>${getCartTotal().toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>$5.00</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${(getCartTotal() * 0.1).toFixed(2)}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg"><span>Total</span><span>${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'success') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
              <p className="text-lg text-gray-600 mb-6">Thank you for your purchase</p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-2xl font-bold text-gray-800">{orderNumber}</p>
              </div>
              <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">Total:</span><span>${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Delivery:</span><span>3-5 Days</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">Address:</span><span>{checkoutForm.city}, {checkoutForm.country}</span></div>
                </div>
              </div>
              <p className="text-gray-600 mb-8">Confirmation sent to <span className="font-medium">{checkoutForm.email}</span></p>
              <button className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700" onClick={handleReturnHome}>Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Aurudu Collection 2026</h1>
          <p className="text-xl mb-8">Discover the latest trends</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100" onClick={() => setSelectedCategory('Women')}>Shop Women</button>
            <button className="bg-white text-gray-800 px-6 py-3 rounded-md hover:bg-gray-100" onClick={() => setSelectedCategory('Men')}>Shop Men</button>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{selectedCategory === 'All' ? 'Featured Products' : selectedCategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={p.image} alt={p.name} className="w-full h-64 object-cover" />
                  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50" onClick={() => toggleFavorite(p)}>
                    <Heart size={20} fill={isFavorite(p.id) ? 'currentColor' : 'none'} className={isFavorite(p.id) ? 'text-red-500' : 'text-gray-600'} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-1">{p.name}</h3>
                  <p className="text-gray-600 mb-3">${p.price.toFixed(2)}</p>
                  <button className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700" onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">CHATZ STORE</h3>
              <p className="text-gray-400 mb-4">Premium sarongs and traditional wear</p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div><h4 className="text-lg font-semibold mb-4">Shop</h4><ul className="space-y-2">{categories.map(c => <li key={c}><button onClick={() => setSelectedCategory(c)} className="text-gray-400 hover:text-white">{c}</button></li>)}</ul></div>
            <div><h4 className="text-lg font-semibold mb-4">Support</h4><ul className="space-y-2"><li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li><li><a href="#" className="text-gray-400 hover:text-white">Shipping</a></li></ul></div>
            <div><h4 className="text-lg font-semibold mb-4">About</h4><ul className="space-y-2"><li><a href="#" className="text-gray-400 hover:text-white">Our Story</a></li><li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li></ul></div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">&copy; 2025 Chatz Store. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}