import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Characters } from "./pages/Characters";
import { Character } from "./pages/Character";
import { Comics } from "./pages/Comics";
import { Comic } from "./pages/Comic";
import { Creators } from "./pages/Creators";
import { Creator } from "./pages/Creator";
import { Events } from "./pages/Events";
import { Event } from "./pages/Event";
import { Series } from "./pages/Series";
import { Serie } from "./pages/Serie";
import { Stories } from "./pages/Stories";
import { Storie } from "./pages/Storie";

export const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" element={<Home />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:id" element={<Character />} />
      <Route path="/comics" element={<Comics />} />
      <Route path="/comics/:id" element={<Comic />} />
      <Route path="/creators" element={<Creators />} />
      <Route path="/creators/:id" element={<Creator />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<Event />} />
      <Route path="/series" element={<Series />} />
      <Route path="/series/:id" element={<Serie />} />
      <Route path="/stories" element={<Stories />} />
      <Route path="/stories/:id" element={<Storie />} />
    </Switch>
  </BrowserRouter>
);
