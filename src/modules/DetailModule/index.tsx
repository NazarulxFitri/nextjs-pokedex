import { PokemonConfig } from "@/data/useGetPokemon";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import useGetColor from "@/services/useGetColor";

// Import Bebas Neue font
const fontBebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400", // Specify the weight if needed
});

interface DetailModuleProps {
    data?: PokemonConfig;
    loading?: boolean;
}

const DetailModule: React.FC<DetailModuleProps> = ({ data }) => {
    const type1 = data?.types?.[0]?.type?.name || '';
    const type2 = data?.types?.[1]?.type?.name || '';

    const color = useGetColor(type1, type2);

    return (
        <Box my={8} sx={{ position: "relative"}}>
            <Box sx={{ mx: "auto", width: "fit-content", position: "absolute", left: "50%", transform: "translate(-50%)" }}>
                <Image style={{ display: "block" }} src={data?.sprites?.other?.dream_world?.front_default as string} alt={data?.name as string} width={280} height={280} />
            </Box>
            <Box mt={4}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "280px",
                        textTransform: "uppercase",
                        background: `linear-gradient(170deg, ${color.color1} 50%, ${color.color2} 50%)`, 
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                        fontFamily: fontBebasNeue.style.fontFamily
                    }}
                >
                    {data?.name}
                </Typography>

            </Box>
        </Box >
    );
}

export default DetailModule;