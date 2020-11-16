import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { getSpecificBus, getSpecificUser,proceedToPayment } from '../../redux/actions/Action';
import './Booking.css';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Booking extends Component {
  
componentDidMount() {
    const uid=this.props.match.params.uid;
    const bid=this.props.match.params.bid;
    this.props.getSpecificUser(uid);
    this.props.getSpecificBus(bid);
}

renderProgress(){
    if( this.props.bus.busDetails.passengers.length <=10 &&this.props.bus.busDetails.passengers.length>=0 ){
        return ( 
            <div className="pgbar">
                
                <ProgressBar animated now={10} label={`${10}%`}/>
            </div>
           
           ) 
    }
    if( this.props.bus.busDetails.passengers.length >10 &&this.props.bus.busDetails.passengers.length<=25 ){
        return ( 
            <div className="pgbar">
                
                <ProgressBar animated now={40} label={`${40}%`}/>
            </div>
           
           ) 
    }
    if( this.props.bus.busDetails.passengers.length >25 &&this.props.bus.busDetails.passengers.length<=40 ){
        return ( 
            <div className="pgbar">
                
                <ProgressBar animated now={80} label={`${80}%`}/>
            </div>
           
           ) 
    }
    if( this.props.bus.busDetails.passengers.length >40 &&this.props.bus.busDetails.passengers.length<=49){
        return ( 
            <div className="pgbar">
                
                <ProgressBar animated now={95} label={`${95}%`}/>
            </div>
           
           ) 
    }
    if( this.props.bus.busDetails.passengers.length ===50 ){
        return ( 
            <div className="pgbar">
                
                <ProgressBar animated now={10} label={`${10}%`}/>
            </div>
           
           ) 
    }
}
renderClosingTime(){
var then =(this.props.bus.busDetails.departureTime);
if(moment().format()<=moment(this.props.bus.busDetails.departureTime).format() ){
    return(
        <p>Closes in {moment().to(then)}</p>
    )
}
else{
    return(
        <p>Closed  {moment(this.props.bus.busDetails.departureTime).fromNow()}</p>
    )
}
}
renderCard(){
   if(this.props.bus.isAcquired &&this.props.auth.isAcquired){
    return(
        <Card className="text-center" style={{ width: '68rem' }}>
    <Card.Header> <h2 className="Bhead">BOOK YOUR BUS</h2></Card.Header>
    <Card.Body>
      <Card.Title><h6 className="cardT">PLATES</h6></Card.Title>
      <Card.Text>
      {this.props.bus.busDetails.plates}
      </Card.Text>
      <Card.Title> <h6 className="cardT">ROUTES</h6></Card.Title>
      <Card.Text>
       <p className="simpleT">{this.props.bus.busDetails.routes}</p> 
      </Card.Text>
      <Card.Title> <h6 className="cardT">PRICE</h6></Card.Title>
      <Card.Text>
      {this.props.bus.busDetails.price} USD
      </Card.Text>
      <Card.Title><h6 className="cardT">CURRENT CAPACITY</h6></Card.Title>
      <Card.Text>
        {this.renderProgress()}
      </Card.Text>
      <Card.Title><h6 className="cardT">DEPARTURE TIME</h6></Card.Title>
      <Card.Text>
      {moment(this.props.bus.busDetails.departureTime).format('MMMM Do YYYY, h:mm:ss a')}
      </Card.Text>
      <Card.Title><h6 className="cardT">ARRIVAL TIME</h6></Card.Title>
      <Card.Text>
      {moment(this.props.bus.busDetails.arrivalTime).format('MMMM Do YYYY, h:mm:ss a')}
      </Card.Text>
      {this.renderButton()}
    </Card.Body>
    <Card.Footer className="text-muted">{this.renderClosingTime()}</Card.Footer>
  </Card>
    )
   }
   
    
}
renderButton(){
 if(this.props.auth.userDetails.booked || this.props.bus.busDetails.passengers.length ===50 || moment().format()>=moment(this.props.bus.busDetails.departureTime).format() ){
     return(
        <Button variant="primary">Oops</Button>
     );
 }
 else{
     return(
        <Button 
        variant="primary"
        onClick={()=>{this.props.proceedToPayment(this.props.auth.userDetails.id,this.props.bus.busDetails.id)}}  >
            Book Bus
        </Button>
     )
 }
}
  render() {
      if(this.props.auth.isReady){
        
        window.location.assign(this.props.auth.redirectL.link);
      }
      else{
        return (
            <div className="Booking"> 
            <Container>
             
             {this.renderCard()}
            </Container>
            
            
            </div>
          );
      }
    
  }
}
Booking.propTypes = {
    getSpecificUser:PropTypes.func.isRequired,
    getSpecificBus:PropTypes.func.isRequired,
    proceedToPayment:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    bus:PropTypes.object.isRequired,

};
const mapStateToProps = state => ({ 
    auth:state.auth,
    bus:state.bus,
    });
  
const mapDispatchToProps = { 
    getSpecificUser,getSpecificBus,proceedToPayment
  };
export default connect(mapStateToProps, mapDispatchToProps)(Booking)

