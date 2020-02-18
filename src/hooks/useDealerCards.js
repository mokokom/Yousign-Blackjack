import React from "react";

const useDealerCards = (dealerCards, isPlayerToPlay, dealerScore) => {
	let cards = null;

	if (isPlayerToPlay) {
		cards = dealerCards.map((card, i) => {
			return i === 1 ? (
				<img
					key={card.code}
					src={card.image}
					alt={`card: ${card.value}`}
					className="hide"
					style={{ display: "" }}
				/>
			) : (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	} else {
		cards = dealerCards.map((card, i) => {
			return (
				<img key={card.code} src={card.image} alt={`card: ${card.value}`} />
			);
		});
	}

	const pointTranslator = () => {
		switch (dealerCards[0].value) {
			case "ACE":
				dealerCards[0].value = dealerCards[1].value + 11 <= 21 ? 11 : 1;
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
