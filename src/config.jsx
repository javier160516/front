import { io } from 'socket.io-client'

const ws = io("https://0d44-187-157-104-191.ngrok.io", {
    withCredentials: true
}
);

export { ws }