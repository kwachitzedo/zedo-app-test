"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import ProjectCard from "./project-card-homepage";

interface Project {
	imageURL: string;
	projectName: string;
	folderName: string;
	location: string;
	description: string;
	tags: string;
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
	const [visibleCount, setVisibleCount] = useState(12);
	const [selectedTag, setSelectedTag] = useState("Featured");

	// Fetch and cache data
	useEffect(() => {
		const loadData = async () => {
			try {
				const storedData = localStorage.getItem("homepageData");
				if (storedData) {
					setData(JSON.parse(storedData));
				} else {
					const res = await fetch("/api/homepage");
					const fetchedData = await res.json();
					setData(fetchedData);
					localStorage.setItem("homepageData", JSON.stringify(fetchedData));
				}
			} catch (err: any) {
				setError(err.message || "Failed to load data");
			}
		};
		loadData();
	}, []);

	// Filtered data based on selected tag
	const filteredData = useMemo(() => {
		if (selectedTag === "All") return data;
		return data.filter((item) =>
			item.tags
				?.split(",")
				.map((tag) => tag.trim())
				.includes(selectedTag)
		);
	}, [data, selectedTag]);

	// Infinite scroll logic
	useEffect(() => {
		const handleScroll = () => {
			const nearBottom =
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
			if (nearBottom && visibleCount < filteredData.length) {
				setVisibleCount((prev) => prev + 6);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [filteredData.length, visibleCount]);

	// Extract unique tags
	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		data.forEach((item) => {
			item.tags?.split(",").forEach((tag) => {
				if (tag.trim()) tagSet.add(tag.trim());
			});
		});
		return ["Featured", "All", ...Array.from(tagSet)];
	}, [data]);

	return (
		<div className="max-w-7xl mx-auto">
			<FilterSection
				allTags={allTags}
				selectedTag={selectedTag}
				onTagChange={setSelectedTag}
			/>
			<div className="flex flex-wrap gap-4 p-2 md:p-2 lg:p-1 justify-between items-center">
				{filteredData.slice(0, visibleCount).map((project, index) => (
					<div key={index} className="w-full md:w-[48%] lg:w-fit">
						<ProjectCard project={project} />
					</div>
				))}
				{!filteredData.length && (
					<p className="text-center w-full text-gray-500 py-10">
						No projects found.
					</p>
				)}
			</div>
			{error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}
		</div>
	);
}

interface FilterSectionProps {
	allTags: string[];
	selectedTag: string;
	onTagChange: (tag: string) => void;
}

const FilterSection = ({
	allTags,
	selectedTag,
	onTagChange,
}: FilterSectionProps) => {
	return (
		<div className="flex flex-wrap gap-2 p-4 bg-gray-50 mb-4">
			{allTags.map((tag) => (
				<button
					key={tag}
					onClick={() => onTagChange(tag)}
					className={`px-4 py-2 border-b-4 transition duration-200 ${
						selectedTag === tag
							? "border-red-700 text-red-700 font-semibold"
							: "border-transparent hover:border-gray-300"
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
};
