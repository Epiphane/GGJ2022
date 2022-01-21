import { Component, Entity, Game, Point } from '../../lib/juicy';

export interface CameraBounds {
    min: Point;
    max: Point;
}

export class Camera extends Component {
    target?: Entity;
    easing = 500;
    maxEasing = 200;

    constructor() {
        super();

        this.setDefaultEasing();
    }

    follow(target: Entity) {
        this.target = target;
        return this; // enable chaining
    }

    setDefaultEasing() {
        this.easing = 100;
        this.maxEasing = 300;
        return this; // enable chaining
    }

    // Set the easing weight. 1 is instant snap, 0 never moves.
    setEasing(weight: number) {
        this.easing = weight;
        return this; // enable chaining
    }

    getTargetPosition(): Point {
        if (!this.target) {
            return this.entity.position.copy();
        }

        const pos = new Point(
            this.target.position.x + this.target.width / 2,
            this.target.position.y + this.target.height / 2
        );
        return pos;
    }

    snapCamera() {
        this.entity.position = this.getTargetPosition();
    }

    update(dt: number) {
        if (!this.target) {
            return;
        }

        const { x, y } = this.getTargetPosition();
        const dx = x - this.entity.position.x;
        const dy = y - this.entity.position.y;

        let moveX = dx * 0.05;
        let moveY = dy * 0.05;

        this.entity.position.add(moveX, moveY);
    }
}
