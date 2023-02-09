import React, { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import $ from 'jquery';

function LeadCalculatorAdmin() {
  const ajaxGetFunction = 'get_api_keys_ajax';
  const ajaxPostFunction = 'update_api_keys_ajax';
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [emailApiKey, setEmailApiKey] = useState('');
  const [success, setSuccess] = useState(false);

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
          setEmailApiKey(res.data.emailApiKey);
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
        <h1>API Keys Setup</h1>
        <input
          type="text"
          placeholder="SimilarWeb Api Key"
          onChange={(e) => setRapidApiKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="EmailJS Api Key"
          onChange={(e) => setEmailApiKey(e.target.value)}
        />
        <button onClick={insertKeys}>Update Api Keys</button>
      </section>
      <section className="display-box">
        <h3>Current SimilarWeb Key: {rapidApiKey}</h3>
        <h3>Current EmailJS Key: {emailApiKey}</h3>
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
