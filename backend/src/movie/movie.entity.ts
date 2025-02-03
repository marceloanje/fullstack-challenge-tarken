import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movie')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  poster: string;

  @Column({ type: 'float' })
  imdbRating: number;
}