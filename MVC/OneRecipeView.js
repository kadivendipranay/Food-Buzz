// OneRecipeView.js
import { anotherRecipeObject } from "./MyModel.js";

export class OneRecipeView {
  constructor() {
    this.rightContainer = document.getElementById("right-container");
  }

  render() {
    this.clear();
    const collectedData = anotherRecipeObject.recipeObject;
    this.rightData = this.actualLogic(collectedData);
    this.addDataToContainer();
  }

  clear() {
    this.rightContainer.innerHTML = "";
  }

  actualLogic(receivedData) {
    return `
      <div class="right-food-container">
        <img class="right-image" src="${receivedData.imageUrl}" />
        <h3 class="right-title">Title: ${receivedData.title}</h3>
        <h2 class="right-publisher">Publisher: ${receivedData.publisher}</h2>
        <h3 class="right-servings">Servings: ${receivedData.servings}</h3>
        <h3 class="right-cooking_time">Cooking Time: ${receivedData.cooking_time}</h3>
        <h3 class="right-readyInMinutes">Ready In Minutes: ${receivedData.readyInMinutes}</h3>
        <h3 id="cooking_instructions">${receivedData.cooking_instructions}</h3>
        <a href="${receivedData.source_url}" target="_blank">View Recipe</a>
        <div class="ingredients">
          ${receivedData.ingredients.map(i => `
            <div>
              <span>${i.description}</span> --
              <span>${i.quantity}</span>
              <span>${i.unit}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  addDataToContainer() {
    this.rightContainer.insertAdjacentHTML("afterbegin", this.rightData);
  }
}
