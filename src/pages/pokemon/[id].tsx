import useGetPokemon from "@/data/useGetPokemon";
import DetailModule from "@/modules/DetailModule";
import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

const Pokemon = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data, loading } = useGetPokemon(id as string);

    return (
        <>
            <Head>
                <title>Pokedex</title>
                <meta name="description" content="Pokedex created from a pokemon series lover" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ m: "24px auto", width: "fit-content" }}>
                <Image src="/images/pokemon-logo.svg" alt="Pokemon" height={80} width={300} />
            </Box>
            <DetailModule {...{data, loading}} />
        </>
    );
}

export default Pokemon;