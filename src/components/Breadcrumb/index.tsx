import { Path } from "./styles";
import { Breadcrumb as Pagelocation } from 'react-bootstrap';
import { Link } from "react-router-dom";

type BreadcrumbItemType = {
    title: string;
    backTo: string;
};

interface BreadcrumbProps {
    data?: BreadcrumbItemType[];
    hideHome?: boolean;
}

const Breadcrumb:React.FC<BreadcrumbProps> = ({ data = [], hideHome = false }) => (
        <Path>
            <div>
                <Pagelocation className="pt-3">
                    {!hideHome && <Pagelocation.Item className="text-muted"><Link to="/">Home</Link></Pagelocation.Item>}
                    {data.map((breadcrumbItem) => (
                        <Pagelocation.Item className="text-muted"><Link to={breadcrumbItem.backTo}>{breadcrumbItem.title}</Link></Pagelocation.Item>
                    ))}
                </Pagelocation>
            </div>
        </Path>
    );

export default Breadcrumb;