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
		calcPlayerScore,
		calcDealerScore,
		hit
	] = useDeckHandler({});
	console.log(deck_id, remaining);

	/* console.log(deck_id, cards, remaining, playerCards, dealerCards); */

	return (
		<div className="App">
			<Dealer dealerCards={dealerCards} score={calcDealerScore} />
			<Player playerCards={playerCards} hit={hit} score={calcPlayerScore} />
		</div>
	);
};

export default App;
