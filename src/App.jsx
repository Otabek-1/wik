import React, { useState } from 'react';
import "./App.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const App = () => {  
    const navigate = useNavigate();
    const [uname, setUname] = useState("");
    const [psw, setPsw] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:4000/login", {
                uname,
                password: psw
            });
            if (response.status === 200) {
                navigate("/dashboard");
            }
        } catch (err) {
            console.error(err); // Xatolikni konsolga chiqarish
            setError("Error: username or password incorrect!");
        }
    };

    return (
        <div className='login-box' style={{ width: "400px", height: "500px", borderRadius: "20px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0px 0px 5px black" }}>
            <span className='login-header-text animated-text' style={{ position: "absolute", top: "-150px", fontFamily: "Roboto", fontSize: "120px", fontWeight: "900" }}>WIK</span>
            <h3 className="login-text text-light" style={{ position: "absolute", top: "30px", fontSize: "40px" }}>Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="uname-input">
                    <label htmlFor="uname">U-name</label>
                    <input 
                        type="text" 
                        name="uname" 
                        id="uname" 
                        placeholder='Enter here' 
                        required 
                        value={uname} 
                        onChange={(e) => setUname(e.target.value)} 
                    />
                </div>

                <div className="uname-input">
                    <label htmlFor="psw">Password</label>
                    <input 
                        type="password" 
                        name="psw" 
                        id="psw" 
                        placeholder='Enter here' 
                        required 
                        value={psw} 
                        onChange={(e) => setPsw(e.target.value)} 
                    />
                </div>

                <div className="uname-input">
                    <input type="submit" value="Enter" />
                </div>

                {error && <span className="error-text text-danger">{error}</span>}
            </form>
        </div>
    );
}

export default App;
