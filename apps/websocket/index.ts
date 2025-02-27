import { prisma } from "db/client";
import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8081 });

wss.on("connection", (socket) => {
    socket.on("message", async (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            
            if (!parsedMessage.username || !parsedMessage.password) {
                socket.send(JSON.stringify({ error: "Username and password are required" }));
                return;
            }

            const user = await prisma.user.create({
                data: {
                    username: parsedMessage.username,
                    password: parsedMessage.password
                }
            });
            
            socket.send(JSON.stringify(user));
        } catch (error: any) {
            socket.send(JSON.stringify({ error: "Failed to create user", message: error.message }));
        }
    });
});