'use client'
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Articles({ articles = [] }) {
    const [openArticles, setOpenArticles] = useState(false);
    return (<div className='ps-2 dark:bg-gray-800 flex gap-1 items-center border-1 dark:border-gray-700 my-2'>
        <BookOpenText size='25' className='border-e-1 pe-2 dark:border-gray-700' /> In this Article
        <div>
            {articles.map((value, key) => <Link key={key} href={`#${value.tolowerCase().replace(' ', '_')}`}>{value}</Link>)}
        </div>
    </div>)
}