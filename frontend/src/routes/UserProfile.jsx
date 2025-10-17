import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/frontend_assets/assets'
import { useState } from 'react'

export const UserProfile = () => {

  const { user, setUser } = useContext(AppContext);
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


  const handleSave = () => {
    setUser({
      ...user,
      name: editedName,
      email: editedEmail,
      phone: editedPhone,
      birthDate: editedBirthDate,
      cnp: editedCNP,
      gender: editedGender,
      address: {
        street: editedStreet,
        city: editedCity,
        postalCode: editedPostalCode,
        country: editedCountry,
        county: editedCounty,
      },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEmail(user?.email || '');
    setEditedPhone(user?.phone || '');
    setEditedBirthDate(user?.birthDate || '');
    setEditedCNP(user?.cnp || '');
    setEditedGender(user?.gender || '');
    setEditedName(user?.name || '');
    setEditedStreet(user?.address?.street || '');
    setEditedCity(user?.address?.city || '');
    setEditedCounty(user?.address?.county || '');
    setEditedPostalCode(user?.address?.postalCode || '');
    setEditedCountry(user?.address?.country || '');
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
              <p className="text-gray-500">{user?.address?.city}, {user?.address?.country}</p>

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
                  value={isEditing ? editedCNP : user?.cnp || ''}
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
                  value={isEditing ? editedStreet : user?.address?.street || ''}
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
                  value={isEditing ? editedCity : user?.address?.city || ''}
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
                  value={isEditing ? editedCounty : user?.address?.county || ''}
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
                  value={isEditing ? editedPostalCode : user?.address?.postalCode || ''}
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
                  value={isEditing ? editedCountry : user?.address?.country || ''}
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

