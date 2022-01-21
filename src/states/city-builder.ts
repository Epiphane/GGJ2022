import {
    BoxComponent,
    Entity,
    FillStyle,
    Game,
    Point,
    State,
    TextComponent,
} from "../../lib/juicy";
import { SpriteComponent } from "../components/sprite";

export class CityBuilderState extends State {
    dragStartPoint?: Point;

    units: Entity[] = [];
    selected: Entity[] = [];

    constructor() {
        super();

        this.clearColor = '#449944';

        for (let i = 0; i < 20; i++) {
            const unit = new Entity(this);
            unit.add(BoxComponent).set({
                fillStyle: '#666',
                strokeStyle: '#F33',
            });
            unit.width = 100;
            unit.height = 100;
            unit.position = this.game.size.copy().mult(Math.random(), Math.random());
            this.units.push(unit);
        }
    }

    click_0() {
        this.selected.forEach(unit => {
            unit.get(BoxComponent)!.set({ lineWidth: 0 });
        });
        this.selected = [];
    }

    click_2() {
        console.log(`Moving ${this.selected.length} units`);
    }

    dragstart_0(pos: Point) {
        this.dragStartPoint = pos;
    }

    drag_0(pos: Point) {
        if (!this.dragStartPoint) {
            return;
        }

        const { x: x1, y: y1 } = this.dragStartPoint;
        const { x: x2, y: y2 } = pos;

        const minX = Math.min(x1, x2);
        const maxX = Math.max(x1, x2);
        const minY = Math.min(y1, y2);
        const maxY = Math.max(y1, y2);

        this.selected.forEach(unit => {
            unit.get(BoxComponent)!.set({ lineWidth: 0 });
        });

        this.selected = this.units.filter(unit => {
            return unit.position.x >= minX &&
                unit.position.y >= minY &&
                unit.position.x + unit.width <= maxX &&
                unit.position.y + unit.height <= maxY;
        });
        this.selected.forEach(unit => {
            unit.get(BoxComponent)!.set({ lineWidth: 3 });
        });
    }

    dragend_0(pos: Point) {
        this.dragStartPoint = undefined;
    }

    update(dt: number) {
        super.update(dt);
    }

    render(context: CanvasRenderingContext2D) {
        super.render(context);

        // Cool lil unit selector
        if (this.dragStartPoint) {
            const { x: x1, y: y1 } = this.dragStartPoint;
            const { x: x2, y: y2 } = this.game.mouse;

            context.fillStyle = 'rgba(177, 177, 177, 0.25)'
            context.fillRect(x1, y1, x2 - x1, y2 - y1);

            context.strokeStyle = 'rgba(61, 61, 61, 1)';
            context.lineWidth = 5;
            context.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
    }
};
