import { RootLayout, ContactLayout, Input, Code } from 'components';
import { Form, Formik, FormikState } from 'formik';
import { contactValidation } from 'validations';
import axios from 'axios';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { PacmanLoader } from 'react-spinners';

const inputs = [
  {
    name: 'name',
    label: '_name',
    placeholder: 'Enter your name',
    type: 'text',
  },
  {
    name: 'email',
    label: '_email',
    placeholder: 'Enter your email',
    type: 'email',
  },
  {
    name: 'message',
    label: '_message',
    placeholder: 'Enter your message',
    type: 'textarea',
  },
];

const code = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  return `const button = document.querySelector('#sendBtn');

  const message = {
    name: "${name}",
    email: "${email}",
    message: "${message}",
    date: "${dayjs().format('DD/MM/YYYY')}"
  }

  button.addEventListener('click', () => {
    form.send(message);
  })`;
};

const ContactForm = () => {
  return (
    <div className="w-[450px] mt-[120px] flex flex-col gap-[20px]">
      {inputs.map(input => {
        return (
          <Input
            key={input.name}
            name={input.name}
            label={input.label}
            placeholder={input.placeholder}
            type={input.type}
            rows={8}
          />
        );
      })}
      <button
        type="submit"
        className="transition-all text-white bg-[#1C2B3A] hover:bg-[#293e52] focus:outline-none outline-none focus:ring focus:ring-[#293e52] font-medium rounded-[8px] text-[14px] px-5 py-2.5 mr-2 mb-2"
      >
        submit-message
      </button>
    </div>
  );
};

export const Thanks = ({
  setMessageSent,
  resetForm,
}: {
  setMessageSent: Dispatch<SetStateAction<boolean>>;
  resetForm: (
    nextState?:
      | Partial<
          FormikState<{
            name: string;
            email: string;
            message: string;
          }>
        >
      | undefined,
  ) => void;
}) => {
  return (
    <div className="flex items-start justify-center border-r-solid border-r-main-border border-r">
      <div className="mt-[150px] overflow-auto text-center max-w-[385px]">
        <h1 className="text-[#fff] text-[26px]">Thank you! 🤘</h1>
        <p className="mt-[10px]">
          Your message has been accepted. You will recieve answer really soon!
        </p>
        <button
          type="button"
          onClick={() => {
            setMessageSent(false);
            resetForm();
          }}
          className="mt-[40px] transition-all text-white bg-[#1C2B3A] hover:bg-[#293e52] focus:outline-none outline-none focus:ring focus:ring-[#293e52] font-medium rounded-[8px] text-[14px] px-5 py-2.5 mr-2 mb-2"
        >
          send-new-message
        </button>
      </div>
    </div>
  );
};

export default function Contact() {
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <RootLayout>
      <ContactLayout>
        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          onSubmit={async values => {
            setLoading(true);
            const res = await axios.post('/api/contact-to-sheet', {
              ...values,
              date: dayjs().format('DD/MM/YYYY [at] hh:mma'),
            });
            if (res.status === 200) {
              setMessageSent(true);
            }
            setLoading(false);
          }}
          validationSchema={contactValidation}
        >
          {({ values: { name, email, message }, resetForm }) => {
            return (
              <Form autoComplete="off">
                <div className="grid grid-cols-2 min-h-[calc(100vh_-_128px)]">
                  {/* Contact Form + Thanks */}
                  <>
                    {!messageSent && !loading ? (
                      <div className="flex items-start justify-center border-r-solid border-r-main-border border-r">
                        <ContactForm />
                      </div>
                    ) : loading ? (
                      <div className="flex items-start justify-center border-r-solid border-r-main-border border-r">
                        <div className="mt-[150px] w-[100%] flex justify-center">
                          <PacmanLoader color="#82AAFF" />
                        </div>
                      </div>
                    ) : (
                      <Thanks
                        setMessageSent={setMessageSent}
                        resetForm={resetForm}
                      />
                    )}
                  </>
                  {/* Code */}
                  <div className="flex items-start justify-center border-r-solid border-r-main-border border-r">
                    <div className="mt-[150px] overflow-auto">
                      <Code code={code({ name, email, message })} />
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </ContactLayout>
    </RootLayout>
  );
}
