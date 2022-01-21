define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LoadingScreen = void 0;
    class LoadingScreen extends juicy_1.State {
        constructor() {
            super();
            const textEntity = new juicy_1.Entity(this);
            const text = textEntity.add(juicy_1.TextComponent);
            text.set({
                text: 'Loading...',
                size: 36,
                fillStyle: 'red',
            }).then(() => {
                textEntity.position.x = (juicy_1.Game.size.x - textEntity.width) / 2;
                textEntity.position.y = 20;
            });
        }
        update(dt) {
            super.update(dt);
        }
        render(context) {
            super.render(context);
        }
    }
    exports.LoadingScreen = LoadingScreen;
    ;
});
//# sourceMappingURL=loading.js.map