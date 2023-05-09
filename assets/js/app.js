console.log("🟢 Connected!");
//DOM ELEMENTS
const moviePoster = document.querySelector("#moviePoster");
const movieTitle = document.querySelector("#movieTitle");
const romajiTitle = document.querySelector("#romajiTitle");
const airDate = document.querySelector("#airDate");
const screenwriter = document.querySelector("#screenwriter");
const music = document.querySelector("#music");
const synopsis = document.querySelector("#synopsis");

const selector = document.querySelector("#selector");
//

const urlAPIbase = "https://studio-ghibli-films-api.herokuapp.com/api";

//FETCH PARA OPCIONES
fetch(urlAPIbase)
  .then((res) => res.json())
  .then((data) => {
    const dataArray = Object.values(data);
    console.log(dataArray);

    let htmlOpciones = "";

    dataArray.forEach((item) => {
      if (item.title === "The Tale of the Princess Kaguya") {
        htmlOpciones += `<option value="the tale of princess kaguya">${item.title}</option>`;
      } else if (item.title === "How Do You Live?") {
        htmlOpciones += `<option value="how do you live%3F">${item.title}</option>`;
      } else
        htmlOpciones += `<option value="${item.title.toLowerCase()}">${
          item.title
        }</option>`;
    });

    selector.innerHTML = htmlOpciones;
  });

//FUNCIÓN QUE OBTIENE LA PELÍCULA SELECCIONADA
function obtenerPelicula(pelicula) {
  fetch(`${urlAPIbase}/${pelicula}`)
    .then((res) => res.json())
    .then((data) => {
      //CHANGE POSTER
      moviePoster.src = data.poster;
      moviePoster.alt = data.title;

      //CHANGE NAMES
      movieTitle.textContent = data.title;
      romajiTitle.textContent = data.hepburn;

      //CHANGE INFO
      airDate.textContent = data.release;
      screenwriter.textContent = data.director;
      music.textContent = data.music;
      //CHANGE SYNOPSIS
      synopsis.textContent = data.synopsis;
    });
}

selector.addEventListener("change", (e) => {
  obtenerPelicula(e.target.value);
});

//INICIALIZADOR
obtenerPelicula("castle in the sky");
