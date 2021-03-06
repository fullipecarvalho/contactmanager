import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Contact extends Component {
	state = {
		showContactInfo: false
	};

	onDeleteClick = async (id, dispatch) => {
		try {
			await axios.delete('https://jsonplaceholder.typicode.com/users/' + id);
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		} catch (e) {
			dispatch({ type: 'DELETE_CONTACT', payload: id });
		}
	};

	render() {
		const { contact } = this.props;
		const { showContactInfo } = this.state;
		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{contact.name}{' '}
								<i
									onClick={() =>
										this.setState({
											showContactInfo: !this.state.showContactInfo
										})
									}
									className="fas fa-sort-down"
									style={{ cursor: 'pointer' }}
								/>
								<i
									onClick={this.onDeleteClick.bind(this, contact.id, dispatch)}
									className="fas fa-times"
									style={{ cursor: 'pointer', color: 'red', float: 'right' }}
								/>
								<Link to={`contact/edit/${contact.id}`}>
									<i
										className="fas fa-pencil-alt"
										style={{
											cursor: 'pointer',
											color: '#007bff',
											float: 'right',
											fontSize: '21px',
											marginRight: '1rem'
										}}
									/>
								</Link>
							</h4>
							{showContactInfo ? (
								<ul className="list-group">
									<li className="list-group-item">Email: {contact.email}</li>
									<li className="list-group-item">Phone: {contact.phone}</li>
								</ul>
							) : null}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired
};

export default Contact;
