import React from 'react'
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import store from '../store'
import io from 'socket.io-client'
import { Offline, Online } from 'react-detect-offline';
import $ from 'jquery'
import API_CONSTANT_MAP from '../components/apiMap'

class RoomPage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    roomId: JSON.parse(localStorage.getItem('PRCUser_RoomId'))
  }
  
  getUserMedia = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).catch(e => alert('getUserMedia() error: ' + e.name))

  socket = io.connect()

  componentWillMount() {
    this.props.addRoom();
    
    $.ajax({  
      url: API_CONSTANT_MAP.getroomlistbyname + JSON.parse(localStorage.getItem('PRCUser_RoomId')),  
      type: "GET",  
      dataType: 'json',  
      ContentType: 'application/json',  
      success: function(data) {
        var roomListData = data;
        if(roomListData != null || roomListData !="" || roomListData != undefined || roomListData.length > 0)
        {
          if(roomListData[0].Status == "Active" && roomListData[0].IsActive)
          {
            console.log("Room is active now..");             
          }
          else
          {
            alert("Invalid room/room is inactive..");
          }
        } 
        else
          {
            alert("Invalid room/room is inactive..");
            localStorage.clear('PRCUser_Token');
            localStorage.clear('PRCUser_User');
            localStorage.clear('PRCUser_RoomId');
            localStorage.clear('PRCUser_Record');
            this.context.router.push('/');
          }          
      }.bind(this),  
      error: function(jqXHR) {  
        console.log(jqXHR);     
        localStorage.clear('PRCUser_Token');
        localStorage.clear('PRCUser_User');
        localStorage.clear('PRCUser_RoomId');
        localStorage.clear('PRCUser_Record');
        this.context.router.push('/');          
      }.bind(this)  
    }); 
    
  }
  render(){
    return (   
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">            
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className='cursor-indication'><a><span className="proName"><strong>Room Id: {this.state.roomId}</strong></span></a></li>
              <li className='cursor-indication'><a href="#"><i className="fa fa-circle" />&nbsp;<strong style={{fontSize: 16}}><Online>Online</Online><Offline>Offline</Offline></strong></a></li>
            </ul>            
          </div>
        </div>
      </nav>
      <div className="container-fluid main-panel">        
        <div className="content-area in">  
          <div className="row">
            <div>
                <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
                <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
             </div>
          </div>
        </div>
      </div> 
      </div>
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
const mapDispatchToProps = (dispatch, ownProps) => (
    {
      addRoom: () => store.dispatch({type: 'ADD_ROOM', room: ownProps.params.room})
    }
  );
export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
