import React, { useEffect, useState, useContext } from 'react';
import '../styles/Profile.css';
import {Card, Container} from "react-bootstrap";
import {ReactNode} from "react";
import {observer} from "mobx-react-lite";
import { motion } from 'framer-motion';

const Section = ({ title, children }) => (
    <section className="section">
        <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
        >
            {title}
        </motion.h2>
        {children}
    </section>
);

const About = observer(() => {

    return (
        <Section title="About Us">
            <div className="grid">
                <Card title="About Us">
                    <Card.Body>
                        <Card.Title className="text-center">
                            Our Mission
                        </Card.Title>
                        <Card.Text>
                            Delivering exceptional user experiences through innovative solutions
                        </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title className="text-center">
                            Technologies
                        </Card.Title>
                        <Card.Text>
                            React, Node.js, TypeScript, GraphQL, and modern web standards
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Section>
    );
});

export default About;