/**
 * Module dependencies.
 */
import * as app from '../app';
import * as http from 'http';
import * as debug from 'debug';

const hdwalletConfig = require('../config/hd-wallet-service.config');

// binding to console
let log = debug('modern-express:server');
log.log = console.log.bind(console);

/**
 * Get port from environment and store in Express.
 */
let PORT = process.env.PORT || '4000';

function getPort(val) {
    /**
     * Normalize a port into a number, string, or false.
     */
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

app.set('port', PORT);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(PORT);


server.on('listening', () => {
    /**
     * Event listener for HTTP server "listening" event.
     */
    const addr = server.address();
    const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
    log(`Listening on ${bind}`);
});