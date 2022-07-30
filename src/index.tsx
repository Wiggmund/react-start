import React from 'react';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(
	document.getElementById('root') as Element
);

interface ClockProps {
	date: Date
}

class Clock extends React.Component<unknown, ClockProps>	{
	timeId: NodeJS.Timer | {} = {};
	constructor(props: unknown) {
		super(props);
		this.state = {date: new Date()};
	}
	componentDidMount() {
		this.timeId = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.timeId as NodeJS.Timeout);
	}
	tick() {
		this.setState({
			date: new Date()
		});
	}
	render() {
		return (
			<div>
				<h1>Hello</h1>
				<h2>It is {this.state.date.toLocaleTimeString()}</h2>
			</div>
		);
	}
}

function App() {
	return (
		<div>
			<Clock />
			<Clock />
			<Clock />
		</div>
	);
}

root.render(<App />);
