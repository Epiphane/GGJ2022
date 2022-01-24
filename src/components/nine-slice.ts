import { Component } from '../../lib/juicy';

export interface NineSliceProps {
    src: string;
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export class NineSlice extends Component {
    image = new Image();
    loadedIn = false;

    sx: [number, number, number] = [0, 0, 0];
    sy: [number, number, number] = [0, 0, 0];
    sw: [number, number, number] = [0, 0, 0];
    sh: [number, number, number] = [0, 0, 0];

    set({ src, left, right, top, bottom }: NineSliceProps) {
        this.image.src = src;
        this.image.onload = () => {
            const width = this.image.width;
            const height = this.image.height;
            this.sx = [0, left, width - right];
            this.sw = [left, width - (left + right), right];
            this.sy = [0, top, height - bottom];
            this.sh = [top, height - (top + bottom), bottom];
            this.loadedIn = true;
        }
    }

    render(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
        // Stretch instead of tiling because lazy
        if (!this.loadedIn) {
            return
        }
        const dx = [x, x + this.sw[0], x + w - this.sw[2]] as [number, number, number];
        const dw = [this.sw[0], w - (this.sw[0] + this.sw[2]), this.sw[2]] as [number, number, number];
        const dy = [y, y + this.sh[0], y + h - this.sh[2]] as [number, number, number];
        const dh = [this.sh[0], h - (this.sh[0] + this.sh[2]), this.sh[2]] as [number, number, number];

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
