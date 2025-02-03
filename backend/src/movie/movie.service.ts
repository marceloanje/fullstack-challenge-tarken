import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private movieRepository: Repository<Movie>,
    ) {}

    async create(movieData: Partial<Movie>): Promise<Movie> {
        const movie = this.movieRepository.create(movieData);
        return this.movieRepository.save(movie);
    }

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }

    async findById(movieId: string): Promise<Movie> {
        const movie = await this.movieRepository.findOne({
            where: { imdbID: movieId},
        });

        if (!movie) {
            throw new NotAcceptableException('Movie not found');
        }

        return movie;
    }
}
