import React from "react";
import { logDOM } from "@testing-library/react";

const Dealer = ({ dealerCards, isPlayerToPlay, dealerScore }) => {
	/* 	let dealerCard = null;
	if (turnToPlay) {
		dealerCard = dealerCards.map((card, i) => {
			return i === 1 ? (
				<img
					key={card.code}
					src={card.image}
					alt={`card: ${card.value}`}
					className="hide"
					style={{ display: "none" }}
				/>
			) : (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	} else {
		dealerCard = dealerCards.map((card, i) => {
			return (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	} */
	return (
		<>
			<h1>Dealer: {dealerScore}</h1>
			<div className="card-container">
				{/* dealerCard */}
				{dealerCards.map(card => {
					console.log(card.code);
					return (
						<div key={card.code}>
							<img src={card.image} alt={`${card.suit} ${card.value}`} />
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Dealer;
