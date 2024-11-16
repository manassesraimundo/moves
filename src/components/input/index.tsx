'use client';

import React, { KeyboardEvent } from 'react';
import styles from "./sytles.module.css";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

import { searchMovies } from '@/services/services-movies';
import { searchTv } from '@/services/services-tv';
import { CardProps } from '@/types/props';

type InputProps = {
    value?: string
    onEnter?: () => void
    onChange?: (e: string) => void
    hideResult?: boolean
}

const Input = ({ value, onEnter, onChange, hideResult }: InputProps) => {
    const pathname = usePathname();

    const [resultMovie, setResultMovie] = React.useState<CardProps[]>([]);
    const [resultTv, setResultTv] = React.useState<CardProps[]>([]);

    const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.code.toLowerCase() === 'enter' && onEnter) {
            onEnter();
        }
    }

    React.useEffect(() => {
        const results = async () => {
            if (value) {
                const dataMovies = await searchMovies(value ?? '')
                const dataTv = await searchTv(value ?? '')
                
                if (dataMovies)
                    setResultMovie(dataMovies.splice(0, 5));

                if (dataTv)
                    setResultTv(dataTv.splice(0, 5));
            } 

            if(!value) {
                setResultMovie([]);
                setResultTv([]);
            }
        }

        results();

    }, [value]);

    const handleClear = () => {
        if (onChange) {
            onChange('');
        }
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.divInput} ${value !== '' && styles.borderColor}`}>
                <input
                    type="text"
                    placeholder='Busque aqui pro filme ou série'
                    value={value}
                    onChange={e => onChange && onChange(e.target.value)}
                    onKeyUp={handleKeyUp}
                />

                {
                    value ? (
                        <IoClose color='#eee' size={28} onClick={handleClear}/>
                    ) : (
                        <CiSearch color='#eee' size={28} />
                    )
                }
            </div>

            {
                (pathname !== '/search') && (resultMovie.length > 0 || resultTv.length > 0) && (!hideResult) && (
                    <div className={styles.divResult}>
                        {
                            resultMovie.map(res => (
                                <Link key={res.id} href={`details-movies/${res.id}`}>{res.title}</Link>
                            ))
                        }
                        <div></div>
                        {
                            resultTv.map(res => (
                                <Link key={res.id} href={`details-tv/${res.id}`}>{res.name}</Link>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Input