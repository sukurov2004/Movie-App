
const input = document.querySelector("#searchInput");
const filmList = document.querySelector("#filmList");
const searchBtn = document.querySelector("#searchBtn");

// ! Input Deyerinin Tutulmasi
function getInputValue() {
  return input.value.trim();
}

// ! data idare olunmasi
async function handleSearch() {
  const searchValue = getInputValue();
  if (!searchValue) {
    alert("Error");
    return;
  }
   filmList.innerHTML = `<p style="text-align:center; font-size:18px;">Loading... ⏳</p>`;
 const data = await getFilms(searchValue); 

  localStorage.setItem("lastFilms", JSON.stringify(data));
  renderFilms(data);                        
}

// ! Enter basanda ise salan event
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});
// ! buttona klik edende ise salan event
searchBtn.addEventListener("click", ()=>{
  handleSearch();
})

// ! datanin cagirilmasi
async function getFilms(searchValue) {
  const url = `http://www.omdbapi.com/?apikey=2c84a9f6&s=${searchValue}`;
  const res = await fetch(url);
  const data = await res.json();
 return data
}


// ! data nin ui da gostermek
 function renderFilms(data) {
      filmList.innerHTML = "";
  
  if (!data.Search) {
    filmList.innerHTML = "<p>Film tapılmadı</p>";
    return;
  }
  data.Search.forEach(film => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img
        class="card-img"
        src="${film.Poster}"
        alt="${film.Title}"
      />
      <div class="card-body">
        <h3 class="card-title">${film.Title}</h3>
        <span class="card-year">${film.Year}</span>
      </div>
    `;

    filmList.appendChild(card);
  });
}


window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("lastFilms");
  if (savedData) {
    renderFilms(JSON.parse(savedData));
  }
});