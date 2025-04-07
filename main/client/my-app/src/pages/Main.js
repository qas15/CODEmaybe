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
        </Container>
    );
});

export default Main;