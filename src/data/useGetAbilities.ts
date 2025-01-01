import { useEffect, useState } from "react";

interface AbilitiesParam {
    ability: {
      name: string;
      url: string;
    };
}

interface AbilitiesConfig {
    name: string;
    names: {
        language: {
            name: string;
            url: string;
        };
        name: string;
    }[];
    effect_entries: {
        effect: string;
        short_effect: string;
        language: {
            name: string;
            url: string;
        }
    }[]
}

const useGetAbilities = (abilities?: AbilitiesParam[]) => {
  const [data, setData] = useState<AbilitiesConfig[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchAbilities = async () => {
    setLoading(true);
    setError(null);

    const urls = abilities?.map((item) => item.ability.url) || [];

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
    fetchAbilities();
  }, [abilities]);

  return {
    data,
    loading,
    error,
  };
};

export default useGetAbilities;
