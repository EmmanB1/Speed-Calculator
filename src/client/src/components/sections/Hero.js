import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { useEffect } from 'react';
import Input from '../elements/Input';
const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const [videoModalActive, setVideomodalactive] = useState(false);
  const [info, setInfo] = useState("hello");
  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }
  let start = "Chicago" 
  let end = "Topgolf, Schaumburg"
  // gets direction data
  useEffect(() => {
    // using proxy to avoid warning
    fetch('/create_route/' + start + '/' + end)
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setInfo(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
  }, []);
  // useEffect(() => {
  //   // using proxy to avoid warning
  //   fetch('/get_direction_test')
  //      .then((res) => res.json())
  //      .then((data) => {
  //         console.log(data);
  //         setInfo(data);
  //      })
  //      .catch((err) => {
  //         console.log(err.message);
  //      });
  // }, []);
  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              {info['distance']}
              <span className="text-color-primary">GeoSpeed</span>
            </h1>
            <div className="cta-action">
              <Input id="start_loc" type="email" label="Subscribe" labelHidden hasIcon="right" placeholder="Start Location">
                <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
                </svg>
              </Input>
              <Input id="end_loc" type="email" label="Subscribe" labelHidden hasIcon="right" placeholder="End Location">
                <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
                </svg>
              </Input>
              <Input id="time" type="email" label="Subscribe" labelHidden hasIcon="right" placeholder="Arrival Time">
                <svg width="16" height="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H1c-.6 0-1 .4-1 1s.4 1 1 1h8v5l7-6-7-6v5z" fill="#376DF9" />
                </svg>
              </Input>
            </div>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Calculate the speed you need to get from Point A to Point B
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cruip.com/">
                    Get started
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button>
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={require('./../../assets/images/video-placeholder.jpg')}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
            videoTag="iframe" />
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;