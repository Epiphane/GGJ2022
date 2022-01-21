define(["require", "exports", "../lib/juicy", "./states/loading", "./helpers/constants", "./helpers/debug"], function (require, exports, juicy_1, loading_1, constants_1, debug_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const canvas = document.getElementById('game-canvas');
    juicy_1.Game.init({
        canvas,
        clearColor: '#000000',
        keys: constants_1.KeyMapping,
        width: 2560,
        height: 1440,
    });
    // Document events
    document.addEventListener('mousewheel', juicy_1.Game.trigger.bind(juicy_1.Game, 'mousewheel'));
    window.onresize = () => {
        const maxScaleW = canvas.parentElement.clientWidth / juicy_1.Game.size.x;
        const maxScaleH = canvas.parentElement.clientHeight / juicy_1.Game.size.y;
        const scale = Math.min(maxScaleH, maxScaleW);
        canvas.style.width = `${juicy_1.Game.size.x * scale}px`;
        canvas.style.height = `${juicy_1.Game.size.y * scale}px`;
        juicy_1.Game.resize();
    };
    window.onresize(null);
    juicy_1.Game.setState(new loading_1.LoadingScreen()).run();
    if (debug_1.__DEV__) {
        window.Game = juicy_1.Game;
    }
});
//# sourceMappingURL=main.js.map