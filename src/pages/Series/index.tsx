import { useState, useEffect } from "react";

import Container from "../../Components/Container"
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingCard from "../../Components/LoadingCard"
import SerieCard from "../../Components/SerieCard";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Menu } from "../../Components/Menu";
import LoadingGate from "../../Components/LoadingGate";
import SubTitle from "../../Components/SubTitle";
import Api from "../../Services/Api";
import Pagination from "../../Components/Pagination/styled";
import PaginationSearching from "../../Components/PaginationSearch";
import MainSearch from "../../Components/Search";
import { SeriesType } from "../../@types/SeriesType";
import { BannerSeries } from "../../Components/BannerSeries";
import { setTitle } from "../../utils/title";

export const Series:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [series, setSeries] = useState<SeriesType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
 
  const getSeries = (page = 1, searchName = ''): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page)

    let url = `/series?limit=${limit}&offset=${offset}`

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`
    }

    Api.get(url)
      .then((response) => {
        setSeries(response?.data?.data?.results);
        setPageCount(Math.ceil(response?.data?.data?.total / response?.data?.data?.limit));
      })
      .catch(() => {
        setPageCount(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getSeries(1);
    setTitle("Series");
  }, []);

    const handleSearch = (searchText: string) => getSeries(1, searchText);

    return (
      <>
        <Header />
        <Menu />
        <BannerSeries />
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Breadcrumb 
              data={[
                {
                  title: "Series",
                  backTo: "/series",
                },
              ]}
            />
            <MainSearch 
            placeholder="Search Series"
            onSearch={handleSearch}
            />
          </div>
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle="Series"/>
              <div className='row gx-5 gy-4 pb-4 p-0 pt-3'>
                {series.length > 0 && series.map((serie) => (
                    <div key={serie.id} className='col-3 d-flex'>
                      <SerieCard 
                        title={serie.title} 
                        description={serie.description} 
                        image={`${serie.thumbnail.path}.${serie.thumbnail.extension}`}
                        id={serie.id}
                      />
                    </div>
                ))}
              </div>
              {pageCount > 1 && <Pagination 
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => [
                  getSeries(event.selected + 1),
                ]}
                className='fw-bold'
              />}
            <PaginationSearching 
              max={pageCount} 
              min={1} 
              value={searchPage} 
              onChange={(event) => setSearchPage(parseInt(event.target.value, 10))}
              onButtonClick={() => getSeries(searchPage)}
            />
          </>
        </LoadingGate>
        </Container>
        <Footer />
      </>
    );
  }