define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Selectable = void 0;
    class Selectable extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.strokeStyle = '#fff';
            this.hovering = false;
            this.selected = false;
        }
        // update(dt: number, game: typeof Game) {
        //     this.hovering = this.entity.contains(game.mouse);
        // }
        select() {
            this.selected = true;
        }
        deselect() {
            this.selected = false;
        }
        render(context, x, y, w, h) {
            if (this.hovering || this.selected) {
                context.lineWidth = 3;
                context.strokeStyle = this.strokeStyle;
                context.strokeRect(x, y, w, h);
            }
        }
    }
    exports.Selectable = Selectable;
});
//# sourceMappingURL=selectable.js.map