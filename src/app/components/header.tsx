"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const listOfMenu = ["Home", "Studio", "Team", "Services", "Contact"];

	return (
		<header className=" h-[150px] flex items-center justify-between p-4">
			<div className="mx-auto  w-full max-w-7xl px-4 lg:px-0">
				<div className="flex h-auto items-center justify-between ">
					<div className="flex-1 md:flex md:items-center md:gap-12">
						<Link className="block text-teal-600" href="/">
							<span className="sr-only">Home</span>
							<div className="flex items-center ">
								<Image
									src="/logo.jpg"
									alt="Logo"
									width={70}
									height={100}
									className="object-contain"
								/>
							</div>
						</Link>
					</div>

					<div className="md:flex md:items-center md:gap-12">
						<nav aria-label="Global" className="hidden md:block">
							<ul className="flex items-center gap-6 text-sm">
								{listOfMenu.map((item) => (
									<li key={item}>
										<Link
											className="text-gray-500 transition hover:text-gray-500/75"
											href={`${
												item === "Home" ? "/" : `/${item.toLowerCase()}`
											}`}
										>
											{item}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="block md:hidden">
							<button
								onClick={toggleMenu}
								className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth="2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Sidebar Drawer */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50"
					onClick={toggleMenu}
				></div>
			)}
			<div
				className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<button
					onClick={toggleMenu}
					className="absolute top-4 right-4 text-gray-600"
				>
					&times;
				</button>
				<nav className="p-6">
					<ul className="space-y-4 text-gray-700">
						{listOfMenu.map((item) => (
							<li key={item}>
								<Link
									className="block px-4 py-2 rounded-md hover:bg-gray-100"
									href={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
									onClick={toggleMenu}
								>
									{item}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
