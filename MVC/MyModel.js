export const anotherRecipeObject = {
  recipeObject: []
};

export async function storeRecipeData(id) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=c171930d-efd7-4d85-99ec-f13700d14538`);
    if (!response.ok) throw new FetchError(`Failed to fetch recipe: ${response.status}`, response.status);
    const recipeData = await response.json();
    const recipe = recipeData.data.recipe;

    anotherRecipeObject.recipeObject = [{
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients
    }];
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(`Fetch error: ${error.message} (status: ${error.status})`);
    } else {
      console.error('Error storing recipe data:', error);
    }
  }
}

export async function getMyData(query) {
  try {
    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=c171930d-efd7-4d85-99ec-f13700d14538`);
    if (!response.ok) throw new FetchError(`Failed to fetch recipes: ${response.status}`, response.status);
    const data = await response.json();
    return data.data.recipes;
  } catch (error) {
    if (error instanceof FetchError) {
      console.error(`Fetch error: ${error.message} (status: ${error.status})`);
    } else {
      console.error('Error fetching data:', error);
    }
    return []; // Return an empty array if there is an error
  }
}
