export const DefaultFont = 'VT323';

export enum Keys {
    LEFT = 'LEFT',
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
};

export enum Keyboard {
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    A = 90,
    B = 88,
    START = 13,
    SELECT = 8,
}

export const KeyMapping = {
    [Keys.LEFT]: Keyboard.LEFT,
    [Keys.UP]: Keyboard.UP,
    [Keys.RIGHT]: Keyboard.RIGHT,
    [Keys.DOWN]: Keyboard.DOWN,
};
