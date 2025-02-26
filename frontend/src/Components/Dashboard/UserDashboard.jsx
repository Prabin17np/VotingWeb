import { useState } from "react";
import {
  Vote,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Timer,
  BarChart3,
  ArrowLeft,
  LogOut,
} from "lucide-react";
import "./UserDashboard.css";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample data - In a real app, this would come from your backend
  const polls = [
    {
      id: "1",
      title: "City Council Election 2025",
      description: "Select your representative for the city council.",
      startDate: "2025-03-01",
      endDate: "2025-03-02",
      status: "active",
      hasVoted: false,
      candidates: [
        {
          id: "c1",
          name: "John Smith",
          party: "Progressive Party",
          votes: 156,
        },
        {
          id: "c2",
          name: "Sarah Johnson",
          party: "Conservative Party",
          votes: 142,
        },
        { id: "c3", name: "Michael Brown", party: "Independent", votes: 89 },
      ],
    },
    {
      id: "2",
      title: "School Board Election",
      description: "Choose the next school board representative.",
      startDate: "2025-04-15",
      endDate: "2025-04-16",
      status: "active",
      hasVoted: true,
      candidates: [
        { id: "c4", name: "Emily Davis", party: "Education First", votes: 203 },
        {
          id: "c5",
          name: "Robert Wilson",
          party: "Community Voice",
          votes: 178,
        },
      ],
    },
  ];

  const handleVote = () => {
    if (!selectedCandidate) return;
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    // Here you would make an API call to submit the vote
    console.log("Vote submitted for candidate:", selectedCandidate);
    setShowConfirmation(false);
    setSelectedPoll(null);
  };

  const calculateTotalVotes = (candidates) => {
    return candidates.reduce((sum, candidate) => sum + candidate.votes, 0);
  };

  const calculatePercentage = (votes, totalVotes) => {
    return ((votes / totalVotes) * 100).toFixed(1);
  };

  const handleLogout = async () => {
    try {
      // Remove the token from local storage
      localStorage.removeItem("token");

      // Redirect the user to the login page or homepage after logout
      navigate("/login"); // Replace with your actual login page path
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  return (
    <div className="user-dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Vote className="icon" />
            <h1>E-Voting Portal</h1>
          </div>
          <div className="user-info">
            <button onClick={handleLogout} className="logout-button">
              <LogOut className="icon-small" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {!selectedPoll && (
        <div className="polls-list">
          <h2>Active Elections</h2>
          <p>Cast your vote in ongoing elections</p>

          <div className="polls">
            {polls.map((poll) => (
              <div key={poll.id} className="poll">
                <div className="poll-header">
                  <div>
                    <h3>{poll.title}</h3>
                    <p>{poll.description}</p>
                    <div className="poll-end-date">
                      <Timer className="icon-small" />
                      <span>
                        Ends on {new Date(poll.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="poll-actions">
                    {poll.hasVoted ? (
                      <>
                        <span className="voted">Voted</span>
                        <button
                          onClick={() => {
                            setSelectedPoll(poll);
                            setShowResults(true);
                          }}
                          className="view-results-button"
                        >
                          <BarChart3 className="icon-small" />
                          View Results
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setSelectedPoll(poll)}
                        className="cast-vote-button"
                      >
                        Cast Vote
                        <ChevronRight className="icon-small" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedPoll && !showResults && (
        <div className="voting-booth">
          <button
            onClick={() => setSelectedPoll(null)}
            className="back-to-elections"
          >
            ← Back to Elections
          </button>

          <div className="voting-form">
            <h2>{selectedPoll?.title}</h2>
            <p>{selectedPoll?.description}</p>

            <div className="candidates">
              {selectedPoll?.candidates.map((candidate) => (
                <label
                  key={candidate.id}
                  className={`candidate ${
                    selectedCandidate === candidate.id ? "selected" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="candidate"
                    value={candidate.id}
                    checked={selectedCandidate === candidate.id}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                  />
                  <div className="candidate-info">
                    <h3>{candidate.name}</h3>
                    <p>{candidate.party}</p>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <CheckCircle2 className="icon-small" />
                  )}
                </label>
              ))}
            </div>

            <div className="submit-button">
              <button
                onClick={handleVote}
                disabled={!selectedCandidate}
                className={selectedCandidate ? "active" : "disabled"}
              >
                Submit Vote
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPoll && showResults && (
        <div className="poll-results">
          <button
            onClick={() => {
              setSelectedPoll(null);
              setShowResults(false);
            }}
            className="back-to-elections"
          >
            <ArrowLeft className="icon-small" />
            Back to Elections
          </button>

          <div className="results-card">
            <div className="poll-header">
              <div>
                <h2>{selectedPoll.title}</h2>
                <p>{selectedPoll.description}</p>
              </div>
              <div className="poll-total-votes">
                <span>Total Votes</span>
                <span>{calculateTotalVotes(selectedPoll.candidates)}</span>
              </div>
            </div>

            <div className="candidate-results">
              {selectedPoll.candidates.map((candidate) => {
                const percentage = calculatePercentage(
                  candidate.votes,
                  calculateTotalVotes(selectedPoll.candidates)
                );
                return (
                  <div key={candidate.id} className="candidate-result">
                    <div className="candidate-info">
                      <h3>{candidate.name}</h3>
                      <p>{candidate.party}</p>
                    </div>
                    <div className="vote-count">
                      <span>{candidate.votes}</span>
                      <span>({percentage}%)</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <AlertCircle className="alert-icon" />
            <h3>Confirm Your Vote</h3>
            <p>
              Your vote is final and cannot be changed. Are you sure you want to
              proceed?
            </p>
            <div className="modal-actions">
              <button
                onClick={() => setShowConfirmation(false)}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={confirmVote} className="confirm-button">
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
