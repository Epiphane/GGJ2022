define(["require", "exports", "../../lib/juicy", "../components/nine-slice", "../components/resource"], function (require, exports, juicy_1, nine_slice_1, resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceDisplay = void 0;
    class ResourceDisplay extends juicy_1.Entity {
        constructor(state, inventory) {
            super(state);
            this.inventory = inventory;
            this.add(nine_slice_1.NineSlice).set({
                src: './img/dialog_box.png',
                left: 32,
                right: 32,
                top: 32,
                bottom: 32,
            });
            {
                const wood = new juicy_1.Entity(state);
                wood.position.y = 70;
                this.wood = wood.add(juicy_1.TextComponent);
                this.wood.set({
                    text: 'wood',
                    size: 48,
                    fillStyle: 'white',
                    padding: new juicy_1.Point(50),
                });
                this.addChild(wood);
            }
        }
        update(dt) {
            super.update(dt);
            this.wood.set({ text: `${this.inventory.get(resource_1.ResourceType.Wood)}` });
            this.wood.entity.position.x = 50;
        }
    }
    exports.ResourceDisplay = ResourceDisplay;
});
//# sourceMappingURL=resource-display.js.map