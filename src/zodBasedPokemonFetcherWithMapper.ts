import { z } from "zod";

const zodNameUrl = z.object({
    // Kan validere at innholdet ser ut som forventet
    name: z.string().min(1),
    url: z.string().url()
})

export const zodPokemonWithMapper = z.object({
    name: z.string(),
    height: z.number(),
    weight: z.number(),
    abilities: z.array(zodNameUrl),
    forms: z.array(zodNameUrl)
}).transform((pokemon) => ({
    ...pokemon,
    weightUnitPerHeightUnit: pokemon.weight / pokemon.height
})
)

// returtype blir inferet basert på resultatet av zod funksjon + transform (trenger altså ikke å ha egne typer for transformert resultat)
export const assertionBasedPokemonFetcherWithMapper = (pokemonName: string) =>
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(res => res.json()).then(zodPokemonWithMapper.parse)


const exampleUsage = async () => {
    const pokemon = await assertionBasedPokemonFetcherWithMapper("charmander")
    // Kan bruke data fra transformert respons uten å definere ekstra typer.
    console.log(pokemon.weightUnitPerHeightUnit)
 }