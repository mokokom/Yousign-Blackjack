import React, { createContext } from "react";
import useDeckHandler from "../hooks/useDeckHandler";

export const AppContext = createContext();

const AppProvider = props => {
	const deckHandler = useDeckHandler({});
	return (
		<AppContext.Provider value={deckHandler}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
