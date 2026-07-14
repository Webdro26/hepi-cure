/* ===========================================================
   HEPI CURE — App Logic (MVP mock layer)
   NOTE: Auth/data below uses localStorage to simulate Firebase
   Authentication + Firestore for this offline-friendly MVP.
   Swap the functions in this file for real Firebase calls when
   you connect a live project (see README in project root).
   =========================================================== */

/* ---------- Theme ---------- */
(function initTheme(){
  const saved = localStorage.getItem("hc_theme");
  if(saved) document.documentElement.setAttribute("data-theme", saved);
})();

function toggleTheme(){
  const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = cur === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("hc_theme", next);
}

/* ---------- Toasts ---------- */
function toast(msg, type="success"){
  let wrap = document.querySelector(".toast-wrap");
  if(!wrap){ wrap = document.createElement("div"); wrap.className="toast-wrap"; document.body.appendChild(wrap); }
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span>${msg}</span>`;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity="0"; el.style.transform="translateX(30px)"; setTimeout(()=>el.remove(),300); }, 3200);
}

/* ---------- Mock Auth (localStorage) ---------- */
const Auth = {
  currentUser(){
    try{ return JSON.parse(localStorage.getItem("hc_user")); }catch(e){ return null; }
  },
  register({name,email,phone,password}){
    const users = JSON.parse(localStorage.getItem("hc_users") || "{}");
    if(users[email]) throw new Error("An account with this email already exists.");
    users[email] = { name, email, phone, password, assessmentDone:false, plan:null, createdAt:Date.now() };
    localStorage.setItem("hc_users", JSON.stringify(users));
    localStorage.setItem("hc_user", JSON.stringify(users[email]));
    return users[email];
  },
  login({email,password}){
    const users = JSON.parse(localStorage.getItem("hc_users") || "{}");
    const u = users[email];
    if(!u || u.password !== password) throw new Error("Invalid email or password.");
    localStorage.setItem("hc_user", JSON.stringify(u));
    return u;
  },
  logout(){ localStorage.removeItem("hc_user"); },
  updateCurrent(patch){
    const u = this.currentUser();
    if(!u) return;
    const merged = {...u, ...patch};
    localStorage.setItem("hc_user", JSON.stringify(merged));
    const users = JSON.parse(localStorage.getItem("hc_users") || "{}");
    if(users[u.email]){ users[u.email] = merged; localStorage.setItem("hc_users", JSON.stringify(users)); }
    return merged;
  },
  requireLogin(){
    if(!this.currentUser()){ window.location.href = "login.html"; }
  }
};

/* ---------- Nav scroll shadow ---------- */
window.addEventListener("scroll", ()=>{
  const nav = document.querySelector(".nav");
  if(nav) nav.classList.toggle("scrolled", window.scrollY > 8);
});

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{ threshold:0.12 });
  els.forEach(el=>io.observe(el));
}
document.addEventListener("DOMContentLoaded", initReveal);

/* ---------- FAQ accordion ---------- */
function initFaq(){
  document.querySelectorAll(".faq-item").forEach(item=>{
    item.querySelector(".faq-q").addEventListener("click", ()=>{
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item").forEach(i=>i.classList.remove("open"));
      if(!isOpen) item.classList.add("open");
    });
  });
}

/* ---------- Password visibility ---------- */
function initPassToggle(){
  document.querySelectorAll(".toggle-pass").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const input = btn.closest(".input-wrap").querySelector("input");
      input.type = input.type === "password" ? "text" : "password";
    });
  });
}


/* ---------- Fast local image fallback ---------- */
const HC_MEAL_FALLBACK = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23F0E7D5'/%3E%3Ccircle cx='300' cy='190' r='82' fill='%23A65D3A' opacity='.16'/%3E%3Cpath d='M230 225h140c-8 64-37 92-70 92s-62-28-70-92Z' fill='%236F7D4E' opacity='.65'/%3E%3Ctext x='300' y='365' text-anchor='middle' font-family='Arial' font-size='28' fill='%236B5B4D'%3EHepi Cure%3C/text%3E%3C/svg%3E";

function safeImageSrc(src){
  return typeof src === "string" && src.trim() ? src.trim() : HC_MEAL_FALLBACK;
}

function handleMealImageError(img){
  if(!img || img.dataset.fallbackApplied === "true") return;
  img.dataset.fallbackApplied = "true";
  img.onerror = null;
  img.src = HC_MEAL_FALLBACK;
}

/* ---------- Meal card rendering ---------- */
function macroRing(cal){
  const pct = Math.min(100, Math.round((cal/650)*100));
  return pct;
}

function mealCardHTML(m){
  return `
  <article class="meal-card reveal">
    <div class="meal-media">
      <img src="${safeImageSrc(m.img)}" alt="${m.name}" loading="lazy" decoding="async" fetchpriority="low" onerror="handleMealImageError(this)">
      <span class="meal-badge">${capitalize(m.cat)}</span>
      <button class="meal-fav" aria-label="Save meal" onclick="toast('Saved to favourites')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.6z"/></svg>
      </button>
    </div>
    <div class="meal-body">
      <h3>${m.name}</h3>
      <p class="desc">${m.desc}</p>
      <div class="meal-foot">
        <span class="price">₹${m.price}</span>
        <a class="wa-btn" href="#" onclick="return startMealOrder('${m.id}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.005c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z"/></svg>
          Order
        </a>
      </div>
    </div>
  </article>`;
}

function orderLink(m){
  const user = Auth.currentUser();
  const msg = `Hi Hepi Cure,\nI'd like to order:\n${m.name}\n\nName: ${user?.name || ""}\nPhone: ${user?.phone || ""}\nDelivery Time: \n\nThank you.`;
  return waLink(msg);
}

function startMealOrder(mealId){
  const meal = MEALS.find(item => item.id === mealId);
  if(!meal) return false;
  if(!Auth.currentUser()){
    sessionStorage.setItem("hc_pending_order", mealId);
    window.location.href = "register.html?redirect=order";
    return false;
  }
  window.location.href = orderLink(meal);
  return false;
}

function subscribeLink(planName){
  const msg = `Hi Hepi Cure,\nI would like to subscribe to the ${planName} Plan.\n\nMy Name: \nPhone Number: \n\nThank you.`;
  return waLink(msg);
}

function capitalize(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

/* ---------- Mobile nav (marketing pages) ---------- */
function initMobileNav(){
  const burger = document.querySelector(".nav-burger");
  const links = document.querySelector(".nav-links");
  if(!burger) return;
  burger.addEventListener("click", ()=> links.classList.toggle("open"));
}
