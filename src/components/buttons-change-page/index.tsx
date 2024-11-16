'use client';

import styles from "./styles.module.css";

import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

type ButtonChangePageProps = {
    page: number
    handlePageChange: (page: number) => void
}

const ButtonsChangePage = ({ page, handlePageChange }: ButtonChangePageProps) => {
    return (
        <div className={styles.buttonsChangePage}>
            <button onClick={() => handlePageChange(page - 1)}>
                <FaAngleLeft color='#ccc' size={24} />
            </button>
            <button onClick={() => handlePageChange(page + 1)}>
                <FaAngleRight color='#ccc' size={24} />
            </button>
        </div>
    )
}

export default ButtonsChangePage;