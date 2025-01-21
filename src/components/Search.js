import React from 'react';
import { MdSearch } from 'react-icons/md';

const Search = ({ handleSearchNote }) => {
	const handleInputChange = (event) => {
		handleSearchNote(event.target.value);
	};

	return (
		<div className='search'>
			<MdSearch className='search-icons' size='1.3em' />
			<input
				onChange={handleInputChange}
				type='text'
				placeholder='type to search...'
			/>
		</div>
	);
};

export default Search;
