let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer);
        io.on('connection' , socket => {
            socket.on('room' , (roomid) => {
                socket.join(roomid);
            })
        })
    },
    getIO : () => {
        if(!io){
            throw new Error();
        }
        return io;
    }
    
}