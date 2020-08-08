import React, {Component} from 'react';
import {post} from 'axios'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// post방식으로 서버로 데이터를 보낼 수 있도록 도와주는 library


const styles = theme => ({
    hidden: {
        display: 'none'
    }
})

class WritingAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null, //프사
            fileName:'',
            title: '',
            context:'',
            userName: '',
            day:'',
            open: false // dialog가 열려있는 지의 여부
        }
    }

    handleClickOpen = () => {
        //바인딩 처리를 하는 함수의 형태??
        this.setState({
          open: true  
        });
    }

    handleClickClose = () => {
        this.setState({
            file: null, //프사
            fileName:'',
            title: '',
            context:'',
            userName: '',
            day:'',
            open: false // dialog가 열려있는 지의 여부
        })
    } 

    addWriting = () => {
        const url = '/api/writings';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('title', this.state.title)
        formData.append('context', this.state.context)
        formData.append('userName', this.state.userName)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }   //데이터에 헤더를 달며 정보

        return post(url, formData, config);

    } //데이터 전송 코드


    handleFormSubmit = (e) => {
        e.preventDefault() //오류없게 전달되도록 부르는 함수 
        this.addWriting()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
                //props로 전달받은 stateRefresh 사용
            })
        
            this.setState({
                file: null, //프사
                fileName:'',
                title: '',
                context:'',
                userName: '',
                day:''
            })
            
    }

    handleFileChange = (e) => {
        //e는 이벤트 변수, 이벤트가 발생한 것.
        //e.target이면 그 이벤트가 발생한 객체 
        this.setState({
            file: e.target.files[0],
            //첫번째 파일만 인식 하나만 보내겠음!!
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {}
        nextState[e.target.name] = e.target.value
        this.setState(nextState)
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Button variant ="contained"
                color="primary"
                onClick={this.handleClickOpen}
                >방명록 쓰기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>방명록을 남겨주세요.</DialogTitle>
                    <DialogContent>
                        
                        <input className={classes.hidden} 
                        accept="image/" id="raised-button-file"
                        type="file" file={this.state.file}
                        value={this.state.fileName}
                        onChange={this.handleFileChange}
                        ></input>


                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "사진 첨부" : this.state.fileName}
                            </Button>
                        </label><br/><br/>


                        <TextField
                          label="제목" type="text" name="title" 
                         value={this.state.title}
                         onChange={this.handleValueChange}
                        ></TextField><br/>

                        <TextField
                          label="내용" type="longtext" name="context" 
                         value={this.state.context}
                         onChange={this.handleValueChange}
                        ></TextField><br/>

                        <TextField
                          label="작성자명" type="text" name="userName" 
                         value={this.state.userName}
                         onChange={this.handleValueChange}
                        ></TextField><br/>
                        
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            variant="contained" color="primary"
                            onClick={this.handleFormSubmit}
                        >
                        작성 완료
                        </Button>
                        <Button 
                            variant="outlined" color="primary"
                            onClick={this.handleClickClose}
                        >
                        닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(WritingAdd);