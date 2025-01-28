import { CircularProgress, Skeleton } from "@mui/material";

function Loading() {
	return (
		<>
			<Skeleton variant="text" sx={{ fontSize: "5rem" }} />
			<Skeleton variant="rounded" width={"100%"} height={60} />
		</>
	);
}
export default Loading;
