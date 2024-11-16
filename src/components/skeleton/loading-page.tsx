import styles from './styles.module.css'

export default function LoadingPage() {
  return (
    <div className={styles.containerPage}>
      <div className={styles.spinner}></div>
    </div>
  )
}