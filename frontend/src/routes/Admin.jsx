import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DashboardContent } from '../components/admin/DashboardContent'
import { DoctorsContent } from '../components/admin/DoctorsContent'

const API_URL = import.meta.env.SERVER_API_URL || 'http://localhost:5000';

export const Admin = () => {
  const { token, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  const [allDoctors, setAllDoctors] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

  const tabs = [
    { id: 'dashboard', name: 'Dashboard'},
    { id: 'doctors', name: 'Doctors' },
    { id: 'appointments', name: 'Appointments' },
    { id: 'users', name: 'Patients' },
  ];

  const fetchDashboardStats = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${API_URL}/api/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError(err.response?.data?.message || 'Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllDoctors = async () => {
    if (!token) return;

    try {
      setDoctorsLoading(true);

      const response = await axios.get(
        `${API_URL}/api/doctor`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        const doctorsWithImages = response.data.doctors.map(doctor => ({
          ...doctor,
          profileImage: `${API_URL}${doctor.profileImage}`,
        }));
        setAllDoctors(doctorsWithImages);
        console.log(doctorsWithImages);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
    } finally {
      setDoctorsLoading(false);
    }
  };

  const fetchAllAppointments = async () => {
    if (!token) return;

    try {
      setAppointmentsLoading(true);

      const response = await axios.get(
        `${API_URL}/api/admin/appointments`,
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
        setAllAppointments(appointmentsWithImages);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/admin/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setAllDoctors(allDoctors.filter(doc => doc._id !== doctorId));
        alert('Doctor deleted successfully');

        fetchDashboardStats();
      }
    } catch (err) {
      console.error('Error deleting doctor:', err);
      alert(err.response?.data?.message || 'Failed to delete doctor');
    }
  };

  const handleDoctorAdded = () => {

    fetchAllDoctors();
    fetchDashboardStats();
  };

  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchDashboardStats();
  }, [token, user]);

  useEffect(() => {
    if (!token || !user) return;

    if (activeTab === 'doctors' && allDoctors.length === 0) {
      fetchAllDoctors();
    }

    if (activeTab === 'appointments' && allAppointments.length === 0) {
      fetchAllAppointments();
    }
  }, [activeTab, token, user]);


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent stats={stats} />;
      case 'doctors':
        return <DoctorsContent doctors={allDoctors} onDeleteDoctor={handleDeleteDoctor} onDoctorAdded={handleDoctorAdded} />;
      case 'appointments':
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointments</h2>
            <p className="text-gray-600">Appointment management functionality coming soon...</p>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Patients</h2>
            <p className="text-gray-600">Patient management functionality coming soon...</p>
          </div>
        );
      default:
        return <DashboardContent stats={stats} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Admin Panel
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Vertical tabs */}
        <div className="w-full md:w-1/4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                  activeTab === tab.id
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white border-gray-300 hover:border-primary'
                }`}
              >
                <p className="text-sm font-semibold flex items-center gap-2">
                  {tab.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="w-full md:w-3/4">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
