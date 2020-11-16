import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
 import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import "./AddBus.css";
import validateBus from '../Validation/Bus';
import moment from 'moment';
import {registerBus} from '../../redux/actions/Action'; 

class AddBus extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        plates:"",
        routes:"",
        departureTime:"",
        leavingTime:"",
        arrivalTime:"",
        aTime:"",
        price:"",
        errors:{}
    };
  }
  onChange=(e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
 
componentWillReceiveProps(nextProps) {
    if (nextProps.bus.isRegistered){
        this.props.history.push("/dashboard")
    }
    if(nextProps.bus.errors){
        this.setState({errors:nextProps.bus.errorMessage})
      }
}
 onSubmit= (e)=>{
    e.preventDefault();
    const Details={
        plates:this.state.plates,
        routes:this.state.routes,
        price:this.state.price,
        departureTime:moment(this.state.departureTime +" "+ this.state.leavingTime).format(),
        arrivalTime:moment(this.state.arrivalTime +" "+ this.state.aTime).format(),
        
    }
    
    const{errors,isValid}=validateBus(Details)
    if(!isValid){
        this.setState({
            errors:errors
        })
        
    }
     if(isValid){
        this.props.registerBus(Details);
    }
    
}
 
renderForm(){
    const {errors}=this.state;
   return(
        <Form  onSubmit={this.onSubmit.bind(this)}>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Plates</Form.Label>
          <Form.Control 
      
          type="text" 
          isInvalid={!!errors.plates}
          id="plates"
          value={this.state.plates}
          onChange={this.onChange}
          placeholder="Enter Bus Plates" 
      
          required
          />
         <Form.Control.Feedback type="invalid" tooltip>
                        {errors.plates}
                      </Form.Control.Feedback>
          </Col>
        </Form.Group>
        
        
      
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Routes</Form.Label>
          <Form.Control 
          type="text" 
          id="routes"
          isInvalid={!!errors.routes}
          value={this.state.routes}
          onChange={this.onChange}
          placeholder="Current_Location - Destination" 
          required 
          />
          <Form.Control.Feedback type="invalid" tooltip>
                        {errors.routes}
                      </Form.Control.Feedback>
        </Col>
          
        </Form.Group>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Price</Form.Label>
          <Form.Control 
          type="text" 
          id="price"
          isInvalid={!!errors.price}
          value={this.state.price}
          onChange={this.onChange}
          placeholder="Enter Price in USD" 
          required 
          />
          <Form.Control.Feedback type="invalid" tooltip>
                        {errors.price}
                      </Form.Control.Feedback>
      
        </Col>
          
        </Form.Group>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Departure Date</Form.Label>
          <Form.Control 
          type="date" 
          id="departureTime"
          isInvalid={!!errors.departureTime}
          value={this.state.departureTime}
          onChange={this.onChange}
          required  />
        <Form.Control.Feedback type="invalid" tooltip>
                        {errors.departureTime}
                      </Form.Control.Feedback>
        </Col>
          
        </Form.Group>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Time for Leaving</Form.Label>
          <Form.Control 
          type="time" 
          id="leavingTime"
          isInvalid={!!errors.departureTime}
          value={this.state.leavingTime}
          onChange={this.onChange}
          placeholder="County of Residence"
          required  />
        <Form.Control.Feedback type="invalid" tooltip>
             {errors.departureTime}
                      </Form.Control.Feedback>
        </Col>
        </Form.Group>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Arrival Date</Form.Label>
          <Form.Control 
          type="date" 
          id="arrivalTime"
          isInvalid={!!errors.arrivalTime}
          value={this.state.arrivalTime}
          onChange={this.onChange}
          placeholder="County of Residence"
          required  />
        <Form.Control.Feedback type="invalid" tooltip>
                        {errors.arrivalTime}
                      </Form.Control.Feedback>
        </Col>
        </Form.Group>
        <Form.Group className="row">
        <Col  md={{ span: 6, offset: 3 }}>
        <Form.Label>Arrival Time</Form.Label>
          <Form.Control 
          type="time" 
          id="aTime"
          isInvalid={!!errors.arrivalTime}
          value={this.state.aTime}
          onChange={this.onChange}
          placeholder="County of Residence"
          required  />
        <Form.Control.Feedback type="invalid" tooltip>
                        {errors.arrivalTime}
                      </Form.Control.Feedback>
        </Col>
        </Form.Group>
        <Button variant="primary" size="lg" type="submit">
          Submit
        </Button>
      </Form>
   )
   }
  render() {
    return (
        <div className="bus">
        <Container>
        <Row>
         <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <p style={{fontColor:"black"}}>  <Link to="/dashboard" >
        <Icon.ArrowLeft size={60} color="black"/> Back to Dashboard
                </Link></p>
                  <h4>
                    <b>Register</b> Bus
                  </h4>
                
                </div>
                
        </Row>
           <Container>
           {this.renderForm()}
        </Container>
        
        </Container>
        </div>
    );
  }
}
AddBus.propTypes = {
    registerBus:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    bus:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ 
    auth:state.auth,
    bus:state.bus,
    });
  
  const mapDispatchToProps = { 
      registerBus
  };
export default connect(mapStateToProps, mapDispatchToProps)(AddBus)

