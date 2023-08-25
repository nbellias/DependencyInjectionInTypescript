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
        this._logger.log('Scoped MyService has been constructed as ' + this.uuid);
    }

    doSomething(msg: string) {
        this._logger.log('doSomething has been called with ' + msg);
    }
}

const logger = new Logger();

const service1 = new MyService(logger);
service1.doSomething('Get up');

const service2 = service1;
service2.doSomething('Wash your face');

console.log('service1 === service2 : ' + (service1 === service2));

const service3 = service2;
service3.doSomething('Eat breakfast');

const service4 = service3;
service4.doSomething('Go to work');