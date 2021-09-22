let pokemonRepository = function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function n(t) {
    return "object" == typeof t && null !== t ? e.push(t) : "Variable is not an object"
  }

  function i(e) {
    let t = e.detailsUrl;
    return fetch(t).then(function (e) {
      return e.json()
    }).then(function (t) {
      e.imageUrlFront = t.sprites.front_default, e.imageUrlBack = t.sprites.back_default, e.height = t.height, e.weight = t.weight, e.types = t.types, e.abilities = [];
      for (let n = 0; n < t.abilities.length; n++) e.abilities.push(t.abilities[n].ability.name)
    }).catch(function (e) {
      console.error(e)
    })
  }
  let o = document.querySelector("#modal-container");

  function a(e) {
    let t = $(".modal-body"),
      n = $(".modal-title"),
      i = $(".modal-header");
    n.empty(), i.empty(), t.empty();
    let a = $("<h2>" + e.name + "</h2>"),
      l = $('<img class="modal-img">');
    l.attr("src", e.imageUrlFront), l.src = e.imageUrlFront;
    let r = $('<img class="modal-img">');
    r.attr("src", e.imageUrlBack), r.src = e.imageUrlBa;
    let s = $("<p>height: " + e.height + "</p>"),
      c = $("<p>weight: " + e.weight + "</p>"),
      d = document.createElement("p");
    d.innerText = "Types: " + e.types.map(e => e.type.name).join(", ");
    let p = $("<p>abilities: " + e.abilities + "</p>");
    t.append(n), n.append(a), t.append(l), t.append(r), t.append(s), t.append(c), t.append(d), t.append(p), $("#exampleModal").modal("toggle"), o.classList.add("is-visible")
  }

  function l() {
    o.classList.remove("is-visible")
  }
  return window.addEventListener("keydown", e => {
    "Escape" === e.key && o.classList.contains("is-visible") && l()
  }), o.addEventListener("click", e => {
    e.target === o && l()
  }), document.querySelector("#show-modal").addEventListener("click", () => {
    a(pokemon.name, pokemon)
  }), {
    getAll: function () {
      return e
    },
    add: n,
    addListItem: function (e) {
      let t = document.querySelector(".pokemon-list"),
        n = document.createElement("li"),
        o = document.createElement("button");
      o.innerText = e.name, o.classList.add("button", "btn", "btn-outline-primary"), o.setAttribute("data-target", "#exampleModal"), o.setAttribute("data-toggle", "modal"), n.appendChild(o), t.appendChild(n), o.addEventListener("click", function () {
        ! function (e) {
          i(e).then(function () {
            a(e)
          })
        }(e)
      })
    },
    loadList: function () {
      return fetch(t).then(function (e) {
        return e.json()
      }).then(function (e) {
        e.results.forEach(function (e) {
          n({
            name: e.name,
            detailsUrl: e.url
          })
        })
      }).catch(function (e) {
        console.error(e)
      })
    },
    loadDetails: i,
    showModal: a,
    hideModal: l
  }
}();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e)
  })
});