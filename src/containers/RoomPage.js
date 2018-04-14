import React from 'react'
import MediaContainer from './MediaContainer'
import CommunicationContainer from './CommunicationContainer'
import { connect } from 'react-redux'
import store from '../store'
import io from 'socket.io-client'
import { Offline, Online } from 'react-detect-offline';

class RoomPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getUserMedia = navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).catch(e => alert('getUserMedia() error: ' + e.name))
  socket = io.connect()
  componentWillMount() {
    this.props.addRoom();
  }
  render(){
    return (
      <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li><a href="#"><span className="avatar"><img src="/assets/img/user.png" /></span>&nbsp;<strong>Nombre</strong></a></li>
              <li><a href="#" id="sidemenuBtn"><span><img src="/assets/img/moreIcon.png" /></span></a></li>
              <li style={{paddingTop: 8}}><a href="#"><i className="fa fa-circle" />&nbsp;<strong style={{fontSize: 16}}><Online>Online</Online><Offline>Offline</Offline></strong></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="/assets/img/settings.png" />{/* <span class="caret"></span>*/}</a>
                <ul className="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider" />
                  <li className="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
              <li><a href="#"><img src="/assets/img/logIcon.png" /></a></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container-fluid main-panel">
        <div className="sidebar pull-left in" style={{display: 'none'}}>
          <ul className="ullist">
            <li><a className="active"><img src="/assets/img/create-room-a.png" /><span>Create Room</span></a></li>
            <li><a><img src="/assets/img/meeting.png" /><span>Room List</span></a></li>
          </ul>
        </div>
        <div className="content-area in">  
          <div className="row">
            <div className="card-wizard" style={{overflow: 'hidden'}}>            
              <div className="panel panel-default " style={{background: 'transparent'}}>
                <div className="panel-body" style={{padding: 0}}>
                  <div className="panel-container card-wizard">
                  <div>
                    <MediaContainer media={media => this.media = media} socket={this.socket} getUserMedia={this.getUserMedia} />
                    <CommunicationContainer socket={this.socket} media={this.media} getUserMedia={this.getUserMedia} />
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">                                  
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
