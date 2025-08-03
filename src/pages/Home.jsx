import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import JobCard from '../components/JobCard';
import AddJobModal from '../components/AddJobModal';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const snapshot = await getDocs(collection(db, 'jobs'));
    const jobList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };


  const handleUpdate = () => {
    fetchJobs();
  };

  return (
    <main className="max-w-4xl mx-auto p-6 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-xl shadow-lg min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-800 drop-shadow-md">
        Job Tracker
      </h1>
      <AddJobModal onAdd={fetchJobs} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </div>
    </main>
  );
};

export default Home;
