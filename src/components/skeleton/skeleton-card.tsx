import styles from './styles.module.css'

export default function SkeletonCard() {
    return (
      <div className={styles.skeletonCard}>
        <div className={styles.skeletonThumbnail} />
        <div className={styles.skeletonTitle} />
      </div>
    );
  }
  