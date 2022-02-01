// hello.controller.ts

import {
  Controller,
  Logger,
  Get,
  NotFoundException,
  Param,
  Req,
  // UseGuards,
} from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { HelloBodyDTO } from './hello-body.dto';
import { Public } from '../decorators/public.decorator';
import { HelloService } from './hello.service';
import { Request } from 'express';

@Controller('/hello')
export class HelloController {
  /* a logger from nestjs for logging error/other info */
  logger: Logger = new Logger(HelloController.name);

  constructor(private helloService: HelloService) {}

  @Get()
  @Public() // now everyone gets a hello ;)
  async replyHello() {
    return 'Hello';
  }

  @Get(':helloId') // dyanmic parameter just like express, koa-router etc...
  async replyExactHello(
    /*pass the same dynamic parameter from "hello/:helloId" in 
             @Param decorator's first to let nestjs find the parameter
             correctly
            */
    @Param('helloId') id: string,
  ) {
    try {
      /*returning the correct temp hello message*/
      const { msg: message } = await this.helloService.findById(id);
      if (!message) throw new NotFoundException('desired `hello` not found'); //404 error
      return message;
    } catch (error) {
      /* will log the error & autmatically send the error as response
      with all required data
      */
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  // decorator name is similar to http verbs e.g. POST -> @Post
  @Post()
  async saveHello(
    /*Just pass the class as a type & the validation will be done automatically*/
    @Body() body: HelloBodyDTO,
    @Req() req: Request,
  ) {
    try {
      return await this.helloService.create(body.message, req.ip);
    } catch (error) {
      this.logger.error(error?.message ?? '');
      throw error;
    }
  }

  @Get('/restricted-data')
  // @UseGuards(AuthGuard)
  /* or pass it already being instantated as `new AuthGuard()`
   if it doesn't require dependency injection */
  async getRestrictedData() {
    // ... logic
    return {};
  }
}
