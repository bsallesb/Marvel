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
import { EventsType } from "../../@types/EventsType";
import { BannerEvent } from "../../components/BannerEvent";
import { setTitle } from "../../utils/title";

export const Event: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [event, setEvent] = useState<EventsType | null>(null);

  const { id } = useParams();

  const getEvent = (): void => {
    setLoading(true);

    Api.get(`/events/${id}`)
      .then((response) => {
        setEvent(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${event?.title ?? "Loading..."} | Events`);
  }, [event]);

  return (
    <>
      <Header />
      <Menu />
      <BannerEvent />
      <Container>
        <Breadcrumb
          data={[
            {
              title: "Events",
              backTo: "/events",
            },
            {
              title: event?.title ?? "Loading...",
              backTo: "",
            },
          ]}
        />
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle={event?.title ?? "Loading..."} />

            <div className="row mt-4 mb-4">
              <img
                src={`${event?.thumbnail?.path}.${event?.thumbnail?.extension}`}
                alt={event?.title}
                className="col-4 img-fluid border p-0 border-danger border-2"
              />
              <div className="col">
                <p className="text-align-justify">
                  {event?.description ?? "Pending description"}
                </p>
                <div className="d-flex flex-column">
                  <p className="mt-3">
                    <span className="fw-bold">Modified:</span>{" "}
                    {event?.modified ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">Start:</span>{" "}
                    {event?.start ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">End:</span>{" "}
                    {event?.end ?? "Undefined"}
                  </p>
                  <p className="mt-3">
                    <span className="fw-bold">More information:</span>{" "}
                    {event?.urls?.url ?? "Undefined"}
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
