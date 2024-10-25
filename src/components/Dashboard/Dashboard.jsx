import React from 'react';
import LiveChat from './LiveChat';
import "./Dashboad.css";
import Search from './Search';
import ShareScreen from './ShareScreen';

const Dashboard = () => {
    return (

        <div style={{ width: "100%", height: "150vh", background: "gray", display: "flex", justifyContent: "end" }}>
            <LiveChat />
            <Search />
        </div>

    );
}

export default Dashboard;
