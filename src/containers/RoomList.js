import React from 'react'
import { connect } from 'react-redux'
import { Offline, Online } from 'react-detect-offline';
import $ from 'jquery'
import RoomsTable from '../components/RoomsTable'
import store from '../store'

export default class RoomList extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    value: new Date() - new Date().setHours(0, 0, 0, 0),
    username: JSON.parse(localStorage.getItem('PRCUser_User'))    
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

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
      this.context.router.push('/home');
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
              <li className='cursor-indication'><a  onClick={this.handleLeftNavClick.bind(this)}><img src="assets/img/create-room.png" /><span>Create Room</span></a></li>
              <li className='cursor-indication'><a className="active"><img src="assets/img/meeting-a.png" /><span>Room List</span></a></li>
            </ul>
          </div>
          
         <div className="content-area">  
          <div className="row">
            <div className="col-md-12">            
              <div className="panel panel-default">
                <div className="panel-heading style-title">
                  <h3 className="panel-title">Rooms List</h3>                  
                  <div className="clearfix" />
                </div>
                <div className="panel-body">
                  <RoomsTable />
                </div>
                <div className="panel-footer">
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
