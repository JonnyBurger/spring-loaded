import {Composition} from 'remotion';
import {Logo} from './Logo';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="logo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={700}
				height={700}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
		</>
	);
};
