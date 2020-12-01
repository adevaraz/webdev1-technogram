let io;

module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer , {
            cors : {
                
            }
        });
        io.on('connection' , socket => {
            console.log('user connected');
            socket.on('room' , (roomid) => {
                console.log(roomid);
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