import React, { FC, useState } from "react";
import { useAnimationFrame } from '../hooks';
import { Game } from '../../../lib/juicy';
import { CityBuilderState } from '../../states/city-builder';
import "./tooltips.css"
import { UnitComponent } from '../../components/unit';

export interface TooltipOverlayProps {
}

const TooltipOverlay: FC<TooltipOverlayProps> = () => {
  const [tooltips, setTooltips] = useState<{ text: string, posX: number, posY: number }[]>([]);

  useAnimationFrame(() => {
    // @ts-ignore
    const currState: CityBuilderState = window.Game.state;
    if (!(currState instanceof CityBuilderState)) {
      return;
    }


    const tooltipTime = currState.units.filter(u => false).map(unit => {
      // horrible jank code because I couldn't figure out how to properly go from world space -> screen space
      let point = unit.entity.globalPosition();
      point = point.multScalar(currState.zoom * 0.3);
      point = point.add(220, 150);

      const name = unit.entity.get(UnitComponent)?.name
      const num = parseInt(name?.slice(-2) ?? "")

      return {
        text: num % 2 === 0 ? "Something need doing?" : "I don't miss my wife.",
        posX: point.x,
        posY: point.y,
      };
    });

    setTooltips(tooltipTime);
  });

  return <div style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0}}>
    {tooltips.map((tt, index) => {
      return <div key={index} className="tooltip-container"
           style={{top: `${tt.posY}px`, left: `${tt.posX}px`}}>
        <div className="tooltip-content">
          {tt.text}
        </div>
      </div>;
    })}
  </div>;
};

export default TooltipOverlay;