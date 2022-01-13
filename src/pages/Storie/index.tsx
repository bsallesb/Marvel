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
import { StoriesType } from "../../@types/StoriesType";
import { BannerStories } from "../../Components/BannerStories";
import { setTitle } from "../../utils/title";

export const Storie:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [storie, setStorie] = useState<StoriesType | null>(null);

  const { id } = useParams();

  const getStorie = (): void => {

    setLoading(true);

    Api.get(`/stories/${id}`)
      .then((response) => {
        setStorie(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStorie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${storie?.title ?? "Loading..."} | Stories`);
  }, [storie]);


    return (
      <>
        <Header />
        <Menu />
        <BannerStories />
        <Container>
        <Breadcrumb 
          data={[
            {
                title: "Stories",
                backTo: "/stories",
            },
            {
                title: storie?.title ?? "Loading...",
                backTo: "",
            },
          ]}
        />
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle={storie?.title ?? "Loading..."}/>

                <div className="row mt-4 mb-4">
                    <img src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" alt={storie?.title} className="col-4 img-fluid border p-0 border-danger border-2"/>
                    <div className="col">
                        <p className="text-align-justify">{storie?.description ?? "Pending description"}</p>
                        <div className="d-flex flex-column">
                            <p className="mt-3"><span className="fw-bold">Modified:</span> {storie?.modified ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Start Year:</span> {storie?.startYear ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">End Year:</span> {storie?.endYear ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Rating:</span> {storie?.rating ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Type:</span> {storie?.type ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">More information:</span> {storie?.urls?.url ?? "Undefined"}</p>
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