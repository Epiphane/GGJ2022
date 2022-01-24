define(["require", "exports", "../../lib/juicy", "../components/nine-slice", "../components/resource", "../components/unit", "../components/wrap-text"], function (require, exports, juicy_1, nine_slice_1, resource_1, unit_1, wrap_text_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DialogBox = void 0;
    class DialogBox extends juicy_1.Entity {
        constructor(state) {
            super(state);
            this.add(nine_slice_1.NineSlice).set({
                src: './img/dialog_box.png',
                left: 64,
                right: 64,
                top: 64,
                bottom: 64,
            });
            {
                const title = new juicy_1.Entity(state);
                title.position.x = this.width / 2;
                title.position.y = 70;
                this.title = title.add(juicy_1.TextComponent);
                this.title.set({
                    text: 'Title',
                    size: 72,
                    fillStyle: 'white',
                    padding: new juicy_1.Point(50),
                });
                this.addChild(title);
            }
            {
                const details = new juicy_1.Entity(state);
                details.position.x = this.width / 2;
                details.position.y = 300;
                this.details = details.add(wrap_text_1.WrapTextComponent);
                this.details.set({
                    text: '',
                    size: 72,
                    fillStyle: 'white',
                    padding: new juicy_1.Point(30),
                });
                this.addChild(details);
            }
        }
        update(dt) {
            this.title.entity.position.x = this.width / 2;
            this.details.entity.position.x = this.details.entity.width / 2;
            super.update(dt);
        }
        setSelected(entities) {
            if (entities.length === 1) {
                const entity = entities[0];
                const unit = entity.get(unit_1.UnitComponent);
                if (unit) {
                    this.title.set({ text: `${unit.name}` });
                    if (unit.carrying.length > 0) {
                        this.details.set({
                            text: [
                                'Carrying:',
                                ...unit.carrying.map(({ amount, type }) => `${type}: ${amount}`),
                            ].join('\n')
                        });
                    }
                    else {
                        this.details.set({
                            text: [
                                'Carrying:',
                                'Nothing',
                            ].join('\n')
                        });
                    }
                    return;
                }
                const resourceNode = entity.get(resource_1.ResourceNode);
                if (resourceNode) {
                    this.title.set({ text: `${resourceNode.name}` });
                    const { amount, type } = resourceNode.available;
                    this.details.set({
                        text: [
                            'Available:',
                            `${type}: ${amount}`,
                        ].join('\n')
                    });
                    return;
                }
                this.title.set({ text: `1 unit selected` });
                this.details.set({ text: '' });
                return;
            }
            // Fallback
            this.title.set({ text: `${entities.length} units selected` });
            this.details.set({ text: '' });
        }
    }
    exports.DialogBox = DialogBox;
});
//# sourceMappingURL=dialog-box.js.map