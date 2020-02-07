import * as React from 'react';
import { SquareState } from "../Helpers";

export interface SquareProps {
    square: SquareState;
    onClick(square: SquareState): void;
    onContextMenu(square: SquareState): void;
}

export class Sqaure extends React.Component<SquareProps> {

    displayValue = () => {
        if (this.props.square.flagPlaced) {
            return 'F';
        }
        if (!this.props.square.hidden) {
            return this.props.square.value;
        }
    }

    squareClicked = () => {
        this.props.onClick(this.props.square);
    }

    squareRightClicked = (e: React.MouseEvent) => {
        this.props.onContextMenu(this.props.square);
        e.preventDefault();
    }

    render() {
        return (
            <button className="square" onClick={this.squareClicked} onContextMenu={this.squareRightClicked}>{this.displayValue()}</button>
        )
    }
}

export default Sqaure;