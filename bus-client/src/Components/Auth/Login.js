import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import validateLogin from '../Validation/Login';
import {loginUser} from '../../redux/actions/Action';
class Login extends Component {
  constructor(props) {
    super(props)
    this.state ={
      email:"",
      password:"",
      errors:{},
    }
    
  }
onChange=(e) => {
    this.setState({
        [e.target.id]:e.target.value
    })
}
onSubmit=(e) => {
  e.preventDefault();
  const Details={
      email:this.state.email,
      password:this.state.password
  }
  const{errors,isValid}=validateLogin(Details)
  if(!isValid){
      this.setState({
          errors:errors
      })

  }
   if(isValid){
     this.props.loginUser(Details);
  }
  
}
componentWillReceiveProps(nextProps) {
  if(nextProps.auth.isAuthenticated){
    this.props.history.push("/dashboard");
  }
  if(nextProps.auth.errors){
    this.setState({errors:nextProps.auth.errorMessage})
  }
}

 renderLogin(){
  const{errors}=this.state;
  return(
    <Form noValidate  onSubmit={this.onSubmit}>
   
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
    
   
    <Button variant="primary" size="lg" type="submit">
      Submit
    </Button>
  </Form>
   )
 }

  render() {
    return (
      <div className="login">
      <div className="col s12" style={{ paddingLeft: "11.250px" }}>
      <p style={{fontColor:"black"}}>  <Link to="/" >
               <Icon.ArrowLeft size={60} color="black"/> Back to
                home
              </Link></p>
                <h4>
                  <b>Login</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Dont have an account? <Link to="/register">Register</Link>
                </p>
              </div>
              <Container>
              {this.renderLogin()}
           </Container>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
};
const mapStateToProps = state => ({ 
  auth:state.auth,
  });

const mapDispatchToProps = { 
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)