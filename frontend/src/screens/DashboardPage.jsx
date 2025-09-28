import React, { useState, useEffect, useCallback } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [observations, setObservations] = useState([]);
  const [chickens, setChickens] = useState([]);
  const [newObservation, setNewObservation] = useState({ title: '', details: '', scientist: 'Isaac Newton' });
  const [newChicken, setNewChicken] = useState({ name: '', featherColor: '' });

  const loadData = useCallback(async () => {
    const obsResponse = await manifest.from('Observation').find({ include: ['author'], sort: { createdAt: 'desc' } });
    setObservations(obsResponse.data);

    const chickenResponse = await manifest.from('LunarChicken').find({ filter: { ownerId: user.id }, sort: { createdAt: 'desc' } });
    setChickens(chickenResponse.data);
  }, [manifest, user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateObservation = async (e) => {
    e.preventDefault();
    await manifest.from('Observation').create(newObservation);
    setNewObservation({ title: '', details: '', scientist: 'Isaac Newton' });
    loadData();
  };

  const handleCreateChicken = async (e) => {
    e.preventDefault();
    await manifest.from('LunarChicken').create(newChicken);
    setNewChicken({ name: '', featherColor: '' });
    loadData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Your portal to lunar poultry science.</p>
        </div>
        <div>
          <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mr-2">Admin Panel</a>
          <button onClick={onLogout} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">Logout</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Log New Observation</h2>
            <form onSubmit={handleCreateObservation} className="space-y-4">
              <input type="text" placeholder="Observation Title" value={newObservation.title} onChange={(e) => setNewObservation({ ...newObservation, title: e.target.value })} required className="w-full p-2 border rounded-md" />
              <textarea placeholder="Details of discovery..." value={newObservation.details} onChange={(e) => setNewObservation({ ...newObservation, details: e.target.value })} required className="w-full p-2 border rounded-md"></textarea>
              <select value={newObservation.scientist} onChange={(e) => setNewObservation({ ...newObservation, scientist: e.target.value })} className="w-full p-2 border rounded-md bg-white">
                <option>Isaac Newton</option>
                <option>Joseph-Louis Lagrange</option>
              </select>
              <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Submit Discovery</button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Register New Lunar Chicken</h2>
            <form onSubmit={handleCreateChicken} className="space-y-4">
              <input type="text" placeholder="Chicken's Name" value={newChicken.name} onChange={(e) => setNewChicken({ ...newChicken, name: e.target.value })} required className="w-full p-2 border rounded-md" />
              <input type="text" placeholder="Feather Color" value={newChicken.featherColor} onChange={(e) => setNewChicken({ ...newChicken, featherColor: e.target.value })} required className="w-full p-2 border rounded-md" />
              <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Register Chicken</button>
            </form>
          </div>
           <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Chickens</h2>
            {chickens.length > 0 ? (
              <ul className="space-y-2">{chickens.map(c => <li key={c.id} className='p-2 border rounded-md'>{c.name} ({c.featherColor}) - {c.status}</li>)}</ul>
            ) : (<p className='text-gray-500'>No chickens registered yet.</p>)}
            </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Discoveries</h2>
          <div className="space-y-6">
            {observations.length > 0 ? observations.map(obs => (
              <div key={obs.id} className="border-b pb-4 last:border-b-0">
                <h3 className="font-bold text-lg text-gray-900">{obs.title}</h3>
                <p className="text-sm text-gray-500">By {obs.scientist} (Logged by {obs.author?.name || 'anonymous'})</p>
                <div className="prose prose-sm mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: obs.details }}></div>
              </div>
            )) : (
              <p className="text-gray-500">No observations have been logged yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
