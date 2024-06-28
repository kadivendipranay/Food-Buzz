export function clearResults(container) {
    container.innerHTML = "";
  }
  
  export function displayRecipes(recipes, container) {
    const markup = recipes.map(recipe => `
      <div class="left-food-container" data-id="${recipe.id}">
        <img src="${recipe.image_url}" alt="${recipe.title}" id="myimage">
        <h2 id="mytitle">${recipe.title}</h2>
        <p id="mypublisher">${recipe.publisher}</p>
      </div>
    `).join('');
    container.insertAdjacentHTML("afterbegin", markup);
  }
  
  export function addClickEvent(container, callback) {
    container.addEventListener('click', function (event) {
      const foodContainer = event.target.closest('.left-food-container');
      if (!foodContainer) return;
      const id = foodContainer.dataset.id;
      callback(id);
    });
  }
  