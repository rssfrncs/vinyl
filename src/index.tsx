import { css } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import "./index.css";
import * as React from "react";
import { render } from "react-dom";
import { Vinyl } from "./components/Vinyl";

const theme = {
  radius: "2px",
  dark: "#313131",
  dark2: "#414141",
  light: "#fff",
  light2: "#bababa",
  paddingHorizontal: "20px",
  paddingVertical: "10px"
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

function Main() {
  const data = [
    "https://www.billboard.com/files/styles/900_wide/public/media/Miles-Davis-Bitches-Brew-album-covers-billboard-1000x1000.jpg",
    "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/master/pass/Artist-Designed%20Album%20Covers%202.jpg",
    "https://www.billboard.com/files/styles/900_wide/public/media/Joy-Division-Unknown-Pleasures-album-covers-billboard-1000x1000.jpg",
    "https://images.complex.com/images/fl_lossy,q_auto/hkcs9pgcxaubh9e9sc4c/tyler-the-creator-igor-cover",
    "https://www.digitalartsonline.co.uk/cmsdata/slideshow/3776245/beck_-_hyperspace.jpg"
  ];
  const [active, setActive] = React.useState(data[0]);
  return (
    <div
      css={css`
        padding: 10px;
        width: 100%;
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      `}
    >
      {data.map(url => (
        <>
          <Vinyl
            onClick={name => setActive(name)}
            name={url}
            active={active === url}
            url={url}
          />{" "}
          <div
            css={css`
              flex: 0 0 10px;
            `}
          />
        </>
      ))}
    </div>
  );
}

render(<App />, document.getElementById("root"));
