import { anotherRecipeObject } from "./MyModel.js";

class OneRecipeView {
  constructor() {
    this.rightContainer = document.getElementById("right-container");
    this.bookmarks = [];
    this.bookmarkButton = document.querySelector('.bookmarks button');
    this.bookmarkButton.addEventListener('click', this.displayBookmarks.bind(this));
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

    const instructionsMarkup = recipe.instructions !== undefined ? `
      <div>
        <h2>Instructions</h2>
        <p class="right-instructions">${recipe.instructions}</p>
      </div>
    ` : '';

    const markup = `
      <figure>
        <img src="${recipe.imageUrl}" alt="${recipe.title}" class="right-image">
        <h1 class="right-title">${recipe.title}</h1>
      </figure>
      ${cookingTimeMarkup}
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
      ${instructionsMarkup}
      <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
      <button id="bookmark-recipe" class="bookmark-btn">Add to Bookmark</button>
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
    const bookmarkBtn = document.getElementById("bookmark-recipe");

    decreaseBtn.addEventListener("click", () => this.updateServings(servingsCount, -1));
    increaseBtn.addEventListener("click", () => this.updateServings(servingsCount, 1));
    bookmarkBtn.addEventListener("click", () => this.addToBookmark());
  }

  updateServings(servingsCountElement, change) {
    let currentServings = parseInt(servingsCountElement.textContent, 10);
    currentServings = Math.max(1, currentServings + change); // Ensure servings do not go below 1
    servingsCountElement.textContent = currentServings;
  }

  addToBookmark() {
    const recipe = anotherRecipeObject.recipeObject[0];
    if (recipe && !this.isBookmarked(recipe)) {
      this.bookmarks.push({
        title: recipe.title,
        imageUrl: recipe.imageUrl
      });
      alert(`${recipe.title} has been added to your bookmarks!`);
      this.displayBookmarks();
    } else if (recipe) {
      alert(`${recipe.title} is already in your bookmarks.`);
    }
  }

  isBookmarked(recipe) {
    return this.bookmarks.some(b => b.title === recipe.title && b.imageUrl === recipe.imageUrl);
  }

  displayBookmarks() {
    this.clear();
    if (this.bookmarks.length === 0) {
      this.rightContainer.innerHTML = "<p>No bookmarks available.</p>";
      return;
    }
    const bookmarksMarkup = this.bookmarks.map((bookmark, index) => `
      <div class="bookmark-item">
        <img src="${bookmark.imageUrl}" alt="${bookmark.title}" class="bookmark-image">
        <p>${bookmark.title}</p>
        <button class="delete-bookmark" data-index="${index}">Delete</button>
      </div>
    `).join('');
    this.rightContainer.insertAdjacentHTML("afterbegin", bookmarksMarkup);

    // Add event listeners to the "Delete" buttons
    const deleteButtons = document.querySelectorAll(".delete-bookmark");
    deleteButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        this.deleteBookmark(index);
      });
    });
  }

  deleteBookmark(index) {
    this.bookmarks.splice(index, 1);
    this.displayBookmarks();
  }

  async fetchAndDisplayRecipe(id) {
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=c171930d-efd7-4d85-99ec-f13700d14538`);
      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}, StatusText: ${response.statusText}`);
        throw new Error(`Failed to fetch recipe: ${response.status}`);
      }
      const recipeData = await response.json();
      anotherRecipeObject.recipeObject = [recipeData.data.recipe];
      this.render();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      alert('Failed to fetch the recipe. Please try again later.');
    }
  }

  addNewRecipe(recipe) {
    anotherRecipeObject.recipeObject[0] = recipe;
    this.render();
  }
}

export default new OneRecipeView();
