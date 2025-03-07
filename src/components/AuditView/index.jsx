import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuditView } from './useAuditView';
import DamageRecordForm from '../AuditForm/DamageRecordForm';
import PrintableAudit from './PrintableAudit';
import RepairQuoteModal from './RepairQuoteModal';
import './styles.css';

const AuditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    audit,
    damageRecords,
    loading,
    isEditing,
    editedAudit,
    auditorDetails,
    setIsEditing,
    handleAuditChange,
    handleSaveAudit,
    handleAddDamageRecord,
    handleDeleteDamageRecord,
    handleEditDamageRecord,
    handlePrint
  } = useAuditView(id);

  const [showDamageForm, setShowDamageForm] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showRepairQuote, setShowRepairQuote] = useState(false);
  const [editingDamageRecord, setEditingDamageRecord] = useState(null);
  const [expandedPhoto, setExpandedPhoto] = useState(null);

  if (loading) {
    return <div className="loading">Loading audit details...</div>;
  }

  if (!audit) {
    return <div className="error">Audit not found</div>;
  }

  if (showPrintPreview) {
    return (
      <PrintableAudit 
        audit={audit} 
        damageRecords={damageRecords}
        auditorDetails={auditorDetails}
        onClose={() => setShowPrintPreview(false)}
        onPrint={handlePrint}
      />
    );
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handlePhotoClick = (photoUrl) => {
    setExpandedPhoto(photoUrl);
  };

  const closeExpandedPhoto = () => {
    setExpandedPhoto(null);
  };

  const handleCreateRepairQuoteClick = () => {
    setShowRepairQuote(true);
  };

  return (
    <div className="audit-view">
      <div className="view-header">
        <div className="header-content">
          <h1>{audit.site_name}</h1>
          <span className="reference">{audit.reference_number}</span>
        </div>
        <div className="header-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveAudit} className="save-btn">
                Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">
                Cancel
              </button>
            </>
          ) : (
            <>
              <button onClick={handleEditClick} className="edit-btn">
                Edit Audit
              </button>
              <button onClick={() => setShowPrintPreview(true)} className="print-btn">
                Print Audit
              </button>
              <button onClick={handleCreateRepairQuoteClick} className="repair-btn">
                Create Repair Quote
              </button>
              <button onClick={() => navigate('/audits')} className="back-btn">
                Back to List
              </button>
            </>
          )}
        </div>
      </div>

      <div className="audit-content">
        <div className="audit-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label>Auditor Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="auditor_name"
                  value={editedAudit.auditor_name}
                  onChange={handleAuditChange}
                />
              ) : (
                <div className="field-value">{audit.auditor_name}</div>
              )}
            </div>

            {/* ... (rest of the basic information section) ... */}
          </div>

          <div className="risk-summary">
            {/* ... (risk summary content) ... */}
          </div>
        </div>

        <div className="audit-section">
          <div className="section-header">
            <h2>Damage Records</h2>
            <button 
              type="button"
              onClick={() => {
                setEditingDamageRecord(null);
                setShowDamageForm(true);
              }}
              className="add-damage-btn"
            >
              Add Damage Record
            </button>
          </div>

          {showDamageForm && (
            <DamageRecordForm
              onSubmit={(record) => {
                if (editingDamageRecord) {
                  handleEditDamageRecord(editingDamageRecord.id, record);
                } else {
                  handleAddDamageRecord(record);
                }
                setShowDamageForm(false);
                setEditingDamageRecord(null);
              }}
              onCancel={() => {
                setShowDamageForm(false);
                setEditingDamageRecord(null);
              }}
              initialData={editingDamageRecord}
            />
          )}

          <div className="damage-records">
            {/* ... (damage records list) ... */}
          </div>
        </div>
      </div>
      
      {showRepairQuote && (
        <RepairQuoteModal
          audit={audit}
          damageRecords={damageRecords}
          auditorDetails={auditorDetails}
          onClose={() => setShowRepairQuote(false)}
        />
      )}

      {expandedPhoto && (
        <div className="photo-modal" onClick={closeExpandedPhoto}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeExpandedPhoto}>×</button>
            <img src={expandedPhoto} alt="Enlarged damage" className="enlarged-photo" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditView;
