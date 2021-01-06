export const SliderNav = () => {
  return (
    <div className='slider-navigation'>
      <div className='slider-pager owl-carousel'></div>
      <div className='slider-controls'>
        <a href className='prev'>
          <i className='fa fa-chevron-left'></i>
        </a>
        <a href className='next'>
          <i className='fa fa-chevron-right'></i>
        </a>
        <a href className='zoom-out'>
          <i className='fa fa-search-minus'></i>
        </a>
      </div>
    </div>
  );
};
