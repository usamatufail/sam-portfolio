export const OffScreenNav = () => {
  return (
    <div className='off-screen-navigation'>
      <ul className='nav'>
        <li>
          <a href='#about-me'>
            <i className='fa fa-user'></i>
            <span>About Me</span>
          </a>
        </li>
        <li>
          <a href='#services'>
            <i className='fa fa-briefcase'></i>
            <span>Services</span>
          </a>
        </li>
        <li>
          <a href='#pricing'>
            <i className='fa fa-money'></i>
            <span>Pricing</span>
          </a>
        </li>
        <li>
          <a href='#contact'>
            <i className='fa fa-envelope'></i>
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
};
