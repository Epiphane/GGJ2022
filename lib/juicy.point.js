define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Point = void 0;
    class Point {
        constructor(x = 0, y) {
            this.x = x;
            this.y = (typeof (y) === 'number') ? y : x;
        }
        isEqual(other) {
            return this.x === other.x && this.y === other.y;
        }
        copy() {
            return new Point(this.x, this.y);
        }
        add(x, y) {
            if (typeof (x) === 'number') {
                this.x += x;
                this.y += typeof (y) === 'number' ? y : x;
            }
            else {
                this.x += x.x;
                this.y += x.y;
            }
            return this;
        }
        mult(x, y) {
            if (typeof (x) === 'number') {
                this.x *= x;
                this.y *= typeof (y) === 'number' ? y : x;
            }
            else {
                this.x *= x.x;
                this.y *= x.y;
            }
            return this;
        }
        multScalar(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
        sub(other) {
            this.x -= other.x;
            this.y -= other.y;
            return this;
        }
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }
    exports.Point = Point;
});
//# sourceMappingURL=juicy.point.js.map