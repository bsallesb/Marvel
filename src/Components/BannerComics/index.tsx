import { Billboard } from "./styled";

export const BannerComics:React.FC = () =>
    (
        <Billboard className="opacity-75">            
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h1 className="fw-bold">MARVEL COMICS</h1>
                        <p>'DOCTOR STRANGE: NEXUS OF NIGHTMARES' #1</p>
                        <p>Featuring his two most terrifying villains, Nightmare and Baron Mordo, and showcasing some of Doctor Strange’s greatest feats yet, DOCTOR STRANGE: NEXUS OF NIGHTMARES will provide a perfect entry point into the unique mystical world of Doctor Strange.</p>
                        <span>For more information browse the menu above.</span>
                    </div>
                </div>
            </div>
        </Billboard>
    );