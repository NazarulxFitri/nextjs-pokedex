import { PokemonConfig } from "@/data/useGetPokemon";
import { Box, Container, Grid2, Typography } from "@mui/material";
import Image from "next/image";

import { Bebas_Neue } from "next/font/google";
import useGetColor from "@/services/useGetColor";
import useGetDescription from "@/data/useGetDesciption";
import { BarChart } from '@mui/x-charts/BarChart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import useGetAbilities from "@/data/useGetAbilities";
import { Skeleton } from "@/components";

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
    const { data: description, loading: descrptionLoading } = useGetDescription(data?.id as unknown as string);
    const { data: abilities, loading: abilitiesLoading } = useGetAbilities(data?.abilities)

    const height =
        data?.height as number >= 40 ? `${data?.height as number * 4}px` :
            data?.height as number >= 30 ? `${data?.height as number * 6}px` :
                data?.height as number >= 20 ? `${data?.height as number * 8}px` :
                    data?.height as number >= 10 ? `${data?.height as number * 10}px` :
                        data?.height as number >= 0 ? `${data?.height as number * 12}px` :
                            '';
    const description1 = description?.flavor_text_entries?.[1]?.flavor_text.replace(/\f/g, '');
    const description2 = description?.flavor_text_entries?.[3]?.flavor_text.replace(/\f/g, '');

    if (descrptionLoading || abilitiesLoading) {
        return (
            <Container>
                <Skeleton forListing={false} forDetail={true} />
            </Container>
        );
    }

    return (
        <Container sx={{ position: "relative", mb: 6 }}>
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

            <Grid2 sx={{ maxWidth: "840px", mx: "auto" }} container spacing={2} rowSpacing={4}>
                <Grid2 size={12}>
                    <Box gap={.5} display={"flex"} justifyContent={"center"} sx={{ mt: { md: -2 }, mb: { md: 2 } }}>
                        {data?.types?.map((item, idx) => (
                            <Box key={idx}>
                                <Image src={`/images/pokemon_type/${item.type.name}.svg`} width={40} height={40} alt={'Pokemon'} />
                            </Box>
                        ))}
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 5 }} sx={{ alignContent: "center", justifyItems: "center" }}>
                    <Image style={{ display: "block", height: "auto", width: "auto", transform: "scaleX(-1)" }} src={data?.sprites?.other?.showdown?.front_default as string} alt={data?.name as string} width={200} height={200} />
                    <Box sx={{ display: "flex" }} gap={1} mt={2}>
                        <Typography variant="body1" sx={{ background: "#efefef", fontSize: "12px", px: 1, py: .2, borderRadius: 1 }}>{data?.height as number * 10} cm</Typography>
                        <Typography variant="body1" sx={{ background: "#efefef", fontSize: "12px", px: 1, py: .2, borderRadius: 1 }}>{data?.weight as number / 10} kg</Typography>
                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 7 }} sx={{ alignSelf: "center" }}>
                    <Box sx={{ margin: "0 auto" }}>
                        <Box sx={{ cursor: "pointer" }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ "&::first-letter": { textTransform: "uppercase" }, color: "#666666", fontSize: "14px", textAlign: "justify" }}
                            >
                                {`${data?.name}. A ${!!type2 ? type1 + ' & ' + type2 : type1} type pokemon. ${description1} ${description2} `}
                            </Typography>
                        </Box>
                    </Box>
                </Grid2>

                <Grid2 size={{ xs: 12, md: 5 }} alignSelf={"center"}>
                    <Grid2 container spacing={2}>
                        {abilities?.map(ability => {
                            const enAbilityName = ability?.names?.find(name => name.language.name === 'en');
                            const enAbilityEffectEntries = ability?.effect_entries?.find(entry => entry.language.name === 'en')
                            return (
                                <Grid2 size={12} key={ability?.name} sx={{
                                    border: `2px solid ${color.color1}`, borderRadius: "4px", p: 2, "&:hover": {
                                        background: "#FAF9F6",
                                        cursor: "pointer"
                                    }
                                }}>
                                    <Typography sx={{ color: "#333", fontSize: "14px" }} variant="body1">{enAbilityName?.name}</Typography>
                                    <Typography sx={{ color: "#666666", fontSize: "12px" }} variant="body1">{enAbilityEffectEntries?.short_effect}</Typography>
                                </Grid2>
                            )
                        })}
                    </Grid2>
                </Grid2>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <BarChart
                        sx={{ width: '100%', px: 0 }}
                        xAxis={[
                            {
                                colorMap: {
                                    type: 'ordinal',
                                    colors: [color.color1, color.color2],
                                },
                                scaleType: 'band',
                                data: ['HP', 'Att', 'Def', 'Sp Att', 'Sp Def', 'Speed'],
                            },
                        ]}
                        series={[
                            {
                                data: [
                                    data?.stats?.[0]?.base_stat as number,
                                    data?.stats?.[1]?.base_stat as number,
                                    data?.stats?.[2]?.base_stat as number,
                                    data?.stats?.[3]?.base_stat as number,
                                    data?.stats?.[4]?.base_stat as number,
                                    data?.stats?.[5]?.base_stat as number,
                                ],
                            },
                        ]}
                        height={320}
                    />

                </Grid2>
            </Grid2>
        </Container>
    );
}

export default DetailModule;