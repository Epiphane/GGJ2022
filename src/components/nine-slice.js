define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NineSlice = void 0;
    class NineSlice extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.image = new Image();
            this.sx = [0, 0, 0];
            this.sy = [0, 0, 0];
            this.sw = [0, 0, 0];
            this.sh = [0, 0, 0];
        }
        set({ src, left, right, top, bottom }) {
            this.image.src = src;
            this.image.onload = () => {
                const width = this.image.width;
                const height = this.image.height;
                this.sx = [0, left, width - right];
                this.sw = [left, width - (left + right), right];
                this.sy = [0, top, height - bottom];
                this.sh = [top, height - (top + bottom), bottom];
            };
        }
        render(context, x, y, w, h) {
            // Stretch instead of tiling because lazy
            const dx = [x, x + this.sw[0], x + w - this.sw[2]];
            const dw = [this.sw[0], w - (this.sw[0] + this.sw[2]), this.sw[2]];
            const dy = [y, y + this.sh[0], y + h - this.sh[2]];
            const dh = [this.sh[0], h - (this.sh[0] + this.sh[2]), this.sh[2]];
            context.drawImage(this.image, this.sx[0], this.sy[0], this.sw[0], this.sh[0], dx[0], dy[0], dw[0], dh[0]);
            context.drawImage(this.image, this.sx[1], this.sy[0], this.sw[1], this.sh[0], dx[1], dy[0], dw[1], dh[0]);
            context.drawImage(this.image, this.sx[2], this.sy[0], this.sw[2], this.sh[0], dx[2], dy[0], dw[2], dh[0]);
            context.drawImage(this.image, this.sx[0], this.sy[1], this.sw[0], this.sh[1], dx[0], dy[1], dw[0], dh[1]);
            context.drawImage(this.image, this.sx[1], this.sy[1], this.sw[1], this.sh[1], dx[1], dy[1], dw[1], dh[1]);
            context.drawImage(this.image, this.sx[2], this.sy[1], this.sw[2], this.sh[1], dx[2], dy[1], dw[2], dh[1]);
            context.drawImage(this.image, this.sx[0], this.sy[2], this.sw[0], this.sh[2], dx[0], dy[2], dw[0], dh[2]);
            context.drawImage(this.image, this.sx[1], this.sy[2], this.sw[1], this.sh[2], dx[1], dy[2], dw[1], dh[2]);
            context.drawImage(this.image, this.sx[2], this.sy[2], this.sw[2], this.sh[2], dx[2], dy[2], dw[2], dh[2]);
        }
    }
    exports.NineSlice = NineSlice;
});
//# sourceMappingURL=nine-slice.js.map