import React from "react";

import styled, { css } from "styled-components";

const Nav = styled.nav`
  height: 90px;
  img {
    width: 167px;
    height: 45px;
    vertical-align: middle;
  }
  .logo {
    display: inline-block;
    line-height: 90px;
    margin: 0 0 0 3%;
  }
`;

const Header = () => {
  return (
    <Nav>
      <a href={"/"} className="logo">
        <img
          src="https://www.mendezmediamarketing.com/assets/img/Logo%20Files/logo.png"
          alt="Netflix Logo"
        />
      </a>
    </Nav>
  );
};

export default Header;
