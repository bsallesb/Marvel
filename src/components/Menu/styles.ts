import styled from "styled-components";

export const MainMenu = styled.nav`
  background: #202020;
  border-top: solid;
  border-top-color: grey;
  border-top-width: 0.09rem;
`;

export const MenuList = styled.ul`
  padding: 0 1rem;

  li {
    color: #fff;
    list-style-type: none;
    padding: 0.5rem 1rem;
    font-weight: bold;

    a {
      color: #fff;
      text-decoration: none;
    }
  }
`;
