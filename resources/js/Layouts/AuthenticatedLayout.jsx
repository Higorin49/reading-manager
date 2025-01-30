import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Helmet } from 'react-helmet';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <nav className="w-64 bg-white h-screen p-4 fixed left-0 top-0 flex flex-col shadow-md">
                <Link href="/" className="text-2xl font-bold text-gray-900 mb-6">MyApp</Link>
                <NavLink href={route('createisbn')} active={route().current('createisbn')}>
                    本作成
                </NavLink>
                <NavLink href={route('books')} active={route().current('books')}>
                    Library
                </NavLink>
                <NavLink href={route('mylibrary')} active={route().current('mylibrary')}>
                    My本棚
                </NavLink>
            </nav>
            
            {/* Main Content */}
            <div className="flex-1 ml-64">
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div className="max-w-7xl mx-auto">{header}</div>
                    <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-800">{user.name}</span>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </header>
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}