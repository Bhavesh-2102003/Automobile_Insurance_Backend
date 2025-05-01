import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const OfficerProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    contact: '',
    address: '',
    branchLocation: 'Mumbai',
    licenseNo: '',
    idNo: '',
    aadhaarNo: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const id = localStorage.getItem('id'); // Get from your auth system
  

  useEffect(() => {
    
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:8087/api/officer/profile/${id}`);
      setProfile(response.data);
    } catch (err) {
      setError('Failed to load profile data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8087/api/officer/profile/${id}`, profile);
      setProfile(response.data);
      setEditMode(false);
      setError('');
    } catch (err) {
      setError('Update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-lg">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">Officer Profile</h3>
        </Card.Header>
        
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Editable Fields */}
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={profile.fullName}
                onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                disabled={!editMode}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                value={profile.contact}
                onChange={(e) => setProfile({...profile, contact: e.target.value})}
                disabled={!editMode}
                pattern="[0-9]{10}"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Branch Location</Form.Label>
              <Form.Select
                value={profile.branchLocation}
                onChange={(e) => setProfile({...profile, branchLocation: e.target.value})}
                disabled={!editMode}
              >
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Kolkata</option>
                
              </Form.Select>
            </Form.Group>

            {/* Read-only Fields */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control plaintext readOnly value={profile.email} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>License Number</Form.Label>
              <Form.Control plaintext readOnly value={profile.licenseNo} />
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              {editMode ? (
                <>
                  <Button variant="secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button variant="outline-primary" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OfficerProfile;