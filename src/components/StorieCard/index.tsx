import { Card as BootstrapCard } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardStyle } from "./styles";

interface ICards {
    title: string;
    description: string;
    id: number;
}

const StorieCard:React.FC<ICards> = ({title, description, id}) =>
    (
        <CardStyle className='align-self-stretch'>
                <BootstrapCard.Body className='border-top border-danger border-4'>
                    <BootstrapCard.Title className='fw-bold'>
                        <Link to={`/stories/${id}`}>
                            {title}
                        </Link>
                    </BootstrapCard.Title>
                    <BootstrapCard.Text>
                        {description}
                    </BootstrapCard.Text>
                </BootstrapCard.Body>
        </CardStyle>
    );

export default StorieCard;