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

                    {words.map(x => 
                        <Col sm='6' md='4'
                        style={{
                            marginTop:20
                        }}>
                        <ReactCardFlip isFlipped={flipped === x['word']}
                        cardStyles={{"front":{"height" : 150,
                                    "backgroundColor" : "#91f0ff"},
                                "back": {"height" : 150,
                                "backgroundColor" : "#86ffc5"}}}
                            flipDirection='horizontal'>
                            <div onClick={() => {
                                setFlipped(x['word']);
                            }}
                            className="frontcard"
                            >
                                <div classname='eachcard'>
                                <p >{x['word']}</p>
                                </div>
                            </div>
                            <div onClick={() => {
                                setFlipped('xyz');
                            }}
                            className="backcard"
                            >
                                <div classname='eachcard'>
                                <p >{x['meaning']}</p>
                                </div>
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