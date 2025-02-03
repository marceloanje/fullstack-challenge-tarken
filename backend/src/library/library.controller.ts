import { Controller, Post, Param, NotFoundException, Delete, Get } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('add-movie/:movieId')
  async addMovieToLibrary(@Param('movieId') movieId: string) {
    try {
      const library = await this.libraryService.addMovieToLibrary(movieId);
      return { message: 'Movie added to library successfully', library };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Movie not found');
      }
      throw error;
    }
  }

  @Delete('remove-movie/:movieId')
  async removeMovieFromLibrary(@Param('movieId') movieId: string) {
    try {
      const library = await this.libraryService.removeMovieFromLibrary(movieId);
      return { message: 'Movie removed from library successfully', library };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Movie not found in library');
      }
      throw error;
    }
  }

  @Get('movies')
  async getMoviesInLibrary() {
    try {
      const movies = await this.libraryService.getMoviesInLibrary();
      return { movies };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Movies not found');
      }
      throw error;
    }
  }
}