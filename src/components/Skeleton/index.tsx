import { Grid2, Skeleton as MuiSkeleton } from '@mui/material';

interface SkeletonProps {
    forListing: boolean;
    forDetail: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({ forListing, forDetail }) => {

    if (forListing) {
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
    }

    if (forDetail) {
        return (
            <MuiSkeleton
                animation="wave"
                variant="rounded"
                sx={{ width: "100%", height: "240px", mt: 10 }}
            />
        );
    }

};

export default Skeleton;
