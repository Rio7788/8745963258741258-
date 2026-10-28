import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getFirestore,doc,onSnapshot} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ====== 1. PASTE YOUR FIREBASE CONFIG HERE (Firebase console > Project settings > Your apps > Web) ====== */
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID"
};
/* ========================================================================================================= */
export const WHATSAPP = "94789280918";
export const MAPS = "https://maps.app.goo.gl/sts6Jc5GBXbinUr2A";
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const L = {
 en:{home:'Home',menu:'Menu',cart:'Cart',eyebrow:'Fresh • Natural • Made daily',heroTitle:'Fresh Juices & Tasty Bites, Made Daily',heroSub:'Fruit juices, smoothies, cookies, biscuits and sandwiches. Pick your favourites and send your order on WhatsApp in a minute.',orderNow:'Order now',gallery:'Inside our shop',reviews:'Customer reviews',reviewsSub:'Visited us? Tell others what you think, or find the shop on the map.',reviewBtn:'Leave a Review / Get Directions on Google Maps',about:'About us',aboutText:'THARU Juice Bar is a neighbourhood stop for juices made from fresh fruit, with cookies, biscuits and sandwiches to go with them.',p1:'Truly fresh',p1d:'Fresh fruit, blended when you order.',p2:'Made your way',p2d:'Tell us your sugar and ice preference in the order notes.',p3:'Quick to order',p3d:'Build your cart and send it straight to our WhatsApp.',contact:'Get in touch',call:'Call us',chat:'Chat on WhatsApp',open:'Open now',closed:'Closed now',all:'All',juice:'Juices',smoothie:'Smoothies',snacks:'Snacks',bakery:'Bakery',add:'Add to cart',out:'Out of stock',added:'Added to cart',noItems:'No items here yet.',loading:'Loading…',yourCart:'Your cart',empty:'Your cart is empty. Add something from the menu.',details:'Your details',name:'Name',phone:'Phone number',address:'Address',notes:'Notes (sugar, ice, etc.)',send:'Send order on WhatsApp',total:'Total',remove:'Remove',closedMsg:"Sorry, we're closed right now. Please order when we reopen."},
 si:{home:'මුල් පිටුව',menu:'මෙනුව',cart:'කූඩය',eyebrow:'නැවුම් • ස්වාභාවික • දිනපතා සාදන',heroTitle:'නැවුම් පළතුරු යුෂ සහ රසවත් කෑම, දිනපතා',heroSub:'පළතුරු යුෂ, ස්මූතී, කුකීස්, බිස්කට් සහ සැන්ඩ්විච්. ඔබ කැමති දේ තෝරා විනාඩියකින් WhatsApp හරහා ඇණවුම යවන්න.',orderNow:'දැන්ම ඇණවුම් කරන්න',gallery:'අපේ කඩය',reviews:'පාරිභෝගික අදහස්',reviewsSub:'අපිව බැලුවාද? ඔබේ අදහස අන් අයට කියන්න, නැතිනම් සිතියමේ කඩය සොයාගන්න.',reviewBtn:'අදහසක් දමන්න / Google Maps හි මාර්ගය බලන්න',about:'අප ගැන',aboutText:'THARU Juice Bar යනු නැවුම් පළතුරු වලින් සාදන යුෂ සහ ඒවා සමඟ කුකීස්, බිස්කට්, සැන්ඩ්විච් ලබාගත හැකි ප්‍රදේශයේ කඩයයි.',p1:'සැබෑම නැවුම්',p1d:'ඔබ ඇණවුම් කරන විට නැවුම් පළතුරු වලින් සාදයි.',p2:'ඔබේ රුචියට',p2d:'සීනි සහ අයිස් ප්‍රමාණය ඇණවුම් සටහනේ සඳහන් කරන්න.',p3:'ඉක්මන් ඇණවුම',p3d:'කූඩය සකස් කර කෙලින්ම අපේ WhatsApp වෙත යවන්න.',contact:'අප අමතන්න',call:'ඇමතුමක් දෙන්න',chat:'WhatsApp හරහා කතා කරන්න',open:'දැන් විවෘතයි',closed:'දැන් වසා ඇත',all:'සියල්ල',juice:'යුෂ',smoothie:'ස්මූතී',snacks:'කෑම වර්ග',bakery:'බේකරි',add:'කූඩයට දමන්න',out:'තොග නැත',added:'කූඩයට එක් කළා',noItems:'තවම අයිතම නැත.',loading:'පූරණය වෙමින්…',yourCart:'ඔබේ කූඩය',empty:'ඔබේ කූඩය හිස්ය. මෙනුවෙන් යමක් එක් කරන්න.',details:'ඔබේ විස්තර',name:'නම',phone:'දුරකථන අංකය',address:'ලිපිනය',notes:'සටහන් (සීනි, අයිස් ආදිය)',send:'WhatsApp හරහා ඇණවුම යවන්න',total:'මුළු මුදල',remove:'ඉවත් කරන්න',closedMsg:'කණගාටුයි, අපි දැන් වසා ඇත. නැවත විවෘත කළ පසු ඇණවුම් කරන්න.'}
};
export let lang = localStorage.getItem('tharu_lang') || 'en';
export const t = k => (L[lang] && L[lang][k]) || L.en[k] || k;
export const nm = (o, f) => (lang === 'si' && o[f + 'Si']) || o[f + 'En'] || '';
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const shop = {open: true};

const P={leaf:'M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8',drop:'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',clock:'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z',star:'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',pin:'M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',cart:'M3 4h2l2.4 11h10l2-8H6.5M9 20h.01M17 20h.01',chat:'M4 20l1.3-4.2A8 8 0 1 1 8.3 18.7L4 20z',home:'M4 11l8-7 8 7v9h-5v-6H9v6H4z',cup:'M6 4h12l-1.5 16h-9zM7 9h10',moon:'M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z',phone:'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',heart:'M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z'};
export const ic = (n, s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${P[n]}"/></svg>`;

export const cart = {
  get(){ try { return JSON.parse(localStorage.getItem('tharu_cart')) || []; } catch { return []; } },
  set(c){ localStorage.setItem('tharu_cart', JSON.stringify(c)); badge(); }
};
function badge(){ const e = document.getElementById('cnt'); if (e) { const n = cart.get().reduce((s, i) => s + i.qty, 0); e.textContent = n; e.hidden = !n; } }

export function toast(m){
  const d = document.createElement('div'); d.className = 'toast'; d.textContent = m; document.body.append(d); setTimeout(() => d.remove(), 2200);
}

function banner(){
  const b = document.getElementById('banner'); if (!b) return;
  const note = shop['announcement' + (lang === 'si' ? 'Si' : 'En')] || shop.announcementEn || '';
  b.innerHTML = `<span class="pill ${shop.open ? '' : 'off'}">${t(shop.open ? 'open' : 'closed')}</span>${note ? `<span class="note">${esc(note)}</span>` : ''}`;
}

export function applyI18n(){
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll('[data-i18n-ph]').forEach(e => e.placeholder = t(e.dataset.i18nPh));
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.l === lang));
  banner();
  dispatchEvent(new Event('langchange'));
}

export function init(page){
  const nav = [['home','index.html','home'],['menu','menu.html','cup'],['cart','cart.html','cart']];
  const h = document.createElement('header');
  h.innerHTML = `<a class="brand" href="index.html"><img src="images/logo001.png" alt="THARU Juice Bar logo"><span>THARU<small>Juice Bar</small></span></a>
  <nav class="nav glass" aria-label="Main">${nav.map(([k,u,i]) => `<a href="${u}" class="${page===k?'on':''}">${ic(i,20)}<span data-i18n="${k}"></span>${k==='cart'?'<b id="cnt" class="cnt" hidden>0</b>':''}</a>`).join('')}</nav>
  <div class="tools"><div class="lang" role="group" aria-label="Language"><button data-l="si">සිංහල</button><button data-l="en">English</button></div><button id="theme" class="icon" aria-label="Dark / light mode">${ic('moon')}</button></div>`;
  const b = document.createElement('div'); b.id = 'banner'; b.className = 'banner';
  document.body.prepend(h, b);
  h.querySelectorAll('.lang button').forEach(x => x.onclick = () => { lang = x.dataset.l; localStorage.setItem('tharu_lang', lang); applyI18n(); });
  h.querySelector('#theme').onclick = () => { const n = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; localStorage.setItem('tharu_theme', n); };
  badge(); applyI18n();
  try {
    onSnapshot(doc(db, 'settings', 'shop'), s => { Object.assign(shop, {open: true}, s.data() || {}); banner(); dispatchEvent(new Event('shopchange')); }, () => {});
  } catch (e) { /* Firebase not configured yet */ }
}
