var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "./juicy.sound", "./juicy.point", "./juicy.point"], function (require, exports, juicy_sound_1, juicy_point_1, juicy_point_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sound = exports.rand = exports.BehaviorComponent = exports.TextComponent = exports.BoxComponent = exports.ImageComponent = exports.Component = exports.Entity = exports.State = exports.Game = void 0;
    /* -------------------- Animation frames ----------------- */
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
    __exportStar(juicy_point_2, exports);
    const PIXEL_RATIO = window.devicePixelRatio;
    function SetCanvasSize(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
        // canvas.getContext('2d')?.scale(PIXEL_RATIO, PIXEL_RATIO);
    }
    ;
    class Game {
        constructor() {
            this.scale = new juicy_point_1.Point(1);
            this.mouse = new juicy_point_1.Point();
            this.running = false;
            this.lastTime = 0;
            // For going slow
            this.timeScale = 1;
            this.time = 0;
            this.context = null;
            this.clearColor = 'white';
            this.size = new juicy_point_1.Point();
            this.KEYS = {};
            this.CODES = {};
            this.keyState = {};
            this.listener = {};
            this.fps = 0;
            this.fpsAlpha = 0.95;
            this.singletons = {};
            this.afterRenderCallbacks = [];
            this.updateFn = () => this.update();
        }
        init(settings) {
            const { canvas, clearColor, keys, width, height, scale, } = settings;
            if (clearColor) {
                this.clearColor = clearColor;
            }
            this.size = new juicy_point_1.Point(width, height);
            this.scale = new juicy_point_1.Point(scale || 1);
            this._state = new State();
            let canv;
            if (canvas instanceof HTMLCanvasElement) {
                canv = canvas;
            }
            else if (canvas) {
                const element = document.getElementById(canvas);
                if (element instanceof HTMLCanvasElement) {
                    canv = element;
                }
                else {
                    throw Error(`Canvas element with id ${canvas} not found.`);
                }
            }
            else {
                canv = document.createElement('canvas');
                canv.getContext('2d').imageSmoothingEnabled = false;
            }
            this.setCanvas(canv);
            // Input stuff
            this.KEYS = keys || {};
            this.CODES = {};
            for (const key in keys) {
                this.CODES[keys[key]] = key;
            }
            // document hooks
            document.onkeydown = (evt) => {
                this.keyState[evt.keyCode] = true;
                const method = 'keyDown_' + this.CODES[evt.keyCode];
                const state = this.state;
                if (state && state[method]) {
                    state[method](this.CODES[evt.keyCode]);
                }
            };
            document.onkeyup = (evt) => {
                this.keyState[evt.keyCode] = false;
                this.trigger('keypress', evt);
                const method = 'key_' + this.CODES[evt.keyCode];
                const state = this.state;
                if (state && state[method]) {
                    state[method](this.CODES[evt.keyCode]);
                }
            };
            return this; // Enable chaining
        }
        singleton(constructor) {
            if (!this.singletons[constructor.name]) {
                this.singletons[constructor.name] = new constructor();
            }
            return this.singletons[constructor.name];
        }
        clear() {
            for (const action in this.listener) {
                document.removeEventListener(action, this.listener[action]);
            }
            this.listener = {};
        }
        setDebug(debug) {
            this.debug = debug !== null && debug !== void 0 ? debug : undefined;
            return this; // Enable chaining
        }
        setCanvas(canvas) {
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
            canvas.style.width = `${this.scale.x * this.size.x}px`;
            canvas.style.height = `${this.scale.y * this.size.y}px`;
            SetCanvasSize(this.canvas, this.size.x, this.size.y);
            let startDrag = [];
            let dragging = [];
            canvas.onmousedown = (evt) => {
                this.triggerAtPos('mousedown', evt);
                if (!startDrag[evt.button]) {
                    startDrag[evt.button] = evt;
                }
            };
            canvas.onmouseup = (evt) => {
                this.triggerAtPos(`mouseup`, evt);
                if (!startDrag[evt.button]) {
                    return;
                }
                if (!dragging[evt.button]) {
                    this.triggerAtPos('click', evt);
                }
                else {
                    this.triggerAtPos('dragend', evt);
                }
                startDrag[evt.button] = undefined;
                dragging[evt.button] = false;
            };
            canvas.onmousemove = (evt) => {
                this.triggerAtPos('mousemove', evt);
                this.mouse = this.getCanvasCoords(evt);
                startDrag.forEach((start, button) => {
                    if (dragging[button]) {
                        this.triggerAtPos('drag', evt);
                    }
                    else if (start) {
                        var startPos = this.getCanvasCoords(start);
                        var endPos = this.getCanvasCoords(evt);
                        if (startPos.sub(endPos).length() >= 5) {
                            this.triggerAtPos('dragstart', start);
                            dragging[button] = true;
                        }
                    }
                });
            };
            canvas.oncontextmenu = (evt) => {
                evt.preventDefault();
            };
            this.resize();
            return this; // Enable chaining
        }
        getCanvasCoords(evt) {
            if (!this.canvas) {
                throw Error('Game was not properly initialized - canvas is unavailable');
            }
            const canvasRect = this.canvas.getBoundingClientRect();
            let mx = (evt.clientX - canvasRect.left) / canvasRect.width;
            let my = (evt.clientY - canvasRect.top) / canvasRect.height;
            mx = (mx - 0.5) * this.size.x / this.state.zoom;
            mx += this.state.cameraOffset.x;
            my = (my - 0.5) * this.size.y / this.state.zoom;
            my += this.state.cameraOffset.y;
            return new juicy_point_1.Point(mx, my);
        }
        resize() {
            if (!this.canvas) {
                throw Error('Game was not properly initialized - canvas is unavailable');
            }
            // const parent = this.canvas.parentElement;
            // const width = parent ? parent.clientWidth : this.canvas.clientWidth;
            // const height = parent ? parent.clientHeight : this.canvas.clientHeight;
            // this.canvas.width = width;
            // this.canvas.height = width * this.height / this.width;
            // if (this.canvas.height > height) {
            //     this.canvas.height = height;
            //     this.canvas.width = height * this.width / this.height;
            // }
            // Make sure we re-render
            if (this.state) {
                this.state.hasRendered = false;
            }
            return this; // Enable chaining
        }
        getTime() {
            return this.time;
        }
        keyDown(key) {
            if (typeof (key) === 'string') {
                return this.keyState[this.KEYS[key]];
            }
            else {
                return key.some(k => this.keyDown(k));
            }
        }
        trigger(evt, ...data) {
            const state = this.state;
            if (state && state[evt]) {
                state[evt](...data);
            }
        }
        triggerAtPos(name, evt) {
            this.trigger(`${name}_${evt.button}`, this.getCanvasCoords(evt), evt);
            if (evt.button === 0) {
                this.trigger(name, this.getCanvasCoords(evt), evt);
            }
        }
        on(action, keys, callback) {
            if (action === 'key') {
                if (typeof (keys) !== 'object') {
                    keys = [keys];
                }
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    this.state['key_' + key] = callback;
                }
            }
            else {
                callback = keys;
                if (this.listener[action]) {
                    document.removeEventListener(action, this.listener[action]);
                }
                this.listener[action] = callback;
                document.addEventListener(action, this.listener[action]);
            }
            return this; // Enable chaining
        }
        ;
        get state() {
            return this._state;
        }
        setState(state) {
            this.clear();
            this._state = state;
            this.state.game = this;
            this.state.init();
            this.state.hasRendered = false;
            return this; // Enable chaining
        }
        update() {
            if (!this.running) {
                return;
            }
            requestAnimationFrame(this.updateFn);
            const nextTime = new Date().getTime();
            if (this.debug && nextTime !== this.lastTime) {
                var fps = 1000 / (nextTime - this.lastTime);
                this.fps = this.fpsAlpha * this.fps + (1 - this.fpsAlpha) * fps;
                this.debug.innerHTML = 'FPS: ' + Math.floor(this.fps);
            }
            const dt = this.timeStep ? this.timeStep : this.timeScale * (nextTime - this.lastTime) / 1000;
            this.timeStep = undefined;
            if (dt > 0.2) {
                this.lastTime = nextTime;
                return;
            }
            try {
                this.time += dt;
                const updated = !this.state.update(dt) || this.state.updated;
                this.state.updated = false;
                this.lastTime = nextTime;
                if (updated || !this.state.hasRendered) {
                    this.render();
                    this.state.hasRendered = true;
                }
            }
            catch (e) {
                console.error(e);
                this.pause();
            }
        }
        render() {
            var _a;
            const { context, canvas } = this;
            if (!context || !canvas) {
                this.running = false;
                throw Error('Game was not properly initialized - canvas is unavailable');
            }
            context.save();
            if (!this.state.stopClear) {
                context.fillStyle = (_a = this.state.clearColor) !== null && _a !== void 0 ? _a : this.clearColor;
                context.fillRect(0, 0, this.size.x, this.size.y);
            }
            context.translate(this.size.x / 2, this.size.y / 2);
            context.scale(this.state.zoom, this.state.zoom);
            context.translate(-this.state.cameraOffset.x, -this.state.cameraOffset.y);
            this.state.render(context);
            context.restore();
            this.afterRenderCallbacks.forEach(callback => callback(canvas));
            return this; // Enable chaining
        }
        afterRender(callback) {
            this.afterRenderCallbacks.push(callback);
        }
        run() {
            this.running = true;
            this.lastTime = new Date().getTime();
            this.update();
            return this; // Enable chaining
        }
        ;
        pause() {
            this.running = false;
        }
        isRunning() {
            return this.running;
        }
    }
    // Game singleton
    let game;
    exports.Game = game;
    if (window.__juicy__game) {
        exports.Game = game = window.__juicy__game;
    }
    else {
        exports.Game = game = window.__juicy__game = new Game();
    }
    /* -------------------- Game State ----------------------- */
    /*
     * new State_() - Construct new state
     *  [Constructor]
     *    init   ()          - Run every time the state is swapped to.
     *  [Useful]
     *    click  (evt)       - When the user clicks the state
     *    update (dt, input) - Run before rendering. Use for logic.
     *                         IMPORTANT: return true if you don't want to re-render
     *    render (context)   - Run after  update.    Use for graphics
     */
    class State {
        constructor() {
            /** @internal */
            this.hasRendered = false;
            this.updated = false;
            this.stopClear = false;
            this.zoom = 1;
            this.cameraOffset = new juicy_point_1.Point();
            this.game = game;
            this.entities = [];
        }
        init() { }
        update(dt) {
            this.entities.sort((a, b) => a.priority - b.priority);
            this.entities.forEach(e => {
                if (!e.parent) {
                    e.update(dt);
                }
            });
            return false;
        }
        render(context) {
            this.entities.sort((a, b) => a.priority - b.priority);
            this.entities.forEach(e => {
                if (!e.parent) {
                    e.render(context);
                }
            });
        }
        add(e) {
            this.entities.push(e);
        }
        get(name) {
            return this.entities.find(e => e.name === name);
        }
        remove(nameOrEntity) {
            if (typeof (nameOrEntity) === 'string') {
                this.entities = this.entities.filter(e => e.name !== nameOrEntity);
            }
            else {
                this.entities = this.entities.filter(e => e !== nameOrEntity);
            }
        }
        mousedown(pos) {
            this.entities.forEach(e => {
                if (e.contains(pos)) {
                    e.active = true;
                    e.mousedown(pos);
                }
            });
        }
        mouseup(pos) {
            this.entities.forEach(e => {
                if (e.contains(pos)) {
                    e.mouseup(pos);
                }
                e.active = false;
            });
        }
    }
    exports.State = State;
    ;
    class Entity {
        constructor(state, components, name) {
            this.props = {};
            this.visible = true;
            this.position = new juicy_point_1.Point();
            this.scale = new juicy_point_1.Point(1);
            this.priority = 0;
            this.width = 0;
            this.height = 0;
            this.active = false;
            this.components = [];
            this.updated = [];
            this.children = [];
            this.name = name;
            this.state = state;
            components = (components !== null && components !== void 0 ? components : []).concat(this.initialComponents());
            components.forEach(c => this.addComponent(c));
            state.add(this);
            this.init();
        }
        init() { }
        initialComponents() {
            return [];
        }
        globalPosition() {
            const position = this.position.copy();
            if (this.parent) {
                return position.mult(this.parent.globalScale()).add(this.parent.globalPosition());
            }
            return position;
        }
        globalScale() {
            const scale = this.scale.copy();
            if (this.parent) {
                return scale.mult(this.parent.globalScale());
            }
            return scale;
        }
        contains(point) {
            point = point.copy().sub(this.globalPosition());
            return point.x >= 0 &&
                point.y >= 0 &&
                point.x <= this.width &&
                point.y <= this.height;
        }
        distance(other) {
            if (other instanceof Entity) {
                other = other.globalPosition();
            }
            return this.globalPosition().sub(other).length();
        }
        collidesWith(other) {
            // TODO account for parent entities
            const otherBottomRight = other.position.add(new juicy_point_1.Point(other.width, other.height));
            const bottomRight = this.position.add(new juicy_point_1.Point(this.width, this.height));
            return otherBottomRight.x >= this.position.x &&
                otherBottomRight.y >= this.position.y &&
                other.position.x <= bottomRight.x &&
                other.position.y <= bottomRight.y;
        }
        addComponent(c) {
            if (typeof (c) === 'function') {
                c = new c();
                c.init(this);
            }
            if (c.entity) {
                throw `Component already has an entity`;
            }
            c.entity = this;
            this.components.push(c);
            this.updated.push(false);
            return c;
        }
        add(constructor) {
            return this.addComponent(constructor);
        }
        remove(constructor) {
            this.components = this.components.filter(c => c.__proto__.constructor.name !== constructor.name);
        }
        get(constructor) {
            for (let i = 0; i < this.components.length; i++) {
                if (this.components[i].__proto__.constructor.name === constructor.name) {
                    return this.components[i];
                }
            }
        }
        addChild(child) {
            child.parent = this;
            this.children.push(child);
            return child;
        }
        mousedown(pos) {
            this.components.forEach(c => c.mousedown(pos));
        }
        mouseup(pos) {
            this.components.forEach(c => c.mouseup(pos));
        }
        update(dt, constructor) {
            var _a, _b;
            if (constructor) {
                for (let i = 0; i < this.components.length; i++) {
                    if (this.components[i].__proto__.name === constructor.name) {
                        if (!this.updated[i]) {
                            if ((_a = this.components[i]) === null || _a === void 0 ? void 0 : _a.active) {
                                this.components[i].update(dt, this.state.game);
                            }
                            this.updated[i] = true;
                        }
                        break;
                    }
                }
            }
            else {
                this.updated.fill(false);
                for (let i = 0; i < this.components.length; i++) {
                    if (!this.updated[i]) {
                        if ((_b = this.components[i]) === null || _b === void 0 ? void 0 : _b.active) {
                            this.components[i].update(dt, this.state.game);
                        }
                        this.updated[i] = true;
                    }
                }
                this.children.forEach(child => child.update(dt));
            }
        }
        render(context) {
            context.save();
            context.translate(Math.floor(this.position.x), Math.floor(this.position.y));
            context.scale(this.scale.x, this.scale.y);
            let renderArgs;
            if (arguments.length === 1) {
                renderArgs = [context, 0, 0, this.width, this.height];
            }
            else if (arguments.length === 3) {
                renderArgs = Array.prototype.slice.call(arguments);
                renderArgs.push(this.width, this.height);
            }
            else if (arguments.length === 5) {
                renderArgs = Array.prototype.slice.call(arguments);
            }
            else {
                throw Error(`${arguments.length} arguments passed to Entity.render, when only 1 or 5 are supported`);
            }
            this.components.forEach(c => {
                if (c.active) {
                    c.render.apply(c, renderArgs);
                }
            });
            this.children.forEach(child => child.render(context));
            context.restore();
        }
    }
    exports.Entity = Entity;
    /* -------------------- Game Component -------------------- */
    /*
     * new Component(entity) - Construct new component on an entity
     *  [Static Properties]
     *    name             - Name of the component
     *  [Useful]
     *    update (dt)      - Update component (if applicable)
     *    render (context) - Render component (if applicable)
     *
     * Component.create(name, prototype, static[, force])
     *    - Extend and register by name. Force to override another component
     */
    class Component {
        constructor() {
            this.active = true;
        }
        isActive() { return this.active; }
        setActive(active) { this.active = active; return this; }
        init(e) { }
        mousedown(pos) { }
        mouseup(pos) { }
        update(dt, game) { }
        render(context, x, y, w, h) { }
    }
    exports.Component = Component;
    /* -------------------- Typical Components --------------- */
    class ImageComponent extends Component {
        constructor() {
            super(...arguments);
            this.opacity = 1;
            this.image = new Image();
        }
        init(entity) {
            this.opacity = 1;
            this.image.onload = () => {
                if (!entity.width && !entity.height) {
                    entity.width = this.image.width;
                    entity.height = this.image.height;
                }
                if (this.tint) {
                    this.setTint(this.tint);
                }
                if (this.onload) {
                    this.onload(this);
                }
                entity.state.updated = true;
            };
            this.image.onerror = () => {
                this.image = new Image();
            };
        }
        setTint(tint) {
            // TODO glean alpha of tint
            this.tint = tint;
            if (this.image.complete) {
                // Apply tint
                this.canvas = this.canvas || document.createElement('canvas');
                SetCanvasSize(this.canvas, this.image.width, this.image.height);
                const context = this.canvas.getContext('2d');
                if (!context) {
                    throw Error('Failed getting image context');
                }
                context.fillStyle = this.tint;
                context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                // destination atop makes a result with an alpha channel identical to fg,
                // but with all pixels retaining their original color *as far as I can tell*
                context.globalCompositeOperation = "destination-atop";
                context.globalAlpha = 0.75;
                context.drawImage(this.image, 0, 0);
                context.globalAlpha = 1;
            }
            return this; // Enable chaining
        }
        setImage(url) {
            this.image.src = url;
            return this; // Enable chaining
        }
        render(context, x, y, w, h) {
            const originalAlpha = context.globalAlpha;
            context.globalAlpha = this.opacity;
            context.drawImage(this.image, x, y, w, h);
            if (this.tint && this.canvas) {
                context.drawImage(this.canvas, x, y, w, h);
            }
            // Restore original global alpha
            context.globalAlpha = originalAlpha;
        }
    }
    exports.ImageComponent = ImageComponent;
    class BoxComponent extends Component {
        constructor() {
            super(...arguments);
            this.fillStyle = 'white';
            this.lineWidth = 0;
            this.strokeStyle = 'white';
        }
        set(config) {
            Object.assign(this, config);
            return this;
        }
        render(context, x, y, w, h) {
            context.fillStyle = this.fillStyle;
            context.fillRect(x, y, w, h);
            if (this.lineWidth !== 0) {
                context.lineWidth = this.lineWidth;
                context.strokeStyle = this.strokeStyle;
                context.strokeRect(x, y, w, h);
            }
        }
    }
    exports.BoxComponent = BoxComponent;
    class TextComponent extends Component {
        constructor() {
            super();
            this.font = 'Arial';
            this.size = 32;
            this.text = '';
            this.fillStyle = 'white';
            this.padding = new juicy_point_1.Point();
            this.opacity = 1;
            this.ready = false;
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');
        }
        set(config) {
            const entity = this.entity;
            if (!entity) {
                throw Error('Setting text info before an entity is assign');
            }
            // Set attributes
            Object.assign(this, config);
            if (config.font || config.size || config.text || config.fillStyle || config.padding) {
                const font = this.getFont();
                const fonts = document.fonts;
                if (fonts && !fonts.check(font)) {
                    return fonts.load(font).then(() => {
                        this.renderOffscreen();
                        this.ready = true;
                    });
                }
                else {
                    this.renderOffscreen();
                    this.ready = true;
                    return Promise.resolve();
                }
            }
            else {
                return Promise.resolve();
            }
        }
        getFont() {
            return `${this.size}px ${this.font}`;
        }
        measure() {
            this.context.font = this.getFont();
            const size = this.context.measureText(this.text);
            return new juicy_point_1.Point(Math.ceil(size.width), Math.ceil(this.size + 2));
        }
        renderOffscreen() {
            // Measure the text size
            const entity = this.entity;
            const context = this.context;
            const canvas = this.canvas;
            const size = this.measure();
            const { fillStyle, text, padding } = this;
            // Resize canvas
            entity.width = size.x + padding.x * 2;
            entity.height = size.y + padding.y * 2;
            SetCanvasSize(canvas, entity.width, entity.height);
            // Draw text
            context.textBaseline = 'top';
            context.font = this.getFont();
            context.fillStyle = fillStyle;
            context.fillText(text, padding.x, padding.y);
        }
        render(context, x, y, w, h) {
            // Save original alpha
            const originalAlpha = context.globalAlpha;
            context.globalAlpha = this.opacity;
            arguments[0] = this.canvas;
            context.drawImage(this.canvas, x, y, w, h);
            context.globalAlpha = originalAlpha;
        }
    }
    exports.TextComponent = TextComponent;
    ;
    class BehaviorComponent extends Component {
        setCallback(callback) {
            this.callback = callback;
            return this; // enable chaining
        }
        update(dt, game) {
            if (this.callback) {
                this.callback(dt, game);
            }
        }
    }
    exports.BehaviorComponent = BehaviorComponent;
    /* -------------------- Helper functions ----------------- */
    /*
     * Juicy.rand([min, ] max) - Return a random int between [min, max)
     */
    function rand(min, max) {
        if (max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        else {
            return Math.floor(Math.random() * min);
        }
    }
    exports.rand = rand;
    ;
    const sounds = game.singleton(juicy_sound_1.SoundManager);
    exports.Sound = sounds;
});
//# sourceMappingURL=juicy.js.map