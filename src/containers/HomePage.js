import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/Home'
import store from '../store'
import { Offline, Online } from 'react-detect-offline';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    value: new Date() - new Date().setHours(0, 0, 0, 0)
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  setRoom = () => this.setState({value: new Date() - new Date().setHours(0, 0, 0, 0)})
  joinRoom = e => {
    e.preventDefault();
    this.context.router.push('r/' + this.state.value);
  }
  handleChange = e => this.setState({value: e.target.value})
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
              <li><a href="#"><span className="avatar"><img src="assets/img/user.png" /></span>&nbsp;<strong>Nombre</strong></a></li>
              <li><a href="#" id="sidemenuBtn"><span><img src="assets/img/moreIcon.png" /></span></a></li>
              <li style={{paddingTop: 8}}><a href="#"><i className="fa fa-circle" />&nbsp;<strong style={{fontSize: 16}}>Online</strong></a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="assets/img/settings.png" /></a>
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
              <li><a href="#"><img src="assets/img/logIcon.png" /></a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid main-panel">
        <div className="sidebar pull-left">
          <ul className="ullist">
            <li><a className="active"><img src="assets/img/create-room-a.png" /><span>Create Room</span></a></li>
            <li><a><img src="assets/img/meeting.png" /><span>Room List</span></a></li>
          </ul>
        </div>
        <div className="content-area">
          <div className="row">
            <div className="col-md-12">            
              <div className="panel panel-default">
                <div className="panel-body">
                  <ul className="list-inline panel-actions">
                    <li><a href="javascript:void(0);" id="panelFullScreen" role="button" title="Toggle fullscreen"><i className="fa fa fa-expand" /></a></li>
                  </ul>
                  <div className="row">
                    <div className="col-md-6">
                      <video autoPlay="true" id="videoElement" />
                    </div>
                    <div className="col-md-6">
                      <div className="col-md-8 ">
                      <Home
                        roomId={this.state.value}
                        handleChange={this.handleChange}
                        joinRoom={this.joinRoom}
                        setRoom={this.setRoom}
                        rooms={this.props.rooms}
                        ></Home>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <img src="assets/img/prc-logo.png" className="img-responsive pull-right" style={{margin: '0 auto', width: 100}} />
      </footer>
    </div>
   </div>
    );
  }
}
const mapStateToProps = store => ({rooms: new Set([...store.rooms])});
export default connect(mapStateToProps)(HomePage);