import { Server } from "socket.io"


let connections = {}
let messages = {}
let timeOnline = {}
let admins = {} // Track room admins

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED:", socket.id)

        socket.on("join-call", (path) => {
            console.log(`User ${socket.id} joining room ${path}`);
            
            // Verify if existing admin is still active
            if (admins[path]) {
                const adminSocket = io.sockets.sockets.get(admins[path]);
                if (!adminSocket) {
                    console.log(`Admin ${admins[path]} not found for room ${path}. Resetting.`);
                    delete admins[path];
                    // Optionally clear connections if admin is gone, or just let this user take over
                    // For now, we let them take over as admin, but keep other users if any
                }
            }

            if (connections[path] === undefined || connections[path].length === 0 || !admins[path]) {
                // First user (or new admin)
                console.log(`User ${socket.id} became ADMIN of ${path}`);
                admins[path] = socket.id;
                
                if (connections[path] === undefined) {
                    connections[path] = []
                }
                
                connections[path].push(socket.id)
                timeOnline[socket.id] = new Date();
                
                socket.emit("you-are-admin");

                for (let a = 0; a < connections[path].length; a++) {
                    io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])
                }
            } else {
                // Room exists and has active admin
                console.log(`Requesting join for ${socket.id} to Admin ${admins[path]}`);
                
                // Notify admin
                io.to(admins[path]).emit("request-to-join", socket.id);
                socket.emit("waiting-for-approval");
            }

            if (messages[path] !== undefined && connections[path].includes(socket.id)) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }
        })

        socket.on("accept-request", (socketId, path) => {
            console.log(`Admin ${socket.id} accepted ${socketId}`);
            if (admins[path] === socket.id) {
                if (connections[path] === undefined) connections[path] = [];
                
                connections[path].push(socketId);
                timeOnline[socketId] = new Date();

                io.to(socketId).emit("request-accepted");

                for (let a = 0; a < connections[path].length; a++) {
                    io.to(connections[path][a]).emit("user-joined", socketId, connections[path])
                }
                
                 if (messages[path] !== undefined) {
                    for (let a = 0; a < messages[path].length; ++a) {
                        io.to(socketId).emit("chat-message", messages[path][a]['data'],
                            messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                    }
                }
            }
        });

        socket.on("reject-request", (socketId, path) => {
             console.log(`Admin ${socket.id} rejected ${socketId}`);
             if (admins[path] === socket.id) {
                 io.to(socketId).emit("request-rejected");
             }
        });

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })

        socket.on("disconnect", () => {
            console.log("DISCONNECTED:", socket.id);
            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                            delete admins[key]
                        } else {
                            // Admin Disconnect Handling
                            if (admins[key] === socket.id) {
                                console.log(`Admin ${socket.id} left room ${key}. Assigning new admin.`);
                                if (connections[key].length > 0) {
                                    admins[key] = connections[key][0];
                                    io.to(admins[key]).emit("you-are-admin");
                                    console.log(`New admin is ${admins[key]}`);
                                } else {
                                    delete admins[key];
                                }
                            }
                        }
                    }
                }

            }


        })


    })


    return io;
}