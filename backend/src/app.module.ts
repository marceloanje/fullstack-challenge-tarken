import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'moovy',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SearchModule, 
    MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
