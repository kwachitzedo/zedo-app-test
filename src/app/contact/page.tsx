"use client";
import React, { useEffect, useState } from "react";
import { offices as oldData } from "@/data/data";

type OfficeType = {
	city: string;
	contact: string;
	address1: string;
	address2: string;
	address3: string;
	address4: string;
};
const Contact = () => {
	const [data, setData] = useState<OfficeType[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const storedData = localStorage.getItem("officeData");
		if (storedData) {
			setData(JSON.parse(storedData));
			return;
		}

		const fetchData = async () => {
			try {
				const response = await fetch("/api/contact");
				if (!response.ok) {
					throw new Error("Failed to fetch data");
				}
				const fetchedData = await response.json();
				setData(fetchedData);
				localStorage.setItem("officeData", JSON.stringify(fetchedData));
			} catch (err) {
				setError((err as Error).message);
			}
		};

		fetchData();
	}, []);

	if (error) return <p className="text-red-500">Error: {error}</p>;

	const offices = data || oldData;
	return (
		<div className="max-w-5xl mx-auto  lg:p-0 p-4">
			<div className=" pl-3 border-l mb-16">
				<div>
					<a href="mailto:info@zedodesigners.com" className="hover:underline">
						Email Address: info@zedodesigners.com
					</a>
				</div>
				<div>
					<a href="tel:+919033400306" className="hover:underline">
						Contact Us: +91 903 340 0306
					</a>
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 space-y-16">
				{offices.map((office, idx) => (
					<Office key={idx} office={office} />
				))}
			</div>
		</div>
	);
};

const Office = ({ office }: { office: OfficeType }) => {
	return (
		<div className="pl-3 border-l border-gray-400 flex flex-col  h-36">
			<div className="text-xl font-bold mb-2">{office.city}</div>
			<div className="font-semibold">{office.contact}</div>
			<div className="text-sm">{office.address1}</div>
			<div className="text-sm">{office.address2}</div>
			<div className="text-sm">{office.address3}</div>
			<div className="text-sm">{office.address4}</div>
		</div>
	);
};

export default Contact;
