import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const API_URL = import.meta.env.SERVER_API_URL || 'http://localhost:5000';

export const UserAppointments = () => {
  const { token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserAppointments = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${API_URL}/api/appointment/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const appointmentsWithImages = response.data.appointments.map(appointment => ({
          ...appointment,
          doctorId: {
            ...appointment.doctorId,
            profileImage: `${API_URL}${appointment.doctorId.profileImage}`
          }
        }));
        setAppointments(appointmentsWithImages);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/appointment/${appointmentId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert(response.data.message || 'Appointment cancelled successfully');
        fetchUserAppointments();
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
      alert(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  useEffect(() => {
    fetchUserAppointments();
  }, [token]);

  if (!token) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Please login to view your appointments</h2>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading your appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My appointments</h1>

      {appointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">You don't have any appointments yet</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.map(appointment => (
            <div
              key={appointment._id}
              className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center gap-6"
            >
              {/* Doctor image */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-primary flex-shrink-0">
                <img
                  src={appointment.doctorId.profileImage}
                  alt={appointment.doctorId.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Doctor info */}
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold text-gray-900">{appointment.doctorId.name}</h2>
                <p className="text-gray-600 mt-1">{appointment.doctorId.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">Fee: {appointment.doctorId.fees} RON</p>
                {appointment.notes && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-semibold">Notes:</span> {appointment.notes}
                  </p>
                )}
              </div>

              {/* Appointment date & time */}
              <div className="bg-primary/10 px-6 py-3 rounded-lg">
                <p className="text-lg font-semibold text-primary">
                  {formatDate(appointment.date)}, {appointment.time}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Payment: {appointment.paymentStatus}
                </p>
              </div>

              <div className="flex gap-4 ml-12">
                <button
                  className="bg-primary text-white font-semibold rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors"
                  onClick={() => alert('Payment feature coming soon!')}
                >
                  Pay online
                </button>
                <button
                  className="bg-red-500/10 font-semibold text-red-600 rounded-lg px-6 py-3 hover:bg-red-500/20 transition-colors"
                  onClick={() => handleCancelAppointment(appointment._id)}
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
