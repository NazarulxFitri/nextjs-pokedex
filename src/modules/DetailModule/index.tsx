import { PokemonConfig } from "@/data/useGetPokemon";
import { Box, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import useGetColor from "@/services/useGetColor";
import useGetDescription from "@/data/useGetDesciption";
import { BarChart } from '@mui/x-charts/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

const fontBebasNeue = Bebas_Neue({
    subsets: ["latin"],
    weight: "400",
});

interface DetailModuleProps {
    data?: PokemonConfig;
    loading?: boolean;
}

const DetailModule: React.FC<DetailModuleProps> = ({ data }) => {
    const type1 = data?.types?.[0]?.type?.name || '';
    const type2 = data?.types?.[1]?.type?.name || '';

    const color = useGetColor(type1, type2);
    const { data: description } = useGetDescription(data?.id as unknown as string);

    const height = data?.height;

    const description1 = description?.flavor_text_entries?.[1]?.flavor_text.replace(/\f/g, '');
    const description2 = description?.flavor_text_entries?.[3]?.flavor_text.replace(/\f/g, '');

    return (
        <Container sx={{ position: "relative" }}>
            <Box sx={{ position: "absolute", top: "0", left: "24px" }}><Link href="/"><ArrowBackIcon fontSize="large" /></Link></Box>
            <Box>
                <Box sx={{ mx: "auto", width: "fit-content", height: "fit-content" }}>
                    <Image style={{ display: "block" }} src={data?.sprites?.other?.dream_world?.front_default as string} alt={data?.name as string} width={280} height={280} />
                </Box>
                <Box mt={{ xs: '0', md: '-280px' }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "60px", md: "280px" },
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
            </Box>

            <Grid2 sx={{ maxWidth: "800px", mx: "auto" }} container spacing={2}>
                <Grid2 size={12}>
                    <Box gap={.5} display={"flex"} justifyContent={"center"} sx={{ mt: { md: -2 }, mb: { md: 2 } }}>
                        {data?.types?.map((item, idx) => (
                            <Box key={idx}>
                                <Image src={`/images/pokemon_type/${item.type.name}.svg`} width={40} height={40} alt={'Pokemon'} />
                            </Box>
                        ))}
                    </Box>
                </Grid2>
                <Grid2 size={12}>
                    <Box sx={{ margin: "0 auto" }}>
                        <Box>
                            <Typography
                                variant="subtitle1"
                                sx={{ "&::first-letter": { textTransform: "uppercase" }, color: "#666666", fontSize: "16px", textAlign: "justify" }}
                            >
                                {`${data?.name}. A ${!!type2 ? type1 + ' & ' + type2 : type1} type pokemon. ${description1} ${description2} `}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>
                <Grid2 size={4} sx={{ alignContent: "center", justifyItems: "center" }}>
                    <Image style={{ display: "block", height: `${height! * 10}px`, width: "auto", transform: "scaleX(-1)" }} src={data?.sprites?.other?.showdown?.front_default as string} alt={data?.name as string} width={200} height={200} />
                </Grid2>
                <Grid2 size={8}>
                    <BarChart
                        xAxis={[{
                            colorMap:
                            {
                                type: 'ordinal',
                                colors: [color.color1, color.color2]
                            },
                            scaleType: 'band',
                            data: [
                                'HP',
                                'Attack',
                                'Defense',
                                'Sp Attack',
                                'Sp Defend',
                                'Speed',
                            ]
                        }]}
                        series={[{
                            data: [
                                data?.stats?.[0]?.base_stat as number,
                                data?.stats?.[1]?.base_stat as number,
                                data?.stats?.[2]?.base_stat as number,
                                data?.stats?.[3]?.base_stat as number,
                                data?.stats?.[4]?.base_stat as number,
                                data?.stats?.[5]?.base_stat as number
                            ]
                        }]}
                        width={500}
                        height={300}
                    />
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default DetailModule;