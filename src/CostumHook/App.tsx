import React, { useState, useEffect } from 'react';

// 1. Generic useLocalStorage Hook
// Stores and retrieves any type of data from localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}

// 2. Generic useFetch Hook
// Fetches and manages data of any type from an API
function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError('Failed to fetch data');
                setData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
}

// 3. Generic useArray Hook
// Manages array operations for any type of array
function useArray<T>(initialArray: T[] = []) {
    const [array, setArray] = useState<T[]>(initialArray);

    const push = (element: T) => {
        setArray(arr => [...arr, element]);
    };

    const remove = (index: number) => {
        setArray(arr => arr.filter((_, i) => i !== index));
    };

    const clear = () => {
        setArray([]);
    };

    return { array, push, remove, clear };
}

// Example Components using these hooks
// 1. User Preferences Component using useLocalStorage
interface UserPreferences {
    theme: 'light' | 'dark';
    fontSize: number;
}

const UserSettings = () => {
    const [preferences, setPreferences] = useLocalStorage<UserPreferences>('preferences', {
        theme: 'light',
        fontSize: 16
    });

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl mb-4">User Settings</h2>
            <div className="space-y-4">
                <div>
                    <label className="block mb-2">Theme:</label>
                    <select
                        value={preferences.theme}
                        onChange={(e) => setPreferences({
                            ...preferences,
                            theme: e.target.value as 'light' | 'dark'
                        })}
                        className="border p-2 rounded"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-2">Font Size:</label>
                    <input
                        type="number"
                        value={preferences.fontSize}
                        onChange={(e) => setPreferences({
                            ...preferences,
                            fontSize: Number(e.target.value)
                        })}
                        className="border p-2 rounded"
                    />
                </div>
            </div>
        </div>
    );
};

// 2. Todo List Component using useArray
interface Todo {
    id: number;
    text: string;
}

const TodoList = () => {
    const { array: todos, push, remove } = useArray<Todo>([
        { id: 1, text: 'Learn TypeScript' }
    ]);
    const [newTodo, setNewTodo] = useState('');

    const handleAdd = () => {
        if (newTodo.trim()) {
            push({ id: Date.now(), text: newTodo.trim() });
            setNewTodo('');
        }
    };

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl mb-4">Todo List</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="border p-2 rounded flex-grow"
                    placeholder="New todo"
                />
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Add
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map((todo, index) => (
                    <li key={todo.id} className="flex justify-between items-center">
                        <span>{todo.text}</span>
                        <button
                            onClick={() => remove(index)}
                            className="px-2 py-1 text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// 3. Data Fetching Component using useFetch
interface Post {
    id: number;
    title: string;
    body: string;
}

const PostList = () => {
    const { data, loading, error } = useFetch<Post[]>(
        'https://jsonplaceholder.typicode.com/posts'
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-4 border rounded">
            <h2 className="text-xl mb-4">Posts</h2>
            <div className="space-y-4">
                {data?.map(post => (
                    <div key={post.id} className="border p-4 rounded">
                        <h3 className="font-bold">{post.title}</h3>
                        <p>{post.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// App Component showing all examples
const App = () => {
    return (
        <div className="p-8 max-w-2xl mx-auto space-y-8">
            <UserSettings />
            <TodoList />
            <PostList />
        </div>
    );
};

export default App;