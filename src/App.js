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
		isPlayerWon,
		isCardLoading
	] = useDeckHandler({});
	console.log(isCardLoading);

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
						isCardLoading={isCardLoading}
					/>
					<Score
						dealerCards={dealerCards}
						dealerScore={dealerScore}
						playerScore={playerScore}
					/>
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
