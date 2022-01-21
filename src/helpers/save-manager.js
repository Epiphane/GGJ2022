define(["require", "exports", "../../lib/juicy", "./debug"], function (require, exports, juicy_1, debug_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SaveManager = void 0;
    class SaveGame {
        constructor(id) {
            this.props = {};
            this.id = id;
            this.load();
        }
        load() {
            const existing = localStorage.getItem(`save_${this.id}`) || '{}';
            try {
                this.props = JSON.parse(existing);
            }
            catch (e) {
                this.props = JSON.parse(atob(existing));
            }
            this.persist();
        }
        persist() {
            let data = JSON.stringify(this.props);
            localStorage.setItem(`save_${this.id}`, debug_1.__DEV__ ? data : btoa(data));
        }
        get(name) {
            return this.props[name];
        }
        set(name, value) {
            this.props[name] = value;
            this.persist();
        }
        clear() {
            this.props = {};
            this.persist();
        }
    }
    class SaveManager {
        constructor() {
            this.currentSave = new SaveGame('default');
        }
        get(name) {
            return this.currentSave.get(name);
        }
        set(name, value) {
            this.currentSave.set(name, value);
        }
        clear() {
            this.currentSave.clear();
        }
    }
    ;
    const saveManager = juicy_1.Game.singleton(SaveManager);
    exports.SaveManager = saveManager;
});
//# sourceMappingURL=save-manager.js.map