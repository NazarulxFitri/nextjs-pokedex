import { useEffect, useState } from "react";

interface DesciptionConfig {
    base_happiness: number;
    capture_rate: number;
    color: {
        name: string;
        url: string;
    };
    evolution_chain?: {
        url: string;
    };
    evolves_from_species?: {
        name?: string;
        url?: string;
    };
    flavor_text_entries: {
        flavor_text: string;
    }[];    


}

const useGetDescription = (id: string) => {
    const [data, setData] = useState<DesciptionConfig>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);


    const fetchDescription = async (id: string) => {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

        setLoading(true);
        try {
            const responses = await fetch(url).then((response) => {
                if (!response.ok) {
                    new Error(`Failed to fetch ${url}`);
                }
                return response.json();
            });
            setData(responses);
        }
        catch(err) {
            setError((err as Error)?.message || "An unexpected error occurred");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDescription(id);
    }, [id])


    return {
        data,
        loading,
        error
    }
}

export default useGetDescription;