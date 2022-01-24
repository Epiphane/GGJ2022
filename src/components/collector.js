define(["require", "exports", "../../lib/juicy", "./inventory", "./resource"], function (require, exports, juicy_1, inventory_1, resource_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Collector = void 0;
    class Collector extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.accepted = [resource_1.ResourceType.Wood];
            // TODO make sure this gets replaced by the creator
            this.inventory = new inventory_1.Inventory();
        }
    }
    exports.Collector = Collector;
});
//# sourceMappingURL=collector.js.map