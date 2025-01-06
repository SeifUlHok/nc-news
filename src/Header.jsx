export const Header = () => {
	return (
	  <header>
		<h1>Northcoders News</h1>
		<nav>
		  <div className="links">
			<a href="/">Home</a>
			<a href="/articles">Articles</a>
			<a href="/topics">Topics</a> 
		  </div>
		  <div className="user-info">
			Logged in as: <span>butter_bridge</span>
		  </div>
		</nav>
	  </header>
	);
  };
  