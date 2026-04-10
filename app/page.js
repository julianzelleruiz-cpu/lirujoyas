<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Liliana Ruiz — Joyería Contemporánea</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #F8F6F2;
    --bg2:       #EEEBE4;
    --ink:       #1C1611;
    --ink2:      #5A4E44;
    --ink3:      #9A8C82;
    --gold:      #A8896A;
    --gold2:     #C4A882;
    --line:      rgba(90,78,68,0.15);
    --white:     #FDFCFA;
    --serif:     'Cormorant Garamond', Georgia, serif;
    --sans:      'Montserrat', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--sans);
    background: var(--bg);
    color: var(--ink);
    font-size: 13px;
    letter-spacing: 0.02em;
    overflow-x: hidden;
  }

  /* ─── UTILITY ─────────────────────────────────────── */
  .hide { display: none !important; }
  .visually-hidden { opacity: 0; pointer-events: none; }

  /* ─── TOAST ────────────────────────────────────────── */
  #toast {
    position: fixed; bottom: 40px; left: 50%; transform: translateX(-50%) translateY(60px);
    background: var(--ink); color: var(--bg);
    padding: 12px 28px; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
    transition: transform .4s cubic-bezier(.16,1,.3,1), opacity .4s;
    opacity: 0; z-index: 999; pointer-events: none;
  }
  #toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }

  /* ─── NAV ───────────────────────────────────────────── */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    background: rgba(248,246,242,.92); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--line);
    transition: padding .3s;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 12px; cursor: pointer;
    text-decoration: none; color: var(--ink);
  }
  .nav-logo svg { width: 44px; height: 44px; }
  .nav-logo-text { display: flex; flex-direction: column; gap: 1px; }
  .nav-logo-name {
    font-family: var(--serif); font-size: 17px; font-weight: 400;
    letter-spacing: 0.12em; line-height: 1.1; color: var(--ink);
  }
  .nav-logo-sub {
    font-size: 7.5px; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gold); font-weight: 500;
  }
  .nav-links {
    display: flex; gap: 32px; list-style: none;
    font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
  }
  .nav-links a {
    color: var(--ink2); text-decoration: none; position: relative; padding-bottom: 2px;
    transition: color .2s;
  }
  .nav-links a::after {
    content:''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
    background: var(--gold); transition: width .3s;
  }
  .nav-links a:hover { color: var(--ink); }
  .nav-links a:hover::after { width: 100%; }
  .nav-bag-btn {
    background: none; border: 1px solid var(--ink); cursor: pointer;
    display: flex; align-items: center; gap: 8px;
    padding: 9px 18px; font-family: var(--sans); font-size: 9.5px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink);
    transition: background .2s, color .2s;
  }
  .nav-bag-btn:hover { background: var(--ink); color: var(--white); }
  .bag-count {
    display: inline-flex; align-items: center; justify-content: center;
    width: 18px; height: 18px; border-radius: 50%;
    background: var(--gold); color: white; font-size: 9px; font-weight: 600;
  }

  /* ─── PAGE VIEWS ────────────────────────────────────── */
  .view { min-height: 100vh; }

  /* ─── HERO ──────────────────────────────────────────── */
  .hero {
    position: relative; height: 100vh; display: flex;
    align-items: center; justify-content: center; overflow: hidden;
    background: var(--bg);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 70% at 50% 60%, #E8E0D2 0%, var(--bg) 70%);
  }
  .hero-rings {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .hero-rings circle {
    fill: none; stroke: var(--gold2);
    animation: ringPulse 6s ease-in-out infinite;
  }
  .hero-rings circle:nth-child(1) { animation-delay: 0s; }
  .hero-rings circle:nth-child(2) { animation-delay: 1s; }
  .hero-rings circle:nth-child(3) { animation-delay: 2s; }
  @keyframes ringPulse {
    0%,100% { opacity: .08; } 50% { opacity: .22; }
  }
  .hero-content {
    position: relative; z-index: 1; text-align: center;
    display: flex; flex-direction: column; align-items: center;
  }
  .hero-eyebrow {
    font-size: 9px; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 20px;
    animation: fadeUp 1s .2s both;
  }
  .hero-title {
    font-family: var(--serif); font-size: clamp(52px,8vw,110px);
    font-weight: 300; line-height: 0.92; color: var(--ink);
    animation: fadeUp 1s .35s both;
  }
  .hero-title em { font-style: italic; color: var(--gold); }
  .hero-sub {
    font-family: var(--serif); font-size: 18px; font-weight: 300; font-style: italic;
    color: var(--ink2); margin-top: 22px; max-width: 340px;
    animation: fadeUp 1s .5s both;
  }
  .hero-cta {
    margin-top: 36px; display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
    animation: fadeUp 1s .65s both;
  }
  .btn-primary {
    background: var(--ink); color: var(--white); border: none; cursor: pointer;
    padding: 14px 36px; font-family: var(--sans); font-size: 9.5px;
    letter-spacing: 0.22em; text-transform: uppercase; transition: background .2s;
  }
  .btn-primary:hover { background: var(--gold); }
  .btn-outline {
    background: none; color: var(--ink); border: 1px solid var(--ink); cursor: pointer;
    padding: 14px 36px; font-family: var(--sans); font-size: 9.5px;
    letter-spacing: 0.22em; text-transform: uppercase; transition: all .2s;
  }
  .btn-outline:hover { background: var(--ink); color: var(--white); }
  .hero-scroll {
    position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    animation: fadeUp 1s .8s both;
  }
  .hero-scroll-line {
    width: 1px; height: 48px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollLine 2.2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    51% { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
  .hero-scroll span {
    font-size: 7.5px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--ink3);
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── TICKER ─────────────────────────────────────────── */
  .ticker {
    overflow: hidden; background: var(--ink); padding: 12px 0;
    border-top: 1px solid rgba(255,255,255,.06);
  }
  .ticker-inner {
    display: flex; white-space: nowrap; width: max-content;
    animation: ticker 28s linear infinite;
  }
  .ticker-inner span {
    display: inline-block; padding: 0 20px;
    font-size: 9px; letter-spacing: 0.28em; text-transform: uppercase;
    color: rgba(248,246,242,.55);
  }
  .ticker-inner .dot { color: var(--gold2); }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* ─── SECTION HEADER ─────────────────────────────────── */
  .section-header { text-align: center; margin-bottom: 56px; }
  .section-eyebrow {
    display: block; font-size: 9px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 12px;
  }
  .section-title {
    font-family: var(--serif); font-size: clamp(32px,4vw,52px);
    font-weight: 300; color: var(--ink); line-height: 1.1;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-rule {
    width: 36px; height: 1px; background: var(--gold);
    margin: 16px auto 0;
  }

  /* ─── FILTER BAR ─────────────────────────────────────── */
  .filter-bar {
    display: flex; justify-content: center; gap: 0;
    margin-bottom: 44px; flex-wrap: wrap;
  }
  .filter-btn {
    border: 1px solid var(--line); background: none; cursor: pointer;
    padding: 10px 22px; font-family: var(--sans); font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink2);
    transition: all .2s; margin: -1px;
  }
  .filter-btn:hover { border-color: var(--ink2); color: var(--ink); }
  .filter-btn.active { background: var(--ink); color: var(--white); border-color: var(--ink); }

  /* ─── COLLECTIONS SECTION ───────────────────────────── */
  #collections { padding: 100px 48px; background: var(--white); }

  /* ─── PRODUCT GRID ───────────────────────────────────── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 2px;
    max-width: 1200px; margin: 0 auto;
  }
  .product-card {
    background: var(--bg); cursor: pointer; overflow: hidden;
    transition: transform .35s cubic-bezier(.16,1,.3,1);
    position: relative;
  }
  .product-card:hover { transform: translateY(-4px); z-index: 1; }
  .product-thumb {
    aspect-ratio: 3/4; background: var(--bg2);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .product-thumb svg { width: 60%; height: 60%; transition: transform .5s cubic-bezier(.16,1,.3,1); }
  .product-card:hover .product-thumb svg { transform: scale(1.06) rotate(2deg); }
  .product-overlay {
    position: absolute; inset: 0;
    background: rgba(28,22,17,0.06);
    display: flex; align-items: flex-end; justify-content: center;
    padding-bottom: 24px; opacity: 0;
    transition: opacity .3s;
  }
  .product-card:hover .product-overlay { opacity: 1; }
  .product-overlay button {
    background: var(--white); color: var(--ink); border: none; cursor: pointer;
    padding: 11px 24px; font-family: var(--sans); font-size: 9px;
    letter-spacing: 0.2em; text-transform: uppercase;
    transform: translateY(8px); transition: transform .3s .05s, background .2s;
  }
  .product-card:hover .product-overlay button { transform: translateY(0); }
  .product-overlay button:hover { background: var(--ink); color: var(--white); }
  .product-badges {
    position: absolute; top: 12px; left: 12px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .badge {
    padding: 3px 8px; font-size: 7.5px; letter-spacing: 0.15em;
    text-transform: uppercase;
  }
  .badge-new { background: var(--ink); color: var(--white); }
  .badge-eco { background: rgba(255,255,255,.85); color: #4A7C3F; }
  .product-info { padding: 18px 20px 22px; }
  .product-name {
    font-family: var(--serif); font-size: 19px; font-weight: 400;
    color: var(--ink); line-height: 1.2; margin-bottom: 4px;
  }
  .product-meta { font-size: 9.5px; letter-spacing: 0.1em; color: var(--ink3); margin-bottom: 6px; }
  .product-price { font-size: 14px; font-weight: 500; color: var(--gold); letter-spacing: 0.04em; }

  /* ─── VALUES SECTION ─────────────────────────────────── */
  #values { background: var(--bg2); }
  .values-grid {
    display: grid; grid-template-columns: repeat(4,1fr);
    border-top: 1px solid var(--line); border-left: 1px solid var(--line);
  }
  .value-cell {
    padding: 48px 36px; text-align: center;
    border-right: 1px solid var(--line); border-bottom: 1px solid var(--line);
  }
  .value-icon {
    width: 40px; height: 40px; margin: 0 auto 16px;
    border: 1px solid var(--line); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .value-title {
    font-family: var(--serif); font-size: 18px; font-weight: 400;
    color: var(--ink); margin-bottom: 8px;
  }
  .value-text { font-size: 11px; line-height: 1.7; color: var(--ink3); }

  /* ─── ABOUT SECTION ──────────────────────────────────── */
  #about {
    padding: 100px 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
    align-items: center; max-width: 1200px; margin: 0 auto;
  }
  .about-visual {
    aspect-ratio: 3/4; background: var(--bg2); position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .about-visual::before {
    content: ''; position: absolute;
    top: -16px; left: -16px; right: 16px; bottom: 16px;
    border: 1px solid var(--line); z-index: -1;
  }
  .about-content { padding: 20px 0; }
  .about-lead {
    font-family: var(--serif); font-size: clamp(26px,3vw,40px);
    font-weight: 300; line-height: 1.2; color: var(--ink); margin: 16px 0 24px;
  }
  .about-lead em { font-style: italic; color: var(--gold); }
  .about-body { font-size: 12px; line-height: 1.9; color: var(--ink2); margin-bottom: 16px; }
  .about-tags {
    display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px;
  }
  .tag {
    border: 1px solid var(--line); padding: 7px 16px;
    font-size: 8.5px; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gold);
  }

  /* ─── FOOTER ─────────────────────────────────────────── */
  footer {
    background: var(--ink); color: var(--bg);
    padding: 64px 48px 32px;
  }
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
    border-bottom: 1px solid rgba(255,255,255,.08); padding-bottom: 40px; margin-bottom: 24px;
  }
  .footer-brand-name {
    font-family: var(--serif); font-size: 26px; font-weight: 300;
    letter-spacing: 0.12em; margin-bottom: 12px; color: var(--bg);
  }
  .footer-brand-sub {
    font-size: 7.5px; letter-spacing: 0.28em; text-transform: uppercase;
    color: var(--gold2); margin-bottom: 16px;
  }
  .footer-body {
    font-size: 11px; line-height: 1.8; opacity: .5;
  }
  .footer-col h4 {
    font-size: 8.5px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--gold2); margin-bottom: 18px;
  }
  .footer-col a {
    display: block; color: var(--bg); text-decoration: none;
    font-size: 11px; opacity: .45; margin-bottom: 9px;
    transition: opacity .2s;
  }
  .footer-col a:hover { opacity: 1; }
  .footer-bottom {
    display: flex; justify-content: space-between;
    font-size: 9.5px; opacity: .3; flex-wrap: wrap; gap: 8px;
  }

  /* ─── CART DRAWER ────────────────────────────────────── */
  .cart-backdrop {
    position: fixed; inset: 0; background: rgba(28,22,17,.4);
    z-index: 200; opacity: 0; pointer-events: none;
    transition: opacity .3s;
  }
  .cart-backdrop.open { opacity: 1; pointer-events: all; }
  .cart-drawer {
    position: fixed; top: 0; right: 0; bottom: 0; width: 100%; max-width: 420px;
    background: var(--white); z-index: 201;
    display: flex; flex-direction: column;
    transform: translateX(100%); transition: transform .45s cubic-bezier(.16,1,.3,1);
  }
  .cart-drawer.open { transform: translateX(0); }
  .cart-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 24px 28px; border-bottom: 1px solid var(--line);
  }
  .cart-head h3 {
    font-family: var(--serif); font-size: 22px; font-weight: 300; color: var(--ink);
  }
  .cart-close { background: none; border: none; cursor: pointer; font-size: 18px; color: var(--ink3); }
  .cart-close:hover { color: var(--ink); }
  .cart-items { flex: 1; overflow-y: auto; padding: 16px 28px; }
  .cart-empty {
    height: 100%; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 10px;
  }
  .cart-empty p {
    font-family: var(--serif); font-size: 17px; font-style: italic;
    color: var(--ink3); text-align: center;
  }
  .cart-item {
    display: flex; gap: 16px; padding: 18px 0;
    border-bottom: 1px solid var(--line);
  }
  .cart-item-thumb {
    width: 72px; height: 90px; background: var(--bg2); flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .cart-item-thumb svg { width: 50px; height: 50px; opacity: .6; }
  .cart-item-info { flex: 1; }
  .cart-item-name {
    font-family: var(--serif); font-size: 16px; font-weight: 400; color: var(--ink);
    margin-bottom: 3px;
  }
  .cart-item-price { font-size: 12px; font-weight: 500; color: var(--gold); }
  .cart-item-controls {
    display: flex; align-items: center; gap: 10px; margin-top: 12px;
  }
  .qty-btn {
    width: 26px; height: 26px; border: 1px solid var(--line);
    background: none; cursor: pointer; font-size: 15px; color: var(--ink2);
    display: flex; align-items: center; justify-content: center;
    transition: background .2s, color .2s;
  }
  .qty-btn:hover { background: var(--ink); color: var(--white); }
  .qty-val { font-size: 12px; min-width: 20px; text-align: center; }
  .cart-remove {
    margin-left: auto; background: none; border: none; cursor: pointer;
    font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--ink3); transition: color .2s;
  }
  .cart-remove:hover { color: var(--ink); }
  .cart-foot { padding: 20px 28px; border-top: 1px solid var(--line); }
  .cart-total {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
  }
  .cart-total-label { font-size: 9.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink3); }
  .cart-total-amount {
    font-family: var(--serif); font-size: 28px; font-weight: 300; color: var(--ink);
  }
  .cart-checkout {
    width: 100%; background: var(--ink); color: var(--white); border: none; cursor: pointer;
    padding: 16px; font-family: var(--sans); font-size: 9.5px;
    letter-spacing: 0.22em; text-transform: uppercase; transition: background .2s;
  }
  .cart-checkout:hover { background: var(--gold); }

  /* ─── PAYMENT MODAL ──────────────────────────────────── */
  .modal-backdrop {
    position: fixed; inset: 0; background: rgba(28,22,17,.55);
    z-index: 300; display: flex; align-items: center; justify-content: center;
    padding: 20px;
    opacity: 0; pointer-events: none; transition: opacity .3s;
  }
  .modal-backdrop.open { opacity: 1; pointer-events: all; }
  .modal {
    background: var(--white); width: 100%; max-width: 500px; max-height: 90vh;
    overflow-y: auto; padding: 40px 36px; position: relative;
    transform: translateY(16px); transition: transform .4s cubic-bezier(.16,1,.3,1);
  }
  .modal-backdrop.open .modal { transform: translateY(0); }
  .modal-close {
    position: absolute; top: 16px; right: 20px;
    background: none; border: none; cursor: pointer; font-size: 20px; color: var(--ink3);
  }
  .modal h2 {
    font-family: var(--serif); font-size: 30px; font-weight: 300; color: var(--ink);
  }
  .modal-sub { font-size: 9.5px; letter-spacing: 0.2em; color: var(--ink3); margin-bottom: 28px; }
  .card-preview {
    border-radius: 8px;
    background: linear-gradient(135deg, #2A2019 0%, #5A4532 60%, #7B5B3A 100%);
    padding: 22px 20px; color: #FDFCFA; margin-bottom: 24px;
  }
  .card-num {
    font-family: 'Courier New', monospace; font-size: 14px; letter-spacing: 0.22em;
    margin-bottom: 14px; opacity: .85;
  }
  .card-bottom { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.12em; opacity: .65; }
  .form-section { margin-bottom: 20px; }
  .form-section-title {
    font-size: 8.5px; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); border-bottom: 1px solid var(--line); padding-bottom: 6px; margin-bottom: 12px;
  }
  .field-row { display: flex; gap: 10px; margin-bottom: 8px; }
  .field { flex: 1; }
  input[type=text], input[type=email] {
    width: 100%; border: 1px solid var(--line); background: var(--bg);
    padding: 10px 12px; font-family: var(--sans); font-size: 11.5px; color: var(--ink);
    outline: none; transition: border-color .2s;
  }
  input[type=text]:focus, input[type=email]:focus { border-color: var(--gold); }
  input::placeholder { color: var(--ink3); }
  .order-line {
    display: flex; justify-content: space-between; padding: 7px 0;
    font-size: 12px; color: var(--ink2); border-bottom: 1px solid var(--line);
  }
  .order-total-row {
    display: flex; justify-content: space-between; padding: 12px 0 0;
    font-size: 14px; font-weight: 500; color: var(--ink);
  }
  .modal-submit {
    width: 100%; margin-top: 20px;
    background: var(--ink); color: var(--white); border: none; cursor: pointer;
    padding: 16px; font-family: var(--sans); font-size: 9.5px;
    letter-spacing: 0.22em; text-transform: uppercase; transition: background .2s;
  }
  .modal-submit:hover { background: var(--gold); }
  .modal-secure {
    text-align: center; margin-top: 10px;
    font-size: 9px; letter-spacing: 0.12em; color: var(--ink3);
  }
  .success-view { text-align: center; padding: 20px 0; }
  .success-icon {
    width: 56px; height: 56px; border: 1px solid var(--gold);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    margin: 0 auto 20px;
  }
  .success-view h2 { font-family: var(--serif); font-size: 36px; font-weight: 300; color: var(--ink); }
  .success-view p { font-family: var(--serif); font-size: 15px; font-style: italic; color: var(--ink3); margin: 8px 0; }
  .success-view small { font-size: 10px; line-height: 1.8; color: var(--ink3); display: block; margin: 12px 0; }

  /* ─── PRODUCT DETAIL VIEW ────────────────────────────── */
  #product-detail { display: none; padding-top: 88px; min-height: 100vh; }
  .detail-wrapper {
    max-width: 1100px; margin: 0 auto; padding: 60px 48px;
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  }
  .detail-visual {
    position: sticky; top: 108px;
    aspect-ratio: 3/4; background: var(--bg2);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .detail-visual svg { width: 55%; height: 55%; transition: transform .6s cubic-bezier(.16,1,.3,1); }
  .detail-visual:hover svg { transform: scale(1.05) rotate(3deg); }
  .detail-visual-corner {
    position: absolute; width: 24px; height: 24px;
    border-color: var(--gold2); border-style: solid; border-width: 0;
  }
  .detail-visual-corner.tl { top: 16px; left: 16px; border-top-width: 1px; border-left-width: 1px; }
  .detail-visual-corner.tr { top: 16px; right: 16px; border-top-width: 1px; border-right-width: 1px; }
  .detail-visual-corner.bl { bottom: 16px; left: 16px; border-bottom-width: 1px; border-left-width: 1px; }
  .detail-visual-corner.br { bottom: 16px; right: 16px; border-bottom-width: 1px; border-right-width: 1px; }
  .detail-back {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
    background: none; border: none; cursor: pointer; padding: 0; margin-bottom: 28px;
    transition: gap .2s;
  }
  .detail-back:hover { gap: 12px; }
  .detail-back svg { width: 14px; }
  .detail-category {
    font-size: 8.5px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--gold);
    margin-bottom: 10px;
  }
  .detail-name {
    font-family: var(--serif); font-size: clamp(34px,4vw,52px);
    font-weight: 300; color: var(--ink); line-height: 1.05; margin-bottom: 8px;
  }
  .detail-name em { font-style: italic; color: var(--gold); }
  .detail-material {
    font-size: 10.5px; letter-spacing: 0.12em; color: var(--ink3); margin-bottom: 22px;
  }
  .detail-price {
    font-family: var(--serif); font-size: 36px; font-weight: 300;
    color: var(--ink); margin-bottom: 28px;
  }
  .detail-desc {
    font-size: 12px; line-height: 1.9; color: var(--ink2); margin-bottom: 28px;
    padding-bottom: 28px; border-bottom: 1px solid var(--line);
  }
  .detail-specs {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    border: 1px solid var(--line); margin-bottom: 32px;
  }
  .detail-spec {
    padding: 14px 16px; border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .detail-spec:nth-child(even) { border-right: none; }
  .detail-spec:nth-last-child(-n+2) { border-bottom: none; }
  .detail-spec-label {
    font-size: 8px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--ink3); margin-bottom: 4px;
  }
  .detail-spec-value { font-size: 11.5px; color: var(--ink); }
  .detail-add {
    width: 100%; background: var(--ink); color: var(--white); border: none; cursor: pointer;
    padding: 18px; font-family: var(--sans); font-size: 10px;
    letter-spacing: 0.22em; text-transform: uppercase; transition: background .2s; margin-bottom: 10px;
  }
  .detail-add:hover { background: var(--gold); }
  .detail-note {
    font-size: 9.5px; letter-spacing: 0.08em; color: var(--ink3); text-align: center;
  }
  .detail-tags { display: flex; gap: 8px; margin-top: 20px; flex-wrap: wrap; }

  /* ─── RELATED ────────────────────────────────────────── */
  .related-section { background: var(--bg2); padding: 72px 48px; }
  .related-grid {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 2px;
    max-width: 1100px; margin: 36px auto 0;
  }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    #collections, .related-section { padding: 72px 24px; }
    .values-grid { grid-template-columns: 1fr 1fr; }
    #about { grid-template-columns: 1fr; padding: 72px 24px; }
    .about-visual { max-width: 380px; }
    footer { padding: 48px 24px 24px; }
    .footer-grid { grid-template-columns: 1fr; }
    .detail-wrapper { grid-template-columns: 1fr; padding: 32px 24px; }
    .related-grid { grid-template-columns: repeat(2,1fr); }
    .product-grid { grid-template-columns: repeat(2,1fr); }
  }
</style>
</head>
<body>

<!-- TOAST -->
<div id="toast"></div>

<!-- NAV -->
<nav>
  <a class="nav-logo" onclick="showView('main')" href="javascript:void(0)">
    <!-- Logo based on liru geometric mark -->
    <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="3" height="30" rx="1.5" fill="#A8896A"/>
      <rect x="5" y="32" width="26" height="3" rx="1.5" fill="#A8896A"/>
      <rect x="17" y="18" width="3" height="17" rx="1.5" fill="#A8896A"/>
      <rect x="29" y="14" width="3" height="21" rx="1.5" fill="#A8896A"/>
      <rect x="17" y="32" width="15" height="3" rx="1.5" fill="#A8896A"/>
      <circle cx="18.5" cy="11" r="3.5" fill="#A8896A"/>
    </svg>
    <div class="nav-logo-text">
      <span class="nav-logo-name">liliana ruiz</span>
      <span class="nav-logo-sub">Joyería Contemporánea</span>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="javascript:void(0)" onclick="showView('main'); scrollTo('collections')">Colecciones</a></li>
    <li><a href="javascript:void(0)" onclick="showView('main'); scrollTo('values')">Valores</a></li>
    <li><a href="javascript:void(0)" onclick="showView('main'); scrollTo('about')">Nuestra Historia</a></li>
  </ul>
  <button class="nav-bag-btn" onclick="openCart()">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 01-8 0"/>
    </svg>
    Bolsa
    <span class="bag-count" id="bagCount">0</span>
  </button>
</nav>

<!-- ══════════════ MAIN VIEW ══════════════ -->
<div id="main-view">

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <svg class="hero-rings" width="700" height="700" viewBox="0 0 700 700">
      <circle cx="350" cy="350" r="300" stroke-opacity=".12"/>
      <circle cx="350" cy="350" r="220" stroke-opacity=".18"/>
      <circle cx="350" cy="350" r="140" stroke-opacity=".25"/>
    </svg>
    <div class="hero-content">
      <span class="hero-eyebrow">Barcelona · España · Joyería de Autor</span>
      <h1 class="hero-title">liliana<br><em>ruiz</em></h1>
      <p class="hero-sub">Formas que dialogan con el cuerpo y el espacio.</p>
      <div class="hero-cta">
        <button class="btn-primary" onclick="scrollTo('collections')">Ver Colección</button>
        <button class="btn-outline" onclick="scrollTo('about')">Nuestra Historia</button>
      </div>
    </div>
    <div class="hero-scroll">
      <div class="hero-scroll-line"></div>
      <span>Desplazar</span>
    </div>
  </section>

  <!-- TICKER -->
  <div class="ticker">
    <div class="ticker-inner" id="tickerInner"></div>
  </div>

  <!-- VALUES -->
  <section id="values">
    <div class="values-grid">
      <div class="value-cell">
        <div class="value-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8896A" stroke-width="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div class="value-title">100% Vegano</div>
        <div class="value-text">Sin productos de origen animal. Cada material, ética y responsablemente seleccionado.</div>
      </div>
      <div class="value-cell">
        <div class="value-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8896A" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 000 20A14.5 14.5 0 0012 2"/><path d="M2 12h20"/>
          </svg>
        </div>
        <div class="value-title">Sostenible</div>
        <div class="value-text">Metales reciclados, packaging ecológico y producción de bajo impacto en cada pieza.</div>
      </div>
      <div class="value-cell">
        <div class="value-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8896A" stroke-width="1.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <div class="value-title">Hecha en Barcelona</div>
        <div class="value-text">Diseñada y fabricada a mano en nuestro taller, en el corazón de la ciudad.</div>
      </div>
      <div class="value-cell">
        <div class="value-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A8896A" stroke-width="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"/>
          </svg>
        </div>
        <div class="value-title">Con Amor</div>
        <div class="value-text">Cada pieza creada una a una, con paciencia y dedicación. Sin fábricas, sin atajos.</div>
      </div>
    </div>
  </section>

  <!-- COLLECTIONS -->
  <section id="collections">
    <div class="section-header">
      <span class="section-eyebrow">Colecciones</span>
      <h2 class="section-title">Cada pieza,<br><em>una conversación</em></h2>
      <div class="section-rule"></div>
    </div>
    <div class="filter-bar" id="filterBar"></div>
    <div class="product-grid" id="productGrid"></div>
  </section>

  <!-- ABOUT -->
  <section>
    <div id="about">
      <div class="about-visual">
        <svg viewBox="0 0 160 200" width="130" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Geometric sculptural jewelry form inspired by the images -->
          <polygon points="80,20 110,60 120,110 80,150 40,110 50,60" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.06)"/>
          <polygon points="80,40 100,68 106,100 80,128 54,100 60,68" stroke="#C4A882" stroke-width="0.8" fill="none"/>
          <line x1="80" y1="20" x2="80" y2="150" stroke="#A8896A" stroke-width="0.6" stroke-dasharray="3,4"/>
          <line x1="40" y1="110" x2="120" y2="110" stroke="#A8896A" stroke-width="0.6" stroke-dasharray="3,4"/>
          <circle cx="80" cy="85" r="6" stroke="#C4A882" stroke-width="1" fill="rgba(196,168,130,.15)"/>
          <circle cx="80" cy="85" r="2.5" fill="#A8896A"/>
        </svg>
        <div class="detail-visual-corner tl"></div>
        <div class="detail-visual-corner tr"></div>
        <div class="detail-visual-corner bl"></div>
        <div class="detail-visual-corner br"></div>
      </div>
      <div class="about-content">
        <span class="section-eyebrow">Nuestra Historia</span>
        <h2 class="about-lead">Nacida de la<br><em>obsesión por la forma</em></h2>
        <p class="about-body">Liliana Ruiz es una joyería contemporánea nacida en Barcelona de una exploración silenciosa: crear piezas que trasciendan el ornamento y dialoguen con el cuerpo, el espacio y el gesto.</p>
        <p class="about-body">Desde nuestro taller en el corazón de la ciudad, cada anillo, cada pendiente, cada broche es modelado a mano con paciencia y rigor. Creemos que la belleza y la responsabilidad son inseparables: por eso cada pieza es 100% vegana y elaborada con materiales sostenibles.</p>
        <div class="about-tags">
          <span class="tag">Certificada vegana</span>
          <span class="tag">Metales reciclados</span>
          <span class="tag">Artesanía local</span>
          <span class="tag">Residuo cero</span>
        </div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-brand-name">liliana ruiz</div>
        <div class="footer-brand-sub">Joyería Contemporánea · Barcelona</div>
        <p class="footer-body">Joyería de autor hecha a mano en Barcelona. Cada pieza creada con intención, llevada con amor. Siempre vegana, siempre sostenible.</p>
      </div>
      <div class="footer-col">
        <h4>Tienda</h4>
        <a href="javascript:void(0)" onclick="setFilter('pendientes')">Pendientes</a>
        <a href="javascript:void(0)" onclick="setFilter('anillos')">Anillos</a>
        <a href="javascript:void(0)" onclick="setFilter('broches')">Broches</a>
        <a href="javascript:void(0)" onclick="setFilter('esculturas')">Esculturas</a>
      </div>
      <div class="footer-col">
        <h4>Información</h4>
        <a href="#">Cuidado de Joyas</a>
        <a href="#">Guía de Tallas</a>
        <a href="javascript:void(0)" onclick="showView('main'); scrollTo('values')">Sostenibilidad</a>
        <a href="#">Devoluciones</a>
        <a href="#">Contacto</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Liliana Ruiz · Todos los derechos reservados</span>
      <span>Vegana · Sostenible · Barcelona</span>
    </div>
  </footer>

</div><!-- /main-view -->

<!-- ══════════════ PRODUCT DETAIL VIEW ══════════════ -->
<div id="product-detail">
  <div class="detail-wrapper">
    <div>
      <div class="detail-visual" id="detailVisual">
        <div class="detail-visual-corner tl"></div>
        <div class="detail-visual-corner tr"></div>
        <div class="detail-visual-corner bl"></div>
        <div class="detail-visual-corner br"></div>
      </div>
    </div>
    <div>
      <button class="detail-back" onclick="showView('main')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="15 18 9 12 15 6"/></svg>
        Volver a Colecciones
      </button>
      <div class="detail-category" id="detailCategory"></div>
      <h1 class="detail-name" id="detailName"></h1>
      <div class="detail-material" id="detailMaterial"></div>
      <div class="detail-price" id="detailPrice"></div>
      <p class="detail-desc" id="detailDesc"></p>
      <div class="detail-specs" id="detailSpecs"></div>
      <button class="detail-add" id="detailAddBtn">Añadir a la Bolsa</button>
      <p class="detail-note">Envío gratuito a partir de €120 · Devolución en 30 días</p>
      <div class="detail-tags">
        <span class="tag">Vegano</span>
        <span class="tag">Sostenible</span>
        <span class="tag">Hecho a Mano</span>
      </div>
    </div>
  </div>

  <div class="related-section">
    <div style="max-width:1100px;margin:0 auto;">
      <div class="section-header" style="margin-bottom:0">
        <span class="section-eyebrow">También te puede interesar</span>
        <h2 class="section-title" style="font-size:30px">Otras <em>Piezas</em></h2>
        <div class="section-rule"></div>
      </div>
    </div>
    <div class="related-grid" id="relatedGrid"></div>
  </div>
</div>

<!-- CART BACKDROP -->
<div class="cart-backdrop" id="cartBackdrop" onclick="closeCart()"></div>

<!-- CART DRAWER -->
<div class="cart-drawer" id="cartDrawer">
  <div class="cart-head">
    <h3>Tu Bolsa</h3>
    <button class="cart-close" onclick="closeCart()">✕</button>
  </div>
  <div class="cart-items" id="cartItems"></div>
  <div class="cart-foot">
    <div class="cart-total">
      <span class="cart-total-label">Total</span>
      <span class="cart-total-amount" id="cartTotal">€0.00</span>
    </div>
    <button class="cart-checkout" onclick="openPayment()">Proceder al Pago</button>
  </div>
</div>

<!-- PAYMENT MODAL -->
<div class="modal-backdrop" id="paymentModal">
  <div class="modal" id="paymentModalInner">
    <button class="modal-close" onclick="closePayment()">✕</button>
    <div id="paymentForm">
      <h2>Pago Seguro</h2>
      <p class="modal-sub">Liliana Ruiz · Barcelona</p>
      <div class="card-preview" id="cardPreview">
        <div class="card-num" id="cardNumDisplay">•••• •••• •••• ••••</div>
        <div class="card-bottom">
          <span id="cardNameDisplay">NOMBRE TITULAR</span>
          <span id="cardExpDisplay">MM/AA</span>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section-title">Contacto</div>
        <input type="email" placeholder="correo@ejemplo.com" style="margin-bottom:8px"/>
      </div>
      <div class="form-section">
        <div class="form-section-title">Dirección de Envío</div>
        <div class="field-row">
          <div class="field"><input type="text" placeholder="Nombre"/></div>
          <div class="field"><input type="text" placeholder="Apellidos"/></div>
        </div>
        <input type="text" placeholder="Dirección" style="width:100%;margin-bottom:8px"/>
        <div class="field-row">
          <div class="field"><input type="text" placeholder="Ciudad"/></div>
          <div class="field" style="max-width:100px"><input type="text" placeholder="CP"/></div>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section-title">Pago</div>
        <input type="text" id="cardNumInput" placeholder="Número de tarjeta" maxlength="19" style="width:100%;margin-bottom:8px"/>
        <div class="field-row">
          <div class="field"><input type="text" id="cardNameInput" placeholder="Titular"/></div>
          <div class="field" style="max-width:80px"><input type="text" id="cardExpInput" placeholder="MM/AA" maxlength="5"/></div>
          <div class="field" style="max-width:64px"><input type="text" placeholder="CVV" maxlength="3"/></div>
        </div>
      </div>
      <div class="form-section">
        <div class="form-section-title">Resumen del Pedido</div>
        <div id="orderLines"></div>
        <div class="order-total-row">
          <span>Total</span><span id="orderTotal">€0.00</span>
        </div>
      </div>
      <button class="modal-submit" onclick="completePurchase()">Completar Compra</button>
      <p class="modal-secure">🔒 Cifrado y seguro · Protegido con SSL</p>
    </div>
    <div id="paymentSuccess" class="success-view hide">
      <div class="success-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A8896A" stroke-width="1.5"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h2>Gracias</h2>
      <p>Tu pedido ha sido recibido con cuidado.</p>
      <small>La confirmación se ha enviado a tu correo.<br>Tu joyería vegana y sostenible llegará en 3–5 días hábiles,<br>envuelta con mimo desde Barcelona.</small>
      <button class="modal-submit" onclick="finishPurchase()">Seguir Comprando</button>
    </div>
  </div>
</div>

<script>
// ─── DATA ────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id:1, name:"Plumas", category:"broches",
    price:140, material:"Porcelana y Plata de Ley Reciclada",
    isNew:true,
    desc:"Inspirado en la ligereza del vuelo, este broche escultural de porcelana evoca dos alas en reposo. Fabricado a mano en nuestro taller de Barcelona. Pieza única de joyería de autor.",
    specs:{ Técnica:"Modelado a mano", Material:"Porcelana, plata 925", Peso:"18g", Medidas:"9 × 6 cm", Acabado:"Mate satinado", Edición:"Limitada 12 uds" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42,110 Q28,80 35,50 Q40,28 55,20 Q52,60 42,110Z" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.08)"/>
      <path d="M42,110 Q36,80 40,50 Q44,30 54,22" stroke="#C4A882" stroke-width="0.7" fill="none" stroke-dasharray="2,3"/>
      <path d="M40,110 Q30,82 36,54 Q40,36 50,26" stroke="#C4A882" stroke-width="0.5" fill="none" stroke-dasharray="2,3"/>
      <path d="M78,110 Q92,80 85,50 Q80,28 65,20 Q68,60 78,110Z" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.08)"/>
      <path d="M78,110 Q84,80 80,50 Q76,30 66,22" stroke="#C4A882" stroke-width="0.7" fill="none" stroke-dasharray="2,3"/>
      <path d="M80,110 Q90,82 84,54 Q80,36 70,26" stroke="#C4A882" stroke-width="0.5" fill="none" stroke-dasharray="2,3"/>
      <ellipse cx="60" cy="112" rx="8" ry="3" stroke="#A8896A" stroke-width="1"/>
    </svg>`
  },
  {
    id:2, name:"Cuarzo Negro", category:"pendientes",
    price:95, material:"Plata Oxidada y Cuarzo Natural",
    isNew:false,
    desc:"Pendientes colgantes de plata oxidada que suspenden cristales de cuarzo negro en tensión perfecta. La oscuridad del metal contrasta con la mineralidad de la piedra en un equilibrio austero.",
    specs:{ Técnica:"Fundición y pulido", Material:"Plata 925 oxidada, cuarzo", Peso:"6g cada uno", Longitud:"7 cm", Acabado:"Oxidado negro", Edición:"Serie 30 uds" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="38" y1="20" x2="38" y2="90" stroke="#3A3028" stroke-width="1.5"/>
      <line x1="82" y1="20" x2="82" y2="90" stroke="#3A3028" stroke-width="1.5"/>
      <circle cx="38" cy="16" r="4" stroke="#A8896A" stroke-width="1.2" fill="none"/>
      <circle cx="82" cy="16" r="4" stroke="#A8896A" stroke-width="1.2" fill="none"/>
      <polygon points="38,90 28,112 38,108 48,112" stroke="#3A3028" stroke-width="1.2" fill="rgba(58,48,40,.2)"/>
      <polygon points="82,90 72,112 82,108 92,112" stroke="#3A3028" stroke-width="1.2" fill="rgba(58,48,40,.2)"/>
      <line x1="28" y1="112" x2="38" y2="108" stroke="#A8896A" stroke-width="0.8"/>
      <line x1="38" y1="108" x2="48" y2="112" stroke="#A8896A" stroke-width="0.8"/>
      <line x1="72" y1="112" x2="82" y2="108" stroke="#A8896A" stroke-width="0.8"/>
      <line x1="82" y1="108" x2="92" y2="112" stroke="#A8896A" stroke-width="0.8"/>
    </svg>`
  },
  {
    id:3, name:"Órbita", category:"anillos",
    price:78, material:"Plata Oxidada y Cristal",
    isNew:false,
    desc:"Un anillo que redefine la proporción. El aro de plata oxidada de diámetro inusual abraza un cristal facetado en su base, creando una pieza que habita entre la joya y el objeto de arte.",
    specs:{ Técnica:"Forja y soldadura", Material:"Plata 925 oxidada, cristal", Peso:"12g", Talla:"Personalizable", Acabado:"Oxidado mate", Edición:"Serie abierta" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="62" r="38" stroke="#2A2019" stroke-width="2"/>
      <circle cx="60" cy="62" r="30" stroke="#5A4532" stroke-width="1" stroke-dasharray="3,2"/>
      <polygon points="60,88 50,106 60,102 70,106" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.2)"/>
      <line x1="50" y1="106" x2="60" y2="102" stroke="#C4A882" stroke-width="0.8"/>
      <line x1="60" y1="102" x2="70" y2="106" stroke="#C4A882" stroke-width="0.8"/>
    </svg>`
  },
  {
    id:4, name:"Poliedros", category:"broches",
    price:115, material:"Aluminio Reciclado y Resina",
    isNew:true,
    desc:"Colección de broches geométricos inspirados en sólidos platónicos. Cada pieza representa una faceta distinta de la forma perfecta. Disponibles en conjunto o individualmente.",
    specs:{ Técnica:"Origami metálico", Material:"Aluminio reciclado, resina", Peso:"8-14g", Medidas:"2–5 cm", Acabado:"Pulido espejo", Edición:"Limitada 20 conjuntos" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="28,55 48,40 68,55 68,78 48,92 28,78" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.08)"/>
      <polygon points="48,40 68,55 58,50" stroke="#C4A882" stroke-width="0.7" fill="rgba(196,168,130,.12)"/>
      <polygon points="68,55 68,78 63,66" stroke="#C4A882" stroke-width="0.7" fill="rgba(196,168,130,.12)"/>
      <polygon points="75,72 90,60 100,72 90,84" stroke="#A8896A" stroke-width="1.1" fill="rgba(168,137,106,.1)"/>
      <polygon points="20,90 34,82 34,98" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.1)"/>
      <polygon points="78,100 90,94 96,102 84,110" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.08)"/>
    </svg>`
  },
  {
    id:5, name:"Espiral", category:"esculturas",
    price:165, material:"Cerámica de Alta Temperatura",
    isNew:false,
    desc:"Pieza escultórica que explora la forma espiral en cerámica de alta temperatura. Puede usarse como broche de gran formato o como objeto de escritorio. La frontera entre joya y escultura.",
    specs:{ Técnica:"Torno y modelado", Material:"Cerámica feldespática", Peso:"45g", Medidas:"6 × 6 cm", Acabado:"Esmalte blanco seda", Edición:"Única" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M60,95 Q85,95 85,70 Q85,45 60,45 Q42,45 42,65 Q42,80 55,80 Q65,80 65,70 Q65,63 60,63" stroke="#A8896A" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="60" cy="95" rx="20" ry="6" stroke="#C4A882" stroke-width="0.8" fill="none"/>
      <ellipse cx="60" cy="95" rx="12" ry="3.5" stroke="#C4A882" stroke-width="0.6" fill="none"/>
    </svg>`
  },
  {
    id:6, name:"Constelación", category:"pendientes",
    price:88, material:"Plata de Ley 925 y Hilo Orgánico",
    isNew:false,
    desc:"Pendientes de plata esterlina con formas geométricas perforadas que crean sombras de luz sobre la piel. Una exploración del espacio negativo como elemento de diseño.",
    specs:{ Técnica:"Corte y perforado", Material:"Plata 925, hilo de seda vegana", Peso:"4g cada uno", Longitud:"5 cm", Acabado:"Pulido natural", Edición:"Serie 25 uds" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="38,30 46,50 30,50" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.08)"/>
      <polygon points="82,30 90,50 74,50" stroke="#A8896A" stroke-width="1.2" fill="rgba(168,137,106,.08)"/>
      <polygon points="38,55 50,80 26,80" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.06)"/>
      <polygon points="82,55 94,80 70,80" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.06)"/>
      <line x1="38" y1="28" x2="38" y2="20" stroke="#A8896A" stroke-width="1"/>
      <line x1="82" y1="28" x2="82" y2="20" stroke="#A8896A" stroke-width="1"/>
      <circle cx="38" cy="16" r="3" stroke="#A8896A" stroke-width="1" fill="none"/>
      <circle cx="82" cy="16" r="3" stroke="#A8896A" stroke-width="1" fill="none"/>
      <line x1="38" y1="80" x2="38" y2="100" stroke="#C4A882" stroke-width="0.8" stroke-dasharray="2,2"/>
      <line x1="82" y1="80" x2="82" y2="100" stroke="#C4A882" stroke-width="0.8" stroke-dasharray="2,2"/>
      <circle cx="38" cy="103" r="2" fill="#A8896A"/>
      <circle cx="82" cy="103" r="2" fill="#A8896A"/>
    </svg>`
  },
  {
    id:7, name:"Mineral", category:"anillos",
    price:68, material:"Plata de Ley Reciclada",
    isNew:false,
    desc:"Anillo de plata esterlina reciclada con acabado escarchado que evoca la superficie de un mineral bruto. La imperfección como perfección: cada pieza es única en su textura.",
    specs:{ Técnica:"Fundición en arena", Material:"Plata 925 reciclada", Peso:"9g", Talla:"12–20 (personalizable)", Acabado:"Mate escarchado", Edición:"Serie abierta" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="70" r="32" stroke="#A8896A" stroke-width="1.5"/>
      <circle cx="60" cy="70" r="24" stroke="#C4A882" stroke-width="0.7"/>
      <path d="M40,56 L54,48 L68,56 L72,70 L68,84 L54,92 L40,84 L36,70 Z" stroke="#C4A882" stroke-width="0.5" fill="none"/>
      <circle cx="60" cy="70" r="5" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.2)"/>
    </svg>`
  },
  {
    id:8, name:"Vértice", category:"esculturas",
    price:195, material:"Porcelana y Hilo de Oro 14k Reciclado",
    isNew:true,
    desc:"Broche escultórico de porcelana blanca con hilo de oro entretejido. La contradicción entre fragilidad y permanencia. Cada pieza tarda tres días en completarse.",
    specs:{ Técnica:"Modelado y bordado", Material:"Porcelana, oro 14k reciclado", Peso:"22g", Medidas:"7 × 7 cm", Acabado:"Biscuit mate", Edición:"Limitada 8 uds" },
    svg: `<svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="60,18 102,92 18,92" stroke="#A8896A" stroke-width="1.4" fill="rgba(168,137,106,.05)"/>
      <polygon points="60,32 90,82 30,82" stroke="#C4A882" stroke-width="0.8" fill="none"/>
      <line x1="60" y1="18" x2="60" y2="92" stroke="#C4A882" stroke-width="0.6" stroke-dasharray="2,4"/>
      <line x1="18" y1="92" x2="102" y2="92" stroke="#C4A882" stroke-width="0.6" stroke-dasharray="2,4"/>
      <circle cx="60" cy="55" r="4" stroke="#A8896A" stroke-width="1" fill="rgba(168,137,106,.3)"/>
      <path d="M50,70 Q60,50 70,70" stroke="#C4A882" stroke-width="0.8" fill="none"/>
    </svg>`
  },
];

const FILTERS = [
  { key:'all', label:'Todo' },
  { key:'pendientes', label:'Pendientes' },
  { key:'anillos', label:'Anillos' },
  { key:'broches', label:'Broches' },
  { key:'esculturas', label:'Esculturas' },
];

const TICKER_ITEMS = [
  "Joyería de Autor","·","Hecha en Barcelona","·","100% Vegana","·",
  "Materiales Sostenibles","·","Pendientes Artesanales","·","Plata Reciclada","·","Diseño Contemporáneo","·",
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let cart = [];
let activeFilter = 'all';
let currentProduct = null;

// ─── INIT ────────────────────────────────────────────────────────────────────
function init() {
  buildTicker();
  buildFilters();
  renderGrid();
}

function buildTicker() {
  const inner = document.getElementById('tickerInner');
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  inner.innerHTML = items.map(i =>
    `<span class="${i==='·'?'dot':''}">${i}</span>`
  ).join('');
}

function buildFilters() {
  const bar = document.getElementById('filterBar');
  bar.innerHTML = FILTERS.map(f =>
    `<button class="filter-btn ${f.key===activeFilter?'active':''}" onclick="setFilter('${f.key}')">${f.label}</button>`
  ).join('');
}

function setFilter(key) {
  activeFilter = key;
  buildFilters();
  renderGrid();
  showView('main');
  setTimeout(()=>scrollTo('collections'), 100);
}

function renderGrid() {
  const filtered = activeFilter==='all' ? PRODUCTS : PRODUCTS.filter(p=>p.category===activeFilter);
  document.getElementById('productGrid').innerHTML = filtered.map(p => `
    <div class="product-card" onclick="openProduct(${p.id})">
      <div class="product-thumb">
        ${p.svg}
        <div class="product-badges">
          ${p.isNew ? '<span class="badge badge-new">Nuevo</span>' : ''}
          <span class="badge badge-eco">Eco</span>
        </div>
        <div class="product-overlay">
          <button onclick="event.stopPropagation(); addToCart(${p.id})">Añadir a Bolsa</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${p.material}</div>
        <div class="product-price">€${p.price}</div>
      </div>
    </div>
  `).join('');
}

// ─── PRODUCT DETAIL ──────────────────────────────────────────────────────────
function openProduct(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  currentProduct = p;

  document.getElementById('detailVisual').innerHTML = `
    ${p.svg}
    <div class="detail-visual-corner tl"></div>
    <div class="detail-visual-corner tr"></div>
    <div class="detail-visual-corner bl"></div>
    <div class="detail-visual-corner br"></div>
  `;
  document.getElementById('detailCategory').textContent = p.category.charAt(0).toUpperCase()+p.category.slice(1);
  document.getElementById('detailName').innerHTML = p.name.includes(' ')
    ? p.name.replace(' ','<br><em>') + '</em>'
    : p.name;
  document.getElementById('detailMaterial').textContent = p.material;
  document.getElementById('detailPrice').textContent = '€' + p.price;
  document.getElementById('detailDesc').textContent = p.desc;
  document.getElementById('detailAddBtn').onclick = () => { addToCart(p.id); };

  const specs = document.getElementById('detailSpecs');
  specs.innerHTML = Object.entries(p.specs).map(([k,v]) => `
    <div class="detail-spec">
      <div class="detail-spec-label">${k}</div>
      <div class="detail-spec-value">${v}</div>
    </div>
  `).join('');

  // Related: 4 random others
  const others = PRODUCTS.filter(x=>x.id!==id).sort(()=>Math.random()-.5).slice(0,4);
  document.getElementById('relatedGrid').innerHTML = others.map(op => `
    <div class="product-card" onclick="openProduct(${op.id})">
      <div class="product-thumb">
        ${op.svg}
        <div class="product-overlay">
          <button onclick="event.stopPropagation(); addToCart(${op.id})">Añadir a Bolsa</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${op.name}</div>
        <div class="product-meta">${op.material}</div>
        <div class="product-price">€${op.price}</div>
      </div>
    </div>
  `).join('');

  showView('detail');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ─── VIEW MANAGEMENT ─────────────────────────────────────────────────────────
function showView(which) {
  document.getElementById('main-view').style.display = which==='main' ? '' : 'none';
  document.getElementById('product-detail').style.display = which==='detail' ? 'block' : 'none';
  if (which==='main') window.scrollTo({top:0,behavior:'smooth'});
}

function scrollTo(id) {
  setTimeout(()=>{
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior:'smooth'});
  }, 50);
}

// ─── CART ─────────────────────────────────────────────────────────────────────
function addToCart(id) {
  const p = PRODUCTS.find(x=>x.id===id);
  if (!p) return;
  const existing = cart.find(i=>i.id===id);
  if (existing) existing.qty++;
  else cart.push({...p, qty:1});
  updateCartUI();
  toast(`${p.name} añadido a la bolsa`);
}

function removeFromCart(id) {
  cart = cart.filter(i=>i.id!==id);
  updateCartUI();
}

function changeQty(id, d) {
  const item = cart.find(i=>i.id===id);
  if (!item) return;
  item.qty += d;
  if (item.qty<=0) cart = cart.filter(i=>i.id!==id);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s,i)=>s+i.qty,0);
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('bagCount').textContent = count;
  document.getElementById('cartTotal').textContent = `€${total.toFixed(2)}`;

  const items = document.getElementById('cartItems');
  if (cart.length===0) {
    items.innerHTML = `<div class="cart-empty"><p>Tu bolsa está vacía.<br>Descubre algo hermoso.</p></div>`;
  } else {
    items.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-thumb">${item.svg}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">€${(item.price*item.qty).toFixed(2)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">Eliminar</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function openCart() {
  document.getElementById('cartBackdrop').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartBackdrop').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── PAYMENT ─────────────────────────────────────────────────────────────────
function openPayment() {
  if (cart.length===0) { toast('Tu bolsa está vacía'); return; }
  closeCart();
  buildOrderSummary();
  document.getElementById('paymentForm').classList.remove('hide');
  document.getElementById('paymentSuccess').classList.add('hide');
  document.getElementById('paymentModal').classList.add('open');
}

function closePayment() {
  document.getElementById('paymentModal').classList.remove('open');
  document.getElementById('cardNumInput').value='';
  document.getElementById('cardNameInput').value='';
  document.getElementById('cardExpInput').value='';
  document.getElementById('cardNumDisplay').textContent='•••• •••• •••• ••••';
  document.getElementById('cardNameDisplay').textContent='NOMBRE TITULAR';
  document.getElementById('cardExpDisplay').textContent='MM/AA';
}

function buildOrderSummary() {
  const total = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('orderLines').innerHTML = cart.map(i=>
    `<div class="order-line"><span>${i.name} × ${i.qty}</span><span>€${(i.price*i.qty).toFixed(2)}</span></div>`
  ).join('');
  document.getElementById('orderTotal').textContent = `€${total.toFixed(2)}`;
}

function completePurchase() {
  document.getElementById('paymentForm').classList.add('hide');
  document.getElementById('paymentSuccess').classList.remove('hide');
}

function finishPurchase() {
  cart = [];
  updateCartUI();
  closePayment();
  toast('¡Pedido realizado! Gracias ✨');
}

// Card live preview
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('cardNumInput').addEventListener('input', e=>{
    let v = e.target.value.replace(/\D/g,'').substring(0,16);
    e.target.value = v.replace(/(.{4})/g,'$1 ').trim();
    document.getElementById('cardNumDisplay').textContent = e.target.value || '•••• •••• •••• ••••';
  });
  document.getElementById('cardNameInput').addEventListener('input', e=>{
    document.getElementById('cardNameDisplay').textContent = e.target.value.toUpperCase() || 'NOMBRE TITULAR';
  });
  document.getElementById('cardExpInput').addEventListener('input', e=>{
    document.getElementById('cardExpDisplay').textContent = e.target.value || 'MM/AA';
  });
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}

// ─── START ────────────────────────────────────────────────────────────────────
init();
</script>
</body>
</html>