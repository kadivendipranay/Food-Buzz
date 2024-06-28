class OneRecipeView {
  render(anotherRecipeObject, rightContainer) {
    rightContainer.innerHTML = "";
    const recipe = anotherRecipeObject.recipeObject[0];
    const ingredientsMarkup = recipe.ingredients.map(ingredient => `
      <li>${ingredient.quantity ? ingredient.quantity : ''} ${ingredient.unit} ${ingredient.description}</li>
    `).join('');

    const markup = `
      <figure>
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="right-image">
        <h1 class="right-title">${recipe.title}</h1>
      </figure>
      <div>
        <h2>Cooking Time</h2>
        <p class="right-cooking-time">${recipe.cookingTime} minutes</p>
      </div>
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
    `;

    rightContainer.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new OneRecipeView();
