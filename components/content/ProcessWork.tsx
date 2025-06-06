import AnimationContainer from '../utils/AnimationContainer';

const myWorkProcess = [
	{
		id: '1',
		title: 'Meeting',
		des: 'The first step is to hold a meeting to learn about your expectations, objectives and project requirements. It is important to discuss the scope of the project, the resources required and the project delivery schedule.',
		delay: 0.3,
	},
	{
		id: '2',
		title: 'Prototyping',
		des: 'With the action plan already defined, the web designs are made. Through Figma, mockups will be presented so that you have an image of what will be your website with the chosen colors and fonts, adapted for all devices and prioritizing usability.',
		delay: 0.4,
	},
	{
		id: '3',
		title: 'SEO and content',
		des: 'The next step is to implement an SEO and content strategy to help improve a website´s visibility in search engine results, which can generate more traffic and improve the quality of visitors.In addition, a well- structured content strategy can also contribute to better and longer - lasting results.',
		delay: 0.5,
	},
	{
		id: '4',
		title: 'Development phase',
		des: 'Once the design has been approved, the layout will be designed in the test environment and all the functionalities will be implemented so that the website takes shape. In the case that a website with SEO and content has been contracted, they will also be applied in this phase.',
		delay: 0.6,
	},
	{
		id: '5',
		title: 'Test phase',
		des: 'You want a beautiful website, but you also want it to work perfectly, so in this phase we do all kinds of tests to make sure it´s fast, accessible, intuitive, secure, with a good responsive design, etc.',
		delay: 0.7,
	},
	{
		id: '6',
		title: 'Migration',
		des: 'You are done. Congratulations, you have a website created by me. You will also have the option to hire my web maintenance service, so that it is always updated and ready.',
		delay: 0.8,
	},
];

const ProcessWork = () => {
	return (
		<AnimationContainer>
			<div className="w-full mb-8">
				<h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-6 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
					My work process
				</h2>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
					{myWorkProcess.map(({ id, title, des, delay }) => (
						<AnimationContainer
							key={id}
							customClassName="rounded-xl border border-primary-800/20 bg-gray-900/50 p-5 shadow-lg hover:shadow-xl transition-all duration-300 ease"
							customDelay={delay}
						>
							<h3 className="font-bold text-xl tracking-tight text-white text-start mb-3">
								{title}
							</h3>

							<p className="text-base text-gray-300 leading-relaxed">
								{des}
							</p>
						</AnimationContainer>
					))}
				</div>
			</div>
		</AnimationContainer>
	);
};

export default ProcessWork;
