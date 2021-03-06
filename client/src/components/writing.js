import React, {Component} from 'react';
import WritingDelete from './writingDelete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class Writing extends Component{
    render(){
      return(
            <TableRow>
                <TableCell>{this.props.id}</TableCell> 
                <TableCell><img src ={this.props.image}/></TableCell>
                <TableCell>{this.props.title}</TableCell>  
                <TableCell>{this.props.userName}</TableCell> 
                <TableCell>{this.props.day}</TableCell> 
                <TableCell>
                <WritingDelete 
                    stateRefresh={this.props.stateRefresh}
                    id={this.props.id}
                />
                </TableCell>
            </TableRow>
        );
    }
}

// this는 해당 Component를 뜻함 Component의 props가 가진 name
export default Writing;