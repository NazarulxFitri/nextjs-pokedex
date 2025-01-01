import useGetAllPokemon, { AllPokemonConfig } from "@/data/useGetAllPokemon";
import { Box, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import { Skeleton } from "@/components";
import GoToTop from "./GoToTop";
import Link from "next/link";

const ListingModule = () => {
    const { data, loading } = useGetAllPokemon(500);
    const [filteredPokemon, setFilteredPokemon] = useState<AllPokemonConfig[]>();
    const [showFilter, setShowFilter] = useState(false);
    const [nameInput, setNameInput] = useState('');
    const [typeInput, setTypeInput] = useState('all');

    useEffect(() => {
        const result = data?.filter(pokemon =>
            pokemon?.name?.toLowerCase()?.includes(nameInput?.toLowerCase())
            && (
                typeInput.toLowerCase() === "all" ||
                pokemon.types.some(type => type.type.name === typeInput.toLowerCase())
            )
        );

        setFilteredPokemon(result);
    }, [nameInput, typeInput, data]);

    if (loading) return (
        <Container>
            <Skeleton forListing={true} forDetail={false} />
        </Container>
    )

    return (
        <Container sx={{ position: "relative" }}>
            <Filter {...{ showFilter, setShowFilter, typeInput, setNameInput, setTypeInput }} />
            <Grid2 container rowSpacing={6} columnSpacing={2} mt={2} mb={10}>
                {filteredPokemon?.map((pokemon) => (
                    <Grid2 key={pokemon.name} size={{ xs: 6, md: 3 }} textAlign={"center"}>
                        <Link href={`/pokemon/${pokemon.id}`}>
                            <Image src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon?.name} width={160} height={160} />
                            <Box>
                                <Typography variant="subtitle1" sx={{ "&::first-letter": { textTransform: "uppercase" }, fontSize: "14px", color: "#666" }}>{pokemon?.name}</Typography>
                                <Box gap={1} display={"flex"} justifyContent={"center"}>
                                    {pokemon?.types?.map((item, idx) => (
                                        <Box key={idx}>
                                            <Image src={`/images/pokemon_type/${item.type.name}.svg`} width={24} height={24} alt={'Pokemon'} />
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Link>
                    </Grid2>
                ))}

            </Grid2>
            <GoToTop />
        </Container>
    )
}

export default ListingModule;