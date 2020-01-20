import * as React from 'react';
import { isNullOrUndefined } from 'util';
import { RowState, Position, getRandomInt } from "../Helpers";
import Board from "./Board";

export interface GameState {
    noRows: number;
    noColumns: number;
    squares: Array<RowState>;
    minePositions: Array<Position>;
}

export class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.reset();
    }

    reset = () => {
        const noRows = 9, noColumns = 9;

        let state: GameState = {
            noRows: noRows,
            noColumns: noColumns,
            squares: this.initializeSquares(noRows, noColumns),
            minePositions: []
        }

        // TODO: create copy of state, don't mutate
        this.placeMines(state);

        if (isNullOrUndefined(this.state)) {
            this.state = state;
        } else {
            this.setState(state);
        }
    }

    initializeSquares = (noRows: number, noColumns: number) => {
         const squares: Array<RowState> =  [];

        for (let i = 0; i < noRows; i++) {
            const row:  RowState = [];
            for (let j = 0; j < noColumns; j++) {
                row.push({
                    value: null,
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
        const noMines = 10;
        let count = 0;
        while (count < noMines) {
            let randomRow = getRandomInt(state.noRows);
            let randomColumn = getRandomInt(state.noColumns);

            if (state.squares[randomRow] && state.squares[randomRow][randomColumn] && (state.squares[randomRow][randomColumn].value === null)) {
                const bomb = state.squares[randomRow][randomColumn];
                bomb.value = "B";
                let position: Position = {
                    row: randomRow,
                    column: randomColumn
                }
                bomb.position = position;
                state.minePositions.push(position);
                count++;
            }
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board noRows={this.state.noRows} noColumns={this.state.noColumns} squares={this.state.squares} />
                </div>
            </div>
        )
    }
}