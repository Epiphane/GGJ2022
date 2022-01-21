import { Component, FillStyle, Game } from "../../lib/juicy";

export class Selectable extends Component {
    strokeStyle: FillStyle = '#fff';
    hovering = false;
    selected = false;

    // update(dt: number, game: typeof Game) {
    //     this.hovering = this.entity.contains(game.mouse);
    // }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

    render(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        if (this.hovering || this.selected) {
            context.lineWidth = 3;
            context.strokeStyle = this.strokeStyle;
            context.strokeRect(x, y, w, h);
        }
    }
}
