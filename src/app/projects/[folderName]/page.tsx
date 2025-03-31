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
			url: "https://dummyimage.com/1920x1080/cccccc/cccccc",
		})
	);

	const [projectDetails, setProjectDetails] = useState({
		// projectName: folderName.replace(/\b\w/g, (char) => char.toUpperCase()),
		projectName: projectName,
		folderName: folderName,
		imageURL: "",
		location: "",
		description: "",
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(`/api/project/images/${folderName}`);
				if (!response.ok) throw new Error("Failed to fetch images");
				const result = await response.json();
				setImages(result.images || []);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred.");
				}
			}
		};

		const fetchProjectDetails = async () => {
			try {
				const response = await fetch(`/api/project/details/${folderName}`);
				if (!response.ok) throw new Error("Failed to fetch project details");
				const result = await response.json();
				if (result.projectDetails) setProjectDetails(result.projectDetails);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError("An unknown error occurred.");
				}
			}
		};

		fetchImages();
		fetchProjectDetails();
	}, [folderName]);

	return (
		<div className="mx-auto p-4 max-w-3xl">
			<div className=" font-bold text-left">
				<div className="text-2xl">{projectDetails.projectName}</div>
				<div className="text-sm">{projectDetails.location}</div>
				<div className="text-sm font-medium  text-left my-6">
					{projectDetails.description}
				</div>
			</div>
			<div className="gap-14 flex flex-col">
				{images.map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden  flex justify-start bg-white"
					>
						<Image
							className={`object-contain w-auto max-h-[90vh] max-w-full ${
								image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
									? "animate-ping"
									: ""
							}`}
							src={image.url}
							alt={`Image ${index + 1}`}
							width={1000}
							height={800}
							priority={index === 0}
							loading={index === 0 ? "eager" : "lazy"}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectGallery;
