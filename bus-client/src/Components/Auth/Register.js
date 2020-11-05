import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { connect } from "react-redux";
import {Link,withRouter} from 'react-router-dom';
 import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import './Auth.css'
import validateRegistration from '../Validation/Register';
import { registerUser } from '../../redux/actions/Action';

class Register extends Component {
  constructor(props) {
    super(props);
     this.state={
         username:"",
         email:"",
         password:"",
         confirmpassword:"",
         county:"",
         city:"",
         errors:{}


     }
  }

  
onChange=(e) => {
  this.setState({
    [e.target.id]: e.target.value
  })
}
onSubmit = (e) => {
    e.preventDefault();
    const Details={
        username:this.state.username,
        email:this.state.email,
        password:this.state.password,
        confirmpassword:this.state.confirmpassword,
        county:this.state.county,
        city:this.state.city,
    }
    const{errors,isValid}=validateRegistration(Details)
    if(!isValid){
        this.setState({
            errors:errors
        })

    }
     if(isValid){
        this.props.registerUser(Details);
    }
    
}
componentWillReceiveProps(nextProps) {
  if(nextProps.auth.isRegistered){
    this.props.history.push("/login");
  }
  if(nextProps.auth.errors){
    this.setState({errors:nextProps.auth.errorMessage})
  }
}

 renderForm(){
  const {errors}=this.state;
   if(this.props.auth.isLoading){
     return(
       <div>Loading..</div>
     )
   }
   else{
    return(
      <Form noValidate  onSubmit={this.onSubmit.bind(this)}>
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>Username</Form.Label>
        <Form.Control 
    
        type="text" 
        isInvalid={!!errors.username}
        id="username"
        value={this.state.username}
        onChange={this.onChange}
        placeholder="Enter Username" 
    
        required
        />
       <Form.Control.Feedback type="invalid" tooltip>
                      {errors.username}
                    </Form.Control.Feedback>
        </Col>
      </Form.Group>
      
      
    
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        id="email"
        isInvalid={!!errors.email}
        value={this.state.email}
        onChange={this.onChange}
        placeholder="Enter a valid email" 
        required 
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
        <Form.Control.Feedback type="invalid" tooltip>
                      {errors.email}
                    </Form.Control.Feedback>
      </Col>
        
      </Form.Group>
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>Password</Form.Label>
        <Form.Control 
        type="password" 
        id="password"
        isInvalid={!!errors.password}
        value={this.state.password}
        onChange={this.onChange}
        placeholder="*****" 
        required 
        />
        <Form.Control.Feedback type="invalid" tooltip>
                      {errors.password}
                    </Form.Control.Feedback>
    
      </Col>
        
      </Form.Group>
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        type="password" 
        id="confirmpassword"
        isInvalid={!!errors.confirmpassword}
        value={this.state.confirmpassword}
        onChange={this.onChange}
        placeholder="****"
        required  />
      <Form.Control.Feedback type="invalid" tooltip>
                      {errors.confirmpassword}
                    </Form.Control.Feedback>
      </Col>
        
      </Form.Group>
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>County</Form.Label>
        <Form.Control 
        type="text" 
        id="county"
        isInvalid={!!errors.county}
        value={this.state.county}
        onChange={this.onChange}
        placeholder="County of Residence"
        required  />
      <Form.Control.Feedback type="invalid" tooltip>
                      {errors.county}
                    </Form.Control.Feedback>
      </Col>
      </Form.Group>
      <Form.Group className="row">
      <Col  md={{ span: 6, offset: 3 }}>
      <Form.Label>City</Form.Label>
        <Form.Control 
        type="text" 
        id="city"
        isInvalid={!!errors.city}
        value={this.state.city}
        onChange={this.onChange}
        placeholder="City"
        required  />
      <Form.Control.Feedback type="invalid" tooltip>
                      {errors.city}
                    </Form.Control.Feedback>
      </Col>
      </Form.Group>
     
      <Button variant="primary" size="lg" type="submit">
        Submit
      </Button>
    </Form>
     )
   }
     }


  render() {
    return (
      <div className="register">
      <Container>
      <Row>
                  
      
         
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      <p style={{fontColor:"black"}}>  <Link to="/" >
      <Icon.ArrowLeft size={60} color="black"/> Back to home
              </Link></p>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
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
Register.propTypes = {
registerUser:PropTypes.func.isRequired,
auth:PropTypes.object.isRequired,
};


const mapStateToProps = state => ({ 
  auth:state.auth,
  });

  const mapDispatchToProps = { 
    registerUser
};
export default connect(mapStateToProps, 
  mapDispatchToProps)
  (withRouter(Register));

