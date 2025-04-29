import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OfficerLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgUsername, setMsgUsername] = useState(null);
    const [msgPassword, setMsgPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        if (!username) {
            setMsgUsername("Username cannot be blank");
            return;
        } else {
            setMsgUsername(null);
        }

        if (!password) {
            setMsgPassword("Password cannot be blank");
            return;
        } else {
            setMsgPassword(null);
        }
        setLoading(true);
        let body = {
            'username': username,
            'password': password
        };

        

        axios.post('http://localhost:8087/api/auth/token/generate', body)
            .then(response => {
                console.log(response)
                let token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);

                console.log(token)
                axios.get('http://localhost:8087/api/auth/user/details', {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(resp => {
                    setLoading(false);
                    if (resp.data.role === 'OFFICER') {
                        navigate("/officer/dashboard");
                    } else {
                        setMsgUsername("Not an officer account");
                    }
                })
                .catch(err => {
                    setLoading(false);
                    setMsgUsername("Invalid Credentials");
                    console.log(err);
                });
            })
            .catch(err => {
                setLoading(false);
                setMsgUsername("Invalid Credentials");
                console.log(err);
            });
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e90ff 0%, #e0eafc 100%)', display: 'flex', flexDirection: 'column' }}>
            <header className="py-4 shadow-sm" style={{ background: '#fff', borderBottom: '2px solid #e0eafc' }}>
                <h2 className="text-center fw-bold" style={{ color: '#1e90ff', letterSpacing: '2px', fontSize: '2rem' }}>Insurance Officer</h2>
            </header>
            <div className="flex-grow-1 d-flex justify-content-center align-items-center">
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: 400, borderRadius: 18, background: '#fff' }}>
                    <div className="card-body">
                        <h4 className="mb-4 text-center fw-bold" style={{ color: '#1e90ff' }}>Officer Login</h4>
                        {msgUsername && <div className="alert alert-danger py-2">{msgUsername}</div>}
                        {msgPassword && <div className="alert alert-danger py-2">{msgPassword}</div>}
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control form-control-lg" placeholder="Enter officer username"
                                autoFocus
                                value={username}
                                onChange={e => {
                                    setUsername(e.target.value);
                                    setMsgUsername(null);
                                }} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control form-control-lg" placeholder="Enter password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                    setMsgPassword(null);
                                }} />
                        </div>
                        <div className="d-grid gap-2 mb-2">
                            <button type="button" className="btn btn-primary btn-lg fw-bold" style={{ background: '#1e90ff', border: 'none' }}
                                onClick={login} disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                        </div>
                        <div className="text-center mt-2">
                            <span>Don't have an account? </span>
                            <a href="/officer/signup" style={{ color: '#1e90ff', fontWeight: 600, textDecoration: 'underline' }}>Sign Up as Officer</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfficerLogin;
