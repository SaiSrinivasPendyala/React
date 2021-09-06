import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CourseApis from './itemsReact1';
import LoginPage from './LoginPage';

function App()
{
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<LoginPage/>
				</Route>
				<Route exact path="/course">
					<CourseApis/>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;