import React, {useState} from 'react';
import {Button,
Container,
Row,
Col} from 'react-bootstrap';
import ReactCardFlip from "react-card-flip";

const words = require("../../index.json");

function Home(props) {

    const [flipped, setFlipped]=useState('xyz');

    return (
        <>
        <div>
            <h1>GRE English flashcards</h1>
            <h2>Total words: {words.length}</h2>
            <Container>
                <Row>
                    <Col sm='6' md='4'>
                    <Button >Help</Button>
                    </Col>
                    <Col sm='6' md='4'>
                    <Button>Help</Button>
                    </Col>
                    <Col sm='6' md='4'>
                    <Button>Help</Button>
                    </Col>

                    {words.map(x => 
                        <Col sm='6' md='4'>
                        <ReactCardFlip isFlipped={flipped === x['word']}
                        flipDirection='horizontal'>
                            <div onClick={() => {
                                setFlipped(x['word']);
                            }}>
                                {x['word']}
                            </div>
                            <div onClick={() => {
                                setFlipped('xyz');
                            }}>
                                {x['meaning']}
                            </div>
                        </ReactCardFlip>
                        </Col>
                    )}
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Home;