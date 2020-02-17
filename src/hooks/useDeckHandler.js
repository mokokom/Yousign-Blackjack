import { useState, useEffect } from "react";

const useDeckHandler = init => {
	const [{ deck_id, remaining, cards }, setState] = useState(init);
	const [playerCards, setPlayerCards] = useState([]);
	const [dealerCards, setDealerCards] = useState([]);
	const [playerScore, setPlayerScore] = useState();
	/* const { cards } = state;
	console.log(cards); */

	useEffect(() => {
		try {
			const fetchDeck = async () => {
				const data = await fetch(
					"https://deckofcardsapi.com/api/deck/new/draw/?count=4"
				);
				const response = await data.json();
				setState(response);
				deal(response);
			};
			fetchDeck();
		} catch (error) {
			throw new Error(console.log(error));
		}
	}, []);

	const deal = response => {
		if (response.cards.length > 4) {
			setPlayerCards([...playerCards, response.cards.slice(-1).pop()]);
		} else {
			setPlayerCards(response.cards.filter((c, i) => i % 2 !== 0));
			setDealerCards(response.cards.filter((c, i) => i % 2 === 0));
		}
	};

	const checkScore = score => {
		return score + 11 <= 21 ? 11 : 1;
	};

	const calcPlayerScore = () => {
		let score = 0;
		playerCards.map(card => {
			card.value === "ACE"
				? (score += checkScore(score))
				: isNaN(+card.value)
				? (score += 10)
				: (score += +card.value);
		});
		return score;
	};
	const calcDealerScore = () => {
		let score = 0;
		dealerCards.map(card => {
			card.value === "ACE"
				? (score += checkScore(score))
				: isNaN(+card.value)
				? (score += 10)
				: (score += +card.value);
		});
		return score;
	};

	const hit = () => {
		const draw = async () => {
			const data = await fetch(
				`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
			);
			const response = await data.json();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...playerCards, ...response.cards]
			});
			setPlayerCards([...playerCards, ...response.cards]);
		};
		draw();
	};

	return [
		deck_id,
		remaining,
		cards,
		playerCards,
		dealerCards,
		calcPlayerScore,
		calcDealerScore,
		hit
	];
};

export default useDeckHandler;
