import { Skeleton } from "@mui/material";

function FakeChat() {
	return (
		<>
			<div className="App Loader" data-theme="light">
				<div className="Loader__sidebar">
					<Skeleton variant="rounded" width="100%" height="100%" />
				</div>
				<div className="rest">
					<div className="Loader__topbar">
						<Skeleton
							variant="rectangle"
							width="100%"
							height="100%"
							animation={false}
						/>
					</div>
					<div className="rest__2">
						<Skeleton
							variant="rectangle"
							width="100%"
							height="100%"
							animation="wave"
						/>
					</div>
					<div className="Loader__input">
						<Skeleton
							variant="rectangle"
							width="100%"
							height="100%"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
export default FakeChat;
