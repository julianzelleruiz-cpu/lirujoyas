"use client";

import { useState, useEffect } from "react";

const products = [
  { id: 1,  name: "Luna Pendant",       category: "necklace", price: 68,  meta: "Recycled Sterling Silver",   icon: "necklace" },
  { id: 2,  name: "Tierra Ring",        category: "ring",     price: 54,  meta: "Recycled Gold Vermeil",       icon: "ring"     },
  { id: 3,  name: "Alba Choker",        category: "necklace", price: 82,  meta: "Sustainable Gold Fill",       icon: "necklace" },
  { id: 4,  name: "Brisa Band",         category: "ring",     price: 47,  meta: "Recycled Sterling Silver",    icon: "ring"     },
  { id: 5,  name: "Raíz Bracelet",      category: "bracelet", price: 61,  meta: "Mixed Recycled Metal",        icon: "bracelet" },
  { id: 6,  name: "Flor Stitch Brooch", category: "stitch",   price: 95,  meta: "Vegan Silk Thread",           icon: "stitch"   },
  { id: 7,  name: "Sol Layered Chain",  category: "necklace", price: 110, meta: "Recycled Gold Plate",         icon: "necklace" },
  { id: 8,  name: "Hoja Stitch Pin",    category: "stitch",   price: 78,  meta: "Organic Thread & Gold",       icon: "stitch"   },
  { id: 9,  name: "Cielo Ring",         category: "ring",     price: 59,  meta: "Rose Gold Recycled",          icon: "ring"     },
  { id: 10, name: "Mar Anklet",         category: "bracelet", price: 44,  meta: "Recycled Sterling Silver",    icon: "bracelet" },
  { id: 11, name: "Niebla Pendant",     category: "necklace", price: 76,  meta: "Silver & Shell-Free Pearl",   icon: "necklace" },
  { id: 12, name: "Costura Brooch",     category: "stitch",   price: 89,  meta: "Vegan Embroidery Thread",     icon: "stitch"   },
];

const icons = {
  necklace: (
    <svg viewBox="0 0 120 140" fill="none" width="90" height="105">
      <circle cx="60" cy="42" r="24" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <path d="M36 42 Q60 88 84 42" stroke="currentColor" strokeWidth="0.9" fill="none"/>
      <circle cx="60" cy="42" r="10" stroke="currentColor" strokeWidth="0.7" opacity="0.7"/>
      <line x1="60" y1="18" x2="60" y2="6" stroke="currentColor" strokeWidth="0.8"/>
      <circle cx="60" cy="4" r="3.5" fill="currentColor" opacity="0.6"/>
      <path d="M36 42 Q24 68 30 88" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <path d="M84 42 Q96 68 90 88" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3"/>
    </svg>
  ),
  ring: (
    <svg viewBox="0 0 120 120" fill="none" width="90" height="90">
      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="0.7" opacity="0.7"/>
      <path d="M40 30 Q60 14 80 30" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <circle cx="60" cy="21" r="4" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
      <path d="M56 21 L52 17 M64 21 L68 17" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
    </svg>
  ),
  bracelet: (
    <svg viewBox="0 0 140 100" fill="none" width="105" height="75">
      <ellipse cx="70" cy="50" rx="38" ry="24" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <ellipse cx="70" cy="50" rx="28" ry="16" stroke="currentColor" strokeWidth="0.7" opacity="0.7"/>
      <circle cx="108" cy="50" r="4.5" fill="currentColor" opacity="0.5"/>
      <circle cx="32" cy="50" r="3" stroke="currentColor" strokeWidth="0.6" opacity="0.4"/>
      <path d="M70 26 Q90 18 108 30" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  ),
  stitch: (
    <svg viewBox="0 0 120 130" fill="none" width="90" height="97">
      <path d="M20 100 Q60 28 100 100" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5"/>
      <circle cx="60" cy="48" r="9" stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>
      <line x1="20" y1="100" x2="12" y2="112" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="100" y1="100" x2="108" y2="112" stroke="currentColor" strokeWidth="0.8"/>
      <line x1="51" y1="42" x2="44" y2="28" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
      <line x1="69" y1="42" x2="76" y2="28" stroke="currentColor" strokeWidth="0.7" opacity="0.5"/>
      <path d="M44 28 Q60 20 76 28" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
    </svg>
  ),
};

const marqueeItems = [
  "Fine Stitching", "—", "Hecho en Barcelona", "—", "100% Vegano", "—",
  "Materiales Reciclados", "—", "Joyas Delicadas", "—", "Oro & Plata", "—",
  "Artesanía Local", "—", "Desde 2019", "—",
];

export default function Home() {
  const [cart, setCart]                     = useState([]);
  const [activeFilter, setActiveFilter]     = useState("all");
  const [isCartOpen, setIsCartOpen]         = useState(false);
  const [isPaymentOpen, setIsPaymentOpen]   = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [notif, setNotif]                   = useState("");
  const [cardNumber, setCardNumber]         = useState("");
  const [cardName, setCardName]             = useState("");
  const [cardExp, setCardExp]               = useState("");
  const [heroVisible, setHeroVisible]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

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
    showNotif(`${product.name} añadido`);
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
    if (cart.length === 0) { showNotif("Tu bolsa está vacía"); return; }
    setIsCartOpen(false);
    setIsPaymentOpen(true);
    setPaymentSuccess(false);
  };

  const closePayment = () => {
    setIsPaymentOpen(false);
    setPaymentSuccess(false);
    setCardNumber(""); setCardName(""); setCardExp("");
  };

  const resetAfterPurchase = () => {
    setCart([]);
    closePayment();
    showNotif("Pedido confirmado · Gracias ✦");
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, "").substring(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const filteredProducts =
    activeFilter === "all" ? products : products.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── TOAST ── */}
      <div className={`lj-toast ${notif ? "lj-toast--visible" : ""}`}>
        <span className="lj-toast__dot">✦</span> {notif}
      </div>

      {/* ── NAV ── */}
      <nav className="lj-nav">
        <div className="lj-nav__left">
          <a href="#collections" className="lj-nav__link">Colección</a>
          <a href="#values"      className="lj-nav__link">Valores</a>
          <a href="#about"       className="lj-nav__link">Historia</a>
        </div>
        <div
          className="lj-nav__logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Liru Joyas
        </div>
        <div className="lj-nav__right">
          <button onClick={toggleCart} className="lj-nav__bag">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <span className="lj-nav__bag-label">Bolsa</span>
            {cartCount > 0 && <span className="lj-nav__bag-count">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lj-hero">
        <div className="lj-hero__grain" />
        <div className="lj-hero__bg-ring lj-hero__bg-ring--1" />
        <div className="lj-hero__bg-ring lj-hero__bg-ring--2" />
        <div className="lj-hero__bg-ring lj-hero__bg-ring--3" />

        <div className={`lj-hero__content ${heroVisible ? "lj-hero__content--visible" : ""}`}>
          <p className="lj-eyebrow">Barcelona, España · Desde 2019</p>

          <h1 className="lj-hero__title">
            <em className="lj-hero__title-em">Liru</em>
            <span className="lj-hero__title-main">Joyas</span>
          </h1>

          <div className="lj-hero__divider">
            <span />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
            </svg>
            <span />
          </div>

          <p className="lj-hero__subtitle">
            Joyería artesanal que lleva el calor de una historia<br />y la precisión de la devoción.
          </p>

          <div className="lj-hero__badges">
            <span className="lj-badge lj-badge--eco">✦ 100% Vegano</span>
            <span className="lj-badge lj-badge--eco">✦ Sostenible</span>
            <span className="lj-badge lj-badge--place">✦ Hecho en Barcelona</span>
          </div>

          <button
            className="lj-btn lj-btn--outline-light lj-hero__cta"
            onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explorar la Colección
          </button>
        </div>

        <div className="lj-hero__scroll">
          <div className="lj-hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="lj-marquee">
        <div className="lj-marquee__track">
          {[0, 1].map((d) => (
            <span key={d} className="lj-marquee__set">
              {marqueeItems.map((item, i) => (
                <span key={i} className={item === "—" ? "lj-marquee__sep" : "lj-marquee__item"}>
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── VALUES ── */}
      <div id="values" className="lj-values">
        {[
          { symbol: "I",   title: "100% Vegano",       text: "Sin productos de origen animal, jamás. Cada material está certificado como cruelty-free." },
          { symbol: "II",  title: "Sostenible",         text: "Metales reciclados, packaging ecológico y producción de bajo residuo en cada pieza." },
          { symbol: "III", title: "Nacida en Barcelona", text: "Diseñada y fabricada a mano en nuestro atelier en el corazón de la ciudad." },
          { symbol: "IV",  title: "Con amor",           text: "Cada pieza es única, hecha a mano. Sin fábricas, sin atajos — nunca." },
        ].map((v, i) => (
          <div key={i} className="lj-values__item">
            <span className="lj-values__numeral">{v.symbol}</span>
            <div className="lj-values__title">{v.title}</div>
            <div className="lj-values__text">{v.text}</div>
          </div>
        ))}
      </div>

      {/* ── COLLECTIONS ── */}
      <section id="collections" className="lj-collections">
        <div className="lj-collections__header">
          <p className="lj-eyebrow lj-eyebrow--dark">Nuestra Colección</p>
          <h2 className="lj-section-title">
            Cada pieza, <em>un poema</em>
          </h2>
          <div className="lj-rule" />
          <p className="lj-section-sub">Todo vegano · Materiales sostenibles · Fabricado en Barcelona</p>
        </div>

        {/* Filters */}
        <div className="lj-filters">
          {["all", "necklace", "ring", "bracelet", "stitch"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`lj-filter-btn ${activeFilter === f ? "lj-filter-btn--active" : ""}`}
            >
              {f === "all" ? "Todo" : f === "necklace" ? "Collares" : f === "ring" ? "Anillos" : f === "bracelet" ? "Pulseras" : "Bordado"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="lj-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="lj-card">
              <div className="lj-card__image">
                <div className="lj-card__icon" style={{ color: "#B8966E" }}>
                  {icons[product.icon]}
                </div>
                <div className="lj-card__tags">
                  <span className="lj-card__tag">Vegano</span>
                  <span className="lj-card__tag">Eco</span>
                </div>
                <div className="lj-card__overlay">
                  <button
                    className="lj-card__add"
                    onClick={() => addToCart(product.id)}
                  >
                    Añadir a la bolsa
                  </button>
                </div>
              </div>
              <div className="lj-card__body">
                <div className="lj-card__name">{product.name}</div>
                <div className="lj-card__meta">{product.meta}</div>
                <div className="lj-card__price">€{product.price}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="lj-about">
        <div className="lj-about__grain" />
        <div className="lj-about__inner">
          <div className="lj-about__visual">
            <div className="lj-about__frame-outer" />
            <div className="lj-about__frame-inner">
              <svg viewBox="0 0 160 200" width="120" height="150" fill="none" style={{ color: "#B8966E" }}>
                <circle cx="80" cy="70" r="32" stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
                <path d="M48 70 Q80 128 112 70" stroke="currentColor" strokeWidth="1" fill="none"/>
                <circle cx="80" cy="70" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.8"/>
                <line x1="80" y1="38" x2="80" y2="14" stroke="currentColor" strokeWidth="0.9"/>
                <circle cx="80" cy="11" r="4" fill="currentColor" opacity="0.7"/>
                <path d="M48 70 Q30 110 40 145" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3"/>
                <path d="M112 70 Q130 110 120 145" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3"/>
              </svg>
            </div>
          </div>

          <div className="lj-about__text">
            <p className="lj-eyebrow">Nuestra Historia</p>
            <h2 className="lj-section-title lj-section-title--light">
              Nacida del <em>amor</em><br />al oficio
            </h2>
            <div className="lj-about__location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="12" height="12">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Barcelona, Cataluña · España
            </div>
            <p className="lj-about__para">
              Liru Joyas nació en Barcelona de una obsesión silenciosa: crear joyería que se siente íntima, personal y atemporal. Desde nuestro pequeño atelier en el corazón de la ciudad, cada anillo, cada collar, cada delicado bordado se forma a mano — con paciencia y cuidado.
            </p>
            <p className="lj-about__para">
              Creemos que la belleza y la responsabilidad van de la mano. Por eso cada pieza es 100% vegana y está hecha con materiales sostenibles éticamente obtenidos.
            </p>
            <div className="lj-about__pillars">
              {[
                { label: "Certificado vegano",   desc: "Sin cuero, seda ni materiales de origen animal." },
                { label: "Materiales reciclados", desc: "Metales reciclados y packaging biodegradable." },
                { label: "Artesanía local",       desc: "Hecho en Barcelona, apoyando el talento local." },
                { label: "Cero residuos",         desc: "Los recortes se reutilizan. Nada se desperdicia." },
              ].map((p, i) => (
                <div key={i} className="lj-pillar">
                  <div className="lj-pillar__label">{p.label}</div>
                  <div className="lj-pillar__desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lj-footer">
        <div className="lj-footer__grain" />
        <div className="lj-footer__inner">
          <div className="lj-footer__brand">
            <div className="lj-footer__logo">Liru Joyas</div>
            <p className="lj-footer__tagline">
              Joyería artesanal desde Barcelona. Cada pieza hecha con intención, llevada con amor — siempre vegana, siempre sostenible.
            </p>
            <div className="lj-footer__location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="11" height="11">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Barcelona, Cataluña · España
            </div>
            <div className="lj-footer__badges">
              <span>Vegano</span>
              <span>Sostenible</span>
              <span>Artesanal</span>
            </div>
          </div>

          <div className="lj-footer__col">
            <h4 className="lj-footer__col-title">Tienda</h4>
            <a href="#collections">Collares</a>
            <a href="#collections">Anillos</a>
            <a href="#collections">Pulseras</a>
            <a href="#collections">Bordado Fino</a>
          </div>

          <div className="lj-footer__col">
            <h4 className="lj-footer__col-title">Información</h4>
            <a href="#">Cuidado de joyas</a>
            <a href="#">Guía de tallas</a>
            <a href="#values">Sostenibilidad</a>
            <a href="#">Devoluciones</a>
          </div>
        </div>

        <div className="lj-footer__bottom">
          <span>© 2025 Liru Joyas · Todos los derechos reservados</span>
          <span>Vegano · Sostenible · Barcelona</span>
        </div>
      </footer>

      {/* ── CART BACKDROP ── */}
      <div
        className={`lj-backdrop ${isCartOpen ? "lj-backdrop--visible" : ""}`}
        onClick={toggleCart}
      />

      {/* ── CART DRAWER ── */}
      <div className={`lj-cart ${isCartOpen ? "lj-cart--open" : ""}`}>
        <div className="lj-cart__head">
          <h3 className="lj-cart__title">Tu Bolsa</h3>
          <button onClick={toggleCart} className="lj-cart__close">✕</button>
        </div>

        <div className="lj-cart__body">
          {cart.length === 0 ? (
            <p className="lj-cart__empty">
              Tu bolsa está vacía.<br />
              <em>Descubre algo bello.</em>
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="lj-cart__item">
                <div className="lj-cart__item-thumb" style={{ color: "#B8966E" }}>
                  {icons[item.icon]}
                </div>
                <div className="lj-cart__item-info">
                  <div className="lj-cart__item-name">{item.name}</div>
                  <div className="lj-cart__item-price">€{(item.price * item.qty).toFixed(2)}</div>
                  <div className="lj-cart__item-controls">
                    <button onClick={() => changeQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => changeQty(item.id,  1)}>+</button>
                    <button onClick={() => removeFromCart(item.id)} className="lj-cart__item-remove">Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lj-cart__foot">
          <div className="lj-cart__total">
            <span>Total</span>
            <strong>€{cartTotal.toFixed(2)}</strong>
          </div>
          <button onClick={openPayment} className="lj-btn lj-btn--primary lj-btn--full">
            Pasar por caja
          </button>
        </div>
      </div>

      {/* ── PAYMENT MODAL ── */}
      {isPaymentOpen && (
        <div className="lj-modal-bg">
          <div className="lj-modal">
            <button onClick={closePayment} className="lj-modal__close">✕</button>

            {!paymentSuccess ? (
              <>
                <div className="lj-modal__head">
                  <h2 className="lj-modal__title">Pago seguro</h2>
                  <p className="lj-modal__sub">Liru Joyas · Barcelona</p>
                </div>

                {/* Card preview */}
                <div className="lj-card-preview">
                  <div className="lj-card-preview__chip" />
                  <div className="lj-card-preview__number">
                    {formatCardNumber(cardNumber) || "•••• •••• •••• ••••"}
                  </div>
                  <div className="lj-card-preview__meta">
                    <span>{cardName.toUpperCase() || "NOMBRE"}</span>
                    <span>{cardExp || "MM/AA"}</span>
                  </div>
                </div>

                {/* Contact */}
                <div className="lj-form-section">
                  <p className="lj-form-section__title">Contacto</p>
                  <input type="email" placeholder="tu@email.com" className="lj-input" />
                </div>

                {/* Shipping */}
                <div className="lj-form-section">
                  <p className="lj-form-section__title">Dirección de envío</p>
                  <div className="lj-input-row">
                    <input type="text" placeholder="Nombre"    className="lj-input" />
                    <input type="text" placeholder="Apellidos" className="lj-input" />
                  </div>
                  <input type="text" placeholder="Dirección" className="lj-input lj-input--mb" />
                  <div className="lj-input-row">
                    <input type="text" placeholder="Ciudad"        className="lj-input" />
                    <input type="text" placeholder="Código postal" className="lj-input lj-input--sm" />
                  </div>
                </div>

                {/* Payment */}
                <div className="lj-form-section">
                  <p className="lj-form-section__title">Pago</p>
                  <input
                    type="text" placeholder="Número de tarjeta" maxLength={19}
                    value={formatCardNumber(cardNumber)}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
                    className="lj-input lj-input--mb"
                  />
                  <div className="lj-input-row">
                    <input
                      type="text" placeholder="Titular" value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="lj-input"
                    />
                    <input
                      type="text" placeholder="MM/AA" maxLength={5} value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="lj-input lj-input--xs"
                    />
                    <input type="text" placeholder="CVV" maxLength={3} className="lj-input lj-input--xs" />
                  </div>
                </div>

                {/* Summary */}
                <div className="lj-form-section">
                  <p className="lj-form-section__title">Resumen</p>
                  {cart.map((item) => (
                    <div key={item.id} className="lj-order-row">
                      <span>{item.name} × {item.qty}</span>
                      <span>€{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="lj-order-total">
                    <span>Total</span>
                    <strong>€{cartTotal.toFixed(2)}</strong>
                  </div>
                </div>

                <button onClick={() => setPaymentSuccess(true)} className="lj-btn lj-btn--primary lj-btn--full">
                  Confirmar pedido
                </button>
                <p className="lj-modal__secure">🔒 Cifrado SSL · Pago seguro</p>
              </>
            ) : (
              <div className="lj-success">
                <div className="lj-success__icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 className="lj-success__title">Gracias</h2>
                <p className="lj-success__sub">Tu pedido ha sido confirmado.</p>
                <p className="lj-success__text">
                  Recibirás un email de confirmación.<br />
                  Tu joyería vegana y sostenible llegará<br />
                  en 3–5 días hábiles, envuelta con cariño desde Barcelona.
                </p>
                <button onClick={resetAfterPurchase} className="lj-btn lj-btn--primary lj-btn--full">
                  Seguir comprando
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── GLOBAL STYLES ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --c-bg:        #F8F3EA;
          --c-bg-warm:   #EFE5D2;
          --c-bg-deep:   #E8DBCA;
          --c-dark:      #18100A;
          --c-dark-2:    #2A1B10;
          --c-brown:     #5C3A1E;
          --c-brown-2:   #7A5030;
          --c-gold:      #B8966E;
          --c-gold-lt:   #D4B896;
          --c-muted:     #9A7D5E;
          --c-cream:     #F8F3EA;
          --c-text:      #1A0F08;
          --border:      rgba(184,150,110,0.22);
          --ff-display:  'Cormorant Garamond', Georgia, serif;
          --ff-label:    'Cinzel', serif;
          --ff-body:     'EB Garamond', Georgia, serif;
          --nav-h:       68px;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--c-bg);
          color: var(--c-text);
          font-family: var(--ff-body);
          font-size: 16px;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }

        /* ── TOAST ── */
        .lj-toast {
          position: fixed;
          bottom: 36px;
          left: 50%;
          z-index: 9999;
          transform: translateX(-50%) translateY(60px);
          background: var(--c-dark);
          color: var(--c-cream);
          padding: 12px 28px;
          font-family: var(--ff-label);
          font-size: 0.65rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          opacity: 0;
          transition: transform 0.45s cubic-bezier(.22,1,.36,1), opacity 0.45s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }
        .lj-toast--visible {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        .lj-toast__dot { color: var(--c-gold); font-size: 0.7rem; }

        /* ── NAV ── */
        .lj-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          height: var(--nav-h);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          background: rgba(248,243,234,0.92);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--border);
        }
        .lj-nav__left, .lj-nav__right {
          display: flex;
          align-items: center;
          gap: 32px;
          min-width: 200px;
        }
        .lj-nav__right { justify-content: flex-end; }
        .lj-nav__link {
          font-family: var(--ff-label);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-brown);
          text-decoration: none;
          transition: color 0.2s;
        }
        .lj-nav__link:hover { color: var(--c-dark); }
        .lj-nav__logo {
          font-family: var(--ff-display);
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-dark);
          cursor: pointer;
          white-space: nowrap;
        }
        .lj-nav__bag {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--c-dark);
          color: var(--c-cream);
          border: none;
          padding: 9px 18px;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s;
          position: relative;
        }
        .lj-nav__bag:hover { background: var(--c-brown); }
        .lj-nav__bag-count {
          position: absolute;
          top: -7px; right: -7px;
          width: 18px; height: 18px;
          background: var(--c-gold);
          color: white;
          border-radius: 50%;
          font-size: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--ff-label);
        }

        /* ── HERO ── */
        .lj-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(165deg, #1A0F08 0%, #2C1A0E 40%, #3D2410 70%, #261508 100%);
          overflow: hidden;
          padding: calc(var(--nav-h) + 40px) 24px 80px;
          text-align: center;
        }
        .lj-hero__grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.55;
          pointer-events: none;
        }
        .lj-hero__bg-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(184,150,110,0.12);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .lj-hero__bg-ring--1 { width: 700px; height: 700px; }
        .lj-hero__bg-ring--2 { width: 480px; height: 480px; border-color: rgba(184,150,110,0.18); }
        .lj-hero__bg-ring--3 { width: 260px; height: 260px; border-color: rgba(184,150,110,0.25); }

        .lj-hero__content {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .lj-hero__content--visible {
          opacity: 1;
          transform: translateY(0);
        }

        .lj-hero__title {
          display: flex;
          flex-direction: column;
          align-items: center;
          line-height: 1;
          margin: 16px 0 0;
        }
        .lj-hero__title-em {
          font-family: var(--ff-display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(5rem, 14vw, 10rem);
          color: var(--c-gold-lt);
          letter-spacing: 0.06em;
          line-height: 0.9;
        }
        .lj-hero__title-main {
          font-family: var(--ff-label);
          font-weight: 400;
          font-size: clamp(1.4rem, 4vw, 2.8rem);
          color: rgba(248,243,234,0.55);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .lj-hero__divider {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 28px auto;
          color: var(--c-gold);
          width: 200px;
        }
        .lj-hero__divider span {
          flex: 1;
          height: 1px;
          background: var(--c-gold);
          opacity: 0.4;
        }

        .lj-hero__subtitle {
          font-family: var(--ff-display);
          font-style: italic;
          font-weight: 300;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(248,243,234,0.65);
          letter-spacing: 0.02em;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .lj-hero__badges {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 28px 0;
        }
        .lj-badge {
          padding: 6px 16px;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .lj-badge--eco {
          background: rgba(58,100,22,0.25);
          color: #90C060;
          border: 1px solid rgba(90,150,30,0.3);
        }
        .lj-badge--place {
          background: rgba(184,150,110,0.12);
          color: var(--c-gold-lt);
          border: 1px solid rgba(184,150,110,0.3);
        }

        .lj-hero__cta {
          margin-top: 8px;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .lj-hero__scroll {
          position: absolute;
          bottom: 32px; left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(248,243,234,0.3);
          font-family: var(--ff-label);
          font-size: 0.55rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }
        .lj-hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--c-gold), transparent);
          animation: scrollPulse 2s ease infinite;
        }

        /* ── MARQUEE ── */
        .lj-marquee {
          background: var(--c-dark);
          padding: 14px 0;
          overflow: hidden;
          border-top: 1px solid rgba(184,150,110,0.15);
          border-bottom: 1px solid rgba(184,150,110,0.15);
        }
        .lj-marquee__track {
          display: flex;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
        }
        .lj-marquee__set {
          display: flex;
          flex-shrink: 0;
          gap: 28px;
          padding: 0 14px;
        }
        .lj-marquee__item {
          font-family: var(--ff-label);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(248,243,234,0.6);
        }
        .lj-marquee__sep { color: var(--c-gold); font-size: 0.8rem; }

        /* ── VALUES ── */
        .lj-values {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: var(--c-bg-warm);
          border-bottom: 1px solid var(--border);
        }
        @media (max-width: 900px) {
          .lj-values { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .lj-values { grid-template-columns: 1fr; }
        }
        .lj-values__item {
          padding: 44px 32px;
          text-align: center;
          border-right: 1px solid var(--border);
          position: relative;
        }
        .lj-values__item:last-child { border-right: none; }
        .lj-values__numeral {
          display: block;
          font-family: var(--ff-display);
          font-style: italic;
          font-size: 1.5rem;
          color: var(--c-gold);
          opacity: 0.6;
          margin-bottom: 12px;
        }
        .lj-values__title {
          font-family: var(--ff-display);
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--c-dark);
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }
        .lj-values__text {
          font-family: var(--ff-body);
          font-size: 0.85rem;
          color: var(--c-muted);
          line-height: 1.7;
        }

        /* ── EYEBROW ── */
        .lj-eyebrow {
          font-family: var(--ff-label);
          font-size: 0.6rem;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: 14px;
          display: block;
        }
        .lj-eyebrow--dark { color: var(--c-gold); }

        /* ── SECTION TITLE ── */
        .lj-section-title {
          font-family: var(--ff-display);
          font-weight: 300;
          font-size: clamp(2rem, 5vw, 3.2rem);
          color: var(--c-dark);
          line-height: 1.1;
          letter-spacing: 0.01em;
        }
        .lj-section-title em {
          font-style: italic;
          color: var(--c-brown-2);
        }
        .lj-section-title--light { color: var(--c-cream); }
        .lj-section-title--light em { color: var(--c-gold-lt); }

        .lj-rule {
          width: 48px; height: 1px;
          background: var(--c-gold);
          margin: 20px auto;
          opacity: 0.7;
        }
        .lj-section-sub {
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-muted);
        }

        /* ── COLLECTIONS ── */
        .lj-collections {
          background: var(--c-bg);
          padding: 80px 48px 96px;
        }
        @media (max-width: 640px) { .lj-collections { padding: 60px 24px 72px; } }
        .lj-collections__header { text-align: center; margin-bottom: 48px; }

        /* ── FILTERS ── */
        .lj-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0;
          margin-bottom: 48px;
        }
        .lj-filter-btn {
          padding: 10px 22px;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--c-brown);
          cursor: pointer;
          transition: all 0.25s;
          margin: -1px 0 0 -1px;
        }
        .lj-filter-btn:hover { background: var(--c-bg-warm); }
        .lj-filter-btn--active { background: var(--c-dark); color: var(--c-cream); border-color: var(--c-dark); z-index: 1; }

        /* ── PRODUCT GRID ── */
        .lj-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }
        @media (max-width: 1024px) { .lj-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 680px)  { .lj-grid { grid-template-columns: repeat(2, 1fr); } }

        /* ── PRODUCT CARD ── */
        .lj-card {
          background: var(--c-bg);
          overflow: hidden;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .lj-card:hover { transform: translateY(-3px); z-index: 2; }
        .lj-card__image {
          position: relative;
          aspect-ratio: 3/4;
          background: var(--c-bg-warm);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .lj-card__icon {
          opacity: 0.3;
          transition: opacity 0.3s;
        }
        .lj-card:hover .lj-card__icon { opacity: 0.45; }
        .lj-card__tags {
          position: absolute;
          top: 12px; left: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .lj-card__tag {
          background: rgba(58,100,22,0.2);
          color: #7AB840;
          border: 1px solid rgba(90,150,30,0.25);
          padding: 3px 8px;
          font-family: var(--ff-label);
          font-size: 0.5rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .lj-card__overlay {
          position: absolute; inset: 0;
          background: rgba(24,16,10,0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          backdrop-filter: blur(2px);
        }
        .lj-card:hover .lj-card__overlay { opacity: 1; }
        .lj-card__add {
          background: var(--c-cream);
          color: var(--c-dark);
          border: none;
          padding: 11px 22px;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transform: translateY(8px);
          transition: transform 0.3s ease, background 0.2s;
        }
        .lj-card:hover .lj-card__add { transform: translateY(0); }
        .lj-card__add:hover { background: var(--c-gold-lt); }
        .lj-card__body { padding: 18px 20px 22px; }
        .lj-card__name {
          font-family: var(--ff-display);
          font-size: 1.15rem;
          font-weight: 400;
          color: var(--c-dark);
          margin-bottom: 3px;
        }
        .lj-card__meta {
          font-family: var(--ff-label);
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-muted);
          margin-bottom: 8px;
        }
        .lj-card__price {
          font-family: var(--ff-display);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--c-brown-2);
        }

        /* ── ABOUT ── */
        .lj-about {
          position: relative;
          background: linear-gradient(145deg, #1A0F08 0%, #2C1A0E 50%, #1A0F08 100%);
          overflow: hidden;
          padding: 100px 48px;
        }
        @media (max-width: 640px) { .lj-about { padding: 72px 24px; } }
        .lj-about__grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }
        .lj-about__inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          display: flex;
          gap: 80px;
          align-items: center;
        }
        @media (max-width: 820px) {
          .lj-about__inner { flex-direction: column; gap: 48px; }
        }
        .lj-about__visual {
          position: relative;
          flex-shrink: 0;
          width: 280px;
          height: 360px;
        }
        @media (max-width: 820px) { .lj-about__visual { width: 220px; height: 280px; align-self: center; } }
        .lj-about__frame-outer {
          position: absolute;
          inset: -16px;
          border: 1px solid rgba(184,150,110,0.2);
        }
        .lj-about__frame-inner {
          position: absolute;
          inset: 0;
          background: rgba(184,150,110,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(184,150,110,0.12);
        }
        .lj-about__text { flex: 1; }
        .lj-about__location {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(184,150,110,0.65);
          background: rgba(184,150,110,0.08);
          border: 1px solid rgba(184,150,110,0.18);
          padding: 8px 14px;
          width: fit-content;
          margin: 18px 0 24px;
        }
        .lj-about__para {
          font-family: var(--ff-body);
          font-size: 1rem;
          color: rgba(248,243,234,0.65);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .lj-about__pillars {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 28px;
        }
        @media (max-width: 480px) { .lj-about__pillars { grid-template-columns: 1fr; } }
        .lj-pillar {
          padding: 16px 18px;
          background: rgba(184,150,110,0.07);
          border: 1px solid rgba(184,150,110,0.14);
        }
        .lj-pillar__label {
          font-family: var(--ff-label);
          font-size: 0.56rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: 5px;
        }
        .lj-pillar__desc {
          font-family: var(--ff-body);
          font-size: 0.82rem;
          color: rgba(248,243,234,0.5);
          line-height: 1.6;
        }

        /* ── FOOTER ── */
        .lj-footer {
          position: relative;
          background: var(--c-dark);
          padding: 72px 48px 32px;
          overflow: hidden;
        }
        @media (max-width: 640px) { .lj-footer { padding: 56px 24px 28px; } }
        .lj-footer__grain {
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
          pointer-events: none;
        }
        .lj-footer__inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr;
          gap: 56px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(184,150,110,0.12);
        }
        @media (max-width: 840px) {
          .lj-footer__inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 520px) {
          .lj-footer__inner { grid-template-columns: 1fr; gap: 36px; }
        }
        .lj-footer__logo {
          font-family: var(--ff-display);
          font-size: 1.6rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-cream);
          margin-bottom: 12px;
        }
        .lj-footer__tagline {
          font-family: var(--ff-body);
          font-size: 0.88rem;
          color: rgba(248,243,234,0.45);
          line-height: 1.7;
          max-width: 320px;
          margin-bottom: 16px;
        }
        .lj-footer__location {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: var(--ff-label);
          font-size: 0.55rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(184,150,110,0.55);
          margin-bottom: 16px;
        }
        .lj-footer__badges {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .lj-footer__badges span {
          border: 1px solid rgba(184,150,110,0.25);
          padding: 4px 12px;
          font-family: var(--ff-label);
          font-size: 0.52rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--c-gold);
        }
        .lj-footer__col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .lj-footer__col-title {
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: 6px;
        }
        .lj-footer__col a {
          font-family: var(--ff-body);
          font-size: 0.88rem;
          color: rgba(248,243,234,0.45);
          text-decoration: none;
          transition: a 0.2s;
        }
        .lj-footer__col a:hover { color: rgba(248,243,234,0.85); }
        .lj-footer__bottom {
          position: relative;
          max-width: 1100px;
          margin: 28px auto 0;
          display: flex;
          justify-content: space-between;
          font-family: var(--ff-label);
          font-size: 0.52rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(248,243,234,0.25);
        }

        /* ── BUTTONS ── */
        .lj-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--ff-label);
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 14px 32px;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .lj-btn--primary {
          background: var(--c-dark);
          color: var(--c-cream);
        }
        .lj-btn--primary:hover { background: var(--c-brown); }
        .lj-btn--outline-light {
          background: transparent;
          color: var(--c-cream);
          border: 1px solid rgba(248,243,234,0.4);
        }
        .lj-btn--outline-light:hover {
          background: rgba(248,243,234,0.08);
          border-color: rgba(248,243,234,0.7);
        }
        .lj-btn--full { width: 100%; }

        /* ── CART BACKDROP ── */
        .lj-backdrop {
          position: fixed; inset: 0;
          z-index: 200;
          background: rgba(0,0,0,0);
          pointer-events: none;
          transition: background 0.35s;
        }
        .lj-backdrop--visible {
          background: rgba(0,0,0,0.5);
          pointer-events: all;
        }

        /* ── CART DRAWER ── */
        .lj-cart {
          position: fixed;
          top: 0; right: 0;
          z-index: 300;
          width: 420px;
          max-width: 100vw;
          height: 100%;
          background: var(--c-cream);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.15);
        }
        .lj-cart--open { transform: translateX(0); }
        .lj-cart__head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          border-bottom: 1px solid var(--border);
        }
        .lj-cart__title {
          font-family: var(--ff-display);
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--c-dark);
          letter-spacing: 0.04em;
        }
        .lj-cart__close {
          background: none;
          border: none;
          color: var(--c-muted);
          font-size: 1rem;
          cursor: pointer;
          padding: 4px 8px;
          transition: color 0.2s;
        }
        .lj-cart__close:hover { color: var(--c-dark); }
        .lj-cart__body {
          flex: 1;
          overflow-y: auto;
          padding: 12px 28px;
        }
        .lj-cart__empty {
          text-align: center;
          padding: 60px 0;
          font-family: var(--ff-display);
          font-size: 1.1rem;
          color: var(--c-muted);
          line-height: 1.8;
        }
        .lj-cart__empty em { font-style: italic; }
        .lj-cart__item {
          display: flex;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
        }
        .lj-cart__item-thumb {
          width: 72px; height: 90px;
          background: var(--c-bg-warm);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .lj-cart__item-info { flex: 1; }
        .lj-cart__item-name {
          font-family: var(--ff-display);
          font-size: 1.05rem;
          color: var(--c-dark);
          margin-bottom: 4px;
        }
        .lj-cart__item-price {
          font-family: var(--ff-display);
          font-size: 1rem;
          font-weight: 500;
          color: var(--c-brown-2);
          margin-bottom: 10px;
        }
        .lj-cart__item-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lj-cart__item-controls button {
          width: 26px; height: 26px;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--c-brown);
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .lj-cart__item-controls button:hover { background: var(--c-bg-warm); }
        .lj-cart__item-controls span {
          font-family: var(--ff-display);
          font-size: 1rem;
          color: var(--c-dark);
          min-width: 18px;
          text-align: center;
        }
        .lj-cart__item-remove {
          margin-left: auto;
          font-family: var(--ff-label) !important;
          font-size: 0.52rem !important;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-muted) !important;
          width: auto !important;
          height: auto !important;
          border: none !important;
          background: none !important;
        }
        .lj-cart__item-remove:hover { color: var(--c-dark) !important; background: none !important; }
        .lj-cart__foot {
          padding: 20px 28px 28px;
          border-top: 1px solid var(--border);
        }
        .lj-cart__total {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 16px;
        }
        .lj-cart__total span {
          font-family: var(--ff-label);
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-muted);
        }
        .lj-cart__total strong {
          font-family: var(--ff-display);
          font-size: 2rem;
          font-weight: 300;
          color: var(--c-dark);
        }

        /* ── MODAL ── */
        .lj-modal-bg {
          position: fixed; inset: 0;
          z-index: 400;
          background: rgba(18,10,5,0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .lj-modal {
          position: relative;
          background: var(--c-cream);
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 40px 36px;
        }
        @media (max-width: 520px) { .lj-modal { padding: 32px 24px; } }
        .lj-modal__close {
          position: absolute;
          top: 18px; right: 20px;
          background: none; border: none;
          color: var(--c-muted); font-size: 1rem;
          cursor: pointer; transition: color 0.2s;
        }
        .lj-modal__close:hover { color: var(--c-dark); }
        .lj-modal__head { margin-bottom: 24px; }
        .lj-modal__title {
          font-family: var(--ff-display);
          font-size: 2rem;
          font-weight: 300;
          color: var(--c-dark);
        }
        .lj-modal__sub {
          font-family: var(--ff-label);
          font-size: 0.56rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--c-muted);
          margin-top: 4px;
        }
        .lj-card-preview {
          background: linear-gradient(135deg, var(--c-dark-2) 0%, var(--c-brown) 100%);
          border-radius: 8px;
          padding: 22px 24px;
          margin-bottom: 24px;
          color: var(--c-cream);
        }
        .lj-card-preview__chip {
          width: 32px; height: 24px;
          background: linear-gradient(135deg, #D4B896, #B8966E);
          border-radius: 4px;
          margin-bottom: 18px;
          opacity: 0.8;
        }
        .lj-card-preview__number {
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          letter-spacing: 0.18em;
          opacity: 0.9;
          margin-bottom: 14px;
        }
        .lj-card-preview__meta {
          display: flex;
          justify-content: space-between;
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.65;
        }
        .lj-form-section { margin-bottom: 20px; }
        .lj-form-section__title {
          font-family: var(--ff-label);
          font-size: 0.58rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--c-gold);
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .lj-input {
          width: 100%;
          background: var(--c-bg-warm);
          border: 1px solid var(--border);
          padding: 10px 14px;
          font-family: var(--ff-body);
          font-size: 0.9rem;
          color: var(--c-dark);
          outline: none;
          transition: border-color 0.2s;
        }
        .lj-input:focus { border-color: var(--c-gold); }
        .lj-input::placeholder { color: var(--c-muted); font-style: italic; }
        .lj-input--mb { margin-bottom: 8px; }
        .lj-input--sm { width: 90px; flex-shrink: 0; }
        .lj-input--xs { width: 72px; flex-shrink: 0; }
        .lj-input-row { display: flex; gap: 8px; margin-bottom: 8px; }
        .lj-input-row .lj-input { flex: 1; }
        .lj-order-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-family: var(--ff-body);
          font-size: 0.9rem;
          color: var(--c-brown);
        }
        .lj-order-total {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--border);
          padding-top: 10px;
          margin-top: 6px;
          font-family: var(--ff-display);
          font-size: 1.2rem;
          color: var(--c-dark);
        }
        .lj-modal__secure {
          text-align: center;
          font-family: var(--ff-label);
          font-size: 0.55rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--c-muted);
          margin-top: 14px;
        }

        /* ── SUCCESS ── */
        .lj-success { text-align: center; padding: 20px 0 12px; }
        .lj-success__icon {
          width: 60px; height: 60px;
          margin: 0 auto 24px;
          border: 1px solid var(--c-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--c-gold);
        }
        .lj-success__title {
          font-family: var(--ff-display);
          font-size: 2.4rem;
          font-weight: 300;
          color: var(--c-dark);
          margin-bottom: 6px;
        }
        .lj-success__sub {
          font-family: var(--ff-display);
          font-style: italic;
          font-size: 1.1rem;
          color: var(--c-muted);
          margin-bottom: 16px;
        }
        .lj-success__text {
          font-family: var(--ff-body);
          font-size: 0.9rem;
          color: var(--c-muted);
          line-height: 1.8;
          margin-bottom: 28px;
        }

        /* ── KEYFRAMES ── */
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.35; transform: scaleY(0.8); }
          50%       { opacity: 1;    transform: scaleY(1); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── SCROLLBAR ── */
        .lj-cart__body::-webkit-scrollbar,
        .lj-modal::-webkit-scrollbar { width: 4px; }
        .lj-cart__body::-webkit-scrollbar-track,
        .lj-modal::-webkit-scrollbar-track { background: transparent; }
        .lj-cart__body::-webkit-scrollbar-thumb,
        .lj-modal::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        @media (max-width: 768px) {
          .lj-nav { padding: 0 24px; }
          .lj-nav__left { display: none; }
          .lj-nav__right { min-width: auto; }
        }
      `}</style>
    </>
  );
}
