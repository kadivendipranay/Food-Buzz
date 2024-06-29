// Import statements for modules and components
import { getMyData, storeRecipeData ,anotherRecipeObject} from './MVC/MyModel.js';
import OneRecipeView from './MVC/OneRecipeView.js';
import * as SearchView from './MVC/SearchView.js';

// DOM element references
const searchInput = document.getElementById('searchinput');
const searchButton = document.getElementById('search');
const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');
const pagingControls = document.getElementById('paging-controls');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const lastPageButton = document.getElementById('last-page');
const pageNumberSpan = document.getElementById('page-number');
const addRecipeBtn = document.querySelector('.add-recipe button');
const modal = document.getElementById('add-recipe-modal');
const closeModalBtn = document.getElementById('close-modal');
const addRecipeForm = document.getElementById('add-recipe-form');

// Variables to manage pagination and search state
let currentPage = 1;
const recipesPerPage = 10;
let totalRecipes = 0;
let currentSearchQuery = '';

// Function to search recipes based on query and page
async function searchRecipes(query, page = 1) {
  try {
    const recipes = await getMyData(query);
    totalRecipes = recipes.length;
    currentSearchQuery = query;

    if (totalRecipes === 0) {
      leftContainer.innerHTML = "<p>No recipes found. Please try another search.</p>";
      rightContainer.innerHTML = "";
      pagingControls.style.display = 'none';
      return;
    }

    const totalPages = Math.ceil(totalRecipes / recipesPerPage);
    if (page > totalPages) {
      page = totalPages;
      currentPage = totalPages;
    }

    const start = (page - 1) * recipesPerPage;
    const end = page * recipesPerPage;
    const paginatedRecipes = recipes.slice(start, end);

    SearchView.clearResults(leftContainer);
    SearchView.displayRecipes(paginatedRecipes, leftContainer);
    updatePagingControls();
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

// Function to update paging controls based on current state
function updatePagingControls() {
  if (totalRecipes === 0) {
    pagingControls.style.display = 'none';
  } else {
    pagingControls.style.display = 'flex';
    pageNumberSpan.textContent = `Page ${currentPage}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(totalRecipes / recipesPerPage);
    lastPageButton.disabled = currentPage === Math.ceil(totalRecipes / recipesPerPage);
  }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
  currentPage = 1;
  const query = searchInput.value.trim();
  if (query) searchRecipes(query);
});

// Event listener for recipe click in search results
SearchView.addClickEvent(leftContainer, async (id) => {
  await storeRecipeData(id); // Example function to store recipe data
  OneRecipeView.render(anotherRecipeObject, rightContainer); // Example rendering function
});

// Event listeners for pagination buttons
prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    searchRecipes(currentSearchQuery, currentPage);
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < Math.ceil(totalRecipes / recipesPerPage)) {
    currentPage++;
    searchRecipes(currentSearchQuery, currentPage);
  }
});

lastPageButton.addEventListener('click', () => {
  currentPage = Math.ceil(totalRecipes / recipesPerPage);
  searchRecipes(currentSearchQuery, currentPage);
});

// Event listener for opening add recipe modal
addRecipeBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Event listener for closing add recipe modal
closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Event listener to close modal on outside click
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Event listener for adding a new recipe
addRecipeForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Gather form data
  const title = document.getElementById('recipe-title').value;
  const publisher = document.getElementById('recipe-publisher').value;
  const imageUrl = document.getElementById('recipe-image').value;
  const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(ingredient => {
    const parts = ingredient.trim().split(' ');
    return {
      quantity: parts[0],
      unit: parts[1],
      description: parts.slice(2).join(' ')
    };
  });
  const instructions = document.getElementById('recipe-instructions').value;

  const newRecipe = {
    title,
    publisher,
    imageUrl,
    ingredients,
    instructions
  };

  // Example: Send new recipe data to server or update UI
  console.log('New Recipe:', newRecipe);

  // Clear the form and close the modal
  addRecipeForm.reset();
  modal.style.display = 'none';

  // Example: Update UI to reflect new recipe
  OneRecipeView.addNewRecipe(newRecipe); // Example function to add new recipe to UI
});

// Initial search on page load
document.addEventListener('DOMContentLoaded', () => {
  searchRecipes('pasta');
});
