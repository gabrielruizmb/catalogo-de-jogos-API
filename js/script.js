const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "8986061a9cmsh5eca69595d7c116p175199jsn2ef0c3a4413c",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
};

// Pega a section do html que irá conter os cards dos jogos.
let gamesList = document.getElementById("games_list");

let currentCategory = "sort-by=popularity";
let currentPlatform = "&platform=all";
let currentUrl = currentCategory + currentPlatform;

let allButton = document.getElementById("all");
let pcButton = document.getElementById("windows");
let browserButton = document.getElementById("browser");
let favButton = document.getElementById("favorite");

let homeButton = document.getElementById("home");
let animeButton = document.getElementById("anime");
let fantasyButton = document.getElementById("fantasy");
let mmorpgButton = document.getElementById("MMORPG");
let racingButton = document.getElementById("racing");
let sciFiButton = document.getElementById("sci-fi");
let shooterButton = document.getElementById("shooter");
let socialButton = document.getElementById("social");
let sportButton = document.getElementById("sport");
let strategyButton = document.getElementById("strategy");

allButton.addEventListener("click", function () {
  changePlatform("&platform=all");
});
pcButton.addEventListener("click", function () {
  changePlatform("&platform=pc");
});
browserButton.addEventListener("click", function () {
  changePlatform("&platform=browser");
});

homeButton.addEventListener("click", function () {
  changeCategory("sort-by=popularity");
});
animeButton.addEventListener("click", function () {
  changeCategory("category=anime");
});
fantasyButton.addEventListener("click", function () {
  changeCategory("category=fantasy");
});
mmorpgButton.addEventListener("click", function () {
  changeCategory("category=mmorpg");
});
racingButton.addEventListener("click", function () {
  changeCategory("category=racing");
});
sciFiButton.addEventListener("click", function () {
  changeCategory("category=sci-fi");
});
shooterButton.addEventListener("click", function () {
  changeCategory("category=shooter");
});
socialButton.addEventListener("click", function () {
  changeCategory("category=social");
});
sportButton.addEventListener("click", function () {
  changeCategory("category=sport");
});
strategyButton.addEventListener("click", function () {
  changeCategory("category=strategy");
});

let listCounting = 0;
let loadButton = document.getElementById("load_button");
loadButton.addEventListener("click", loadGames);

function loadGames() {
  searchInApi(currentUrl);
}

function changePlatform(selectedPlatform) {
  gamesList.innerHTML = "";
  listCounting = 0;
  currentPlatform = selectedPlatform;
  currentUrl = currentCategory + currentPlatform;
  searchInApi(currentUrl);
}

function changeCategory(selectedCategory) {
  gamesList.innerHTML = "";
  listCounting = 0;
  currentCategory = selectedCategory;
  currentUrl = currentCategory + currentPlatform;
  searchInApi(currentUrl);
}

// Coloca o método "GET" e a chave de acesso a API em uma const.

// função que cria o card dos jogos usando o conteúdo da struct recebida da API
function createCard(data) {
  for (let i = listCounting; i < listCounting + 10; i++) {
    let gameCard = document.createElement("article");
    gameCard.className = "game_card";
    gameCard.id = "game_card";
    gameCard.innerHTML = `
          <div id="content">
            <a href="${data[i].game_url}" target="blank">
            <img
              id="thumbnail"
              src="${data[i].thumbnail}"
              alt="${data[i].title}"
            />
            </a>
          </div>
          <div id="game_info">
            <h1 id="title">${data[i].title}</h1>
            <input type="checkbox" id="fav_button${i}" class="fav_btn" />
            <label for="fav_button${i}">&#x1F90D;</label>
          </div>
          <div id="game_type">
            <p id="genre">${data[i].genre}</p>
            <p id="platform">${data[i].platform}</p>
          </div>
      `;
    gamesList.appendChild(gameCard);
  }
  listCounting += 10;
  let loadbtn = document.createElement("button");
  loadbtn.id = "load_button";
  loadbtn.innerHTML = `
      Carregar mais
    `;
  gamesList.appendChild(loadbtn);
}

// função que acessa a API
function searchInApi(currentUrl) {
  fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?${currentUrl}`,
    options
  )
    .then((response) => {
      response
        .json() // se der certo, recebe a struct
        .then((data) => createCard(data)); // com os dados dos jogos, e chama
    }) // a função que cria os cards.
    .catch(() => alert("Houve algum erro!"));
} // se der errado, exibe mensagem de erro na tela.
