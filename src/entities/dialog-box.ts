import { ComponentList, Entity, State, TextComponent } from "../../lib/juicy";
import { NineSlice } from "../components/nine-slice";
const dialogBoxImg = require("/img/dialog_box.png")

export class DialogBox extends Entity {
    title: TextComponent;

    constructor(state: State) {
        super(state);

        this.add(NineSlice).set({
            src: dialogBoxImg,
            left: 64,
            right: 64,
            top: 64,
            bottom: 64,
        });

        const title = new Entity(state);
        title.position.add(50, 50);

        this.title = title.add(TextComponent);
        this.title.set({
            text: 'Title',
            size: 72,
            fillStyle: 'white',
        });
        this.addChild(title);
    }

    setInfo(title: string) {
        this.title.set({ text: title });
    }
}
