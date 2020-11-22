import React from 'react';
import daniel from './daniel.png'
import jose from './jose.png'
import jason from './jason.png'
import alvin from './alvin.png'
import Back from '../back';
import {withRouter} from 'react-router-dom';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const About = (props) => (
  <>
    <div className="about">
      <ul className="about-main-ul">
        <img className="prof-pic" src={daniel} alt="Daniel" />
        <ul className="about-sub-ul">
          <li className="about-name">Daniel Ackroyd-Isales</li>
          <li className="about-role">insert role here</li>
          <ul className="about-links-ul">
            <li>
              <a href="https://www.linkedin.com/in/daniel-ackroyd-isales/">
                <LinkedInIcon className="about-icon" />
              </a>
            </li>
            <li>
              <a href="http://github.com/dackroydisales">
                <GitHubIcon className="about-icon" />
              </a>
            </li>
          </ul>
        </ul>
      </ul>

      <ul className="about-main-ul">
        <img className="prof-pic" src={jose} alt="Jose" />
        <ul className="about-sub-ul">
          <li className="about-name">Jose Gaston</li>
          <li className="about-role">insert role here</li>
          <ul className="about-links-ul">
            <li>
              <a href="https://www.linkedin.com/in/jose-maria-canuto-b-gaston-904411115/">
                <LinkedInIcon className="about-icon" />
              </a>
            </li>
            <li>
              <a href="https://github.com/jmcbgaston">
                <GitHubIcon className="about-icon" />
              </a>
            </li>
          </ul>
        </ul>
      </ul>

      <ul className="about-main-ul">
        <img className="prof-pic" src={jason} alt="Jason" />
        <ul className="about-sub-ul">
          <li className="about-name">Jason Zhen</li>
          <li className="about-role">insert role here</li>
          <ul className="about-links-ul">
            <li>
              <a href="https://www.linkedin.com/in/jazhen/">
                <LinkedInIcon className="about-icon" />
              </a>
            </li>
            <li>
              <a href="https://github.com/jazhen">
                <GitHubIcon className="about-icon" />
              </a>
            </li>
          </ul>
        </ul>
      </ul>

      <ul className="about-main-ul">
        <img className="prof-pic" src={alvin} alt="Alvin" />
        <ul className="about-sub-ul">
          <li className="about-name">Alvin Chong</li>
          <li className="about-role">insert role here</li>
          <ul className="about-links-ul">
            <li>
              <a href="https://www.linkedin.com/in/alvin-chong-4b88011a1/">
                <LinkedInIcon className="about-icon" />
              </a>
            </li>
            <li>
              <a href="https://github.com/alvinc90">
                <GitHubIcon className="about-icon" />
              </a>
            </li>
          </ul>
        </ul>
      </ul>
    </div>
    <Back history={props.history}/>
  </>
)

export default withRouter(About);
