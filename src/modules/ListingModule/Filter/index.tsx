import { typeList } from "@/data/useGetTypeList";
import { Box, TextField } from "@mui/material"
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';

interface FilterProps {
    showFilter: boolean;
    typeInput?: string;
    setShowFilter: (value: boolean) => void;
    setNameInput: (value: string) => void;
    setTypeInput: (value: string) => void;
}

const Filter: React.FC<FilterProps> = ({ typeInput, showFilter, setShowFilter, setNameInput, setTypeInput }) => {
    return (
        <Box sx={{
            background: "#FFF",
            borderRadius: "4px",
            bottom: showFilter ? "0" : "-370px",
            boxShadow: "1px 1px 10px #eeeeee",
            p: 2,
            position: "fixed",
            textAlign: "center",
            transform: "translate(-50%, 0%)",
            left: "50%",
            width: "100%",
            maxWidth: "400px",
            transition: "bottom 0.3s ease-in-out",
            zIndex: 1
        }}>
            <Box sx={{
                cursor: "pointer",
                mt: -6,
                mb: 1,
                transition: 'transform 0.5s ease-in-out',
                transform: showFilter ? 'rotate(180deg)' : 'rotate(360deg)',
            }}
                onClick={() => setShowFilter(!showFilter)}
            >
                <Image style={{
                    filter: "drop-shadow(1px 1px 6px #666666)",
                }} src="/images/pokeball.svg" alt={"Pokeball"} width={60} height={60} />
            </Box>
            {showFilter &&
                <Box onClick={() => setShowFilter(!showFilter)} sx={{ position: "absolute", right: "12px", top: "8px" }}>
                    <CloseIcon />
                </Box>
            }
            <TextField label="Search Pokemon" variant="outlined"
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                }}
                sx={{ width: "100%" }}
                onChange={(e) => setNameInput(e.target.value)} />
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }} gap={4} mt={2}>
                {typeList?.map((item, idx) => (
                    <Box key={idx} onClick={() => setTypeInput(item?.type)} sx={{ cursor: "pointer" }}>
                        <Image style={{ opacity: typeInput === item.type ? "1" : "0.4" }} src={item?.imgSrc} alt={item?.type} width={40} height={40} />
                    </Box>
                ))}
            </Box>
        </Box>)
}

export default Filter;