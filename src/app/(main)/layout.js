'use client'
import { useState } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import clsx from 'clsx';
import { ChevronLeftIcon, FoldHorizontal, LandPlot, Menu, Plane, PlaneLanding, PlaneTakeoff, X } from "lucide-react";

const headerLinks = [
    { href: '/learn', label: 'Learn' },
    { href: '/practice', label: 'Practice' },
];

const WorkTypeComponent = ({ name, Icon, style = '' }) => {
    return (
        <div className="items-center space-x-2 cursor-pointer flex">
            {Icon}
            <div className={`${style}`}>
                {name}
            </div>
        </div>
    );
};

const HeaderNavComponent = ({ pathsegment, navstyle = '', style = '', currentpagestyle = '', otherpagestyle = '' }) => {
    return (<nav className={navstyle}>
        {headerLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className={clsx(
                    'px-4 py-2 transition',
                    style,
                    pathsegment === link.label.toLowerCase()
                        ? currentpagestyle : otherpagestyle
                )}
            >
                {link.label}
            </Link>
        ))}
    </nav>)
}


export default function MainLayout({ children }) {
    const pathname = usePathname();
    const pathsegment = pathname.split('/');
    const [openMenu, setOpenMenu] = useState(false);


    const dynamicWorkType = [
        { name: 'metar', label: <WorkTypeComponent name={'METAR/SPECI/TAF'} Icon={<Plane />} />, title: 'METAR/SPECI/TAF' },
        { name: 'synop', label: <WorkTypeComponent name={'SYNOP'} Icon={<PlaneLanding />} />, title: 'SYNOP' },
        { name: 'pilot', label: <WorkTypeComponent name={'PILOT'} Icon={<PlaneTakeoff />} />, title: 'PILOT' },
        { name: 'general', label: <WorkTypeComponent name={'General'} Icon={<LandPlot />} />, title: 'General' },
    ];

    if (pathsegment[1] === 'practice') {
        dynamicWorkType.splice(1, 0, {
            name: 'synop_pilot',
            label: <WorkTypeComponent name={'SYNOP/PILOT'} Icon={<FoldHorizontal />} />,
            title: 'SYNOP/PILOT',
        });
    }

    return (
        <>
            <header className="mb-1">
                <div className="flex p-5 pt-3 place-items-center justify-between border-b-1 border-neutral-500">
                    <h1 className="italic font-extrabold">Whistle</h1>
                    <div className="gap-5 flex md:hidden">
                        {openMenu ? <X onClick={() => setOpenMenu(false)} /> : <Menu onClick={() => setOpenMenu(true)} />}
                    </div>
                    <HeaderNavComponent pathsegment={pathsegment[1]} navstyle='hidden gap-10 md:flex' style='border-2 rounded-lg' currentpagestyle='bg-blue-100 text-black' />
                </div>

                {openMenu && <HeaderNavComponent pathsegment={pathsegment[1]} navstyle='flex flex-col gap-1 md:hidden' style='border-2 rounded-lg' currentpagestyle='bg-blue-100 text-black' />}

                <div className={`transition-all duration-300 flex flex-row gap-5 pt-2 w-full overflow-scroll`}>
                    {dynamicWorkType.map((type) => (
                        <Link href={`/${pathsegment[1]}/${type.name}`} key={type.name} className={`flex gap-1 justify-center items-center text-xs border p-1 rounded-sm  ${type.name === pathsegment[2] ? 'dark:bg-neutral-900 bg-blue-200' : 'dark:bg-neutral-700 '}`} title={type.title}>
                            {type.label}
                        </Link>
                    ))}
                </div>
            </header>
            <main>
                {children}
            </main>
            {/* <footer>
            Nonce
        </footer> */}
        </>
    );
}
