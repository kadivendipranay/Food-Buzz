//MVC\RecipeView.js
export class RecipeView {
  constructor() {
    this.recipeContainer = null;
  }

  setRecipeContainer(containerId) {
    this.recipeContainer = document.getElementById(containerId);
    if (!this.recipeContainer) {
      throw new Error(`Recipe container with id '${containerId}' not found.`);
    }
  }

  render(recipes) {
    this.clear();
    recipes.forEach(recipe => {
      const recipeElement = this.createRecipeElement(recipe);
      this.recipeContainer.appendChild(recipeElement);
    });
  }

  createRecipeElement(recipe) {
    const recipeElement = document.createElement('div');
    recipeElement.classList.add('recipe-item');
    recipeElement.innerHTML = `
      <img src="${recipe.image_url}" alt="${recipe.title}" />
      <h2>${recipe.title}</h2>
      <p>${recipe.publisher}</p>
      <button data-id="${recipe.recipe_id}" class="view-recipe-btn">View Recipe</button>
    `;
    return recipeElement;
  }

  clear() {
    if (this.recipeContainer) {
      this.recipeContainer.innerHTML = '';
    }
  }

  addHandlerRender(handler) {
    if (!this.recipeContainer) {
      throw new Error('Recipe container is not initialized.');
    }

    this.recipeContainer.addEventListener('click', function(event) {
      const btn = event.target.closest('.view-recipe-btn');
      if (!btn) return;
      const recipeId = btn.dataset.id;
      handler(recipeId);
    });
  }
}
