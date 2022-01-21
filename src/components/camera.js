define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Camera = void 0;
    class Camera extends juicy_1.Component {
        constructor() {
            super();
            this.easing = 500;
            this.maxEasing = 200;
            this.setDefaultEasing();
        }
        follow(target) {
            this.target = target;
            return this; // enable chaining
        }
        setDefaultEasing() {
            this.easing = 100;
            this.maxEasing = 300;
            return this; // enable chaining
        }
        // Set the easing weight. 1 is instant snap, 0 never moves.
        setEasing(weight) {
            this.easing = weight;
            return this; // enable chaining
        }
        getTargetPosition() {
            if (!this.target) {
                return this.entity.position.copy();
            }
            const pos = new juicy_1.Point(this.target.position.x + this.target.width / 2, this.target.position.y + this.target.height / 2);
            return pos;
        }
        snapCamera() {
            this.entity.position = this.getTargetPosition();
        }
        update(dt) {
            if (!this.target) {
                return;
            }
            const { x, y } = this.getTargetPosition();
            const dx = x - this.entity.position.x;
            const dy = y - this.entity.position.y;
            let moveX = dx * 0.05;
            let moveY = dy * 0.05;
            this.entity.position.add(moveX, moveY);
            this.entity.state.cameraOffset = this.entity.position;
        }
    }
    exports.Camera = Camera;
});
//# sourceMappingURL=camera.js.map