import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "@/interfaces/User";
import { Button } from "@/components/ui/button";
import Avatar from "../assets/avatar.svg";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  
  const token = localStorage.getItem("jwt");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        const decode = jwtDecode<User>(token);
        setUser(decode);
      }
    }

    decodeToken();
  }, []);

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {user ? (
            <>
              <div className="flex flex-col items-center mb-6">
                {/* Profile Picture */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <img
                    src={Avatar}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
              </div>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Name</h2>
                  <p className="text-gray-600">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Email</h2>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                {user.address && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-700">Address</h2>
                    <p className="text-gray-600">
                      {user.address.streetAddress}, {user.address.city}, {user.address.country}
                    </p>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-semibold text-gray-700">Role</h2>
                  <p className="text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Edit Account
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  Delete Account
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Loading profile...</p>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-lg text-gray-600 mb-6">
            You need to log in to access the profile panel.
          </p>
          <Link to="/login">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Login Here</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfilePage