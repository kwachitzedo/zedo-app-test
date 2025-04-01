"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card-homepage";

interface Project {
	imageURL: string;
	projectName: string;
	folderName: string;
}

export default function HomepageData() {
	const [data, setData] = useState<Project[]>(
		Array(6).fill({
			imageURL: "https://dummyimage.com/1920x1080/cccccc/cccccc",
			projectName: "",
			folderName: "",
		})
	);
	const [error, setError] = useState<string | null>(null);
	const [visibleCount, setVisibleCount] = useState(12); // Number of items to display initially

	useEffect(() => {
		const storedData = localStorage.getItem("homepageData");
		if (storedData) {
			setData(JSON.parse(storedData));
		} else {
			fetch("/api/homepage")
				.then((res) => res.json())
				.then((fetchedData) => {
					setData(fetchedData);
					localStorage.setItem("homepageData", JSON.stringify(fetchedData)); // Cache in localStorage
				})
				.catch((err) => setError(err.message));
		}
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 100 &&
				data &&
				visibleCount < data.length
			) {
				setVisibleCount((prevCount) => prevCount + 12); // Load 12 more items
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [data, visibleCount]);

	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div className="max-w-7xl mx-auto">
			<div className="lg:columns-2 gap-48 columns-1 p-4 md:p-0">
				{data.slice(0, visibleCount).map((project, index) => (
					<ProjectCard key={index} project={project} />
				))}
			</div>
		</div>
	);
}
