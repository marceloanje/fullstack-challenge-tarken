import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() movieData: Partial<Movie>): Promise<Movie> {
    return this.movieService.create(movieData);
  }

  @Get('find-all')
  async findAll() {
    try {
      const movies = await this.movieService.findAll();
      return { message: 'Movies fetched successfully', movies };
    } catch (error) {
      throw new Error('Error fetching movies');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      const movie = await this.movieService.findById(id);
      return { movie };
    } catch (error) {
      throw new Error('Error fetching movie');
    }
  }
}