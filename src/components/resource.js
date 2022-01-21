define(["require", "exports", "../../lib/juicy"], function (require, exports, juicy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceNode = exports.ResourceType = void 0;
    var ResourceType;
    (function (ResourceType) {
        ResourceType[ResourceType["Wood"] = 0] = "Wood";
    })(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
    ;
    class ResourceNode extends juicy_1.Component {
        constructor() {
            super(...arguments);
            this.type = ResourceType.Wood;
            this.amount = 100;
        }
    }
    exports.ResourceNode = ResourceNode;
});
//# sourceMappingURL=resource.js.map