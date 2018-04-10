import React from 'react'
import { Link } from 'react-router'
import { Offline, Online } from 'react-detect-offline';

const Home = props =>
  <div className="home">
    <div>
    <Offline><p>You are offline...</p></Offline>
      <h1 itemProp="headline">Erdster :: Video Calling :: Room Creation</h1>
      <p>Please enter a room name.</p>
      <form onSubmit={props.joinRoom}>
        <input type="text" name="room" value={props.roomId} onChange={props.handleChange} pattern="^\w+$" maxLength="10" required autoFocus title="Room name should only contain letters or numbers."/>
        <Online><button className="primary-button" type="submit">Join</button></Online>        
      </form>      
    </div>
  </div>;
Home.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  joinRoom: React.PropTypes.func.isRequired,
  setRoom: React.PropTypes.func.isRequired,
  roomId: React.PropTypes.string.isRequired,
  rooms: React.PropTypes.object.isRequired
};
export default Home;
