'use client';

import { useState } from 'react';
import CardProject from './CardProject';
import AnimationContainer from '../utils/AnimationContainer';
import { CardProjectProps } from '@/types';

const allProjectsInfo = [
	{
		id: '1',
		title: 'The Future of Energy in Thailand.',
		des: 'Our commitment to green energy is paving the way for a cleaner, healthier planet. Join us on a journey towards a future where clean, renewable energy sources transform the way we power our lives.',
		category: 'typescript',
		repo: '',
		link: 'https://www.gridtokenx.com',
	},
];

const SearchAllProjects = () => {
	const [projectSearch, setProjectSearch] = useState<string>('');

	const resultSearch: CardProjectProps[] = allProjectsInfo.filter((project) =>
		project.category.includes(projectSearch.toLowerCase())
	);

	return (
		<>
			<AnimationContainer customClassName="w-full group flex flex-col justify-center items-center mb-8">
				<div className="flex items-center w-full h-12 transition-all bg-gray-900/70 border border-primary-800/20 rounded-lg shadow-lg lg:w-full group-hover:border-primary-700/50 ease-in-out duration-300">
					<div className="grid w-12 h-full text-primary-400 place-items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="1"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>

					<input
						className="w-full h-full px-2 text-sm text-white transition-all bg-transparent rounded outline-none peer focus:border-primary-500 ease"
						type="text"
						id="search"
						placeholder="Languages, frameworks, libraries, etc..."
						onChange={(e) => setProjectSearch(e.target.value)}
					/>
				</div>
			</AnimationContainer>

			<article className="flex flex-wrap items-center content-center justify-center w-full gap-6 mx-auto">
				{resultSearch.map(({ id, title, des, category, repo, link }) => (
					<CardProject
						key={id}
						title={title}
						des={des}
						category={category}
						repo={repo}
						link={link}
					/>
				))}
			</article>
		</>
	);
};

export default SearchAllProjects;
