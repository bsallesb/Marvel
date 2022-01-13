import { Banner } from "../../Components/Banner";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Menu } from "../../Components/Menu";
import { ImgText } from "../../Components/ImgText";
import { useEffect } from "react";
import { setTitle } from "../../utils/title";

export const Home:React.FC = () => {

  useEffect(() => {
    setTitle();
  }, []);

  return(
        <>
          <Header />
          <Menu />
          <Banner />
          <ImgText />
          <Footer />
        </>
    );
}