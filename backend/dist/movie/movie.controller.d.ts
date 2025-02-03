import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
export declare class MovieController {
    private readonly movieService;
    constructor(movieService: MovieService);
    create(movieData: Partial<Movie>): Promise<Movie>;
}
