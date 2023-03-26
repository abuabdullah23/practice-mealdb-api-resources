const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))

}

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerText = '';

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="card h-100">
            <div class="d-flex justify-content-between">
                <img class="w-50 img-fluid h-100 rounded" src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="d-flex align-items-center">
                    <div class="text-start p-3 align-items-center">
                        <h5 class="fw-bold fs-3">${meal.strMeal}</h5>
                        <p class="overflow-y-scroll" style="height:100px">${meal.strInstructions}</p>
                        <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn text-warning fw-bold fs-5" data-bs-toggle="modal" data-bs-target="#meal-details">
                        <u>View Details</u>
                        </button>
                    </div>
                </div>
            </div>
        </div> 
        `;
        mealsContainer.appendChild(mealDiv);

        // console.log(meal);
    })
    // console.log(meals[0].strMeal);
}


// for search
const searchMeals = () => {
    const searchMealText = document.getElementById('search-field-text').value;
    loadMeals(searchMealText);
}

// async await for meal details
const loadMealDetails = async (idMeal) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    } catch(error){
        console.log(error)
    }
}

// display meal details
const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetails = document.getElementById('mealDetailsBody');
    mealDetails.innerHTML = `
        <img class="img-fluid mb-3 rounded" src="${meal.strMealThumb}" alt="">
        <p><strong>Category: </strong>${meal.strCategory}</p>
        <p><strong>Area: </strong>${meal.strArea}</p>
        <p class="overflow-y-scroll" style="height:150px"><strong>Instructions: </strong>${meal.strInstructions}</p>
        <p><strong>Youtube: </strong><a href="${meal.strYoutube}" target="_blank">${meal.strYoutube}</a></p>
        `
}



loadMeals('chicken');


/* 
const loadMeals = async (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayFoodSixItem(data);
    } catch(error){
        console.log(error);
    }
}
*/