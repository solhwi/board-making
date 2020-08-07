import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }
    handleClickOpen = () => {
        //바인딩 처리를 하는 함수의 형태???
        this.setState({
          open: true  
        });
    }

    handleClickClose = () => {
        this.setState({
            open: false // dialog가 열려있는 지의 여부
        })
    } 


    deleteCustomer(id) {
        const url = '/api/writings/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        return(
        <div>
            <Button variant ="contained"
                color="pink"
                onClick={this.handleClickOpen}
                >게시글 삭제
            </Button>

            <Dialog open = {this.state.open}>
            <DialogTitle onClose={this.handleClose}>Warning</DialogTitle>
               
            <DialogContent>
                <Typography>해당 글이 삭제됩니다.</Typography><br/>
                <DialogActions>
                        <Button 
                            variant="contained" color="primary"
                            onClick={(e) => 
                            {this.deleteCustomer(this.props.id)}}
                        >
                        삭제
                        </Button>
                        <Button 
                            variant="outlined" color="primary"
                            onClick={this.handleClickClose}
                        >
                        닫기
                        </Button>
                    </DialogActions>
            </DialogContent>
            </Dialog>
        </div>
            
        )
    }
}

export default CustomerDelete;