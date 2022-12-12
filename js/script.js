// Pega a section do html que irá conter os cards dos jogos.
let gamesList = document.getElementById('games-list');
let loadButton = document.getElementById('load-more-button');
loadButton.addEventListener('click', searchInApi);
let listCounting = 0;
let currentGenre = 'sort-by=popularity';
let currentPlatform = '&platform=all';
let currentUrl = currentGenre + currentPlatform;

let pcButton = document.getElementById('pc-button');
let mmorpgButton = document.getElementById('mmorpg-button');
pcButton.addEventListener('click', function(){changePlatform("&platform=pc")});
mmorpgButton.addEventListener('click', function(){changeGenre("genre=mmorpg")});

function changeGenre(selectedGenre) {
  currentGenre = selectedGenre;
  currentUrl = currentGenre + currentGenre;
  searchInApi(currentUrl);
}

function changePlatform(selectedPlatform) {
  currentPlatform = selectedPlatform;
  currentUrl = currentGenre + currentPlatform;
  searchInApi(currentUrl);
}

// Coloca o método "GET" e a chave de acesso a API em uma const.
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8986061a9cmsh5eca69595d7c116p175199jsn2ef0c3a4413c',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

// função que cria o card dos jogos usando o conteúdo da struct recebida da API
function createCard(data) {
  
  for (let i = listCounting; i < listCounting + 10; i++){
    let gameCard = document.createElement('article');
    gameCard.innerHTML = `
        <a href="${data[i].game_url}">
        <img src="${data[i].thumbnail}">
        </a>
        <h1>${data[i].title}</h1>
        <p>${data[i].genre}</p>
        <p>${data[i].platform}</p>
    `;
    gamesList.appendChild(gameCard);
  }
  listCounting += 10;
}

// função que acessa a API
function searchInApi(currentUrl) { // como exemplo, está buscando por popularidade e 
                         // para todas as plataformas(pc e browser)
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${currentUrl}`, options)
        .then((response) => {
            response.json()                  // se der certo, recebe a struct
            .then(data => createCard(data)); // com os dados dos jogos, e chama
        })                                   // a função que cria os cards.              
        .catch(() => alert("Houve algum erro!"));
}       // se der errado, exibe mensagem de erro na tela.

searchInApi(currentUrl);
