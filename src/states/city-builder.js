define(["require", "exports", "../../lib/juicy", "../components/sprite"], function (require, exports, juicy_1, sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CityBuilderState = void 0;
    class CityBuilderState extends juicy_1.State {
        constructor() {
            super();
            this.hexes = [];
            this.units = [];
            this.selected = [];
            this.clearColor = '#449944';
            // Using 'odd-r' Offset Coordinate system.
            // E.g. First (0th) row of hexes are aligned edge to edge horizontally
            // Then, odd (1,3,5,etc.) rows are offset by 1/2 the width. All rows offset by 3/4 height.
            // More on this system here: https://www.redblobgames.com/grids/hexagons/
            for (let x = 0; x < 30; x++) {
                for (let y = 0; y < 30; y++) {
                    const hex = new juicy_1.Entity(this);
                    const sprite = hex.add(sprite_1.SpriteComponent);
                    sprite.setSize(128, 148);
                    sprite.setImage('../../img/hex_128x148.png');
                    sprite.setActive(true);
                    hex.width = 128;
                    hex.height = 148;
                    var xOffset = x * hex.width;
                    const yOffset = y * hex.height * (3 / 4);
                    if (y % 2 != 0) {
                        xOffset = x * hex.width - (hex.width / 2);
                    }
                    ;
                    hex.position = new juicy_1.Point(xOffset, yOffset);
                    this.hexes.push(hex);
                }
            }
            for (let i = 0; i < 20; i++) {
                const unit = new juicy_1.Entity(this);
                unit.add(juicy_1.BoxComponent).set({
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
                unit.get(juicy_1.BoxComponent).set({ lineWidth: 0 });
            });
            this.selected = [];
        }
        click_2() {
            console.log(`Moving ${this.selected.length} units`);
        }
        dragstart_0(pos) {
            this.dragStartPoint = pos;
        }
        drag_0(pos) {
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
                unit.get(juicy_1.BoxComponent).set({ lineWidth: 0 });
            });
            this.selected = this.units.filter(unit => {
                return unit.position.x >= minX &&
                    unit.position.y >= minY &&
                    unit.position.x + unit.width <= maxX &&
                    unit.position.y + unit.height <= maxY;
            });
            this.selected.forEach(unit => {
                unit.get(juicy_1.BoxComponent).set({ lineWidth: 3 });
            });
        }
        dragend_0(pos) {
            this.dragStartPoint = undefined;
        }
        update(dt) {
            super.update(dt);
        }
        render(context) {
            super.render(context);
            // Cool lil unit selector
            if (this.dragStartPoint) {
                const { x: x1, y: y1 } = this.dragStartPoint;
                const { x: x2, y: y2 } = this.game.mouse;
                context.fillStyle = 'rgba(177, 177, 177, 0.25)';
                context.fillRect(x1, y1, x2 - x1, y2 - y1);
                context.strokeStyle = 'rgba(61, 61, 61, 1)';
                context.lineWidth = 5;
                context.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
        }
    }
    exports.CityBuilderState = CityBuilderState;
    ;
});
//# sourceMappingURL=city-builder.js.map