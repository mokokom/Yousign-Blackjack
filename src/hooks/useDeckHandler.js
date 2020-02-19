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
		setIsloading(false);
	};

	const calcPlayerScore = () => {
		let score = 0;
		playerCards.forEach(card => {
			score = pointTranslator(card, score);
		});
		setPlayerScore(score);
	};

	const calcDealerScore = showCard => {
		let score = 0;
		showCard
			? (score = pointTranslator(dealerCards[0], score))
			: dealerCards.forEach(card => {
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
	const fetchCard = async () => {
		const data = await fetch(
			`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
		);
		const response = await data.json();
		return response;
	};
	/* 	const hit = async () => {
		const response = await fetchCard();
		setState({
			deck_id: response.deck_id,
			remaining: response.remaining,
			cards: [...cards, ...response.cards]
		});
		setPlayerCards([...playerCards, ...response.cards]);
	}; */

	/* const stand = async () => {
		setIsPlayerToPlay(false);

		let score = dealerScore;
		let cards = [];

		while (score < 17) {
			const response = await fetchCard();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...cards, ...response.cards]
			});
			cards.push(...response.cards);
			score = pointTranslator(response.cards[0], score);
		}
		cards.forEach(card => {
			setTimeout(() => {
				setDealerCards(prevState => [...prevState, card]);
			}, 500);
		});
		setTimeout(() => {
			if (score >= 17 && score <= 21) {
				score >= playerScore
					? setWichPlayerWon("dealer")
					: setWichPlayerWon("yousigner");
			} else if (score > 21) {
				setWichPlayerWon("yousigner");
			}
		}, 2000);

		setTimeout(() => {
			handleReset();
		}, 3500);
	};
 */
	const handleReset = () => {
		setTimeout(() => {
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
			setWichPlayerWon("");
			setIsPlayerToPlay(true);
		}, 800);
		setIsloading(true);
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
			}, 1500);
		}
	}, [playerScore]);

	return {
		playerCards,
		dealerCards,
		isPlayerToPlay,
		hit: async () => {
			const response = await fetchCard();
			setState({
				deck_id: response.deck_id,
				remaining: response.remaining,
				cards: [...cards, ...response.cards]
			});
			setPlayerCards([...playerCards, ...response.cards]);
		},
		stand: async () => {
			setIsPlayerToPlay(false);

			let score = dealerScore;
			let cards = [];

			while (score < 17) {
				const response = await fetchCard();
				setState({
					deck_id: response.deck_id,
					remaining: response.remaining,
					cards: [...cards, ...response.cards]
				});
				cards.push(...response.cards);
				score = pointTranslator(response.cards[0], score);
			}
			cards.forEach(card => {
				setTimeout(() => {
					setDealerCards(prevState => [...prevState, card]);
				}, 500);
			});
			setTimeout(() => {
				if (score >= 17 && score <= 21) {
					score >= playerScore
						? setWichPlayerWon("dealer")
						: setWichPlayerWon("yousigner");
				} else if (score > 21) {
					setWichPlayerWon("yousigner");
				}
			}, 2000);

			setTimeout(() => {
				handleReset();
			}, 3500);
		},
		playerScore,
		dealerScore,
		isLoading,
		wichPlayerWon
	};
};

export default useDeckHandler;
