import React, {Component} from 'react';
import CustomerDelete from './CustomerDelete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Customer extends Component{
    render(){
      return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell> 
                <TableCell><img src ={this.props.image}/></TableCell> 
                <TableCell>{this.props.name}</TableCell> 
                <TableCell>{this.props.birth}</TableCell> 
                <TableCell>{this.props.sex}</TableCell> 
                <TableCell>{this.props.job}</TableCell> 
                <TableCell>
                <CustomerDelete 
                    stateRefresh={this.props.stateRefresh}
                    id={this.props.id}
                />
                </TableCell>
            </TableRow>
        );
    }
}

class CustomerProfile extends Component{
    render(){
        return(
            <div>
                <p>{this.props.id}</p>
                <img src={this.props.image} alt="profile"/>
            </div>
        )
    }
}

class CustomerInfo extends Component{
    render(){
        return(
            <div>
                <p>{this.props.name}</p>
                <p>{this.props.birth}</p>
                <p>{this.props.sex}</p>
                <p>{this.props.job}</p>
            </div>
        )

    }
}
// this는 해당 Component를 뜻함 Component의 props가 가진 name
export default Customer;