export type Position = {
    row: number;
    column: number;
}

export type SquareState = {
    value: number | 'B' | null;
    hidden: boolean;
    position: Position;
    flagPlaced: boolean;
}

export enum GameStatus {
    Won,
    Lost,
    InProgress
}

export type RowState = Array<SquareState>;

export const BOMB = "B";

export const directions = [[1, 0], [-1, 0], [0, 1], [0, -1], [-1, -1], [-1, 1], [1, 1], [1, -1]];

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}

export function isMinePlaced(square: SquareState): boolean {
    return square && square.value === BOMB;
}

export function setPosition(rowNumber: number, columnNumber: number): Position {
    const position: Position = {
        row: rowNumber,
        column: columnNumber
    }

    return position;
}