import { Module } from '@nestjs/common';
import ormconfig from '../../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloRecord } from './entities/hello-record.entity';

@Module({
  imports: [
    // registers Database config
    TypeOrmModule.forRoot({
      ...ormconfig, //db config
      entities: [HelloRecord], // put the  constructor of the entity classes that are created for schema
    }),
  ],
})
export class DatabaseModule {}
