"use client";

import { useState } from "react";

const products = [
  { id: 1,  name: "Luna Pendant",      category: "necklace", price: 68,  meta: "Recycled Sterling Silver",   icon: "necklace" },
  { id: 2,  name: "Tierra Ring",       category: "ring",     price: 54,  meta: "Recycled Gold Vermeil",       icon: "ring"     },
  { id: 3,  name: "Alba Choker",       category: "necklace", price: 82,  meta: "Sustainable Gold Fill",       icon: "necklace" },
  { id: 4,  name: "Brisa Band",        category: "ring",     price: 47,  meta: "Recycled Sterling Silver",    icon: "ring"     },
  { id: 5,  name: "Raíz Bracelet",     category: "bracelet", price: 61,  meta: "Mixed Recycled Metal",        icon: "bracelet" },
  { id: 6,  name: "Flor Stitch Brooch",category: "stitch",   price: 95,  meta: "Vegan Silk Thread",           icon: "stitch"   },
  { id: 7,  name: "Sol Layered Chain", category: "necklace", price: 110, meta: "Recycled Gold Plate",         icon: "necklace" },
  { id: 8,  name: "Hoja Stitch Pin",   category: "stitch",   price: 78,  meta: "Organic Thread & Gold",       icon: "stitch"   },
  { id: 9,  name: "Cielo Ring",        category: "ring",     price: 59,  meta: "Rose Gold Recycled",          icon: "ring"     },
  { id: 10, name: "Mar Anklet",        category: "bracelet", price: 44,  meta: "Recycled Sterling Silver",    icon: "bracelet" },
  { id: 11, name: "Niebla Pendant",    category: "necklace", price: 76,  meta: "Silver & Shell-Free Pearl",   icon: "necklace" },
  { id: 12, name: "Costura Brooch",    category: "stitch",   price: 89,  meta: "Vegan Embroidery Thread",     icon: "stitch"   },
];

const icons = {
  necklace: (
    <svg className="icon" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="28" r="16" stroke="#7B5B3A" strokeWidth="1.5" />
      <path d="M24 28 Q40 58 56 28" stroke="#C9A87C" strokeWidth="1.2" fill="none" />
      <line x1="40" y1="12" x2="40" y2="4" stroke="#7B5B3A" strokeWidth="1.2" />
      <circle cx="40" cy="3" r="2.5" fill="#C9A87C" />
    </svg>
  ),
  ring: (
    <svg className="icon" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="20" stroke="#7B5B3A" strokeWidth="1.5" />
      <circle cx="40" cy="40" r="13" stroke="#C9A87C" strokeWidth="1" />
      <path d="M28 22 Q40 10 52 22" stroke="#C9A87C" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  bracelet: (
    <svg className="icon" viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="40" rx="24" ry="16" stroke="#7B5B3A" strokeWidth="1.5" />
      <ellipse cx="40" cy="40" rx="18" ry="11" stroke="#C9A87C" strokeWidth="1" />
      <circle cx="64" cy="40" r="3" fill="#C9A87C" />
    </svg>
  ),
  stitch: (
    <svg className="icon" viewBox="0 0 80 80" fill="none">
      <path d="M20 60 Q40 20 60 60" stroke="#7B5B3A" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="32" r="6" stroke="#C9A87C" strokeWidth="1.2" />
      <line x1="20" y1="60" x2="14" y2="66" stroke="#7B5B3A" strokeWidth="1.2" />
      <line x1="60" y1="60" x2="66" y2="66" stroke="#7B5B3A" strokeWidth="1.2" />
      <line x1="34" y1="26" x2="28" y2="16" stroke="#C9A87C" strokeWidth="1" />
      <line x1="46" y1="26" x2="52" y2="16" stroke="#C9A87C" strokeWidth="1" />
    </svg>
  ),
};

const marqueeItems = [
  "Fine Stitching", "·", "Made in Barcelona", "·", "100% Vegan", "·",
  "Sustainably Crafted", "·", "Delicate Necklaces", "·", "Gold & Silver Rings", "·",
];

export default function Home() {
  const [cart, setCart]               = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isCartOpen, setIsCartOpen]   = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [notif, setNotif]             = useState("");
  const [cardNumber, setCardNumber]   = useState("");
  const [cardName, setCardName]       = useState("");
  const [cardExp, setCardExp]         = useState("");

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(""), 2800);
  };

  const addToCart = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    showNotif(`${product.name} added to bag`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const changeQty = (id, delta) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      const newQty = item.qty + delta;
      if (newQty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, qty: newQty } : i);
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const toggleCart = () => setIsCartOpen((v) => !v);

  const openPayment = () => {
    if (cart.length === 0) { showNotif("Your bag is empty"); return; }
    setIsCartOpen(false);
    setIsPaymentOpen(true);
    setPaymentSuccess(false);
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setPaymentSuccess(false);
    setCardNumber("");
    setCardName("");
    setCardExp("");
  };

  const resetAfterPurchase = () => {
    setCart([]);
    closePayment();
    showNotif("Order placed! Thank you ✨");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, "").substring(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const filteredProducts =
    activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Toast notification */}
      <div
        className={`fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform bg-[#3E2A14] px-8 py-3 text-sm uppercase tracking-widest text-[#FAF7F3] transition-transform duration-500 ${
          notif ? "translate-y-0" : "translate-y-20"
        }`}
      >
        {notif}
      </div>

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[rgba(193,160,110,0.25)] bg-[rgba(245,239,230,0.95)] px-6 py-4 backdrop-blur-md sm:px-12">
        <div
          className="cursor-pointer font-serif text-xl uppercase tracking-[0.18em] text-[#3E2A14]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Liru Joyas
        </div>
        <ul className="hidden gap-8 md:flex">
          <li><a href="#collections" className="text-xs uppercase tracking-[0.15em] text-[#6B4C2E] hover:text-[#3E2A14]">Collections</a></li>
          <li><a href="#values"      className="text-xs uppercase tracking-[0.15em] text-[#6B4C2E] hover:text-[#3E2A14]">Values</a></li>
          <li><a href="#about"       className="text-xs uppercase tracking-[0.15em] text-[#6B4C2E] hover:text-[#3E2A14]">Our Story</a></li>
        </ul>
        <button onClick={toggleCart} className="flex items-center gap-2 bg-[#3E2A14] px-4 py-2 text-xs uppercase tracking-[0.15em] text-[#F5EFE6]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Bag
          <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#C9A87C] text-[0.65rem] text-white">
            {cartCount}
          </span>
        </button>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#EDE0CC] to-[#E2CFAF] px-6 py-24 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(193,160,110,0.18)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(193,160,110,0.25)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(193,160,110,0.35)]" />

        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#C9A87C]">Handcrafted Fine Jewellery · Barcelona, España</p>
        <h1 className="font-serif text-5xl font-light uppercase tracking-[0.12em] text-[#3E2A14] sm:text-7xl md:text-8xl">
          Liru <em className="font-light italic text-[#7B5B3A]">Joyas</em>
        </h1>
        <p className="mx-auto mt-4 max-w-md font-serif text-lg italic text-[#6B4C2E]">
          Where each piece carries the warmth of a story and the precision of devotion.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1 border border-[rgba(59,109,17,0.3)] bg-[#EAF3DE] px-4 py-1 text-xs uppercase tracking-[0.12em] text-[#3B6D11]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            100% Vegan
          </span>
          <span className="flex items-center gap-1 border border-[rgba(59,109,17,0.3)] bg-[#EAF3DE] px-4 py-1 text-xs uppercase tracking-[0.12em] text-[#3B6D11]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
            Sustainable Materials
          </span>
          <span className="flex items-center gap-1 border border-[rgba(123,91,58,0.3)] bg-transparent px-4 py-1 text-xs uppercase tracking-[0.12em] text-[#6B4C2E]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Made in Barcelona
          </span>
        </div>

        <button
          onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 border border-[#3E2A14] bg-transparent px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#3E2A14] transition-all hover:bg-[#3E2A14] hover:text-[#F5EFE6]"
        >
          Explore Collections
        </button>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
          <div className="h-10 w-px bg-gradient-to-b from-[#C9A87C] to-transparent" style={{ animation: "scrollPulse 2s ease infinite" }} />
          <span className="text-[0.62rem] uppercase tracking-[0.2em] text-[#A08060]">Scroll</span>
        </div>
      </section>

      {/* Marquee — items duplicated for seamless loop */}
      <div className="overflow-hidden bg-[#3E2A14] py-3">
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 22s linear infinite" }}>
          {[0, 1].map((dupe) => (
            <span key={dupe} className="flex flex-shrink-0 gap-6 px-3">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className={item === "·"
                    ? "text-[#C9A87C]"
                    : "text-xs uppercase tracking-[0.3em] text-[#E8D9C5]"}
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Values */}
      <div id="values" className="flex flex-wrap justify-center bg-[#E8D9C5] py-12 md:flex-nowrap">
        {[
          { title: "100% Vegan",        text: "No animal products, ever. Every material is thoughtfully sourced and certified cruelty-free." },
          { title: "Sustainable",       text: "Recycled metals, eco-conscious packaging, and low-waste production in every piece we create." },
          { title: "Born in Barcelona", text: "Designed and handcrafted in our atelier in the heart of Barcelona with local artisanship." },
          { title: "Made with love",    text: "Every single piece is made by hand, one at a time. No factories, no shortcuts — ever." },
        ].map((value, idx) => (
          <div key={idx} className="w-full max-w-[280px] border-b border-[rgba(123,91,58,0.15)] px-6 py-8 text-center last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(123,91,58,0.25)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7B5B3A" strokeWidth="1.5" width="20" height="20">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="font-serif text-base font-normal tracking-wide text-[#3E2A14]">{value.title}</div>
            <div className="mt-1 text-xs leading-relaxed text-[#A08060]">{value.text}</div>
          </div>
        ))}
      </div>

      {/* Collections */}
      <section id="collections" className="bg-[#FAF7F3] px-6 py-16 md:px-12">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A87C]">Our Collections</p>
          <h2 className="font-serif text-3xl font-light text-[#3E2A14] md:text-4xl">
            Each piece, <em className="italic">a poem</em>
          </h2>
          <div className="mx-auto my-3 h-px w-12 bg-[#C9A87C]" />
          <p className="text-xs tracking-wide text-[#A08060]">All products are vegan · sustainably made · crafted in Barcelona</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-0">
          {["all", "necklace", "ring", "bracelet", "stitch"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`border border-[#E8D9C5] px-5 py-2 text-xs uppercase tracking-[0.15em] transition-all ${
                activeFilter === filter ? "bg-[#3E2A14] text-[#FAF7F3]" : "bg-transparent text-[#6B4C2E]"
              }`}
            >
              {filter === "all" ? "All" : filter === "stitch" ? "Fine Stitching" : filter + "s"}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer overflow-hidden bg-[#F5EFE6] transition-transform hover:-translate-y-1">
              <div className="relative aspect-[3/4] bg-[#E8D9C5]">
                <div className="flex h-full items-center justify-center opacity-35">{icons[product.icon]}</div>
                <div className="absolute left-2 top-2 flex flex-col gap-1">
                  <span className="bg-[#EAF3DE] px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-[#3B6D11]">Vegan</span>
                  <span className="bg-[#EAF3DE] px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-[#3B6D11]">Sustainable</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(62,42,20,0.08)] opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => addToCart(product.id)}
                    className="translate-y-2 transform bg-[#3E2A14] px-5 py-2 text-xs uppercase tracking-[0.15em] text-[#FAF7F3] transition-transform group-hover:translate-y-0"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="font-serif text-lg font-normal text-[#3E2A14]">{product.name}</div>
                <div className="text-xs uppercase tracking-wide text-[#A08060]">{product.meta}</div>
                <div className="mt-1 font-medium text-[#7B5B3A]">€{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="flex flex-col gap-12 px-6 py-16 md:flex-row md:px-12">
        <div className="relative flex aspect-[3/4] max-w-md items-center justify-center bg-[#E8D9C5]">
          <div className="absolute inset-[-15px] border border-[rgba(193,160,110,0.3)]" />
          <svg viewBox="0 0 120 160" width="90" height="120" fill="none">
            <circle cx="60" cy="50" r="22" stroke="#7B5B3A" strokeWidth="1.2" />
            <path d="M38 50 Q60 95 82 50" stroke="#7B5B3A" strokeWidth="1.2" fill="none" />
            <circle cx="60" cy="50" r="8" stroke="#C9A87C" strokeWidth="1" />
            <line x1="60" y1="28" x2="60" y2="10" stroke="#7B5B3A" strokeWidth="1" />
            <circle cx="60" cy="8" r="3" fill="#C9A87C" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C9A87C]">Our Story</p>
          <h2 className="font-serif text-3xl font-light text-[#3E2A14] md:text-4xl">
            Born from <em className="italic">love</em> of craft
          </h2>
          <div className="mt-4 flex items-center gap-2 border border-[rgba(123,91,58,0.2)] bg-[rgba(62,42,20,0.06)] px-4 py-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="2" width="12" height="12">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs uppercase tracking-[0.15em] text-[#6B4C2E]">Barcelona, Catalonia · España</span>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-[#6B4C2E]">
            Liru Joyas was born in Barcelona from a quiet obsession: creating jewellery that feels intimate, personal, and timeless. From our
            small atelier in the heart of the city, every ring, every necklace, every delicate stitch is shaped by hand — with patience and care.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[#6B4C2E]">
            We believe that beauty and responsibility go hand in hand. That is why every single piece we create is 100% vegan and made from
            sustainable, ethically sourced materials — because the earth deserves the same tenderness we put into our craft.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { label: "Vegan certified",      desc: "No leather, silk, or animal-derived materials. Ever." },
              { label: "Sustainably sourced",  desc: "Recycled metals and biodegradable packaging throughout." },
              { label: "Local artisanship",    desc: "Handmade in Barcelona, supporting local talent and craft." },
              { label: "Zero waste ambition",  desc: "Offcuts are repurposed. Nothing is wasted in our atelier." },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#E8D9C5] p-4">
                <div className="text-[0.68rem] uppercase tracking-[0.12em] text-[#C9A87C]">{item.label}</div>
                <div className="text-xs leading-relaxed text-[#6B4C2E]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3E2A14] px-6 py-12 text-[#E8D9C5] md:px-12">
        <div className="grid gap-8 md:grid-cols-[1.5fr,1fr,1fr]">
          <div>
            <div className="font-serif text-2xl uppercase tracking-[0.15em]">Liru Joyas</div>
            <p className="mt-2 text-sm font-light leading-relaxed opacity-60">
              Handcrafted fine jewellery from Barcelona. Each piece made with intention, worn with love — always vegan, always sustainable.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.12em] opacity-65">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="11" height="11">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Barcelona, Catalonia · España
            </div>
            <div className="mt-3 flex gap-2">
              <span className="border border-[rgba(193,160,110,0.3)] px-3 py-1 text-[0.62rem] uppercase tracking-wide text-[#C9A87C]">Vegan</span>
              <span className="border border-[rgba(193,160,110,0.3)] px-3 py-1 text-[0.62rem] uppercase tracking-wide text-[#C9A87C]">Sustainable</span>
              <span className="border border-[rgba(193,160,110,0.3)] px-3 py-1 text-[0.62rem] uppercase tracking-wide text-[#C9A87C]">Handmade</span>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Shop</h4>
            <div className="mt-3 space-y-1 text-sm font-light opacity-60">
              <a href="#collections" className="block hover:opacity-100">Necklaces</a>
              <a href="#collections" className="block hover:opacity-100">Rings</a>
              <a href="#collections" className="block hover:opacity-100">Bracelets</a>
              <a href="#collections" className="block hover:opacity-100">Fine Stitching</a>
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Care & Info</h4>
            <div className="mt-3 space-y-1 text-sm font-light opacity-60">
              <a href="#" className="block hover:opacity-100">Jewellery Care</a>
              <a href="#" className="block hover:opacity-100">Sizing Guide</a>
              <a href="#values" className="block hover:opacity-100">Sustainability</a>
              <a href="#" className="block hover:opacity-100">Returns</a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs font-light opacity-45 md:flex-row">
          <span>© 2025 Liru Joyas · All rights reserved</span>
          <span>Vegan · Sustainable · Barcelona</span>
        </div>
      </footer>

      {/* Cart drawer backdrop */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isCartOpen ? "pointer-events-auto bg-black/35" : "pointer-events-none bg-black/0"
        }`}
        onClick={toggleCart}
      />

      {/* Cart drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[#FAF7F3] shadow-xl transition-transform duration-500 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E8D9C5] px-6 py-5">
          <h3 className="font-serif text-xl font-light tracking-wide text-[#3E2A14]">Your Bag</h3>
          <button onClick={toggleCart} className="text-xl text-[#A08060]">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <p className="py-12 text-center font-serif italic text-[#A08060]">
              Your bag is empty.<br />Discover something beautiful.
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-[#E8D9C5] py-4">
                <div className="flex h-[90px] w-[70px] shrink-0 items-center justify-center bg-[#E8D9C5]">
                  <div className="opacity-40">{icons[item.icon]}</div>
                </div>
                <div className="flex-1">
                  <div className="font-serif text-base text-[#3E2A14]">{item.name}</div>
                  <div className="font-medium text-[#7B5B3A]">€{(item.price * item.qty).toFixed(2)}</div>
                  <div className="mt-2 flex items-center gap-3">
                    <button onClick={() => changeQty(item.id, -1)} className="h-6 w-6 border border-[#E8D9C5] text-[#6B4C2E] hover:bg-[#E8D9C5]">−</button>
                    <span className="text-sm">{item.qty}</span>
                    <button onClick={() => changeQty(item.id, 1)}  className="h-6 w-6 border border-[#E8D9C5] text-[#6B4C2E] hover:bg-[#E8D9C5]">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-[0.7rem] uppercase tracking-wide text-[#A08060]">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-[#E8D9C5] px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.15em] text-[#A08060]">Total</span>
            <strong className="font-serif text-2xl font-light text-[#3E2A14]">€{cartTotal.toFixed(2)}</strong>
          </div>
          <button onClick={openPayment} className="w-full bg-[#3E2A14] py-3 text-xs uppercase tracking-[0.2em] text-[#FAF7F3] hover:bg-[#7B5B3A]">
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Payment modal */}
      {isPaymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto bg-[#FAF7F3] p-8">
            <button onClick={closePayment} className="absolute right-5 top-4 text-xl text-[#A08060]">✕</button>

            {!paymentSuccess ? (
              <>
                <h2 className="font-serif text-3xl font-light text-[#3E2A14]">Secure Checkout</h2>
                <p className="mb-4 text-xs tracking-wide text-[#A08060]">Liru Joyas · Barcelona</p>

                {/* Card preview */}
                <div className="mb-6 rounded-lg bg-gradient-to-br from-[#3E2A14] to-[#7B5B3A] p-4 text-[#FAF7F3]">
                  <div className="mb-3 font-mono text-sm tracking-widest opacity-90">
                    {formatCardNumber(cardNumber) || "•••• •••• •••• ••••"}
                  </div>
                  <div className="flex justify-between text-xs tracking-wider opacity-75">
                    <span>{cardName.toUpperCase() || "CARDHOLDER NAME"}</span>
                    <span>{cardExp || "MM / YY"}</span>
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-4">
                  <p className="mb-2 border-b border-[#E8D9C5] pb-1 text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Contact</p>
                  <input type="email" placeholder="you@example.com"
                    className="w-full border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none focus:border-[#7B5B3A]" />
                </div>

                {/* Shipping */}
                <div className="mb-4">
                  <p className="mb-2 border-b border-[#E8D9C5] pb-1 text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Shipping Address</p>
                  <div className="mb-2 flex gap-3">
                    <input type="text" placeholder="First Name" className="flex-1 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                    <input type="text" placeholder="Last Name"  className="flex-1 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                  </div>
                  <input type="text" placeholder="Street Address" className="mb-2 w-full border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="City"        className="flex-1 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                    <input type="text" placeholder="Postal Code" className="w-24 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                  </div>
                </div>

                {/* Payment fields */}
                <div className="mb-4">
                  <p className="mb-2 border-b border-[#E8D9C5] pb-1 text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Payment</p>
                  <input
                    type="text"
                    placeholder="Card Number"
                    maxLength={19}
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
                    className="mb-2 w-full border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none"
                  />
                  <div className="mb-2 flex gap-3">
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="flex-1 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none"
                    />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-20 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none"
                    />
                    <input type="text" placeholder="CVV" maxLength={3}
                      className="w-16 border border-[#E8D9C5] bg-[#F5EFE6] px-3 py-2 text-sm outline-none" />
                  </div>
                </div>

                {/* Order summary */}
                <div className="mb-4">
                  <p className="mb-2 border-b border-[#E8D9C5] pb-1 text-xs uppercase tracking-[0.2em] text-[#C9A87C]">Order Summary</p>
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between py-1 text-sm text-[#6B4C2E]">
                      <span>{item.name} × {item.qty}</span>
                      <span>€{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-[#E8D9C5] pt-2 font-medium text-[#3E2A14]">
                    <span>Total</span>
                    <span>€{cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button onClick={() => setPaymentSuccess(true)}
                  className="mt-2 w-full bg-[#3E2A14] py-3 text-xs uppercase tracking-[0.2em] text-[#FAF7F3] hover:bg-[#7B5B3A]">
                  Complete Purchase
                </button>
                <p className="mt-3 text-center text-xs tracking-wide text-[#A08060]">🔒 Encrypted & Secure · SSL Protected</p>
              </>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A87C]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A87C" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="font-serif text-3xl font-light text-[#3E2A14]">Thank you</h2>
                <p className="mb-4 font-serif italic text-[#A08060]">Your order has been placed beautifully.</p>
                <p className="text-xs leading-relaxed tracking-wide text-[#A08060]">
                  A confirmation has been sent to your inbox.<br />
                  Your vegan, sustainable jewellery will arrive<br />
                  in 3–5 business days, wrapped with care from Barcelona.
                </p>
                <button onClick={resetAfterPurchase}
                  className="mt-6 w-full bg-[#3E2A14] py-3 text-xs uppercase tracking-[0.2em] text-[#FAF7F3]">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}