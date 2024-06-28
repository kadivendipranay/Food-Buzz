import { anotherRecipeObject } from "./MyModel.js";

class OneRecipeView {
  constructor() {
    this.rightContainer = document.getElementById("right-container");
  }

  render() {
    this.clear();
    const recipe = anotherRecipeObject.recipeObject[0];
    if (!recipe) {
      this.rightContainer.innerHTML = "<p>No recipe data available.</p>";
      return;
    }
    
    const ingredientsMarkup = recipe.ingredients.map(ingredient => `
      <li>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit ? ingredient.unit : ''} ${ingredient.description}</li>
    `).join('');

    const cookingTimeMarkup = recipe.cookingTime !== undefined ? `
      <div>
        <h2>Cooking Time</h2>
        <p class="right-cooking-time">${recipe.cookingTime} minutes</p>
      </div>
    ` : '';

    const readyInMarkup = recipe.readyInMinutes !== undefined ? `
      <div>
        <h2>Ready In</h2>
        <p class="right-ready-in">${recipe.readyInMinutes} minutes</p>
      </div>
    ` : '';

    const markup = `
      <figure>
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="right-image">
        <h1 class="right-title">${recipe.title}</h1>
      </figure>
      ${cookingTimeMarkup}
      ${readyInMarkup}
      <div>
        <h2>Servings</h2>
        <button id="decrease-servings" class="servings-btn">-</button>
        <span id="servings-count" class="right-servings">${recipe.servings}</span>
        <button id="increase-servings" class="servings-btn">+</button>
      </div>
      <div>
        <h2>Publisher</h2>
        <p class="right-publisher">${recipe.publisher}</p>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>${ingredientsMarkup}</ul>
      </div>
      <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
    `;

    this.rightContainer.insertAdjacentHTML("afterbegin", markup);
    this.addEventListeners();
  }

  clear() {
    this.rightContainer.innerHTML = "";
  }

  addEventListeners() {
    const decreaseBtn = document.getElementById("decrease-servings");
    const increaseBtn = document.getElementById("increase-servings");
    const servingsCount = document.getElementById("servings-count");

    decreaseBtn.addEventListener("click", () => this.updateServings(servingsCount, -1));
    increaseBtn.addEventListener("click", () => this.updateServings(servingsCount, 1));
  }

  updateServings(servingsCountElement, change) {
    let currentServings = parseInt(servingsCountElement.textContent, 10);
    currentServings = Math.max(1, currentServings + change); // Ensure servings do not go below 1
    servingsCountElement.textContent = currentServings;
  }
}

export default new OneRecipeView();
