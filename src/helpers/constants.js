define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyMapping = exports.Keyboard = exports.Keys = exports.DefaultFont = void 0;
    exports.DefaultFont = 'VT323';
    var Keys;
    (function (Keys) {
        Keys["LEFT"] = "LEFT";
        Keys["UP"] = "UP";
        Keys["RIGHT"] = "RIGHT";
        Keys["DOWN"] = "DOWN";
    })(Keys = exports.Keys || (exports.Keys = {}));
    ;
    var Keyboard;
    (function (Keyboard) {
        Keyboard[Keyboard["LEFT"] = 37] = "LEFT";
        Keyboard[Keyboard["UP"] = 38] = "UP";
        Keyboard[Keyboard["RIGHT"] = 39] = "RIGHT";
        Keyboard[Keyboard["DOWN"] = 40] = "DOWN";
        Keyboard[Keyboard["A"] = 90] = "A";
        Keyboard[Keyboard["B"] = 88] = "B";
        Keyboard[Keyboard["START"] = 13] = "START";
        Keyboard[Keyboard["SELECT"] = 8] = "SELECT";
    })(Keyboard = exports.Keyboard || (exports.Keyboard = {}));
    exports.KeyMapping = {
        [Keys.LEFT]: Keyboard.LEFT,
        [Keys.UP]: Keyboard.UP,
        [Keys.RIGHT]: Keyboard.RIGHT,
        [Keys.DOWN]: Keyboard.DOWN,
    };
});
//# sourceMappingURL=constants.js.map