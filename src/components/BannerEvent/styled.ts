import styled from 'styled-components';

export const Billboard = styled.section`
    background-image: url("https://terrigen-cdn-dev.marvel.com/content/prod/1x/marvelsguardiansofthegalaxy_lob_mas_min_dsk_02.jpg");
    background-size: cover;

    div {
        color: #ffff;
        padding: 38px 0; 
    };

    h1 {
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: #000
    }

    p, span {
        -webkit-text-stroke-width: 0.3px;
        -webkit-text-stroke-color: #000
    }
`