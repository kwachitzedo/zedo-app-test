"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageData {
	url: string;
	name: string;
}

export default function Gallery() {
	const [images, setImages] = useState<ImageData[]>(
		Array(6).fill({
			url: "https://dummyimage.com/1920x1080/cccccc/cccccc",
		})
	);
	console.log("images", images);

	useEffect(() => {
		fetch("/api/studio") // Calls the Next.js API route
			.then((res) => res.json())
			.then((data) => {
				// Sort images by name before setting state
				const sortedImages = data.sort((a: ImageData, b: ImageData) =>
					a.name.localeCompare(b.name)
				);
				setImages(sortedImages);
			})
			.catch((error) => console.error("Error fetching images:", error));
	}, []);

	return (
		<div className="flex  flex-col gap-4 mx-auto p-4 max-w-4xl">
			{images.map((image, index) => (
				<Image
					width={1000}
					height={800}
					key={index}
					src={image.url}
					alt={image.name}
					className={`object-contain w-auto max-h-[90vh] max-w-full ${
						image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
							? "animate-pulse"
							: ""
					}`}
				/>
			))}
		</div>
	);
}
