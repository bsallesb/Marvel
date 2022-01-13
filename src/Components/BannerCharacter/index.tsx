import { Billboard } from "./styled";

export const BannerCharacter:React.FC = () =>
    (
        <Billboard className="opacity-75">            
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h1 className="fw-bold">MARVEL CHARACTERS</h1>
                        <p>Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!</p>
                        <span>For more information browse the menu above.</span>
                    </div>
                </div>
            </div>
        </Billboard>
    );