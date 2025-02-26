import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminUserTable() {
    const [users, setUsers] = useState([]); // State to hold user data
    // const [loading, setLoading] = useState(true); // State for loading status

    // Define columns for the DataTable
    const userColumns = [
        {
            name: "User ID",
            selector: (row) => row.userId,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.username,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Role",
            selector: (row) => row.role,
            sortable: true,
        },
    ];

    // Fetch users from the backend
    // useEffect(() => {
        // const fetchUsers = async () => {
        //     try {
        //       const response = await axios.get("http://localhost:5000/api/user"); // Adjust URL as needed
        //       if (!response.ok) {
        //           throw new Error("Failed to fetch users");
        //       }
        //       const data = await response.json();
              
    //             setUsers(data); // Update state with fetched users
    //         } catch (error) {
    //             console.error("Error fetching users:", error);
    //         } finally {
    //             setLoading(false); // Stop loading indicator
    //         }
    //     };

    //     fetchUsers();
    // }, []); // Run once on component mount
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/user");
          setUsers(response.data.data); // Set the fetched users
          console.log(`Data fetched: ${JSON.stringify(response.data.data)}`);
        } catch (err) {
          console.log(err.message);
        }
      };
      fetchUsers();
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <DataTable 
                title="User List"
                columns={userColumns}
                data={users}
                pagination
                highlightOnHover
                // progressPending={loading} // Show loading indicator
            />
        </div>
    );
}
