import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import { User } from "@/interfaces/User";
import { Button } from "@/components/ui/button";
import Avatar from "../assets/avatar.svg";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const token = localStorage.getItem("jwt");
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: { streetAddress: '', city: '', country: '' },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const decodeToken = () => {
      if (token) {
        const decode = jwtDecode<User>(token);
        setUser(decode);
        setFormData({
          firstName: decode.firstName,
          lastName: decode.lastName,
          email: decode.email,
          address: decode.address || { streetAddress: '', city: '', country: '' },
        });
      }
    };

    decodeToken();
  }, [token]);

  const handleEditClick = () => setIsEditing(true);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch("https://mangafy-api.onrender.com/users/api/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch("https://mangafy-api.onrender.com/users/api/delete", {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("jwt");
        navigate("/login");
      } else {
        console.error("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {user ? (
            <>
              <div className="flex flex-col items-center mb-6">
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
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">Street Address</label>
                      <input
                        type="text"
                        name="streetAddress"
                        value={formData.address.streetAddress}
                        onChange={handleAddressChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xl font-semibold text-gray-700">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.address.country}
                        onChange={handleAddressChange}
                        className="border rounded p-2 w-full"
                      />
                    </div>
                    <div className="mt-6 flex justify-between">
                      <Button
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={handleSaveClick}
                      >
                        Save Changes
                      </Button>
                      <Button
                        className="bg-gray-500 hover:bg-gray-600 text-white"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
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
                    <div className="mt-6 flex justify-between">
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleEditClick}>
                        Edit Account
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleDeleteClick}>
                        Delete Account
                      </Button>
                    </div>
                  </>
                )}
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
};

export default ProfilePage;
