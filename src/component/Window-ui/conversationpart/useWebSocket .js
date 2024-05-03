// import { useEffect } from 'react';
// import Stomp from 'stompjs';
// import SockJS from 'sockjs-client';

// const WS_URL = 'http://192.168.29.203:8080/ws';

// const useWebSocket = (userId, onMessageReceived) => {
//   useEffect(() => {
//     const socket = new SockJS(WS_URL);
//     const stompClient = Stomp.over(socket);

//     const connectWebSocket = () => {
//       stompClient.connect({}, () => {
//         console.log('WebSocket connected');
//         stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
//           onMessageReceived(JSON.parse(message.body));
//         });
//       }, (error) => {
//         console.error('WebSocket connection error:', error);
//       });
//     };

//     const disconnectWebSocket = () => {
//       if (stompClient && stompClient.connected) {
//         stompClient.disconnect();
//         console.log('WebSocket disconnected');
//       }
//     };

//     connectWebSocket();

//     return () => {
//       disconnectWebSocket();
//     };
//   }, [userId, onMessageReceived]);

//   return null;
// };

// export default useWebSocket;
