import React, { useState } from 'react';
import { Card, Button, Modal, Input, Tag } from 'antd';
import { UserOutlined, CarOutlined, CalendarOutlined } from '@ant-design/icons';

 const ClaimRequest = ({ claims }) => {
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Approval handler
  const handleApprove = async (claimId) => {
    try {
      await axios.put(`/api/claims/${claimId}`, { status: 'approved' });
      // Refresh claims data
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  // Rejection handler
  const handleRejectionSubmit = async () => {
    try {
      await axios.put(`/api/claims/${selectedClaim.id}`, {
        status: 'rejected',
        rejectionReason
      });
      setIsModalOpen(false);
      // Refresh claims data
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'approved': return 'green';
      case 'rejected': return 'red';
      default: return 'blue';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {claims.map(claim => (
        <Card
          key={claim.id}
          title={
            <div className="flex justify-between items-center">
              <span>Claim #{claim.id}</span>
              <Tag color={getStatusColor(claim.status)}>
                {claim.status}
              </Tag>
            </div>
          }
          extra={<Button type="link" onClick={() => setSelectedClaim(claim)}>Details</Button>}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="space-y-2">
            <div>
              <UserOutlined className="mr-2" />
              <span className="font-semibold">Customer:</span> {claim.customer?.firstName} {claim.customer?.lastName}
            </div>
            <div>
              <CarOutlined className="mr-2" />
              <span className="font-semibold">Vehicle ID:</span> {claim.vehicleDetails?.id}
            </div>
            <div>
              <CalendarOutlined className="mr-2" />
              <span className="font-semibold">Accident Date:</span> 
              {new Date(claim.accidentDate).toLocaleDateString()}
            </div>
            
            <div className="mt-4 flex gap-2">
              <Button 
                type="primary" 
                onClick={() => handleApprove(claim.id)}
                disabled={claim.status !== 'pending'}
              >
                Approve
              </Button>
              <Button 
                danger
                onClick={() => {
                  setSelectedClaim(claim);
                  setIsModalOpen(true);
                }}
                disabled={claim.status !== 'pending'}
              >
                Reject
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {/* Detail Modal */}
      <Modal
        title={`Claim Details #${selectedClaim?.id}`}
        open={!!selectedClaim}
        onCancel={() => setSelectedClaim(null)}
        footer={null}
        width={800}
      >
        {selectedClaim && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Claim Information</h4>
              <p><span className="font-medium">Type:</span> {selectedClaim.claimType}</p>
              <p><span className="font-medium">Location:</span> {selectedClaim.location}</p>
              <p><span className="font-medium">Damage:</span> {selectedClaim.damageDescription}</p>
              <p><span className="font-medium">Submitted:</span> 
                {new Date(selectedClaim.submittedAt).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Vehicle Details</h4>
              <p><span className="font-medium">Vehicle ID:</span> {selectedClaim.vehicleDetails?.id}</p>
              <p><span className="font-medium">Make:</span> {selectedClaim.vehicleDetails?.make}</p>
              <p><span className="font-medium">Model:</span> {selectedClaim.vehicleDetails?.model}</p>
              <p><span className="font-medium">Year:</span> {selectedClaim.vehicleDetails?.year}</p>
            </div>
            <div className="col-span-2">
              <h4 className="font-semibold mb-2">Evidence</h4>
              <img 
                src={selectedClaim.imageUrl} 
                alt="Damage evidence"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Rejection Modal */}
      <Modal
        title={`Reject Claim #${selectedClaim?.id}`}
        open={isModalOpen}
        onOk={handleRejectionSubmit}
        onCancel={() => setIsModalOpen(false)}
      >
        <Input.TextArea
          rows={4}
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Please provide detailed reason for rejection..."
          className="mt-4"
        />
      </Modal>
    </div>
  );
};

export default ClaimRequest;