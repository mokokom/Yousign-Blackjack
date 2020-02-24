import React, { useReducer, useEffect } from "react";
/* import "./styles.css"; */

/* const initState = {
	deckState: { cards: [], deck_id: null, remaining: null },
	playerCards: {},
	dealerCards: {},
	playerScore: 0,
	dealerScore: 0,
	isPlayerToPlay: true,
	whichPlayerWon: "",
	isLoading: true
};
export default function App(initState) {
	const { state, hit, stand } = useStore(initState);
	console.log(state);
	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<div className="player">
				{state.playerCards
					? state.playerCards.map(card => {
							return <img src={card.image} alt="card" />;
					  })
					: ""}
			</div>
			<button onClick={hit}>hit</button>
			<button onClick={stand}>stand</button>
			<div className="dealer">
				{state.dealerCards
					? state.dealerCards.map(card => {
							return <img src={card.image} alt="card" />;
					  })
					: ""}
			</div>
		</div>
	);
} */

const reducer = (state, action) => {
	switch (action.type) {
		case "FETCH_SUCCESS":
			return {
				...state,
				deckState: action.newDeck,
				isLoading: false
			};
		case "UPDATE_DECK":
			return {
				...state,
				deckState: action.updateDeck,
				isLoading: false
			};
		case "DRAW_PLAYER_CARD":
			return { ...state, playerCards: action.drawCard };
		case "SET_PLAYER_CARDS":
			return {
				...state,
				playerCards: action.distributeToPlayer,
				playerScore: action.newScore
			};
		case "SET_DEALER_CARDS":
			return {
				...state,
				dealerCards: action.distributeToDealer,
				dealerScore: action.newScore
			};
		case "GAME_TURN":
			return {
				...state,
				isPlayerToPlay: action.toggleTurn
			};
		case "ASSIGN_WIN":
			return {
				...state,
				whichPlayerWon: action.setWichPlayerWon
			};
		case "FETCH_FAIL":
			throw new Error(console.log(action.errorMessage));
		default:
			return state;
	}
};

const useStoreReducer = initState => {
	const [state, dispatch] = useReducer(reducer, initState);
	console.log(state);

	useEffect(() => {
		try {
			const fetchDeck = async () => {
				const data = await fetch(
					"https://deckofcardsapi.com/api/deck/new/draw/?count=4"
				);
				const response = await data.json();
				/* console.log(response); */

				dispatch({ type: "FETCH_SUCCESS", newDeck: response });
				deal(dispatch, response);
			};
			fetchDeck();
		} catch (error) {
			dispatch({ type: "FETCH_FAIL", errorMessage: console.log(error) });
		}
	}, []);

	useEffect(() => {
		calcPlayerScore();
	}, [state.playerCards]);
	useEffect(() => {
		calcDealerScore();
	}, [state.dealerCards]);

	const calcPlayerScore = () => {
		let score = 0;
		console.log(state.playerCards);
		if (state.playerCards.length > 1) {
			state.playerCards.forEach(card => {
				score = pointTranslator(card, score);
			});
		}
		dispatch({
			type: "SET_PLAYER_CARDS",
			newScore: score,
			distributeToPlayer: state.playerCards
		});
	};
	const calcDealerScore = showCard => {
		let score = 0;
		if (state.dealerCards.length > 1) {
			state.dealerCards.forEach(card => {
				score = pointTranslator(card, score);
			});
		}
		dispatch({
			type: "SET_DEALER_CARDS",
			newScore: score,
			distributeToDealer: state.dealerCards
		});
		/* console.log(showCard)
  if(state.dealerCards){
    showCard
      ? (score = pointTranslator(state.dealerCards[0], score))
      : state.dealerCards.forEach(card => {
          score = pointTranslator(card, score);
        });
        dispatch({type: "UPDATE_DEALER_SCORE", newScore: score, distributeToDealer: state.dealerCards})
  } */
	};

	const hit = async () => {
		const response = await fetchCard(state.deckState.deck_id);
		dispatch({
			type: "SET_PLAYER_CARDS",
			distributeToPlayer: [...state.playerCards, ...response.cards]
		});
		dispatch({
			type: "UPDATE_DECK",
			updateDeck: {
				cards: [...state.deckState.cards, ...response.cards],
				remaining: response.remaining,
				deck_id: response.deck_id
			}
		});
	};

	const stand = async () => {
		dispatch({ type: "GAME_TURN", toggleTurn: false });

		let score = state.dealerScore;
		let cards = [];

		while (score < 17) {
			const response = await fetchCard(state.deckState.deck_id);
			dispatch({
				type: "UPDATE_DECK",
				updateDeck: {
					cards: [...state.deckState.cards, ...response.cards],
					remaining: response.remaining,
					deck_id: response.deck_id
				}
			});

			cards.push(...response.cards);

			score = pointTranslator(response.cards[0], score);
		}
		cards.forEach(card => {
			setTimeout(() => {
				dispatch({
					type: "SET_DEALER_CARDS",
					distributeToDealer: [...state.dealerCards, ...cards]
				});
			}, 500);
		});
		setTimeout(() => {
			if (score >= 17 && score <= 21) {
				score >= state.playerScore
					? dispatch({
							type: "ASSIGN_WIN",
							setWichPlayerWon: "dealer"
					  })
					: dispatch({
							type: "ASSIGN_WIN",
							setWichPlayerWon: "yousigner"
					  });
			} else if (score > 21) {
				dispatch({
					type: "ASSIGN_WIN",
					setWichPlayerWon: "yousigner"
				});
			}
		}, 2000);

		setTimeout(() => {
			handleReset();
		}, 3500);
	};

	const handleReset = () => {
		setTimeout(() => {
			try {
				const fetchDeck = async () => {
					const data = await fetch(
						"https://deckofcardsapi.com/api/deck/new/draw/?count=4"
					);
					const response = await data.json();

					dispatch({ type: "FETCH_SUCCESS", newDeck: response });
					deal(dispatch, response);
				};
				fetchDeck();
			} catch (error) {
				throw new Error(console.log(error));
			}
			dispatch({ type: "ASSIGN_WIN", whichPlayerWon: null });

			dispatch({ type: "GAME_TURN", toggleTurn: true });
		}, 800);
	};

	console.log(state);

	return { state, hit, stand };
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

const deal = (dispatch, response) => {
	if (response.cards.length > 4) {
		dispatch({
			type: "DRAW_PLAYER_CARD",
			drawCard: response.cards.slice(-1).pop()
		});
	} else {
		dispatch({
			type: "SET_PLAYER_CARDS",
			distributeToPlayer: response.cards.filter((c, i) => i % 2 !== 0)
		});
		dispatch({
			type: "SET_DEALER_CARDS",
			distributeToDealer: response.cards.filter((c, i) => i % 2 === 0)
		});
	}
};

const fetchCard = async deck_id => {
	const data = await fetch(
		`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
	);
	const response = await data.json();
	return response;
};

export default useStoreReducer;
