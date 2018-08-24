import React from 'react'
import { render } from 'react-dom'
import './stylesheets/ui.scss'
import './stylesheets/index.scss'

import { App } from './components/App';
//import {DrillDown} from './components/DrillDown';

import {Router, Route, hashHistory} from 'react-router'
import {Whoops404} from './components/Whoops404'
window.React = React

render(
	<Router history={hashHistory}>
		<Route path='/' component={App} />
		
		<Route path="*" component={Whoops404}/>
	</Router>,
	document.getElementById('react-container')
)
