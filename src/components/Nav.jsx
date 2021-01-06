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
        <a href='/'>
          <h5>
            <span style={{ fontSize: '42px', marginRight: '15px' }}>{`<`}</span>
            <span
              style={{
                fontFamily: 'Agustina Regular',
                fontWeight: 'normal',
                fontSize: '42px',
              }}
            >
              Sam
            </span>
            <span style={{ fontSize: '42px', marginLeft: '15px' }}>{`/>`}</span>
          </h5>
        </a>
      </div>
    </nav>
  );
};
