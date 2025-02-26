import React, { useState } from 'react';
import { BarChart3, Users, PlusCircle, ChevronDown, Search, Trash2, Edit, Eye, LogOut } from 'lucide-react';  // Imported LogOut icon
import axios from 'axios';
import './AdminDashboard.css';
import AdminNavbar from '../navbar/AdminNavbar';

export function AdminDashboard() {
  const [newPoll, setNewPoll] = useState({
  title: "",
  startdate: "",
  enddate: "",
  status: "draft",
});

const handleCreatePoll = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:5000/api/poll", newPoll);

    if (response.status === 201) {
      alert("Poll created successfully!");
      setShowNewPollModal(false);
      window.location.reload(); // Reload to update poll list
    }
  } catch (error) {
    console.error("Error creating poll:", error);
    alert("Failed to create poll");
  }
};

  const [activeTab, setActiveTab] = useState('polls');
  const [showNewPollModal, setShowNewPollModal] = useState(false);

  // Sample data - In a real app, this would come from your backend
  const polls = [
    {
      id: '1',
      title: 'City Council Election 2025',
      startDate: '2025-03-01',
      endDate: '2025-03-02',
      status: 'draft',
      totalVotes: 0
    },
    {
      id: '2',
      title: 'School Board Election',
      startDate: '2025-04-15',
      endDate: '2025-04-16',
      status: 'active',
      totalVotes: 156
    }
  ];

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'active'
    }
  ];

  const handleLogout = () => {
    // Here you could clear authentication tokens, session, or redirect to login
    alert('Logged out');
    // Redirect to login page (for example):
    // window.location.href = "/login";
  };

  const renderHeader = () => (
    <header className="admin-header">
      <div className="container">
        <div className="header-content">
          <h1 className="admin-title">Admin Dashboard</h1>
          <div className="header-actions">
            <button onClick={handleLogout} className="icon-button logout-button">
              <LogOut className="icon" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  // const renderTabs = () => (
  //   <nav className="admin-tabs">
  //     <div className="container">
  //       <div className="tabs">
  //         <button
  //           onClick={() => setActiveTab('polls')}
  //           className={`tab ${activeTab === 'polls' ? 'active' : ''}`}
  //         >
  //           <BarChart3 className="tab-icon" />
  //           Polls
  //         </button>
  //         <button
  //           onClick={() => setActiveTab('users')}
  //           className={`tab ${activeTab === 'users' ? 'active' : ''}`}
  //         >
  //           <Users className="tab-icon" />
  //           Users
  //         </button>
  //         <button
  //           onClick={() => setActiveTab('results')}
  //           className={`tab ${activeTab === 'results' ? 'active' : ''}`}
  //         >
  //           <BarChart3 className="tab-icon" />
  //           Results
  //         </button>
  //       </div>
  //     </div>
  //   </nav>
  // );

  const renderPolls = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Active Polls</h2>
        <button
          onClick={() => setShowNewPollModal(true)}
          className="new-poll-button"
        >
          <PlusCircle className="icon" />
          New Poll
        </button>
      </div>

      <div className="table-container">
        <div className="search-bar">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search polls..."
            className="search-input"
          />
        </div>

        <table className="polls-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date Range</th>
              <th>Status</th>
              <th>Total Votes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {polls.map((poll) => (
              <tr key={poll.id}>
                <td>{poll.title}</td>
                <td>{poll.startDate} - {poll.endDate}</td>
                <td>
                  <span className={`status-badge ${poll.status}`}>
                    {poll.status.charAt(0).toUpperCase() + poll.status.slice(1)}
                  </span>
                </td>
                <td>{poll.totalVotes}</td>
                <td className="actions">
                  <button className="action-button">
                    <Eye className="icon" />
                  </button>
                  <button className="action-button">
                    <Edit className="icon" />
                  </button>
                  <button className="action-button delete">
                    <Trash2 className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Registered Users</h2>
      </div>

      <div className="table-container">
        <div className="search-bar">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Search users..."
            className="search-input"
          />
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="actions">
                  <button className="action-button">
                    <Eye className="icon" />
                  </button>
                  <button className="action-button">
                    <Edit className="icon" />
                  </button>
                  <button className="action-button delete">
                    <Trash2 className="icon" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Election Results</h2>
        {/* Removed Filter and Export Results Buttons */}
      </div>

      <div className="result-cards">
        {polls.map((poll) => (
          <div key={poll.id} className="result-card">
            <h3>{poll.title}</h3>
            <div>{poll.startDate} - {poll.endDate}</div>
            <div>
              <span>Total Votes: {poll.totalVotes}</span>
            </div>
            <button className="view-detailed-results">
              View detailed results →
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      {renderHeader()}
      {/* {renderTabs()} */}
      <AdminNavbar/>
      {activeTab === 'polls' && renderPolls()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'results' && renderResults()}

      {/* New Poll Modal */}
      {showNewPollModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Poll</h2>
            <form className="form" onSubmit={handleCreatePoll}>
  <div className="form-group">
    <label>Poll Title</label>
    <input
      type="text"
      placeholder="Enter poll title"
      value={newPoll.title}
      onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
      required
    />
  </div>
  <div className="form-group">
    <label>Start Date</label>
    <input
      type="date"
      value={newPoll.startdate}
      onChange={(e) => setNewPoll({ ...newPoll, startdate: e.target.value })}
      required
    />
  </div>
  <div className="form-group">
    <label>End Date</label>
    <input
      type="date"
      value={newPoll.enddate}
      onChange={(e) => setNewPoll({ ...newPoll, enddate: e.target.value })}
      required
    />
  </div>
  <div className="form-group">
    <label>Status</label>
    <select
      value={newPoll.status}
      onChange={(e) => setNewPoll({ ...newPoll, status: e.target.value })}
      required
    >
      <option value="draft">Draft</option>
      <option value="active">Active</option>
    </select>
  </div>
  <div className="form-actions">
    <button type="submit">Create Poll</button>
    <button type="button" onClick={() => setShowNewPollModal(false)}>Cancel</button>
  </div>
</form>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
