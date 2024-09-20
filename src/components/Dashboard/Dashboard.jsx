import React from 'react';
import LiveChat from './LiveChat'; 
import "./Dashboad.css";

const Dashboard = () => {
    return (
        <div style={{ width: "100%", height: "100vh", background: "gray", display: "flex" }}>
            <LiveChat /> {/* Live chat on the left side */}
            <div style={{ flex: 1, padding: "20px" }}>
                {/* Dashboard main content goes here */}
            </div>
        </div>
    );
}

export default Dashboard;
