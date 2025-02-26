/* eslint-disable react/prop-types */
const RenderResults = ({ polls }) => {
  return (
    <div className="admin-content">
      <div className="section-header">
        <h2 className="section-title">Election Results</h2>
      </div>
      <div className="result-cards">
        {polls.map((poll) => (
          <div key={poll.id} className="result-card">
            <h3>{poll.title}</h3>
            <div>
              {poll.startdate} - {poll.enddate}
            </div>
            <div>
              <span>Total Votes: {poll.totalvotes}</span>
            </div>
            <button className="view-detailed-results">
              View detailed results →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderResults;
