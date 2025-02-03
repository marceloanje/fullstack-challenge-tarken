import { Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Movie } from "src/movie/movie.entity";

@Entity('library')
export class Library {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Movie, (movie) => movie.library, { cascade: true })
    movies: Movie[];
}