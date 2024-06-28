// MyModel.js
export const anotherRecipeObject = {
  recipeObject: {}
};

export async function storeRecipeData(id) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=c171930d-efd7-4d85-99ec-f13700d14538`);
    if (!response.ok) throw new Error(`Failed to fetch recipe: ${response.status}`);
    const recipeData = await response.json();
    const recipe = recipeData.data.recipe;

    anotherRecipeObject.recipeObject = {
      title: recipe.title,
      publisher: recipe.publisher,
      imageUrl: recipe.image_url,
      source_url: recipe.source_url,
      recipe_id: recipe.id,
      ingredients: recipe.ingredients,
      cooking_instructions: recipe.cooking_instructions || "",
      cooking_time: recipe.cooking_time,
      servings: recipe.servings,
      readyInMinutes: recipe.readyInMinutes || ""
    };
  } catch (e) {
    alert(e.message);
  }
}
