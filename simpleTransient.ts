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

// Each logger for each service
const logger1 = new Logger();
const service1 = new MyService(logger1);
service1.doSomething('Get up');

const logger2 = new Logger();
const service2 = new MyService(logger2);
service2.doSomething('Wash your face');

const logger3 = new Logger();
const service3 = new MyService(logger3);
service3.doSomething('Eat breakfast');

const logger4 = new Logger();
const service4 = new MyService(logger4);
service4.doSomething('Go to work');