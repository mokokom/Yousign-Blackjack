import { useState, useEffect } from "react";

const useDeckHandler = init => {
	const [{ deck_id, remaining, cards }, setState] = useState(init);
	const [playerCards, setPlayerCards] = useState([{}]);
	const [dealerCards, setDealerCards] = useState([{}]);
	const [playerScore, setPlayerScore] = useState();
	const [dealerScore, setDealerScore] = useState();
	const [isPlayerToPlay, setIsPlayerToPlay] = useState(true);
	const [isLoading, setIsloading] = useState(true);
	/* let score = 0; */
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
		setIsloading(!isLoading);
	};

	const checkAce = score => {
		return score + 11 <= 21 ? 11 : 1;
	};

	const calcPlayerScore = () => {
		let score = 0;
		playerCards.map(card => {
			score = pointTranslator(card, score);
		});
		return score;
	};
	const calcDealerScore = () => {
		let score = 0;
		if (isPlayerToPlay) {
			score = dealerCards[0].value;
		} else {
			dealerCards.forEach(card => {
				score = pointTranslator(card, score);
			});
		}
		return score;
	};

	const pointTranslator = (card, score) => {
		card.value === "ACE"
			? (score += checkAce(score))
			: isNaN(+card.value)
			? (score += 10)
			: (score += +card.value);
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

	useEffect(() => {
		setPlayerScore(calcPlayerScore());
		setDealerScore(calcDealerScore());
	}, [playerCards, dealerCards]);

	return [
		deck_id,
		remaining,
		cards,
		playerCards,
		dealerCards,
		isPlayerToPlay,
		hit,
		playerScore,
		dealerScore,
		isLoading
	];
};

export default useDeckHandler;
