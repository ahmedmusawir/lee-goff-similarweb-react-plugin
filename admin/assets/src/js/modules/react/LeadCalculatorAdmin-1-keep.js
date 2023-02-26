import React, { useState, useEffect } from 'react';
import Audio from 'react-loader-spinner';
import Modal from 'react-modal';
import $ from 'jquery';

const customStyles = {
  content: {
    top: '50%',
    left: '55%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    margin: 'auto',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '50%',
    background: 'black',
  },
};

function LeadCalculatorAdmin() {
  const ajaxGetFunction = 'get_api_keys_ajax';
  const ajaxPostFunction = 'update_api_keys_ajax';
  const pluginImgUrl =
    leeAdminData.plugin_url +
    '/lee-goff-similarweb-react-plugin/admin/assets/imgs';
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [targetEmailAddress, setTargetEmailAddress] = useState('');
  const [emailPublicKey, setEmailPublicKey] = useState('');
  const [emailTemplateKey, setEmailTemplateKey] = useState('');
  const [emailServiceId, setEmailServiceId] = useState('');
  const [success, setSuccess] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isRapidOpen, setIsRapidOpen] = useState(false);
  const [isServiceIdOpen, setIsServiceIdOpen] = useState(false);
  const [isTemplateIdOpen, setIsTemplateIdOpen] = useState(false);
  const [isPublicKeyOpen, setIsPublicKeyOpen] = useState(false);

  function openRapidModal() {
    setIsRapidOpen(true);
  }
  function closeRapidModal() {
    setIsRapidOpen(false);
  }
  function openServiceIdModal() {
    setIsServiceIdOpen(true);
  }
  function closeServiceIdModal() {
    setIsServiceIdOpen(false);
  }
  function openTemplateIdModal() {
    setIsTemplateIdOpen(true);
  }
  function closeTemplateIdModal() {
    setIsTemplateIdOpen(false);
  }
  function openPublicKeyModal() {
    setIsPublicKeyOpen(true);
  }
  function closePublicKeyModal() {
    setIsPublicKeyOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    //GETTING THE API KEYS AT PAGE LOAD
    const getKeys = () => {
      $.ajax({
        url: leeAdminData.ajax_url,
        type: 'get',
        data: {
          action: ajaxGetFunction,
        },
      })
        .done((res) => {
          console.log(res);
          setRapidApiKey(res.data.rapidApiKey);
          console.log('Ajax with WP Ajax PHP function Success!');
        })
        .fail((res) => {
          console.log('Ajax Failed');
          console.log(res);
        });
    };

    getKeys();
  }, []);

  //UPDATING THE API KEYS ON CLICK
  const insertKeys = () => {
    $.ajax({
      url: leeAdminData.ajax_url,
      type: 'post',
      data: {
        action: ajaxPostFunction,
        rapidApiKey,
        emailApiKey,
      },
    })
      .done((res) => {
        console.log(res);
        setSuccess(true);
        console.log('Ajax with WP Ajax PHP function Success!');
      })
      .fail((res) => {
        console.log('Ajax Failed');
        console.log(res);
      });
  };
  return (
    <div className="App">
      <section className="input-box">
        <h1 className="text-light">Shortcode:</h1>
        <h5 className="text-warning mb-3">[traffic_2_lead_calculator]</h5>
      </section>
      <section className="input-box">
        <h1 className="text-light">
          SimilarWeb API Keys Setup (
          <a
            className="text-warning"
            href="https://rapidapi.com/apidojo/api/similar-web"
            target="_blank"
          >
            rapidapi.com
          </a>
          )
        </h1>
        <h6 className="btn btn-sm btn-info" onClick={openRapidModal}>
          Rapid API example
        </h6>
        <Modal
          isOpen={isRapidOpen}
          onRequestClose={closeRapidModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <button
            className="btn btn-sm btn-danger float-right mb-3"
            onClick={closeRapidModal}
          >
            close
          </button>
          <h1>Rapid API</h1>
          <img src={pluginImgUrl + '/rapidapi.png'} alt="" />
        </Modal>
        <input
          type="text"
          placeholder={rapidApiKey ? rapidApiKey : 'SimilarWeb Api Key'}
          onChange={(e) => setRapidApiKey(e.target.value)}
        />

        <button className="btn btn-warning btn-md mt-3" onClick={insertKeys}>
          Update Api Keys
        </button>
      </section>
      <section className="display-box">
        {success && (
          <aside className="success-message">
            Api Keys Update Successfully!
          </aside>
        )}
      </section>
      {/* <hr /> */}
      <section className="input-box mt-2">
        <h1 className="text-light">
          Auto Email Setup (
          <a
            href="https://www.emailjs.com/"
            target="_blank"
            className="text-warning"
          >
            emailjs.com
          </a>
          )
        </h1>
        <div className="row">
          <h6
            className="btn btn-sm btn-info mr-2 ml-3"
            onClick={openServiceIdModal}
          >
            Service ID Example
          </h6>
          <h6
            className="btn btn-sm btn-info mr-2"
            onClick={openTemplateIdModal}
          >
            Template ID Example
          </h6>
          <h6 className="btn btn-sm btn-info" onClick={openPublicKeyModal}>
            Public Key Example
          </h6>
        </div>
        <Modal
          isOpen={isServiceIdOpen}
          onRequestClose={closeServiceIdModal}
          style={customStyles}
          contentLabel="EmailJS"
          ariaHideApp={false}
        >
          <button
            className="btn btn-sm btn-danger float-right mb-3"
            onClick={closeServiceIdModal}
          >
            close
          </button>
          <h1>Email JS</h1>
          <img src={pluginImgUrl + '/emailjs-serviceid.png'} alt="" />
        </Modal>
        <Modal
          isOpen={isTemplateIdOpen}
          onRequestClose={closeTemplateIdModal}
          style={customStyles}
          contentLabel="EmailJS"
          ariaHideApp={false}
        >
          <button
            className="btn btn-sm btn-danger float-right mb-3"
            onClick={closeTemplateIdModal}
          >
            close
          </button>
          <h1>Email JS</h1>
          <img src={pluginImgUrl + '/emailjs-templateid.png'} alt="" />
        </Modal>
        <Modal
          isOpen={isPublicKeyOpen}
          onRequestClose={closePublicKeyModal}
          style={customStyles}
          contentLabel="EmailJS"
          ariaHideApp={false}
        >
          <button
            className="btn btn-sm btn-danger float-right mb-3"
            onClick={closePublicKeyModal}
          >
            close
          </button>
          <h1>Email JS</h1>
          <img src={pluginImgUrl + '/emailjs-publickey.png'} alt="" />
        </Modal>
        <input
          type="text"
          placeholder={
            targetEmailAddress ? targetEmailAddress : 'Target Email Address'
          }
          onChange={(e) => setTargetEmailAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder={emailServiceId ? emailServiceId : 'EmailJs Service ID'}
          onChange={(e) => setEmailServiceId(e.target.value)}
        />
        <input
          type="text"
          placeholder={
            emailTemplateKey ? emailTemplateKey : 'EmailJS Template Key'
          }
          onChange={(e) => setEmailTemplateKey(e.target.value)}
        />
        <input
          type="text"
          placeholder={emailPublicKey ? emailPublicKey : 'EmailJS Public Key'}
          onChange={(e) => setEmailPublicKey(e.target.value)}
        />
        <button className="btn btn-warning btn-md mt-3" onClick={insertKeys}>
          Update Api Keys
        </button>
      </section>
      <section className="display-box">
        {success && (
          <aside className="success-message">
            Api Keys Update Successfully!
          </aside>
        )}
      </section>
    </div>
  );
}

export default LeadCalculatorAdmin;
