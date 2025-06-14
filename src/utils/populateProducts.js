// populateProducts.js
const mongoose = require("mongoose");
const Product = require("../models/productModel"); // adaptează calea dacă ai alt path

const MONGODB_URI = "mongodb_URI";


const products = [
  // Mic-dejun (6)
  {
    name: "Omletă cu șuncă",
    description: "Omletă pufoasă cu șuncă, servită cu salată verde",
    weight: 200,
    price: 18,
    category: "mic-dejun",
    stock: 20,
  },
  {
    name: "Iaurt cu fructe și cereale",
    description: "Iaurt proaspăt cu fructe de sezon și cereale crocante",
    weight: 250,
    price: 16,
    category: "mic-dejun",
    stock: 20,
  },
  {
    name: "Sandwich cu ou și legume",
    description: "Sandwich cu ou fiert, salată, roșii și castraveți",
    weight: 170,
    price: 15,
    category: "mic-dejun",
    stock: 18,
  },
  {
    name: "Croissant cu unt",
    description: "Croissant franțuzesc proaspăt cu unt",
    weight: 80,
    price: 10,
    category: "mic-dejun",
    stock: 22,
  },
  {
    name: "Pancakes cu miere",
    description: "Clătite americane cu miere naturală și fructe",
    weight: 180,
    price: 17,
    category: "mic-dejun",
    stock: 16,
  },
  {
    name: "Ouă ochiuri cu bacon",
    description: "Ouă ochiuri, bacon crocant, toast și legume",
    weight: 210,
    price: 20,
    category: "mic-dejun",
    stock: 20,
  },
  // Pranz (7)
  {
    name: "Ciorbă de burtă",
    description: "Ciorbă tradițională cu smântână și ardei iute",
    weight: 350,
    price: 22,
    category: "pranz",
    stock: 30,
  },
  {
    name: "Piept de pui la grătar",
    description: "Piept de pui fraged la grătar cu cartofi aurii",
    weight: 300,
    price: 30,
    category: "pranz",
    stock: 25,
  },
  {
    name: "Supă cremă de legume",
    description: "Supă fină din legume proaspete, servită cu crutoane",
    weight: 250,
    price: 16,
    category: "pranz",
    stock: 19,
  },
  {
    name: "Pulled pork cu cartofi wedges",
    description: "Carne de porc gătită lent, sos BBQ, cartofi wedges",
    weight: 330,
    price: 34,
    category: "pranz",
    stock: 17,
  },
  {
    name: "Salată Caesar cu pui",
    description: "Salată iceberg, piept de pui, dressing Caesar, crutoane",
    weight: 260,
    price: 27,
    category: "pranz",
    stock: 15,
  },
  {
    name: "Paste carbonara",
    description: "Paste cu sos carbonara, bacon și parmezan",
    weight: 280,
    price: 29,
    category: "pranz",
    stock: 22,
  },
  {
    name: "Pizza Margherita",
    description: "Blat subțire, sos roșii, mozzarella, busuioc",
    weight: 370,
    price: 28,
    category: "pranz",
    stock: 21,
  },
  // Cină (6)
  {
    name: "Burger vegetarian",
    description: "Chiflă artizanală, chiftea vegetală, legume proaspete",
    weight: 320,
    price: 28,
    category: "cina",
    stock: 15,
  },
  {
    name: "Somon la cuptor",
    description: "File de somon la cuptor cu legume sote",
    weight: 250,
    price: 40,
    category: "cina",
    stock: 10,
  },
  {
    name: "Tocăniță de vită",
    description: "Tocăniță cu carne de vită, cartofi și morcovi",
    weight: 320,
    price: 38,
    category: "cina",
    stock: 9,
  },
  {
    name: "Mămăligă cu brânză și smântână",
    description: "Mămăliguță, brânză telemea și smântână grasă",
    weight: 280,
    price: 19,
    category: "cina",
    stock: 14,
  },
  {
    name: "Focaccia cu rozmarin",
    description: "Focaccia de casă cu rozmarin și ulei de măsline",
    weight: 120,
    price: 11,
    category: "cina",
    stock: 12,
  },
  {
    name: "Paste cu creveți",
    description: "Paste cu creveți, usturoi și roșii cherry",
    weight: 270,
    price: 36,
    category: "cina",
    stock: 11,
  },
  // Desert (4)
  {
    name: "Clătite cu dulceață",
    description: "Clătite pufoase umplute cu dulceață de casă",
    weight: 150,
    price: 14,
    category: "desert",
    stock: 20,
  },
  {
    name: "Cheesecake cu fructe",
    description: "Cheesecake cremos cu topping de fructe de pădure",
    weight: 160,
    price: 18,
    category: "desert",
    stock: 16,
  },
  {
    name: "Papanași cu smântână și dulceață",
    description: "Papanași moldovenești, smântână, dulceață de afine",
    weight: 180,
    price: 21,
    category: "desert",
    stock: 15,
  },
  {
    name: "Tiramisu",
    description: "Tiramisu italian cu mascarpone și cafea",
    weight: 130,
    price: 17,
    category: "desert",
    stock: 14,
  },
  // Bauturi nealcoolice (4)
  {
    name: "Fresh portocale",
    description: "Suc proaspăt stors din portocale",
    weight: 250,
    price: 12,
    category: "bauturi-nealcoolice",
    stock: 40,
  },
  {
    name: "Apă minerală",
    description: "Apă minerală carbogazoasă, 500ml",
    weight: 500,
    price: 7,
    category: "bauturi-nealcoolice",
    stock: 50,
  },
  {
    name: "Coca-Cola 330ml",
    description: "Băutură răcoritoare carbogazoasă",
    weight: 330,
    price: 8,
    category: "bauturi-nealcoolice",
    stock: 32,
  },
  {
    name: "Limonadă cu mentă",
    description: "Limonadă de casă cu mentă proaspătă",
    weight: 350,
    price: 10,
    category: "bauturi-nealcoolice",
    stock: 27,
  },
  // Bauturi alcoolice (3)
  {
    name: "Bere blondă la sticlă",
    description: "Bere blondă rece, 500ml",
    weight: 500,
    price: 9,
    category: "bauturi-alcoolice",
    stock: 25,
  },
  {
    name: "Vin alb la pahar",
    description: "Vin alb demisec, 150ml",
    weight: 150,
    price: 11,
    category: "bauturi-alcoolice",
    stock: 18,
  },
  {
    name: "Whiskey cu gheață",
    description: "Whiskey single malt, servit cu cuburi de gheață",
    weight: 60,
    price: 18,
    category: "bauturi-alcoolice",
    stock: 10,
  },
];


async function populate() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Product.deleteMany(); // Șterge tot ca să nu faci duplicate
    await Product.insertMany(products);
    console.log("Produsele au fost inserate cu succes!");
  } catch (err) {
    console.error("Eroare la populare produse:", err);
  } finally {
    mongoose.disconnect();
  }
}

populate();
