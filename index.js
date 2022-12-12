/* error message primarily displayed none  */
const error = document.getElementById("error");
error.style.display = "none";

const makeAcard = ({ meals }) => {
    const meal = meals[0];
    /* console.log(meal); */

    const mealContainer = document.getElementById("singleMeal");
    mealContainer.textContent = "";

    mealContainer.innerHTML += `
        <div class="card w-50 mx-auto" >
            <img src=${meal.strMealThumb} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions}</p>
            </div>
        </div>
    `
}

const displayDetails = (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    /* console.log(url); */

    fetch(url)
        .then(res => res.json())
        .then(data => makeAcard(data))
}


const displaySearchResults = ({ meals }) => {
    /* console.log(meals); */

    if(!meals) {
        error.style.display = "block";
        return;
    }

    error.style.display = "none";

    const resultContainer = document.getElementById("searchResult");
    resultContainer.textContent = "";

    meals?.forEach((meal) => {
        /* console.log(meal) */

        resultContainer.innerHTML += `
            <div class="col-lg-4 col-md-6 col-sm-12" onclick="displayDetails(${meal.idMeal})">
                <img src=${meal.strMealThumb} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                </div>
            </div>
        `
    })
}

const handleSearch = () => {
    const search = document.getElementById("search");
    const text = search.value.replace(/ +/g, '+');
    /* console.log(text); */

    if(text.length == 0) {
        /* show error */
        error.style.display = "block";
        return;
    }

    error.style.display = "none";

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`;
    /* console.log(url); */

    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResults(data))
}