import DeltaIT from '../assets/img/dit-header.png';

function Header() {
    return (
        <header className="sticky top-0 bg-white shadow">
            <nav className="mx-auto flex max-w-7xl items-center px-6 pt-2 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/">
                        <span className="sr-only">DIT - Delta Institute of Technology</span>
                        <img src={DeltaIT} alt="DIT Logo" className='h-[5rem] w-[15rem]' />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;