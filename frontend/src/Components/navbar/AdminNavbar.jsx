
import './AdminNavbar.css';
import { BarChart3, Users, PlusCircle, ChevronDown, Search, Trash2, Edit, Eye, LogOut } from 'lucide-react'; 

export default function AdminNavbar(){
    return(
        
<nav className="admin-tabs">
<div className="container">
  <div className="tabs">
    <button  >
      <BarChart3 className="tab-icon" />
      Polls
    </button>
    <button
    >
      <Users className="tab-icon" />
      Users
    </button>
    <button
    >
      <BarChart3 className="tab-icon" />
      Results
    </button>
  </div>
</div>
</nav>

    );
};
