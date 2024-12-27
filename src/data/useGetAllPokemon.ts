import { useEffect, useState } from "react";

export interface AllPokemonConfig {
  name: string;
  id: number;
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
}

const useGetAllPokemon = (limit: number) => {
  const [data, setData] = useState<AllPokemonConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchAllPokemon = async (limit: number) => {
    setLoading(true);
    setError(null);

    const urls = Array.from(
      { length: limit },
      (_, i) => `https://pokeapi.co/api/v2/pokemon/${i + 1}`
    );

    try {
      const responses = await Promise.all(
        urls.map((url) =>
          fetch(url).then((response) => {
            if (!response.ok) throw new Error(`Failed to fetch ${url}`);
            return response.json();
          })
        )
      );
      setData(responses);
    } catch (err) {
      setError((err as Error)?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon(limit);
  }, [limit]);

  return {
    data,
    loading,
    error,
  };
};

export default useGetAllPokemon;
