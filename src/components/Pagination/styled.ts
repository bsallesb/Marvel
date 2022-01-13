import ReactPaginate from "react-paginate";

import styled from "styled-components";


const Pagination = styled(ReactPaginate)`
    display: flex;
    justify-content: center;
    padding: 1.5rem 0;

    a {
        text-decoration: none;
        padding: 9px;
        color: #000;
    }

    li {
        list-style-type: none;
        background-color: #f0141e;
        margin: 3px;
        
        &.selected{
            background-color: #fff;
        }
    }

`

export default Pagination;