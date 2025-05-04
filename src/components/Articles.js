'use client'
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Articles({ articles = [] }) {
    const [openArticles, setOpenArticles] = useState(false);
    return (
        <>
            <div className='ps-2 dark:bg-gray-800 flex gap-1 items-center border-1 dark:border-gray-700 my-2' onClick={() => setOpenArticles(!openArticles)}>

                <BookOpenText size='25' className='border-e-1 pe-2 dark:border-gray-700' /> In this Article
            </div>
            {openArticles && <div className='flex flex-col gap-1 dark:bg-gray-800 p-2 border-1 dark:border-gray-700 ps-5'>
                {articles.map((value, key) => <Link key={key} href={`#${value.toLowerCase().replace(/ /g, '_')}`}>{value}</Link>)}
            </div >}
        </>

    )
}