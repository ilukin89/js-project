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
    button.classList.add('button', 'btn', 'btn-outline-primary');
    button.setAttribute('data-target', '#exampleModal');
    button.setAttribute('data-toggle', 'modal');

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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
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

    //define modal body
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    // let modalTitle = document.getElementsByClassName("modal-title");

    modalTitle.empty();
    modalHeader.empty();
    modalBody.empty();


    //element for name in modal content
    let nameElement = $("<h2>" + pokemon.name + "</h2>");

    let frontImage = $('<img class="modal-img">');
    frontImage.attr("src", pokemon.imageUrlFront);
    frontImage.src = pokemon.imageUrlFront;

    let backImage = $('<img class="modal-img">');
    backImage.attr("src", pokemon.imageUrlBack);
    backImage.src = pokemon.imageUrlBa;

    //height in modal content

    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let typesElement = document.createElement('p');
    typesElement.innerText = 'Types:' + ' ' + pokemon.types.map((t) => t.type.name).join(', ');
    let abilitiesElement = $("<p>" + "abilities: " + pokemon.abilities + "</p>");

    //append all content to modal
    modalBody.append(modalTitle);
    modalTitle.append(nameElement);
    modalBody.append(frontImage);
    modalBody.append(backImage);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);


    $('#exampleModal').modal('toggle');



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