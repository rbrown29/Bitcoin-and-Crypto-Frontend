import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Header from './components/Header';
import DataT1 from './components/DataT1';
import About from './components/About';
import Price from './components/Price';
import Show from './components/Show';

let baseUrl = process.env.REACT_APP_APP_API_URL;
let baseUrl3 = process.env.REACT_APP_API_URL;



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
      price: [],
      isLoaded: false
    }
  }
  fetchPosts = () => {
    Promise.all([fetch(`${baseUrl}`), fetch(`${baseUrl3}`)])
      .then(([data, data3]) => Promise.all([data.json(), data3.json()]))
      .then(([jData, jData3]) => {
        this.setState({
          news: jData,
          price: jData3,
          isLoaded: true
        })
      }).catch(err => console.log(err))
  }

  componentDidMount() {
    this.fetchPosts()
  }


  render() {
    console.log(this.state.price);
    console.log(this.state.news);
    const { isLoaded } = this.state;
    if (!isLoaded) {
      return <div>No Data!</div>
    } else {
      return (
        <>
          <Router>
            <Route exact path="/">
              <ul>
                <li><Link to="/About">About | </Link></li>
                <li><Link to="/Price"> Crypto Prices |</Link></li>
              </ul>
              <Header price={this.state.data1} />
              <DataT1 news={this.state.news.articles} />
            </Route>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/show" component={Show} />
              <Route path="/price" component={Price} />
            </Switch>
          </Router>
        </>
      )
    }
  }

}

export default App;
