import { data } from 'data';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const {
  name,
  image,
  bio,
  additionalBio,
  skillList,
  signature,
  servicesText,
  services,
  address: { firstLine, secondLine },
  social: { email, facebook, whatsapp, github },
} = data;

export const OffScreenContent = () => {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });

  const formUsed = () => Boolean(localStorage.getItem('formUsed') || false);
  const [formUsedTrue, setFormUsedTrue] = useState(formUsed);

  useEffect(() => {
    localStorage.setItem('formUsed', formUsedTrue);
  }, [formUsedTrue]);

  const onSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_surp1le',
        'template_ug2m2k1',
        e.target,
        'user_SxXYSOILc89pQ0TTVT5wx'
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success(
            'I have recieved your message and will contact you soon.'
          );
          setFormUsedTrue(true);
        },
        (error) => {
          console.log(error.text);
          toast.error('Something went wrong!!!.');
        }
      );
    e.target.reset();
    console.log('form submitted');
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div className='off-screen-content'>
      <div className='scrollbar-inner'>
        <section id='about-me'>
          <div className='image-header'>
            <div className='bg-transfer'>
              <img src={image} alt='' />
            </div>
          </div>
          <div className='section-wrapper'>
            <h2>About Me</h2>
            <h3>Hi! I'm {name}</h3>
            <p>{bio}</p>
            <p>{additionalBio}</p>
            <ul>
              {skillList.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
            <img src={signature} alt={name} />
          </div>
        </section>

        <section id='services'>
          <div className='section-wrapper'>
            <h2>Services</h2>
            <p>{servicesText}</p>
            {services.map((service) => {
              const { title, description, image } = service;
              return (
                <div className='service'>
                  <div className='image'>
                    <div className='bg-transfer'>
                      <img src={image} alt={title} />
                    </div>
                  </div>
                  <div className='description'>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section id='contact'>
          {/* <div id='map'></div> */}
          <div className='section-wrapper'>
            <h2>Contact</h2>

            <div className='row'>
              <div className='col-md-6 col-sm-6'>
                <h3>Address</h3>
                <address>
                  {firstLine}
                  <br />
                  {secondLine}
                  <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </address>
              </div>
              <div className='col-md-6 col-sm-6'>
                <h3>Social</h3>

                <div className='social'>
                  <figure>
                    <a
                      href={facebook}
                      className='icon'
                      target='_blank'
                      rel='noreferrer'
                    >
                      <i className='fa fa-facebook'></i>Facebook
                    </a>
                  </figure>
                  <figure>
                    <a
                      href={whatsapp}
                      target='_blank'
                      rel='noreferrer'
                      className='icon'
                    >
                      <i className='fa fa-whatsapp'></i>Whatsapp
                    </a>
                  </figure>
                  <figure>
                    <a
                      href={github}
                      target='_blank'
                      rel='noreferrer'
                      className='icon'
                    >
                      <i className='fa fa-github'></i>Github
                    </a>
                  </figure>
                </div>
              </div>
            </div>
            <br />

            <h3>Contact Form</h3>
            <form className='form clearfix' onSubmit={onSubmit}>
              <div className='row'>
                <div className='col-md-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      name='name'
                      placeholder='Your Name'
                      onChange={handleChange}
                      value={contact.name}
                      required
                      disabled={formUsedTrue}
                    />
                  </div>
                </div>
                <div className='col-md-6 col-sm-6'>
                  <div className='form-group'>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      name='email'
                      placeholder='Your Email'
                      onChange={handleChange}
                      value={contact.email}
                      required
                      disabled={formUsedTrue}
                    />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-12'>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      id='message'
                      rows='8'
                      name='message'
                      placeholder='Your Message'
                      onChange={handleChange}
                      value={contact.message}
                      required
                      disabled={formUsedTrue}
                    ></textarea>
                  </div>
                </div>
              </div>
              {formUsedTrue && (
                <div className='row'>
                  <div className='col-12'>
                    <h5 style={{ color: 'red' }}>
                      You can only send message once!! This is to avoid spam.
                    </h5>
                  </div>
                </div>
              )}
              <div className='form-group clearfix'>
                <button
                  type='submit'
                  className='btn pull-right btn-default btn-framed btn-rounded'
                  id='form-contact-submit'
                >
                  Send a Message
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
