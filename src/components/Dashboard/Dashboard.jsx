import React from 'react';
import "./Main.css";
import Globals from './Globals';
import Mainchat from './Mainchat';


const Dashboard = () => {
    return (

        <div style={{ width: "100%", height: "100vh", background: "#e6e6e6", display: "flex", justifyContent: "space-between", padding:"20px" }}>
           <Globals />
           <Mainchat />
        </div>

    );
}

export default Dashboard;
