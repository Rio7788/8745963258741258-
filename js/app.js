/* ===== EDIT YOUR SHOP DETAILS HERE (all sample data) ===== */
const SHOP={name:"Sunny Sip Juice Bar",phone:"077 000 0000",wa:"94770000000",addr:"123 Main Street, Colombo (sample address)",hours:"Daily 8:00 AM – 9:00 PM"};
const CATS={juice:["Fresh Juices","#FFB84D"],smoothie:["Smoothies","#FF8FA3"],sandwich:["Sandwiches","#B5E84A"],treat:["Cookies & Cake","#F2C9A0"]};
const MENU=[
{id:1,cat:"juice",n:"Orange Sunrise",p:450,e:"🍊",d:"Freshly squeezed oranges, nothing added."},
{id:2,cat:"juice",n:"Watermelon Splash",p:400,e:"🍉",d:"Chilled watermelon with a squeeze of lime."},
{id:3,cat:"juice",n:"Pineapple Zing",p:450,e:"🍍",d:"Sweet pineapple with a hint of ginger."},
{id:4,cat:"juice",n:"Green Glow",p:550,e:"🥝",d:"Apple, cucumber, kiwi and mint."},
{id:5,cat:"smoothie",n:"Mango Cloud",p:650,e:"🥭",d:"Ripe mango, yoghurt and honey."},
{id:6,cat:"smoothie",n:"Berry Blast",p:700,e:"🍓",d:"Strawberry, banana and mixed berries."},
{id:7,cat:"smoothie",n:"Banana Oat",p:600,e:"🍌",d:"Banana, oats, milk and cinnamon."},
{id:8,cat:"sandwich",n:"Egg & Cheese Sandwich",p:500,e:"🥪",d:"Soft egg, cheese and lettuce on toasted bread."},
{id:9,cat:"sandwich",n:"Chicken Club",p:750,e:"🥪",d:"Grilled chicken, tomato and creamy mayo."},
{id:10,cat:"treat",n:"Choc Chip Cookie",p:200,e:"🍪",d:"Baked this morning, soft in the middle."},
{id:11,cat:"treat",n:"Butter Cake Slice",p:300,e:"🍰",d:"Light vanilla butter cake."}];

const $=(s,r=document)=>r.querySelector(s);
const rs=n=>"Rs. "+n.toLocaleString("en-US");
const wa=t=>"https://wa.me/"+SHOP.wa+"?text="+encodeURIComponent(t);
let cart={};try{cart=JSON.parse(localStorage.cart||"{}")}catch(e){}
function save(){try{localStorage.cart=JSON.stringify(cart)}catch(e){}count()}
function count(){const el=$("#cc");if(el)el.textContent=Object.values(cart).reduce((a,b)=>a+b,0)}
function add(id,d=1){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save()}

function icon(){const d=document.documentElement.dataset.theme=="dark",b=$("#mode");if(b){b.textContent=d?"☀️":"🌙";b.setAttribute("aria-label",d?"Switch to light mode":"Switch to dark mode")}}
function chrome(){
 const pg=location.pathname.split("/").pop()||"index.html";
 const nav=[["index.html","Home","🏠"],["menu.html","Menu","🍹"],["about.html","Our story","🍊"],["contact.html","Contact","📍"]];
 $("#top").innerHTML=`<div class="wrap"><a class="logo" href="index.html">🍹 ${SHOP.name}</a><nav aria-label="Main">${nav.map(([h,t,i])=>`<a href="${h}"${h==pg?' class="on"':""}><span class="ni" aria-hidden="true">${i}</span><span>${t}</span></a>`).join("")}<a class="cart${pg=="cart.html"?" on":""}" href="cart.html"><span class="ni" aria-hidden="true">🛒</span><span>Cart <span id="cc">0</span></span></a></nav><button class="mode" id="mode" type="button"></button></div>`;
 $("#foot").innerHTML=`<div class="wrap"><div><b>${SHOP.name}</b><br>Fresh, fruity and feel-good.</div><div>${SHOP.hours}<br>${SHOP.phone}</div><div><a href="${wa("Hi "+SHOP.name+"!")}">Message us on WhatsApp</a></div></div>`;
 document.querySelectorAll("[data-shop]").forEach(el=>el.textContent=SHOP[el.dataset.shop]);
 document.querySelectorAll("[data-wa]").forEach(el=>el.href=wa("Hi "+SHOP.name+"!"));
 count();icon();
}
const card=m=>`<article class="item"><div class="ic" style="--c:${CATS[m.cat][1]}">${m.e}</div><h3>${m.n}</h3><p>${m.d}</p><div class="row"><span class="price">${rs(m.p)}</span><button class="btn add" data-id="${m.id}">Add</button></div></article>`;

function drawMenu(cat){
 $("#tabs").innerHTML=[["all","All"],...Object.entries(CATS).map(([k,v])=>[k,v[0]])].map(([k,t])=>`<button data-cat="${k}"${k==cat?' class="on"':""}>${t}</button>`).join("");
 $("#menu").innerHTML=MENU.filter(m=>cat=="all"||m.cat==cat).map(card).join("");
}
function drawCart(){
 const ids=Object.keys(cart),box=$("#cartbox");let t=0;
 $("#checkout").hidden=!ids.length;
 if(!ids.length){box.innerHTML='<p>Your cart is empty. <a href="menu.html">Pick something fresh from the menu.</a></p>';return}
 box.innerHTML=ids.map(id=>{const m=MENU.find(x=>x.id==id),s=m.p*cart[id];t+=s;
  return `<div class="line"><span class="ic sm" style="--c:${CATS[m.cat][1]}">${m.e}</span><span class="nm"><b>${m.n}</b><br>${rs(m.p)} each</span><span class="qty"><button data-id="${id}" data-d="-1" aria-label="Remove one">−</button> ${cart[id]} <button data-id="${id}" data-d="1" aria-label="Add one">+</button></span><b>${rs(s)}</b></div>`}).join("")+`<p class="total">Total: ${rs(t)}</p>`;
 $("#order").href=wa(`New order for ${SHOP.name}\nName: ${$("#cn").value||"-"}\n`+ids.map(id=>{const m=MENU.find(x=>x.id==id);return `${cart[id]} x ${m.n} = ${rs(m.p*cart[id])}`}).join("\n")+`\nTotal: ${rs(t)}`);
}

document.addEventListener("click",e=>{
 if(e.target.closest("#mode")){const t=document.documentElement.dataset.theme=="dark"?"light":"dark";document.documentElement.dataset.theme=t;try{localStorage.theme=t}catch(x){}icon();return}
 const c=e.target.closest("[data-cat]");
 if(c){drawMenu(c.dataset.cat);return}
 const b=e.target.closest("button[data-id]");if(!b)return;
 const id=+b.dataset.id;
 if(b.dataset.d){add(id,+b.dataset.d);drawCart();return}
 add(id);b.textContent="Added ✓";setTimeout(()=>b.textContent="Add",900);
});

chrome();
if($("#featured"))$("#featured").innerHTML=[1,5,8,10].map(id=>card(MENU.find(m=>m.id==id))).join("");
if($("#menu"))drawMenu("all");
if($("#cartbox")){drawCart();$("#cn").addEventListener("input",drawCart)}
if($("#cform"))$("#cform").addEventListener("submit",e=>{e.preventDefault();
 window.open(wa(`Hi ${SHOP.name}! I’m ${$("#nm").value}.\n${$("#msg").value}`),"_blank")});
