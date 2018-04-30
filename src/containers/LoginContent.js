import React from 'react'
import { connect } from 'react-redux'
import { isNullOrUndefined } from 'util';
import Carousel from 'nuka-carousel'

export default class LoginContent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorDescription: ''
    };
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value
   })
  }

 handlePasswordChange = e => {
  this.setState({
    password: e.target.value
   })
  }

  handleRedirect = e => {
    const errors = {};
    e.preventDefault();
    if(this.state.username === 'admin' && this.state.password === 'admin')
    {
      var ranValue = 1000000;
      const rand =  Math.random() * ranValue;
      var tempToken = rand + '_' + this.state.username;
      localStorage.setItem('PRCUser_Token', JSON.stringify(tempToken));
      localStorage.setItem('PRCUser_User', JSON.stringify(this.state.username));
      localStorage.setItem('PRCUser_Record', JSON.stringify(false));
      this.context.router.push('/home');
    }
    else
    {
      this.setState({
        errorDescription: "Invalid credentials..please try again.."
      })
      
    }
  }

  componentWillMount() {
    localStorage.clear('PRCUser_Token');
    localStorage.clear('PRCUser_User');
    localStorage.clear('PRCUser_RoomId');
    localStorage.clear('PRCUser_Record');
  }

  componentDidMount(){
    document.body.className="bodyOverride";
  }

  render() {
      let errorInfo;
      if (this.state.errorDescription !== isNullOrUndefined) {
        errorInfo = this.state.errorDescription;
      }
      return (
      <div className="loginpage">        
        <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-10 col-md-push-1 col-sm-8 col-sm-push-2 ">
                  <div id="myCarousel" className=" carousel slide" data-ride="carousel">   
                    <div className="carousel-inner panel panel-default ">
                      <div className="item active">
                        <img src="assets/img/slide-img.jpg" alt="Los Angeles" style={{width: '100%'}} />
                        <div className="carousel-caption">
                          <h4>One to One video interview platform</h4>
                          <p>Gain more insight on candidates in far less time than a traditional phone interview. Candidates will answer your questions on their own time and you can review the completed video interviews at your convenience. As a result, you'll hear from more candidates, easily compare them, and never have to worry about scheduling early-round interviews again.</p>
                        </div>
                      </div>
                      <div className="item">
                        <img src="assets/img/slide-img.jpg" alt="Los Angeles" style={{width: '100%'}} />
                        <div className="carousel-caption">
                          <h4>One to One video interview platform</h4>
                          <p>Gain more insight on candidates in far less time than a traditional phone interview. Candidates will answer your questions on their own time and you can review the completed video interviews at your convenience. As a result, you'll hear from more candidates, easily compare them, and never have to worry about scheduling early-round interviews again.</p>
                        </div>
                      </div>
                      <div className="item">
                        <img src="assets/img/slide-img.jpg" alt="Los Angeles" style={{width: '100%'}} />
                        <div className="carousel-caption">
                          <h4>One to One video interview platform</h4>
                          <p>Gain more insight on candidates in far less time than a traditional phone interview. Candidates will answer your questions on their own time and you can review the completed video interviews at your convenience. As a result, you'll hear from more candidates, easily compare them, and never have to worry about scheduling early-round interviews again.</p>
                        </div>
                      </div>	  
                    </div>
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to={0} className="active" />
                      <li data-target="#myCarousel" data-slide-to={1} />
                      <li data-target="#myCarousel" data-slide-to={2} />
                    </ol>
                  </div>
                </div>        
              </div> 
              <div className="col-md-6" style={{marginTop: 70}}>
                <div className="col-md-10 col-md-push-1 col-sm-6 col-sm-push-3 ">
                  <img src="assets/img/prc-logo.png" className="img-responsive" style={{margin: '0 auto', width: 165}} />
                  <form style={{width: '90%'}} onSubmit={this.handleRedirect}>
                    <div className="input-group login-userinput">
                      <span className="input-group-addon"><img src="assets/img/userIcon-24.png" /></span>
                      <input id="txtUser" maxLength="100" required autoFocus type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
                    </div>
                    <div className="input-group">
                      <span className="input-group-addon"><img src="assets/img/lockIcon-24.png" /></span>
                      <input id="txtPassword" maxLength="25" required  type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </div>
                    <div className="form-group">
                      <input className="styled-checkbox" id="rememberMe" type="checkbox" defaultValue="value4" />
                      <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button className="btn btn-primary btn-block login-button" type="submit">Login</button>                  
                    <p className="errorInfo">{errorInfo}</p>                  
                    <hr />
                    <p className="text-center text-white">Yet to Register?  <a href="#">Register Now</a></p>
                  </form>				
                </div>
              </div>
            </div>  
          </div>
        </div>
    </div>
      )
    }   
}
