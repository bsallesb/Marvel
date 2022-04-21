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
import { CharactersType } from "../../@types/CharactersType";
import MainSearch from "../../components/Search";
import { BannerCharacter } from "../../components/BannerCharacter";
import CharacterCard from "../../components/CharacterCard";
import { setTitle } from "../../utils/title";

export const Characters: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<CharactersType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const getCharacters = (page = 1, searchName = ""): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page);

    let url = `/characters?limit=${limit}&offset=${offset}`;

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`;
    }

    Api.get(url)
      .then((response) => {
        setCharacters(response?.data?.data?.results);
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
    getCharacters(1);
    setTitle("Characters");
  }, []);

  const handleSearch = (searchText: string) => {
    getCharacters(1, searchText);
  };

  return (
    <>
      <Header />
      <Menu />
      <BannerCharacter />
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <Breadcrumb
            data={[
              {
                title: "Characters",
                backTo: "/characters",
              },
            ]}
          />
          <MainSearch placeholder="Search Character" onSearch={handleSearch} />
        </div>
        <LoadingGate waitFor={isLoading === false} meanWile={<LoadingCard />}>
          <>
            <SubTitle mainTitle="Characters" />
            <div className="row gx-5 gy-4 pb-4 p-0 pt-3">
              {characters.length > 0 &&
                characters.map((character) => (
                  <div key={character.name} className="col-3 d-flex">
                    <CharacterCard
                      title={character.name}
                      image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      id={character.id}
                    />
                  </div>
                ))}
            </div>
            {pageCount > 1 && (
              <Pagination
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => {
                  getCharacters(event.selected + 1);
                  setSearchPage(event.selected + 1);
                }}
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
              onButtonClick={() => getCharacters(searchPage)}
            />
          </>
        </LoadingGate>
      </Container>
      <Footer />
    </>
  );
};
