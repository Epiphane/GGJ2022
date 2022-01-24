define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WrapTextComponent = void 0;
    class WrapTextComponent extends juicy_1.TextComponent {
        measure() {
            const lines = this.text.split('\n');
            this.context.font = this.getFont();
            return lines.reduce((current, line) => {
                const measure = this.context.measureText(line);
                current.x = Math.ceil(Math.max(current.x, measure.width));
                current.y += Math.ceil(this.size + 2);
                return current;
            }, new juicy_1.Point());
        }
        renderOffscreen() {
            // Measure the text size
            const entity = this.entity;
            const context = this.context;
            const canvas = this.canvas;
            const size = this.measure();
            const { fillStyle, text, padding } = this;
            // Resize canvas
            entity.width = size.x + padding.x * 2;
            entity.height = size.y + padding.y * 2;
            (0, juicy_1.SetCanvasSize)(canvas, entity.width, entity.height);
            // Draw text
            context.textBaseline = 'top';
            context.font = this.getFont();
            context.fillStyle = fillStyle;
            this.text.split('\n').forEach((line, y) => context.fillText(line, padding.x, padding.y + y * (this.size + 2)));
        }
    }
    exports.WrapTextComponent = WrapTextComponent;
    ;
});
//# sourceMappingURL=wrap-text.js.map