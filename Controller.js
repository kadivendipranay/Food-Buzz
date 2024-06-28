import { anotherRecipeObject, storeRecipeData, getMyData } from './MVC/MyModel.js';
import OneRecipeView from './MVC/OneRecipeView.js';
import * as SearchView from './MVC/SearchView.js';

const searchInput = document.getElementById('searchinput');
const searchButton = document.getElementById('search');
const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');
const pagingControls = document.getElementById('paging-controls');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const lastPageButton = document.getElementById('last-page'); // Reference to Last Page Button
const pageNumberSpan = document.getElementById('page-number');

let currentPage = 1;
const recipesPerPage = 10;
let totalRecipes = 0;
let currentSearchQuery = '';

async function searchRecipes(query, page = 1) {
  const recipes = await getMyData(query);
  totalRecipes = recipes.length;
  currentSearchQuery = query;

  if (totalRecipes === 0) {
    // Handle the case where no recipes are found
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
}

function updatePagingControls() {
  if (totalRecipes === 0) {
    pagingControls.style.display = 'none';
  } else {
    pagingControls.style.display = 'flex';
    pageNumberSpan.textContent = `Page ${currentPage}`;
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === Math.ceil(totalRecipes / recipesPerPage);
    lastPageButton.disabled = currentPage === Math.ceil(totalRecipes / recipesPerPage); // Disable Last Page button if already on last page
  }
}

searchButton.addEventListener('click', function () {
  currentPage = 1;
  const query = searchInput.value.trim();
  if (query) searchRecipes(query);
});

SearchView.addClickEvent(leftContainer, async function (id) {
  await storeRecipeData(id);
  OneRecipeView.render(anotherRecipeObject, rightContainer);
});

prevPageButton.addEventListener('click', function () {
  if (currentPage > 1) {
    currentPage--;
    searchRecipes(currentSearchQuery, currentPage);
  }
});

nextPageButton.addEventListener('click', function () {
  if (currentPage < Math.ceil(totalRecipes / recipesPerPage)) {
    currentPage++;
    searchRecipes(currentSearchQuery, currentPage);
  }
});

// New event listener for Last Page button
lastPageButton.addEventListener('click', function () {
  currentPage = Math.ceil(totalRecipes / recipesPerPage);
  searchRecipes(currentSearchQuery, currentPage);
});

document.addEventListener('DOMContentLoaded', function () {
  searchRecipes('pasta');
});
