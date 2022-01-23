define(["require", "exports", "../../lib/juicy", "../components/nine-slice"], function (require, exports, juicy_1, nine_slice_1) {
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
            const title = new juicy_1.Entity(state);
            title.position.x = this.width / 2;
            title.position.y = 50;
            this.title = title.add(juicy_1.TextComponent);
            this.title.set({
                text: 'Title',
                size: 72,
                fillStyle: 'white',
            });
            this.addChild(title);
        }
        update(dt) {
            this.title.entity.position.x = this.width / 2;
            this.title.entity.position.y = 100;
            super.update(dt);
        }
        setInfo(title) {
            this.title.set({ text: title });
        }
    }
    exports.DialogBox = DialogBox;
});
//# sourceMappingURL=dialog-box.js.map