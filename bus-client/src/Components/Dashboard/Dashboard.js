import React, { Component } from 'react';
import Datatable from 'react-bs-datatable';
import './Dashboard.css';
import { css } from 'emotion';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {getAllBuses} from '../../redux/actions/Action';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

class Dashboard extends Component {
componentDidMount=()=>{
    this.props.getAllBuses();
}
redirect=()=>{
  this.props.history.push("/create-bus")
}
onRow =(bid)=>{
 const uid=this.props.auth.user.id
 this.props.history.push(`/booking/${uid}/${bid}`)
}
renderButton(){
  return(
    <div className="button">
       <Button 
       variant="dark" 
       size="lg"
       onClick={()=>this.redirect()}
       >
         Add Bus
       </Button>
    </div>
    
  )
}
renderTable =()=>{
   if(this.props.bus.isRetrieved){
    const columns=[
        {
         title: 'Id',
         prop: 'Id',
         sortable: true,
         filterable: true
         
        },
        {
          title: 'Plates',
          prop: 'Plates',
          sortable: true,
          filterable: true
         
        },
        {
          title: 'Routes',
          prop: 'Routes',
          sortable: true,
          filterable: true
          
        },
        {
         title: 'DepartureTime',
          prop: 'DepartureTime',
          sortable: true,
          filterable: true
          
        },
        {
          title: 'ArrivalTime',
         prop: 'ArrivalTime',
         sortable: true,
      filterable: true
        },
       
      ];
      const data = this.props.bus.bus.map((bus) => {
        return{
            Id:bus.id,
            Plates:bus.plates,
            Routes:bus.routes,
            DepartureTime:moment(bus.departureTime).format('MMMM Do YYYY, h:mm:ss a'),
            ArrivalTime:moment(bus.arrivalTime).format('MMMM Do YYYY, h:mm:ss a')
        }
      
    });
      const customLabels = {
        first: '<<',
        last: '>>',
        prev: '<',
        next: '>',
        show: 'Display',
        entries: 'rows',
        noResults: 'There is no data to be displayed'
      };
      const classes = {
        table: 'table-striped table-hover',
        theadCol: css`
          .table-datatable__root & {
            &.sortable:hover {
              background:blue;
            }
          }
        `,
        tbodyRow: css`
          &:nth-of-type(even) {
            background: #eaeaea;
          }
        `,
        paginationOptsFormText: css`
          &:first-of-type {
            margin-right: 8px;
          }
          &:last-of-type {
            margin-left: 8px;
          }
        `
      };
          return(
         <div className="dashboardTable">
        <Datatable
            tableHeaders={columns}
            tableBody={data}
            rowsPerPage={5}
           rowsPerPageOption={[5, 10, 15, 20]}
           initialSort={{ prop: 'Id', isAscending: true }}
           labels={customLabels}
           classes={classes}
           onRowClick={(row) => {this.onRow(row.Id)}} 

          />
          </div>
          )
      }
      else{
          return(
            <div class="lds-dual-ring"></div>
          )
      }
}
render() {
    return (
      <div className="dashboard">
       <h4 className="heading">BUS SCHEDULES</h4>
       {this.renderButton()}
       <div>
           {this.renderTable()}
       </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
    getAllBuses:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    bus:PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ 
    auth:state.auth,
    bus:state.bus,
    });
  
  const mapDispatchToProps = { 
      getAllBuses
  };
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

