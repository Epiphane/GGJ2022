import { ComponentList, Entity, Point, State, TextComponent } from "../../lib/juicy";
import { NineSlice } from "../components/nine-slice";
import { ResourceNode } from "../components/resource";
import { UnitComponent } from "../components/unit";
import { WrapTextComponent } from "../components/wrap-text";

export class DialogBox extends Entity {
    title: TextComponent;
    details: TextComponent;

    constructor(state: State) {
        super(state);

        this.add(NineSlice).set({
            src: './img/dialog_box.png',
            left: 64,
            right: 64,
            top: 64,
            bottom: 64,
        });

        {
            const title = new Entity(state);
            title.position.x = this.width / 2;
            title.position.y = 70;

            this.title = title.add(TextComponent);
            this.title.set({
                text: 'Title',
                size: 72,
                fillStyle: 'white',
                padding: new Point(50),
            });
            this.addChild(title);
        }

        {
            const details = new Entity(state);
            details.position.x = this.width / 2;
            details.position.y = 300;

            this.details = details.add(WrapTextComponent);
            this.details.set({
                text: '',
                size: 72,
                fillStyle: 'white',
                padding: new Point(30),
            });
            this.addChild(details);
        }
    }

    update(dt: number) {
        this.title.entity.position.x = this.width / 2;
        this.details.entity.position.x = this.details.entity.width / 2;

        super.update(dt);
    }

    setSelected(entities: Entity[]) {
        if (entities.length === 1) {
            const entity = entities[0]!;
            const unit = entity.get(UnitComponent);
            if (unit) {
                this.title.set({ text: `${unit.name}` });

                if (unit.carrying.length > 0) {
                    this.details.set({
                        text: [
                            'Carrying:',
                            ...unit.carrying.map(({ amount, type }) => `${type}: ${amount}`),
                        ].join('\n')
                    })
                }
                else {
                    this.details.set({
                        text: [
                            'Carrying:',
                            'Nothing',
                        ].join('\n')
                    })
                }
                return;
            }

            const resourceNode = entity.get(ResourceNode);
            if (resourceNode) {
                this.title.set({ text: `${resourceNode.name}` });
                const { amount, type } = resourceNode.available;
                this.details.set({
                    text: [
                        'Available:',
                        `${type}: ${amount}`,
                    ].join('\n')
                });
                return;
            }

            this.title.set({ text: `1 unit selected` });
            this.details.set({ text: '' });
            return;
        }

        // Fallback
        this.title.set({ text: `${entities.length} units selected` });
        this.details.set({ text: '' });
    }
}
