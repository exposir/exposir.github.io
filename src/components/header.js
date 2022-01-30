/** @jsx jsx */
import { jsx, Styled } from "theme-ui";
import React from "react";
import HeaderAside from "./header-aside";
import ContentWithAside from "./content-with-aside";

function Header() {
  return (
    <ContentWithAside
      stx={{ pb: [3, 5] }}
      main={
        <>
          <Styled.h1>Exposir</Styled.h1>
          <Styled.p>风物长宜放眼量</Styled.p>
        </>
      }
      aside={<HeaderAside />}
    />
  );
}

export default Header;
