import { Component } from '../../lib/juicy';

export enum ResourceType {
    Wood,
};

export class ResourceNode extends Component {
    type = ResourceType.Wood;
    amount = 100;
}
