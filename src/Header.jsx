import { Link } from 'react-router-dom';

export const Header = () => {
	return (
		<header>
			<h1>NC News</h1>
			<nav className='links'>
				<Link to='/Articles'>Articles</Link>
			</nav>
		</header>
	);
};
