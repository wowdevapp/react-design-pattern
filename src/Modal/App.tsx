// types.ts
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

interface ConfirmModalProps extends ModalProps {
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

// components/Modal/BaseModal.tsx
import React, { useEffect } from 'react';

const BaseModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title
}) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
                        {/* Header */}
                        {title && (
                            <div className="border-b px-6 py-4">
                                <h3 className="text-lg font-semibold">{title}</h3>
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// components/Modal/ConfirmModal.tsx
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    children,
    title = 'Confirm Action',
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="space-y-4">
                <div className="text-gray-600">
                    {children}
                </div>

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded hover:bg-gray-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </BaseModal>
    );
};

// components/Modal/SlideOverModal.tsx
const SlideOverModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

            <div className="fixed inset-y-0 right-0 flex max-w-full">
                <div className={`w-screen max-w-md transform transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="h-full bg-white shadow-xl flex flex-col">
                        {/* Header */}
                        {title && (
                            <div className="border-b px-6 py-4 flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{title}</h3>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Usage Example
const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    const [isSlideOverOpen, setIsSlideOverOpen] = React.useState(false);

    return (
        <div className="p-8 space-y-4">
            <div className="space-x-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Open Basic Modal
                </button>

                <button
                    onClick={() => setIsConfirmOpen(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                >
                    Open Confirm Modal
                </button>

                <button
                    onClick={() => setIsSlideOverOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded"
                >
                    Open Slide Over
                </button>
            </div>

            {/* Basic Modal */}
            <BaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Basic Modal"
            >
                <p>This is a basic modal example.</p>
            </BaseModal>

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => console.log('Confirmed!')}
                title="Delete Item"
            >
                Are you sure you want to delete this item? This action cannot be undone.
            </ConfirmModal>

            {/* Slide Over Modal */}
            <SlideOverModal
                isOpen={isSlideOverOpen}
                onClose={() => setIsSlideOverOpen(false)}
                title="Slide Over Panel"
            >
                <p>This is a slide over panel that appears from the right side.</p>
            </SlideOverModal>
        </div>
    );
};

export default App;