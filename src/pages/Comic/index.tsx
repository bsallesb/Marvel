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
import { ComicsType } from "../../@types/ComicsType";
import { BannerComics } from "../../Components/BannerComics";
import { setTitle } from "../../utils/title";

export const Comic:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [comic, setComic] = useState<ComicsType | null>(null);

  const { id } = useParams();

  const getComic = (): void => {

    setLoading(true);

    Api.get(`/comics/${id}`)
      .then((response) => {
        setComic(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${comic?.title ?? "Loading..."} | Comicss`);
  }, [comic]);


  console.log('comic', comic);

    return (
      <>
        <Header />
        <Menu />
        <BannerComics />
        <Container>
        <Breadcrumb 
          data={[
            {
                title: "Comics",
                backTo: "/comics",
            },
            {
                title: comic?.title ?? "Loading...",
                backTo: "",
            },
          ]}
        />
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle={comic?.title ?? "Loading..."}/>

                <div className="row mt-4 mb-4">
                    <img src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`} alt={comic?.title} className="col-4 img-fluid border p-0 border-danger border-2"/>
                    <div className="col">
                        <p className="text-align-justify">{comic?.description ?? "Pending description"}</p>
                        <div className="d-flex flex-column">
                            <p className="mt-3"><span className="fw-bold">Modified:</span> {comic?.modified ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">More information:</span> {comic?.urls?.url ?? "Undefined"}</p>
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