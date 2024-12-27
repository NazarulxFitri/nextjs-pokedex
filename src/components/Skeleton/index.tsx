import { Grid2, Skeleton as MuiSkeleton } from '@mui/material';

const Skeleton = () => {
    const skeletonCount = 8;

    return (
        <Grid2 container rowSpacing={6} columnSpacing={2} mt={2} mb={10}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
                <Grid2 key={index} size={{ xs: 6, md: 3 }}>
                    <MuiSkeleton
                        animation="wave"
                        variant="rounded"
                        sx={{ width: "100%", height: "240px" }}
                    />
                </Grid2>
            ))}
        </Grid2>
    );
};

export default Skeleton;
