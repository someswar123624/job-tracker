import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import db from '../firebase';

const JobForm = ({ onAdd }) => {
  const [job, setJob] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!job) return;

    const docRef = await addDoc(collection(db, 'jobs'), {
      title: job,
      createdAt: new Date()
    });

    onAdd({ id: docRef.id, title: job });
    setJob('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 mb-6 w-full"
    >
      <input
        type="text"
        value={job}
        onChange={(e) => setJob(e.target.value)}
        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        placeholder="Enter job title..."
      />
      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition w-full sm:w-auto"
      >
        Add Job
      </button>
    </form>
  );
};

export default JobForm;
