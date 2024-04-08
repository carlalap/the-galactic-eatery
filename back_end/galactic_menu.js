/* This script connects to mongoDB, creates, and populate a Database with 
* Galactic dishes..
* exec:  node galactic_menu.js
*/
const {MongoClient} = require('mongodb')

// connection to database
const uri = "mongodb://127.0.0.1:27017";


// database name
const dbName = 'galactic_menu';

// data to insert
const dishes = [
    {
      "name": "Cosmic Casserole",
      "description": "A flavorful casserole crafted from celestial ingredients found in distant galaxies.",
      "price": 29.99,
      "planet_of_origin": "Andromeda",
      "ingredients": ["Andromedan meatballs", "Galactic cheese", "Star sauce"]
    },
    {
      "name": "Lunar Lasagna",
      "description": "Layers of moon-made pasta with a rich lunar sauce, topped with stardust-infused cheese.",
      "price": 22.50,
      "planet_of_origin": "Luna",
      "ingredients": ["Lunar pasta", "Stardust cheese", "Moon sauce"]
    },
    {
      "name": "Solar System Stir-Fry",
      "description": "A colorful stir-fry featuring an array of vegetables harvested from across the solar system.",
      "price": 18.99,
      "planet_of_origin": "Earth",
      "ingredients": ["Martian carrots", "Jupiterian peppers", "Saturnian broccoli"]
    },
    {
      "name": "Andromedan Stew",
      "description": "A hearty stew made with exotic meats and spices from the Andromeda galaxy.",
      "price": 32.75,
      "planet_of_origin": "Andromeda",
      "ingredients": ["Andromedan meat", "Galactic spices", "Stellar broth"]
    },
    {
      "name": "Nebula Noodles",
      "description": "Soft noodles bathed in a flavorful broth infused with the essence of distant nebulae.",
      "price": 20.99,
      "planet_of_origin": "Orion",
      "ingredients": ["Nebula noodles", "Stellar broth", "Cosmic vegetables"]
    },
    {
      "name": "Galactic Gumbo",
      "description": "A zesty gumbo featuring a blend of intergalactic seafood and spices.",
      "price": 28.50,
      "planet_of_origin": "Vega",
      "ingredients": ["Vegan crab", "Starfish sausage", "Celestial okra"]
    },
    {
      "name": "Interstellar Pizza",
      "description": "A cosmic pizza topped with ingredients sourced from across the universe.",
      "price": 24.99,
      "planet_of_origin": "Pluto",
      "ingredients": ["Plutonian pepperoni", "Asteroid olives", "Comet cheese"]
    },
    {
      "name": "Cosmic Curry",
      "description": "A fragrant curry dish infused with exotic flavors from distant star systems.",
      "price": 26.50,
      "planet_of_origin": "Sirius",
      "ingredients": ["Sirian spices", "Galactic vegetables", "Stellar rice"]
    },
    {
      "name": "Meteorite Meatloaf",
      "description": "A savory meatloaf made with meteorite-ground beef and celestial seasonings.",
      "price": 31.25,
      "planet_of_origin": "Mars",
      "ingredients": ["Martian beef", "Meteorite crumbs", "Space seasoning"]
    },
    {
      "name": "Interplanetary Pasta",
      "description": "Al dente pasta tossed in a tangy sauce made from ingredients sourced from neighboring planets.",
      "price": 23.75,
      "planet_of_origin": "Venus",
      "ingredients": ["Venusian pasta", "Martian sauce", "Lunar cheese"]
    },
    {
      "name": "Solar Salad",
      "description": "A vibrant salad featuring fresh greens harvested from sun-kissed asteroids.",
      "price": 17.99,
      "planet_of_origin": "Sun",
      "ingredients": ["Solar greens", "Stellar tomatoes", "Meteorite dressing"]
    },
    {
      "name": "Orionian Omelette",
      "description": "A fluffy omelette filled with Orionian delicacies and stardust cheese.",
      "price": 19.50,
      "planet_of_origin": "Orion",
      "ingredients": ["Orionian eggs", "Stardust cheese", "Nebula mushrooms"]
    },
    {
      "name": "Galactic Gyros",
      "description": "Flavorful gyro wraps filled with gyro meat and cosmic veggies, drizzled with stardust tzatziki sauce.",
      "price": 27.99,
      "planet_of_origin": "Alpha Centauri",
      "ingredients": ["Galactic gyro meat", "Stellar veggies", "Stardust tzatziki"]
    },
    {
      "name": "Celestial Chowder",
      "description": "Creamy chowder brimming with chunks of celestial seafood and star-shaped potatoes.",
      "price": 30.75,
      "planet_of_origin": "Pleiades",
      "ingredients": ["Pleiadian clams", "Starfish potatoes", "Galactic cream"]
    },
    {
      "name": "Asteroid Alfredo",
      "description": "Silky fettuccine alfredo made with asteroid-shaped pasta and creamy stardust sauce.",
      "price": 21.99,
      "planet_of_origin": "Asteroid Belt",
      "ingredients": ["Asteroid pasta", "Stardust cream", "Galactic cheese"]
    },
    {
      "name": "Exoplanet Enchiladas",
      "description": "Spicy enchiladas filled with exotic meats and galactic spices, served with cosmic salsa.",
      "price": 29.25,
      "planet_of_origin": "Exoplanet HD 189733b",
      "ingredients": ["Exoplanet meats", "Galactic spices", "Stellar salsa"]
    },
    {
      "name": "Comet Cake",
      "description": "Decadent cake made with ingredients sourced from passing comets, topped with celestial frosting.",
      "price": 15.99,
      "planet_of_origin": "Comet",
      "ingredients": ["Comet flour", "Star sugar", "Cosmic frosting"]
    },
    {
      "name": "Supernova Sushi",
      "description": "Exquisite sushi rolls made with rare space fish and stellar seaweed, served with galactic soy sauce.",
      "price": 33.50,
      "planet_of_origin": "Supernova",
      "ingredients": ["Supernova fish", "Stellar seaweed", "Galactic soy sauce"]
    },
    {
      "name": "Black Hole Bagels",
      "description": "Savory bagels filled with galactic cream cheese and smoked asteroid salmon.",
      "price": 16.50,
      "planet_of_origin": "Black Hole",
      "ingredients": ["Black Hole bagels", "Stellar cream cheese", "Asteroid salmon"]
    },
    {
      "name": "Quasar Quiche",
      "description": "Flaky quiche filled with quasar eggs, cosmic cheese, and celestial veggies.",
      "price": 18.99,
      "planet_of_origin": "Quasar-9",
      "ingredients": ["Quasar eggs", "Galactic cheese", "Stellar veggies"]
    },
    {
      "name": "Galactic Gratin",
      "description": "A creamy gratin featuring layers of cosmic potatoes, stardust cheese, and stellar cream.",
      "price": 26.99,
      "planet_of_origin": "Stellaris Prime",
      "ingredients": ["Stellar potatoes", "Galactic cheese", "Cosmic cream"]
    },
    {
      "name": "Martian Martian Soup",
      "description": "A unique soup from Mars, made with Martian carrots and Martian tomatoes.",
      "price": 28.99,
      "planet_of_origin": "Mars",
      "ingredients": ["Martian carrots", "Martian tomatoes", "Galactic herbs", "Stellar water"]
    },
    {
      "name": "Solar Flare Burger",
      "description": "A fiery burger made from the finest Sun-grown ingredients, with Solar pepper and Solar onions.",
      "price": 34.99,
      "planet_of_origin": "Sun",
      "ingredients": ["Sun-grown beef", "Solar pepper", "Solar onions", "Galactic cheese", "Stellar water"]
    },
    {
      "name": "Alpha Centauri Salad",
      "description": "A refreshing salad from the Alpha Centauri system, with Alpha Centauri lettuce and Alpha Centauri radishes.",
      "price": 22.50,
      "planet_of_origin": "Alpha Centauri",
      "ingredients": ["Alpha Centauri lettuce", "Alpha Centauri radishes", "Galactic herbs", "Stellar water"]
    },
    {
      "name": "Pleiades Pasta",
      "description": "Delicious pasta made with Pleiades noodles and Pleiades sauce.",
      "price": 26.75,
      "planet_of_origin": "Pleiades",
      "ingredients": ["Pleiades noodles", "Pleiades sauce", "Galactic cheese", "Stellar water"]
    },
    {
      "name": "Asteroid Belt Stir-Fry",
      "description": "An adventurous stir-fry made with Asteroid Belt vegetables and Asteroid Belt tofu.",
      "price": 30.50,
      "planet_of_origin": "Asteroid Belt",
      "ingredients": ["Asteroid Belt vegetables", "Asteroid Belt tofu", "Galactic sauce", "Stellar water"]
    },
    {
      "name": "Exoplanet HD 189733b Tacos",
      "description": "Tasty tacos with Exoplanet HD 189733b beans and Exoplanet HD 189733b salsa.",
      "price": 24.99,
      "planet_of_origin": "Exoplanet HD 189733b",
      "ingredients": ["Exoplanet HD 189733b beans", "Exoplanet HD 189733b salsa", "Galactic lettuce", "Stellar water"]
    },
    {
      "name": "Comet Casserole",
      "description": "A cosmic casserole with Comet potatoes and Comet carrots.",
      "price": 27.50,
      "planet_of_origin": "Comet",
      "ingredients": ["Comet potatoes", "Comet carrots", "Galactic herbs", "Stellar water"]
    },
    {
      "name": "Supernova Sushi",
      "description": "Sushi rolls filled with Supernova seafood and Supernova seaweed.",
      "price": 32.99,
      "planet_of_origin": "Supernova",
      "ingredients": ["Supernova seafood", "Supernova seaweed", "Galactic rice", "Stellar water"]
    },
    {
      "name": "Black Hole Burrito",
      "description": "A burrito filled with Black Hole beans and Black Hole rice.",
      "price": 29.75,
      "planet_of_origin": "Black Hole",
      "ingredients": ["Black Hole beans", "Black Hole rice", "Galactic salsa", "Stellar water"]
    },
    {
      "name": "Quasar-9 Quesadilla",
      "description": "A cheesy quesadilla made with Quasar-9 cheese and Quasar-9 tortillas.",
      "price": 26.25,
      "planet_of_origin": "Quasar-9",
      "ingredients": ["Quasar-9 cheese", "Quasar-9 tortillas", "Galactic beans", "Stellar water"]
    },
    {
      "name": "Stellaris Prime Sandwich",
      "description": "A delightful sandwich with Stellaris Prime bread and Stellaris Prime lettuce.",
      "price": 23.50,
      "planet_of_origin": "Stellaris Prime",
      "ingredients": ["Stellaris Prime bread", "Stellaris Prime lettuce", "Galactic tomatoes", "Stellar water"]
    },
    {
      "name": "Galactic Fusion Pizza",
      "description": "A fusion pizza with ingredients from various galaxies, including Galactic cheese and Stellar water.",
      "price": 31.99,
      "planet_of_origin": "Various",
      "ingredients": ["Galactic cheese", "Galactic sauce", "Galactic herbs", "Stellar water"]
    }
];

// Function to insert data into the database
async function insertData() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Create the "dishes" collection if it doesn't exist
    await db.createCollection('dishes');

    // Insert the data into the "dishes" collection
    const result = await db.collection('dishes').insertMany(dishes);
    console.log(`${result.insertedCount} documents inserted successfully.`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}
insertData();