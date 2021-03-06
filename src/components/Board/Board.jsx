import React, { useContext, memo } from "react";

import { AppContext } from "../../contexts/AppContext";

import Player from "../Player/Player";
import Dealer from "../Dealer/Dealer";
import Score from "../Score/Score";

import "./Board.css";

const Board = () => {
	const { state } = useContext(AppContext);

	return (
		<>
			{state.isLoading ? (
				<div className="yousign-container-logo blinking">
					<img
						src="https://pbs.twimg.com/profile_images/1217357286659719169/z8OIp0Wb_400x400.png"
						alt="LOAD..."
					/>
				</div>
			) : (
				<div className="App">
					<Dealer />
					<Score />
					<Player />
					{state.whichPlayerWon ? (
						<div
							className={`info-score-container info-score-container__${state.whichPlayerWon}`}
						>
							<p className="zoomOut">
								{`${state.whichPlayerWon}Score` === 21 ? `${"BLACKJACK"}` : ""}
							</p>
							<p className="zoomOut">{state.whichPlayerWon.toUpperCase()}</p>
							<p className="zoomOut">+ 1</p>
						</div>
					) : (
						""
					)}
				</div>
			)}
		</>
	);
};

export default memo(Board);
