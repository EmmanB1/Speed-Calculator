import React, { useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import { useEffect } from 'react';
import Input from '../elements/Input';
import Toggle from 'react-styled-toggle'
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
  const [start, setStart] = useState("") 
  const [end, setEnd] = useState("")
  const [transit, setTransit] = useState("walking")
  const [depart, setDepart] = useState('None')
  const [arrival, setArrival] = useState('None')
  // gets data from textbox fields and stores it into proper states
  async function calDist() {
    console.log(transit)
    console.log(depart)
    // set to default in case if no time
    // use await to make sure that all of the operations occur accordingly
    if (depart == '') {
      await setDepart('None')
    }
    if (arrival == '') {
      await setArrival('None')
    }
    if (start == '') {
      await setStart('None')
    }
    if (end == '') {
      await setEnd('None')
    }
    await fetch('/create_route/' + start + '/' + end + '/' + transit + '/' + depart + '/' + arrival)
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setInfo(data);
       })
       .catch((err) => {
        setInfo({speed: "Error",
                message: "Could not calculate speed"});
      });
    
  }
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
  const handleStart = event => {
    setStart(event.target.value)
  }
  const handleEnd = event => {
    setEnd(event.target.value)
  }
  const handleDepart = event => {
    setDepart(event.target.value)
  }
  const handleArrival = event => {
    setArrival(event.target.value)
  }
  const handleSelect = event => {
    setTransit(event.target.value)
  }
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              <span className="text-color-primary">GeoSpeed</span>
            </h1>
            <div className="cta-action">
              Start Point (Required)
              <Input id="start_loc" type="text" label="Subscribe" labelHidden hasIcon="right" placeholder="Start Location" value={start} onChange={handleStart} >
              </Input>
              Destination (Required)
              <Input id="end_loc" type="text" label="Subscribe" labelHidden hasIcon="right" placeholder="End Location" value={end} onChange={handleEnd}/>
              Departure time
              <Input id="depart" type="datetime-local" step="2" label="Subscribe" labelHidden hasIcon="right" placeholder="Departure Time (future)" value={depart} onChange={handleDepart}/>
              Arrival time (Required)
              <Input id="arrival" type="datetime-local" step="2" label="Subscribe" labelHidden hasIcon="right" placeholder="Arrival Time (future)" value={arrival} onChange={handleArrival}/>
              <select onChange={handleSelect}>
                <option value="walking"> Select mode of transportation </option>
                <option value="walking"> Walking </option>
               {/*  <option value="driving"> Car </option>
                <option value="transit"> Bus </option>
                <option value="cycling"> Bike </option> */}
              </select>
              <Toggle labelLeft="Future Date"/>
              <Button color="primary" onClick={() => calDist()}>Compute Distance</Button>
            </div>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                Calculate the speed you need to get from Point A to Point B
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
              <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
                Speed: {info['speed']}
                <br/>
                Message: {info['message']}
              </h1>
                {/* <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile href="https://cruip.com/">
                    Get started
                    </Button>
                  <Button tag="a" color="dark" wideMobile href="https://github.com/cruip/open-react-template/">
                    View on Github
                    </Button>
                </ButtonGroup> */}
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
          {/*<Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://player.vimeo.com/video/174002812"
              videoTag="iframe" />*/}
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;