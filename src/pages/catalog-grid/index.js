import React from 'react';

import {CatalogGrid, CatalogGridAutoload} from '../../components/catalog/CatalogGrid.jsx';

const Page__CaralogGrid = (props) => {
    return(
        <div>
            <CatalogGrid />
            <CatalogGridAutoload />
        </div>
    )
}

export default Page__CaralogGrid;

//CatalogGrid