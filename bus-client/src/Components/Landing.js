import React, { Component } from 'react';
import {Navbar,Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import TextLoop from "react-text-loop";
import './Landing.css';

class Landing extends Component {
 
renderNavBar(){
    return(
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQCBKAmdQ50cvh5BWf1qXHZqFAr-6jXeBDGkQ&usqp=CAU"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Bus-App
        </Navbar.Brand>
      </Navbar>
    );
}
renderTextLoop(){
    return(
      <TextLoop>
      <div className="loop">BOOK YOUR RIDE</div>
      <div className="loop">SAVE MONEY</div>
      <div className="loop">ENJOY THE RIDE</div>
      </TextLoop>
    );
}
renderButton(){
  return(
    <div>
    <Button variant="primary" size="lg" active>
    Login
  </Button>{' '}
  <Button variant="primary" size="lg" active>
    Register
  </Button>
    </div>
  
  );
}
    render() {
    return (
      <div className="overlay">
      {this.renderNavBar()}
      <div className="landingBackground">
      
      <Container>
      {this.renderTextLoop()}
      </Container>
      
         </div>
         <div className='authButtons'>
         {this.renderButton()}
         </div> 
      </div>
    );
  }
}
Landing.propTypes = {
};
export default Landing;

