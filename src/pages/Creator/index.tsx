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
import { CreatorsType } from "../../@types/CreatorsType";
import { BannerCreators } from "../../Components/BannerCreators";
import { setTitle } from "../../utils/title";

export const Creator:React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [creator, setCreator] = useState<CreatorsType | null>(null);

  const { id } = useParams();

  const getCreator = (): void => {

    setLoading(true);

    Api.get(`/creators/${id}`)
      .then((response) => {
        setCreator(response?.data?.data?.results[0] ?? null);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCreator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(`${creator?.firstName ?? "Loading..."} | Creators`);
  }, [creator]);


  console.log(creator);

    return (
      <>
        <Header />
        <Menu />
        <BannerCreators />
        <Container>
        <Breadcrumb 
          data={[
            {
                title: "Creators",
                backTo: "/creators",
            },
            {
                title: creator?.firstName ?? "Loading...",
                backTo: "",
            },
          ]}
        />
        <LoadingGate 
          waitFor={ isLoading === false}
          meanWile={ <LoadingCard /> }
        >
          <>
            <SubTitle mainTitle={creator?.firstName ?? "Loading..."}/>

                <div className="row mt-4 mb-4">
                    <img src={`${creator?.thumbnail?.path}.${creator?.thumbnail?.extension}`} alt={creator?.firstName} className="col-4 img-fluid border p-0 border-danger border-2"/>
                    <div className="col">
                        <p className="text-align-justify">{creator?.description ?? "Pending description"}</p>
                        <div className="d-flex flex-column">
                            <p className="mt-3"><span className="fw-bold">First Name:</span> {creator?.firstName ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Middle Name:</span> {creator?.middleName && creator?.middleName.length > 0 ? creator?.middleName : "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Last Name:</span> {creator?.lastName ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Suffix:</span> {creator?.suffix ?? "Undefined"}</p>
                            <p className="mt-3"><span className="fw-bold">Modified:</span> {creator?.modified ?? "Undefined"}</p>
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