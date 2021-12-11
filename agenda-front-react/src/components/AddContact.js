import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ContactService from '../services/ContactService';

const AddContact = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [cellphone, setCellphone] = useState('');
    const history = useHistory();
    const { id } = useParams();

    const saveOrUpdateContact = (e) => {
        e.preventDefault();

        const contact = { firstName, lastName, emailId, cellphone };

        if (id) {
            ContactService.updateContact(id, contact).then((response) => {
                history.push('/contacts');
            }).catch(error => {
                console.log(error);
            })
        } else {
            ContactService.createContact(contact).then((response) => {

                console.log(response.data);

                history.push('/contacts');

            }).catch(error => {
                console.log(error);
            })
        }

    }

    useEffect(() => {

        ContactService.getContactById(id).then((response) => {
            setFirstName(response.data.firstName)
            setLastName(response.data.lastName)
            setEmailId(response.data.emailId)
            setCellphone(response.data.cellphone)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const title = () => {
        if (id) {
            return <h2 className="text-center">Edit Contact</h2>
        } else {
            return <h2 className="text-center">Add Contact</h2>
        }
    }

    return (
        <div>
            <br /><br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">First Name: </label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Last Name: </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Email: </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Email"
                                        name="emailId"
                                        className="form-control"
                                        value={emailId}
                                        onChange={(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Cellphone: </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Cellphone"
                                        name="cellphone"
                                        className="form-control"
                                        value={cellphone}
                                        onChange={(e) => setCellphone(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-success text-center w-25" onClick={(e) => saveOrUpdateContact(e)}>Save</button>
                                    <Link to="/contacts" className="btn btn-danger text-center ml-2 w-25">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddContact
