import React, {useState, useEffect} from 'react';
import {Button,
Form,
Container,
Row,
Col,
Navbar} from 'react-bootstrap';
// import Flippy, {FrontSide, BackSide} from 'react-flippy';
import ReactPaginate from 'react-paginate';
import ReactCardFlip from "react-card-flip";
import ExampleModal from "../ExampleModal";
import shuffleArray from "./ShuffleArray";
import {useNavigate} from "react-router-dom";

const input = require("../../output.json");
const normalized =  require("../../normalized.json");


function Home(props) {

    const [flipped, setFlipped]=useState('xyz');
    const [words, setWords] = useState(input);

    const [currentItems, setCurrentItems] = useState(words.slice(0,10)); // for items to be shown in the page
    const [pageCount, setPageCount] = useState(0); // to count the total number of pages
    const [itemOffset, setItemOffset] = useState(0); // for the first item in each page / first item in currentItems
    const [itemsPerPage, setItemsPerPage] = useState(10); // how many items per page
    const [pageSelected, setPageSelected]= useState(1);
    
    const [modalShow, setModalShow] = useState(false);
    const [modalWord, setModalWord] = useState('xyz');
    const [modalExample, setModalExample] = useState([]);  

    const navigate = useNavigate();

    useEffect(() => {
        const endOffset= itemOffset + parseInt(itemsPerPage); // last item in the page + 1
        console.log('offset'+itemOffset + 'endoffset' + endOffset);
        setCurrentItems(words.slice(itemOffset, endOffset)); // slicing the array
        setPageCount(Math.ceil(words.length / itemsPerPage)); // setting the Page Count
    }, [itemsPerPage, itemOffset, words]);

    const randomize = (e) => {
        e.preventDefault(); 
        const x =shuffleArray(input)
        setWords(x);
        const endOffset= itemOffset + parseInt(itemsPerPage); // last item in the page + 1
        setCurrentItems(x.slice(itemOffset, endOffset)); // slicing the array
        setPageCount(Math.ceil(words.length / itemsPerPage));
    }

    useEffect(() => {
        if(props.random === true) 
        setWords(shuffleArray(input))
        else 
        setWords(normalized);
    },[props.random])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * parseInt(itemsPerPage)) % words.length; // triggers everytime page is clicked on
        setPageSelected(event.selected);
        setItemOffset(newOffset); // set new Item Offset 
    }

    const changeWordsPerPage = (e) => {
        setItemsPerPage(e.target.value);
        const newOffset = (pageSelected * parseInt(e.target.value)) % words.length; // triggers everytime page is clicked on
        setItemOffset(newOffset); // set new Item Offset 
        
    }

    

    return (
        <>
        <div>

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                
            GRE English Flashcards {props.random? " - Random":""}
            </Navbar.Brand>
            </Container>
            </Navbar>
            <h2
            style={{margin:"20px 0"}}>Total words: {words.length}</h2>
            
            {!props.random ? <>
                <Button 
                className= 'purple'
                onClick={() => navigate('../random')}>Random</Button>
            </>:
            <>
                <Button className= 'purple' onClick={randomize}>Randomize</Button>{' '}
                <Button className= 'green' onClick={() => navigate('../')}>Normalize</Button>
            </>
            }
            
            <div style={{margin:'20px auto auto', maxWidth:"300px"}}>
            <Form>
                <Form.Label>No. of words per page</Form.Label>
            <Form.Select aria-label="Default select example"
            onChange={changeWordsPerPage}
            value={itemsPerPage}>
                <option value='5'>5</option>
                <option value="10" default>10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
            </Form.Select>
            </Form>
            </div>


            <Container>
                <div className='box'>
                <Row>
                    {currentItems.map(x => 
                        <Col sm='6' md='4' xs='6' lg='3'
                        style={{
                            marginTop:20
                        }}>


                        {/* <Flippy
                            flipOnHover={false}
                            flipOnClick={true}
                            flipDirection = 'horizontal'
                            style={{ height: '200px', maxWidth:'300px'}}>
                                <FrontSide className="frontcard">
                                    {x['word']}</FrontSide>
                                <BackSide className='backcard'>
                                    {x['meaning']}</BackSide>
                        </Flippy> */}

                        <ReactCardFlip isFlipped={flipped === x['word']}
                        cardStyles={{"front":{"height" : 200},
                                "back": {"height" : 200}}}
                            flipDirection='horizontal'>
                            <div onClick={() => {
                                setFlipped(x['word']);
                            }}
                            className="frontcard"
                            >
                                <div classname='eachcard'>
                                <p >{x['word'].charAt(0).toUpperCase() + x['word'].slice(1)}</p>
                                </div>
                            </div>
                            <div onClick={() => {
                                setFlipped('xyz');
                            }}
                            className="backcard"
                            >
                                <div classname='eachcard'>
                                <p >{x['meaning']}</p>
                                {x['examples'][0] ? <Button
                                onClick={(e) => {
                                    setModalWord(x['word'].charAt(0).toUpperCase() + x['word'].slice(1));
                                    setModalExample(x['examples']);
                                    setModalShow(true);
                                    console.log(modalExample)
                                }}
                                variant='info'>+</Button> : null}
                                
                                </div>
                            </div>
                        </ReactCardFlip>
                        </Col>
                    )}
                </Row>
                </div>

                <hr />
                <div style={{marginTop:30, 
                display: 'block',
                marginBottom: 30
                }}>
                <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< prev"
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                />
                </div>
            </Container>
        </div>

        <ExampleModal 
        show = {modalShow}
        word={modalWord}
        examples={modalExample}
        onHide = {() => setModalShow(false)}/>
        </>
    )
}

export default Home;