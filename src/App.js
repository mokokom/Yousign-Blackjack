import React, { useState } from "react";
import useDeckHandler from "./hooks/useDeckHandler";
import Player from "./components/Player/Player";
import Dealer from "./components/Dealer/Dealer";
import Score from "./components/Score/Score";
import "./App.css";

const App = () => {
	const [
		deck_id,
		remaining,
		cards,
		playerCards,
		dealerCards,
		isPlayerToPlay,
		hit,
		stand,
		playerScore,
		dealerScore,
		isLoading,
		wichPlayerWon,
		isCardLoading
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
						isCardLoading={isCardLoading}
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
						playerScore={playerScore}
						isPlayerToPlay={isPlayerToPlay}
						wichPlayerWon={wichPlayerWon}
					/>
					{wichPlayerWon === "player" && (
						<div className="info-score-container info-score-container__player">
							{/* <p>{`${playerScore} / ${dealerScore}`}</p> */}
							<p>{playerScore === 21 ? `${"BLACKJACK"}` : ""}</p>
							<p>{`YOUSIGNER: + 1`}</p>
						</div>
					)}
					{wichPlayerWon === "dealer" && (
						<div className="info-score-container info-score-container__dealer">
							<p>{dealerScore === 21 ? `${"BLACKJACK"}` : ""}</p>
							{/* <p>{` ${dealerScore} / ${playerScore}`}</p> */}
							<p>{`DEALER: + 1`}</p>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default App;
