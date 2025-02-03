import { Controller, Post, Param, NotFoundException } from '@nestjs/common';
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
}