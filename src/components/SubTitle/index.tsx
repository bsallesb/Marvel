import { Subtitle } from "./styled";

interface titleName {
  mainTitle: string;
}

const SubTitle: React.FC<titleName> = ({ mainTitle }) => (
  <Subtitle>
    <div className="container">
      <h2 className="fw-bold p-1 text-center ">{mainTitle}</h2>
    </div>
  </Subtitle>
);

export default SubTitle;
