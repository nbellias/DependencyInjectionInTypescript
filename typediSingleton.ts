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

@Service({ global: true }) // Declare it as a singleton
class MyService {
  private _logger: Logger;
  private uuid: string = uuidv4();

  constructor(@Inject() logger: Logger) {
    this._logger = logger;
    this._logger.log('Singleton MyService has been constructed as ' + this.uuid);
  }

  doSomething(msg: string) {
    this._logger.log('doSomething has been called with ' + msg);
  }
}

// Create a scoped container
const scopedContainer = Container.of('scoped-context');
const loggerInstance = scopedContainer.get(Logger);

const service1 = scopedContainer.get(MyService);
service1.doSomething('Get up');

const service2 = scopedContainer.get(MyService);
service2.doSomething('Wash your face');

console.log('service1 === service2 : ' + (service1 === service2));

const service3 = scopedContainer.get(MyService);
service3.doSomething('Eat breakfast');

const service4 = scopedContainer.get(MyService);
service4.doSomething('Go to work');