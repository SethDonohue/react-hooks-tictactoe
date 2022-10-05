import { useEffect, useState } from "react";
import "./App.css";

function Square({ value, onClick, className }) {
	return (
		<button onClick={onClick} className={`square ${className}`}>
			{value}
		</button>
	);
}

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [isXNext, setIsXNext] = useState(true);
	const [isGameEnd, setIsGameEnd] = useState(false);
	const [winner, setWinner] = useState();

	useEffect(() => {
		if (!squares.find((el) => el !== null)) {
			document.title = `TicTacToe`;
		} else {
			document.title = `TicTacToe: ${
				isGameEnd ? "Game Over!" : isXNext ? "X's turn!" : "O's turn!"
			}`;
		}
		checkGameEnd();
	});

	const handleRestart = () => {
		setSquares(Array(9).fill(null));
		setIsGameEnd(false);
	};

	const checkGameEnd = () => {
		if (!squares.includes(null)) {
			setIsGameEnd(true);
		}
		checkGameWin();
	};

	const checkGameWin = () => {
		const accumulator = (previousValue, currentValue) => {
			if (previousValue && currentValue) {
				return previousValue + currentValue;
			}
		};

		const getValues = (valOne, valTwo, valThree) => {
			return [squares[valOne], squares[valTwo], squares[valThree]].reduce(
				accumulator
			);
		};

		const winningValues = ["XXX", "OOO"];

		const topSquares = getValues(0, 1, 2);
		const middleHorizontalSquares = getValues(3, 4, 5);
		const bottomSquares = getValues(6, 7, 8);

		const leftSquares = getValues(0, 3, 6);
		const middleVerticalSquares = getValues(1, 4, 7);
		const rightSquares = getValues(2, 5, 8);

		const diagonalLeftSquares = getValues(0, 4, 8);
		const diagonalRightSquares = getValues(2, 4, 6);

		const allSquaresValues = [
			topSquares,
			middleHorizontalSquares,
			bottomSquares,
			leftSquares,
			middleVerticalSquares,
			rightSquares,
			diagonalLeftSquares,
			diagonalRightSquares,
		];

		allSquaresValues.forEach((value) => {
			if (winningValues.includes(value)) {
				if (value === "XXX") {
					setWinner("X");
				} else {
					setWinner("O");
				}
				setIsGameEnd(true);
			}
		});
		// switch (topSquares) {
		// 	case squares[0] === squares[1]:
		// 		break;

		// 	default:
		// 		break;
		// }
		// horizontal checks
		// if 1,2,3, or 4,5,6, or 6,7,8
		// vertical checks
		// if 1,4,7 or 2,5,8, or 3,6,9
		// diagonal checks
		// if 1,5,9, or 3,5,7
	};

	function renderSquare(i, className = "") {
		const handleSquareClick = () => {
			if (isGameEnd) {
				return;
			}
			const nextSquares = squares.slice();
			if (nextSquares[i] === null) {
				nextSquares[i] = isXNext ? "X" : "O";
				setIsXNext(!isXNext);
				setSquares(nextSquares);
			}
		};
		return (
			<Square
				value={squares[i]}
				className={className}
				onClick={handleSquareClick}
			/>
		);
	}

	const status = isGameEnd
		? `Game Over! Player ${winner} wins!`
		: isXNext
		? " Next Player: X"
		: "Next Player: O";

	return (
		<div className="container">
			<div className="status">{status}</div>
			<div className="board">
				<div className="board-row">
					{renderSquare(0, "top left")}
					{renderSquare(1, "top ")}
					{renderSquare(2, "top right")}
				</div>
				<div className="board-row">
					{renderSquare(3, "left")}
					{renderSquare(4)}
					{renderSquare(5, "right")}
				</div>
				<div className="board-row">
					{renderSquare(6, "bottom left")}
					{renderSquare(7, "bottom")}
					{renderSquare(8, "bottom right")}
				</div>
			</div>
			<button onClick={handleRestart} className="restart">
				Restart
			</button>
		</div>
	);
};

export default Board;
