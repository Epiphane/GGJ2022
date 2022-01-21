define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SpriteComponent = void 0;
    ;
    class SpriteComponent extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.image = document.createElement('canvas');
            this.sheetWidth = 1;
            this.sheetHeight = 1;
            this.spriteWidth = 0;
            this.spriteHeight = 0;
            this.frameTime = -1; // Don't animate yet
            this.timeLeft = 0;
            this.repeat = false;
            this.flip = false;
            this.opacity = 1;
            this.fadeDir = 0;
            this.flickerTime = 0;
            this.current = '';
            this.sheet = [0];
            this.sprite = 0;
            this.loaded = true;
            this.onImageLoad = (img) => {
                var _a;
                this.image.width = img.width;
                this.image.height = img.height;
                (_a = this.image.getContext('2d')) === null || _a === void 0 ? void 0 : _a.drawImage(img, 0, 0);
                this.sheetWidth = this.image.width / this.spriteWidth;
                this.sheetHeight = this.image.height / this.spriteHeight;
                this.loaded = true;
                if (this.entity) {
                    this.entity.state.updated = true;
                }
                if (this.onload) {
                    this.onload(this);
                }
            };
        }
        setImage(url) {
            const image = new Image();
            image.src = url;
            image.onload = this.onImageLoad.bind(this, image);
            this.loaded = false;
            return this; // Enable chaining
        }
        setSize(spriteWidth, spriteHeight) {
            this.spriteWidth = spriteWidth;
            this.spriteHeight = spriteHeight;
            this.entity.width = spriteWidth;
            this.entity.height = spriteHeight;
            this.frameTime = -1; // Don't animate yet
            this.repeat = false;
            this.sprite = 0;
            this.sheet = [0];
            return this; // Enable chaining
        }
        setFlip(flip) {
            this.flip = flip;
            return this; // Enable 2chainz
        }
        setFlickering(time) {
            this.flickerTime = time;
            return this; // Enable true chainz
        }
        runAnimation({ name, sheet, frameTime, repeat }) {
            this.frameTime = frameTime;
            if (this.current !== name) {
                this.current = name;
                this.timeLeft = frameTime;
                this.sprite = 0;
            }
            this.sheet = sheet;
            this.repeat = !!repeat;
            return this; // Enable chaining
        }
        fade(dir, from) {
            this.fadeDir = dir;
            if (from) {
                this.opacity = from;
            }
        }
        animating() {
            return (this.frameTime >= 0 && (this.repeat || this.sprite < this.sheet.length));
        }
        goNextFrame() {
            this.sprite++;
            this.timeLeft = this.frameTime;
            if (this.sprite >= this.sheet.length) {
                if (this.repeat) {
                    this.sprite = 0;
                }
                else {
                    this.sprite = this.sheet.length;
                    this.frameTime = -1;
                    if (this.oncompleteanimation) {
                        this.oncompleteanimation();
                    }
                }
            }
        }
        computeSprite() {
            const index = this.sheet[this.sprite < this.sheet.length ? this.sprite : this.sheet.length - 1];
            var sx = (index % this.sheetWidth) * this.spriteWidth;
            var sy = Math.floor(index / this.sheetWidth) * this.spriteHeight;
            return { sx, sy };
        }
        update(dt) {
            if (this.animating()) {
                this.timeLeft -= dt;
                if (this.timeLeft <= 0) {
                    this.goNextFrame();
                }
            }
            if (this.flickerTime > 0) {
                this.flickerTime -= dt;
            }
            if (this.fadeDir !== 0) {
                this.opacity += this.fadeDir * dt;
            }
        }
        render(context, x, y, w, h) {
            if (this.flickerTime > 0) {
                const n = Math.floor(this.flickerTime / 0.1);
                if (n % 2 === 0) {
                    return;
                }
            }
            if (!this.loaded) {
                return;
            }
            context.imageSmoothingEnabled = false;
            context.save();
            const { sx, sy } = this.computeSprite();
            if (this.flip) {
                context.translate(this.spriteWidth, 0);
                context.scale(-1, 1);
            }
            context.drawImage(this.image, sx, sy, this.spriteWidth, this.spriteHeight, x, y, w, h);
            context.restore();
        }
    }
    exports.SpriteComponent = SpriteComponent;
    ;
});
//# sourceMappingURL=sprite.js.map