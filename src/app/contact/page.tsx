import React from "react";
import { offices } from "@/data/data";
const Contact = () => {
	return (
		<div className="max-w-5xl mx-auto space-y-6 sm:p-0 p-4">
			<div className=" pl-3 border-l">
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
			<div className="flex justify-between flex-wrap  gap-12">
				{offices.map((office) => (
					<Office office={office} />
				))}
			</div>
		</div>
	);
};

type OfficeType = {
	city: string;
	contact: string;
	address1: string;
	address2: string;
	address3: string;
	address4: string;
};

const Office = ({ office }: { office: OfficeType }) => {
	return (
		<div className="pl-3 border-l border-gray-400">
			<div className="text-xl font-bold">{office.city}</div>
			<div className="font-semibold">{office.contact}</div>
			<div className="text-sm">{office.address1}</div>
			<div className="text-sm">{office.address2}</div>
			<div className="text-sm">{office.address3}</div>
			<div className="text-sm">{office.address4}</div>
		</div>
	);
};

export default Contact;
