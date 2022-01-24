import { TextComponent, Point, TextInfo, SetCanvasSize } from "../../lib/juicy";

export class WrapTextComponent extends TextComponent {
    measure() {
        const lines = this.text.split('\n');
        this.context.font = this.getFont();
        return lines.reduce((current, line) => {
            const measure = this.context.measureText(line)
            current.x = Math.ceil(Math.max(current.x, measure.width));
            current.y += Math.ceil(this.size + 2)
            return current;
        }, new Point());
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
        SetCanvasSize(canvas, entity.width, entity.height);

        // Draw text
        context.textBaseline = 'top';
        context.font = this.getFont();
        context.fillStyle = fillStyle;
        this.text.split('\n').forEach((line, y) =>
            context.fillText(line, padding.x, padding.y + y * (this.size + 2)));
    }
};
