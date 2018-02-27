import React from 'react';

export default function AccountOverview() {
  return (
    <div className="c-overview">
      <div className="c-overview__section">
        <h2 className="c-overview__headline">
            Get noticed by the top brands in Asia
        </h2>

        <ul className="c-overview__brand">
          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/unilever.png"
              alt="Unilever"
            />
          </li>

          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/expedia.png"
              alt="Expedia"
            />
          </li>

          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/huawei.png"
              alt="Huawei"
            />
          </li>

          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/uob.png"
              alt="UOB"
            />
          </li>

          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/carousell.png"
              alt="Carousell"
            />
          </li>

          <li className="c-overview__brand-item">
            <img
              className="c-overview__brand-image"
              src="https://cdn.content.co/portfolio/img/brands/direct-asia.png"
              alt="Direct asia"
            />
          </li>
        </ul>

        <h3 className="c-overview__text">
          Join the thousands of content creators to showcase your best work and find great content jobs
        </h3>
        <div className="c-overview__profile">
          <img
            className="c-overview__profile-img"
            src="https://cdn.content.co/portfolio/img/profile.png"
            alt="User Profile"
          />
        </div>
      </div>
      <div className="c-overview__section">
        <h2 className="c-overview__headline">Creating a portfolio is fast and simple</h2>

        <div className="c-overview__workflow">
          <div className="c-overview__workflow-item">
            <img
              className="c-overview__workflow-image"
              src="https://cdn.content.co/portfolio/img/workflow/user@2x.png"
              alt=""
            />
            <div className="c-overview__workflow-content">
              <h4
                className="c-overview__workflow-title g-text__primary"
              >
                Show off your personality
              </h4>
              <p className="c-overview__workflow-text g-text__content">
                  Add your background and expertise to help brands to identify your tone of voice
              </p>
            </div>
          </div>

          <div className="c-overview__workflow-item">
            <img
              className="c-overview__workflow-image"
              src="https://cdn.content.co/portfolio/img/workflow/work@2x.png"
              alt=""
            />
            <div className="c-overview__workflow-content">
              <h4 className="c-overview__workflow-title g-text__primary">Display your best work</h4>
              <p className="c-overview__workflow-text g-text__content">
                  The best creators typically upload 10 or more works
              </p>
            </div>
          </div>

          <div className="c-overview__workflow-item">
            <img
              className="c-overview__workflow-image"
              src="https://cdn.content.co/portfolio/img/workflow/arrange@2x.png"
              alt=""
            />
            <div className="c-overview__workflow-content">
              <h4 className="c-overview__workflow-title g-text__primary">Keep up to date</h4>
              <p className="c-overview__workflow-text g-text__content">
                  Arrange your work to put your most promising content at the top
              </p>
            </div>
          </div>
        </div>

        <div className="c-overview__video--wrap">
          <div className="c-overview__video">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/e9f5JwAv5C4" frameBorder="0" allowFullScreen />
          </div>
        </div>

      </div>


      <div className="c-overview__footer">
        <ul>
          <li>
            <a
              target="_blank"
              href="https://content.co/terms"
              rel="noopener"
            >Terms
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://content.co/privacy"
              rel="noopener"
            >Privacy
            </a>
          </li>
          <li>
            <a
              href="mailto:contact@content.co?subject=I%20want%20to%20learn%20more%20about%20content.co!&body=Hi%20Team!%0D%0A%0D%0A%0D%0AMy%20name%20is%20_____%20and%20I%20would%20like%20to%20learn%20more%20about%20Content.co.%0D%0A%0D%0A%0D%0AThanks!"
            >
                contact@content.co
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
}
