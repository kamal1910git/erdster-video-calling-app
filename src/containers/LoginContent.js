import React from 'react'

export default class LoginContent extends React.Component {

    render() {

        return (
          <div className="container-fluid">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="col-md-10 col-md-push-1 col-sm-12 ">
                  <div id="myCarousel" className=" carousel slide" data-ride="carousel">   
                    {/* Wrapper for slides */}
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
                    {/* Indicators */}
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to={0} className="active" />
                      <li data-target="#myCarousel" data-slide-to={1} />
                      <li data-target="#myCarousel" data-slide-to={2} />
                    </ol>
                    </div>
                </div>
              </div> 
              <div className="col-md-6" style={{marginTop: 70}}>
                <div className="col-md-10 col-md-push-1 col-sm-12 ">
                  <img src="assets/img/prc-logo.png" className="img-responsive" style={{margin: '0 auto', width: 165}} />
                  <form style={{width: '90%'}}>
                    <div className="input-group login-userinput">
                      <span className="input-group-addon"><img src="assets/img/userIcon-24.png" /></span>
                      <input id="txtUser" type="text" className="form-control" name="username" placeholder="Username" />
                    </div>
                    <div className="input-group">
                      <span className="input-group-addon"><img src="assets/img/lockIcon-24.png" /></span>
                      <input id="txtPassword" type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                      <input className="styled-checkbox" id="rememberMe" type="checkbox" defaultValue="value4" />
                      <label htmlFor="rememberMe">Remember Me</label>
                    </div>
                    <button className="btn btn-primary btn-block login-button" type="submit">Login</button>
                    <hr />
                    <p className="text-center">Yet to Register?  <a href="#">Register Now</a></p>
                  </form>			
                </div>
              </div>
            </div>  
          </div>
        </div>
        )
    }
}
