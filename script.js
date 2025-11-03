// Define recipes and raw materials
const recipes = {
  // 🌭 Hotdog
  "Hotdog": {
    "Bun": 1,
    "Sausage": 1,
    "Ketchup Cup": 1,
    "Mustard Cup": 1,
  },
  "Bun": {
    "Bread Dough": 1/6,
  },
  "Sausage": {
    "Pork": 1/4,
  },
  "Ketchup Cup": {
    "Ketchup Jar": 1/40,
  },
  "Mustard Cup": {
    "Mustard Jar": 1/40,
  },
  "Bread Dough": {
    "Cup of flour": 2,
    "Yeast": 1,
    "Cup of Oil": 1,
    "Water": 1,
  },

  // 🍪 Chocolate Chip Cookies
  "Chocolate Chip": {
    "Pastry Dough": 1 / 6,        // 1 pastry dough makes 6 cookies
    "Cup of Sugar": 1 / 6,
    "Cup of Brown Sugar": 1 / 6,
    "Baking Soda": 1 / 6,
    "Chocolate Squares": 5 / 6
  },
  "Pastry Dough": {
    "Cup of flour": 2,
    "Butter": 1,
    "Egg": 1,
    "Water": 1
  },

  // 🥤 Soda
  "Soda": {
    "Syrup": 2 / 3,             // 2 syrup per 3 sodas
    "Sparkling Water": 1 / 3,   // 1 sparkling water per 3 sodas
  },

  // 🍯 Syrup
  "Syrup": {
    "Water": 1 / 5,
    "Cup of Sugar": 1 / 5,
  },

  // 🍟 Fries
  "Fries": {
    "Cup of Oil": 1 / 3,       // 1 cup of oil makes 3 fries
    "Sliced Potatoes": 1,      // 3 potatoes per 3 fries
    "Cup of Salt": 1 / 3,      // 1 cup of salt per 3 fries
  },

  //Vanilla Milkshake
  "Vanilla Milkshake": {
    "Cup of Milk": 1,
    "Vanilla Ice Cream": 1,
    "Vanilla" : 1,
  },

   //Chocolate Milkshake
  "Chocolate Milkshake": {
    "Cup of Milk": 1,
    "Vanilla Ice Cream": 1,
    "Chocolate Squares" : 2,
  },

  "Vanilla Ice Cream": {
  "Cream": 1 / 2,
  "Vanilla" : 4,
  "Milk": 1,
  "Cup of Sugar": 2
  },

  // Raw ingredients (optional breakdown)
  // Each potato yields 3 slices, so one slice uses 1/3 of a Potato.
  "Sliced Potatoes": {
    "Potato": 1 / 3,
  },
  "Cup of Oil": {
    "Oil Jug": 1 / 5,
  },
  "Cup of Salt": {
    "Salt Bag": 1 / 5,
  },
  "Cup of flour": {
    "Flour Bag" : 1 /5,
  },
  "Chocolate Squares": {
    "Chocolate Bar": 1 / 5,
  },
  "Cup of Sugar": {
    "Sugar Bag": 1 / 5,
    },
  "Cup of Milk": {
    "Milk Carton": 1 / 5,
  },
  "Egg": {
    "Egg Carton": 1 / 12,
  },
}


// Recursive function to calculate raw materials
function calculateRawIngredients(item, quantity, totals = {}) {
  const recipe = recipes[item];

  if (!recipe) {
    totals[item] = (totals[item] || 0) + Math.ceil(quantity);
    return totals;
  }

  for (const [ingredient, qty] of Object.entries(recipe)) {
    calculateRawIngredients(ingredient, quantity * qty, totals);
  }

  return totals;
}

// Calculate button handler
document.getElementById("calculate").addEventListener("click", () => {
  const recipeName = document.getElementById("recipe").value;
  const count = parseInt(document.getElementById("count").value);
  const resultsDiv = document.getElementById("results");

  if (isNaN(count) || count < 1) {
    resultsDiv.textContent = "Please enter a valid quantity.";
    return;
  }

  resultsDiv.innerHTML = "";

  const finalRecipe = recipes[recipeName];
  const finalTotals = {};
  for (const [ingredient, qty] of Object.entries(finalRecipe)) {
    finalTotals[ingredient] = Math.ceil(qty * count);
  }

  const rawTotals = calculateRawIngredients(recipeName, count);

  let html = `<h2>Final Ingredients for ${count} ${recipeName}${count > 1 ? 's' : ''}:</h2><ul>`;
  for (const [item, qty] of Object.entries(finalTotals)) {
    html += `<li>${item}: ${qty}</li>`;
  }
  html += "</ul>";

  html += `<h2>Raw Ingredients Needed:</h2><ul>`;
  for (const [item, qty] of Object.entries(rawTotals)) {
    html += `<li>${item}: ${qty}</li>`;
  }
  html += "</ul>";

  resultsDiv.innerHTML = html;
});

// Populate dropdown from recipes automatically
window.addEventListener("DOMContentLoaded", () => {
  const recipeSelect = document.getElementById("recipe");
  Object.keys(recipes).forEach(recipeName => {
    // Only show top-level cookable items.
    // Hide small raw ingredients and internal items that shouldn't be selectable by users.
    const hidden = new Set([
      "Bun", "Sausage", "Bread Dough", "Ketchup Cup", "Mustard Cup", "Pastry Dough", "Syrup", "Sliced Potatoes", "Cup of Oil", "Cup of Salt",
      // Explicitly hide these raw/internal ingredients per user request:
      "Cup of flour", "Chocolate Squares", "Cup of Sugar", "Cup of Milk", "Egg"
    ]);

    if (!hidden.has(recipeName)) {
      const option = document.createElement("option");
      option.value = recipeName;
      option.textContent = recipeName;
      recipeSelect.appendChild(option);
    }
  });
});
