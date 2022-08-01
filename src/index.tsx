import React from 'react';
import ReactDOM from 'react-dom/client';

type scaleNames = 'Celsius' | 'Fahrenheit';
type LiftitedState = {
	temperature: string,
	scale: scaleNames
};
type TransferedProps = LiftitedState & {
	onTemperatureChange: (e: any) => void;
}


function BoilingVerdict(props: {celsius: number}) {
	if (props.celsius >= 100) {
		return <p>The water would boil</p>;
	}
	return <p>The water would not boil</p>;
}

function toCelsius(fahrenheit: number) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius: number) {
	return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature: string,
	convert: (x: number) => number) {
	const input = parseFloat(temperature);
	if (Number.isNaN(input)) {
		return '';
	}
	const output = convert(input);
	const rounded = Math.round(output * 1000) / 1000;
	return rounded.toString();
}

class TemperatureInput extends
	React.Component<TransferedProps, unknown> {
	constructor(props: TransferedProps) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event: any) {
		this.props.onTemperatureChange(event.target.value);
	}
	render() {
		const temperature = this.props.temperature;
		const scale = this.props.scale;
		return (
			<fieldset>
				<legend>Enter temperature in {scale}:</legend>
				<input
					value={temperature}
					onChange={this.handleChange} />
				<BoilingVerdict celsius={parseFloat(temperature)} />
			</fieldset>
		);
	}
}


class Calculator extends React.Component<unknown, LiftitedState> {
	constructor(props: unknown) {
		super(props);
		this.state = {
			temperature: '',
			scale: 'Celsius'
		};
		this.handlerCelsiusChange = this.handlerCelsiusChange.bind(this);
		this.handlerFahrenheitChange = this.handlerFahrenheitChange.bind(this);
	}
	handlerFahrenheitChange(temperature: string) {
		this.setState({
			temperature,
			scale: 'Fahrenheit'
		});
	}
	handlerCelsiusChange(temperature: string) {
		this.setState({
			temperature,
			scale: 'Celsius'
		});
	}
	render() {
		const scale = this.state.scale;
		const temperature = this.state.temperature;
		const celsius =
			scale === 'Fahrenheit' ? tryConvert(temperature, toCelsius) : temperature;
		const fahrenheit =
			scale === 'Celsius' ? tryConvert(temperature, toFahrenheit) : temperature;
		return (
			<div>
				<TemperatureInput
					scale={scale}
					temperature={celsius}
					onTemperatureChange={this.handlerCelsiusChange} />
				<TemperatureInput
					scale={scale}
					temperature={fahrenheit}
					onTemperatureChange={this.handlerFahrenheitChange} />
				<BoilingVerdict
					celsius={parseFloat(celsius)} />
			</div>
		);
	}
}


function App() {
	return (
		<div>
			<Calculator />
		</div>
	);
}

const root = ReactDOM.createRoot(
	document.getElementById('root') as Element
);

root.render(<App />);

