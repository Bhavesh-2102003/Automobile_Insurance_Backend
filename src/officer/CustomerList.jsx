import axios from "axios"
import { useEffect, useState } from "react"


function CustomerList() {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contact, setContact] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [addFirstName, setAddFirstName] = useState("");
    const [addLastName, setAddLastName] = useState("");
    const [addContact, setAddContact] = useState("");
    const [addEmailAddress, setAddEmailAddress] = useState("");
    const [addGender, setAddGender] = useState("");
    const [addDob, setAddDob] = useState("");
    const [addCity, setAddCity] = useState("");
    const [addState, setAddState] = useState("");
    const [addCountry, setAddCountry] = useState("");
    const [addAddress, setAddAddress] = useState("");
    const [addStatus, setAddStatus] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');


    useEffect(() => {
    const getAllCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:8087/api/customer/all?page=${page}&size=${size}`)
            setCustomers(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    
        getAllCustomers()
    }, [page])

    const deleteCustomer = async (cid) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:8087/api/customer/delete/${cid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let temp = [...customers]; //is creating a copy of the customers array
            temp = temp.filter(c => c.id !== cid) //is filtering the customers array to remove the deleted customer
            setCustomers(temp)
        }
        catch (err) {
            console.log(err)
        }
    }

    const openUpdateModal = (customer) => {
        setSelectedCustomerId(customer.id);
        setFirstName(customer.firstName || "");
        setLastName(customer.lastName || "");
        setContact(customer.contact || "");
        setEmailAddress(customer.emailAddress || "");
    };

    const updateCustomer = async ($event, cid) => {
        $event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:8087/api/customer/update/' + cid, {
                'firstName': firstName,
                'lastName': lastName,
                'contact': contact,
                'emailAddress': emailAddress
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            let temp = customers.map(c => //is mapping the customers array to update the updated customer
                c.id === cid
                    ? { ...c, firstName, lastName, contact, emailAddress } //is updating the customer
                    : c
            );
            setCustomers(temp);
        } catch (err) {
            console.log(err)
        }
    }
    let body = {
        firstName: addFirstName,
        lastName: addLastName,
        contact: addContact,
        emailAddress: addEmailAddress,
        gender: addGender,
        dateOfBirth: addDob,
        city: addCity,
        state: addState,
        country: addCountry,
        address: addAddress,
        status: addStatus
    }
    
    const handleAddCustomer = async ($event) => {
        $event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8087/api/customer/add', body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setShowAddModal(false); //is setting the showAddModal to false
            getAllCustomers();
            dispatch(fetchCustomerCount()); // Refresh dashboard count after the customer added
        } catch (err) {
            console.log(err);
        }
    };

    const handlePrevPage = () => { // to go back prev page  
        if (page > 0) setPage(page - 1);
    };
    const handleNextPage = () => {  // to increment the page 
        if (customers.length === size) setPage(page + 1);
    };

    
    const filteredCustomers = customers.filter(customer => {
    //filter the customer by name 
        const matchesSearch = (customer.firstName + ' ' + customer.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toString().includes(searchTerm);
    //filter the status by active and the pending
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
            <div className="container-fluid">
                <div className="container mt-5" style={{ maxWidth: '95vw', fontSize: '1.2rem' }}>
                    <h1 className="mb-4" style={{ fontSize: '2.2rem', fontWeight: 700 }}>All Customers</h1>
                    <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>
                        Add Customer
                    </button>
    {/*Add Customer Modal*/} 
                    {showAddModal && (
                        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add Customer</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleAddCustomer}>
                                            <div className="mb-2">
                                                <label>First Name</label>
                                                <input type="text" value={addFirstName} className="form-control" onChange={$event => setAddFirstName($event.target.value)}  />
                                            </div>
                                            <div className="mb-2">
                                                <label>Last Name</label>
                                                <input type="text" value={addLastName} className="form-control" onChange={$event => setAddLastName($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Contact</label>
                                                <input type="text" value={addContact} className="form-control" onChange={$event => setAddContact($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Email</label>
                                                <input type="email" value={addEmailAddress} className="form-control" onChange={$event => setAddEmailAddress($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Gender</label>
                                                <select value={addGender} className="form-control" onChange={$event => setAddGender($event.target.value)} >
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label>Date of Birth</label>
                                                <input type="date" value={addDob} className="form-control" onChange={$event => setAddDob($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>City</label>
                                                <input type="text" value={addCity} className="form-control" onChange={$event => setAddCity($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>State</label>
                                                <input type="text" value={addState} className="form-control" onChange={$event => setAddState($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Country</label>
                                                <input type="text" value={addCountry} className="form-control" onChange={$event => setAddCountry($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Address</label>
                                                <input type="text" value={addAddress} className="form-control" onChange={$event => setAddAddress($event.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Status</label>
                                                <select value={addStatus} className="form-control" onChange={$event => setAddStatus($event.target.value)} >
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row g-3 mb-4 align-items-center">
                        <div className="col-md-4">
                            <input
                                type="text"
                                placeholder="Search by name or ID"
                                className="form-control"
                                value={searchTerm}
                                onChange={($event) => setSearchTerm($event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <select 
                                className="form-select"
                                value={statusFilter}
                                onChange={($event) => setStatusFilter($event.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            </select>
                    </div>
                    <div className="table-responsive" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)', borderRadius: '16px', padding: '32px', background: '#fff' }}>
                        <table className="table table-bordered table-hover align-middle" style={{ fontSize: '1.1rem', minWidth: '1200px' }}>
                            <thead className="table-dark">
                                <tr>
                                    <th style={{ fontSize: '1.15rem' }}>#ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Gender</th>
                                    <th>Date of Birth</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Country</th>
                                    <th>Address</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th style={{ minWidth: '160px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {(Array.isArray(filteredCustomers) ? filteredCustomers : []).map((c, idx) => ( 

                                    <tr key={c.id || idx}>
                                        <td>{c.id}</td>
                                        <td>{c.firstName}</td>
                                        <td>{c.lastName}</td>
                                        <td>{c.emailAddress}</td>
                                        <td>{c.contact}</td>
                                        <td>{c.gender}</td>
                                        <td>{c.dateOfBirth}</td>
                                        <td>{c.city}</td>
                                        <td>{c.state}</td>
                                        <td>{c.country}</td>
                                        <td>{c.address}</td>
                                        <td>
                                            <button className={`btn btn-sm ${c.status === 'Active' ? 'btn-success' : 'btn-warning'}`} style={{ minWidth: '80px', fontWeight: 600, fontSize: '1rem', pointerEvents: 'none' }}>{c.status}</button>
                                        </td>
                                        <td>{c.createdAt}</td>
                                        <td>
                                            <div className="d-flex gap-2 justify-content-center">
                                                <button className="btn btn-danger btn-sm" style={{ fontSize: '1rem', minWidth: '70px' }} onClick={() => deleteCustomer(c.id)}>Delete</button>
                                                <button className="btn btn-info btn-sm" style={{ fontSize: '1rem', minWidth: '70px' }} data-bs-toggle="modal" data-bs-target={`#update-${c.id}`} onClick={() => openUpdateModal(c)}>Update</button>
                                            </div>
            {/* Modal for update the customer details like the name,email and contact*/}
                                            <div className="modal fade" id={`update-${c.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Customer Record</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={($$event) => updateCustomer($$event, c.id)}>
                                                                <div className="mb-3">
                                                                    <label>First Name</label>
                                                                    <input type="text" value={selectedCustomerId === c.id ? firstName : c.firstName} className="form-control" onChange={($event) => { setFirstName($event.target.value) }} />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label>Last Name</label>
                                                                    <input type="text" value={selectedCustomerId === c.id ? lastName : c.lastName} className="form-control" onChange={($event) => { setLastName($event.target.value) }} />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label>Contact</label>
                                                                    <input type="text" value={selectedCustomerId === c.id ? contact : c.contact} className="form-control" onChange={($event) => { setContact($event.target.value) }} />
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label>Email</label>
                                                                    <input type="email" value={selectedCustomerId === c.id ? emailAddress : c.emailAddress} className="form-control" onChange={($event) => { setEmailAddress($event.target.value) }} />
                                                                </div>
                                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between align-items-center mt-4" style={{ fontSize: '1.1rem' }}>
                            <button className="btn btn-secondary" style={{ fontSize: '1rem', minWidth: '100px' }} onClick={handlePrevPage} disabled={page === 0}>Previous</button>
                            <span style={{ fontWeight: 600 }}>Page {page + 1}</span>
                            <button className="btn btn-secondary" style={{ fontSize: '1rem', minWidth: '100px' }} onClick={handleNextPage} disabled={customers.length < size}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );

}

export default CustomerList