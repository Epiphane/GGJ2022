define(["require", "exports", "../../lib/juicy", "../components/camera", "../components/collector", "../components/inventory", "../components/hex", "../components/resource", "../components/selectable", "../components/sprite", "../components/unit", "../entities/dialog-box", "../entities/resource-display"], function (require, exports, juicy_1, camera_1, collector_1, inventory_1, hex_1, resource_1, selectable_1, sprite_1, unit_1, dialog_box_1, resource_display_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CityBuilderState = void 0;
    class CityBuilderState extends juicy_1.State {
        constructor() {
            super();
            this.hexes = [];
            this.units = [];
            this.resources = [];
            this.worldMouse = new juicy_1.Point();
            this.zoom = 1.5;
            this.inventory = new inventory_1.Inventory();
            this.dialogBox = new dialog_box_1.DialogBox(this);
            this.resourceDisplay = new resource_display_1.ResourceDisplay(this, this.inventory);
            this.clearColor = '#449944';
            // Using 'odd-r' Offset Coordinate system.
            // E.g. First (0th) row of hexes are aligned edge to edge horizontally
            // Then, odd (1,3,5,etc.) rows are offset by 1/2 the width. All rows offset by 3/4 height.
            // More on this system here: https://www.redblobgames.com/grids/hexagons/
            for (let x = -15; x < 15; x++) {
                for (let y = -15; y < 15; y++) {
                    const hexEntity = new juicy_1.Entity(this);
                    const sprite = hexEntity.add(sprite_1.SpriteComponent);
                    sprite.setSize(128, 148);
                    sprite.setImage('../../img/hex_128x148.png');
                    sprite.setActive(true);
                    hexEntity.width = hex_1.HexComponent.width;
                    hexEntity.height = hex_1.HexComponent.height;
                    var xOffset = x * hexEntity.width;
                    const yOffset = y * hexEntity.height * (3 / 4);
                    if (y % 2 != 0) {
                        xOffset = x * hexEntity.width - (hexEntity.width / 2);
                    }
                    ;
                    hexEntity.position = new juicy_1.Point(xOffset, yOffset);
                    var hex = hexEntity.add(hex_1.HexComponent);
                    if (y % 2 != 0) {
                        hex.hex = new hex_1.Hex(x * 2, y);
                    }
                    else {
                        hex.hex = new hex_1.Hex(x * 2 + 1, y);
                    }
                    this.hexes.push(hexEntity);
                }
            }
            for (let i = 0; i < 10; i++) {
                const unit = new juicy_1.Entity(this);
                unit.add(juicy_1.BoxComponent).set({
                    fillStyle: '#666',
                });
                unit.width = 50;
                unit.height = 50;
                unit.position = this.game.size.copy().mult(Math.random() - 0.5, Math.random() - 0.5).mult(1 / 3);
                unit.add(unit_1.UnitComponent);
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
                unit.position.x = 128 * Math.floor(Math.random() * 20 - 10);
                const y = Math.floor(Math.random() * 12 - 6);
                unit.position.y = 148 * 3 / 4 * y;
                if (y % 2 != 0) {
                    unit.position.x += 128 / 2;
                }
                ;
                this.resources.push(unit.add(selectable_1.Selectable));
                unit.add(resource_1.ResourceNode);
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
            townCenter.add(collector_1.Collector).inventory = this.inventory;
            townCenter.add(selectable_1.Selectable);
            this.camera = new juicy_1.Entity(this);
            this.camera.add(camera_1.Camera).target = townCenter;
            this.dialogBox.width = 800;
            this.dialogBox.height = this.game.size.y;
            this.dialogBox.position.x = this.game.size.x - this.dialogBox.width / 2;
            this.dialogBox.position.y = this.game.size.y / 2;
            this.remove(this.dialogBox);
            this.resourceDisplay.width = this.game.size.x - this.dialogBox.width;
            this.resourceDisplay.height = 128;
            this.resourceDisplay.position.x = this.resourceDisplay.width / 2;
            this.resourceDisplay.position.y = this.resourceDisplay.height / 2;
            this.remove(this.resourceDisplay);
        }
        toWorldPos(pos) {
            const result = pos.copy();
            result.x += this.dialogBox.width / 2;
            if (result.x >= this.dialogBox.position.x + this.dialogBox.width / 2) {
                result.x = this.dialogBox.position.x + this.dialogBox.width / 2;
            }
            result.add(this.game.size.copy().mult(-0.5));
            result.mult(1 / this.zoom);
            result.add(this.camera.position);
            return result;
        }
        mousewheel({ deltaY }) {
            this.zoom -= deltaY / 500;
            this.zoom = Math.min(Math.max(this.zoom, 1), 2.5);
        }
        click_0(_, { shiftKey }) {
            // Use find to early out if something returns true;
            let somethingSelected = false;
            this.entities.forEach(entity => {
                const selectable = entity.get(selectable_1.Selectable);
                if (!selectable) {
                    return;
                }
                if (selectable.hovering) {
                    if (shiftKey && selectable.selected) {
                        selectable.deselect();
                    }
                    else if (!somethingSelected) {
                        selectable.select();
                        somethingSelected = true;
                    }
                }
                else if (!shiftKey) {
                    selectable.deselect();
                }
            });
        }
        mouseup_2(pos) {
            const hexToCheck = hex_1.Hex.pointToHex(pos);
            // console.log(pos);
            // console.log(hexToCheck);
            // console.log(hexToCheck.toPoint());
            const selected = this.units.filter(s => s.selected);
            const resource2 = this.resources.find(s => s.hovering);
            const resource = resource2 === null || resource2 === void 0 ? void 0 : resource2.entity.get(resource_1.ResourceNode);
            let dest = resource ? resource.entity.position.copy() : this.toWorldPos(pos);
            selected.forEach(selected => {
                const unit = selected.entity.get(unit_1.UnitComponent);
                if (!unit) {
                    return;
                }
                if (resource) {
                    unit.setGoal({ type: 'Harvest', resource });
                }
                else {
                    unit.setGoal({ type: 'Move', dest });
                }
            });
        }
        dragstart_0(pos, { shiftKey }) {
            this.dragStartPoint = this.toWorldPos(pos);
            if (!shiftKey) {
                this.entities.forEach(e => { var _a; return (_a = e.get(selectable_1.Selectable)) === null || _a === void 0 ? void 0 : _a.deselect(); });
            }
        }
        dragend_0(pos) {
            if (this.dragStartPoint) {
                const { x: x1, y: y1 } = this.dragStartPoint;
                const { x: x2, y: y2 } = this.toWorldPos(pos);
                const minX = Math.min(x1, x2);
                const maxX = Math.max(x1, x2);
                const minY = Math.min(y1, y2);
                const maxY = Math.max(y1, y2);
                this.units.forEach(selectable => {
                    const unit = selectable.entity;
                    const hovering = unit.position.x - unit.width / 2 >= minX &&
                        unit.position.y - unit.height / 2 >= minY &&
                        unit.position.x + unit.width / 2 <= maxX &&
                        unit.position.y + unit.height / 2 <= maxY;
                    if (hovering) {
                        selectable.select();
                    }
                });
            }
            this.dragStartPoint = undefined;
        }
        update(dt) {
            super.update(dt);
            const shiftKey = this.game.keyDown('Shift');
            const worldMouse = this.toWorldPos(this.game.mouse);
            this.entities.forEach(entity => {
                const selectable = entity.get(selectable_1.Selectable);
                if (selectable) {
                    selectable.hovering = entity.contains(worldMouse);
                }
            });
            if (this.dragStartPoint) {
                const { x: x1, y: y1 } = this.dragStartPoint;
                const { x: x2, y: y2 } = worldMouse;
                const minX = Math.min(x1, x2);
                const maxX = Math.max(x1, x2);
                const minY = Math.min(y1, y2);
                const maxY = Math.max(y1, y2);
                this.units.forEach(selectable => {
                    const unit = selectable.entity;
                    selectable.hovering = unit.position.x - unit.width / 2 >= minX &&
                        unit.position.y - unit.height / 2 >= minY &&
                        unit.position.x + unit.width / 2 <= maxX &&
                        unit.position.y + unit.height / 2 <= maxY;
                });
            }
            const selected = this.entities.filter(entity => {
                const selectable = entity.get(selectable_1.Selectable);
                return selectable && (selectable.selected);
            });
            this.dialogBox.setSelected(selected);
            this.dialogBox.update(dt);
            this.resourceDisplay.update(dt);
        }
        keypress(key) {
            console.log(key);
        }
        render(context) {
            context.save();
            // Move over a little bit so that the non-sidebar is centered
            context.translate(-this.dialogBox.width / 2, 0);
            context.translate(this.game.size.x / 2, this.game.size.y / 2);
            context.scale(this.zoom, this.zoom);
            context.translate(-this.camera.position.x, -this.camera.position.y);
            super.render(context);
            // Cool lil unit selector
            if (this.dragStartPoint) {
                const { x: x1, y: y1 } = this.dragStartPoint;
                const { x: x2, y: y2 } = this.toWorldPos(this.game.mouse);
                context.fillStyle = 'rgba(177, 177, 177, 0.25)';
                context.fillRect(x1, y1, x2 - x1, y2 - y1);
                context.strokeStyle = 'rgba(61, 61, 61, 1)';
                context.lineWidth = 5;
                context.strokeRect(x1, y1, x2 - x1, y2 - y1);
            }
            context.restore();
            this.dialogBox.render(context);
            this.resourceDisplay.render(context);
        }
    }
    exports.CityBuilderState = CityBuilderState;
    ;
});
//# sourceMappingURL=city-builder.js.map