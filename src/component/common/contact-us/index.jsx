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
      toast.error(error.response.data.message);
    }
  };

  const uploadAttachment = async (e) => {
    setAttachment(e.target.files[0]);
  };

  const submitContactDetails = async () => {
    if (
      email &&
      username &&
      reasonForContact &&
      subject &&
      description &&
      attachment
    ) {
      try {
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
            toast.success(res.message);
            props.onHide();
            router.push('/thank-you');
          } else {
            toast.error(res.message);
          }
        } else {
          toast.error(fileResponse.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }

        if (error.response.data.statusCode === 400) {
          toast.error(error.response.data.message[0].errorDetail.isEmail);
        }
      }
    } else {
      toast.error('Please Fill All Fields');
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="contact_form_modal"
    >
      <Modal.Body>
        <div className={styles.dialogbox_wrap}>
          <div className={styles.modal_content}>
            <div className="row">
              <div className={styles.bg_image}>
                <p>Astroon / Submit a Request</p>
                <h3>Submit a Request</h3>
              </div>
            </div>
            <div
              className="row"
              style={{
                marginTop: '120px',
              }}
            >
              <div className={styles.input_wrap}>
                <TextInput
                  title={'Email Address'}
                  handleType={'email'}
                  kind="fullborder"
                  placeHolder="Enter your email"
                  handleValue={email}
                  handleOnChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <TextInput
                  title={'Username'}
                  handleType={'text'}
                  kind="fullborder"
                  placeHolder="Enter your username"
                  handleValue={username}
                  handleOnChange={(e) => setUsername(e.target.value)}
                />
                <br />
                <FormSelect
                  label={'Reason for contact'}
                  options={getReason}
                  handleChange={(value) => setReasonForContact(value.value)}
                />
                <br />
                <TextInput
                  title={'Subject'}
                  handleType={'text'}
                  kind="fullborder"
                  placeHolder="Enter your Subject"
                  handleValue={subject}
                  handleOnChange={(e) => setSubject(e.target.value)}
                />
                <br />
                <div className={inputStyles.input_wrap}>
                  <label
                    className={inputStyles.corner_border_label}
                    style={{ background: 'rgb(5, 5, 45)' }}
                  >
                    Description
                  </label>
                  <textarea
                    placeholder="Enter your description"
                    className={styles.contact_text_area}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    cols={4}
                  />
                </div>
                <br />
                <div className={inputStyles.input_wrap}>
                  <div
                    className={inputStyles.corner_border_label}
                    style={{ background: 'rgb(5, 5, 45)' }}
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
                        }}
                      >
                        {attachment
                          ? attachment.name
                          : 'Add file or drop files here'}
                      </p>
                      <h6
                        style={{
                          background:
                            'linear-gradient(141.07deg, #FAFF00 -6.88%, #FE19C1 50.39%)',
                          float: 'right',
                          padding: '14px 30px',
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
              </div>
              <div className={styles.dialog_footer}>
                <button
                  onClick={props.onHide}
                  type="button"
                  className={styles.cancel_btn}
                >
                  Cancel
                </button>{' '}
                <Button onClick={submitContactDetails}>Submit a request</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUs;
