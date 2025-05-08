import { useState } from "react";
import axios from "axios";

function OfficerSignup() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        contact: "",
        address: "",
        branchLocation: "",
        licenseNo: "",
        idNo: "",
        aadhaarNo: "",
        username: "",
        password: ""
    });

    const [formErrors, setFormErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const errors = {};

        if (!formData.fullName.trim()) errors.fullName = "Full name is required.";
        if (!formData.email.trim()) errors.email = "Email is required.";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email format.";

        if (!formData.contact.trim()) errors.contact = "Contact is required.";
        else if (!/^\d{10,12}$/.test(formData.contact)) errors.contact = "Contact must be 10–12 digits.";

        if (!formData.address.trim()) errors.address = "Address is required.";
        if (!formData.branchLocation.trim()) errors.branchLocation = "Branch location is required.";
        if (!formData.licenseNo.trim()) errors.licenseNo = "License number is required.";
        if (!formData.idNo.trim()) errors.idNo = "ID number is required.";

        if (!formData.aadhaarNo.trim()) errors.aadhaarNo = "Aadhaar number is required.";
        else if (!/^\d{12}$/.test(formData.aadhaarNo)) errors.aadhaarNo = "Aadhaar must be 12 digits.";

        if (!formData.username.trim()) errors.username = "Username is required.";
        if (!formData.password) errors.password = "Password is required.";
        else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";

        return errors;
    };

    const signUp = async (e) => {
        e.preventDefault();
        setMessage(null);
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        setFormErrors({});
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8087/api/officer/add', {
                fullName: formData.fullName,
                email: formData.email,
                contact: formData.contact,
                address: formData.address,
                branchLocation: formData.branchLocation,
                licenseNo: formData.licenseNo,
                idNo: formData.idNo,
                aadhaarNo: formData.aadhaarNo,
                user: {
                    username: formData.username,
                    password: formData.password
                }
            });

            setMessage("Sign up successful! You may now log in.");
        } catch (error) {
            setMessage("Sign up failed. Please try again later.");
            console.error(error);
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
                        {message && <div className={`alert ${message.includes("successful") ? "alert-success" : "alert-danger"} py-2`}>{message}</div>}
                        <form className="row g-3" onSubmit={signUp} noValidate>
                            {[
                                { label: "Full Name", name: "fullName", type: "text", placeholder: "Officer full name" },
                                { label: "Email", name: "email", type: "email", placeholder: "Email address" },
                                { label: "Contact", name: "contact", type: "text", placeholder: "Contact number" },
                                { label: "Branch Location", name: "branchLocation", type: "text", placeholder: "Branch location" },
                                { label: "Address", name: "address", type: "text", placeholder: "Full address" },
                                { label: "License No", name: "licenseNo", type: "text", placeholder: "Officer license number" },
                                { label: "ID No", name: "idNo", type: "text", placeholder: "Officer ID number" },
                                { label: "Aadhaar No", name: "aadhaarNo", type: "text", placeholder: "Aadhaar number" },
                                { label: "Username", name: "username", type: "text", placeholder: "Create username" },
                                { label: "Password", name: "password", type: "password", placeholder: "Create password" }
                            ].map(({ label, name, type, placeholder }) => (
                                <div key={name} className={`col-md-${name === "address" || name === "aadhaarNo" ? 12 : 6}`}>
                                    <label className="form-label">{label}</label>
                                    <input
                                        type={type}
                                        className={`form-control form-control-lg ${formErrors[name] ? "is-invalid" : ""}`}
                                        placeholder={placeholder}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                    />
                                    {formErrors[name] && <div className="invalid-feedback">{formErrors[name]}</div>}
                                </div>
                            ))}

                            <div className="col-12 d-grid gap-2 mt-2">
                                <button type="submit" className="btn btn-primary btn-lg fw-bold" style={{ background: '#1e90ff', border: 'none' }} disabled={loading}>
                                    {loading ? "Signing up..." : "Sign Up"}
                                </button>
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
