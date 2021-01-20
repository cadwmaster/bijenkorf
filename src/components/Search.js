import './Search.css';

import React, { Component } from 'react';
import { BiX, BiSearch } from 'react-icons/bi';
import { debounce } from 'lodash';

class Search extends Component {
	static defaultProps = {
		debounceTime: 500,
		placeholder: 'Zoeken',
		minLength: 3,
		onChange: () => { },
		suggestions: []
	};

	constructor(props) {
		super(props);
		this.state = {
			focus: false,
			parsedSuggestions: []
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
			const currentWord = this.textInput.current.value;
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
			<div>
				<div className="search-container">
					<input
						type="text"
						ref={this.textInput}
						placeholder={this.props.placeholder}
						onChange={this.__handleChange}
					/>
					<BiX data-testid="clear-button" className="react-icons" onClick={this.__handleClear} />
					<BiSearch className="react-icons" />
				</div>
				<div className="suggestions-container">
					<ul>
						{this.state.parsedSuggestions.map(
							(item, index) => (
								<div key={index} className="suggestion-container">
									<li dangerouslySetInnerHTML={item} />
								</div>
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

	__handleChange = (event) => {
		const target = event.target;

		if (target.value && target.value.length >= this.props.minLength) {
			this.__throttleHandleChange(target.value);
		} else {
			this.setState({
				parsedSuggestions: []
			});
		}
	};

	__handleClear = () => {
		this.textInput.current.value = '';
		this.setState({
			parsedSuggestions: []
		});
	};
}

export default Search;