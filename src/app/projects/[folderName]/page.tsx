"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

interface SingleImage {
	url: string;
}

const ProjectGallery = () => {
	const { folderName } = useParams<{ folderName: string }>();
	const searchParams = useSearchParams();
	const projectName = searchParams.get("name");
	const [images, setImages] = useState(
		Array(7).fill({
			url: "https://dummyimage.com/300x200/cccccc/cccccc",
		})
	);

	const [projectDetails, setProjectDetails] = useState({
		// projectName: folderName.replace(/\b\w/g, (char) => char.toUpperCase()),
		projectName: projectName,
		folderName: folderName,
		imageURL: "",
		location: "India",
	});

	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(`/api/project/images/${folderName}`);
				if (!response.ok) throw new Error("Failed to fetch images");
				const result = await response.json();
				setImages(result.images || []);
			} catch (err) {
				setError(err.message);
			}
		};

		const fetchProjectDetails = async () => {
			try {
				const response = await fetch(`/api/project/details/${folderName}`);
				if (!response.ok) throw new Error("Failed to fetch project details");
				const result = await response.json();
				if (result.projectDetails) setProjectDetails(result.projectDetails);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchImages();
		fetchProjectDetails();
	}, [folderName]);

	return (
		<div className="mx-auto p-4">
			<div className=" font-bold text-center mb-4">
				<div className="text-2xl">{projectDetails.projectName}</div>
				<div className="text-xs">{projectDetails.location}</div>
			</div>
			<div className="gap-14 flex flex-col">
				{images.map((image: SingleImage, index: number) => (
					<div key={index} className="overflow-hidden mx-auto">
						<Image
							className="object-cover"
							src={image.url}
							alt={`Image ${index + 1}`}
							width={1000}
							height={800}
							priority={index === 0}
							loading={index === 0 ? "eager" : "lazy"}
							// placeholder="blur"
							// blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
							// 	'<svg width="1000" height="800" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#e2e8f0"/></svg>'
							// ).toString("base64")}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectGallery;
