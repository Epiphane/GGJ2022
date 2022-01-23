define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnitComponent = void 0;
    class UnitComponent extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.speed = 128;
            this.currentPath = [];
        }
        moveTo(dest) {
            this.currentPath = [dest.copy()];
        }
        update(dt) {
            if (this.currentPath.length > 0) {
                const nextPoint = this.currentPath[0];
                const direction = nextPoint.copy().sub(this.entity.position);
                const amountToMove = Math.min(dt * this.speed, direction.length());
                if (amountToMove < 0.5) {
                    this.entity.position = nextPoint.copy();
                    this.currentPath.shift();
                }
                else {
                    this.entity.position.add(direction.normalize().mult(amountToMove));
                }
            }
        }
    }
    exports.UnitComponent = UnitComponent;
    ;
});
//# sourceMappingURL=unit.js.map