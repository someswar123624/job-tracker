import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const AddJobModal = ({ onAdd }) => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('Applied');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    if (!role || !company || !date) {
      alert("Please fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, 'jobs'), { role, company, status, date });
      setRole('');
      setCompany('');
      setStatus('Applied');
      setDate('');
      onAdd();
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-lg p-6 sm:p-8 grid gap-4 sm:gap-6">
      <input
        type="text"
        placeholder="Role"
        className="p-3 rounded-lg border border-blue-300 focus:ring-4 focus:ring-blue-400 focus:outline-none transition"
        value={role}
        onChange={e => setRole(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        className="p-3 rounded-lg border border-blue-300 focus:ring-4 focus:ring-blue-400 focus:outline-none transition"
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
      <select
        className="p-3 rounded-lg border border-blue-300 focus:ring-4 focus:ring-blue-400 focus:outline-none transition"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <input
        type="date"
        className="p-3 rounded-lg border border-blue-300 focus:ring-4 focus:ring-blue-400 focus:outline-none transition"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition"
      >
        Add Job
      </button>
    </div>
  );
};

export default AddJobModal;
