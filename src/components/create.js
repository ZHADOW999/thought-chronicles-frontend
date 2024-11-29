import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Dropzone from 'react-dropzone';
import axios from 'axios';

const EnhancedEditor = () => {
    const [title, setTitle] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [isAutosaving, setIsAutosaving] = useState(false);

    // Initialize TipTap editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Placeholder.configure({
                placeholder: 'Tell your story...',
            }),
        ],
        content: localStorage.getItem('blogContent') || '',
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            localStorage.setItem('blogContent', html);
        },
    });

    // Handle drag-and-drop image upload
    const handleDrop = (acceptedFiles) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                editor.chain().focus().setImage({ src: reader.result }).run();
            };
            reader.readAsDataURL(file);
            setImageFiles((prev) => [...prev, file]);
        });
    };

    // Autosave functionality
    useEffect(() => {
        const autosave = setInterval(() => {
            setIsAutosaving(true);
            const content = editor?.getHTML();
            localStorage.setItem('blogContent', content);
            setTimeout(() => setIsAutosaving(false), 1000);
        }, 5000); // Save every 5 seconds

        return () => clearInterval(autosave);
    }, [editor]);

    // Submit blog
    const handleSubmit = async () => {
        if (!title.trim() || !editor.getHTML().trim()) {
            alert('Please provide a title and content.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', editor.getHTML());

        imageFiles.forEach((file, index) => {
            formData.append(`images[${index}]`, file);
        });

        try {
            const response = await axios.post('https://tc.a.7o7.cx/api/blogs', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                alert('Blog published successfully!');
                setTitle('');
                editor.commands.setContent('');
                setImageFiles([]);
                localStorage.removeItem('blogContent');
            }
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('Failed to submit blog.');
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            {/* Title Input */}
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    className="w-full text-4xl font-bold focus:outline-none border-b border-gray-300 mb-4 p-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/* Dropzone for Drag-and-Drop Image Upload */}
            <Dropzone onDrop={handleDrop}>
                {({ getRootProps, getInputProps }) => (
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-gray-400 p-4 rounded-lg cursor-pointer mb-4"
                    >
                        <input {...getInputProps()} />
                        <p>Drag & drop an image here, or click to select one.</p>
                    </div>
                )}
            </Dropzone>

            {/* Content Editor */}
            <EditorContent
                editor={editor}
                className="border rounded p-4 min-h-[300px] focus:outline-none"
            />

            {/* Toolbar */}
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-2 border rounded ${
                        editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-100'
                    }`}
                >
                    Bold
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-2 border rounded ${
                        editor.isActive('heading', { level: 1 })
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100'
                    }`}
                >
                    H1
                </button>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="block w-full bg-blue-500 text-white font-semibold p-3 rounded"
            >
                Publish
            </button>

            {/* Autosave Status */}
            {isAutosaving && <p className="text-gray-500 text-sm mt-2">Autosaving...</p>}
        </div>
    );
};

export default EnhancedEditor;
