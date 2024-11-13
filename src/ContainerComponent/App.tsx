import React, { useState, useEffect } from 'react';

// Types
type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
};

type UserListProps = {
    users: User[];
    isLoading: boolean;
    error?: string;
    onUserClick: (user: User) => void;
    selectedUserId?: number;
};

// Presentational Component
const UserList: React.FC<UserListProps> = ({
    users,
    isLoading,
    error,
    onUserClick,
    selectedUserId
}) => {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    onClick={() => onUserClick(user)}
                    className={`
            p-4 bg-white shadow rounded-lg cursor-pointer
            transition-all duration-200 
            ${selectedUserId === user.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}
          `}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <span className="inline-block px-2 py-1 mt-2 text-sm bg-blue-100 text-blue-800 rounded">
                                {user.role}
                            </span>
                        </div>
                        <span
                            className={`
                inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${user.status === 'active'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }
              `}
                        >
                            {user.status}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Container Component
const UserListContainer: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [selectedUserId, setSelectedUserId] = useState<number>();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                // Simulating API call with mock data
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockUsers: User[] = [
                    {
                        id: 1,
                        name: 'John Doe',
                        email: 'john@example.com',
                        role: 'Admin',
                        status: 'active'
                    },
                    {
                        id: 2,
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        role: 'User',
                        status: 'active'
                    },
                    {
                        id: 3,
                        name: 'Bob Johnson',
                        email: 'bob@example.com',
                        role: 'Editor',
                        status: 'inactive'
                    }
                ];
                setUsers(mockUsers);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserClick = (user: User) => {
        setSelectedUserId(user.id);
        console.log('Selected user:', user);
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <p className="text-gray-600">
                    {users.length} user{users.length !== 1 ? 's' : ''} found
                </p>
            </div>

            <UserList
                users={users}
                isLoading={isLoading}
                error={error}
                onUserClick={handleUserClick}
                selectedUserId={selectedUserId}
            />
        </div>
    );
};

// App Component
const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <UserListContainer />
        </div>
    );
};

export default App;