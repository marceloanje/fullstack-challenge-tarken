import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './library.entity';
import { SearchService } from '../search/search.service';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    private readonly searchService: SearchService,
    private readonly movieService: MovieService,
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
    const movieData = await this.searchService.getMovieById(movieId);

    if (!movieData) {
      throw new NotFoundException('Movie not found');
    }

    const movie = await this.movieService.create({
      title: movieData.Title,
      poster: movieData.Poster,
      imdbID: movieData.imdbID,
      imdbRating: movieData.imdbRating,
    });

    const library = await this.createLibraryIfNotExists();

    if (!library.movies) {
      library.movies = [];
    }

    library.movies.push(movie);

    await this.libraryRepository.save(library);

    return library;
  }
}