import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import fetchCustomerCount from "../store/action/customerAction";

function CustomerList() {
    const [customers, setCustomers] = useState([])
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
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

    const dispatch = useDispatch();

    const getAllCustomers = async () => {
        try {
            const response = await axios.get(`http://localhost:8087/api/customer/all?page=${page}&size=${size}`)
            setCustomers(response.data)
            // If your backend sends totalPages, set it here:
            // setTotalPages(response.data.totalPages)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getAllCustomers()
    }, [page])

    const deleteCustomer = async (cid) => {
        try {
            await axios.delete(`http://localhost:8087/api/customer/delete/${cid}`);
            let temp = [...customers];
            temp = temp.filter(c => c.id !== cid)
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

    const updateCustomer = async ($e, cid) => {
        $e.preventDefault();
        try {
            await axios.put('http://localhost:8087/api/customer/update/' + cid, {
                'firstName': firstName,
                'lastName': lastName,
                'contact': contact,
                'emailAddress': emailAddress
            });
            let temp = customers.map(c =>
                c.id === cid
                    ? { ...c, firstName, lastName, contact, emailAddress }
                    : c
            );
            setCustomers(temp);
        } catch (err) {
            console.log(err)
        }
    }

    const handleAddCustomer = async ($e) => {
        $e.preventDefault();
        try {
            await axios.post('http://localhost:8087/api/customer/add', {
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
            });
            setShowAddModal(false);
            setAddFirstName("");
            setAddLastName("");
            setAddContact("");
            setAddEmailAddress("");
            setAddGender("");
            setAddDob("");
            setAddCity("");
            setAddState("");
            setAddCountry("");
            setAddAddress("");
            setAddStatus("");
            getAllCustomers();
            dispatch(fetchCustomerCount()); // Refresh dashboard count after add
        } catch (err) {
            console.log(err);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) setPage(page - 1);
    };
    const handleNextPage = () => {
        if (customers.length === size) setPage(page + 1);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0eafc 0%, #1e90ff 100%)', padding: '40px 0' }}>
            <div className="container-fluid">
                <div className="container mt-5" style={{ maxWidth: '95vw', fontSize: '1.2rem' }}>
                    <h1 className="mb-4" style={{ fontSize: '2.2rem', fontWeight: 700 }}>All Customers</h1>
                    <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>
                        Add Customer
                    </button>
                    {/* Add Customer Modal */}
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
                                                <input type="text" value={addFirstName} className="form-control" onChange={e => setAddFirstName(e.target.value)} required />
                                            </div>
                                            <div className="mb-2">
                                                <label>Last Name</label>
                                                <input type="text" value={addLastName} className="form-control" onChange={e => setAddLastName(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Contact</label>
                                                <input type="text" value={addContact} className="form-control" onChange={e => setAddContact(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Email</label>
                                                <input type="email" value={addEmailAddress} className="form-control" onChange={e => setAddEmailAddress(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Gender</label>
                                                <select value={addGender} className="form-control" onChange={e => setAddGender(e.target.value)} required>
                                                    <option value="">Select Gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            <div className="mb-2">
                                                <label>Date of Birth</label>
                                                <input type="date" value={addDob} className="form-control" onChange={e => setAddDob(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>City</label>
                                                <input type="text" value={addCity} className="form-control" onChange={e => setAddCity(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>State</label>
                                                <input type="text" value={addState} className="form-control" onChange={e => setAddState(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Country</label>
                                                <input type="text" value={addCountry} className="form-control" onChange={e => setAddCountry(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Address</label>
                                                <input type="text" value={addAddress} className="form-control" onChange={e => setAddAddress(e.target.value)} />
                                            </div>
                                            <div className="mb-2">
                                                <label>Status</label>
                                                <select value={addStatus} className="form-control" onChange={e => setAddStatus(e.target.value)} required>
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

                                {(Array.isArray(customers) ? customers : []).map((c, idx) => (
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
                                            {/* Modal for update */}
                                            <div className="modal fade" id={`update-${c.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Update Customer Record</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <form onSubmit={($e) => updateCustomer($e, c.id)}>
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
    )
}

export default CustomerList