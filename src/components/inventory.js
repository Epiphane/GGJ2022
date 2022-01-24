define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Inventory = void 0;
    class Inventory extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.stacks = {};
        }
        toString() {
            let result = [];
            this.forEach((type, amt) => result.push(`${type}: ${amt}`));
            if (result.length === 0) {
                return ['Nothing'];
            }
            return result;
        }
        add(stack, amount) {
            var _a, _b;
            if (typeof (stack) === 'string') {
                const type = stack;
                this.stacks[type] = ((_a = this.stacks[type]) !== null && _a !== void 0 ? _a : 0) + amount;
            }
            else {
                const type = stack.type;
                amount = stack.amount;
                this.stacks[type] = ((_b = this.stacks[type]) !== null && _b !== void 0 ? _b : 0) + amount;
            }
        }
        get(type) {
            var _a;
            return (_a = this.stacks[type]) !== null && _a !== void 0 ? _a : 0;
        }
        clear() {
            this.stacks = {};
        }
        forEach(callback) {
            for (const type in this.stacks) {
                callback(type, this.stacks[type]);
            }
        }
        countAll() {
            let result = 0;
            this.forEach((_, amt) => result += amt);
            return result;
        }
        isFull() {
            return this.maxSize && this.countAll() >= this.maxSize;
        }
    }
    exports.Inventory = Inventory;
});
//# sourceMappingURL=inventory.js.map