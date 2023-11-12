import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default function Section({ imageUrl, name, impact, probability, last_obs, risk, diameter}) {
  return (
    <Card style={{ width: '70vw', height: '70vh', padding: '5vh', backgroundColor: 'rgba(128, 128, 128, 0.3)', color: '#fdfdfd'}}>
        <Row noGutters>
            <Col md={6}>
                <Card.Img variant="top" src={imageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Col>
            <Col md={6}>
                <Card.Body>
                    <Card.Title style={{ fontSize: '5vh'}}>{name}</Card.Title>
                    <Card.Text>Risk: {risk}</Card.Text>
                    <Card.Text>Impact of being Hitten: {impact}</Card.Text>
                    <Card.Text>Probability of ever hitten Earth: {probability}</Card.Text>
                    <Card.Text>Diameter: {diameter}</Card.Text>
                    <Card.Text>Last Observed: {last_obs}</Card.Text>
                </Card.Body>
            </Col>
      </Row>
    </Card>
  );
};
