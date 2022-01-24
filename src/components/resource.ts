import { Component } from '../../lib/juicy';

export enum ResourceType {
    Wood = 'Wood',
};

export interface ResourceStack {
    type: ResourceType;
    amount: number;
}

export class ResourceNode extends Component {
    name = 'Forest';

    available: ResourceStack = {
        type: ResourceType.Wood,
        amount: 1000
    };
}
