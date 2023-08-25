/*
    This is an example of a singleton DI pattern based on the scoped DI pattern.
*/
import { v4 as uuidv4 } from 'uuid';

class Logger {
    private uuid: string = uuidv4();

    log(message: string): void {
        console.log('Logger (' + this.uuid + ') : ' +  message);
    }
}

class MySingletonService {
    private static instance: MySingletonService;
    private static _logger: Logger;
    private static uuid: string = uuidv4();

    private constructor() {
        // Private constructor to prevent external instantiation
      }

    public static getInstance(logger: Logger): MySingletonService {
        if (!MySingletonService.instance) {
            MySingletonService.instance = new MySingletonService();
        }
        this._logger = logger;
        this._logger.log('Singleton MyService has been constructed as ' + this.uuid);
        return MySingletonService.instance;
      }

    doSomething(msg: string) {
        MySingletonService._logger.log('doSomething has been called with ' + msg);
    }
}

// This logger is used by all services
const logger = new Logger();

// These services are all the same singleton object and use the same logger
// They are all in the same scope
const service1 = MySingletonService.getInstance(logger);
service1.doSomething('Get up');

const service2 = MySingletonService.getInstance(logger);
service2.doSomething('Wash your face');

console.log('service1 === service2 : ' + (service1 === service2));

const service3 = MySingletonService.getInstance(logger);
service3.doSomething('Eat breakfast');

const service4 =MySingletonService.getInstance(logger);
service4.doSomething('Go to work');