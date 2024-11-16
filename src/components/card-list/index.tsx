import styles from './styles.module.css';

import { CardProps } from "@/types/props";
import Card from "../card";

type CardListProps = {
    list: CardProps[]
    isLoadin?: boolean
}

const CardList = ({ list, isLoadin }: CardListProps) => {
    return (
        <div className={styles.containerCard}>
            {
                list.map(movie => (
                    <Card
                        isLoanding={isLoadin}
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        name={movie.name}
                        overview={movie.overview}
                        poster_path={movie.poster_path}
                        vote_average={movie.vote_average}
                    />
                ))
            }
        </div>
    )
}

export default CardList