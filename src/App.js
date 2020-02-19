import React from "react";
import Board from "./components/Board/Board";
import AppProvider from "./contexts/AppContext";

import "./App.css";

const App = () => {
	return (
		<AppProvider>
			<Board></Board>
		</AppProvider>
	);
};

export default App;
