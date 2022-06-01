import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import Draggable, {DraggableCore} from 'react-draggable';
import './index.css';
import './transition.css';
import './forms.css';
import './constructor.css';
import './final.css';
import disclaimerImg from './img_test/icon_disclaimer.svg';
import splashImg from './img_test/logo_inside_both.svg';
import blob from './img_test/ryba_new.svg';
import finalBlob from './img_test/final_blob.svg';
import blobFiction from './img_test/blob_fiction.png';
import coinBlob from './img_test/coin_blob.svg';
import coinText from './img_test/coin_text.svg';
import graveartRyba from './img_test/graveart_ryba.svg';
import $ from 'jquery';
import { Markup } from 'interweave';

function customClose() {
  window.opener=null;
  window.open('','_self');
  window.close();
}

function breakLine(text) {
    var br = React.createElement('br');
    var regex = /(<br \/>)/g;
    return text.split(regex).map(function(line, index) {
        return line.match(regex) ? <br key={"key_" + index} /> : line;
    });
}

class ExitScreen extends React.Component {
  render() {
    return (
      <div className='exit-container'>
        <div className="btn-container-exit">
          <button className="btn-exit btn-close-window" onClick={() => customClose()}>exit</button>
          <button className="btn-exit btn-graveyard">go to the graveyard</button>
        </div>
      </div>
    );
  }
}


function Splash() {
  return(
    <div className="splash-screen">
      <div className="img-container splash">
        <img className="splash-img logo-inside" src={splashImg} alt=""/>
      </div>
      <div className="comment">
        <p className="comment-p">scroll to discuss death</p>
      </div>
    </div>
  );
}

function Q1({ formData, setFormData }) {
  return (
    <div className="q-container">
      <textarea
        value={formData.q1}
        onChange={(event) =>
          setFormData({ ...formData, q1: event.target.value })
        }
        placeholder="type your answer here..."
      />
    </div>
  );
}

function Q2({ formData, setFormData }) {
  return (
    <div className="q-container">
      <textarea
        value={formData.q2}
        onChange={(e) => {
          setFormData({ ...formData, q2: e.target.value });
        }}
      />
    </div>
  );
}

function Q3({ formData, setFormData }) {
  return (
    <div className="q-container">
      <textarea
        value={formData.q3}
        onChange={(e) => {
          setFormData({ ...formData, q3: e.target.value });
        }}
      />
    </div>
  );
}

function Q4({ formData, setFormData }) {
  return (
    <div className="q-container">
      <textarea
        value={formData.q4}
        onChange={(e) => {
          setFormData({ ...formData, q4: e.target.value });
        }}
      />
    </div>
  );
}

function Q5({ formData, setFormData }) {
  return (
    <div className="q-container">
      <textarea
        value={formData.q5}
        onChange={(e) => {
          setFormData({ ...formData, q5: e.target.value });
        }}
      />
    </div>
  );
}


// form submit and transition to tombstone construction
// ex Questions
function Continue() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const FormTitles = [
    "1/5&nbsp;&nbsp;&nbsp;&nbsp;am i afraid <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of death?",
    "2/5&nbsp;&nbsp;&nbsp;&nbsp;how do i see<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;my<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; death?",
    "3/5&nbsp;&nbsp;&nbsp;&nbsp;what legacy <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; will &nbsp;&nbsp;&nbsp;&nbsp; i &nbsp;&nbsp;&nbsp;&nbsp; leave?",
    "4/5&nbsp;&nbsp;&nbsp;&nbsp;how will i <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;remembered?",
    "5/5&nbsp;&nbsp;&nbsp;&nbsp;what happens <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;after i die?"
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <Q1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Q2 formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <Q3 formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return <Q4 formData={formData} setFormData={setFormData} />;
    } else if (page === 4) {
      return <Q5 formData={formData} setFormData={setFormData} />;
    }
  };


  const [showForm, setShowForm] = useState(true);
  const [showTombstone, setShowTombstone] = useState(false);

  const transitionToTombstone = () => {
    setShowForm(false);
    setTimeout(() => {
      setShowTombstone(true);
    }, 4000);
  };

  return (
    <div className='continue-container'>
      <CSSTransition
        in={showForm}
        timeout={3000}
        classNames="questions"
        unmountOnExit
        onExiting={() => setShowForm(false)}
      >
      {<div className="container-app">
        <Splash />
        <div className="splash-form-screen">
          <div className="form">
            <div className='progress-container'>
              <div className="dot dot-active"></div>
              <div className="dot" style={{opacity: page >= 1 ? "100%" : "10%"}}></div>
              <div className="dot" style={{opacity: page >= 2 ? "100%" : "10%"}}></div>
              <div className="dot" style={{opacity: page >= 3 ? "100%" : "10%"}}></div>
              <div className="dot" style={{opacity: page >= 4 ? "100%" : "10%"}}></div>
            </div>
            <h1 className="form-title"><Markup content={FormTitles[page]} /></h1>
            <div className="form-container">
              {PageDisplay()}
              <div className="comment">
                <p className="comment-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; these answers will be your manifesto <br/>and will be used in the final version of the tombstone <br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;answer sincerely</p>
              </div>
              <h1 className="btn-disclaimer"
                onClick={() => {
                  if (page === FormTitles.length - 1) {
                    transitionToTombstone();
                    console.log(formData);
                  } else {
                    commentFadeOut();
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >next
              </h1>
            </div>
          </div>
        </div>
      </div>}
      </CSSTransition>
      <CSSTransition
        in={showTombstone}
        timeout={3000}
        classNames="constructor-3s"
        unmountOnExit
        onEnter={() => setShowForm(false)}
      >
      <TombstoneConstructor/>
      </CSSTransition>
    </div>
  );
}

// <TestData formData={formData} />
function TestData({formData}) {
  return (
    <div className="tombstone-constructor">
      {formData.q5}
    </div>
  );
}


function CharacterLeft() {
  return (
    <div className='draggable-container left'>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch1 to-clone' onClick={scaleSymbol()}></div>
        </Draggable>
        <Draggable>
          <div className='ch ch2'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch3'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch4'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch5'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch6'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch7'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch8'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch9'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch10'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch11'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch12'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch13'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch14'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch15'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch16'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch17'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch18'></div>
        </Draggable>
      </div>
      <div className='symbol-line' style={{height: "6.8vh"}}>
        <Draggable>
          <div className='ch ch19'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch20'></div>
        </Draggable>
      </div>
    </div>
  );
}

function CharacterRight() {
  return (
    <div className='draggable-container right'>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch21'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch22' style={{width: "18%", paddingLeft: "10px"}}></div>
        </Draggable>
        <Draggable>
          <div className='ch ch23'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch24'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch25'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch26'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch27'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch28'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch29'></div>
        </Draggable>
      </div>
      <div className='symbol-line' style={{height: "6.8vh"}}>
        <Draggable>
          <div className='ch ch30'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch31'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch32'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch33'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch34'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch35'></div>
        </Draggable>
      </div>
      <div className='symbol-line'>
        <Draggable>
          <div className='ch ch36'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch37'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch38'></div>
        </Draggable>
      </div>
      <div className='symbol-line'  style={{height: "6.8vh"}}>
        <Draggable>
          <div className='ch ch39'></div>
        </Draggable>
        <Draggable>
          <div className='ch ch40'></div>
        </Draggable>
      </div>
    </div>
  );
}


function ValuesLeft() {
  return (
    <div className='draggable values'>
      <div className="draggable-l">
        <Draggable>
          <div className="circle chs vl1"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl2"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl3"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl4"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl5"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl6"></div>
        </Draggable>
      </div>
    </div>
  );
}

function ValuesRight() {
  return (
    <div className='draggable values right'>
      <div className="draggable-r">
        <Draggable>
          <div className="circle chs vl7"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl8"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl9"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl10"></div>
        </Draggable>
        <Draggable>
          <div className="circle chs vl11"></div>
        </Draggable>
      </div>
    </div>
  );
}

function Characters() {
  return (
    <div>
      <CharacterLeft />
      <CharacterRight />
    </div>
  );
}

function Values() {
  return (
    <div>
      <ValuesLeft />
      <div className="draggable-container left drop-field"></div>
      <ValuesRight />
    </div>
  );
}

$(document).ready(function() {
  $('.medallion-inner').click(function() {
    $(this).toggleClass('medallion-reversed');
  })
})

function FinalRyba() {
  const [showForm, setShowForm] = useState(true);
  const [showTombstone, setShowTombstone] = useState(false);
  const [showEx, setShowEx] = useState(false);

  const transitionToEx = () => {
    setShowForm(false);
    setTimeout(() => {
      setShowEx(true);
    }, 4000);
  };

  const transitionToFinal = () => {
    setShowForm(false);
    setTimeout(() => {
      setShowTombstone(true);
    }, 4000);
  };

  return (
    <div className="dark-screen">
      <CSSTransition
        in={showForm}
        timeout={3000}
        classNames="questions"
        unmountOnExit
        onExiting={() => setShowForm(false)}
      >{<div className="final-container">
          <h1 className="form-title">your tombstone</h1>
          <div className="coin-page">
            <div class="medallion">
              <div class="medallion-inner">
                <div class="medallion-inner-front"></div>
                <div class="medallion-inner-back"></div>
              </div>
            </div>
          </div>
          <div className="btn-container final-left">
            <h1 className="btn-constructor">download</h1>
            <h1 className="btn-constructor">share</h1>
          </div>
          <div className="btn-container final">
            <h1 className="btn-constructor" onClick={() => transitionToFinal()}>visit<br/> graveyard</h1>
          </div>
        </div>}
      </CSSTransition>
      <CSSTransition
        in={showEx}
        timeout={5000}
        classNames="ex"
        unmountOnExit
        onEnter={() => setShowForm(false)}
      >
      <ExitScreen />
      </CSSTransition>
      <CSSTransition
        in={showTombstone}
        timeout={5000}
        classNames="ex"
        unmountOnExit
        onEnter={() => setShowForm(false)}
      >
      <GraveartRyba />
      </CSSTransition>
    </div>
  );
}

function GraveartRyba() {
  return (
    <div className="graveyard-container">
      <h1 className="form-title">cemetry</h1>
      <div className="arrows-final"></div>
      <div className="cemetry-trigger"></div>
      <div className="cemetry-final"></div>
    </div>
  );
}

function commentFadeOut() {
  $(".comment").fadeOut("slow");
}

function scaleSymbol() {
    //this will attach the class to every target
    $(document).on('click', function (event) {
      if ($(event.target).hasClass('ch')) {
        $(event.target).addClass('ch-large');
      }
    });

}


function TombstoneConstructor() {
  const [page, setPage] = useState(0);
  const [showForm, setShowForm] = useState(true);
  const [showTombstone, setShowTombstone] = useState(false);

  const transitionToFinal = () => {
    setShowForm(false);
    setTimeout(() => {
      setShowTombstone(true);
    }, 4000);
  };


  const FormTitles = [
    "this is the form of your<br/>tombstone",
    "choose<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;what best describes you<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;as a person",
    "what is important for you?"
  ];

  const CharacterDisplay = () => {
    if (page === 1) {
      return <Characters />
    } else if (page === 2) {
      return <Values />
    }
  };

  return(
    <div className="dark-screen">
      <CSSTransition
        in={showForm}
        timeout={3000}
        classNames="questions"
        unmountOnExit
        onExiting={() => setShowForm(false)}
      >
      {<div className="constructor-container">
        <div className="constructor-steps">
          <h1 className="form-title"><Markup content={FormTitles[page]} /></h1>
          <div className='progress-container'>
            <div className="dot dot-active"></div>
            <div className="dot" style={{opacity: page >= 1 ? "100%" : "10%"}}></div>
            <div className="dot" style={{opacity: page >= 2 ? "100%" : "10%"}}></div>
          </div>
          <div className="constructor-field">
            <div className="blob-container">
              <div className="blob-field">
                <img className="constructor-img" src={blobFiction} alt=""/>
              </div>
              <h1 className="btn-constructor"
                onClick={() => {
                  if (page === FormTitles.length - 1) {
                    transitionToFinal();
                  } else {
                    commentFadeOut();
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >next
              </h1>
              <div className="comment">
                <p className="comment-p">this form</p>
                <p className="comment-p">was generated</p>
                <p className="comment-p">using your browser data</p>
              </div>
            </div>
          </div>
          {CharacterDisplay()}
          </div>
        </div>
    }
      </CSSTransition>
      <CSSTransition
        in={showTombstone}
        timeout={3000}
        classNames="constructor-3s"
        unmountOnExit
        onEnter={() => setShowForm(false)}
      >
      <FinalRyba />
      </CSSTransition>
    </div>
  );
}



function DisclaimerTransition() {
  const [showButton, setShowButton] = useState(true);
  const [showContinue, setShowContinue] = useState(false);
  const [showEx, setShowEx] = useState(false);

  const transitionToEx = () => {
    setShowButton(false);
    setTimeout(() => {
      setShowEx(true);
    }, 4000);
  };

  const transitionToContinue = () => {
    setShowButton(false);
    setTimeout(() => {
      setShowContinue(true);
    }, 4000);
  };

  return (
    <div className='container-app'>
      <CSSTransition
        in={showButton}
        timeout={4000}
        classNames="disc"
        unmountOnExit
        onExiting={() => setShowButton(false)}
      >
      {<div className='disc-container-wrap'>
        <div className='disclaimer-container'>
          <h1 style={{marginLeft: 65 + 'px'}}>disclaimer</h1>
          <div className="txt-main disclaimer">
            <p style={{marginLeft: 50 + 'px'}}>this site is made for therapeutic</p>
            <p style={{marginLeft: 30 + 'px'}}>and reflective purposes for people who</p>
            <p style={{marginLeft: 50 + 'px'}}>are open to the topic of their mortality</p>
            <p>if discussing death can trigger you or if you are</p>
            <p>still having a hard time discussing this subject,</p>
            <p>it is better <span className='btn-disclaimer txt' onClick={() => transitionToEx()}>to end your experience</span> right now</p>
            <p style={{marginLeft: 80 + 'px'}}>we will collect your data</p><br/>
            <p style={{marginLeft: 100 + 'px'}}>while you're here</p>
            <p style={{marginLeft: 90 + 'px'}}>this is safe and necessary to make your</p>
            <p style={{marginLeft: 80 + 'px'}}>tombstone personal and truthful</p>
            <p style={{marginLeft: 40 + 'px'}}>the goal of this experience is to create</p>
            <p style={{marginLeft: 30 + 'px'}}>a digitally personalized legacy,</p>
            <p style={{marginLeft: 50 + 'px'}}>that can be shared and through </p><br/>
            <p style={{marginLeft: 120 + 'px'}}>which we reflect</p><br/>
            <p style={{marginLeft: 125 + 'px'}}>on our life path</p>
          </div>
        </div>
        <div className="btn-container">
          <h1 className="btn-disclaimer" onClick={() => transitionToContinue()}>i want to <br/>continue</h1>
        </div>
      </div>}
      </CSSTransition>

      <CSSTransition
        in={showEx}
        timeout={5000}
        classNames="ex"
        unmountOnExit
        onEnter={() => setShowButton(false)}
      >
      <ExitScreen />
      </CSSTransition>

      <CSSTransition
        in={showContinue}
        timeout={4000}
        classNames="continue"
        unmountOnExit
        onEnter={() => setShowButton(false)}
      >
      <Continue />
      </CSSTransition>
    </div>
  );
}



ReactDOM.render(
  <FinalRyba />,
  document.getElementById('root')
);
