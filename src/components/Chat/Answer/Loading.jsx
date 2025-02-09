import { CircularProgress, Skeleton } from "@mui/material";

function Loading() {
	return (
		<div className="Chatbox__Loading">
			<Skeleton variant="text" sx={{ fontSize: "5rem" }} />
			<Skeleton
				variant="rounded"
				width={"100%"}
				height={60}
				sx={{ marginBottom: "16px" }}
				animation="wave"
			/>

			<Skeleton
				variant="rounded"
				width={"100%"}
				height={60}
				sx={{ marginBottom: "16px" }}
				animation="wave"
			/>
			<Skeleton
				variant="rounded"
				width={"100%"}
				height={60}
				sx={{ marginBottom: "16px" }}
				animation="wave"
			/>
		</div>
	);
}
export default Loading;
