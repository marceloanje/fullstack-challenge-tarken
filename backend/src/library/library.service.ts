import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './library.entity';
import { SearchService } from '../search/search.service';
import { Movie } from '../movie/movie.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    private readonly searchService: SearchService,
  ) {}

  async createLibraryIfNotExists(): Promise<Library> {
    let library = await this.libraryRepository.findOne({ where: {} });

    if (!library) {
      library = this.libraryRepository.create({});
      await this.libraryRepository.save(library);
    }

    return library;
  }

  async addMovieToLibrary(movieId: string): Promise<Library> {
    const movie = await this.searchService.getMovieById(movieId);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const library = await this.createLibraryIfNotExists();

    library.movie = movie;
    await this.libraryRepository.save(library);

    return library;
  }
}