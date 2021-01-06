import { data } from 'data';
const { name, domain, buttonText, image, sliderData } = data;

export const Slider = () => {
  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className='outer-wrapper'>
        <div className='inner-wrapper'>
          <div
            className='slide first'
            id='0'
            data-position-x='0'
            data-position-y='0'
            data-position-z='1'
            data-rotation='0'
          >
            <div className='main-title'>
              <div className='main-title-wrapper'>
                <h1>Hi there! I’m {name}</h1>
                <h2>A Professional {domain}</h2>
                <a href onClick={onClick} className='next btn btn-default'>
                  {buttonText}
                </a>
              </div>
            </div>
            <div className='image' data-background={image}></div>
            {/*end image*/}
          </div>
          {/*end slide*/}

          {/* All other Slides */}
          {sliderData.map((data) => {
            const { id, title, info, additionalInfo, slideImage } = data;
            return (
              <div key={id} className='slide' id={id}>
                <div className='description'>
                  <h2 className='animate'>{title}</h2>
                  <dl key={title} className='animate'>
                    {info.map((infoEl) => {
                      const { title, description } = infoEl;
                      return (
                        <>
                          <dt>{title}:</dt>
                          <dd>
                            {title === 'Website' ? (
                              <a
                                href={description}
                                target='_blank'
                                rel='noreferrer'
                              >
                                {description}
                              </a>
                            ) : (
                              <>{description}</>
                            )}
                          </dd>
                        </>
                      );
                    })}
                  </dl>

                  <div key={title} className='additional-info animate'>
                    <dl>
                      {additionalInfo.map((infoEl) => {
                        const { title, description } = infoEl;
                        return (
                          <>
                            <dt>{title}:</dt>
                            <dd>
                              {title === 'Website' ? (
                                <a
                                  href={description}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  {description}
                                </a>
                              ) : (
                                <>
                                  {description.split('').map((char, index) => {
                                    if (index === 70) {
                                      return (
                                        <>
                                          <br /> {char}
                                        </>
                                      );
                                    } else if (index === 140) {
                                      return (
                                        <>
                                          <br /> {char}
                                        </>
                                      );
                                    } else if (index === 210) {
                                      return (
                                        <>
                                          <br /> {char}
                                        </>
                                      );
                                    } else {
                                      return char;
                                    }
                                  })}
                                </>
                              )}
                            </dd>
                          </>
                        );
                      })}
                    </dl>
                  </div>
                </div>
                <div className='image' data-background={slideImage}></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
