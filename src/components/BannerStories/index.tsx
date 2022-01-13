import { Billboard } from "./styled";

export const BannerStories:React.FC = () =>
    (
        <Billboard className="opacity-75">            
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h1 className="fw-bold">MARVEL STORIES</h1>
                        <p>Explore the stories that shape Marvel TV!</p>
                        <span>For more information browse the menu above.</span>
                    </div>
                </div>
            </div>
        </Billboard>
    );  