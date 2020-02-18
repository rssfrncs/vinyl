import * as React from "react";
import { useDrag } from "react-use-gesture";
import { animated, useSpring, interpolate, config } from "react-spring";
import { scaleLinear } from "d3-scale";
import { css } from "@emotion/core";

export function Vinyl({
  onClick,
  name,
  url,
  active
}: {
  onClick(name: string): void;
  name: string;
  url: string;
  active?: boolean;
}) {
  const vinylOffset = 10;
  const width = 200;
  const scale = scaleLinear()
    .range([0, 360])
    .domain([0, width]);
  const activeXDegrees = 45;
  const activeY = -5;
  const [{ r, x, s }, set] = useSpring(() => ({
    r: active ? activeXDegrees : 0,
    x: active ? -(width / 2) : -vinylOffset,
    s: active ? activeY : 0
  }));
  React.useEffect(
    () =>
      void set({
        r: active ? activeXDegrees : 0,
        x: active ? -(width / 2) : -vinylOffset,
        s: active ? activeY : 0
      }),
    [active, set]
  );
  const bind = useDrag(
    ({ movement: [x], down }) => {
      console.log(x);
      if (!active && x <= -(width / 2)) {
        onClick(name);
      } else if (active && x >= 50) {
        onClick(name);
      }
      set({
        r: down ? scale(x) : active ? activeXDegrees : 0,
        x: down
          ? Math.max(-(width / 2), x)
          : active
          ? -(width / 2)
          : vinylOffset
      });
    },
    {
      axis: "x"
    }
  );
  return (
    <div
      onClick={() => void onClick(name)}
      css={css`
        width: ${width}px;
        height: ${width}px;
        position: relative;
      `}
      {...bind()}
    >
      <animated.div
        css={css`
          width: 100%;
          height: 100%;
          transform-origin: 50% 50%;
          z-index: 1;
        `}
        style={{ transform: r.interpolate(r => `rotate(${r}deg`) }}
      >
        <div
          css={css`
            margin: 10px;
            width: calc(100% - 20px);
            height: calc(100% - 20px);
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 100%;
            background: #212121;
          `}
        >
          <div
            css={css`
              margin: 10px;
              width: calc(100% - 20px);
              height: calc(100% - 20px);
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 100%;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
            `}
          />
          <div
            css={css`
              margin: 20px;
              width: calc(100% - 40px);
              height: calc(100% - 40px);
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 100%;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
            `}
          />
          <div
            css={css`
              margin: 30px;
              width: calc(100% - 60px);
              height: calc(100% - 60px);
              position: absolute;
              top: 0;
              left: 0;
              border-radius: 100%;
              background: transparent;
              border: 1px solid rgba(255, 255, 255, 0.2);
            `}
          />
          <div
            css={css`
              width: 50%;
              height: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 100%;
              background: white;
              background-size: cover;
              background-image: url(${url});
              box-shadow: 0 0 1px 1px black;
            `}
          />
        </div>
      </animated.div>
      <animated.div
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #bbb;
          background-size: cover;
          background-image: url(${url});
          box-shadow: 0 0 1px 0 black;
          border-radius: 1px;
          z-index: 2;
        `}
        style={{
          transform: interpolate(
            [x, s],
            (x, s) => `perspective(200px) rotateY(${s}deg) translateX(${x}px)`
          )
        }}
      />
    </div>
  );
}
