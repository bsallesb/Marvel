import { useState, useEffect } from "react";

import Container from "../../components/Container";
import Breadcrumb from "../../components/Breadcrumb";
import LoadingCard from "../../components/LoadingCard";
import CreatorsCard from "../../components/CreatorsCard";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Menu } from "../../components/Menu";
import LoadingGate from "../../components/LoadingGate";
import SubTitle from "../../components/SubTitle";
import Api from "../../services/Api";
import Pagination from "../../components/Pagination/styled";
import PaginationSearching from "../../components/PaginationSearch";
import MainSearch from "../../components/Search";
import { CreatorsType } from "../../@types/CreatorsType";
import { BannerCreators } from "../../components/BannerCreators";
import { setTitle } from "../../utils/title";

export const Creators: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [creators, setCreators] = useState<CreatorsType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const getCreators = (page = 1, searchName = ""): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page);

    let url = `/creators?limit=${limit}&offset=${offset}`;

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`;
    }

    Api.get(url)
      .then((response) => {
        setCreators(response?.data?.data?.results);
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
    getCreators(1);
    setTitle("Creators");
  }, []);

  const handleSearch = (searchText: string) => {
    getCreators(1, searchText);
  };

  return (
    <>
      <Header />
      <Menu />
      <BannerCreators />
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb
            data={[
              {
                title: "Creators",
                backTo: "/creators",
              },
            ]}
          />
          <MainSearch placeholder="Search Creators" onSearch={handleSearch} />
        </div>
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle="Creators" />
            <div className="row gx-5 gy-4 pb-4 p-0 pt-3">
              {creators.length > 0 &&
                creators.map((creator) => (
                  <div key={creator.id} className="col-3 d-flex">
                    <CreatorsCard
                      title={creator.firstName}
                      description={creator.description}
                      image={`${creator.thumbnail.path}.${creator.thumbnail.extension}`}
                      id={creator.id}
                    />
                  </div>
                ))}
            </div>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => [getCreators(event.selected + 1)]}
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
              onButtonClick={() => getCreators(searchPage)}
            />
          </>
        </LoadingGate>
      </Container>
      <Footer />
    </>
  );
};
