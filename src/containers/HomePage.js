import React from 'react'
import { connect } from 'react-redux'
import { Offline, Online } from 'react-detect-offline';
import $ from 'jquery'
import Home from '../components/Home'
import store from '../store'
import API_CONSTANT_MAP from '../components/apiMap'
import SmartAlert from 'react-bootstrap-sweetalert';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: new Date() - new Date().setHours(0, 0, 0, 0),
    username: JSON.parse(localStorage.getItem('PRCUser_User')),
    popup: false,
    popupMessage: null,
    popupWarn: false,
    popupWarnMessage: null
  }
  static contextTypes = {
    router: React.PropTypes.object
  }

  getInitialState = () => {  
    return { RoomId: '',RoomUrl:'',RoomName: '',StorageURL:'',AssignedTo:'',CreatedBy:'', UpdatedBy:'',data1: []};  
  }
  
  setRoom = () => this.setState({value: new Date() - new Date().setHours(0, 0, 0, 0)})

  joinRoom = e => {
    e.preventDefault();
    localStorage.setItem('PRCUser_RoomId', JSON.stringify(this.state.value));
    
    var room = null;
    $.ajax({  
      url: API_CONSTANT_MAP.getroomlistbyname + this.state.value,  
      type: "GET",  
      dataType: 'json',  
      ContentType: 'application/json',  
      success: function(data) {        
        room = data;
        console.log("room id:" + room);
        if(room === null || room ==="" || room === undefined || room.length == 0)
        {
          var roomList = {  
            'RoomId': this.state.value,  
            'RoomName': this.state.value,
            'RoomUrl': window.location.origin + '/r/' + this.state.value,
            'Status': 'InActive',
            'StorageURL':"",  
            'AssignedTo':"",  
            'CreatedBy':JSON.parse(localStorage.getItem('PRCUser_User')),  
            'UpdatedBy':"",
            'IsActive' : true,
            'IsDeleted': false
          }

          $.ajax({  
            url: API_CONSTANT_MAP.saveroomlist,  
            dataType: 'json',  
            type: 'POST',  
            data: roomList,  
            success: function(data) {
                console.log("roomlist created..")
                this.setState(this.getInitialState()); 
                this.setState({ popup: true });
                this.setState({ popupMessage: "Room has been created, please go to room list and activate the room!" });
            }.bind(this),  
            error: function(xhr, status, err) {  
              console.log(err);
            }.bind(this)  
          });     
        }
        else
        {
          this.setState({ popupWarn: true });
          this.setState({ popupWarnMessage: "Room Id is already exists!" });
        }        
      }.bind(this),  
      error: function(jqXHR) {  
        console.log(jqXHR);               
      }.bind(this)  
    });     
  }

  onPopConfirm = () =>{
    this.setState({ popup: false });
    this.setState({ popupMessage: null });
  }

  onPopWarnConfirm = () =>{
    this.setState({ popupWarn: false });
    this.setState({ popupWarnMessage: null });
  }

  handleChange = e => this.setState({value: e.target.value})

  handleLogoutClick = e => {
    e.preventDefault();
    localStorage.clear('PRCUser_Token');
    localStorage.clear('PRCUser_User');
    localStorage.clear('PRCUser_RoomId');
    localStorage.clear('PRCUser_Record');
    this.context.router.push('/');
  }

  handleLeftNavClick = e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('PRCUser_Token'));
    if (!user) {
      this.context.router.push('/');
    }
    else{
      this.context.router.push('/roomlist');
    } 
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('PRCUser_Token'));
    if (!user) {
      this.context.router.push('/');
    } 
  }
  
  componentDidMount() {

    document.body.className="bodyOverrideBack";

    $("a#sidemenuBtn").click(function() {
        $('div.sidebar').toggle('slow');
        $('div.sidebar').toggleClass('in');
        $('div.content-area').toggleClass('in');

    });

    $("#panelFullScreen").click(function() {
        if ($(this).children('i').hasClass('fa-expand')) {
            $(this).children('i').removeClass('fa-expand');
            $(this).children('i').addClass('fa-compress');
        } else if ($(this).children('i').hasClass('fa-compress')) {
            $(this).children('i').removeClass('fa-compress');
            $(this).children('i').addClass('fa-expand');
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
    });

    function checkWidth() {
      if ($(window).width() < 768) {
          $('div.sidebar').addClass('in');
          $('div.content-area').addClass('in');
          $('div.sidebar').css('display','none');
          
      } else {
          $('div.sidebar').removeClass('in');
          $('div.content-area').removeClass('in');
          $('div.sidebar').css('display','block');
      }
    }

    setHeight();

    $(window).resize(function() {
      checkWidth();      
    });

    function setHeight() {      
      var windowHeight = $(window).innerHeight();
      $('.card-wizard').css('height', windowHeight - 180);
    };

    $(".card-wizard").scroll();
  }

  render(){
    return (
      <div>
        <SmartAlert show={this.state.popup} success title={this.state.popupMessage} onConfirm={this.onPopConfirm} />
        <SmartAlert show={this.state.popupWarn} warning title={this.state.popupWarnMessage} onConfirm={this.onPopWarnConfirm} />
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div id="navbar" className="navbar-collapse ">
              <ul className="nav navbar-nav">
                <li className='cursor-indication'><a><span className="avatar"><img src="assets/img/user.png" /></span>&nbsp;&nbsp;<span className="proName"><strong>{this.state.username}</strong></span></a></li>                
                <li className='cursor-indication'><a id="sidemenuBtn"><span><img src="assets/img/scv-img/menu.svg" width={28} /></span></a></li>
                <li className='cursor-indication' style={{paddingTop: 8}}><a ><i className="fa fa-circle" />&nbsp;<strong style={{fontSize: 16}}><Online>Online</Online><Offline>Offline</Offline></strong></a></li>                
              </ul>
              <ul className="nav navbar-nav navbar-right">                
                <li className='cursor-indication'><a onClick={this.handleLogoutClick.bind(this)}><img src="assets/img/scv-img/logout.svg" width={28} /></a></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid main-panel">
          <div className="sidebar pull-left">
            <ul className="ullist">
              <li className='cursor-indication'><a  className="active"><img src="assets/img/create-room-a.png" /><span>Create Room</span></a></li>
              <li className='cursor-indication'><a onClick={this.handleLeftNavClick.bind(this)}><img src="assets/img/meeting.png" /><span>Room List</span></a></li>
            </ul>
          </div>
          <div className="content-area">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-default card-wizard panel-bg">
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-6 col-sm-4 col-xs-4 ">
                          <img src="assets/img/prc-logo.png" className="img-responsive" />
                        </div>
                        <div className="clearfix" />
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-8 col-sm-12 col-xs-12">                          
                              <Home
                              roomId={this.state.value}
                              handleChange={this.handleChange}
                              joinRoom={this.joinRoom}
                              setRoom={this.setRoom}
                              rooms={this.props.rooms}></Home>						  
                          <div className="col-md-6 col-sm-6 col-xs-6 pull-right">
                            <img src="assets/img/erdster-logo.png" className="margin-top-50 pull-right img-responsive" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <img src="assets/img/prc-logo.png" className="img-responsive pull-right footer-img" />
        </footer>
      </div>      
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
export default connect(mapStateToProps)(HomePage);