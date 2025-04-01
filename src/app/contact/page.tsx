import React from "react";
import { offices } from "@/data/data";
const Contact = () => {
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
