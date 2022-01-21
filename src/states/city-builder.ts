import {
    BoxComponent,
    Entity,
    FillStyle,
    Game,
    Point,
    State,
    TextComponent,
} from "../../lib/juicy";
import { Selectable } from "../components/selectable";
import { SpriteComponent } from "../components/sprite";

export class CityBuilderState extends State {
    dragStartPoint?: Point;

    hexes: Entity[] = [];
    units: Selectable[] = [];

    constructor() {
        super();

        this.clearColor = '#449944';

        // Using 'odd-r' Offset Coordinate system.
        // E.g. First (0th) row of hexes are aligned edge to edge horizontally
        // Then, odd (1,3,5,etc.) rows are offset by 1/2 the width. All rows offset by 3/4 height.
        // More on this system here: https://www.redblobgames.com/grids/hexagons/
        for (let x = 0; x < 30; x++) {
            for (let y = 0; y < 30; y++) {
                const hex = new Entity(this);

                const sprite = hex.add(SpriteComponent)
                sprite.setSize(128, 148);
                sprite.setImage('../../img/hex_128x148.png');
                sprite.setActive(true);

                hex.width = 128;
                hex.height = 148;

                var xOffset = x * hex.width;
                const yOffset = y * hex.height * (3 / 4);

                if (y % 2 != 0) {
                    xOffset = x * hex.width - (hex.width / 2);
                };

                hex.position = new Point(xOffset, yOffset);
                this.hexes.push(hex);
            }
        }

        for (let i = 0; i < 30; i++) {
            const unit = new Entity(this);
            unit.add(BoxComponent).set({
                fillStyle: '#666',
            });
            unit.width = 50;
            unit.height = 50;
            unit.position = this.game.size.copy().mult(Math.random() * 0.9, Math.random() * 0.9);
            this.units.push(unit.add(Selectable));
        }
    }

    click_0(_: Point, { shiftKey }: MouseEvent) {
        this.units.forEach(selectable => {
            if (selectable.hovering) {
                if (shiftKey && selectable.selected) {
                    selectable.deselect();
                }
                else {
                    selectable.select();
                }
            }
            else if (!shiftKey) {
                selectable.deselect();
            }
        });
    }

    mouseup_2() {
        const selected = this.units.filter(s => s.selected);
        console.log(`Moving ${selected.length} units`);
    }

    dragstart_0(pos: Point) {
        this.dragStartPoint = pos;
    }

    drag_0(pos: Point) {
        // if (!this.dragStartPoint) {
        //     return;
        // }

        // const { x: x1, y: y1 } = this.dragStartPoint;
        // const { x: x2, y: y2 } = pos;

        // const minX = Math.min(x1, x2);
        // const maxX = Math.max(x1, x2);
        // const minY = Math.min(y1, y2);
        // const maxY = Math.max(y1, y2);

        // this.selected = this.units.filter(selectable => {
        //     const unit = selectable.entity;
        //     return unit.position.x >= minX &&
        //         unit.position.y >= minY &&
        //         unit.position.x + unit.width <= maxX &&
        //         unit.position.y + unit.height <= maxY;
        // });

        // this.selected.forEach(selectable => {
        //     selectable.select();
        // });
    }

    dragend_0(pos: Point) {
        if (this.dragStartPoint) {
            const { x: x1, y: y1 } = this.dragStartPoint;
            const { x: x2, y: y2 } = pos;

            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            this.units.forEach(selectable => {
                const unit = selectable.entity;
                const hovering = unit.position.x >= minX &&
                    unit.position.y >= minY &&
                    unit.position.x + unit.width <= maxX &&
                    unit.position.y + unit.height <= maxY;
                if (hovering) {
                    selectable.select();
                }
            });
        }
        this.dragStartPoint = undefined;
    }

    update(dt: number) {
        super.update(dt);

        if (this.dragStartPoint) {
            const { x: x1, y: y1 } = this.dragStartPoint;
            const { x: x2, y: y2 } = this.game.mouse;

            const minX = Math.min(x1, x2);
            const maxX = Math.max(x1, x2);
            const minY = Math.min(y1, y2);
            const maxY = Math.max(y1, y2);

            this.units.forEach(selectable => {
                const unit = selectable.entity;
                selectable.hovering = unit.position.x >= minX &&
                    unit.position.y >= minY &&
                    unit.position.x + unit.width <= maxX &&
                    unit.position.y + unit.height <= maxY;
            });
        }
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
