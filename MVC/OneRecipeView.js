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
        <p class="right-servings">${recipe.servings} servings</p>
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
  }

  clear() {
    this.rightContainer.innerHTML = "";
  }
}

export default new OneRecipeView();
