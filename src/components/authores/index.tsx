import styles from "./styles.module.css";

import AuthorCard from "./authores-card";

import { Authores } from "@/types/author";

type AuthoreProps = {
    authores: Authores[]
}

const Authore = ({ authores }: AuthoreProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.titleHeader}>
                <h2>Atores <span>&</span> Atrizes do <span>Filme</span></h2>
            </div>

            <div className={styles.listAuthor}>
                {
                    authores.map(authore => (
                        <AuthorCard
                            key={authore.profile_path}
                            name={authore.name}
                            profile_path={authore.profile_path}
                            character={authore.character}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Authore;