import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Movie } from "src/movie/movie.entity";

@Entity('library')
export class Library {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Movie, { onDelete: 'CASCADE'})
    movie: Movie;
}