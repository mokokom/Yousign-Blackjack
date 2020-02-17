import React, { useState } from "react";
import useDeckHandler from "./hooks/useDeckHandler";
import Player from "./components/Player/Player";
import Dealer from "./components/Dealer";
import "./App.css";

const App = () => {
	const [
		deck_id,
		remaining,
		cards,
		playerCards,
		dealerCards,
		calcScore,
		hit
	] = useDeckHandler({});
	console.log(deck_id, remaining);

	/* console.log(deck_id, cards, remaining, playerCards, dealerCards); */

	return (
		<div className="App">
			<Player playerCards={playerCards} hit={hit} score={calcScore} />
			<Dealer />
		</div>
	);
};

export default App;
