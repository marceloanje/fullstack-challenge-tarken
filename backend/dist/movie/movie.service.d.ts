import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
export declare class MovieService {
    private readonly movieRepository;
    constructor(movieRepository: Repository<Movie>);
    create(movieData: Partial<Movie>): Promise<Movie>;
}
