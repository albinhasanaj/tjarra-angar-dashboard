"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface ContentBlock {
    type: "text" | "image";
    content: string;
    file?: File;
}

const Create: React.FC = () => {
    const [input, setInput] = useState<string>("");
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
    const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
    const [currentText, setCurrentText] = useState<string>("");
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        setIsIncorrect(false);
    };

    const handleAccess = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const correctPassword = "joel";
        if (input === correctPassword) {
            setIsAuthorized(true);
            setIsIncorrect(false);
        } else {
            setIsIncorrect(true);
        }
    };

    const handleAddTextBlock = () => {
        if (currentText.trim() !== "") {
            setContentBlocks([...contentBlocks, { type: "text", content: currentText }]);
            setCurrentText("");
        }
    };

    const handleAddImageBlock = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setContentBlocks([...contentBlocks, { type: "image", content: reader.result as string, file }]);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = "";
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        const name = (e.currentTarget.elements.namedItem("name") as HTMLSelectElement).value;
        const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
        const date = (e.currentTarget.elements.namedItem("date") as HTMLInputElement).value;

        formData.append("name", name);
        formData.append("title", title);
        formData.append("date", date);

        const contentBlocksWithoutFiles = contentBlocks.map((block) => {
            if (block.type === "image") {
                return { type: block.type, content: "" };
            }
            return block;
        });
        formData.append("contentBlocks", JSON.stringify(contentBlocksWithoutFiles));

        contentBlocks.forEach((block, index) => {
            if (block.type === "image" && block.file) {
                formData.append(`image_${index}`, block.file);
            }
        });

        try {
            const response = await fetch("/api/create-task", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                router.push("/");
                toast.success("Task created successfully");
            } else {
                console.error("Error creating task");
                toast.error("Error creating task");
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    };

    return (
        <div className="mx-auto">
            {!isAuthorized ? (
                <div className="mt-40 flex flex-col items-center max-w-xl mx-auto">
                    <label htmlFor="password" className="block text-lg font-medium text-white mb-4">
                        Enter Password for Access:
                    </label>
                    <div>
                        <form onSubmit={handleAccess} className="flex">
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password here..."
                                value={input}
                                onChange={handleInputChange}
                                className="border p-2 w-80 bg-gray-700 text-white"
                            />
                            <button type="submit" className="bg-secondary text-black px-4 py-2 ml-2">
                                Access
                            </button>
                        </form>
                        {isIncorrect && <p className="text-red-500 text-lg mt-2">Incorrect password. Access denied!</p>}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="mt-16 max-w-xl mx-auto px-5">
                        <h3 className="text-white text-2xl mb-5">Create Task</h3>
                    </div>
                    <div>
                        <form className="my-10 max-w-xl mx-auto px-5" onSubmit={handleSubmit}>
                            <label htmlFor="name" className="block text-white text-lg">
                                Name
                            </label>
                            <select id="name" name="name" className="border p-2 w-full bg-gray-700 text-white mt-2">
                                <option value="">Select a name</option>
                                <option value="Albin">Albin</option>
                                <option value="Marcus">Marcus</option>
                                <option value="Simon">Simon</option>
                                <option value="Elias">Elias</option>
                                <option value="Jim">Jim</option>
                                <option value="Oscar">Oscar</option>
                                <option value="Leo">Leo</option>
                                <option value="Axel">Axel</option>
                            </select>

                            <label htmlFor="title" className="block text-white text-lg mt-4">
                                Title
                            </label>
                            <input type="text" id="title" name="title" className="border p-2 w-full bg-gray-700 text-white mt-2" />

                            <label htmlFor="date" className="block text-white text-lg mt-4">
                                Date
                            </label>
                            {/* default date to today */}
                            <input type="date" id="date" name="date" className="border p-2 w-full bg-gray-700 text-white mt-2" defaultValue={new Date().toISOString().split("T")[0]} />

                            <label className="block text-white text-lg mt-4">Content</label>
                            <div className="border p-4 w-full bg-gray-800 mt-2 rounded">
                                {contentBlocks.map((block, index) => (
                                    <div key={index} className="my-4">
                                        {block.type === "text" && <p className="text-white whitespace-pre-wrap">{block.content}</p>}
                                        {block.type === "image" && (
                                            <img src={block.content} alt={`Uploaded ${index}`} className="max-w-full rounded" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <textarea
                                value={currentText}
                                onChange={(e) => setCurrentText(e.target.value)}
                                className="border p-2 w-full h-28 mt-4 bg-gray-700 text-white"
                                placeholder="Enter text here..."
                            ></textarea>
                            <button
                                type="button"
                                onClick={handleAddTextBlock}
                                className='bg-secondary text-black px-4 py-2 mt-2'
                            >
                                Add Text
                            </button>

                            {/* Input for adding image */}
                            <label htmlFor="image" className='block text-white text-lg mt-6'>Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                className='border p-2 w-full text-white cursor-pointer bg-gray-700 mt-2'
                                accept="image/*"
                                onChange={handleAddImageBlock}
                            />

                            <button type="submit" className='bg-secondary text-black px-6 py-2 mt-6'>Create</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Create
