import React, { createContext } from "react";
import useStoreReducer from "../hooks/useStoreReducer";
/* import useStore from "../hooks/useStore"; */

export const AppContext = createContext();

const AppProvider = props => {
	/* const deckHandler = useStore({}); */
	const deckHandler = useStoreReducer({
		deckState: { cards: [], deck_id: null, remaining: null },
		playerCards: [{}],
		dealerCards: [{}],
		playerScore: 0,
		dealerScore: 0,
		isPlayerToPlay: true,
		whichPlayerWon: "",
		isLoading: true
	});

	/* const deck2 = useStoreReducer({}); */
	/* console.log(deck2); */

	return (
		<AppContext.Provider value={deckHandler}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
