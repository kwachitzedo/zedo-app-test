"use client";
import { useEffect, useState } from "react";
import TeamCard from "./team-card";

interface TeamMember {
	name: string;
	description: string;
	image: string;
}

const TeamCardSkeleton = () => {
	return (
		<div className="bg-white w-84 flex flex-col gap-2">
			<div className="w-full h-56 bg-gray-200 animate-pulse" />
			<div className="h-6 w-3/4 bg-gray-300 animate-pulse" />
			<div className="h-4 w-full bg-gray-300 animate-pulse" />
			<div className="h-4 w-full bg-gray-300 animate-pulse" />
		</div>
	);
};

export default function TeamData() {
	const [data, setData] = useState<TeamMember[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem("teamData");
		if (storedData) {
			setData(JSON.parse(storedData));
			return;
		}

		const fetchData = async () => {
			try {
				const response = await fetch("/api/team");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const fetchedData = await response.json();
				setData(fetchedData);
				localStorage.setItem("teamData", JSON.stringify(fetchedData));
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchData();
	}, []);

	if (error) return <p className="text-red-500">Error: {error}</p>;

	return (
		<div className="p-10 max-w-7xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">Our Team</h1>
			<div className="flex flex-wrap justify-between gap-16">
				{data
					? data.map((member, index) => (
							<TeamCard key={index} member={member} />
					  ))
					: Array.from({ length: 6 }).map((_, index) => (
							<TeamCardSkeleton key={index} />
					  ))}
			</div>
		</div>
	);
}
