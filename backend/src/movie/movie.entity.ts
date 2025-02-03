import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Library } from 'src/library/library.entity';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  poster: string;

  @Column()
  imdbID: string;

  @Column({ type: 'float' })
  imdbRating: number;

  @ManyToOne(() => Library, (library) => library.movies, { onDelete: 'CASCADE' })
  library: Library;
}