import styles from "./styles.module.css";

import { Authores } from '@/types/author';

import { BASE_URL_IMAGE } from '@/services/api'

const AuthorCard = ({ name, character, profile_path }: Authores) => {

    return (
        <div className={styles.cardContainer}>
            <abbr title={`Nome: ${character}`} className={styles.name}>{character}</abbr>

            <div className={styles.image}>
                {
                    profile_path ?
                        <img src={`${BASE_URL_IMAGE}${profile_path}`} alt={name} />
                        :
                        <img src={"/not-image.png"} alt={name} />
                }
            </div>

            <abbr title={`Nome: ${name}`} className={styles.name}>{name}</abbr>
        </div>
    )
}

export default AuthorCard