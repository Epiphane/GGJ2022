import { Game, Sound } from "../../lib/juicy";
import { SaveManager } from "./save-manager";

const debugElement = document.createElement('div');
debugElement.id = 'debug';
debugElement.classList.add('desktop-only');
document.body.prepend(debugElement);

class DebugButton {
    content: () => string;
    el = document.createElement('button');

    constructor({ content, onclick, parent }: {
        content: () => string,
        onclick?: () => void,
        parent?: HTMLDivElement,
    }) {
        this.content = content;
        this.el.textContent = this.content();
        this.el.onclick = () => {
            onclick?.();
            this.el.textContent = this.content();
        };
        (parent ?? debugElement).appendChild(this.el);
    }
}

// Dev mode
export const __DEV__ = localStorage.getItem('__DEV__') === 'on';
if (__DEV__) {
    const fps = document.createElement('span');
    Game.setDebug(fps);
    debugElement.appendChild(fps);
}

new DebugButton({
    content: () => __DEV__ ? 'Turn off DevMode (reloads page)' : 'Turn on DevMode (reloads page)',
    onclick: () => {
        localStorage.setItem('__DEV__', !__DEV__ ? 'on' : 'off');
        location.reload();
    }
});

new DebugButton({
    content: () => Sound.BGMMuted ? 'Unmute Music' : 'Mute Music',
    onclick: () => {
        if (Sound.BGMMuted) {
            Sound.UnmuteMusic();
        }
        else {
            Sound.MuteMusic();
        }
    }
});

new DebugButton({
    content: () => Sound.SFXMuted ? 'Unmute SFX' : 'Mute SFX',
    onclick: () => {
        if (Sound.SFXMuted) {
            Sound.UnmuteSfx();
        }
        else {
            Sound.MuteSfx();
        }
    }
});

new DebugButton({
    content: () => 'Clear save file',
    onclick: () => {
        SaveManager.clear();
        location.reload();
    }
});
