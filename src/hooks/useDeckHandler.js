import { useState, useEffect, useCallback } from "react";

const useDeckHandler = init => {
	const [{ deck_id, remaining, cards }, setState] = useState(init);
	const [playerCards, setPlayerCards] = useState([{}]);
	const [dealerCards, setDealerCards] = useState([{}]);
	const [playerScore, setPlayerScore] = useState();
	const [dealerScore, setDealerScore] = useState();
	const [isPlayerToPlay, setIsPlayerToPlay] = useState(true);
	const [isLoading, setIsloading] = useState(true);
	const [test, setTest] = useState("");

	useEffect(() => {
		/* setIsPlayerToPlay(true); */
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
			console.log(playerCards);
		} else {
			setPlayerCards(response.cards.filter((c, i) => i % 2 !== 0));
			setDealerCards(response.cards.filter((c, i) => i % 2 === 0));
		}
		setIsloading(!isLoading);
	};

	const calcPlayerScore = () => {
		let score = 0;
		playerCards.map(card => {
			score = pointTranslator(card, score);
		});
		setPlayerScore(score);
	};

	const calcDealerScore = test => {
		let score = 0;
		test
			? (score = pointTranslator(dealerCards[0], score))
			: dealerCards.map(card => {
					score = pointTranslator(card, score);
			  });
		console.log(`score from calcDealerScore ${score}`);

		setDealerScore(score);
	};

	const pointTranslator = (card, score) => {
		switch (card.value) {
			case "ACE":
				score += score + 11 <= 21 ? 11 : 1;
				break;
			case "KING":
			case "QUEEN":
			case "JACK":
				score += 10;
				break;
			default:
				score += +card.value;
		}
		return score;
	};

	const hit = async () => {
		console.log("hit");
		const response = await fetchCard();
		setState({
			deck_id: response.deck_id,
			remaining: response.remaining,
			cards: [...cards, ...response.cards]
		});
		setPlayerCards([...playerCards, ...response.cards]);
	};

	const fetchCard = async () => {
		const data = await fetch(
			`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
		);
		const response = await data.json();
		return response;
	};

	const stand = async () => {
		setIsPlayerToPlay(false);
		let score = dealerScore;
		while (score < 17) {
			const response = await fetchCard();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...cards, ...response.cards]
			});
			setDealerCards(prevState => [...prevState, ...response.cards]);
			score = pointTranslator(response.cards[0], score);
			console.log(score, response.cards[0]);
		}
	};

	useEffect(() => {
		calcPlayerScore();
		calcDealerScore();
	}, [playerCards, dealerCards]);

	if (playerScore > 21) console.log("loooose");

	/* console.log(playerScore); */

	return [
		deck_id,
		remaining,
		cards,
		playerCards,
		dealerCards,
		isPlayerToPlay,
		hit,
		stand,
		playerScore,
		dealerScore,
		isLoading
	];
};

export default useDeckHandler;
