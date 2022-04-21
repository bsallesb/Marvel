import logoMarvel from "../../assets/logo-marvel.png";
import { Logo, MainHeader } from "./styles";

export const Header: React.FC = () => (
  <MainHeader>
    <div className="container text-center">
      <Logo src={logoMarvel} alt="Marvel" />
    </div>
  </MainHeader>
);
