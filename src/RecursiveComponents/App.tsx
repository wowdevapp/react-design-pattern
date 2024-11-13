import React, { useState } from 'react';

// 1. Basic File/Folder Tree Structure
interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
}

interface TreeViewProps {
    node: TreeNode;
    level?: number;
}

const TreeView: React.FC<TreeViewProps> = ({ node, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="ml-4">
            <div
                className="flex items-center cursor-pointer py-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                {/* Indentation and expand/collapse icon */}
                {hasChildren && (
                    <span className="mr-2">
                        {isOpen ? '📂' : '📁'}
                    </span>
                )}
                {!hasChildren && <span className="mr-2">📄</span>}
                <span>{node.name}</span>
            </div>

            {/* Recursive children rendering */}
            {isOpen && hasChildren && (
                <div className="ml-4">
                    {node.children?.map((childNode) => (
                        <TreeView
                            key={childNode.id}
                            node={childNode}
                            level={level + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// 2. Comment Thread Component
interface Comment {
    id: string;
    author: string;
    content: string;
    replies?: Comment[];
}

interface CommentThreadProps {
    comment: Comment;
    depth?: number;
}

const CommentThread: React.FC<CommentThreadProps> = ({
    comment,
    depth = 0
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showReplyForm, setShowReplyForm] = useState(false);
    const maxDepth = 3; // Limit nesting depth

    return (
        <div
            className={`
        border-l-2 pl-4 my-2
        ${depth === 0 ? 'border-blue-500' : 'border-gray-300'}
      `}
        >
            {/* Comment Content */}
            <div className="bg-white p-3 rounded shadow-sm">
                <div className="font-bold text-sm">{comment.author}</div>
                <div className="text-gray-700 mt-1">{comment.content}</div>

                {/* Actions */}
                <div className="mt-2 text-sm text-gray-500 space-x-4">
                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="hover:text-blue-500"
                    >
                        Reply
                    </button>
                    {comment?.replies?.length > 0 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="hover:text-blue-500"
                        >
                            {isExpanded ? 'Hide Replies' : 'Show Replies'}
                        </button>
                    )}
                </div>
            </div>

            {/* Nested Replies */}
            {isExpanded && comment.replies && depth < maxDepth && (
                <div className="ml-4">
                    {comment.replies.map((reply) => (
                        <CommentThread
                            key={reply.id}
                            comment={reply}
                            depth={depth + 1}
                        />
                    ))}
                </div>
            )}

            {/* Show "Continue Thread" instead of more nested replies */}
            {depth === maxDepth && comment.replies && (
                <button
                    className="mt-2 text-blue-500 hover:underline"
                    onClick={() => console.log('Navigate to thread')}
                >
                    Continue Thread →
                </button>
            )}
        </div>
    );
};

// 3. Menu Component with Unlimited Nesting
interface MenuItem {
    id: string;
    label: string;
    children?: MenuItem[];
}

interface MenuProps {
    items: MenuItem[];
    level?: number;
}

const Menu: React.FC<MenuProps> = ({ items, level = 0 }) => {
    return (
        <ul className={`${level === 0 ? 'border rounded' : 'border-l ml-4'}`}>
            {items.map((item) => (
                <li key={item.id} className="relative">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer">
                        {item.label}
                    </div>
                    {item.children && item.children.length > 0 && (
                        <Menu items={item.children} level={level + 1} />
                    )}
                </li>
            ))}
        </ul>
    );
};

// Example Usage
const App: React.FC = () => {
    // Sample Data
    const fileSystemData: TreeNode = {
        id: '1',
        name: 'Root',
        children: [
            {
                id: '2',
                name: 'Documents',
                children: [
                    { id: '3', name: 'report.pdf' },
                    { id: '4', name: 'data.xlsx' }
                ]
            },
            {
                id: '5',
                name: 'Images',
                children: [
                    { id: '6', name: 'photo.jpg' }
                ]
            }
        ]
    };

    const commentData: Comment = {
        id: '1',
        author: 'John Doe',
        content: 'Great article!',
        replies: [
            {
                id: '2',
                author: 'Jane Smith',
                content: 'Thanks John!',
                replies: [
                    {
                        id: '3',
                        author: 'Bob Wilson',
                        content: 'I agree with both of you'
                    }
                ]
            }
        ]
    };

    const menuData: MenuItem[] = [
        {
            id: '1',
            label: 'File',
            children: [
                { id: '2', label: 'New' },
                {
                    id: '3',
                    label: 'Open',
                    children: [
                        { id: '4', label: 'Recent Files' }
                    ]
                }
            ]
        },
        {
            id: '5',
            label: 'Edit',
            children: [
                { id: '6', label: 'Copy' },
                { id: '7', label: 'Paste' }
            ]
        }
    ];

    return (
        <div className="p-8 space-y-8">
            <section>
                <h2 className="text-xl font-bold mb-4">File Explorer</h2>
                <TreeView node={fileSystemData} />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Comment Thread</h2>
                <CommentThread comment={commentData} />
            </section>

            <section>
                <h2 className="text-xl font-bold mb-4">Nested Menu</h2>
                <Menu items={menuData} />
            </section>
        </div>
    );
};

export default App;