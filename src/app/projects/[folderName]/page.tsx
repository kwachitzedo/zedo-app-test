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

	const [allImages, setAllImages] = useState<SingleImage[]>([]);
	const [visibleImages, setVisibleImages] = useState(
		Array(6).fill({
			url: "https://dummyimage.com/1920x1080/cccccc/cccccc",
		})
	);

	const [projectDetails, setProjectDetails] = useState({
		projectName: projectName,
		folderName: folderName,
		imageURL: "",
		location: "",
		description: "",
	});
	const [error, setError] = useState<string | null>(null);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await fetch(`/api/project/images/${folderName}`);
				if (!response.ok) throw new Error("Failed to fetch images");
				const result = await response.json();
				setAllImages(result.images || []);
				setVisibleImages(result.images.slice(0, 6)); // Load the first 6 images
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

	const loadMoreImages = () => {
		if (!hasMore) return;

		const currentLength = visibleImages.length;
		const nextImages = allImages.slice(currentLength, currentLength + 6);

		setVisibleImages((prev) => [...prev, ...nextImages]);

		if (currentLength + nextImages.length >= allImages.length) {
			setHasMore(false); // No more images to load
		}
	};

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100
			) {
				loadMoreImages();
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [visibleImages, allImages]);

	return (
		<div className="mx-auto p-4 max-w-3xl">
			<div className="font-bold text-left">
				<div className="text-2xl">{projectDetails.projectName}</div>
				<div className="text-sm">{projectDetails.location}</div>
				<div className="text-sm font-medium text-left my-6">
					{projectDetails.description}
				</div>
			</div>
			<div className="gap-14 flex flex-col">
				{visibleImages.map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden flex justify-start bg-white"
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
