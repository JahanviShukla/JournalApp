import React, { Component } from 'react';
import { MdSearch } from 'react-icons/md';

class Search extends Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		this.props.handleSearchNote(event.target.value);
	}

	render() {
		return (
			<div className='search'>
				<MdSearch className='search-icons' size='1.3em' />
				<input
					onChange={this.handleInputChange}
					type='text'
					placeholder='type to search...'
				/>
			</div>
		);
	}
}

export default Search;
