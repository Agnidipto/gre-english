import React, {useState, useEffect} from 'react';
import {Button, Modal} from 'react-bootstrap';

function ExampleModal(props) {


    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.word}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ul>
                {props.examples.map( (e,index) => {
                    return <li key={index}>{e}</li>
                })}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor: "#6c7ac9"}} onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
export default ExampleModal;