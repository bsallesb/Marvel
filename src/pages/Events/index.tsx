import { useState, useEffect } from "react";

import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingCard from "../../components/LoadingCard";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import LoadingGate from "../../components/LoadingGate";
import SubTitle from "../../components/SubTitle";
import Api from "../../services/Api";
import Pagination from "../../components/Pagination/styled";
import PaginationSearching from "../../components/PaginationSearch";
import MainSearch from "../../components/Search";
import EventCard from "../../components/EventCard";
import { EventsType } from "../../@types/EventsType";
import { BannerEvent } from "../../components/BannerEvent";
import { setTitle } from "../../utils/title";

export const Events: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventsType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const getEvents = (page = 1, searchName = ""): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page);

    let url = `/events?limit=${limit}&offset=${offset}`;

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`;
    }

    Api.get(url)
      .then((response) => {
        setEvents(response?.data?.data?.results);
        setPageCount(
          Math.ceil(response?.data?.data?.total / response?.data?.data?.limit)
        );
      })
      .catch(() => {
        setPageCount(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getEvents(1);
    setTitle("Events");
  }, []);

  const handleSearch = (searchText: string) => {
    getEvents(1, searchText);
  };

  return (
    <>
      <Header />
      <Menu />
      <BannerEvent />
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb
            data={[
              {
                title: "Events",
                backTo: "/events",
              },
            ]}
          />
          <MainSearch placeholder="Search Events" onSearch={handleSearch} />
        </div>
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle="Events" />
            <div className="row gx-5 gy-4 pb-4 p-0 pt-3">
              {events.length > 0 &&
                events.map((event) => (
                  <div key={event.id} className="col-3 d-flex">
                    <EventCard
                      title={event.title}
                      description={event.description}
                      image={`${event.thumbnail.path}.${event.thumbnail.extension}`}
                      id={event.id}
                    />
                  </div>
                ))}
            </div>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => [getEvents(event.selected + 1)]}
                className="fw-bold"
              />
            )}
            <PaginationSearching
              max={pageCount}
              min={1}
              value={searchPage}
              onChange={(event) =>
                setSearchPage(parseInt(event.target.value, 10))
              }
              onButtonClick={() => getEvents(searchPage)}
            />
          </>
        </LoadingGate>
      </Container>
      <Footer />
    </>
  );
};
