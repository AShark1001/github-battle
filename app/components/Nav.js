import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './nav.css';

function Nav() {
	return (
		<ul className='nav'>
			<li>
				<NavLink exact activeclass='active' to="/">
					Home
				</NavLink>
			</li>

			<li>
				<NavLink exact activeclass='active' to="/battle">
					Battle
				</NavLink>
			</li>

			<li>
				<NavLink exact activeclass='active' to="/popular">
					Popular
				</NavLink>
			</li>
		</ul>
	)
}

export default Nav;