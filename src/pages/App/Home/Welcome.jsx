import { lazy, memo, Suspense } from "react";
import useGlobal from "../../../hooks/zustand/global";
import { Skeleton } from "@mui/material";
const Suggestion = lazy(() => import("./Suggestion"));
const dataSample = [
	"Generate unit tests for the following C# function",
	"Help write SQL to generate a report",
	"Teach me the concept of game theory in simple terms",
	"Walk me through how to apply for a new role"
];

function Welcome() {
	const { nickname } = useGlobal((x) => x.user?.info);
	// const { userName, history } = global?.user;

	return (
		<>
			<div className="welcome">
				<header className="welcome__head">
					<h1>
						{nickname && (
							<>
								<span className="welcome__head-greeting">
									Hello, {nickname}
								</span>
								<span className="welcome__head-asking">
									How can I help you today?
								</span>
							</>
						)}
					</h1>
				</header>
				<div className="welcome__suggestion">
					<Suspense
						fallback={
							<Skeleton
								variant="rounded"
								width={"100%"}
								sx={{ maxHeight: 500, minHeight: 20 }}
								height={60}
							/>
						}
					>
						<Suggestion />
					</Suspense>
				</div>
			</div>
		</>
	);
}
export default memo(Welcome);
