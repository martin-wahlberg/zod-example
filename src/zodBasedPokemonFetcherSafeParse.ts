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

// Returtype blir inferet basert på resultatet av zod funksjon
export const zodBasedPokemonFetcherWitSafeParse = (pokemonName: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        //safeParse vil returnere en discriminative union hvor man må sjekke på success for å få tilgang på data
        .then(res => res.json()).then(zodPokemon.safeParse)


//Om man har behov for å bruke typen fra zodobjectet andre steder er det mulig å bruke z.infer
type Pokemon = z.infer<typeof zodPokemon>

const exampleUsage = async () => {
    const pokemon = await zodBasedPokemonFetcherWitSafeParse("charmander");
    if (pokemon.success) {
        console.log(pokemon.data.name)
    }
    else {
        //Håndtere feil 
        console.error(pokemon.error.message)
    }
}