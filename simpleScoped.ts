import { v4 as uuidv4 } from 'uuid';

class Logger {
    private uuid: string = uuidv4();

    log(message: string): void {
        console.log('Logger (' + this.uuid + ') : ' +  message);
    }
}

class MyService {
    private _logger: Logger;
    private uuid: string = uuidv4();

    constructor(logger: Logger) {
        this._logger = logger;
        this._logger.log('MyService has been constructed as ' + this.uuid);
    }

    doSomething(msg: string) {
        this._logger.log('doSomething has been called with ' + msg);
    }
}

// This logger is used by all services
const logger = new Logger();

// These services are all different but use the same logger
// They are all in the same scope
const service1 = new MyService(logger);
service1.doSomething('Get up');

const service2 = new MyService(logger);
service2.doSomething('Wash your face');

const service3 = new MyService(logger);
service3.doSomething('Eat breakfast');

const service4 = new MyService(logger);
service4.doSomething('Go to work');