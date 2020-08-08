import React, {Component} from 'react'; // {component}가 있어야 extends Component 가능
import './App.css';
import Writing from './components/writing';
import WritingAdd from './components/writingAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  
  menu: {
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent: 'center'
  
  },
  tableHead: {
  
    fontSize: '1.0rem'
  },
  
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  progress:{
    margin: theme.spacing.unit*2
  }
  
})


 class App extends Component{

  constructor(props){
    super(props);
    
    this.state = {
      writings: '', 
      completed: 0 //for progress
    }
  }

  stateRefresh = () => {
    this.setState({
      writings: '',
      completed: 0
    });
    this.callApi()
    .then (res => this.setState({customers: res}))
    .catch(err => console.log(err));

  }


  progress = () => {
    const {completed} = this.state;
    this.setState( {completed: completed >= 100 ? 0 : completed+1})
  }

  componentDidMount(){
    this.timer = setInterval(this.progress,20); 
    // 0.02초마다 this.progress함수가실행됨
    this.callApi()
      .then (res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    console.log(response)
    const body = await response.json();
    console.log(body);
    return body;
  }

 
  render(){

    const {classes} = this.props;
    const cellList = ["번호", "제목", "작성자", "미리보기", "작성일", "설정"];
    return (
      <div className={classes.root}>
           <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon/>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            솔휘님의 방명록
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar> 
      {/* 상위 app-bar  */}


      <div className={classes.menu}>
      <WritingAdd
         stateRefresh={this.stateRefresh} 
      />        
      </div>
               
        <Paper className={classes.paper}>
            <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {cellList.map( c => {
                  return <TableCell className={classes.tableHead}>
                    {c}
                  </TableCell>
                })}
              </TableRow>
            </TableHead>
            <TableBody>
            {this.state.writings && typeof this.state.writings === 'object' 
            ? this.state.customers.map( c => {
                return( 
                <Writing
                  stateRefresh= {this.stateRefresh}
                  key={c.id}
                  id={c.id}
                  image={c.image}
                  write={c.write}
                  name={c.name}
                  day={c.day}
                />);})
              : <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress
                      className= {classes.progress} 
                      variant="determinate" 
                      value={this.state.completed}
                    />
                  </TableCell>
                </TableRow>}
            </TableBody>
         </Table>
        </Paper>
        
        
      </div>       
    );
  } 
  
}

export default withStyles(styles)(App);
