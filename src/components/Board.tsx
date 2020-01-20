import * as React from 'react';
import { RowState, SquareState } from "../Helpers";
import Square from "./Square";

export interface BoardProps {
    noRows: number;
    noColumns: number;
    squares: Array<RowState>;
}

export class Board extends React.Component<BoardProps> {

    renderSquare(square: SquareState) {
        return <Square square={square} />;
    }

    renderRow(row: RowState, rowNumber: number) {
        return row.map((square, index) => {
            return this.renderSquare(square)
        });
    }

    render() {
        return (
            this.props.squares.map((row, index) => {
                return <div className="board-row">{this.renderRow(row, index)}</div>
            })
        )
    }
}

export default Board;