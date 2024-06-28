//app.js
//https://forkify-api.herokuapp.com/v2
//https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=c171930d-efd7-4d85-99ec-f13700d14538
//https://forkify-api.herokuapp.com/api/v2/recipes/:id
import {storeRecipeData} from "./MVC/MyModel.js"
import {OneRecipeView} from "./MVC/OneRecipeView.js"




const searchBtn=document.getElementById('search');
const searchInput=document.getElementById('searchinput')
const leftContainer=document.getElementById('left-container')
const rightContainer=document.getElementById('right-container')



searchBtn.addEventListener('click',()=>
{
  getRecipeData()
})



async function getRecipeData()
{
    try{
    const searchItem=searchInput.value
   const response=await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchItem}&key=c171930d-efd7-4d85-99ec-f13700d14538`);
   const recipeData= await response.json()
   const recipeArray=recipeData.data.recipes;
   recipeArray.map(function(i)
{
    const myPublisher=i.publisher
    const myTitle=i.title
    const myImageUrl=i.image_url
    const myId=i.id;
    console.log(myId);

    //rightContainer.innerText=""
    return leftContainer.insertAdjacentHTML("afterbegin",`

        <a href="#${myId}">
        <div class="left-food-container">
    <img src="${myImageUrl}" id="myimage"/>
    <h2 id="mypublisher">${myPublisher}</h2>
    <h3 id="mytitle">${myTitle}</h3>

    </div>
    </a>
    `)
    
})
}
catch (e){
    alert(e);

}
} 

async function loadParticularRecipe(){
   //Logic to collect the Hash ID 
     const hashID=window.location.hash.slice(1)
   console.log(hashID)

await storeRecipeData(hashID)

const rv=new OneRecipeView()
rv.render()
}

loadParticularRecipe()

window.addEventListener("hashchange", loadParticularRecipe)

