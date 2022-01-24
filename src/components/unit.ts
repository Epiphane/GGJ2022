import { Component, Entity, Point } from "../../lib/juicy";
import { ResourceNode, ResourceStack, ResourceType } from "./resource";

export interface MoveTask {
    type: 'Move';
    dest: Point;
}

export interface HarvestTask {
    type: 'Harvest';
    resource: ResourceNode;
}

export type Task = MoveTask | HarvestTask;

let unitNum = 1;

export class UnitComponent extends Component {
    speed = 110 + Math.random() * 20;

    // for spacing
    hexAngle = Math.random() * Math.PI * 2;
    hexOffset = 30;

    // AI
    tasks: Task[] = [];

    // Inventory
    carrying: ResourceStack[] = [];
    harvestTime = 0;

    name = `Tom Bombadil ${unitNum++}`;

    queueTask(command: Task) {
        // TODO make a path that follows hexes
        if (command.type === 'Move') {
            const dest = command.dest.copy().add(
                Math.cos(this.hexAngle) * this.hexOffset,
                Math.sin(this.hexAngle) * this.hexOffset
            );

            this.tasks.push({ ...command, dest });
        }
        else if (command.type === 'Harvest') {
            this.tasks.push({ ...command });
        }
    }

    cancelTasks() {
        this.tasks = [];
    }

    addToInventory(type: ResourceType, amount: number) {
        const existing = this.carrying.find(stack => stack.type === type);
        if (existing) {
            existing.amount += amount;
        }
        else {
            this.carrying.push({ type, amount });
        }
    }

    update(dt: number) {
        if (this.tasks.length === 0) {
            return;
        }

        const currentTask = this.tasks[0]!;
        if (currentTask.type !== 'Harvest') {
            this.harvestTime = 0;
        }

        if (currentTask.type === 'Move') {
            const nextPoint = currentTask.dest;
            const direction = nextPoint.copy().sub(this.entity.position);
            const amountToMove = Math.min(dt * this.speed, direction.length());
            if (amountToMove < 0.5) {
                this.entity.position = nextPoint.copy();
                this.tasks.shift();
            }
            else {
                this.entity.position.add(direction.normalize().mult(amountToMove));
            }
        }
        else if (currentTask.type === 'Harvest') {
            if (!currentTask.resource.entity.contains(this.entity.position)) {
                this.tasks.shift();
            }

            if (currentTask.resource.available.amount <= 0) {
                this.tasks.shift();
            }

            this.harvestTime += dt;
            if (this.harvestTime >= 1) {
                this.harvestTime = 0;

                currentTask.resource.available.amount--;
                this.addToInventory(currentTask.resource.available.type, 1);
            }
        }
    }
};
