import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {observer} from "mobx-react-lite";
import Pages from "../components/Pages";

const Main = observer(() => {

    return (
        <Container>
            <Row className="mt-2">
                <Col md={9}>
                    <Pages/>
                </Col>
            </Row>
   
            <Col>
                <Row>
                    <Col>
                        <h1>Делайте это!</h1>
                        <p>С помощью нашего сайта вы можете и это, и это, и это</p>
                    </Col>
                </Row>

                <hr/>

                <Row>
                    <Col>
                        <h1>Делайте это тоже</h1>
                        <p>С помощью нашего сайта вы можете и это, и это, и это, а еще это!</p>
                    </Col>
                </Row>
            </Col>
        </Container>
    );
});

export default Main;