import React from 'react';
// types.ts
interface ListItem {
    id: number;
    title: string;
    description: string;
    status: 'active' | 'completed';
}

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    emptyMessage?: string;
}

// components/List/GenericList.tsx

function GenericList<T>({ items, renderItem, emptyMessage = 'No items found' }: ListProps<T>) {
    if (items.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    return <div className="space-y-2">{items.map(renderItem)}</div>;
}

// components/List/TaskList.tsx
const TaskList: React.FC<{ tasks: ListItem[] }> = ({ tasks }) => {
    const renderTask = (task: ListItem) => (
        <div
            key={task.id}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{task.title}</h3>
                <span
                    className={`px-2 py-1 rounded-full text-sm ${task.status === 'active'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                >
                    {task.status}
                </span>
            </div>
            <p className="text-gray-600 mt-2">{task.description}</p>
        </div>
    );

    return (
        <GenericList
            items={tasks}
            renderItem={renderTask}
            emptyMessage="No tasks available"
        />
    );
};

// components/List/VirtualList.tsx
const VirtualList: React.FC<{ items: ListItem[] }> = ({ items }) => {
    return (
        <div className="h-96 overflow-auto">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className="p-4 border-b last:border-b-0"
                    style={{
                        height: '60px',
                        transform: `translateY(${index * 60}px)`
                    }}
                >
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                </div>
            ))}
        </div>
    );
};

// components/List/GridList.tsx
const GridList: React.FC<{ items: ListItem[] }> = ({ items }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
                <div
                    key={item.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
            ))}
        </div>
    );
};

// Usage Example
const App: React.FC = () => {
    const sampleTasks: ListItem[] = [
        {
            id: 1,
            title: "Complete Project",
            description: "Finish the React components",
            status: "active"
        },
        {
            id: 2,
            title: "Review Code",
            description: "Review pull requests",
            status: "completed"
        },
        // Add more items as needed
    ];

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-4">Regular List</h2>
                <TaskList tasks={sampleTasks} />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Grid List</h2>
                <GridList items={sampleTasks} />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Virtual List</h2>
                <VirtualList items={sampleTasks} />
            </section>
        </div>
    );
};

export default App;