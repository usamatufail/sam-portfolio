export const OffScreenContent = () => {
  const onClick = (e) => {
    e.preventDefault();
  };
  return (
    <div className='off-screen-content'>
      <div className='scrollbar-inner'>
        <section id='about-me'>
          <div className='image-header'>
            <div className='bg-transfer'>
              <img src='assets/img/image-header.jpg' alt='' />
            </div>
          </div>
          <div className='section-wrapper'>
            <h2>About Me</h2>
            <h3>Hi! I'm Fahad Arshad</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              sagittis lacinia tellus. Nullam venenatis a sem non dictum.
              Aliquam orci ipsum, malesuada lacinia faucibus nec, bibendum a
              enim. Sed efficitur bibendum purus. Fusce libero metu
            </p>

            <p>
              Enean sit amet metus sodales, elementum ligula quis, facilisis
              neque. Sed eu purus ut mauris malesuada viverra eu vitae eros. In
              odio neque, fermentum id tincidunt vitae, accumsan eu augue. Proin
              vitae porta nulla.
            </p>
            <img src='assets/img/signature-black.png' alt='' />
          </div>
        </section>

        <section id='services'>
          <div className='section-wrapper'>
            <h2>Services</h2>

            <p>
              Duis ut finibus elit. Praesent vestibulum porta odio, in commodo
              velit placerat sed. Vivamus et iaculis sem. Sed nibh turpis,
              finibus ut est nec, tempus fringilla augue. Quisque blandit nunc
              eu tincidunt iaculis.
            </p>

            <div className='service'>
              <div className='image'>
                <div className='bg-transfer'>
                  <img src='assets/img/service-01.jpg' alt='' />
                </div>
              </div>
              <div className='description'>
                <h3>Professional Photography</h3>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  sagittis lacinia tellus. Nullam venenatis a sem non dictum.
                </p>
              </div>
            </div>
            <div className='service'>
              <div className='image'>
                <div className='bg-transfer'>
                  <img src='assets/img/service-02.jpg' alt='' />
                </div>
              </div>
              <div className='description'>
                <h3>Wedding Photography</h3>

                <p>
                  Donec mauris nibh, blandit id eros lacinia, lobortis aliquam
                  mauris. Suspendisse laoreet, tortor ut convallis facilisis
                </p>
              </div>
            </div>
            <div className='service'>
              <div className='image'>
                <div className='bg-transfer'>
                  <img src='assets/img/service-03.jpg' alt='' />
                </div>
              </div>
              <div className='description'>
                <h3>Video Editing</h3>

                <p>
                  Nullam ultricies purus sed accumsan tempus. Integer lorem dui,
                  pellentesque at arcu non volutpat fermentum sem.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id='pricing'>
          <div className='section-wrapper'>
            <h2>Pricing</h2>

            <div className='price-package'>
              <div className='price'>$129</div>
              <div className='description'>
                <h3>Basic Package</h3>

                <p>
                  Enean sit amet metus sodales, elementum ligula quis, facilisis
                  neque. Sed eu purus ut mauris malesuada viverra eu vitae eros.
                </p>
                <ul>
                  <li>Aenean pretium ex non leo aliquam</li>
                  <li>Sit amet porta urna interdum</li>
                </ul>
              </div>
            </div>

            <div className='price-package'>
              <div className='price'>$149</div>
              <div className='description'>
                <h3>Advanced Package</h3>

                <p>
                  Cras ornare ligula quis ultrices fermentum. Maecenas finibus,
                  sapien non suscipit luctus
                </p>
                <ul>
                  <li>Aenean pretium ex non leo aliquam</li>
                  <li>Sit amet porta urna interdum</li>
                  <li>In pretium euismod justo et porttitor</li>
                </ul>
              </div>
            </div>

            <div className='price-package'>
              <div className='price'>$169</div>
              <div className='description'>
                <h3>Professional Package</h3>

                <p>
                  Phasellus in dolor sit amet lorem scelerisque sodales quis ut
                  eros. Nullam elit dui, egestas vel tortor
                </p>
                <ul>
                  <li>Aenean pretium ex non leo aliquam</li>
                  <li>Sit amet porta urna interdum</li>
                  <li>In pretium euismod justo et porttitor</li>
                  <li>Sed eu purus ut mauris</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id='contact'>
          <div id='map'></div>
          <div className='section-wrapper'>
            <h2>Contact</h2>

            <div className='row'>
              <div className='col-md-6 col-sm-6'>
                <h3>Address</h3>
                <address>
                  4758 Nancy Street
                  <br />
                  +1 919-571-2528
                  <br />
                  <a href onClick={onClick}>
                    hello@example.com
                  </a>
                </address>
              </div>
              <div className='col-md-6 col-sm-6'>
                <h3>Social</h3>

                <div className='social'>
                  <figure>
                    <a href onClick={onClick} className='icon'>
                      <i className='fa fa-facebook'></i>Facebook
                    </a>
                  </figure>
                  <figure>
                    <a href onClick={onClick} className='icon'>
                      <i className='fa fa-twitter'></i>Twitter
                    </a>
                  </figure>
                  <figure>
                    <a href onClick={onClick} className='icon'>
                      <i className='fa fa-youtube'></i>Youtube
                    </a>
                  </figure>
                  <figure>
                    <a href onClick={onClick} className='icon'>
                      <i className='fa fa-pinterest'></i>Pinterest
                    </a>
                  </figure>
                </div>
              </div>
            </div>
            <br />

            <h3>Contact Form</h3>

            <form id='form-contact' method='post' className='form clearfix'>
              <div className='row'>
                <div className='col-md-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='form-contact-name'
                      name='name'
                      placeholder='Your Name'
                      required
                    />
                  </div>
                </div>
                <div className='col-md-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      id='form-contact-email'
                      name='email'
                      placeholder='Your Email'
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      id='form-contact-message'
                      rows='8'
                      name='message'
                      placeholder='Your Message'
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className='form-group clearfix'>
                <button
                  type='submit'
                  className='btn pull-right btn-default btn-framed btn-rounded'
                  id='form-contact-submit'
                >
                  Send a Message
                </button>
              </div>
              <div className='form-contact-status'></div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
