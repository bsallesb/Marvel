import ContentLoader from 'react-content-loader'

const ImageGrid = () => (
    <div className="container">
        <ContentLoader
            width={1288}
            height={950}
            viewBox="0 0 1288 950"
            backgroundColor="#8f88ec"
            foregroundColor="#ee6c6c"
        >
            <rect x="12" y="30" rx="2" ry="2" width="1288" height="50" />
            <rect x="12" y="98" rx="2" ry="2" width="302" height="350" />
            <rect x="340" y="97" rx="2" ry="2" width="302" height="350" />
            <rect x="668" y="96" rx="2" ry="2" width="302" height="350" />
            <rect x="996" y="95" rx="2" ry="2" width="302" height="350" />
            <rect x="12" y="473" rx="2" ry="2" width="302" height="350" />
            <rect x="340" y="471" rx="2" ry="2" width="302" height="350" />
            <rect x="668" y="469" rx="2" ry="2" width="302" height="350" />
            <rect x="996" y="467" rx="2" ry="2" width="302" height="350" />
            <rect x="493" y="843" rx="2" ry="2" width="302" height="35" />
        </ContentLoader>
    </div>
);

export default ImageGrid