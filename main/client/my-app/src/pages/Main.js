import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {observer} from "mobx-react-lite";
import OpenLayersMap from '../components/Map';

const Main = observer(() => {

    return (
        <div style={{padding: 0, margin: 0, width: "100%", overflowX: "hidden"}}>
            <OpenLayersMap/>
        </div>
    );
});

export default Main;