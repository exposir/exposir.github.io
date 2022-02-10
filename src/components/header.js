/** @jsx jsx */
import { jsx, Styled, Link } from "theme-ui";
import React from "react";
import HeaderAside from "./header-aside";
import ContentWithAside from "./content-with-aside";

function Header() {
  const linkStyle = { color: "#11141f", textDecoration: "none" };

  return (
    <ContentWithAside
      stx={{ pb: [3, 5] }}
      main={
        <>
          <Styled.h1>Hello</Styled.h1>
          <Styled.p>我是孟世博，FE，19年毕业</Styled.p>
          <Styled.p>
            <div> 目前就职于脉脉内容事业部</div>
            <div> 曾就职于360奇舞团、百度音乐</div>
          </Styled.p>
          <Styled.p>
            业余时间我会开发{" "}
            <a
              style={linkStyle}
              href="https://macos-web.exposir.cn/"
              target="_blank"
            >
              macos-web
            </a>{" "}
            ，一个基于 Next.js 的macosUI,你也可以在{" "}
            <a
              style={linkStyle}
              href="https://www.zhihu.com/people/exposir/posts"
              target="_blank"
            >
              Zhihu
            </a>{" "}
            查看我的技术博客，我还开发了一个类 VuePress 的{" "}
            <a
              style={linkStyle}
              href="https://github.com/exposir/typora-vuepress-theme"
              target="_blank"
            >
              Typora 主题。
            </a>{" "}
          </Styled.p>
        </>
      }
      aside={<HeaderAside />}
    />
  );
}

export default Header;
