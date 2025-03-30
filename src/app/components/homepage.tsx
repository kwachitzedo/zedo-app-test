"use client";
import { useEffect, useState } from "react";
import ProjectCard from "./project-card-homepage";

interface Project {
	imageURL: string;
	projectName: string;
	folderName: string;
}

export default function HomepageData() {
	const [data, setData] = useState<Project[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem("homepageData");
		if (storedData) {
			setData(JSON.parse(storedData));
			// return;
		}

		fetch("/api/homepage")
			.then((res) => res.json())
			.then((fetchedData) => {
				setData(fetchedData);
				localStorage.setItem("homepageData", JSON.stringify(fetchedData)); // Cache in localStorage
			})
			.catch((err) => setError(err.message));
	}, []);

	if (error) return <p className="text-red-500">Error: {error}</p>;
	if (!data) return <p>Loading...</p>;

	return (
		<div className="p--10 max-w-7xl mx-auto ">
			<h1 className="text-2xl font-bold mb-4">Homepage Projects</h1>
			<div className="lg:columns-2 gap-36 columns-1 p-4 md:p-0">
				{data.map((project, index) => (
					<ProjectCard key={index} project={project} />
				))}
			</div>
		</div>
	);
}
