import { useState, useEffect } from "react";

const useDeckHandler = init => {
	const [{ deck_id, remaining, cards }, setState] = useState(init);
	const [playerCards, setPlayerCards] = useState([{}]);
	const [dealerCards, setDealerCards] = useState([{}]);
	const [playerScore, setPlayerScore] = useState();
	const [dealerScore, setDealerScore] = useState();
	const [isPlayerToPlay, setIsPlayerToPlay] = useState(true);
	const [isLoading, setIsloading] = useState(true);
	const [wichPlayerWon, setWichPlayerWon] = useState("");
	const [isCardLoading, setIsCardLoading] = useState(false);
	/* 	const [showCard, setshowCard] = useState(""); */

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

	const calcDealerScore = showCard => {
		let score = 0;
		showCard
			? (score = pointTranslator(dealerCards[0], score))
			: dealerCards.map(card => {
					score = pointTranslator(card, score);
			  });

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
		let cards = [];
		/* setIsCardLoading(true); */
		while (score < 17) {
			/* setIsCardLoading(true); */
			const response = await fetchCard();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...cards, ...response.cards]
			});
			cards.push(...response.cards);
			score = pointTranslator(response.cards[0], score);
		}

		setDealerCards(prevState => [...prevState, ...cards]);
		if (score >= 17 && score <= 21) {
			score > playerScore
				? setWichPlayerWon(
						"dealer"
				  ) /* console.log(`dealer ${score} won, ${playerScore} loose`) */
				: setWichPlayerWon(
						"player"
				  ); /* console.log(`player ${playerScore} won, dealer ${score} loose`); */
		} else if (score > 21) {
			setWichPlayerWon(
				"player"
			); /* console.log(`player ${playerScore} won, dealer ${score} loose`); */
		} else if (score === playerScore) {
			setWichPlayerWon(
				"dealer"
			); /* console.log(`dealer ${playerScore} won, player ${score} loose`); */
		}
		setTimeout(() => {
			handleReset();
		}, 3000);
	};

	const handleReset = () => {
		/* setIsCardLoading(false); */
		setWichPlayerWon("");
		setIsPlayerToPlay(true);
		try {
			const fetchDeck = async () => {
				const data = await fetch(
					"https://deckofcardsapi.com/api/deck/new/draw/?count=4"
				);
				const response = await data.json();
				setState(response);
				deal(response);
				setIsloading(false);
			};
			fetchDeck();
		} catch (error) {
			throw new Error(console.log(error));
		}
		/* setTimeout(() => {
		}, 3000); */
	};

	useEffect(() => {
		calcPlayerScore();
		calcDealerScore();
	}, [playerCards, dealerCards]);

	useEffect(() => {
		if (playerScore > 21) {
			setWichPlayerWon("dealer");
			setIsPlayerToPlay(false);
			setTimeout(() => {
				handleReset();
			}, 2000);
		}
	}, [playerScore]);

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
		isLoading,
		wichPlayerWon,
		isCardLoading
	];
};

export default useDeckHandler;
