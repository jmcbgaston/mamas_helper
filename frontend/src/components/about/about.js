import React from 'react';
import linkedIn from '../../images/linkedin.png'
import github from '../../images/github.svg'
import daniel from '../../images/daniel.png'
import jose from '../../images/jose.png'
import jason from '../../images/jason.png'
import alvin from '../../images/alvin.png'
 
const About = () => (
  <div className="about">

    <ul className="about-main-ul">    
        <img className="prof-pic" src={daniel} />
        <ul className="about-sub-ul">
            <li className="about-name">Daniel Ackroyd-Isales</li>
            <li className="about-role">insert role here</li>
            <ul className="about-links-ul">
                <li><a href="https://www.linkedin.com/in/daniel-ackroyd-isales/">
                        <img src={linkedIn} alt="LinkedIn Link"/>
                </a></li>
                <li><a href="http://github.com/dackroydisales">
                    <img src={github} alt="GitHub Link"/>
                </a></li>
            </ul>
        </ul>
    </ul>

    <ul className="about-main-ul">    
        <img className="prof-pic" src={jose} />
        <ul className="about-sub-ul">
            <li className="about-name">Jose Gaston</li>
            <li className="about-role">insert role here</li>
            <ul className="about-links-ul">
                <li><a href="https://www.linkedin.com/in/jose-maria-canuto-b-gaston-904411115/">
                        <img src={linkedIn} alt="LinkedIn Link"/>
                </a></li>
                <li><a href="https://github.com/jmcbgaston">
                    <img src={github} alt="GitHub Link"/>
                </a></li>
            </ul>
        </ul>
    </ul>

    <ul className="about-main-ul">    
        <img className="prof-pic" src={jason} />
        <ul className="about-sub-ul">
            <li className="about-name">Jason Zhen</li>
            <li className="about-role">insert role here</li>
            <ul className="about-links-ul">
                <li><a href="https://www.linkedin.com/in/jazhen/">
                        <img src={linkedIn} alt="LinkedIn Link"/>
                </a></li>
                <li><a href="https://github.com/jazhen">
                    <img src={github} alt="GitHub Link"/>
                </a></li>
            </ul>
        </ul>
    </ul>

    <ul className="about-main-ul">    
        <img className="prof-pic" src={alvin} />
        <ul className="about-sub-ul">
            <li className="about-name">Alvin Chong</li>
            <li className="about-role">insert role here</li>
            <ul className="about-links-ul">
                <li><a href="https://www.linkedin.com/in/alvin-chong-4b88011a1/">
                        <img src={linkedIn} alt="LinkedIn Link"/>
                </a></li>
                <li><a href="https://github.com/alvinc90">
                    <img src={github} alt="GitHub Link"/>
                </a></li>
            </ul>
        </ul>
    </ul>

  </div>
)

export default About;
