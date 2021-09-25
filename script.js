const API_KEY = `api_key=a4ca97d0e7ebab77a13d8069911c1b29`;
const MAIN_URL = "https://api.themoviedb.org/3";
const API_URL = MAIN_URL + "/discover/movie?" + API_KEY;
const IMG_URL = 'http://image.tmdb.org/t/p/w500';
const SEARCH_URL = MAIN_URL + "/search/movie?" + API_KEY;


/*  
// Typ 1
function getMovie(api_url) {
    fetch(api_url)
        .then(response =>
            response.json())
        .then(dataJSON => {
            document.querySelector("#movie-area").innerHTML = "" //clear before display
            dataJSON.results.forEach(movieJSON =>
                displayMovie(movieJSON))
        })
}
getMovie(API_URL)

*/

async function getMovie(api_url) {
    const data = await (await fetch(api_url)).json()
    document.querySelector("#movie-area").innerHTML = "" //clear before display
    data.results.forEach(movieData =>
        displayMovie(movieData))

}
getMovie(API_URL)


function displayMovie(movieJSON) {
    const movie_area_DOM = document.querySelector("#movie-area");
    const movieItemHTML = `
    <div class="card col-sm-12 col-md-6 col-lg-3 p-0 shadow-lg mb-5 rounded movie-card">
            <img src="${IMG_URL+movieJSON.poster_path}" class="card-img-top img-fluid" alt="${movieJSON.title}">

        <div class="card-body bg-body">
            <h5 class="card-title text-warning">${movieJSON.title} <span class="float-end text-danger">${movieJSON.vote_average}</span></h5>
            <div> <h5 class="text-muted">${movieJSON.release_date.split("-")[0]}</h5></div>


            <div class="collapse card-text" id="a-${movieJSON.id.toString()}">
                <div class="card card-body">
                    ${movieJSON.overview}
                </div>
            </div>

            <div class=" text-center text-bottom">

                <a class="btn btn-outline-success mx-auto mt-3" data-bs-toggle="collapse" href="#a-${movieJSON.id.toString()}" role="button" aria-expanded="false" aria-controls="a-${movieJSON.id.toString()}">
                    detail
                </a>

            </div>

        </div>
    </div>
    `
    movie_area_DOM.innerHTML += movieItemHTML
}

function search() {
    const text = document.querySelector("#searchtext").value;
    console.log(text)
    if (text)
        getMovie(SEARCH_URL + '&query=' + text);
    else
        getMovie(API_URL);
}