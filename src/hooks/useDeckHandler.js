import { useState, useEffect } from "react";

const useDeckHandler = init => {
	const [{ deck_id, remaining, cards }, setState] = useState(init);
	const [playerCards, setPlayerCards] = useState([{}]);
	const [dealerCards, setDealerCards] = useState([{}]);
	const [playerScore, setPlayerScore] = useState(0);
	const [dealerScore, setDealerScore] = useState();
	const [isPlayerToPlay, setIsPlayerToPlay] = useState();
	const [isLoading, setIsloading] = useState(true);
	const [test, setTest] = useState("");

	useEffect(() => {
		setIsPlayerToPlay(true);
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
		/* return score; */
		setPlayerScore(score);
	};
	const calcDealerScore = () => {
		let score = 0;
		isPlayerToPlay
			? (score = pointTranslator(dealerCards[0], score))
			: dealerCards.map(card => {
					score = pointTranslator(card, score);
			  });
		/* return score; */
		setDealerScore(score);
	};

	const pointTranslator = (card, score) => {
		card.value === "ACE"
			? (score += checkAce(score))
			: isNaN(+card.value)
			? (score += 10)
			: (score += +card.value);
		return score;
	};

	const hit = async () => {
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
		/* if (dealerScore < 17) {
			const response = await fetchCard();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...cards, ...response.cards]
			});
			setDealerCards([...dealerCards, ...response.cards]);
		} */
		if (dealerScore < 17) {
			while (dealerScore < 17) {
				console.log("<17");
				const response = await fetchCard();
				setState({
					deck_id: response.deck_id,
					remaining: response.remaining,
					cards: [...cards, ...response.cards]
				});
				setDealerCards([...dealerCards, ...response.cards]);
			}
		} else if (dealerScore >= 17 && dealerScore <= 21) {
			dealerScore > playerScore
				? console.log("dealer win")
				: console.log("player win");
		} else if (dealerScore > 21) {
			console.log("player win");
		}
	};

	useEffect(() => {
		/* console.log("getscore"); */
		calcPlayerScore();
		calcDealerScore();
	}, [playerCards, dealerCards, isPlayerToPlay, stand]);

	if (playerScore > 21) console.log("loooose");

	console.log(playerScore);

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
