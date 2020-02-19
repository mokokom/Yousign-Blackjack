import React from "react";
import useDeckHandler from "./hooks/useDeckHandler";
import Player from "./components/Player/Player";
import Dealer from "./components/Dealer/Dealer";
import Score from "./components/Score/Score";
import "./App.css";

const App = () => {
	const [
		playerCards,
		dealerCards,
		isPlayerToPlay,
		hit,
		stand,
		playerScore,
		dealerScore,
		isLoading,
		wichPlayerWon
	] = useDeckHandler({});

	return (
		<>
			{isLoading ? (
				<div className="yousign-container-logo blinking">
					<img
						src="https://pbs.twimg.com/profile_images/1217357286659719169/z8OIp0Wb_400x400.png"
						alt=""
					/>
				</div>
			) : (
				<div className="App">
					<Dealer
						dealerCards={dealerCards}
						isPlayerToPlay={isPlayerToPlay}
						dealerScore={dealerScore}
						wichPlayerWon={wichPlayerWon}
					/>
					<Score
						dealerCards={dealerCards}
						dealerScore={dealerScore}
						playerScore={playerScore}
						isPlayerToPlay={isPlayerToPlay}
					/>
					<Player
						playerCards={playerCards}
						hit={hit}
						stand={stand}
						isPlayerToPlay={isPlayerToPlay}
						wichPlayerWon={wichPlayerWon}
					/>
					{wichPlayerWon ? (
						<div
							className={`info-score-container info-score-container__${wichPlayerWon}`}
						>
							<p>{`${wichPlayerWon}Score` === 21 ? `${"BLACKJACK"}` : ""}</p>
							<p>{wichPlayerWon.toUpperCase()}:</p>
							<p>+ 1</p>
						</div>
					) : (
						""
					)}
				</div>
			)}
		</>
	);
};

export default App;
