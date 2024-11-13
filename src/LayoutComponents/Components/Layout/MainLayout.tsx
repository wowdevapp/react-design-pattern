
// types.ts
type LayoutProps = {
    children: React.ReactNode;
};

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4">
                <nav className="max-w-5xl mx-auto flex justify-between items-center">
                    <span className="text-xl font-bold">Logo</span>
                    <div className="space-x-4">
                        <a href="#" className="hover:text-blue-200">Home</a>
                        <a href="#" className="hover:text-blue-200">About</a>
                        <a href="#" className="hover:text-blue-200">Contact</a>
                    </div>
                </nav>
            </header>

            {/* Main content */}
            <main className="flex-1 max-w-5xl mx-auto w-full p-4">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 p-4 mt-8">
                <div className="max-w-5xl mx-auto text-center text-gray-600">
                    © 2024 Simple Layout
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
