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
import { ComicsType } from "../../@types/ComicsType";
import { BannerComics } from "../../components/BannerComics";
import { setTitle } from "../../utils/title";

export const Comic: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [comic, setComic] = useState<ComicsType | null>(null);

  const { id } = useParams();

  const getComic = (): void => {
    setLoading(true);

    Api.get(`/comics/${id}`)
      .then((response) => {
        setComic(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${comic?.title ?? "Loading..."} | Comics`);
  }, [comic]);

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
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle={comic?.title ?? "Loading..."} />

            <div className="row mt-4 mb-4">
              <img
                src={`${comic?.thumbnail?.path}.${comic?.thumbnail?.extension}`}
                alt={comic?.title}
                className="col-4 img-fluid border p-0 border-danger border-2"
              />
              <div className="col">
                <p className="text-align-justify">
                  {comic?.description ?? "Pending description"}
                </p>
                <div className="d-flex flex-column">
                  <p className="mt-3">
                    <span className="fw-bold">Modified:</span>{" "}
                    {comic?.modified ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">More information:</span>{" "}
                    {comic?.urls?.url ?? "Undefined"}
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
