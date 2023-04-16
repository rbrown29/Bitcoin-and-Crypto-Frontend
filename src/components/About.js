import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

class About extends React.Component {
	render() {
		return (
			<div>
				<ul>
					<li><Link to="/">Home |</Link></li>
					<li><Link to="/Price"> Crypto Price |</Link></li>
				</ul>
				<Header />
				<center><h3 className="h31">About Bitcoin</h3></center>
				<div className="div1">
					<h3>
						<p>The domain name "bitcoin.org" was registered on 18 August 2008. On 31 October 2008, a link to a paper authored by Satoshi Nakamoto titled Bitcoin:
							A Peer-to-Peer Electronic Cash System was posted to a cryptography mailing list. Nakamoto implemented the bitcoin software as open-source code and released it in January 2009.
							Nakamoto's identity remains unknown.</p>

						<p>	On 3 January 2009, the bitcoin network was created when Nakamoto mined the first block of the chain, known as the genesis block.
							Embedded in the coinbase of this block was the text "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks".
							This note references a headline published by The Times and has been interpreted as both a timestamp and a comment on the instability caused by fractional-reserve banking.</p>

						<p>	The receiver of the first bitcoin transaction was cypherpunk Hal Finney, who had created the first reusable proof-of-work system (RPoW) in 2004.
							Finney downloaded the bitcoin software on its release date, and on 12 January 2009 received ten bitcoins from Nakamoto. Other early cypherpunk supporters were creators of bitcoin predecessors: Wei Dai, creator of b-money, and Nick Szabo, creator of bit gold.
							In 2010, the first known commercial transaction using bitcoin occurred when programmer Laszlo Hanyecz bought two Papa John's pizzas for ₿10,000.</p>

						<p>	Blockchain analysts estimate that Nakamoto had mined about one million bitcoins before disappearing in 2010, when he handed the network alert key and control of the code repository over to Gavin Andresen. Andresen later became lead developer at the Bitcoin Foundation.
							Andresen then sought to decentralize control. This left opportunity for controversy to develop over the future development path of bitcoin, in contrast to the perceived authority of Nakamoto's contributions.</p>
						<p>Source: <a href="https://en.wikipedia.org/wiki/History_of_bitcoin" target="_blank" rel="noopener noreferrer">Wikipedia</a></p>
					</h3>
				</div>
			</div>
		)
	}
}

export default About;