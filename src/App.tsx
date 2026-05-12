import React, { useState, useMemo, useEffect } from 'react';
import { Search, Menu, Smartphone, ArrowRight, Star, SlidersHorizontal, ArrowLeftRight, X, ChevronRight, MessageCircle, Settings, Plus, Edit2, Save, Trash2, ShieldCheck, Lock, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_PHONES } from './data/mockProducts';
import { MobilePhone } from './types';

const ADMIN_PASSCODE = '88888'; // Default passcode

export default function App() {
  const [phones, setPhones] = useState<MobilePhone[]>(() => {
    const saved = localStorage.getItem('nokey_phones');
    return saved ? JSON.parse(saved) : MOCK_PHONES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [comparisonList, setComparisonList] = useState<MobilePhone[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Admin States
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [editingPhone, setEditingPhone] = useState<MobilePhone | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('nokey_phones', JSON.stringify(phones));
  }, [phones]);

  const brands = ['All', ...new Set(phones.map(p => p.brand))];

  const filteredPhones = useMemo(() => {
    return phones.filter(phone => {
      const matchesSearch = phone.model.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           phone.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === 'All' || phone.brand === selectedBrand;
      return matchesSearch && matchesBrand;
    });
  }, [searchQuery, selectedBrand, phones]);

  const toggleCompare = (phone: MobilePhone) => {
    setComparisonList(prev => {
      if (prev.find(p => p.id === phone.id)) {
        return prev.filter(p => p.id !== phone.id);
      }
      if (prev.length >= 2) {
        return [prev[1], phone];
      }
      return [...prev, phone];
    });
  };

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === ADMIN_PASSCODE) {
      setIsAdminMode(true);
      setShowPasscodeModal(false);
      setPasscodeInput('');
    } else {
      alert('Incorrect Passcode');
      setPasscodeInput('');
    }
  };

  const savePhone = (phone: MobilePhone) => {
    setPhones(prev => {
      const exists = prev.find(p => p.id === phone.id);
      if (exists) {
        return prev.map(p => p.id === phone.id ? phone : p);
      }
      return [phone, ...prev];
    });
    setEditingPhone(null);
    setIsAddModalOpen(false);
  };

  const deletePhone = (id: string) => {
    if (confirm('Are you sure you want to delete this device?')) {
      setPhones(prev => prev.filter(p => p.id !== id));
      setEditingPhone(null);
    }
  };

  return (
    <div className="min-h-screen tech-grid-lines pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[var(--color-tech-black)]/80 backdrop-blur-md border-bottom border-white/5 px-4 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[var(--color-tech-blue)] rounded-lg flex items-center justify-center rotate-3">
            <Smartphone className="text-white" size={24} />
          </div>
          <span className="font-mono font-bold text-xl tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(0,119,190,0.3)]">
            Nokey<span className="text-[var(--color-tech-blue)]">Phone</span>
          </span>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
          <input 
            type="text" 
            placeholder="Search for models, brands, or specs..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 focus:outline-none focus:border-[var(--color-tech-blue)] transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {isAdminMode ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-[var(--color-tech-blue)] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2"
              >
                <Plus size={16} /> Add Link
              </button>
              <button 
                onClick={() => setIsAdminMode(false)}
                className="p-2 border border-white/20 rounded-lg text-white/40 hover:text-white"
              >
                <ShieldCheck size={20} className="text-green-400" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowPasscodeModal(true)}
              className="p-2 border border-white/10 rounded-lg text-white/20 hover:text-white transition-colors"
            >
              <Lock size={20} />
            </button>
          )}
          <button className="md:hidden p-2">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[60vh] flex items-center overflow-hidden px-4 lg:px-12">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://scontent.fbkk3-1.fna.fbcdn.net/v/t39.30808-6/571197321_838282458959846_7177915535014642741_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeFnjYV6XGYTbjwuau3kgmmU9CLCHHlfB1_0IsIceV8HX6Js1Kc1LjjlCvbBgqhAtnp3i-81ldesqLiEEddlLrYn&_nc_ohc=2-xGRJ5iDMoQ7kNvwH7E4Qe&_nc_oc=AdoGQydGCQfm4SS-DIraq45Av7Kta21G5TZzQCrVAa2_y6bkQq5aefRFbvoxxIBK2yw&_nc_zt=23&_nc_ht=scontent.fbkk3-1.fna&_nc_gid=ZUYrI1t9MfOvwd3SqLiVew&_nc_ss=7b2a8&oh=00_Af6eez6_qS7l-HtLVQS5p_iFY6aqHGIVI8AHEgkhYRBPvw&oe=6A083714" 
            alt="Hero Tech" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-tech-black)] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-tech-black)] to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--color-tech-blue)]/20 text-[var(--color-tech-blue)] px-3 py-1 rounded-full mb-6 border border-[var(--color-tech-blue)]/30">
            <Star size={14} />
            <span className="text-xs font-bold uppercase tracking-wider">ဖုန်း ၀၈၁၅၄၁၁၂၃၇/၀၉၀၇၃၉၄၁၀၄</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
            အရစ်ကျလား? အသစ်လား ? <br />
            <span className="text-[var(--color-tech-blue)]">တဘက်ရစ်လား?</span>
          </h1>
          <p className="text-lg text-white/60 mb-8 max-w-lg leading-relaxed">
            ဘာပဲလိုလို NokeyPhone ရှိတယ်နော်။ အကောင်းဆုံးဝန်ဆောင်မှုနဲ့ အမြန်ဆုံး ပို့ဆောင်ပေးနေပါပြီ။
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="tech-btn-primary flex items-center gap-2">
              Explore Collections <ArrowRight size={20} />
            </button>
            {isAdminMode && (
              <button onClick={() => setIsAddModalOpen(true)} className="tech-btn-outline flex items-center gap-2">
                <Plus size={16} /> New Device
              </button>
            )}
          </div>
        </motion.div>
      </header>

      {/* Filter Section */}
      <section className="px-4 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
            <div className="p-2 bg-white/5 rounded-lg">
              <SlidersHorizontal size={20} className="text-white/60" />
            </div>
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedBrand === brand 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
          <div className="text-right text-xs uppercase tracking-widest text-white/40 font-bold">
            Showing {filteredPhones.length} Devices
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPhones.map((phone, idx) => (
              <motion.div
                layout
                key={phone.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.05 }}
                className="tech-card group flex flex-col relative"
              >
                {isAdminMode && (
                  <div className="absolute top-2 right-2 z-20 flex gap-2">
                    <button 
                      onClick={() => setEditingPhone(phone)}
                      className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white/60 hover:text-white border border-white/10"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => deletePhone(phone.id)}
                      className="p-2 bg-red-500/20 backdrop-blur-md rounded-full text-red-400 hover:bg-red-500/40 border border-red-500/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="relative aspect-square overflow-hidden bg-white/5">
                  <img 
                    src={phone.image} 
                    alt={phone.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-white/10">
                      {phone.condition}
                    </span>
                    {phone.isFeatured && (
                      <span className="bg-[var(--color-tech-blue)] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                        Staff Pick
                      </span>
                    )}
                  </div>
                  {!isAdminMode && (
                    <button 
                      onClick={() => toggleCompare(phone)}
                      className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md border transition-all ${
                        comparisonList.find(p => p.id === phone.id)
                          ? 'bg-[var(--color-tech-blue)] border-transparent text-white'
                          : 'bg-black/60 border-white/10 text-white/60 hover:text-white'
                      }`}
                    >
                      <ArrowLeftRight size={18} />
                    </button>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-[var(--color-tech-black)] to-transparent pt-12 text-center">
                    <a 
                      href={`https://m.me/nokeyphone?text=I'm interested in the ${phone.brand} ${phone.model}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex tech-btn-primary text-sm items-center justify-center gap-2 no-underline w-full"
                    >
                      Messenger <MessageCircle size={16} />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-white/40 tracking-[0.2em]">{phone.brand}</p>
                      <h3 className="text-xl font-bold tracking-tight">{phone.model}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-mono text-[var(--color-electric-yellow)]">{phone.price.toLocaleString()} ฿</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-white/60 border-t border-white/5 pt-4">
                    <div className="flex flex-col">
                      <span className="uppercase text-[9px] text-white/30 font-bold">Storage</span>
                      <span className="font-mono">{phone.storage}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase text-[9px] text-white/30 font-bold">RAM</span>
                      <span className="font-mono">{phone.ram}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex -space-x-2">
                         <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: '#ccc' }} />
                         <div className="w-6 h-6 rounded-full border border-white/20" style={{ backgroundColor: '#333' }} />
                    </div>
                    <button className="text-[10px] uppercase font-bold tracking-widest text-white/40 hover:text-white flex items-center gap-1 transition-colors">
                      Full Specs <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Admin Modals */}
      <AnimatePresence>
        {showPasscodeModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9 }} animate={{ scale: 1 }}
              className="bg-[var(--color-tech-gray)] p-8 rounded-2xl border border-white/10 w-full max-w-sm text-center"
            >
              <Lock size={48} className="mx-auto mb-6 text-[var(--color-tech-blue)]" />
              <h2 className="text-xl font-bold mb-2 uppercase italic">Admin Access</h2>
              <p className="text-sm text-white/40 mb-6">Enter passcode to manage inventory.</p>
              <form onSubmit={handlePasscodeSubmit}>
                <input 
                  type="password" 
                  autoFocus
                  placeholder="••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 text-center text-2xl tracking-[1em] focus:outline-none focus:border-[var(--color-tech-blue)] mb-4"
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 tech-btn-primary">Unlock</button>
                  <button type="button" onClick={() => setShowPasscodeModal(false)} className="px-6 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {(editingPhone || isAddModalOpen) && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[var(--color-tech-gray)] w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden my-auto"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase italic">{editingPhone ? 'Edit Device' : 'Add New Device'}</h3>
                <button onClick={() => { setEditingPhone(null); setIsAddModalOpen(false); }} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
              </div>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newPhone: MobilePhone = {
                    id: editingPhone?.id || `p${Date.now()}`,
                    brand: formData.get('brand') as string,
                    model: formData.get('model') as string,
                    price: Number(formData.get('price')),
                    storage: formData.get('storage') as string,
                    ram: formData.get('ram') as string,
                    color: formData.get('color') as string,
                    condition: formData.get('condition') as any,
                    image: formData.get('image') as string,
                    specs: {
                      screen: formData.get('screen') as string,
                      processor: formData.get('processor') as string,
                      camera: formData.get('camera') as string,
                      battery: formData.get('battery') as string,
                    }
                  };
                  savePhone(newPhone);
                }}
                className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Brand</span>
                    <input name="brand" defaultValue={editingPhone?.brand} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Model</span>
                    <input name="model" defaultValue={editingPhone?.model} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Price (THB)</span>
                    <input name="price" type="number" defaultValue={editingPhone?.price} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Condition</span>
                    <select name="condition" defaultValue={editingPhone?.condition} className="w-full bg-[var(--color-tech-black)] border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1">
                      <option value="New">New</option>
                      <option value="Like New">Like New</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Image URL</span>
                    <input name="image" defaultValue={editingPhone?.image} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" placeholder="https://..." />
                  </label>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Storage</span>
                      <input name="storage" defaultValue={editingPhone?.storage} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                    </label>
                    <label className="block">
                      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">RAM</span>
                      <input name="ram" defaultValue={editingPhone?.ram} required className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Screen Spec</span>
                    <input name="screen" defaultValue={editingPhone?.specs.screen} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Processor</span>
                    <input name="processor" defaultValue={editingPhone?.specs.processor} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Camera</span>
                    <input name="camera" defaultValue={editingPhone?.specs.camera} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Battery</span>
                    <input name="battery" defaultValue={editingPhone?.specs.battery} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[var(--color-tech-blue)] outline-none mt-1" />
                  </label>
                </div>
                <div className="md:col-span-2 pt-4 flex gap-4">
                  <button type="submit" className="flex-1 tech-btn-primary flex items-center justify-center gap-2">
                    <Save size={18} /> {editingPhone ? 'Update Device' : 'Create Device'}
                  </button>
                  <button type="button" onClick={() => { setEditingPhone(null); setIsAddModalOpen(false); }} className="px-8 border border-white/20 rounded-xl hover:bg-white/5 transition-colors">Discard</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Drawer */}
      <AnimatePresence>
        {comparisonList.length > 0 && !isAdminMode && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className="fixed bottom-0 inset-x-0 z-40 px-4 lg:px-12 pb-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-[var(--color-tech-gray)] border border-white/20 rounded-2xl shadow-2xl p-4 pointer-events-auto flex items-center gap-6">
              <div className="hidden sm:block">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-tech-blue)] mb-1">Compare Mode</p>
                <p className="text-[10px] text-white/40">{comparisonList.length}/2 Selected</p>
              </div>
              
              <div className="flex-1 flex gap-4">
                {comparisonList.map(phone => (
                  <div key={phone.id} className="flex-1 min-w-0 bg-white/5 rounded-xl p-2 flex items-center gap-3 border border-white/5 relative">
                    <img src={phone.image} className="w-10 h-10 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{phone.model}</p>
                      <p className="text-[10px] text-white/40 font-mono">{phone.price.toLocaleString()} ฿</p>
                    </div>
                    <button 
                      onClick={() => toggleCompare(phone)}
                      className="absolute -top-2 -right-2 bg-white text-black p-1 rounded-full border border-black shadow"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {comparisonList.length === 1 && (
                  <div className="flex-1 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center">
                    <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest">Select another</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => setIsCompareModalOpen(true)}
                  className="tech-btn-primary h-12 flex items-center justify-center gap-2 whitespace-nowrap text-sm disabled:opacity-50" 
                  disabled={comparisonList.length < 2}
                >
                  Compare <ArrowLeftRight size={16} />
                </button>
                <button 
                  onClick={() => setComparisonList([])}
                  className="p-3 border border-white/10 rounded-xl text-white/40 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Modal Overlay */}
      <AnimatePresence>
        {isCompareModalOpen && comparisonList.length === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-5xl bg-[var(--color-tech-gray)] border border-white/10 rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xl font-bold uppercase italic tracking-tighter">Hardware <span className="text-[var(--color-tech-blue)]">Comparison</span></h3>
                <button onClick={() => setIsCompareModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-3 gap-8">
                  {/* Labels Column */}
                  <div className="pt-48 space-y-12">
                    <div className="h-20 flex items-center text-xs uppercase font-bold tracking-widest text-white/30">Price</div>
                    <div className="h-20 flex items-center text-xs uppercase font-bold tracking-widest text-white/30">Screen</div>
                    <div className="h-20 flex items-center text-xs uppercase font-bold tracking-widest text-white/30">Processor</div>
                    <div className="h-20 flex items-center text-xs uppercase font-bold tracking-widest text-white/30">Camera</div>
                    <div className="h-20 flex items-center text-xs uppercase font-bold tracking-widest text-white/30">Battery</div>
                  </div>

                  {/* Device 1 */}
                  <div className="space-y-12 text-center">
                    <div className="h-48 flex flex-col items-center justify-center gap-4">
                      <img src={comparisonList[0].image} className="h-32 object-contain" referrerPolicy="no-referrer" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[var(--color-tech-blue)]">{comparisonList[0].brand}</p>
                        <p className="font-bold">{comparisonList[0].model}</p>
                      </div>
                    </div>
                    <div className="h-20 flex items-center justify-center font-mono text-xl text-[var(--color-electric-yellow)]">{comparisonList[0].price.toLocaleString()} ฿</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[0].specs.screen}</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[0].specs.processor}</div>
                    <div className="h-20 flex items-center justify-center text-sm px-4">{comparisonList[0].specs.camera}</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[0].specs.battery}</div>
                  </div>

                  {/* Device 2 */}
                  <div className="space-y-12 text-center">
                    <div className="h-48 flex flex-col items-center justify-center gap-4">
                      <img src={comparisonList[1].image} className="h-32 object-contain" referrerPolicy="no-referrer" />
                        <div>
                        <p className="text-[10px] uppercase font-bold text-[var(--color-tech-blue)]">{comparisonList[1].brand}</p>
                        <p className="font-bold">{comparisonList[1].model}</p>
                      </div>
                    </div>
                    <div className="h-20 flex items-center justify-center font-mono text-xl text-[var(--color-electric-yellow)]">{comparisonList[1].price.toLocaleString()} ฿</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[1].specs.screen}</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[1].specs.processor}</div>
                    <div className="h-20 flex items-center justify-center text-sm px-4">{comparisonList[1].specs.camera}</div>
                    <div className="h-20 flex items-center justify-center text-sm">{comparisonList[1].specs.battery}</div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 flex gap-4">
                 <a 
                  href={`https://m.me/nokeyphone?text=Help me choose between ${comparisonList[0].model} and ${comparisonList[1].model}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 tech-btn-primary flex items-center justify-center gap-2 no-underline"
                >
                  Ask Expert Advice <MessageCircle size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-24 border-t border-white/5 px-4 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'မြန်ဆန်စိတ်ချရသောပို့ဆောင်ရေးစနစ်', desc: 'ထိုင်းနိုင်ငံရဲ့ အကောင်းဆုံး delivery စနစ်များဖြင့်ပို့ဆောင်ပေးခြင်း' },
            { label: 'ရောင်းလိုသောဖုန်းများအား စျေးကောင်းပေးပြီး၀ယ်ပေးခြင်း', desc: 'အရည်အသွေးကောင်းပေါမှုတည်ပီးအမြင့်ဆုံးစျေးဖြင့်ပြန်၀ယ်ပေးပါသည်။' },
            { label: 'အရည်အသွေးပြည့်၀သောစွာဖုန်းများအားစစ်ဆေးမှု', desc: 'တဘက်ရစ်ဖုန်းများအားစနစ်တကျစစ်ဆေးပီးပြန်ရောင်းထားကြောင်းအာမာခံမှု' },
            { label: '၀ယ်ယူသူစိတ်တိုင်းကျ ၀န်ဆောင်မှု', desc: 'အကောက်များဖွင့်ပေးခြင်းအရစ်ကျနှုန်းထားများအားညှိနှိင်းဆောင်ရွက်ပေးခြင်း' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-[var(--color-tech-blue)] font-mono text-xl">0{i+1}</span>
              <h4 className="font-bold uppercase italic">{stat.label}</h4>
              <p className="text-sm text-white/40">{stat.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40">
           <div className="flex items-center gap-2">
            <Package size={20} />
            <span className="font-mono font-bold text-sm tracking-tighter uppercase italic">Eeny.co,</span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest">Mobile Phone E- Menu များပြုလုပ်လိုပါက ph-0942933569 /zawyenaing.com/line-zyneagle.96 သို့ဆက်သွယ်မေးမြန်းနိုင်ပါသည်။</p>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Food Menu</a>
            <a href="#" className="hover:text-white transition-colors">Any Business POS system</a>
            <a href="#" className="hover:text-white transition-colors">Own Website</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { useState, useEffect } from 'react';

// Device တစ်ခုချင်းစီရဲ့ ပုံစံကို သတ်မှတ်ခြင်း (TypeScript interface)
interface Device {
  id?: number;
  name: string;
  price: string;
  category: string;
}

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceName, setDeviceName] = useState<string>('');
  const [devicePrice, setDevicePrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // ၁။ App စဖွင့်ချိန်တွင် Database မှ Device များအားလုံးကို ဆွဲယူခြင်း (GET)
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/menu'); // api/menu.js သို့ လှမ်းခေါ်ခြင်း
        const data = await response.json();
        if (Array.isArray(data)) {
          setDevices(data);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, []);

  // ၂။ Device အသစ်ကို Database ထဲသို့ လှမ်းသိမ်းခြင်း (POST)
  const handleAddDevice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName || !devicePrice) return;

    setLoading(true);
    const newDevice: Device = {
      name: deviceName,
      price: devicePrice,
      category: 'Mobile'
    };

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevice),
      });

      if (response.ok) {
        const result = await response.json();
        // Database ထဲ ရောက်သွားတဲ့ Device ကို မျက်နှာပြင်မှာ ချက်ချင်း ပြသခြင်း
        setDevices([result.data, ...devices]);
        setDeviceName('');
        setDevicePrice('');
        alert("Device အသစ်ကို အောင်မြင်စွာ သိမ်းဆည်းပြီးပါပြီ!");
      }
    } catch (error) {
      alert("Database သို့ သိမ်းဆည်းရာတွင် အမှားအယွင်းရှိနေပါသည်");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#2d3436' }}>Z POS - Add New Device</h1>
      
      {/* Device ထည့်သွင်းသည့် Form */}
      <form onSubmit={handleAddDevice} style={{ marginBottom: '30px', display: 'flex', gap: '10px' }}>
        <input 
          type="text"
          placeholder="Device Name (e.g. iPhone 15)"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          style={{ flex: 2, padding: '10px', borderRadius: '5px', border: '1px solid #dfe6e9' }}
          required
        />
        <input 
          type="text"
          placeholder="Price (e.g. 3,500,000)"
          value={devicePrice}
          onChange={(e) => setDevicePrice(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #dfe6e9' }}
          required
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            backgroundColor: '#00b894', 
            color: 'white', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}
        >
          {loading ? 'Saving...' : 'Add Device'}
        </button>
      </form>

      <hr style={{ border: '0.5px solid #eee' }} />

      {/* Device စာရင်းများကို ပြသသည့်နေရာ */}
      <h2 style={{ fontSize: '1.2rem', color: '#636e72' }}>Registered Devices</h2>
      <div style={{ display: 'grid', gap: '10px', marginTop: '20px' }}>
        {devices.length === 0 ? (
          <p style={{ color: '#b2bec3' }}>No devices found. Add your first device!</p>
        ) : (
          devices.map((device) => (
            <div key={device.id} style={{ 
              padding: '15px', 
              borderRadius: '8px', 
              backgroundColor: '#f9f9f9', 
              display: 'flex', 
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontWeight: 'bold' }}>{device.name}</span>
              <span style={{ color: '#0984e3' }}>{device.price} MMK</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
