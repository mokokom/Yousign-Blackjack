import React, { createContext } from "react";
import useStore from "../hooks/useStore";

export const AppContext = createContext();

const AppProvider = props => {
	const deckHandler = useStore({});
	return (
		<AppContext.Provider value={deckHandler}>
			{props.children}
		</AppContext.Provider>
	);
};

export default AppProvider;
