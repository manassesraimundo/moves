"use client";

import React from 'react';
import styles from "./styles.module.css";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginationButtonsProps = {
    currentPage: number;
    category: string;
    handlePageChange: (page: number, category: string) => void;
};

const PaginationButtons = ({ currentPage, category, handlePageChange }: PaginationButtonsProps) => (
    <div className={styles.buttons}>
        <button onClick={() => handlePageChange(currentPage - 1, category)}>
            <FaAngleLeft color='#ccc' size={24} />
        </button>
        <button onClick={() => handlePageChange(currentPage + 1, category)}>
            <FaAngleRight color='#ccc' size={24} />
        </button>
    </div>
);

export default PaginationButtons;
