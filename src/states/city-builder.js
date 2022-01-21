define(["require", "exports", "../../lib/juicy", "../components/camera", "../components/selectable", "../components/sprite"], function (require, exports, juicy_1, camera_1, selectable_1, sprite_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CityBuilderState = void 0;
    class CityBuilderState extends juicy_1.State {
        constructor() {
            super();
            this.hexes = [];
            this.units = [];
            this.resources = [];
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
            for (let i = 0; i < 30; i++) {
                const unit = new juicy_1.Entity(this);
                unit.add(juicy_1.BoxComponent).set({
                    fillStyle: '#666',
                });
                unit.width = 50;
                unit.height = 50;
                unit.position = this.game.size.copy().mult(Math.random() * 0.9, Math.random() * 0.9);
                this.units.push(unit.add(selectable_1.Selectable));
            }
            for (let i = 0; i < 10; i++) {
                const unit = new juicy_1.Entity(this);
                const sprite = unit.add(sprite_1.SpriteComponent);
                sprite.setImage('./img/hex_128x148_forest.png');
                sprite.setSize(128, 148);
                sprite.runAnimation({
                    name: "deselect",
                    sheet: [0],
                    frameTime: 0,
                    repeat: true
                });
                unit.position = this.game.size.copy().mult(Math.random() * 0.9, Math.random() * 0.9);
                this.resources.push(unit.add(selectable_1.Selectable));
            }
            const townCenter = new juicy_1.Entity(this);
            const sprite = townCenter.add(sprite_1.SpriteComponent);
            sprite.setImage('./img/town_center.png');
            sprite.setSize(128, 148);
            sprite.runAnimation({
                name: "base",
                sheet: [0],
                frameTime: 0,
                repeat: true
            });
            townCenter.add(selectable_1.Selectable);
            townCenter.position.x = 128 * 10;
            townCenter.position.y = 148 * 3 / 4 * 6;
            const camera = new juicy_1.Entity(this);
            this.camera = camera.add(camera_1.Camera);
            this.camera.target = townCenter;
        }
        click_0(_, { shiftKey }) {
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
            const resource = this.resources.find(s => s.hovering);
            if (resource) {
                console.log(`Moving ${selected.length} units to a resource`);
            }
            else {
                console.log(`Moving ${selected.length} units`);
            }
        }
        dragstart_0(pos, { shiftKey }) {
            this.dragStartPoint = pos;
            if (!shiftKey) {
                this.units.forEach(selectable => selectable.deselect());
            }
        }
        dragend_0(pos) {
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
        update(dt) {
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