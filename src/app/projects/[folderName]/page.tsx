"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

interface SingleImage {
	url: string;
}

function getYouTubeEmbedUrl(url: string): string {
	const regex =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = url.match(regex);

	if (match) {
		const videoId = match[1];
		return `https://www.youtube.com/embed/${videoId}`;
	}

	return ""; // If the URL doesn't match a valid YouTube URL
}

function getYouTubeVideoId(url: string): string | null {
	const regex =
		/(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/?([^"&?/ ]{11})))|(?:https?:\/\/(?:www\.)?youtu\.be\/([^"&?/ ]{11}))/;
	const match = url.match(regex);
	return match ? match[1] || match[2] : null;
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
		video_url_1: "",
		video_url_2: "",
		video_url_3: "",
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
				console.log("result", result);
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
				{visibleImages.slice(0, 3).map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden flex justify-start bg-white"
					>
						<Image
							className={`object-contain w-auto max-h-[90vh] max-w-full ${
								image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
									? "animate-pulse"
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
				{projectDetails.video_url_1 && (
					<div className="relative w-full pb-[56.25%]">
						<iframe
							src={`${getYouTubeEmbedUrl(
								projectDetails.video_url_1
							)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(
								projectDetails.video_url_1
							)}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="absolute top-0 left-0 w-full h-full"
						></iframe>
					</div>
				)}
				{visibleImages.slice(3, 4).map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden flex justify-start bg-white"
					>
						<Image
							className={`object-contain w-auto max-h-[90vh] max-w-full ${
								image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
									? "animate-pulse"
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
				{projectDetails.video_url_2 && (
					<div className="relative w-full pb-[56.25%]">
						<iframe
							src={`${getYouTubeEmbedUrl(
								projectDetails.video_url_2
							)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(
								projectDetails.video_url_2
							)}`}
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="absolute top-0 left-0 w-full h-full"
						></iframe>
					</div>
				)}
				{visibleImages.slice(4, 5).map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden flex justify-start bg-white"
					>
						<Image
							className={`object-contain w-auto max-h-[90vh] max-w-full ${
								image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
									? "animate-pulse"
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
				{projectDetails.video_url_3 && (
					<div className="relative w-full pb-[56.25%]">
						<iframe
							src={`${getYouTubeEmbedUrl(
								projectDetails.video_url_3
							)}?autoplay=1&mute=1&loop=1&playlist=${getYouTubeVideoId(
								projectDetails.video_url_3
							)}`}
							// Adding mute=1 to make sure autoplay works
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="absolute top-0 left-0 w-full h-full"
						></iframe>
					</div>
				)}
				{visibleImages.slice(5).map((image: SingleImage, index: number) => (
					<div
						key={index}
						className="overflow-hidden flex justify-start bg-white"
					>
						<Image
							className={`object-contain w-auto max-h-[90vh] max-w-full ${
								image.url === "https://dummyimage.com/1920x1080/cccccc/cccccc"
									? "animate-pulse"
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
