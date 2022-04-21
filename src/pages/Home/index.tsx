import { Banner } from "../../components/Banner";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import { ImgText } from "../../components/ImgText";
import { useEffect } from "react";
import { setTitle } from "../../utils/title";

export const Home: React.FC = () => {
  useEffect(() => {
    setTitle();
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <Banner />
      <ImgText />
      <Footer />
    </>
  );
};
