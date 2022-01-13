import { Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardStyle } from "./styles";

interface ICards {
    image: string;
    title: string;
    description: string;
    id: number;
}

const SerieCard:React.FC<ICards> = ({image, title, description, id}) =>
    (
        <CardStyle className='align-self-stretch'>
                <Link to={`/series/${id}`}>
                    <BootstrapCard.Img src={image} />
                </Link>
                <BootstrapCard.Body className='border-top border-danger border-4'>
                    <BootstrapCard.Title className='fw-bold'>
                        <Link to={`/series/${id}`}>
                            {title}
                        </Link>
                    </BootstrapCard.Title>
                    <BootstrapCard.Text>
                        {description}
                    </BootstrapCard.Text>
                </BootstrapCard.Body>
        </CardStyle>
    );

export default SerieCard;