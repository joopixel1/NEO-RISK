import { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";// Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";// Bootstrap Bundle JS
import Carousel from 'react-bootstrap/Carousel';
import Section from './Section';
import './App.css';

export default function Home() {
  const [index, setIndex] = useState(0)
  const [data, setData] = useState([])
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  const getImage = async () => {
    try{
    const res = await fetch('https://images-api.nasa.gov/search?q=asteriod&media_type=image');
    const valAst = await res.json()
    setTimeout(500);
    const reso = await fetch('https://images-api.nasa.gov/search?q=comet&media_type=image');
    const valCom = await reso.json()
      
    const pic =  [ ...valAst.collection.items.slice(0, 5), ...valCom.collection.items.slice(0, 5) ]
    const answers = []

    let i;
    for(i=0; i<10; i++) {
      const r = await fetch(pic[i].href)
      const p = await r.json()

      answers.push(p[0])
    }

    return answers
    }
    catch (err) {
      console.log(err);
      return [];
    }
  }

  // useEffect to make the API call when the component mounts
  useEffect(() => { 
    const fetchData = async () => {
      try {
        const images = await getImage()

        const response = await fetch('https://ssd-api.jpl.nasa.gov/sentry.api');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        const ans= result.data.map((item) => {
          const i = {};
          i.sci_risk = item.ps_max; //risk
          i.risk = item.ts_max;
          i.fullname = item.fullname;
          i.diameter = item.diameter;
          i.impacts = item.n_imp;
          i.probability = item.ip; 
          i.last_obs = item.last_obs;

      
          i.imageUrl = images[Math.floor(Math.random() * 10)];

          return i;
        }).sort((a, b) => b.sci_risk - a.sci_risk).slice(0, 100)
        setData(ans)
      } 
      catch (error) {
        console.error('Error fetching data:', error)
      }
    }  
    fetchData();
  }, [setData])




  return (
    <div className='App'>
      <header>
      <nav>
        <img src="/neorisk.png" height={50} width={50} alt="Neo-Risk" />
        <h1>NEO-RISK</h1>
      </nav>
      </header>
      <div className="diagonal-line"></div>
      
      <Carousel activeIndex={index} onSelect={handleSelect}>

        {
          data.map((item) => (
            <Carousel.Item >
              <Section imageUrl={item.imageUrl} name={item.fullname}  impact={item.impacts} probability={item.probability} risk={item.sci_risk} diameter={item.diameter} last_obs={item.last_obs}/>
              <Carousel.Caption>
                <h3>{item.fullname}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))
        }

      </Carousel>
    </div>
  );
}
