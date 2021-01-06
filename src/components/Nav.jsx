export const Nav = () => {
  const onClick = (e) => {
    e.preventDefault();
  };

  return (
    <nav className='navigation'>
      <a href onClick={onClick} className='nav-btn'>
        <i></i>
        <i></i>
        <i></i>
      </a>
      <div className='brand'>
        <a href='/index.html'>
          <img src='assets/img/logo.png' alt='' />
        </a>
      </div>
    </nav>
  );
};
