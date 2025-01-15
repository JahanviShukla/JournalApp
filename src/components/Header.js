import React from 'react';
import { MdModeNight } from "react-icons/md";

const Header = ({ handleToggleDarkMode}) => {
	return (
		<div className='header'>
			<h1>Journal App</h1>

			<button
				onClick={() =>	
					handleToggleDarkMode(
						(previousDarkMode) => !previousDarkMode
					)
				}
				className='save'
			
			>
					< MdModeNight/> Mode
			</button>

			
		</div>
	);
};

export default Header;