import React, {useEffect, useRef, useState} from 'react';
import {
	continueRender,
	delayRender,
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

type Data = {
	oneLength: number;
	twoLength: number;
	onePoints: DOMPoint[];
	twoPoints: DOMPoint[];
};

// The tracing is pretty bad - this just averages each point with the points before and after
// to smoothen it a bit
const smoothPoints = (points: DOMPoint[], smoothinFactor: number) => {
	return points.map((p, i) => {
		const all = new Array(smoothinFactor)
			.fill(1)
			.map((p, j) => points[i + j - smoothinFactor / 2]);
		const allX = all.filter(Boolean).map((a) => a.x);
		const allY = all.filter(Boolean).map((a) => a.y);
		return {
			...p,
			x: allX.reduce((a, b) => a + b, 0) / allX.length,
			y: allY.reduce((a, b) => a + b, 0) / allY.length,
		};
	});
};

// Defining colors of the strokes
const logoColors = ['#037a95', '#88c8a3'].reverse();

const colors = [
	'#a9d15f',
	'#f3d805',
	'#f5a41c',
	'#f58f69',
	'#ee4b3a',
	'#f591a5',
	'#aa6abe',
	'#5453bb',
	'#4e82d8',
	'#76b3e9',
].reverse();

export const Logo: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	// Do not render until points are fetched
	const [handle] = useState(() => delayRender());
	const [data, setData] = useState<Data | null>(null);
	const path1 = useRef<SVGPathElement>(null);
	const path2 = useRef<SVGPathElement>(null);

	useEffect(() => {
		// Fetch the length and make an array of points. If length = 1000, we make 1000 points
		const path1Current = path1.current;
		const path2Current = path2.current;
		if (!path1Current || !path2Current) {
			return;
		}
		const oneLength = Math.floor(path1Current.getTotalLength());
		const twoLength = Math.floor(path2Current.getTotalLength());
		const data = {
			oneLength,
			twoLength,
			onePoints: smoothPoints(
				new Array(oneLength)
					.fill(true)
					.map((_, i) => path1Current.getPointAtLength(i) as DOMPoint)
					.reverse(),
				30
			),
			twoPoints: smoothPoints(
				new Array(twoLength)
					.fill(true)
					.map((_, i) => path2Current.getPointAtLength(i) as DOMPoint),
				30
			),
		};
		setData(data);

		continueRender(handle);
	}, [handle]);

	const toRender: {
		points: DOMPoint[];
		colors: string[];
		maxStrokeWidth: number;
		progress: number;
	}[] = data
		? [
				{
					points: data.onePoints,
					colors,
					maxStrokeWidth: 32,
					// Apple's animation doesn't end so slowly, so we cap the spring at around
					// 95% of the progress to make it end more suddenly
					progress: interpolate(
						spring({
							frame: frame - 20,
							fps,
							config: {
								mass: 15,
								damping: 200,
							},
						}),
						[0, 0.95],
						[0, 1]
					),
				},
				{
					points: data.twoPoints,
					colors: logoColors,
					maxStrokeWidth: 22,
					progress: interpolate(
						spring({
							frame: frame - 10,
							fps,
							config: {
								mass: 1,
								damping: 200,
							},
						}),
						[0, 0.95],
						[0, 1]
					),
				},
		  ]
		: [];

	return (
		<div
			style={{
				backgroundColor: 'white',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flex: 1,
			}}
		>
			<div style={{width: 382, height: 455}}>
				{/**
				 * Just traced with Sketch and directly copied in here
				 */}
				<svg
					width="382px"
					height="455px"
					viewBox="0 0 382 455"
					style={{position: 'absolute'}}
				>
					<g fill="none">
						<g id="Group" transform="translate(13.389547, 10.000000)">
							<path
								ref={path1}
								d="M154.610453,134 L145.610453,127 L137.610453,123 L126.610453,120 L115.610453,119 L104.610453,119 L88.6104526,122 L76.6104526,125 L64.6104526,130 L54.6104526,136 L46.6104526,142 L38.6104526,149 L31.6104526,157 L25.6104526,165 L21.6104526,172 L16.6104526,180 L11.6104526,189 L6.61045265,203 L4.61045265,214 L3.61045265,227 L2.61045265,238 L3.61045265,249 L6.61045265,260 L12.6104526,272 L21.6104526,284 L33.6104526,296 L49.6104526,304 L65.6104526,308 L86.6104526,309 L110.610453,308 L130.610453,303 L157.610453,295 L186.610453,283 L209.610453,272 L234.610453,257 L253.610453,243 L272.610453,228 L293.610453,209 L310.610453,186 L317.610453,167 L318.610453,147 L313.610453,137 L304.610453,130 L289.610453,126 L265.610453,127 L240.610453,136 L209.610453,151 L195.610453,161 L179.610453,172 L162.610453,185 L149.610453,195 L137.610453,206 L125.610453,218 L112.610453,232 L98.6104526,248 L88.6104526,262 L80.6104526,274 L72.6104526,287 L64.6104526,300 L54.6104526,318 L49.6104526,338 L46.6104526,356 L47.6104526,375 L50.6104526,387 L54.6104526,400 L64.6104526,413 L79.6104526,425 L98.6104526,433 L121.610453,435 L145.610453,434 L167.610453,430 L187.610453,423 L206.610453,415 L227.610453,405 L246.610453,393 L262.610453,382 L277.610453,370 L288.610453,359 C291.497716,355.59476 294.164383,352.261427 296.610453,349 C299.056523,345.738573 301.389856,342.40524 303.610453,339 L306.610453,328 L306.610453,316 L303.610453,304 L297.610453,295 L289.610453,290 L280.610453,289 L267.610453,290 L255.610453,295 L243.610453,303 L231.610453,312 L221.610453,321 L212.610453,330 L203.610453,342 L196.610453,357 L193.610453,367 L191.610453,383 L191.610453,396 L194.610453,409 L202.610453,422 L217.610453,435 L232.610453,440 L250.610453,442 L269.610453,440 L286.610453,434 L301.610453,426 L315.610453,415 L325.610453,404 L333.610453,393 L341.610453,380 L347.610453,366 L351.610453,352 L352.610453,338 L352.610453,320"
								id="Path"
								strokeWidth="24"
							/>
							<path
								ref={path2}
								d="M178.610453,104 L200.610453,100 L212.610453,95 L235.610453,79 L252.610453,58 L262.610453,34 L266.610453,17 L265.610453,0 L238.610453,6 L213.610453,20 C208.943786,24 205.277119,27.3333333 202.610453,30 C199.943786,32.6666667 197.943786,35.3333333 196.610453,38 L189.610453,50 L181.610453,65 L178.610453,80 L177.610453,96 L179.610453,116"
								id="Path-2"
								strokeWidth="19"
							/>
						</g>
					</g>
				</svg>
				{toRender.map((set) => {
					return (
						<div style={{position: 'absolute'}}>
							{set.points.map((point, i) => {
								const pointInRange =
									(set.points.length - i) / set.points.length;
								// Determine if point should be visible based on spring progress
								const visible = pointInRange < set.progress;
								// The tip of the animation is always slightly bigger, scale it up a bit
								const difference = Math.abs(pointInRange - set.progress);
								const scaleBonus =
									interpolate(difference, [0, 0.01, 0.2], [0.3, 0.2, 0], {
										extrapolateRight: 'clamp',
									}) *
									// As the animation stops, stop the tip scaling
									interpolate(set.progress, [0.9, 1], [1, 0], {
										extrapolateLeft: 'clamp',
										extrapolateRight: 'clamp',
									});
								if (!visible) {
									return null;
								}
								// At both ends, the stroke should be a bit thinner.
								const strokeWidth =
									interpolate(
										i / set.points.length,
										[0, 0.15, 0.85, 1],
										[18, set.maxStrokeWidth, set.maxStrokeWidth, 18]
									) *
									(1 + scaleBonus);
								return (
									<div
										style={{
											height: strokeWidth,
											// For smoothing, apply a little bit of blur, but
											// only while rendering, otherwise performance is even more horrible
											filter:
												process.env.NODE_ENV === 'production'
													? 'blur(1px)'
													: undefined,
											width: strokeWidth,
											borderRadius: strokeWidth / 2,
											// New interpolateColors() API!
											backgroundColor: interpolateColors(
												i,
												// Makes an array like [0, 0.1, 0.2, ..., 1]
												new Array(set.colors.length)
													.fill(1)
													.map(
														(_, i) =>
															(set.points.length * i) / (set.colors.length - 1)
													),
												set.colors
											),
											position: 'absolute',
											left: point.x - strokeWidth / 2,
											top: point.y - strokeWidth / 2,
										}}
									/>
								);
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
};
