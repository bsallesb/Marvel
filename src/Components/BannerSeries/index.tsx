import { Billboard } from "./styled";

export const BannerSeries:React.FC = () =>
    (
        <Billboard className="opacity-75">            
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h1 className="fw-bold">MARVEL SERIES</h1>
                        <p>Explore the series that shape Marvel TV!</p>
                        <span>For more information browse the menu above.</span>
                    </div>
                </div>
            </div>
        </Billboard>
    );  