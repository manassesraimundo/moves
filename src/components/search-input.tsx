'use client';

import React from "react";

import { useRouter } from "next/navigation";

import Input from "@/components/input";

type SeachInputProps = {
    defaultValue?: string
    hideOnSearch?: boolean
}

const SearchInput = ({ defaultValue, hideOnSearch }: SeachInputProps) => {
    const router = useRouter();
  
    const [seachInput, setSeachInput] = React.useState<string>(defaultValue ?? '');

    const handleSeachEnter = () => {
        if (!seachInput) return null;

        router.push('/search?q=' + encodeURIComponent(seachInput));
    }

    return (
        <Input
            value={seachInput}
            onChange={t => setSeachInput(t)}
            onEnter={handleSeachEnter}
            hideResult={hideOnSearch}
        />
    )
}

export default SearchInput;