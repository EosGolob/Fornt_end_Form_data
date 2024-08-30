import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/api/notifications')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });

    // WebSocket connection for real-time notifications
    const ws = new WebSocket("ws://localhost:8082/notifications");

    ws.onmessage = (event) => {
      const message = event.data;
      setNotifications((prevNotifications) => [...prevNotifications, { message, isRead: false }]);
    };

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    ws.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <div id="notifications">
        {notifications.map((notification, index) => (
          <div key={index} className="notification">
            {notification.message}
          </div>
        ))}
      </div>
      <style jsx>{`
        .notification {
          background-color: #f8d7da;
          color: #721c24;
          padding: 15px;
          margin: 10px 0;
          border: 1px solid #f5c6cb;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default NotificationComponent;
