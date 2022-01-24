import { ComponentList, Entity, Point, State, TextComponent } from "../../lib/juicy";
import { Inventory } from "../components/inventory";
import { NineSlice } from "../components/nine-slice";
import { ResourceNode, ResourceType } from "../components/resource";
import { UnitComponent } from "../components/unit";
import { WrapTextComponent } from "../components/wrap-text";

export class ResourceDisplay extends Entity {
    wood: TextComponent;
    inventory: Inventory;

    constructor(state: State, inventory: Inventory) {
        super(state);

        this.inventory = inventory;

        this.add(NineSlice).set({
            src: './img/dialog_box.png',
            left: 32,
            right: 32,
            top: 32,
            bottom: 32,
        });

        {
            const wood = new Entity(state);
            wood.position.y = 70;

            this.wood = wood.add(TextComponent);
            this.wood.set({
                text: 'wood',
                size: 48,
                fillStyle: 'white',
                padding: new Point(50),
            });
            this.addChild(wood);
        }
    }

    update(dt: number) {
        super.update(dt);

        this.wood.set({ text: `${this.inventory.get(ResourceType.Wood)}` })
        this.wood.entity.position.x = 50;
    }
}
