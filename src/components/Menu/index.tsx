import { Link } from "react-router-dom";

import { MainMenu, MenuList } from "./styles";

export const Menu: React.FC = () => (
  <MainMenu>
    <MenuList className="d-flex justify-content-center">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/characters">Characters</Link>
      </li>
      <li>
        <Link to="/comics">Comics</Link>
      </li>
      <li>
        <Link to="/creators">Creators</Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
      <li>
        <Link to="/series">Series</Link>
      </li>
      <li>
        <Link to="/stories">Stories</Link>
      </li>
    </MenuList>
  </MainMenu>
);
