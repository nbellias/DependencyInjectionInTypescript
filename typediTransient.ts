import "reflect-metadata";
import { Service, Inject, Container } from "typedi";
import { v4 as uuidv4 } from 'uuid';

@Service()
class Logger {
  private uuid: string = uuidv4();

  log(message: string): void {
    console.log('Logger (' + this.uuid + ') : ' +  message);
  }
}

@Service({ transient: true }) // Declare it as transient
class MyService {
  private _logger: Logger;
  private uuid: string = uuidv4();

  constructor(@Inject() logger: Logger) {
    this._logger = logger;
    this._logger.log('Transient MyService has been constructed as ' + this.uuid);
  }

  doSomething(msg: string) {
    this._logger.log('doSomething has been called with ' + msg);
  }
}

const loggerInstance = Container.get(Logger);

const service1 = Container.get(MyService);
service1.doSomething('Get up');

const service2 = Container.get(MyService);
service2.doSomething('Wash your face');

console.log('service1 === service2 : ' + (service1 === service2));

const service3 = Container.get(MyService);
service3.doSomething('Eat breakfast');

const service4 = Container.get(MyService);
service4.doSomething('Go to work');
