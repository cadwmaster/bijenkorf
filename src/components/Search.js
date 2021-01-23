import './Search.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BiX, BiSearch } from 'react-icons/bi';
import { debounce } from 'lodash';

class Search extends Component {
	static defaultProps = {
		debounceTime: 500,
		placeholder: 'Zoeken',
		minLength: 3,
		onChange: () => { },
		suggestions: [],
		initialValue: ''
	};

	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			parsedSuggestions: [],
			text: this.props.initialValue
		};
		this.textInput = React.createRef();
		this.__throttleHandleChange = debounce(this.__throttleHandleChange.bind(this), this.props.debounceTime);
	};

	componentDidMount() {
		this.textInput.current.focus();
		this.componentDidUpdate({});
	};

	componentDidUpdate(prevProps) {
		if (this.props.suggestions !== prevProps.suggestions) {
			const currentWord = this.state.text;
			const regex = new RegExp(currentWord, 'igu');
			const parsedSuggestions = this.props.suggestions.map(item => {
				item.__html = item.searchterm.replace(regex, `<b>${currentWord}</b>`);
				return item;
			});
			this.setState({ parsedSuggestions });
		}
	};

	render() {
		return (
			<div className="search-component">
				<div className="search-container">
					<input
						type="text"
						ref={this.textInput}
						value={this.state.text}
						placeholder={this.props.placeholder}
						onChange={this.handleChange}
						aria-label="Search"
					/>
					<div className="icons">
						<BiX data-testid="clear-button" className="react-icons clear" onClick={this.handleClear} />
						<BiSearch className="react-icons" />
					</div>
				</div>
				<div className={`suggestions-container ${this.state.parsedSuggestions.length === 0 ? 'empty': '' }`}>
					<ul>
						{this.state.parsedSuggestions.map(
							(item, index) => (
								<li key={index} data-index={index} className="suggestion-container" onClick={this.handleClick}>
									<span dangerouslySetInnerHTML={item} />
									<span className="number-results">({item.nrResults})</span>
								</li>
							),
						)}
					</ul>
				</div>
			</div>
		);
	};

	__throttleHandleChange(value) {
		this.props.onChange(value);
	};

	handleChange = (event) => {
		const target = event.target;
		this.setState({
			text: event.target.value
		});

		if (target.value && target.value.length >= this.props.minLength) {
			this.__throttleHandleChange(target.value);
		} else {
			this.setState({
				parsedSuggestions: []
			});
		}
	};

	handleClear = () => {
		this.setState({
			text: '',
			parsedSuggestions: []
		});
	};

	handleClick = (event) => {
		const index = event.target.getAttribute('data-index');
		const searchTerm = this.props.suggestions[index].searchterm;

		if (searchTerm) {
			this.setState({
				text: searchTerm
			});

			this.__throttleHandleChange(searchTerm);
		}
	}
}

Search.propTypes = {
	debounceTime: PropTypes.number,
	placeholder: PropTypes.string,
	minLength: PropTypes.number,
	onChange: PropTypes.func,
	suggestions: PropTypes.array,
	initialValue: PropTypes.string
};

export default Search;