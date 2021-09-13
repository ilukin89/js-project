  //  pokemon list details

  let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // api list

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }


    function getAll() {
      return pokemonList;
    }

    function add(pokemon) {

      if (typeof pokemon === 'object' && pokemon !== null) {
        return pokemonList.push(pokemon);
      } else {
        return 'Variable is not an object';
      }
    }

    //  include html/css elements

    function addListItem(pokemon) {

      let pokemonUl = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('ul__button');
      listItem.appendChild(button);
      pokemonUl.appendChild(listItem);
      button.addEventListener('click', function () {
        showDetails(pokemon);
      })
    };

    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    };

    // show pokemon details in console

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    };

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })();

  // return pokemon list from API

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });