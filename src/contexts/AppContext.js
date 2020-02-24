import React, { createContext } from "react";
import useStoreReducer from "../hooks/useStoreReducer";

export const AppContext = createContext();

const AppProvider = props => {
	const storeHandler = useStoreReducer({
		deckState: { cards: [], deck_id: null, remaining: null },
		playerCards: [{}],
		dealerCards: [{}],
		playerScore: 0,
		dealerScore: 0,
		isPlayerToPlay: true,
		whichPlayerWon: "",
		isLoading: true
	});

	return (
		<AppContext.Provider value={storeHandler}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
