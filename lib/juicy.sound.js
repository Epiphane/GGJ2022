define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SoundManager = void 0;
    class MultiSampleSound {
        constructor(props) {
            var _a, _b, _c;
            this.elements = [];
            this.index = 0;
            this.volumeModifier = 1;
            this.isSFX = props.isSFX;
            this.loop = (_a = props.loop) !== null && _a !== void 0 ? _a : false;
            this.samples = (_b = props.samples) !== null && _b !== void 0 ? _b : 1;
            this.defaultVolume = (_c = props.volume) !== null && _c !== void 0 ? _c : 1;
            for (var i = 0; i < this.samples; i++) {
                var sound = document.createElement('audio');
                sound.volume = this.defaultVolume;
                sound.loop = !!this.loop;
                var source = document.createElement("source");
                source.src = props.src;
                sound.appendChild(source);
                sound.load();
                this.elements.push(sound);
            }
        }
        play() {
            var _a;
            (_a = this.elements[this.index]) === null || _a === void 0 ? void 0 : _a.play();
            this.index = (this.index + 1) % this.elements.length;
        }
        pause() {
            this.elements.forEach(el => el.pause());
        }
        stop() {
            this.elements.forEach(el => {
                el.pause();
                el.currentTime = 0;
            });
        }
        setVolumeModifier(volumeModifier) {
            this.volumeModifier = volumeModifier;
            this.elements.forEach(el => el.volume = this.volumeModifier * this.defaultVolume);
        }
    }
    class SoundManager {
        constructor() {
            var _a, _b;
            this.SFX = {};
            this.BGM = {};
            this.SFXVolume = parseInt((_a = localStorage.getItem('SFXVolume')) !== null && _a !== void 0 ? _a : '1');
            this.SFXMuted = localStorage.getItem('SFXMuted') === '1';
            this.BGMVolume = parseInt((_b = localStorage.getItem('BGMVolume')) !== null && _b !== void 0 ? _b : '1');
            this.BGMMuted = localStorage.getItem('BGMMuted') === '1';
        }
        MuteMusic() {
            var _a;
            this.BGMMuted = true;
            for (const key in this.BGM) {
                (_a = this.BGM[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(0);
            }
            localStorage.setItem('BGMMuted', '1');
        }
        UnmuteMusic() {
            var _a;
            this.BGMMuted = false;
            for (const key in this.BGM) {
                (_a = this.BGM[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(this.BGMVolume);
            }
            localStorage.setItem('BGMMuted', '0');
        }
        SetMusicVolume(volume) {
            var _a;
            this.BGMVolume = volume;
            for (const key in this.BGM) {
                (_a = this.BGM[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(this.BGMMuted ? 0 : this.BGMVolume);
            }
            localStorage.setItem('BGMVolume', `${this.BGMVolume}`);
        }
        MuteSfx() {
            var _a;
            this.SFXMuted = true;
            for (const key in this.SFX) {
                (_a = this.SFX[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(0);
            }
            localStorage.setItem('SFXMuted', '1');
        }
        UnmuteSfx() {
            var _a;
            this.SFXMuted = false;
            for (const key in this.SFX) {
                (_a = this.SFX[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(this.SFXVolume);
            }
            localStorage.setItem('SFXMuted', '0');
        }
        SetSfxVolume(volume) {
            var _a;
            this.SFXVolume = volume;
            for (const key in this.SFX) {
                (_a = this.SFX[key]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(this.SFXMuted ? 0 : this.SFXVolume);
            }
            localStorage.setItem('SFXVolume', `${this.SFXVolume}`);
        }
        Play(name) {
            var _a;
            let sound = (_a = this.SFX[name]) !== null && _a !== void 0 ? _a : this.BGM[name];
            sound === null || sound === void 0 ? void 0 : sound.play();
        }
        Pause(name) {
            var _a;
            let sound = (_a = this.SFX[name]) !== null && _a !== void 0 ? _a : this.BGM[name];
            sound === null || sound === void 0 ? void 0 : sound.pause();
        }
        Load(name, properties) {
            var _a, _b;
            if (properties.isSFX) {
                this.SFX[name] = new MultiSampleSound(properties);
                (_a = this.SFX[name]) === null || _a === void 0 ? void 0 : _a.setVolumeModifier(this.SFXMuted ? 0 : this.SFXVolume);
            }
            else {
                this.BGM[name] = new MultiSampleSound(properties);
                (_b = this.BGM[name]) === null || _b === void 0 ? void 0 : _b.setVolumeModifier(this.BGMMuted ? 0 : this.BGMVolume);
            }
        }
    }
    exports.SoundManager = SoundManager;
});
//# sourceMappingURL=juicy.sound.js.map