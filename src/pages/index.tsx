import ListingModule from "@/modules/ListingModule";
import { Box } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

const Home = () => {

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex created from a pokemon series lover" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ m: { xs: "8px auto 40px", md: "8px auto 80px" }, width: "fit-content" }}>
        <Image src="/images/pokemon-logo.svg" alt="Pokemon" height={80} width={300} />
      </Box>

      <ListingModule />
    </>
  )
}

export default Home;
