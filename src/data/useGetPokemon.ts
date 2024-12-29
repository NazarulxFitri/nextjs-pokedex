import { useEffect, useState } from "react";

export interface PokemonConfig {
  name: string;
  id: number;
  height: number;
  weight: number;
  sprites: {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    other: {
      dream_world: {
        front_default: string;
      };
      home: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
      showdown: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
    }
  }[]
}

const useGetPokemon = (id: string) => {
  const [data, setData] = useState<PokemonConfig>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchPokemon = async (id: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    setLoading(true);
    try {
      const responses = await fetch(url).then((response) => {
        if (!response.ok) new Error(`Failed to fetch ${url}`);
        return response.json();
      });
      setData(responses);
    } catch (err) {
      setError((err as Error)?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(id);
  }, [id]);

  return {
    data,
    loading,
    error,
  };
};

export default useGetPokemon;
