import React, { useEffect, useState } from "react"

import "./pokemon.css"

interface Stat {
  name: Stats
  value: number
}

interface Ability {
  name: string
  hidden: boolean
  description: string
}

interface Specie {
  mythical: boolean
  legendary: boolean
  baby: boolean
  capture_rate: number
  description: string
  generation: string
  evolveFrom: undefined | string
  varieties: undefined | number
  habitat: undefined | string
  eggGroups: string[]
  growthRate: string
  shape: string
}

interface PokemonData {
  name: string
  specie: Specie
  base_exp: number
  imageUrl: string
  types: string[]
  height: number
  weight: number
  stats: Stat[]
  abilities: Ability[]
}

interface Props {
  children: JSX.Element
}

export const randomPokemonID = (): number => {
  const minID: number = 1
  const maxID: number = 600

  return Math.floor(Math.random() * (maxID - minID + 1) + minID)
}

const noDash = (value: string): string => {
  return value.replace("-", " ")
}

const cleanDescription = (value: string, name: string): string => {
  return value.replace("POKéMON", "pokemon").replace(name.toUpperCase(), name)
}

async function fetchJson<T>(url: string): Promise<T> {
  return fetch(url).then((res) => res.json())
}

const fetchAbilities = async (
  rawAbilities: RawAbility[]
): Promise<Ability[]> => {
  return Promise.all(
    rawAbilities.map(async (rawAbility: RawAbility) => {
      const ability = await fetchJson<PokemonAbilityOut>(rawAbility.ability.url)
      const effectInEng: EffectEntry | undefined = ability.effect_entries.find(
        (entry: EffectEntry) => entry.language.name == "en"
      )

      return {
        name: rawAbility.ability.name,
        hidden: rawAbility.is_hidden,
        description: effectInEng?.short_effect,
      } as Ability
    })
  )
}

const fetchSpecieInfo = async (ID: number): Promise<Specie> => {
  return await fetchJson<SpecieOut>(
    `https://pokeapi.co/api/v2/pokemon-species/${ID}/`
  ).then((specieData: SpecieOut) => {
    const engEntries: FlavorTextEntry[] = specieData.flavor_text_entries.filter(
      (entry) => entry.language.name === "en"
    )
    let description: string = ""

    if (engEntries) {
      description = engEntries.sort(() => 0.5 - Math.random())[0].flavor_text
    }

    const generation: string = specieData.generation.name
      .replace("generation-", "")
      .toUpperCase()
    const evolveFrom: string | undefined = specieData.evolves_from_species?.name
    const varieties: number | undefined =
      specieData.varieties.length > 1 ? specieData.varieties.length : undefined
    const eggGroups: string[] = specieData.egg_groups.map((group) =>
      group.name.replace("indeterminate", "N/A")
    )
    const habitat: string | undefined = specieData.habitat?.name
    const growthRate: string = specieData.growth_rate.name

    return {
      mythical: specieData.is_mythical,
      baby: specieData.is_baby,
      legendary: specieData.is_legendary,
      generation,
      description,
      evolveFrom,
      varieties,
      eggGroups,
      habitat,
      growthRate,
    } as Specie
  })
}

const fetchPokemon = async (ID: number): Promise<PokemonData> => {
  return fetchJson<PokemonDataOut>(
    `https://pokeapi.co/api/v2/pokemon/${ID}/`
  ).then(async (pokeData) => {
    return {
      name: pokeData.name,
      imageUrl: pokeData?.sprites?.other?.dream_world?.front_default,
      types: pokeData?.types.map((type: RawTypeItem) => type.type?.name),
      weight: pokeData?.weight,
      height: pokeData?.height,
      stats: pokeData?.stats.map((statItem: RawStatItem) => ({
        name: statItem.stat.name,
        value: statItem.base_stat,
      })),
      specie: await fetchSpecieInfo(ID),
      base_exp: pokeData.base_experience,
      abilities: await fetchAbilities(pokeData.abilities),
    } as PokemonData
  })
}

const Pokemon = ({ children }: Props): JSX.Element => {
  const [pokemonID, _] = useState(randomPokemonID())
  const [pokemonData, setPokemonData] = useState<PokemonData | undefined>(
    undefined
  )

  useEffect(() => {
    const fetchRandomPokemon = async (pokemonID: number) => {
      const pokemonData: PokemonData = await fetchPokemon(pokemonID)
      setPokemonData(pokemonData)
    }

    fetchRandomPokemon(pokemonID)
  }, [pokemonID, setPokemonData])

  if (!pokemonData) {
    return <div className={`pokemon loading`}>Looking for pokemons..</div>
  }

  const {
    name,
    imageUrl,
    types,
    weight,
    height,
    stats,
    abilities,
    base_exp,
    specie,
  } = pokemonData

  return (
    <div className={`pokemon`}>
      <div className={`pokeball`}>
        <img src={imageUrl} alt={name} title={name} />
      </div>
      {children}
      <div className={`info`}>
        <h2 className={`name`}>
          {name}{" "}
          <span title={"Generation"} className={`generation`}>
            {specie.generation}
          </span>
        </h2>
        <div className={`statuses`}>
          {specie.baby ? <span>baby</span> : ""}
          {specie.legendary ? <span>legendary</span> : ""}
          {specie.mythical ? <span>mythical</span> : ""}
        </div>
        <p className={`description`}>
          {cleanDescription(specie.description || "", name)}
        </p>
      </div>
      <div className="pokeinfo">
        <div className={`specie-info`}>
          <div className={`specie`}>
            <h3>Specie</h3>
            <ul>
              <li key={`type`}>
                <span className={`key`}>Type:</span>
                <span className={`value type`}>{types.join(" + ")}</span>
              </li>
              {specie.evolveFrom ? (
                <li key={`evolve-from`}>
                  <span className={`key`}>Evolve From:</span>
                  <span className={`value`}>{specie.evolveFrom}</span>
                </li>
              ) : (
                ""
              )}
              {specie.habitat ? (
                <li key={`habitat`}>
                  <span className={`key`}>Habitat:</span>
                  <span className={`value`}>{specie.habitat}</span>
                </li>
              ) : (
                ""
              )}
              {specie.growthRate ? (
                <li key={`growth-rate`}>
                  <span className={`key`}>Growth Rate:</span>
                  <span className={`value`}>{specie.growthRate}</span>
                </li>
              ) : (
                ""
              )}
              {specie.varieties ? (
                <li key={`varieties`}>
                  <span className={`key`}>Varieties:</span>
                  <span className={`value`}>{specie.varieties}</span>
                </li>
              ) : (
                ""
              )}
              {specie.eggGroups ? (
                <li key={`egg-groups`}>
                  <span className={`key`}>Egg Group:</span>
                  <span className={`value`}>{specie.eggGroups.join(", ")}</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <div className={`abilities`}>
            <h3>Abilities</h3>
            <ul>
              {abilities.map((ability: Ability) => (
                <li key={ability.name}>
                  <span className={`name`}>{noDash(ability.name)}</span>
                  <span role={`img`} title={ability.description}>
                    ❓
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`stats`}>
          <h3>Stats</h3>
          <ul>
            <li key={`weight`}>
              <span className={`key name`}>Weight:</span>
              <span className={`value`}>{weight}</span>
            </li>
            <li key={`height`}>
              <span className={`key name`}>Height:</span>
              <span className={`value`}>{height}</span>
            </li>
            <li key={`base_exp`}>
              <span className={`key name`}>Base EXP:</span>
              <span className={`value`}>{base_exp}</span>
            </li>
            {stats.map((stat: Stat) => (
              <li key={stat.name}>
                <span className={`key name ${stat.name.toLowerCase()}`}>
                  {noDash(stat.name.replace("special", "sp."))}:
                </span>
                <span className={`value`}>{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Pokemon
