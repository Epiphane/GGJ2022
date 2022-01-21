define(["require", "exports", "../../lib/juicy", "./save-manager"], function (require, exports, juicy_1, save_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.__DEV__ = void 0;
    const debugElement = document.createElement('div');
    debugElement.id = 'debug';
    debugElement.classList.add('desktop-only');
    document.body.prepend(debugElement);
    class DebugButton {
        constructor({ content, onclick, parent }) {
            this.el = document.createElement('button');
            this.content = content;
            this.el.textContent = this.content();
            this.el.onclick = () => {
                onclick === null || onclick === void 0 ? void 0 : onclick();
                this.el.textContent = this.content();
            };
            (parent !== null && parent !== void 0 ? parent : debugElement).appendChild(this.el);
        }
    }
    // Dev mode
    exports.__DEV__ = localStorage.getItem('__DEV__') === 'on';
    if (exports.__DEV__) {
        const fps = document.createElement('span');
        juicy_1.Game.setDebug(fps);
        debugElement.appendChild(fps);
    }
    new DebugButton({
        content: () => exports.__DEV__ ? 'Turn off DevMode (reloads page)' : 'Turn on DevMode (reloads page)',
        onclick: () => {
            localStorage.setItem('__DEV__', !exports.__DEV__ ? 'on' : 'off');
            location.reload();
        }
    });
    new DebugButton({
        content: () => juicy_1.Sound.BGMMuted ? 'Unmute Music' : 'Mute Music',
        onclick: () => {
            if (juicy_1.Sound.BGMMuted) {
                juicy_1.Sound.UnmuteMusic();
            }
            else {
                juicy_1.Sound.MuteMusic();
            }
        }
    });
    new DebugButton({
        content: () => juicy_1.Sound.SFXMuted ? 'Unmute SFX' : 'Mute SFX',
        onclick: () => {
            if (juicy_1.Sound.SFXMuted) {
                juicy_1.Sound.UnmuteSfx();
            }
            else {
                juicy_1.Sound.MuteSfx();
            }
        }
    });
    new DebugButton({
        content: () => 'Clear save file',
        onclick: () => {
            save_manager_1.SaveManager.clear();
            location.reload();
        }
    });
});
//# sourceMappingURL=debug.js.map