import {
    Entity,
    Game,
    State,
    TextComponent,
} from "../../lib/juicy";

export class LoadingScreen extends State {
    constructor() {
        super();

        const textEntity = new Entity(this);
        const text = textEntity.add(TextComponent);
        text.set({
            text: 'Loading...',
            size: 36,
            fillStyle: 'red',
        }).then(() => {
            textEntity.position.x = (Game.size.x - textEntity.width) / 2;
            textEntity.position.y = 20;
        });
    }

    update(dt: number) {
        super.update(dt);
    }

    render(context: CanvasRenderingContext2D) {
        super.render(context);
    }
};
