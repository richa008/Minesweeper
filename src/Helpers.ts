export type Position = {
    row: number;
    column: number;
}

export type SquareState = {
    value: number | 'B' | null;
    hidden: boolean;
    position: Position;
}

export type RowState = Array<SquareState>;

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}