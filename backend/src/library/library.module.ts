import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Library } from './library.entity';
import { LibraryService } from './library.service';
import { LibraryController } from './library.controller';
import { MovieService } from '../movie/movie.service';
import { Movie } from '../movie/movie.entity';
import { SearchService } from '../search/search.service';

@Module({
  imports: [TypeOrmModule.forFeature([Library, Movie]), HttpModule],
  controllers: [LibraryController],
  providers: [LibraryService, MovieService, SearchService],
})
export class LibraryModule {}
