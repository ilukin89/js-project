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


    // get list

    function getAll() {
      return pokemonList;
    }

    // add pokemon
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
        showModal(pokemon);
      });
    };

    // define modals

    let modalContainer = document.querySelector('#modal-container');

    function showModal(pokemon) {
      modalContainer.innerHTML = '';
      let modal = document.createElement('div');
      modal.classList.add('modal');

      //button
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      // content inside modal
      let contentElement = document.createElement('p');
      let pokemonImage = document.createElement('img');
      pokemonImage.setAttribute('src', pokemon.imageUrl);
      contentElement.innerText = 'Height:' + ' ' + pokemon.height;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(contentElement);
      modal.appendChild(pokemonImage);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal(pokemon.name, pokemon);
    });



    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showModal: showModal,
      hideMOdal: hideModal
    };
  })();

  // return pokemon list from API

  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });