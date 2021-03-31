
import './App.css';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { useEffect, useRef, useState } from 'react';
import { getRequest } from './utils/apiRequests';
import { BASE_URL, GET_INTERNET_SPEED } from './utils/apiEndpoints';
import CountUp from 'react-countup'
import { Circle } from 'better-react-spinkit'

function App() {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [speed, setSpeed] = useState(null)
  let startMethod = useRef(null)

  useEffect(() => {
    getInternetSpeed()
  }, [])

  const getInternetSpeed = async () => {
    setError(null)
    try{
      setLoading(true)
      setSpeed(0)
      const response = await getRequest(BASE_URL + GET_INTERNET_SPEED)
      if (response.error) return setError("Something went wrong!")
      setLoading(false)
      setSpeed(Number(response.speed))
    }catch(err){
      setError("Something went wrong!")
    }
  }

  return (
    <div className="App">
      <div className="logo">
        <img src="https://cdn.speedcheck.org/images/reviews/fast-logo.png" alt="logo" />
      </div>
      <div className="body">
        <h3 className="heading">Your internet speed is</h3>
        <div className="top_section">
          <CountUp
            start={(speed && speed > 100 && speed < 1024) ? speed - 100 : 0}
            end={speed ? (speed > 1024 ? (speed / 1024).toFixed(2) : speed) : 0}
            decimals={speed > 1024 ? 2 : 0}
            duration={5}
            onEnd={() => console.log("End")}
            onStart={() => console.log("Start")}
          >
            {({ countUpRef }) => {
              return (
                <>
                  <div className="left">
                    <div className="speed_count" ref={countUpRef}/>
                  </div>
                  <div className="right">
                    <div className="speed_measure">{speed > 1024 ? "Mbps" : "Kbps"}</div>
                    {error && (<div className="error">{error}</div>)}
                    
                    <div className="reload" onClick={() => {
                      getInternetSpeed()
                    }}>
                      {loading ? <Circle /> : <FontAwesomeIcon icon={faRedoAlt} />}
                    </div>
                  </div>
                </>
              )
            }}
          </CountUp>

        </div>
      </div>
      <div className="footer">
        <button className="showmore_btn">Show more info</button>
        <div className="social_icons">
          <div className="icon_container">
            <FontAwesomeIcon className="icon_block" icon={faQuestion} />
          </div>
          <div className="icon_container">
            <FontAwesomeIcon className="icon_block" icon={faTwitter} />
          </div>
          <div className="icon_container">
            <FontAwesomeIcon className="icon_block" icon={faFacebook} />
          </div>
        </div>
        <div className="cradit">
          <span>Developed with ❤️ by <a href="https://github.com/coderkhalide">Khalid Saifullah</a>.</span>
        </div>
      </div>
    </div>
  );
}

export default App;
