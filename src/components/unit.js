define(["require", "exports", "../../lib/juicy", "./collector", "./inventory"], function (require, exports, juicy_1, collector_1, inventory_1) {
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
            this.harvestTime = 0;
            this.name = `Tom Bombadil ${unitNum++}`;
        }
        init(e) {
            var _a;
            this.inventory = (_a = e.get(inventory_1.Inventory)) !== null && _a !== void 0 ? _a : e.add(inventory_1.Inventory);
            this.inventory.maxSize = 10;
        }
        setGoal(goal) {
            this.goal = goal;
            this.cancelTasks();
            this.makePlan();
        }
        makePlan() {
            if (!this.goal) {
                return;
            }
            if (this.goal.type === 'Move') {
                this.queueTask(this.goal);
            }
            else if (this.goal.type === 'Harvest') {
                if (!this.goal.resource.entity.contains(this.entity.position)) {
                    this.queueTask({
                        type: 'Move',
                        dest: this.goal.resource.entity.position,
                    });
                }
                this.queueTask(this.goal);
            }
        }
        queueTask(command) {
            // TODO make a path that follows hexes
            if (command.type === 'Move') {
                const dest = command.dest.copy().add(Math.cos(this.hexAngle) * this.hexOffset, Math.sin(this.hexAngle) * this.hexOffset);
                this.tasks.push(Object.assign(Object.assign({}, command), { dest }));
            }
            else {
                this.tasks.push(Object.assign({}, command));
            }
        }
        cancelTasks() {
            this.tasks = [];
        }
        update(dt) {
            if (this.tasks.length === 0) {
                if (this.goal) {
                    this.makePlan();
                }
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
                    this.inventory.add(currentTask.resource.available.type, 1);
                    if (this.inventory.isFull()) {
                        // Find a collector
                        const collectors = this.entity.state.entities
                            .map(e => e.get(collector_1.Collector))
                            .filter(c => c != undefined);
                        this.queueTask({
                            type: 'Move',
                            dest: collectors[0].entity.position,
                        });
                        this.queueTask({ type: 'Unload', collector: collectors[0] });
                        this.tasks.shift();
                    }
                }
            }
            else if (currentTask.type === 'Unload') {
                const { collector } = currentTask;
                if (collector.entity.contains(this.entity.position)) {
                    this.inventory.forEach((type, amt) => collector.inventory.add(type, amt));
                    this.inventory.clear();
                    this.tasks.shift();
                }
            }
        }
    }
    exports.UnitComponent = UnitComponent;
    ;
});
//# sourceMappingURL=unit.js.map