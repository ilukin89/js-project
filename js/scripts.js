const pokemonList = [{
        name: "Raticate",
        height: 0.7,
        types: ["normal"]
    },

    {
        name: "Charmander",
        height: 0.6,
        types: ["fire"]

    },

    {
        name: "Wigglytuff",
        height: 1,
        types: ["fairy", "normal"]

    },
    {
        name: "Nidoking",
        height: 1.4,
        types: ["ground", "poison"]

    },
    {
        name: "Victreebel",
        height: 1.7,
        types: ["grass", "poison"]

    }
];


for (let i = 0; i < pokemonList.length; i++) {
    document.write(`${pokemonList[i].name}'s height is ${pokemonList[i].height}<br/>`);

    let pokemonHeight = pokemonList[i].height;
    let pokemonName = pokemonList[i].name;

    if (pokemonHeight > 1) {
        document.write(`Wow that's big <br/><br/>`);
    } else if (pokemonHeight > 0.5 && pokemonHeight < 1) {
        document.write(`That is average Pokemon <br/><br/>`);
    } else {
        document.write(`That is small Pokemon <br/><br/>`);
    }
}