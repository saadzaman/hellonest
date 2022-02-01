////// hello.service.ts ///////

import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HiService } from 'src/hi/hi.service';
import { ByeService } from './bye.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HelloRecord } from '../database/entities/hello-record.entity';

@Injectable()
export class HelloService {
  constructor(
    @Inject(forwardRef(() => HiService))
    private hiService: HiService,
    @Inject(forwardRef(() => ByeService))
    private byeService: ByeService,
    @InjectRepository(HelloRecord)
    private helloRecordRepo: Repository<HelloRecord>,
  ) {}

  async findById(id: string) {
    return await this.helloRecordRepo.findOne({ id });
  }

  async create(msg: string, ip: string) {
    const newMsg = this.helloRecordRepo.create({ msg, from: ip });
    return await this.helloRecordRepo.save(newMsg);
  }

  async deleteById(id: string) {
    return await this.helloRecordRepo.delete({ id });
  }

  getHello(arg: string) {
    return `hello for ${arg}`;
  }

  // a method that uses `hiService`
  hiServiceUsingMethod() {
    return this.hiService.getHi('hello');
  }

  byeServiceUsingMethod() {
    return this.byeService.getBye('hello');
  }
}
