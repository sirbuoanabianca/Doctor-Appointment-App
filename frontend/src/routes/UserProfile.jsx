import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/frontend_assets/assets'
import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_SERVER_API_URL || 'http://localhost:5000';

export const UserProfile = () => {

  const { user, setUser, token, fetchUserProfile } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const [editedEmail, setEditedEmail] = useState(user?.email || '');
  const [editedPhone, setEditedPhone] = useState(user?.phone || '');
  const [editedBirthDate, setEditedBirthDate] = useState(user?.birthDate || '');
  const [editedCNP, setEditedCNP] = useState(user?.cnp || '');
  const [editedGender, setEditedGender] = useState(user?.gender || '');
  const [editedStreet, setEditedStreet] = useState(user?.address?.street || '');
  const [editedCity, setEditedCity] = useState(user?.address?.city || '');
  const [editedCountry, setEditedCountry] = useState(user?.address?.country || '');
  const [editedPostalCode, setEditedPostalCode] = useState(user?.address?.postalCode || '');
  const [editedCounty, setEditedCounty] = useState(user?.address?.county || '');
  const [editedName, setEditedName] = useState(user?.name || '');


  const handleSave = async () => {
    try {
      const updatedData = {
        name: editedName,
        phone: editedPhone,
        DateOfBirth: editedBirthDate,
        CNP: editedCNP,
        gender: editedGender,
        StreetAddress: editedStreet,
        City: editedCity,
        PostalCode: editedPostalCode,
        Country: editedCountry,
        County: editedCounty,
      };

      const response = await axios.put(
        `${API_URL}/api/user/profile`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        await fetchUserProfile();
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedEmail(user?.email || '');
    setEditedPhone(user?.phone || '');
    setEditedBirthDate(user?.DateOfBirth || '');
    setEditedCNP(user?.CNP || '');
    setEditedGender(user?.gender || '');
    setEditedName(user?.name || '');
    setEditedStreet(user?.StreetAddress || '');
    setEditedCity(user?.City || '');
    setEditedCounty(user?.County || '');
    setEditedPostalCode(user?.PostalCode || '');
    setEditedCountry(user?.Country || '');
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img src={assets.userProfile}
                className="w-24 h-24 rounded-full" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <p className="text-gray-500">{user?.City}, {user?.Country}</p>

            </div>
          </div>
          <div className="flex gap-2">
            {isEditing && (
              <button
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                onClick={handleCancel}
              >
                Cancel
              </button>
            )}
            <button
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90"
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-xl text-primary mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              Contact
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-gray-500 block mb-1">Email</label>
                <input
                  type="email"
                  value={isEditing ? editedEmail : user?.email || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Phone</label>
                <input
                  type="tel"
                  value={isEditing ? editedPhone : user?.phone || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              Personal information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-gray-500 block mb-1">Full name</label>
                <input
                  type="text"
                  value={isEditing ? editedName : user?.name || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Date of birth</label>
                <input
                  type="date"
                  value={isEditing ? editedBirthDate : user?.birthDate || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedBirthDate(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">CNP</label>
                <input
                  type="text"
                  value={isEditing ? editedCNP : user?.CNP || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedCNP(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Gender</label>
                {isEditing ? (
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={editedGender === 'Male'}
                        onChange={() => setEditedGender('Male')}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Male</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={editedGender === 'Female'}
                        onChange={() => setEditedGender('Female')}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm">Female</span>
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={user?.gender || ''}
                    disabled
                    className="w-full rounded px-3 py-2 text-sm border-none bg-transparent p-0"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-bold text-primary mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              Address
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <label className="text-gray-500 block mb-1">Street</label>
                <input
                  type="text"
                  value={isEditing ? editedStreet : user?.StreetAddress || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedStreet(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">City</label>
                <input
                  type="text"
                  value={isEditing ? editedCity : user?.City || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedCity(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">County</label>
                <input
                  type="text"
                  value={isEditing ? editedCounty : user?.County || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedCounty(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Postal code</label>
                <input
                  type="text"
                  value={isEditing ? editedPostalCode : user?.PostalCode || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedPostalCode(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
              <div>
                <label className="text-gray-500 block mb-1">Country</label>
                <input
                  type="text"
                  value={isEditing ? editedCountry : user?.Country || ''}
                  disabled={!isEditing}
                  onChange={(e) => setEditedCountry(e.target.value)}
                  className={`w-full rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${isEditing ? 'border border-gray-300' : 'border-none bg-transparent p-0'
                    }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

