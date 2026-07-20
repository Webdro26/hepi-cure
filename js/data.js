/* ===========================================================
   HEPI CURE — Sample Data (placeholder MVP data)
   Replace with Firestore reads in production.
   =========================================================== */

function img(seed, w=600, h=450){
  return "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'%3E%3Crect width='600' height='450' fill='%23F0E7D5'/%3E%3Ccircle cx='300' cy='190' r='82' fill='%23A65D3A' opacity='.16'/%3E%3Cpath d='M230 225h140c-8 64-37 92-70 92s-62-28-70-92Z' fill='%236F7D4E' opacity='.65'/%3E%3Ctext x='300' y='365' text-anchor='middle' font-family='Arial' font-size='28' fill='%236B5B4D'%3EHepi Cure%3C/text%3E%3C/svg%3E";
}

let CATEGORIES = JSON.parse(localStorage.getItem("hc_categories") || "null") || [
  { id:"breakfast", label:"Breakfast", icon:"images/aloo-paratha.png" },
  { id:"lunch", label:"Lunch", icon:"images/thali.png" },
  { id:"dinner", label:"Dinner", icon:"images/dinner-thali.png" },
  { id:"snacks", label:"Snacks", icon:"images/aloo-poha.png" },
];

const DEFAULT_MEALS = [
  // ---------------- BEST SELLERS ----------------
  { id:"gj-rajma-chawal", cat:"lunch", name:"Rajma Chawal", desc:"Kidney bean curry with steamed rice.", cal:380, protein:14, carbs:62, fat:8, price:100, ingredients:"Rajma, steamed rice, onion-tomato masala, ghee tempering", benefits:"Plant protein and fibre for gut health", img:"images/rajma-chawal.png" },
  { id:"gj-aloo-sabzi", cat:"lunch", name:"Aloo Sabzi", desc:"Home-style potato curry.", cal:220, protein:4, carbs:32, fat:9, price:80, ingredients:"Potato, tomato, cumin, turmeric, coriander", benefits:"Comforting home-style curry, easy on digestion", img:"images/aloo-sabzi.png" },
  { id:"gj-bhindi-sabzi", cat:"lunch", name:"Bhindi Sabzi", desc:"Okra tossed with onion and spices.", cal:180, protein:3, carbs:18, fat:10, price:80, ingredients:"Okra, onion, mustard seeds, turmeric, coriander", benefits:"Low calorie, rich in fibre and vitamin C", img:"images/bhindi-sabzi.png" },

  // ---------------- BREAKFAST ----------------
  { id:"gj-moong-chila", cat:"breakfast", name:"Moong Dal Chila", desc:"Savoury moong dal pancakes, 4 pieces.", cal:240, protein:13, carbs:28, fat:7, price:100, ingredients:"Moong dal, ginger, green chilli, coriander, onion", benefits:"Excellent vegetarian protein source, gluten-free", img:"images/moong-dal-chila.png" },
  { id:"gj-besan-chila", cat:"breakfast", name:"Besan Chila", desc:"Gram flour pancakes, 4 pieces.", cal:220, protein:9, carbs:26, fat:8, price:80, ingredients:"Besan, onion, green chilli, coriander, spices", benefits:"Protein-rich, quick and light breakfast", img:"images/besan-chila.png" },
  { id:"gj-idli-sambar", cat:"breakfast", name:"Idli Sambar", desc:"Steamed rice cakes with sambar, 4 pieces.", cal:260, protein:9, carbs:48, fat:4, price:100, ingredients:"Rice, urad dal, toor dal sambar, mixed vegetables, tamarind", benefits:"Steamed and low fat, gentle on the stomach", img:"images/idli-sambar.png" },
  { id:"gj-sandwich", cat:"breakfast", name:"Sandwich", desc:"Grilled veg sandwich, 4 pieces.", cal:300, protein:8, carbs:42, fat:10, price:100, ingredients:"Bread, mixed vegetables, chutney, butter", benefits:"Quick, filling and easy to carry", img:"images/sandwich.png" },
  { id:"gj-appe", cat:"breakfast", name:"Appe", desc:"Steamed rice & lentil dumplings, 2 pieces.", cal:200, protein:6, carbs:34, fat:5, price:100, ingredients:"Fermented rice & lentil batter, mustard seeds, curry leaves", benefits:"Fermented batter supports gut health", img:"images/appe.png" },
  { id:"gj-poha", cat:"breakfast", name:"Poha", desc:"Flattened rice tempered with peanuts & curry leaves.", cal:260, protein:5, carbs:44, fat:7, price:80, ingredients:"Poha, peanuts, onion, curry leaves, mustard seeds", benefits:"Easy to digest, iron-fortified rice base", img:"images/poha.png" },
  { id:"gj-bread-pakoda", cat:"breakfast", name:"Bread Pakoda", desc:"Spiced potato-stuffed bread fritters.", cal:320, protein:6, carbs:36, fat:16, price:80, ingredients:"Bread, potato filling, gram flour, spices", benefits:"Hearty, satisfying tea-time favourite", img:"images/bread-pakoda.png" },
  { id:"gj-aloo-paratha", cat:"breakfast", name:"Aloo Paratha", desc:"Stuffed potato flatbread, served with curd.", cal:340, protein:8, carbs:46, fat:13, price:90, ingredients:"Whole wheat flour, spiced potato filling, curd, ghee", benefits:"Filling, energy-dense breakfast classic", img:"images/aloo-paratha.png" },

  // ---------------- LUNCH ----------------
  { id:"gj-thali", cat:"lunch", name:"Thali", desc:"Sabzi + dal + roti + salad + raita.", cal:520, protein:16, carbs:76, fat:14, price:120, ingredients:"Seasonal sabzi, dal, roti, salad, raita", benefits:"Complete balanced meal in one plate", img:"images/thali.png" },
  { id:"gj-chefs-thali", cat:"lunch", name:"Chef's Thali", desc:"Chef's special daily thali.", cal:500, protein:15, carbs:72, fat:13, price:100, ingredients:"Chef's choice sabzi, dal, roti, rice, salad", benefits:"A fresh, balanced combo every day", img:"images/chefs-thali.png" },
  { id:"gj-moong-khichdi", cat:"lunch", name:"Moong Daal Khichdi", desc:"One-pot moong dal and rice, lightly spiced.", cal:380, protein:14, carbs:58, fat:8, price:80, ingredients:"Moong dal, rice, ghee, cumin, turmeric", benefits:"Easy digestion, balanced slow-release energy", img:"images/moong-khichdi.png" },
  { id:"gj-dahi-tadka", cat:"lunch", name:"Dahi Tadka Sabji", desc:"Yogurt-based curry with a light tempering.", cal:180, protein:6, carbs:14, fat:10, price:60, ingredients:"Curd, gram flour, mustard seeds, curry leaves", benefits:"Probiotic-rich, cooling and light", img:"images/dahi-tadka.png" },
  { id:"gj-chilly-paneer", cat:"lunch", name:"Chilly Paneer", desc:"Paneer tossed in a spicy chilly sauce.", cal:320, protein:16, carbs:20, fat:18, price:100, ingredients:"Paneer, capsicum, onion, chilly-garlic sauce", benefits:"High protein vegetarian favourite", img:"images/chilly-paneer.png" },
  { id:"gj-chilly-mushroom", cat:"lunch", name:"Chilly Mushroom", desc:"Mushroom tossed in a spicy chilly sauce.", cal:220, protein:7, carbs:18, fat:12, price:80, ingredients:"Mushroom, capsicum, onion, chilly-garlic sauce", benefits:"Low calorie, savoury and satisfying", img:"images/chilly-mushroom.png" },
  { id:"gj-crispy-corn", cat:"lunch", name:"Crispy Corn", desc:"Golden fried corn, tossed in spices.", cal:280, protein:5, carbs:34, fat:14, price:120, ingredients:"Corn kernels, cornflour, spices", benefits:"Crunchy, fibre-rich snack side", img:"images/crispy-corn.png" },
  { id:"gj-sun-special", cat:"lunch", name:"Sunday Special: Rajma Chawal", desc:"Rajma chawal with 4 roti & salad.", cal:480, protein:16, carbs:78, fat:10, price:100, ingredients:"Rajma, rice, roti, salad", benefits:"Wholesome weekend comfort meal", img:"images/rajma-chawal.png" },
  { id:"gj-mon-special", cat:"lunch", name:"Monday Special: Dal Chawal", desc:"Dal chawal with 4 roti & salad.", cal:460, protein:15, carbs:76, fat:8, price:100, ingredients:"Dal, rice, roti, salad", benefits:"Classic balanced combo, gentle on digestion", img:"images/dal-chawal.png" },
  { id:"gj-tue-special", cat:"lunch", name:"Tuesday Special: Kaale Chane", desc:"Kaale chane with 4 roti & salad.", cal:440, protein:16, carbs:70, fat:9, price:100, ingredients:"Black chickpeas, roti, salad, spices", benefits:"High plant protein and fibre", img:"images/kaale-chane.png" },
  { id:"gj-wed-special", cat:"lunch", name:"Wednesday Special: Dal Makhni", desc:"Dal makhni with chawal, 4 roti & salad.", cal:500, protein:15, carbs:68, fat:16, price:100, ingredients:"Black lentils, rajma, cream, butter, rice, roti", benefits:"Rich, creamy midweek indulgence", img:"images/dal-makhni.png" },
  { id:"gj-thu-special", cat:"lunch", name:"Thursday Special: Kadhi Chawal", desc:"Kadhi chawal with 4 roti & salad.", cal:420, protein:10, carbs:68, fat:10, price:100, ingredients:"Curd, gram flour, rice, roti, salad", benefits:"Tangy, light and easy to digest", img:"images/kadhi-chawal.png" },
  { id:"gj-fri-special", cat:"lunch", name:"Friday Special: Sambhar Chawal", desc:"Sambhar chawal served with idli.", cal:400, protein:10, carbs:70, fat:6, price:100, ingredients:"Toor dal sambar, rice, idli, vegetables", benefits:"Comforting South Indian favourite", img:"images/sambhar-chawal.png" },
  { id:"gj-sat-special", cat:"lunch", name:"Saturday Special: Chole Chawal", desc:"Chole chawal with 4 roti & salad.", cal:480, protein:15, carbs:78, fat:10, price:100, ingredients:"Chickpeas, rice, roti, salad, spices", benefits:"Hearty weekend favourite, protein-rich", img:"images/chole-chawal.png" },

  // ---------------- DINNER ----------------
  { id:"gj-dinner-thali", cat:"dinner", name:"Dinner Thali", desc:"Dal + sabzi + roti + chawal + salad/raita.", cal:460, protein:14, carbs:68, fat:12, price:120, ingredients:"Dal, sabzi, roti, rice, salad or raita", benefits:"Light, balanced plate to end the day", img:"images/dinner-thali.png" },

  // ---------------- SNACKS ----------------
  { id:"gj-aloo-poha", cat:"snacks", name:"Aloo-Poha", desc:"Flattened rice with potatoes, peanuts & spices.", cal:240, protein:4, carbs:38, fat:8, price:80, ingredients:"Poha, potato, peanuts, curry leaves, spices", benefits:"Light snack, easy on the stomach", img:"images/aloo-poha.png" },

];


let MEALS = JSON.parse(localStorage.getItem("hc_meals") || "null") || DEFAULT_MEALS.map(meal => ({...meal}));

const DEFAULT_PLANS = [
  {
    id:"hepicures-pick",
    number:"Plan 01 · AI-Curated",
    name:"The hepicure's Pick",
    subtitle:"AI-Curated",
    description:"Tell us what you love — our AI crafts a diet plan built entirely around your taste, cravings, and lifestyle. Healthy eating that feels indulgent, not like a compromise.",
    tags:["AI Diet Plan","Taste-First","Monthly Plan"],
    features:["AI Diet Plan","Taste-First","Monthly Plan"],
    icon:"curated",
    featured:false,
    buttonText:"I'm Interested",
    whatsappMessage:"Hello Hepi Cure, I'm interested in The hepicure's Pick subscription plan. Please share more details.",
    tagline:"AI-Curated · Taste-first personalised diet planning",
    price:0,
    period:""
  },
  {
    id:"your-food-your-way",
    number:"Plan 02 · Chat & Customise",
    name:"Your Food, Your Way",
    subtitle:"Chat & Customise",
    description:"Chat with our AI, share your health goals — PCOD, thyroid, gym, weight — and receive a tailored meal plan with every ingredient listed and calories counted.",
    tags:["PCOD · Thyroid · Gym","Calorie Tracked","Ingredients Included"],
    features:["PCOD · Thyroid · Gym","Calorie Tracked","Ingredients Included"],
    icon:"custom",
    featured:true,
    buttonText:"I'm Interested",
    whatsappMessage:"Hello Hepi Cure, I'm interested in the Your Food, Your Way subscription plan. Please share more details.",
    tagline:"Chat & Customise · Health-goal based meal planning",
    price:0,
    period:""
  },
  {
    id:"chefs-canvas",
    number:"Plan 03 · Chef's Table",
    name:"Chef's Canvas",
    subtitle:"Chef's Table",
    description:"A recipe from your grandmother's kitchen? Share it with us — our chef will cook it exactly as you know it, faithful and fresh, for the full length of your subscription.",
    tags:["Your Recipe","Our Chef","Full Duration"],
    features:["Your Recipe","Our Chef","Full Duration"],
    icon:"chef",
    featured:false,
    buttonText:"I'm Interested",
    whatsappMessage:"Hello Hepi Cure, I'm interested in the Chef's Canvas subscription plan. Please share more details.",
    tagline:"Chef's Table · Your own recipe prepared faithfully",
    price:0,
    period:""
  }
];

function normalisePlan(plan,index){
  const fallback = DEFAULT_PLANS[index] || DEFAULT_PLANS[0];
  const isLegacy = !plan || !plan.number || !plan.description || !Array.isArray(plan.tags);

  if(isLegacy){
    return {...fallback};
  }

  const tags = Array.isArray(plan.tags) && plan.tags.length
    ? plan.tags
    : (Array.isArray(plan.features) ? plan.features : fallback.tags);

  return {
    ...fallback,
    ...plan,
    id:plan.id || fallback.id,
    number:plan.number || fallback.number,
    name:plan.name || fallback.name,
    subtitle:plan.subtitle || fallback.subtitle,
    description:plan.description || fallback.description,
    tags,
    features:Array.isArray(plan.features) && plan.features.length ? plan.features : tags,
    icon:["curated","custom","chef"].includes(plan.icon) ? plan.icon : fallback.icon,
    featured:Boolean(plan.featured),
    buttonText:plan.buttonText || "I'm Interested",
    whatsappMessage:plan.whatsappMessage || fallback.whatsappMessage,
    tagline:plan.tagline || `${plan.subtitle || fallback.subtitle} · ${fallback.tagline.split("·").slice(1).join("·").trim()}`,
    price:0,
    period:""
  };
}

const storedPlans = JSON.parse(localStorage.getItem("hc_plans") || "null");
let PLANS = (Array.isArray(storedPlans) && storedPlans.length === DEFAULT_PLANS.length
  ? storedPlans.map(normalisePlan)
  : DEFAULT_PLANS.map(plan=>({...plan, tags:[...plan.tags], features:[...plan.features]}))
);

/* Automatically replace old Basic / Standard / Premium localStorage data. */
if(!Array.isArray(storedPlans) || storedPlans.some((plan,index)=>
  !plan?.number || !plan?.description || !Array.isArray(plan?.tags) ||
  ["Basic","Standard","Premium"].includes(plan?.name) ||
  plan?.id !== DEFAULT_PLANS[index]?.id
)){
  PLANS = DEFAULT_PLANS.map(plan=>({...plan, tags:[...plan.tags], features:[...plan.features]}));
  localStorage.setItem("hc_plans",JSON.stringify(PLANS));
}


const TESTIMONIALS = [
  { name:"Ananya Rao", role:"Standard Plan · 6 months", text:"Hepi Cure changed my relationship with food. The meals are genuinely tasty and I never feel like I'm 'dieting'.", img:img("indian woman portrait smiling",120,120) },
  { name:"Karthik Subramaniam", role:"Premium Plan · 1 year", text:"The diet consultation alone was worth it. My energy levels through the workday have completely turned around.", img:img("indian man portrait smiling",120,120) },
  { name:"Divya Menon", role:"Basic Plan · 3 months", text:"Ordering on WhatsApp is so convenient. Meals arrive on time, every single day, without fail.", img:img("indian woman smiling portrait",120,120) },
];

const FAQS = [
  { q:"How does the health assessment work?", a:"After registering, you'll be invited to fill a short Google Form covering your goals, allergies and preferences. Our nutrition team uses this to personalise your recommended meals. You can also skip it and complete it later from your profile." },
  { q:"How do I place an order?", a:"Choose a subscription plan or an individual meal, tap the WhatsApp button, and a pre-filled message is sent to our team. We confirm your order and delivery slot directly on WhatsApp — no separate app needed." },
  { q:"Can I pause or change my subscription?", a:"Yes. From your Subscription tab you can pause, resume, renew or upgrade your plan at any time. Just message us on WhatsApp and we'll action it immediately." },
  { q:"Do you offer refunds?", a:"Unused days on a paused subscription can be resumed at any time within 60 days. For specific refund requests, please reach out to our support team on WhatsApp." },
  { q:"Is there a payment gateway?", a:"Not currently — all payments and confirmations are handled directly through WhatsApp with our support team, keeping things simple and personal." },
];

const DEFAULT_WHATSAPP_NUMBER = "917300748429";

function getWhatsAppNumber(){
  return (localStorage.getItem("hc_whatsapp") || DEFAULT_WHATSAPP_NUMBER).replace(/\D/g, "");
}
function waLink(message){
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
