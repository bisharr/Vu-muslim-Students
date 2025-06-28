import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-100 p-4 rounded-lg shadow">
            <Link to="/admin/users">
              {" "}
              <h2 className="font-semibold text-blue-700 mb-2">
                📋 Registered Users
              </h2>
              <p>View and manage all student accounts.</p>
            </Link>
          </div>
          {/* Post Events */}
          <div className="bg-green-100 p-4 rounded-lg shadow">
            <Link to="/admin/post-event">
              <h2 className="font-semibold text-green-700 mb-2">
                📢 Announcements and Events
              </h2>
              <p>Post community announcements.</p>
            </Link>
          </div>
          {/* Edit Events */}
          <div className="bg-slate-100 p-4 rounded-lg shadow">
            <Link to="/admin/manage-events">
              <h2 className="font-semibold text-blue-700 mb-2">📢 Events</h2>
              <p>Delete and edit community announcements.</p>
            </Link>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <Link to="/admin/messages">
              <h2 className="font-semibold text-yellow-700 mb-2">
                ✉️ Contact Messages
              </h2>
              <p>See messages submitted through the website.</p>
            </Link>
          </div>
          {/* <div className="bg-yellow-100 p-4 rounded-lg shadow">
            <Link to="/admin/addmin-add_Photo">
              <h2 className="font-semibold text-yellow-700 mb-2">
                ✉️ Community Photo
              </h2>
              <p>Add Community Photo</p>
            </Link>
          </div> */}
          {/* <div className="bg-green-100 p-4 rounded-lg shadow">
            <Link to="/admin/quizForm">
              <h2 className="font-semibold text-yellow-700 mb-2">
                ✉️ Quiz Form
              </h2>
              <p>Submit new Quiz</p>
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
