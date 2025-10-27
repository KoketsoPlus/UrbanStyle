import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth(); // get logout function from AuthContext
  const navigate = useNavigate();

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setUserData(null);
          setLoading(false);
          return;
        }

        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user document!");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout with confirmation
  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );
    if (!confirmLogout) return;

    try {
      await logout(); // reset currentUser in AuthContext
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error("Failed to logout:", err);
      alert("Something went wrong while logging out.");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;
  if (!userData) return <p className="text-center mt-20">No user data found</p>;

  return (
    <div className="max-w-7xl mx-auto p-8 flex gap-16">
      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-4 min-w-[16rem] border-r border-gray-300 pr-6 text-gray-700">
        <span className="font-bold border-l-4 border-black pl-3">Account Info</span>
        <button className="text-left hover:text-pink-500">Orders</button>
        <button className="text-left hover:text-pink-500">Returns</button>
        <button className="text-left hover:text-pink-500">Wallet</button>
        <button className="text-left hover:text-pink-500">Wishlist</button>
        <button className="text-left hover:text-pink-500">Waitlist</button>
        <button className="text-left hover:text-pink-500">Notification Settings</button>
        <button
          className="text-left hover:text-pink-500"
          onClick={handleLogout} // ✅ attach logout handler
        >
          Logout
        </button>
      </nav>

      {/* Main Profile Content */}
      <div className="flex-1">
        {/* Breadcrumb */}
        <p className="text-sm mb-6 text-gray-600">Home / <strong>Account Info</strong></p>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <User size={28} />
          <h2 className="text-2xl font-bold">Hi, {userData.fullName}</h2>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* Left Col - Account and Personal Info */}
          <div className="space-y-8">
            <section>
              <h3 className="font-semibold mb-4">Account</h3>
              <div className="space-y-4 text-gray-600">
                <label className="block">
                  <span className="text-sm mb-1 block">Email *</span>
                  <input
                    type="email"
                    value={userData.emailAddress}
                    disabled
                    className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none"
                  />
                </label>
              </div>
            </section>

            <section>
              <h3 className="font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4 text-gray-600">
                <label className="block">
                  <span className="text-sm mb-1 block">Full Name *</span>
                  <input
                    type="text"
                    value={userData.fullName}
                    disabled
                    className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm mb-1 block">Phone Number</span>
                  <input
                    type="text"
                    value={userData.phoneNumber}
                    disabled
                    className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-sm mb-1 block">Physical Address</span>
                  <input
                    type="text"
                    value={userData.physicalAddress}
                    disabled
                    className="w-full border-b border-gray-300 bg-transparent py-1 focus:outline-none"
                  />
                </label>
              </div>
            </section>
          </div>

          {/* Right Col - Actions */}
          <div className="space-y-10 px-6 text-gray-700">
            <section>
              <h3 className="font-semibold mb-2">View Personal Information</h3>
              <p className="mb-4 text-sm">
                We only keep the information necessary to help make your experience on our app easier and more enjoyable.
              </p>
              <button className="border border-black uppercase py-2 px-6 hover:bg-black hover:text-white transition duration-300">
                View Information
              </button>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Delete Profile</h3>
              <p className="mb-4 text-sm">
                You can either permanently delete your profile or deactivate your account temporarily.
              </p>
              <button className="border border-black uppercase py-2 px-6 hover:bg-black hover:text-white transition duration-300">
                Delete Profile
              </button>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Change Marketing Preferences</h3>
              <p className="mb-4 text-sm">
                All communication settings for notifications and promotions we send you are set in notification settings.
              </p>
              <button className="border border-black uppercase py-2 px-6 hover:bg-black hover:text-white transition duration-300">
                Notification Settings
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
