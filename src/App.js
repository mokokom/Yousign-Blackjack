import React, { useState } from "react";
import useDeckHandler from "./hooks/useDeckHandler";
import Player from "./components/Player/Player";
import Dealer from "./components/Dealer/Dealer";
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
		isPlayerWon
	] = useDeckHandler({});
	console.log(isPlayerWon);

	return (
		<>
			{isLoading ? (
				<h1>LOADING....</h1>
			) : (
				<div className="App">
					<Dealer
						dealerCards={dealerCards}
						isPlayerToPlay={isPlayerToPlay}
						dealerScore={dealerScore}
						isPlayerWon={isPlayerWon}
					/>
					<div className="scores">
						<div className="dealer-value">{dealerScore}</div>
						<hr className="score-divider" />
						<div className="player-value">{dealerScore}</div>
					</div>
					<Player
						playerCards={playerCards}
						hit={hit}
						stand={stand}
						playerScore={playerScore}
						isPlayerToPlay={isPlayerToPlay}
						isPlayerWon={isPlayerWon}
					/>
				</div>
			)}
		</>
	);
};

export default App;
