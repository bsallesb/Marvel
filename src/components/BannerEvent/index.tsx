import { Billboard } from "./styled";

export const BannerEvent: React.FC = () => (
  <Billboard className="opacity-75">
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="fw-bold">MARVEL EVENTS</h1>
          <p>Explore the events that shape Marvel TV!</p>
          <span>For more information browse the menu above.</span>
        </div>
      </div>
    </div>
  </Billboard>
);
