interface RawTypeItem {
  type: {
    name: string
    url: string
  }
}

interface RawStatItem {
  base_stat: number
  stat: {
    name: string
  }
}

interface RawAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
  }
  version: {
    name: string
  }
}

interface EggGroupRaw {
  name: string
}

interface VarietyRaw {
  is_default: boolean
  pokemon: { name: string }
}

interface SpecieOut {
  capture_rate: number
  is_legendary: boolean
  is_baby: boolean
  is_mythical: boolean
  flavor_text_entries: FlavorTextEntry[]
  generation: {
    name: string
  }
  habitat: undefined | { name: string }
  growth_rate: { name: string }
  egg_groups: EggGroupRaw[]
  evolves_from_species: undefined | { name: string }
  varieties: VarietyRaw[]
  shape: { name: string }
}

interface PokemonDataOut {
  name: string
  base_experience: number
  weight: number
  height: number
  types: RawTypeItem[]
  stats: RawStatItem[]
  abilities: RawAbility[]
  sprites: {
    other: {
      dream_world: {
        front_default: string
      }
    }
  }
}

interface EffectEntry {
  effect: string
  short_effect: string
  language: {
    name: string
  }
}

interface PokemonAbilityOut {
  effect_entries: EffectEntry[]
}

type Stats =
  | "hp"
  | "attack"
  | "speed"
  | "defence"
  | "special-attack"
  | "special-defence"
