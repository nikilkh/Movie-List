const API_KEY = "api_key=0decbb49ed9b3d0c6017d7721a14c106";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY + "&query=";

const moviescontainer = document.querySelector(".moviescontainer");
const input = document.querySelector(".input");
const Button = document.querySelector(".searchButton");

getMovie(API_URL);


Button.addEventListener("click", (e)=> {
    e.preventDefault();

    console.log("clicked");
    let searchValue = input.value;

    if(searchValue) {
        getMovie(searchURL + searchValue);
    }
    else {
        getMovie(API_URL);
        }
})


async function getMovie(url) {
let moviescontainer = document.querySelector(".moviescontainer");
moviescontainer.innerHTML= "";
    const res = await fetch(url);
    const data = await res.json();
    const result = data.results;
    console.log(result);
    if(result.length ===0) {
        const errorMessage = document.createElement("h2");
        errorMessage.classList.add("errorMessage");
        errorMessage.innerHTML = "Sorry,there is no result for keyword you searched";

        const errorImage = document.createElement("img");
        errorImage.classList.add("errorImage")
        errorImage.src = "errorImage.svg";

        moviescontainer.appendChild(errorMessage);
        moviescontainer.appendChild(errorImage);

    }
    result.forEach((movie)=> {
        // console.log(movie.backdrop_path);
        let moviediv = document.createElement("div");
        moviediv.classList.add("movie");
        moviediv.style.backgroundImage = `url(${IMG_URL + movie.poster_path})`;

        const title = document.createElement("h3");
        title.innerHTML = `${movie.title}`;
        title.classList.add("movietitle");
        moviediv.appendChild(title);
        // moviediv.innerHTML = `${movie.title}`;
        
        const readmore = document.createElement("a");
        readmore.classList.add("readmore");
        readmore.innerHTML = "Read More";

        moviediv.appendChild(readmore);
        moviescontainer.appendChild(moviediv);
        
    })

}


