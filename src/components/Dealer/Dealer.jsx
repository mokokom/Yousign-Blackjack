import React from "react";

const Dealer = ({ dealerCards, score }) => {
	return (
		<>
			<h1>Dealer: {score("dealer")}</h1>

			<div className="card-container">
				{dealerCards.map(card => {
					return (
						<div>
							<img src={card.image} alt={`${card.suit} ${card.value}`} />
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Dealer;
