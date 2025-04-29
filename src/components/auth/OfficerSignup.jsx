import { useState } from "react";
import axios from "axios";

function OfficerSignup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [branchLocation, setBranchLocation] = useState("");
    const [licenseNo, setLicenseNo] = useState("");
    const [idNo, setIdNo] = useState("");
    const [aadhaarNo, setAadhaarNo] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (e) => {
        e.preventDefault();
        setMessage(null);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8087/api/officer/add', {
                fullName,
                email,
                contact,
                address,
                branchLocation,
                licenseNo,
                idNo,
                aadhaarNo,
                user: {
                    username,
                    password
                }
            });
            setMessage("Sign up successful! You may now log in.");
        } catch (err) {
            setMessage("Sign up failed. Please check your details or try again later.");
            console.log(err);
        }
        setLoading(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e90ff 0%, #e0eafc 100%)', display: 'flex', flexDirection: 'column' }}>
            <header className="py-4 shadow-sm" style={{ background: '#fff', borderBottom: '2px solid #e0eafc' }}>
                <h2 className="text-center fw-bold" style={{ color: '#1e90ff', letterSpacing: '2px', fontSize: '2rem' }}>Insurance Officer</h2>
            </header>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: 500, borderRadius: 18, background: '#fff' }}>
                    <div className="card-body">
                        <h4 className="mb-4 text-center fw-bold" style={{ color: '#1e90ff' }}>Officer Sign Up</h4>
                        {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'} py-2`}>{message}</div>}
                        <form className="row g-3" onSubmit={signUp} autoComplete="off">
                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Officer full name" onChange={e => setFullName(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control form-control-lg" placeholder="Email address" onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Contact</label>
                                <input type="text" className="form-control form-control-lg" placeholder="contact" onChange={e => setContact(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Branch Location</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Branch location" onChange={e => setBranchLocation(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Full address" onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">License No</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Officer license number" onChange={e => setLicenseNo(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">ID No</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Officer ID number" onChange={e => setIdNo(e.target.value)} />
                            </div>
                            <div className="col-md-12">
                                <label className="form-label">Aadhaar No</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Officer Aadhaar number" onChange={e => setAadhaarNo(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Username</label>
                                <input type="text" className="form-control form-control-lg" placeholder="Create username" onChange={e => setUsername(e.target.value)} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control form-control-lg" placeholder="Create password" onChange={e => setPassword(e.target.value)} />
                            </div>
                            <div className="col-12 d-grid gap-2 mt-2">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold" style={{ background: '#1e90ff', border: 'none' }} disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            <span>Already have an account? </span>
                            <a href="/officer/login" style={{ color: '#1e90ff', fontWeight: 600, textDecoration: 'underline' }}>Login as Officer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfficerSignup;
