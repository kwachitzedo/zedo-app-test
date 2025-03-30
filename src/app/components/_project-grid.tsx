// "use client"; // Ensure this is a client component

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import ProjectCard from "./project-card-homepage";

// export default function Gallery() {
// 	const [images, setImages] = useState<string[]>([]);
// 	const [loading, setLoading] = useState(true);

// 	useEffect(() => {
// 		fetch("/api/cloudinary")
// 			.then((res) => res.json())
// 			.then((data) => {
// 				setImages(data.images);
// 				setLoading(false);
// 			})
// 			.catch((err) => {
// 				console.error("Error fetching images:", err);
// 				setLoading(false);
// 			});
// 	}, []);

// 	return (
// 		<div className="flex ">
// 			{loading ? (
// 				<p>Be prepared to be amazed...</p>
// 			) : images.length > 0 ? (
// 				images.map((img, index) => (
// 					<div key={index} className="grid-item">
// 						<ProjectCard
// 							project={{
// 								image: img,
// 								"Project Name": `Project ${index + 1}`,
// 							}}
// 						/>
// 					</div>
// 				))
// 			) : (
// 				<p>No images found.</p>
// 			)}
// 		</div>
// 	);
// }
