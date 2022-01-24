import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom"
import { Game } from '../lib/juicy';
import { useWindowSize } from './react-nonsense/hooks';
import { KeyMapping } from './helpers/constants';
import { LoadingScreen } from './states/loading';
import { __DEV__ } from './helpers/debug';
import TooltipOverlay from './react-nonsense/react-components/tooltip-overlay';

export function App() {
  const size = useWindowSize()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (canvasRef.current === null) {
      return
    }

    Game.init({
      canvas: canvasRef.current,
      clearColor: "#000000",
      keys: KeyMapping,
      width: 2560,
      height: 1440
    })

    document.addEventListener('mousewheel', Game.trigger.bind(Game, 'mousewheel'));

    Game.setState(new LoadingScreen()).run();

    if (__DEV__()) {
      (window as any).Game = Game;
    }

    setLoaded(true)
  }, [canvasRef, setLoaded])

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null || !loaded) {
      return
    }

    const maxScaleW = canvas.parentElement!.clientWidth / Game.size.x;
    const maxScaleH = canvas.parentElement!.clientHeight / Game.size.y;
    const scale = Math.min(maxScaleH, maxScaleW);
    canvas.style.width = `${Game.size.x * scale}px`;
    canvas.style.height = `${Game.size.y * scale}px`;
    Game.resize();
  }, [size, loaded])

  return <>
    <h1>Hullo world!</h1>
    <canvas id="game-canvas" ref={canvasRef} />
    {/*<TooltipOverlay />*/}
  </>
}

ReactDOM.render(<App />, document.getElementById("root"))
