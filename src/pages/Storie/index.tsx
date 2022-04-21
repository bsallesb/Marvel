import { useState, useEffect } from "react";
import { useParams } from "react-router";

import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingCard from "../../components/LoadingCard";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import LoadingGate from "../../components/LoadingGate";
import SubTitle from "../../components/SubTitle";
import Api from "../../services/Api";
import { StoriesType } from "../../@types/StoriesType";
import { BannerStories } from "../../components/BannerStories";
import { setTitle } from "../../utils/title";

export const Storie: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [storie, setStorie] = useState<StoriesType | null>(null);

  const { id } = useParams();

  const getStorie = (): void => {
    setLoading(true);

    Api.get(`/stories/${id}`)
      .then((response) => {
        setStorie(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {})
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
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle={storie?.title ?? "Loading..."} />

            <div className="row mt-4 mb-4">
              <img
                src="http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                alt={storie?.title}
                className="col-4 img-fluid border p-0 border-danger border-2"
              />
              <div className="col">
                <p className="text-align-justify">
                  {storie?.description ?? "Pending description"}
                </p>
                <div className="d-flex flex-column">
                  <p className="mt-3">
                    <span className="fw-bold">Modified:</span>{" "}
                    {storie?.modified ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">Start Year:</span>{" "}
                    {storie?.startYear ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">End Year:</span>{" "}
                    {storie?.endYear ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">Rating:</span>{" "}
                    {storie?.rating ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">Type:</span>{" "}
                    {storie?.type ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">More information:</span>{" "}
                    {storie?.urls?.url ?? "Undefined"}
                  </p>
                </div>
              </div>
            </div>
          </>
        </LoadingGate>
      </Container>
      <Footer />
    </>
  );
};
