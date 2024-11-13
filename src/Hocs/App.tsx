import React, { useState, useEffect } from 'react';

// 1. Simple Loading HOC
// This HOC adds loading functionality to any component
function withLoading(WrappedComponent: React.ComponentType<any>) {
    return function WithLoadingComponent(props: any) {
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            // Simulate loading
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        }, []);

        if (isLoading) {
            return (
                <div className="flex items-center justify-center p-4">
                    <div className="text-blue-500">Loading...</div>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };
}

// 2. Simple Theme HOC
// This HOC adds dark/light theme functionality
function withTheme(WrappedComponent: React.ComponentType<any>) {
    return function WithThemeComponent(props: any) {
        const [isDark, setIsDark] = useState(false);

        const toggleTheme = () => {
            setIsDark(!isDark);
        };

        const themeClass = isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';

        return (
            <div className={themeClass}>
                <button
                    onClick={toggleTheme}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Toggle Theme
                </button>
                <WrappedComponent {...props} isDark={isDark} />
            </div>
        );
    };
}

// 3. Simple Logger HOC
// This HOC logs component renders
function withLogger(WrappedComponent: React.ComponentType<any>) {
    return function WithLoggerComponent(props: any) {
        useEffect(() => {
            console.log(`Component rendered with props:`, props);
        }, [props]);

        return <WrappedComponent {...props} />;
    };
}

// Simple components to enhance with HOCs
const SimpleCard = ({ title, content }: { title: string; content: string }) => (
    <div className="p-4 border rounded shadow-sm">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{content}</p>
    </div>
);

const Button = ({ onClick, children }: { onClick?: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
        {children}
    </button>
);

// Enhance components with HOCs
const LoadingCard = withLoading(SimpleCard);
const ThemeCard = withTheme(SimpleCard);
const LoggedButton = withLogger(Button);

// Example usage in App
const App = () => {
    return (
        <div className="p-8 space-y-8">
            {/* 1. Component with Loading */}
            <div>
                <h2 className="text-xl mb-4">Loading Example:</h2>
                <LoadingCard
                    title="Hello World"
                    content="This card has loading functionality"
                />
            </div>

            {/* 2. Component with Theme */}
            <div>
                <h2 className="text-xl mb-4">Theme Example:</h2>
                <ThemeCard
                    title="Theme Card"
                    content="This card has theme switching functionality"
                />
            </div>

            {/* 3. Component with Logging */}
            <div>
                <h2 className="text-xl mb-4">Logging Example:</h2>
                <LoggedButton onClick={() => alert('Clicked!')}>
                    Check Console When Clicked
                </LoggedButton>
            </div>

            {/* 4. Multiple HOCs Combined */}
            <div>
                <h2 className="text-xl mb-4">Combined Example:</h2>
                {withTheme(withLoading(SimpleCard))({
                    title: "Combined HOCs",
                    content: "This card has both loading and theme functionality"
                })}
            </div>
        </div>
    );
};

export default App;