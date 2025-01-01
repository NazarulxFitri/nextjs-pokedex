import { Box } from "@mui/material";

const Header = () => {

    return (
        <Box sx={{ width: "100%", textAlign: "center", p: 2, fontSize: "12px", color: "#666"}}>
            Data provided by PokeAPI. Pokémon and Pokémon character names are trademarks of Nintendo.
        </Box>
    );
}

export default Header;