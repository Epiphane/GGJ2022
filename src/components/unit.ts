import { Component, Point } from "../../lib/juicy";

export class UnitComponent extends Component {
    speed = 128;
    currentPath: Point[] = [];

    moveTo(dest: Point) {
        this.currentPath = [dest.copy()];
    }

    update(dt: number) {
        if (this.currentPath.length > 0) {
            const nextPoint = this.currentPath[0]!;
            const direction = nextPoint.copy().sub(this.entity.position);
            const amountToMove = Math.min(dt * this.speed, direction.length());
            if (amountToMove < 0.5) {
                this.entity.position = nextPoint.copy();
                this.currentPath.shift();
            }
            else {
                this.entity.position.add(direction.normalize().mult(amountToMove));
            }
        }
    }
};
