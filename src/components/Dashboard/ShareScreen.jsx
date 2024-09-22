import React, { useEffect, useRef, useState } from 'react';
import './sharescreen.css';

export default function ShareScreen() {
    const [screens, setScreens] = useState([]);
    const screenRef1 = useRef(null);
    const screenRef2 = useRef(null);
    const screenRef3 = useRef(null);
    const userId = "user1"; // Har bir foydalanuvchiga alohida ID berish

    const startScreenSharing = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true
            });

            // Ekran oqimini olish
            screenRef1.current.srcObject = mediaStream;

            // Ekran ma'lumotlarini serverga yuborish
            const sendScreenData = async () => {
                const screenData = mediaStream.getVideoTracks()[0].getSettings(); // Oqim haqidagi ma'lumotlar
                await fetch('http://localhost:4000/screen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId, screenData })
                });
            };

            sendScreenData(); // Ma'lumotlarni yuborish

            // Ekranlarni yangilash
            const fetchScreens = async () => {
                const response = await fetch('http://localhost:4000/screens');
                const data = await response.json();
                setScreens(data);
            };

            // Ekranlarni har 5 soniyada yangilash
            const interval = setInterval(fetchScreens, 5000);
            return () => clearInterval(interval); // Tozalash
        } catch (err) {
            console.error("Ekran olishda xato:", err);
        }
    };

    useEffect(() => {
        startScreenSharing();
    }, []);

    return (
        <div className='screens'>
            <video ref={screenRef1} className='screen' autoPlay muted />
            {screens.map((screen, index) => (
                <video key={index} className='screen' src={screen.screenData} autoPlay muted />
            ))}
        </div>
    );
}
