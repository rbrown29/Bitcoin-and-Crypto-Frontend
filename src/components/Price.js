import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

let baseUrl4 = 'https://api.coincap.io/v2/markets';
class Price extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data1: []
		}
	}
	fetchPosts = () => {
		fetch(`${baseUrl4}`,
			{
				method: 'GET',
				headers: { // set up headers...
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			})
			.then(response => response.json())
			.then(jData => {
				this.setState({
					data1: jData
				})
			}).catch(err => console.log(err))
	}
	

	componentDidMount() {
		this.fetchPosts()
	}


	render() {
		console.log(this.state.data1);
	
		return (
			<>
				<div>
					<ul>
						<li><Link to="/">Home |</Link></li>
						<li><Link to="/About"> About |</Link></li>
					</ul>
					<Header />
				</div>
				<div className="div2">
					<div>
						<table>
							<thead>
								<tr>
									<th>Coin</th>
									<th>Price</th>
									<th>Symbol</th>
								</tr>
							</thead>
							<tbody>
								{this.state.data1.data && this.state.data1.data.map((item, index) => (
									<tr key={index}>
										<td>{item.baseId}</td>
										<td>{item.priceUsd}</td>
										<td>{item.baseSymbol}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</>
		);
	}
}	




export default Price;