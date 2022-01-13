import { useState, useEffect } from "react";

import Container from "../../Components/Container"
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingCard from "../../Components/LoadingCard"
import StorieCard from "../../Components/StorieCard";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";
import { Menu } from "../../Components/Menu";
import LoadingGate from "../../Components/LoadingGate";
import SubTitle from "../../Components/SubTitle";
import Api from "../../Services/Api";
import Pagination from "../../Components/Pagination/styled";
import PaginationSearching from "../../Components/PaginationSearch";
import MainSearch from "../../Components/Search";
import { StoriesType } from "../../@types/StoriesType";
import { BannerStories } from "../../Components/BannerStories";
import { setTitle } from "../../utils/title";

export const Stories:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [stories, setStories] = useState<StoriesType[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
 
  const getStories = (page = 1, searchName = ''): void => {
    const limit = 24;
    const offset = (page - 1) * limit;

    setLoading(true);
    setCurrentPage(page)

    let url = `/stories?limit=${limit}&offset=${offset}`

    if (searchName.length > 0) {
      url += `&nameStartsWith=${searchName}`
    }

    Api.get(url)
      .then((response) => {
        setStories(response?.data?.data?.results);
        setPageCount(Math.ceil(response?.data?.data?.total / response?.data?.data?.limit));
      })
      .catch(() => {
        setPageCount(0);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStories(1);
    setTitle("Stories");
  }, []);

    const handleSearch = (searchText: string) => {
      getStories(1, searchText);
    };

    return (
      <>
        <Header />
        <Menu />
        <BannerStories />
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <Breadcrumb 
              data={[
                {
                  title: "Stories",
                  backTo: "/stories",
                },
              ]}
            />
            <MainSearch 
            placeholder="Search Stories"
            onSearch={handleSearch}
            />
          </div>
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle="Stories"/>
              <div className='row gx-5 gy-4 pb-4 p-0 pt-3'>
                {stories.length > 0 && stories.map((storie) => (
                    <div key={storie.id} className='col-3 d-flex'>
                      <StorieCard 
                        title={storie.title} 
                        description={storie.description} 
                        id={storie.id}
                      />
                    </div>
                ))}
              </div>
              {pageCount > 1 && <Pagination 
                pageCount={pageCount}
                forcePage={currentPage - 1}
                onPageChange={(event) => [
                  getStories(event.selected + 1),
                ]}
                className='fw-bold'
              />}
            <PaginationSearching 
              max={pageCount} 
              min={1} 
              value={searchPage} 
              onChange={(event) => setSearchPage(parseInt(event.target.value, 10))}
              onButtonClick={() => getStories(searchPage)}
            />
          </>
        </LoadingGate>
        </Container>
        <Footer />
      </>
    );
  }