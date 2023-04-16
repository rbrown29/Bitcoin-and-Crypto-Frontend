import React from 'react';
import Show from './Show';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from "react-router-dom";

class DataT1 extends React.Component {
	render () {
		return (
		<div className="div1">
			{this.props.news.map((article, index) =>
			        <Link key={index}  to={{
 						 pathname: '/Show',
  						 state: {
    						news: this.props.news[index]
 					 	} 
 					 }}>
					<dl className="dlOne">
					<dt><h3>{article.title}</h3></dt>
	    			<dd id="title"></dd>
	    			<dt>-----------------------------------------------------------------------------</dt>
					<dt>Author: {article.author}</dt>
					<dd id="Author"></dd>
					<dt>Description: {article.description}</dt>
	    			<dd id="description"></dd>
					</dl></Link>
					
				)}

	    </div>


		);

	}

}

export default DataT1;