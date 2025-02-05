import { Controller, Post, Body, Get, Patch, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Multer } from 'multer';
import * as fs from 'fs';
import * as path from 'path';

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

  @Post(':id/upload-review')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  }))
  async uploadReview(
    @Param('id') movieId: string,
    @UploadedFile() file: Multer.File,
  ) {
    const movie = await this.movieService.findById(movieId);

    if (!movie) {
      throw new Error(`Movie with id ${movieId} not found`);
    }
    const filePath = `/uploads/${file.filename}`;
    await this.movieService.updateMovieReview(movieId, filePath);
    return { message: 'Review file uploaded successfully', filePath };
  }

  @Patch(':id/remove-review')
  async removeReview(@Param('id') imdbID: string) {
    try {
      const movie = await this.movieService.findById(imdbID);
      if (!movie) {
        throw new Error('Movie not found');
      }

      if (movie.review) {
        const filePath = path.resolve('uploads', path.basename(movie.review));

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }

      await this.movieService.updateMovieReview(imdbID, null);

      return { message: 'Review and file removed successfully' };
    } catch (error) {
      throw new Error('Error removing review');
    }
  }
}