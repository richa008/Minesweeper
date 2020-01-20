import * as React from 'react';
import { SquareState } from "../Helpers";

export interface SquareProps {
    square: SquareState
}

export class Sqaure extends React.Component<SquareProps> {

    render() {
        return (
            <button className="square">{this.props.square.value}
            </button>
        )
    }
}

export default Sqaure;