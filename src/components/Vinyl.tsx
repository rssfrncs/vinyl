import * as React from "react";
import { useDrag } from "react-use-gesture";
import { animated, useSpring, interpolate } from "react-spring";
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
  // const scale = scaleLinear()
  //   .range([0, 360])
  //   .domain([0, 200]);
  // const scaleVis = scaleLinear()
  //   .range([1, 0])
  //   .domain([0, 100]);
  const { r, x, s } = useSpring({
    r: active ? 45 : 0,
    x: active ? -100 : -10,
    s: active ? -5 : 0
  });
  // const bind = useDrag(
  //   ({ movement: [x], down }) => {
  //     console.log(x);
  //     set({
  //       r: down ? scale(x) : 0,
  //       x: down ? Math.max(-100, x) : -10,
  //       o: down ? scaleVis(x) : 1
  //     });
  //   },
  //   {
  //     axis: "x",
  //     boundaries: {
  //       top: 0,
  //       left: 0,
  //       right: 200,
  //       bottom: 0
  //     }
  //   }
  // );
  return (
    <div
      onClick={() => void onClick(name)}
      css={css`
        width: 200px;
        height: 200px;
        position: relative;
      `}

      // {...bind()}
    >
      <animated.div
        css={css`
          width: 100%;
          height: 100%;
          transform-origin: 50% 50%;
        `}
        style={{ transform: r.interpolate(r => `rotate(${r}deg`) }}
      >
        <div
          css={css`
            margin: 5px;
            width: calc(100% - 10px);
            height: calc(100% - 10px);
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
          width: 200px;
          height: 200px;
          background: #bbb;
          background-size: cover;
          background-image: url(${url});
          box-shadow: 0 0 1px 0 black;
          border-radius: 1px;
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
