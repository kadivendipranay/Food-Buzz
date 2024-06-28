// Controller.js

import { storeRecipeData, anotherRecipeObject } from "./MVC/MyModel.js";
import { OneRecipeView } from "./MVC/OneRecipeView.js";

// Get references to the DOM elements
const searchBtn = document.getElementById('search');
const searchInput = document.getElementById('searchinput');
const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  getRecipeData();
});

// Function to fetch recipes based on the search input
async function getRecipeData() {
  try {
    const searchItem = searchInput.value;
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}&key=c171930d-efd7-4d85-99ec-f13700d14538`);
    if (!response.ok) throw new Error(`Failed to fetch recipes: ${response.status}`);
    const recipeData = await response.json();
    const recipeArray = recipeData.data.recipes;

    // Clear the left container before displaying new results
    leftContainer.innerHTML = "";

    // Display the search results in the left container
    recipeArray.forEach(recipe => {
      const { publisher, title, image_url: imageUrl, id } = recipe;

      leftContainer.insertAdjacentHTML("afterbegin", `
        <a href="#${id}">
          <div class="left-food-container">
            <img src="${imageUrl}" id="myimage"/>
            <h2 id="mypublisher">${publisher}</h2>
            <h3 id="mytitle">${title}</h3>
          </div>
        </a>
      `);
    });
  } catch (e) {
    alert(e.message);
  }
}

// Function to load a specific recipe based on the hash ID
async function loadParticularRecipe() {
  try {
    // Get the hash ID from the URL
    const hashID = window.location.hash.slice(1);
    if (!hashID) return;

    // Fetch the recipe data and store it
    await storeRecipeData(hashID);

    // Render the recipe view
    const rv = new OneRecipeView();
    rv.render();
  } catch (e) {
    alert(e.message);
  }
}

// Load a recipe when the hash in the URL changes
window.addEventListener("hashchange", loadParticularRecipe);

// Initial load in case there's a hash ID present in the URL
loadParticularRecipe();
