import { Billboard } from "./styles";

export const Banner: React.FC = () => (
  <Billboard>
    <div className="container">
      <div className="row">
        <div className="col-6">
          <h1 className="fw-bold">
            Discover all about Marvel Comics characters.
          </h1>
          <p>
            One of the world's most prominent character-based entertainment
            companies, built on a proven library of more than 8,000 characters
            featured in a variety of media over seventy-five years. Marvel
            utilizes its character franchises in entertainment, licensing and
            publishing.
          </p>
          <span>For more information browse the menu above.</span>
        </div>
      </div>
    </div>
  </Billboard>
);
