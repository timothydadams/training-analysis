import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch, faChartLine } from '@fortawesome/free-solid-svg-icons';

export const Logo = () => (
    <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={faSearch} color="black" size="6x" />
        <FontAwesomeIcon icon={faChartLine} color="white" size="4x" transform="shrink-6" />
    </span>
)