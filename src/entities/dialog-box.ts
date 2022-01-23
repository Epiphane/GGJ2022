import { ComponentList, Entity, State, TextComponent } from "../../lib/juicy";
import { NineSlice } from "../components/nine-slice";

export class DialogBox extends Entity {
    title: TextComponent;

    constructor(state: State) {
        super(state);

        this.add(NineSlice).set({
            src: './img/dialog_box.png',
            left: 64,
            right: 64,
            top: 64,
            bottom: 64,
        });

        const title = new Entity(state);
        title.position.x = this.width / 2;
        title.position.y = 50;

        this.title = title.add(TextComponent);
        this.title.set({
            text: 'Title',
            size: 72,
            fillStyle: 'white',
        });
        this.addChild(title);
    }

    update(dt: number) {
        this.title.entity.position.x = this.width / 2;
        this.title.entity.position.y = 100;

        super.update(dt);
    }

    setInfo(title: string) {
        this.title.set({ text: title });
    }
}
