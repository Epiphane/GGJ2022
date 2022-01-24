import { Component } from '../../lib/juicy';
import { ResourceStack, ResourceType } from './resource';

export class Inventory extends Component {
    stacks: { [key in ResourceType]?: number } = {};
    maxSize?: number;

    toString() {
        let result = [] as string[];
        this.forEach((type, amt) => result.push(`${type}: ${amt}`));
        if (result.length === 0) {
            return ['Nothing'];
        }
        return result;
    }

    add(stack: ResourceStack | ResourceType, amount?: number) {
        if (typeof (stack) === 'string') {
            const type = stack;
            this.stacks[type] = (this.stacks[type] ?? 0) + amount!;
        }
        else {
            const type = stack.type;
            amount = stack.amount;
            this.stacks[type] = (this.stacks[type] ?? 0) + amount;
        }
    }

    get(type: ResourceType) {
        return this.stacks[type] ?? 0;
    }

    clear() {
        this.stacks = {};
    }

    forEach(callback: (type: ResourceType, amount: number) => void) {
        for (const type in this.stacks) {
            callback(type as ResourceType, this.stacks[type as ResourceType]!);
        }
    }

    countAll() {
        let result = 0;
        this.forEach((_, amt) => result += amt);
        return result;
    }

    isFull() {
        return this.maxSize && this.countAll() >= this.maxSize;
    }
}
