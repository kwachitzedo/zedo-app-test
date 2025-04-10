"use client";
import { useEffect, useMemo, useState } from "react";
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
	const [visibleCount, setVisibleCount] = useState(12); // Number of items to display initially
	const [selectedTag, setSelectedTag] = useState("Featured");

	const filteredData = useMemo(() => {
		if (selectedTag === "All") return data;
		return data.filter((item) =>
			item.tags
				?.split(",")
				.map((tag) => tag.trim())
				.includes(selectedTag)
		);
	}, [data, selectedTag]);

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
					document.body.offsetHeight - 300 &&
				data &&
				visibleCount < filteredData.length
			) {
				setVisibleCount((prevCount) => prevCount + 6); // Load 6 more items
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [filteredData, visibleCount]);

	const allTags: string[] = useMemo<string[]>(() => {
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
				setSelectedTag={setSelectedTag}
			/>
			<div className="flex flex-wrap gap-4 p-2 md:p-2 lg:p-1 justify-between 	items-center">
				{filteredData.slice(0, visibleCount).map((project, index) => (
					<div key={index} className="w-full md:w-[48%] lg:w-fit">
						<ProjectCard project={project} />
					</div>
				))}
			</div>
		</div>
	);
}

interface FilterSectionProps {
	allTags: string[];
	selectedTag: string;
	setSelectedTag: (tag: string) => void;
}

const FilterSection = ({
	allTags,
	selectedTag,
	setSelectedTag,
}: FilterSectionProps) => {
	return (
		<div className="flex flex-wrap gap-2 p-4 bg-gray-50 mb-4">
			{allTags.map((tag) => (
				<button
					key={tag}
					onClick={() => setSelectedTag(tag)}
					className={`px-4 py-2 border-b-4 ${
						selectedTag === tag
							? "border-red-700"
							: "border-transparent hover:border-gray-200"
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
};
