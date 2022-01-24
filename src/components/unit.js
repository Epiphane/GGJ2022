define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnitComponent = void 0;
    let unitNum = 1;
    class UnitComponent extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.speed = 110 + Math.random() * 20;
            // for spacing
            this.hexAngle = Math.random() * Math.PI * 2;
            this.hexOffset = 30;
            // AI
            this.tasks = [];
            // Inventory
            this.carrying = [];
            this.harvestTime = 0;
            this.name = `Tom Bombadil ${unitNum++}`;
        }
        queueTask(command) {
            // TODO make a path that follows hexes
            if (command.type === 'Move') {
                const dest = command.dest.copy().add(Math.cos(this.hexAngle) * this.hexOffset, Math.sin(this.hexAngle) * this.hexOffset);
                this.tasks.push(Object.assign(Object.assign({}, command), { dest }));
            }
            else if (command.type === 'Harvest') {
                this.tasks.push(Object.assign({}, command));
            }
        }
        cancelTasks() {
            this.tasks = [];
        }
        addToInventory(type, amount) {
            const existing = this.carrying.find(stack => stack.type === type);
            if (existing) {
                existing.amount += amount;
            }
            else {
                this.carrying.push({ type, amount });
            }
        }
        update(dt) {
            if (this.tasks.length === 0) {
                return;
            }
            const currentTask = this.tasks[0];
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
    }
    exports.UnitComponent = UnitComponent;
    ;
});
//# sourceMappingURL=unit.js.map