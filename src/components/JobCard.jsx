import React, { useState } from 'react';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const statusColors = {
  Applied: "border-blue-500 text-blue-700",
  Interview: "border-yellow-400 text-yellow-700",
  Offer: "border-green-500 text-green-700",
  Rejected: "border-red-500 text-red-700"
};

const JobCard = ({ job, onDelete, onUpdate }) => {
  const statusClass = statusColors[job.status] || 'border-gray-300 text-gray-700';

  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState(job.role);
  const [company, setCompany] = useState(job.company);
  const [status, setStatus] = useState(job.status);
  const [date, setDate] = useState(job.date);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      await deleteDoc(doc(db, 'jobs', job.id));
      onDelete(job.id);
    }
  };

  const handleSave = async () => {
    try {
      const jobRef = doc(db, 'jobs', job.id);
      await updateDoc(jobRef, { role, company, status, date });
      setIsEditing(false);
      onUpdate(); 
    } catch (err) {
      alert("Failed to update job");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setRole(job.role);
    setCompany(job.company);
    setStatus(job.status);
    setDate(job.date);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-8 hover:scale-[1.03] transition-transform duration-300 ${statusClass}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={role}
            onChange={e => setRole(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
            placeholder="Role"
          />
          <input
            type="text"
            value={company}
            onChange={e => setCompany(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
            placeholder="Company"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border p-2 rounded mb-2 w-full"
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{job.role}</h2>
          <p className="text-gray-600 mt-1">{job.company}</p>
          <p className={`font-semibold mt-3 ${statusClass.split(' ')[1]}`}>
            Status: {job.status}
          </p>
          <p className="text-sm mt-1 text-gray-500 italic">Applied on: {job.date}</p>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 hover:underline text-sm font-semibold"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline text-sm font-semibold"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobCard;
