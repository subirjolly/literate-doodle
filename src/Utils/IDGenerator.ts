import {fromString, uuid} from 'uuidv4';
import {UUID} from '../Types';

export default class IDGenerator {
  static generate(id: string | void): UUID {
    if (!id) {
      return uuid();
    }

    return fromString(id) as UUID;
  }
}
