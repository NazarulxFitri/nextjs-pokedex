import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box } from '@mui/material';

const GoToTop = () => {
    const handleGoToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    return (
        <Box 
            onClick={handleGoToTop} 
            sx={{ position: "fixed", bottom: "24px", right: "24px", cursor: "pointer" }}
        >
            <ArrowUpwardIcon fontSize='large'/>
        </Box>
    );
};

export default GoToTop;
