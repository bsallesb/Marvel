import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "../../Components/Container"
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingCard from "../../Components/LoadingCard"
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Menu } from "../../Components/Menu";
import LoadingGate from "../../Components/LoadingGate";
import SubTitle from "../../Components/SubTitle";
import Api from "../../Services/Api";
import { CharactersType } from "../../@types/CharactersType";
import { BannerCharacter } from "../../Components/BannerCharacter";
import { setTitle } from "../../utils/title";

export const Character:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [character, setCharacter] = useState<CharactersType | null>(null);

  const { id } = useParams();

  const getCharacter = (): void => {

    setLoading(true);

    Api.get(`/characters/${id}`)
      .then((response) => {
        setCharacter(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCharacter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${character?.name ?? "Loading..."} | Characters`);
  }, [character]);

    return (
      <>
        <Header />
        <Menu />
        <BannerCharacter />
        <Container>
        <Breadcrumb 
          data={[
            {
              title: "Characters",
              backTo: "/characters",
            },
            {
                title: character?.name ?? "Loading...",
                backTo: "",
            },
          ]}
        />
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle={character?.name ?? "Loading..."}/>

                <div className="row mt-4 mb-4">
                    <img src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} alt={character?.name} className="col-4 img-fluid border p-0 border-danger border-2"/>
                    <div className="col">
                        <p className="text-align-justify">{character?.description ?? "Pending description"}</p>
                        <div className="d-flex flex-wrap">
                            <p className="mt-3"><span className="fw-bold">Modified:</span> {character?.modified ?? "Undefined"}</p>
                        </div>
                    </div>
                </div>
          </>
        </LoadingGate>
        </Container>
        <Footer />
      </>
    );
  }