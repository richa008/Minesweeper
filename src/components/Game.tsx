import * as React from 'react';
import { isNullOrUndefined } from 'util';
import { RowState, getRandomInt, isMinePlaced, BOMB, directions, SquareState, GameStatus } from "../Helpers";
import Board from "./Board";

export interface GameState {
    noRows: number;
    noColumns: number;
    squares: Array<RowState>;
    noMines: number;
    gameStatus: GameStatus;
    noMinesPlacedByUser: number;
    squaresRevealed: number;
}

export class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.reset();
    }

    reset = () => {
        const noRows = 9, noColumns = 9, noMines = 10;

        let state: GameState = {
            noRows: noRows,
            noColumns: noColumns,
            squares: this.initializeSquares(noRows, noColumns),
            noMines: noMines,
            gameStatus: GameStatus.InProgress,
            noMinesPlacedByUser: 0,
            squaresRevealed: 0
        }

        // TODO: create copy of state, don't mutate
        this.placeMines(state);
        this.calculateSquareValues(state);

        if (isNullOrUndefined(this.state)) {
            this.state = state;
        } else {
            this.setState(state);
        }
    }

    initializeSquares = (noRows: number, noColumns: number) => {
        const squares: Array<RowState> = [];

        for (let i = 0; i < noRows; i++) {
            const row: RowState = [];
            for (let j = 0; j < noColumns; j++) {
                row.push({
                    value: null,
                    flagPlaced: false,
                    hidden: true,
                    position: {
                        row: i,
                        column: j
                    }
                })
            }
            squares.push(row)
        }

        return squares;
    }

    placeMines = (state: GameState) => {
        const noMines = state.noMines;
        let count = 0;
        while (count < noMines) {
            let randomRow = getRandomInt(state.noRows);
            let randomColumn = getRandomInt(state.noColumns);

            if (!isMinePlaced(state.squares[randomRow][randomColumn])) {
                const bomb = state.squares[randomRow][randomColumn]; // TODO: write method for place Mine
                bomb.value = BOMB;
                count++;
            }
        }
    }

    calculateSquareValues = (state: GameState) => {
        for (let i = 0; i < state.noRows; i++) { // TODO: change loop to map?
            for (let j = 0; j < state.noColumns; j++) {
                const square = state.squares[i][j];
                if (!isMinePlaced(square)) {
                    let value = 0;
                    for (let k = 0; k < directions.length; k++) {
                        const num = directions[k];
                        const tempRow = num[0] + i;
                        const tempCol = num[1] + j;
                        if (tempRow >= 0 && tempRow < state.noRows && tempCol >= 0 && tempCol < state.noColumns && isMinePlaced(state.squares[tempRow][tempCol])) {
                            value = value + 1;
                        }
                    }
                    square.value = value;
                }
            }
        }
    }

    revealSurroundingValues = (square: SquareState, squaresRevealed: number): number => {

        if (!square.hidden) {
            return squaresRevealed;
        }

        square.hidden = false;
        squaresRevealed++;

        if (square.value !== 0) {
            return squaresRevealed;
        }

        for (let k = 0; k < directions.length; k++) {
            const num = directions[k];
            const tempRow = num[0] + square.position.row;
            const tempCol = num[1] + square.position.column;
            if (tempRow >= 0 && tempRow < this.state.noRows && tempCol >= 0 && tempCol < this.state.noColumns) {
                this.revealSurroundingValues(this.state.squares[tempRow][tempCol], squaresRevealed);
            }
        };

        return squaresRevealed;
    }

    handleLeftClick = (square: SquareState) => {
        if (square.hidden && this.state.gameStatus === GameStatus.InProgress) {

            if (isMinePlaced(square)) {
                square.hidden = false;
                this.setState({
                    gameStatus: GameStatus.Lost
                });
                return;
            }

            const squaresRevealed = this.revealSurroundingValues(square, 0);
            const newSquares = this.state.squares.slice();
            this.setState({
                squares: newSquares,
                squaresRevealed: squaresRevealed
            })
        }
    }

    handleRightClick = (square: SquareState) => {
        if (square.hidden && this.state.gameStatus === GameStatus.InProgress) {
            const minesPlaced = this.state.noMinesPlacedByUser + 1;
            square.flagPlaced = !square.flagPlaced;
            const newSquares = this.state.squares.slice();
            this.setState({
                squares: newSquares,
                noMinesPlacedByUser: minesPlaced
            });
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        noRows={this.state.noRows}
                        noColumns={this.state.noColumns}
                        squares={this.state.squares}
                        onClick={this.handleLeftClick}
                        onContextMenu={this.handleRightClick} />
                </div>
            </div>
        )
    }
}