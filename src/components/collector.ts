import { Component } from '../../lib/juicy';
import { Inventory } from './inventory';
import { ResourceType } from './resource';

export class Collector extends Component {
    accepted: ResourceType[] = [ResourceType.Wood];

    // TODO make sure this gets replaced by the creator
    inventory = new Inventory();
}
