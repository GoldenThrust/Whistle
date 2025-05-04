'use client'
import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { 
  BookOpen, 
  FoldHorizontal, 
  LandPlot, 
  Menu, 
  Plane, 
  PlaneLanding, 
  PlaneTakeoff, 
  X,
  Dumbbell,
  ChevronRight
} from "lucide-react";

const headerLinks = [
    { href: '/learn', label: 'Learn', icon: <BookOpen size={18} /> },
    { href: '/practice', label: 'Practice', icon: <Dumbbell size={18} /> },
];

const WorkTypeComponent = ({ name, Icon }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="text-blue-500">
                {Icon}
            </div>
            <span className="text-sm font-medium">
                {name}
            </span>
        </div>
    );
};

export default function MainLayout({ children }) {
    const pathname = usePathname();
    const pathsegment = pathname.split('/');
    const [openMenu, setOpenMenu] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Add scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            <header className={clsx(
                "sticky top-0 z-10 transition-all duration-300",
                isScrolled ? "shadow-md bg-white dark:bg-gray-900" : "bg-white/95 dark:bg-gray-900/95"
            )}>
                {/* Main navigation bar */}
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <h1 className="italic font-extrabold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                Whistle
                            </h1>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded-full text-blue-700 dark:text-blue-300 hidden sm:inline-block">
                                Meteo
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {headerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        'px-4 py-2 rounded-md flex items-center gap-2 transition-colors',
                                        pathsegment[1] === link.label.toLowerCase()
                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium' 
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    )}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile menu button */}
                        <button 
                            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            {openMenu ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {openMenu && (
                    <div className="md:hidden pb-3 px-4 shadow-inner bg-gray-50 dark:bg-gray-800">
                        {headerLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    'flex items-center gap-3 p-3 rounded-md my-1 transition-colors',
                                    pathsegment[1] === link.label.toLowerCase()
                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium' 
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                )}
                                onClick={() => setOpenMenu(false)}
                            >
                                {link.icon}
                                {link.label}
                                <ChevronRight className="ml-auto" size={16} />
                            </Link>
                        ))}
                    </div>
                )}

                {/* Category navigation */}
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="py-2 overflow-x-auto no-scrollbar">
                            <div className="flex space-x-3">
                                {dynamicWorkType.map((type) => (
                                    <Link 
                                        href={`/${pathsegment[1]}/${type.name}`} 
                                        key={type.name} 
                                        className={clsx(
                                            "flex whitespace-nowrap px-3 py-2 rounded-md text-sm transition-colors",
                                            type.name === pathsegment[2] 
                                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                        )}
                                        title={type.title}
                                    >
                                        {type.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto px-4 pt-6 pb-16">
                {children}
            </main>
            {/* <footer>
                Nonce
            </footer> */}
        </>
    );
}
