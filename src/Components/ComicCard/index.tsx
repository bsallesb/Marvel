import { Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardStyle } from "./styles";

interface ICards {
    image: string;
    title: string;
    id: number;
}

const ComicCard:React.FC<ICards> = ({image, title, id}) =>
    (
        <CardStyle className='align-self-stretch'>
                <Link to={`/comics/${id}`}>
                    <BootstrapCard.Img src={image} />
                </Link>
                <BootstrapCard.Body className='border-top border-danger border-4'>
                    <BootstrapCard.Title className='fw-bold'>
                        <Link to={`/comics/${id}`}>
                            {title}
                        </Link>
                    </BootstrapCard.Title>
                </BootstrapCard.Body>
        </CardStyle>
    );

export default ComicCard;