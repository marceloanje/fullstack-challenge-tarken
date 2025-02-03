import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Library } from './library.entity';
import { SearchService } from '../search/search.service';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from 'src/movie/movie.entity';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Library)
    private readonly libraryRepository: Repository<Library>,
    private readonly searchService: SearchService,
    private readonly movieService: MovieService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async createLibraryIfNotExists(): Promise<Library> {
    let library = await this.libraryRepository.findOne({ 
      where: {},
      relations: ['movies'],   
    });

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
    // console.log(library.movies)

    if (!library.movies) {
      library.movies = [];
    }

    const movieAlreadyInLibrary = library.movies.some((existingMovie) => existingMovie.imdbID === movie.imdbID);
    if (!movieAlreadyInLibrary) {
      library.movies.push(movie);
    }

    await this.libraryRepository.save(library);

    return library;
  }

  async removeMovieFromLibrary(movieImdbID: string): Promise<Library> {
    const library = await this.createLibraryIfNotExists();

    const movieToRemove = library.movies.find((movie) => movie.imdbID === movieImdbID);

    if (!movieToRemove) {
      throw new NotFoundException('Movie not found in library');
    }

    library.movies = library.movies.filter((movie) => movie.imdbID !== movieImdbID);

    await this.libraryRepository.save(library);

    return library;
  }
}