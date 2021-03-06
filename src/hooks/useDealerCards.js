import React from "react";

const useDealerCards = (dealerCards, isPlayerToPlay) => {
	let cards = null;

	if (isPlayerToPlay) {
		cards = dealerCards.map((card, i) => {
			return i === 1 ? (
				<div key={card.code} className="card-container">
					<img
						src={card.image}
						alt={`card: ${card.value}`}
						className="card-container__image"
						style={{ display: "" }}
					/>
					<div className="general-overlay dealer-hide-overlay"></div>
				</div>
			) : (
				<div key={card.code} className="card-container">
					<img
						src={card.image}
						alt={`card: ${card.value}`}
						className="card-container__image"
					/>
					<div className="general-overlay dealer-overlay"></div>
				</div>
			);
		});
	} else {
		cards = dealerCards.map((card, i) => {
			return (
				<div key={card.code} className="card-container">
					<img
						src={card.image}
						alt={`card: ${card.value}`}
						className="card-container__image"
					/>
					<div className="general-overlay dealer-overlay"></div>
				</div>
			);
		});
	}

	const pointTranslator = () => {
		switch (dealerCards[0].value) {
			case "ACE":
				dealerCards[0].value = 11;
				break;
			case "KING":
			case "QUEEN":
			case "JACK":
				dealerCards[0].value = 10;
				break;
			default:
				dealerCards[0].value = +dealerCards[0].value;
		}
		return dealerCards[0].value;
	};

	return [cards, pointTranslator];
};

export default useDealerCards;
