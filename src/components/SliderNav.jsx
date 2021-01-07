export const SliderNav = () => {
  return (
    <div className='slider-navigation'>
      <div className='slider-pager owl-carousel'></div>
      <div className='slider-controls'>
        <a href className='prev cursor-pointer'>
          <i className='fa fa-chevron-left'></i>
        </a>
        <a href className='next cursor-pointer'>
          <i className='fa fa-chevron-right'></i>
        </a>
        <a href className='zoom-out cursor-pointer'>
          <i className='fa fa-search-minus'></i>
        </a>
      </div>
    </div>
  );
};
