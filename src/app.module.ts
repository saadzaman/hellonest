////// app.module.ts //////
import { Module } from '@nestjs/common';
/*This is the base '/' controller */
import { AppController } from './app.controller';
/* basic provider for AppController */
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { HelloModule } from './hello/hello.module';
import { HiModule } from './hi/hi.module';
import { DatabaseModule } from './database/database.module';

export const AUTH_GUARD = 'unqiue-auth-guard';

@Module({
  /*this where descendent modules get added
			we've to do this if we were importing another inside
			an other module to be able to use its providers
     */
  imports: [HelloModule, HiModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService, { provide: AUTH_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
