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
		playerScore,
		dealerScore,
		isLoading
	] = useDeckHandler({});
	console.log(isLoading);

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
					/>
					<Player
						playerCards={playerCards}
						hit={hit}
						playerScore={playerScore}
					/>
				</div>
			)}
		</>
	);
};

export default App;
