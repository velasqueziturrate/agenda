import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ContactService from '../services/ContactService';

const ListContacts = () => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts();
    }, []);

    const getAllContacts = () => {
        ContactService.getContacts().then((response) => {
            setContacts(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const deleteContact = (contactId) => {
        ContactService.deleteContact(contactId).then((response) => {
            getAllContacts();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className = "container">
            <h2 className= "text-center">Agenda</h2>
            <Link to = "/add-contact" className="btn btn-primary mb-2">Add Contact</Link>
            <table className= "table table-bordered table-striped">
                <thead>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Cellphone</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {
                        contacts.map(
                            contact => 
                            <tr key = {contact.id}>
                                <td>{contact.id}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td>{contact.emailId}</td>
                                <td>{contact.cellphone}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-contact/${contact.id}`}>Edit</Link>
                                    <button className="btn btn-danger ml-2" onClick={() => deleteContact(contact.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListContacts;

