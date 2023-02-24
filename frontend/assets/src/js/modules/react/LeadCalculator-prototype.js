import React, { useState, useRef, useEffect } from 'react';
import $ from 'jquery';
import moment from 'moment';
import { Audio } from 'react-loader-spinner';
import localData from './data';

function LeadCalculator() {
  const [domainName, setDomainName] = useState('');
  const [lastDateListed, setLastDateListed] = useState('');
  const [lastVisitNumberListed, setLastVisitNumberListed] = useState('');
  const [leadNumber_1, setLeadNumber_1] = useState('');
  const [leadNumber_2, setLeadNumber_2] = useState('');
  const [manualVisitorNumber, setManualVisitorNumber] = useState(null);
  const [manualLeadNumber_1, setManualLeadNumber_1] = useState(null);
  const [manualLeadNumber_2, setManualLeadNumber_2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const textInput = useRef();
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [emailApiKey, setEmailApiKey] = useState('');
  const ajaxGetFunction = 'get_api_keys_ajax';

  useEffect(() => {
    //GETTING THE API KEYS AT PAGE LOAD
    const getKeys = () => {
      $.ajax({
        url: leeFrontData.ajax_url,
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

  const calculatePercentage = (num, percentage) => {
    return Math.ceil((num * percentage) / 100);
  };

  const resetData = () => {
    textInput.current.value = null;
    setLeadNumber_1('');
    setManualLeadNumber_1('');
    setError('');
    setDomainName('');
  };

  const getFormattedData = (obj) => {
    // console.log('DATA:', info[0].EstimatedMonthlyVisits);
    //COLLECTING DATE
    const keys = Object.keys(obj);
    const lastDate = keys.pop();
    const lastVisitDate = moment(lastDate).format('MMMM D, YYYY');
    // console.log('LAST DATE', lastVisitDate);
    setLastDateListed(lastVisitDate);

    //COLLECTING VISITOR NUMBER
    const lastItemInApiData = obj[keys.pop()];
    const lastVisitNumber = lastItemInApiData
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // console.log('LAST VISITS', lastVisitNumber);
    setLastVisitNumberListed(lastVisitNumber);

    //COLLECTING LEAD NUMBER ONE
    const calculatedLeads_1 = calculatePercentage(lastItemInApiData, 20);
    const formattedLeads_1 = calculatedLeads_1
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setLeadNumber_1(formattedLeads_1);

    //COLLECTING LEAD NUMBER ONE
    const calculatedLeads_2 = calculatePercentage(lastItemInApiData, 30);
    const formattedLeads_2 = calculatedLeads_2
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setLeadNumber_2(formattedLeads_2);

    //CLEARING MANUAL VISIOR NUMBER
    setManualVisitorNumber('');
    //CLEARING MANUAL LEAD NUMBER
    setManualLeadNumber_1(null);
  };

  const getApiData = (e) => {
    const apiData = localData[0].EstimatedMonthlyVisits;
    getFormattedData(apiData);
  };

  const generateLeadNumber = (userInputNumber) => {
    //FORMATTING USER INPUT NUMBER
    const expectedManualVisitors = userInputNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    //SETTING UP FIRST CACLULATED LEAD NUMBER
    const manuallyGeneratedLeads_1 = calculatePercentage(userInputNumber, 20);
    const formattedManualLeads_1 = manuallyGeneratedLeads_1
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setManualLeadNumber_1(formattedManualLeads_1);

    //SETTING UP SECOND CACLULATED LEAD NUMBER
    const manuallyGeneratedLeads_2 = calculatePercentage(userInputNumber, 30);
    const formattedManualLeads_2 = manuallyGeneratedLeads_2
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setManualLeadNumber_2(formattedManualLeads_2);

    setManualVisitorNumber(expectedManualVisitors);
    setLeadNumber_1('');
  };

  const validateData = (e) => {
    if (domainName) {
      if (isNaN(domainName)) {
        // console.log('Input is text');
        getApiData();
      } else {
        // console.log('Input is a number');
        generateLeadNumber(domainName);
      }
    } else {
      setError('Input is requied!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lee Goff Lead Calculator</h1>
        {rapidApiKey && emailApiKey && (
          <div>
            <h3>Rapid Api Key: {rapidApiKey}</h3>
            <h3>Email Api Key: {emailApiKey}</h3>
          </div>
        )}
      </header>
      <main className="App-container">
        <h4 style={{ textAlign: 'center' }}>
          Input Domain Name or Expected Visitor Number
        </h4>
        <section className="form-box">
          <input
            type="text"
            onChange={(e) => setDomainName(e.target.value)}
            placeholder="youdomain.com"
            ref={textInput}
          />
        </section>
        <section className="form-box">
          <button style={{ marginRight: '.5rem' }} onClick={validateData}>
            Get Data
          </button>
          <button className="btn btn-danger" onClick={resetData}>
            Reset
          </button>
        </section>
        {error && (
          <div
            style={{ color: 'red', textAlign: 'center', marginTop: '1.5rem' }}
          >
            {error}
          </div>
        )}
        <section className="display-box">
          <div className="display-box-content">
            <h2 style={{ color: 'dodgerblue', textAlign: 'center' }}>
              Calculated Result <br />
            </h2>
            {isLoading && (
              <Audio
                height="80"
                width="80"
                radius="9"
                color="dodgerblue"
                ariaLabel="loading"
              />
            )}
            {lastDateListed &&
              lastVisitNumberListed &&
              leadNumber_1 &&
              leadNumber_2 && (
                <div>
                  <h4 style={{ color: 'darkred', textDecoration: 'underline' }}>
                    SimilarWeb Data:
                  </h4>
                  <h5>{lastDateListed}</h5>
                  <h3>
                    {lastVisitNumberListed}
                    <br />
                    <small>(Expected Visitors)</small>
                  </h3>
                  <div className="generated-leads">
                    <h4>Lead Generated</h4>
                    From: {leadNumber_1} <br />
                    <br />
                    To: {leadNumber_2}
                  </div>
                </div>
              )}
            {manualVisitorNumber &&
              manualLeadNumber_1 &&
              manualLeadNumber_2 && (
                <div>
                  <h3
                    style={{
                      color: 'darkred',
                      textDecoration: 'underline',
                      marginTop: '4rem',
                    }}
                  >
                    Manually Generated Data:
                  </h3>
                  <h4>
                    {manualVisitorNumber}
                    <br />
                    <small>(Expected Visitors)</small>
                  </h4>
                  <div className="generated-leads">
                    <h4>Lead Generated</h4>
                    From: {manualLeadNumber_1} <br />
                    <br />
                    To: {manualLeadNumber_2}
                  </div>
                </div>
              )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default LeadCalculator;
