/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import HeaderAside from "./header-aside"
import ContentWithAside from "./content-with-aside"

function Header() {
  return (
    <ContentWithAside
      stx={{ pb: [3, 5] }}
      main={
        <>
          <Styled.h1>孟世博</Styled.h1>
          <Styled.p>
            一个简单的前端工程师
            {/* <Styled.inlineCode sx={{ whiteSpace: "pre" }}>
              /pomb[a-z]+/
            </Styled.inlineCode> */}
          </Styled.p>
          <Styled.p>正在学习React Native !</Styled.p>
        </>
      }
      aside={<HeaderAside />}
    />
  )
}

export default Header
