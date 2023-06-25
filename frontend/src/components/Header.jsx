function Header() {
    return (
        <header className="sticky top-0 bg-white shadow">
            <nav className="mx-auto flex max-w-7xl items-center px-6 py-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/">
                        <span className="sr-only">DIT - Delta Institute of Technology</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="DIT Logo" />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;