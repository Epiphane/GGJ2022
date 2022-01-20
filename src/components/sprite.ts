import { Component, Point, Game, Entity } from '../../lib/juicy';

export interface Animation {
    name: string;
    sheet: number[];
    frameTime: number;
    repeat?: boolean;
};

export class SpriteComponent extends Component {
    image: HTMLCanvasElement = document.createElement('canvas');

    sheetWidth = 1;
    sheetHeight = 1;
    spriteWidth = 0;
    spriteHeight = 0;

    frameTime = -1; // Don't animate yet
    timeLeft = 0;
    repeat = false;
    flip = false;
    opacity = 1;
    fadeDir = 0;
    flickerTime = 0;

    current: string = '';
    sheet: number[] = [0];
    sprite: number = 0;
    loaded = true;

    onload?: ((img: SpriteComponent) => void);
    canvas?: HTMLCanvasElement;

    oncompleteanimation?: (() => any);

    protected onImageLoad = (img: HTMLImageElement) => {
        this.image.width = img.width;
        this.image.height = img.height;
        this.image.getContext('2d')?.drawImage(img, 0, 0);

        this.sheetWidth = this.image.width / this.spriteWidth;
        this.sheetHeight = this.image.height / this.spriteHeight;
        this.loaded = true;

        if (this.entity) {
            this.entity.state.updated = true;
        }

        if (this.onload) {
            this.onload(this);
        }
    }

    setImage(url: string) {
        const image = new Image();
        image.src = url;
        image.onload = this.onImageLoad.bind(this, image);
        this.loaded = false;

        return this; // Enable chaining
    }

    setSize(spriteWidth: number, spriteHeight: number) {
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

    setFlip(flip: boolean) {
        this.flip = flip;
        return this; // Enable 2chainz
    }

    setFlickering(time: number) {
        this.flickerTime = time;
        return this; // Enable true chainz
    }

    runAnimation({ name, sheet, frameTime, repeat }: Animation) {
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

    fade(dir: number, from?: number) {
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
        const index = this.sheet[this.sprite < this.sheet.length ? this.sprite : this.sheet.length - 1]!;
        var sx = (index % this.sheetWidth) * this.spriteWidth;
        var sy = Math.floor(index / this.sheetWidth) * this.spriteHeight;
        return { sx, sy };
    }

    update(dt: number) {
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

    render(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
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
};
