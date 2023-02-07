import React, { useState, useEffect } from 'react';
import styles from './contactUs.module.scss';
import TextInput from '../text-input';
import FormSelect from '../form-select';
import Button from '../button';
import inputStyles from '../text-input/textInput.module.scss';
import {
  getResonForContactApi,
  insertContactUsFileApi,
  insertContactUsDetailApi,
} from '../../../../services/api/contactUs';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';

const ContactUs = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [getReason, setReason] = useState('');
  const [reasonForContact, setReasonForContact] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState('');
  const router = useRouter();

  useEffect(() => {
    getResonForContact();
  }, []);

  const getResonForContact = async () => {
    try {
      const res = await getResonForContactApi();
      if (res.success) {
        const options = res.data.map((data) => {
          return { value: data.reason, label: data.reason };
        });
        setReason(options);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      if (error?.response?.data?.message)
        toast.error(error.response.data.message);
    }
  };

  const uploadAttachment = async (e) => {
    setAttachment(e.target.files[0]);
  };

  async function submitContactDetails(e) {
    e.preventDefault();
    try {
      if (
        !email &&
        !username &&
        !reasonForContact &&
        !subject &&
        !description &&
        !attachment
      )
        throw new Error('Please all all fields');

      // if (username.length > 25)
      //   throw new Error('Username can not be more than 10 charactors');

      const fileBody = new FormData();
      fileBody.append('file', attachment);
      const fileResponse = await insertContactUsFileApi(fileBody);

      if (fileResponse.success) {
        let data = {
          email: email,
          username: username,
          reasonForContact: reasonForContact,
          subject: subject,
          description: description,
          attachments: fileResponse.data.fileName,
        };

        const res = await insertContactUsDetailApi(data);
        if (res.success) {
          setEmail('');
          setUsername('');
          setSubject('');
          setDescription('');
          setAttachment('');
          toast.success('Contact form submitted successfully');
          props.onHide();
          router.push('/thank-you');
        }
      }
    } catch (error) {
      toast.error(error.message ? error.message : error.toString().slice(7));
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="contact_form_modal"
      close
    >
      {' '}
      <Modal.Header closeVariant={'white'} closeButton></Modal.Header>
      <Modal.Body>
        <div className={styles.modal_content}>
          <div className="row">
            <div className={styles.bg_image}>
              <p>Astroon / Submit a Request</p>
              <h3>Submit a Request</h3>
            </div>
          </div>
          <form onSubmit={submitContactDetails} className={styles.input_wrap}>
            <TextInput
              titleBackground={'#ae2e6f'}
              isRequired={true}
              title={'Email Address'}
              handleType={'email'}
              kind="fullborder"
              placeHolder="Enter your email"
              handleValue={email}
              handleOnChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
              titleBackground={'#ae2e6f'}
              title={'Username'}
              isRequired={true}
              handleType={'text'}
              kind="fullborder"
              placeHolder="Enter your username"
              handleValue={username}
              handleOnChange={(e) => setUsername(e.target.value)}
              maxlength="25"
            />

            <FormSelect
              titleBackground={'#ae2e6f'}
              label={'Reason for contact'}
              options={getReason}
              handleChange={(value) => setReasonForContact(value.value)}
            />

            <TextInput
              isRequired={true}
              titleBackground={'#ae2e6f'}
              title={'Subject'}
              handleType={'text'}
              kind="fullborder"
              placeHolder="Enter your Subject"
              handleValue={subject}
              handleOnChange={(e) => setSubject(e.target.value)}
            />
            <TextInput
              isRequired={true}
              titleBackground={'#ae2e6f'}
              title={'Description'}
              handleType={'textarea'}
              kind="fullborder"
              placeHolder="Enter your description"
              handleValue={description}
              textarea={true}
              inputHeight={'120px'}
              handleOnChange={(e) => setDescription(e.target.value)}
            />

            <div className={inputStyles.input_wrap}>
              <div
                className={inputStyles.corner_border_label}
                style={{ background: '#ae2e6f' }}
              >
                <label>Attachments</label>
              </div>

              <div
                style={{
                  padding: 0,
                  width: '100%',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'inline-block',
                }}
                className={inputStyles.full_border}
              >
                <div
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p
                    style={{
                      cursor: 'pointer',
                      marginBottom: 0,
                      padding: '8px',
                      opacity: '0.5',
                      marginLeft: '19px',
                    }}
                  >
                    {attachment
                      ? attachment.name
                      : 'Add file or drop files here'}
                  </p>
                  <h6
                    style={{
                      background: 'white',
                      color: '#020039',
                      fontSize: '14px',
                      float: 'right',
                      padding: '14px 20px',
                      marginBottom: 0,
                      cursor: 'pointer',
                    }}
                  >
                    {attachment ? 'Change File' : 'Upload File'}
                  </h6>
                </div>
                <input
                  style={{
                    height: '68px',
                    cursor: 'pointer',
                    fontSize: '100px',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    opacity: 0,
                  }}
                  type="file"
                  className={inputStyles.full_border}
                  placeholder="Upload File"
                  onChange={uploadAttachment}
                  accept="image/png, image/gif, image/jpeg"
                />
              </div>
            </div>
            <div className={styles.dialog_footer}>
              <Button kind={'white_btn'} type="submit">
                Submit a request
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
