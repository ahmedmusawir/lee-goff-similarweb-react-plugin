import React, { useState } from 'react';
import millify from 'millify';
import axios from 'axios';
import Audio from 'react-loader-spinner';
import { sendEmail } from '../utils/getUtils';

import data from '../data-shopee.json';

const Header = ({
  totalVisits,
  generatedLeads,
  setApiData,
  setIsNumber,
  rapidApiKey,
}) => {
  const [domainName, setDomainName] = useState('');
  const [error, setError] = useState('');
  const [totalVisitsByUser, setTotalVisitsByUser] = useState(null);
  const [generatedLeadsByUsers, setGeneratedLeadsByUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateData = (e) => {
    setIsLoading(true);

    if (domainName) {
      console.log('domain name:', domainName);
      if (isNaN(domainName)) {
        //THIS MAKES API BASED DATA TO SHOW UP
        setIsNumber(false);
        console.log('Input is text');
        //MAKING API CALL TO SIMILAR WEB RAPID API
        // const options = {
        //   method: 'GET',
        //   url: 'https://similar-web.p.rapidapi.com/get-analysis',
        //   params: { domain: domainName },
        //   headers: {
        //     'X-RapidAPI-Key': rapidApiKey,
        //     'X-RapidAPI-Host': 'similar-web.p.rapidapi.com',
        //   },
        // };
        // axios
        //   .request(options)
        //   .then(function (response) {
        //     console.log(response.data);
        //     setApiData(response.data);
        //     setIsLoading(false);
        //     setError('');
        //   })
        //   .catch(function (error) {
        //     console.error(error);
        //   });
        setApiData(data);
        // sendEmail(domainName);
        // setIsLoading(false);
        setError('');
      } else {
        console.log('Input is a number');
        //THIS MAKES API DATA DISAPPEAR AND ONLY NUMER DATA TO SHOW UP
        setIsNumber(true);
        //THIS DISABLES THE LOADING WHEN NUMBER IS INSERTED
        setIsLoading(false);
        setTotalVisitsByUser(domainName);
        setGeneratedLeadsByUsers(domainName * 0.2);
        setError('');
      }
    } else {
      setIsLoading(false);
      setError('Input is requied!');
    }
  };

  return (
    <div className="row">
      <section className="col-md-8 mx-auto">
        <div className="row header-top-section mx-auto">
          <div className="col-sm-8 header-inputs">
            <input
              type="text"
              className="form-control get-estimate-input"
              placeholder="Enter your domain URL or traffic count"
              onChange={(e) => setDomainName(e.target.value)}
            />
          </div>
          <div className="col-sm-4 header-inputs">
            <button
              className="btn btn-block btn-info get-estimate-btn"
              onClick={validateData}
            >
              Get Estimate
            </button>
          </div>
        </div>
        <div className="row header-bottom-section mt-5">
          {!totalVisitsByUser && (
            <>
              <div className="col-sm-6">
                <article className="left-blue-box estimate-box d-flex flex-column align-items-center justify-content-center">
                  <h2>{millify(totalVisits)}</h2>
                  <h5>Unique Visitors</h5>
                </article>
              </div>
              <div className="col-sm-6">
                <article className="right-orange-box estimate-box estimate-box d-flex flex-column align-items-center justify-content-center">
                  <h2>{millify(generatedLeads)}</h2>
                  <h5>Lead Gaurantee</h5>
                </article>
              </div>
            </>
          )}

          {totalVisitsByUser && (
            <>
              <div className="col-sm-6">
                <article className="left-blue-box estimate-box d-flex flex-column align-items-center justify-content-center">
                  <h2>{millify(totalVisitsByUser)}</h2>
                  <h5>Unique Visitors</h5>
                </article>
              </div>
              <div className="col-sm-6">
                <article className="right-orange-box estimate-box estimate-box d-flex flex-column align-items-center justify-content-center">
                  <h2>{millify(generatedLeadsByUsers)}</h2>
                  <h5>Lead Gaurantee</h5>
                </article>
              </div>
            </>
          )}

          {isLoading && (
            <div className="pt-5 d-flex w-100 justify-content-center">
              {/* <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
              /> */}
              <Audio
                height="80"
                width="80"
                radius="9"
                color="dodgerblue"
                ariaLabel="loading"
                className="mx-auto"
              />
            </div>
          )}

          {error && (
            <div className="text-center mx-auto text-warning">
              <h4 className="text-warning pt-5">{error}</h4>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Header;
