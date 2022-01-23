import { Game, Sound } from '../lib/juicy';
import { LoadingScreen } from './states/loading';
import { KeyMapping } from './helpers/constants';
import { __DEV__, } from './helpers/debug';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

Game.init && Game.init({
    canvas,
    clearColor: '#000000',
    keys: KeyMapping,
    width: 2560,
    height: 1440,
});

// Document events
document.addEventListener('mousewheel', Game.trigger.bind(Game, 'mousewheel'));

window.onresize = () => {
    const maxScaleW = canvas.parentElement!.clientWidth / Game.size.x;
    const maxScaleH = canvas.parentElement!.clientHeight / Game.size.y;
    const scale = Math.min(maxScaleH, maxScaleW);
    canvas.style.width = `${Game.size.x * scale}px`;
    canvas.style.height = `${Game.size.y * scale}px`;
    Game.resize();
}
window.onresize(null as any);

Game.setState(new LoadingScreen()).run();

if (__DEV__) {
    (window as any).Game = Game;
}
