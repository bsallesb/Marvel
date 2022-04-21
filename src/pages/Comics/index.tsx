import { useState, useEffect } from "react";

import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingCard from "../../components/LoadingCard";
import ComicCard from "../../components/ComicCard";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import LoadingGate from "../../components/LoadingGate";
import SubTitle from "../../components/SubTitle";
import Api from "../../services/Api";
import Pagination from "../../components/Pagination/styled";
import PaginationSearching from "../../components/PaginationSearch";
import { ComicsType } from "../../@types/ComicsType";
import MainSearch from "../../components/Search";
import { BannerComics } from "../../components/BannerComics";
import { setTitle } from "../../utils/title";

export const Comics: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [comics, setComics] = useState<ComicsType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const getComics = (page = 1, searchName = ""): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page);

    let url = `/comics?limit=${limit}&offset=${offset}`;

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`;
    }

    Api.get(url)
      .then((response) => {
        setComics(response?.data?.data?.results);
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
    getComics(1);
    setTitle("Comics");
  }, []);

  const handleSearch = (searchText: string) => {
    getComics(1, searchText);
  };

  return (
    <>
      <Header />
      <Menu />
      <BannerComics />
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb
            data={[
              {
                title: "Comics",
                backTo: "/comics",
              },
            ]}
          />
          <MainSearch placeholder="Search Comics" onSearch={handleSearch} />
        </div>
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle="Comics" />
            <div className="row gx-5 gy-4 pb-4 p-0 pt-3">
              {comics.length > 0 &&
                comics.map((comic) => (
                  <div key={comic.id} className="col-3 d-flex">
                    <ComicCard
                      title={comic.title}
                      image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      id={comic.id}
                    />
                  </div>
                ))}
            </div>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => [getComics(event.selected + 1)]}
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
              onButtonClick={() => getComics(searchPage)}
            />
          </>
        </LoadingGate>
      </Container>
      <Footer />
    </>
  );
};
