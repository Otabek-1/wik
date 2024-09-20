import React from 'react';
import "./App.css"

const App = () => {
    return (
        <div className='login-box ' style={{ "width": "400px", "height": "500px", "border-radius": "20px", "position": "relative", "display": "flex", "alignItems": "center", "justifyContent": "center", "box-shadow": "0px 0px 5px black" }}>
            <span className='login-header-text animated-text' style={{ "position": "absolute", "top": "-150px", "font-family": "Roboto", "font-size": "120px", "font-weight": "900" }}>WIK</span>
            <h3 className="login-text text-light" style={{ "position": "absolute", "top": "30px", "font-size": "40px" }}>Login</h3>
            <form action="">
                <div className="uname-input">
                    <label htmlFor="uname">U-name</label>
                    <input type="text" name="uname" id="uname" placeholder='Enter here' required/>
                </div>

                <div className="uname-input" >
                    <label htmlFor="psw">Password</label>
                    <input type="password" name="psw" id="psw" placeholder='Enter here' required/>
                </div>

                <div className="uname-input">
                    <input type="submit" value="Enter" />
                </div>

                <span className="error-text text-danger">Error: username or password incorrect!</span>
            </form>
        </div>
    );
}

export default App;
