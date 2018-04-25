import React from 'react'
import { Link } from 'react-router'
import ToggleFullScreen from './ToggleFullScreen'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Dialog from 'react-dialog'
import '../../node_modules/react-dialog/css/index.css';
import ReactTooltip from 'react-tooltip';

const Communication = props =>
  <div className="auth">
    <div className="media-controls">    
      <button data-tip='Video on/off' data-for='btnvideo' onClick={props.toggleVideo} className={'video-button-' + props.video}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="svg">
          <path className="on" d="M40 8H15.64l8 8H28v4.36l1.13 1.13L36 16v12.36l7.97 7.97L44 36V12c0-2.21-1.79-4-4-4zM4.55 2L2 4.55l4.01 4.01C4.81 9.24 4 10.52 4 12v24c0 2.21 1.79 4 4 4h29.45l4 4L44 41.46 4.55 2zM12 16h1.45L28 30.55V32H12V16z" fill="white"></path>
          <path className="off" d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zm-4 24l-8-6.4V32H12V16h16v6.4l8-6.4v16z" fill="white"></path>
        </svg>
      </button>  
      <button data-tip='Audio on/off' data-for='btnaudio' onClick={props.toggleAudio} className={'audio-button-' + props.audio}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="svg">
          <path className="on" d="M38 22h-3.4c0 1.49-.31 2.87-.87 4.1l2.46 2.46C37.33 26.61 38 24.38 38 22zm-8.03.33c0-.11.03-.22.03-.33V10c0-3.32-2.69-6-6-6s-6 2.68-6 6v.37l11.97 11.96zM8.55 6L6 8.55l12.02 12.02v1.44c0 3.31 2.67 6 5.98 6 .45 0 .88-.06 1.3-.15l3.32 3.32c-1.43.66-3 1.03-4.62 1.03-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c1.81-.27 3.53-.9 5.08-1.81L39.45 42 42 39.46 8.55 6z" fill="white"></path>
          <path className="off" d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm10.6-6c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z" fill="white"></path>
        </svg>
      </button>    
      <button data-tip='Record On/off' data-for='btnrecord' onClick={props.toggleRecord} className={'record-button-' + props.record}>
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 426.667 426.667" style={{enableBackground: 'new 0 0 426.667 426.667'}} xmlSpace="preserve" className="svg">
          <path className="on" d="M213.333,0C95.68,0,0,95.68,0,213.333s95.68,213.333,213.333,213.333s213.333-95.68,213.333-213.333S330.987,0,213.333,0
          z M213.333,384c-94.08,0-170.667-76.587-170.667-170.667S119.253,42.667,213.333,42.667S384,119.253,384,213.333
          S307.413,384,213.333,384z" />
          <path className="on" d="M213.333,149.333c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S248.64,149.333,213.333,149.333z" />
          <path className="off" d="M24 28c3.31 0 5.98-2.69 5.98-6L30 10c0-3.32-2.68-6-6-6-3.31 0-6 2.68-6 6v12c0 3.31 2.69 6 6 6zm10.6-6c0 6-5.07 10.2-10.6 10.2-5.52 0-10.6-4.2-10.6-10.2H10c0 6.83 5.44 12.47 12 13.44V42h4v-6.56c6.56-.97 12-6.61 12-13.44h-3.4z" fill="white"></path>
        </svg>
      </button>
      <button data-tip='Hangup' data-for='btnhangup' onClick={props.handleHangup} className="hangup-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="svg">
          <path d="M24 18c-3.21 0-6.3.5-9.2 1.44v6.21c0 .79-.46 1.47-1.12 1.8-1.95.98-3.74 2.23-5.33 3.7-.36.35-.85.57-1.4.57-.55 0-1.05-.22-1.41-.59L.59 26.18c-.37-.37-.59-.87-.59-1.42 0-.55.22-1.05.59-1.42C6.68 17.55 14.93 14 24 14s17.32 3.55 23.41 9.34c.37.36.59.87.59 1.42 0 .55-.22 1.05-.59 1.41l-4.95 4.95c-.36.36-.86.59-1.41.59-.54 0-1.04-.22-1.4-.57-1.59-1.47-3.38-2.72-5.33-3.7-.66-.33-1.12-1.01-1.12-1.8v-6.21C30.3 18.5 27.21 18 24 18z" fill="white"></path>
        </svg>
      </button>
      <button data-tip='Fullscreen on/off' data-for='btnfullscreen' onClick={ToggleFullScreen} className="fullscreen-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="svg">
          <path className="on" d="M10 32h6v6h4V28H10v4zm6-16h-6v4h10V10h-4v6zm12 22h4v-6h6v-4H28v10zm4-22v-6h-4v10h10v-4h-6z" fill="white"></path>
          <path className="off" d="M14 28h-4v10h10v-4h-6v-6zm-4-8h4v-6h6v-4H10v10zm24 14h-6v4h10V28h-4v6zm-6-24v4h6v6h4V10H28z" fill="white"></path>
        </svg>
      </button>     
      <Link data-tip='Exit' data-for='btnexit' className="call-exit-button" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"  className="svg">
          <path d="M30 16.5h-18.26l8.38-8.38-2.12-2.12-12 12 12 12 2.12-2.12-8.38-8.38h18.26v-3z" fill="white"/>
        </svg>
      </Link>
      <ReactTooltip place="top" type="info" effect="float" id="btnvideo"/>
      <ReactTooltip place="top" type="info" effect="float" id="btnaudio"/>
      <ReactTooltip place="top" type="info" effect="float" id="btnrecord"/>
      <ReactTooltip place="top" type="info" effect="float" id="btnhangup"/>
      <ReactTooltip place="top" type="info" effect="float" id="btnfullscreen"/>
      <ReactTooltip place="top" type="info" effect="float" id="btnexit"/>
    </div>
    <form className="request-access">
      <p className="paragraph"><span className="you-left">You hung up.&nbsp;</span></p>
      <form onSubmit={props.send}>        
        &nbsp;&nbsp;<button type="submit" className="btn btn-primary-small login-button">Please click here to start the call</button>
      </form>
    </form>
    <div className="grant-access">
      <p className="paragraph">User has requested to join the call</p>
      <div dangerouslySetInnerHTML={props.getContent(props.message)}></div>      
      <button onClick={props.handleInvitation} data-ref="accept" className="btn btn-primary-small login-button">Click here</button>
    </div>
    <div className="room-occupied">
      <p className="paragraph">Please, try another room!</p>
      <Link  className="primary-button" to="/">OK</Link>
    </div>
    <div className="waiting">
      <p className="paragraph">
      <a style={{ fontSize: '1.5em'}} onClick={props.handleCopyLinkClick}>Invite by Email</a>
          { props.isOpen &&
           <div className="container">
                    <Dialog title="Share the link"
                        modal={true}
                        onClose={props.handleCopyLinkClick}
                        buttons={
                            [{
                                text: "Send Email",
                                onClick: () => props.handleSendEmailClick()
                            },{
                              text: "Close",
                              onClick: () => props.handleCopyLinkClick()
                          }]
                        }>
                        <h4>Enter the interviewee email:</h4>
                        <p><input className="emailText" onChange={props.handleInput} type="text" autoFocus data-ref="toEmail" maxLength="150" required /></p>
                    </Dialog>
            </div>
            }
      <br/>
      <span className="remote-left">The remote side hung up.</span></p>
    </div>    
  </div>

Communication.propTypes = {
  message: React.PropTypes.string.isRequired,
  audio: React.PropTypes.bool.isRequired,
  video: React.PropTypes.bool.isRequired,
  record: React.PropTypes.bool.isRequired,
  toggleVideo: React.PropTypes.func.isRequired,
  toggleAudio: React.PropTypes.func.isRequired,
  toggleRecord: React.PropTypes.func.isRequired,
  getContent: React.PropTypes.func.isRequired,
  send: React.PropTypes.func.isRequired,
  handleHangup: React.PropTypes.func.isRequired,
  handleInput: React.PropTypes.func.isRequired,
  handleInvitation: React.PropTypes.func.isRequired,
  handleCopyLinkClick: React.PropTypes.func.isRequired,
  handleSendEmailClick: React.PropTypes.func.isRequired,
  toEmail: React.PropTypes.string.isRequired
};

export default Communication;
