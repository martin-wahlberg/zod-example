interface NameUrl {
    name: string;
    url: string;
}

interface Pokemon{
    name: string;
    height: number;
    weight: number;
    abilities: NameUrl[]
    forms:NameUrl[]
}

export const assertionBasedPokemonFetcher = (pokemonName: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then<Pokemon>(res => res.json())


const exampleUsage = async () => {
    const pokemon = await assertionBasedPokemonFetcher("charmander")
    // Fungerer fint siden responsen stemmer overens med type assertionen
     //Men riskerer også å få feil som dette:
    //Uncaught TypeError: Cannot read properties of undefined (reading 'map')
    console.log(pokemon.abilities.map(ability => ability.name).join(", "))
} 