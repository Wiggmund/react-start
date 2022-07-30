import './style.css';
import {ClickCounter} from './ClickCounter';
import IMAGE from './assets/time.jpg';

export const App = () => {
	return <>
		<h1>Edited Lorem, ipsum dolor.</h1>
		<h1>Lorem, ipsum dolor.</h1>
		<img src={IMAGE} alt="Time" />
		<ClickCounter />
	</>;
};
