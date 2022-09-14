import { z } from "zod";

const zodNameUrl = z.object({
    // Kan validere at innholdet ser ut som forventet
    name: z.string().min(1),
    url: z.string().url()
})

const zodPokemon = z.object({
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    abilities: z.array(zodNameUrl),
    forms: z.array(zodNameUrl)
})

// returtype blir inferet basert på resultatet av zod funksjon
export const zodBasedPokemonFetcher = (pokemonName: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        // Parse vil kaste feil om resultat ikke er som forventet. Kasting kan ungås ved å bruke safeParse
        .then(res => res.json()).then(zodPokemon.parse)


//Om man har behov for å bruke typen fra zodobjectet andre steder er det mulig å bruke z.infer
type Pokemon = z.infer<typeof zodPokemon>

const exampleUsage = async () => {
    const pokemon1 = await zodBasedPokemonFetcher("charmander")
    // Fungerer fint siden responsen stemmer overens med type assertionen
    //Om det ikke stemmer overens vil zod kaste feil med informasjon om hva som mangler i responsen.
    console.log(pokemon1.abilities.map(ability => ability.name).join(", "))
} 
