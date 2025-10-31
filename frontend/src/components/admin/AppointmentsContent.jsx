import { useState, useMemo } from 'react';

export const AppointmentsContent = ({ appointments, onDeleteAppointment }) => {
    const [filters, setFilters] = useState({
        date: '',
        doctorId: '',
        userId: '',
        paymentStatus: '',
    });

    const statuses = useMemo(() => {
        const uniqueStatuses = [...new Set(appointments.map(apt => apt.paymentStatus))];
        return uniqueStatuses.filter(Boolean);
    }, [appointments]);

    const uniqueDoctors = useMemo(() => {
        const doctorsMap = new Map();
        appointments.forEach(apt => {
            if (apt.doctorId?._id) {
                doctorsMap.set(apt.doctorId._id, apt.doctorId);
            }
        });
        return Array.from(doctorsMap.values());
    }, [appointments]);

    const uniquePatients = useMemo(() => {
        const patientsMap = new Map();
        appointments.forEach(apt => {
            if (apt.userId?._id) {
                patientsMap.set(apt.userId._id, apt.userId);
            }
        });
        return Array.from(patientsMap.values());
    }, [appointments]);

    const filteredAppointments = useMemo(() => {
        return appointments.filter(appointment => {
            if (filters.date) {
                const appointmentDate = new Date(appointment.date).toISOString().split('T')[0];
                if (appointmentDate !== filters.date) return false;
            }

            if (filters.userId && appointment.userId?._id !== filters.userId) {
                return false;
            }

            if (filters.doctorId && appointment.doctorId?._id !== filters.doctorId) {
                return false;
            }

            if (filters.paymentStatus && appointment.paymentStatus !== filters.paymentStatus) {
                return false;
            }

            return true;
        });
    }, [appointments, filters]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            date: '',
            doctorId: '',
            paymentStatus: '',
        });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

      const handleDelete = (appointment) => {
        if (!confirm(`Are you sure you want to delete the appointment for ${appointment.userId?.name} with ${appointment.doctorId?.name}?`)) {
            return;
        }
        onDeleteAppointment(appointment._id);

    };

    return (
        <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Manage Appointments</h2>

                {/* Filters section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

                    {/* Doctor filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Doctor
                        </label>
                        <select
                            value={filters.doctorId}
                            onChange={(e) => handleFilterChange('doctorId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="">All doctors</option>
                            {uniqueDoctors.map((doctor) => (
                                <option key={doctor._id} value={doctor._id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Patient
                        </label>
                        <select
                            value={filters.userId}
                            onChange={(e) => handleFilterChange('userId', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="">All patients</option>
                            {uniquePatients.map((patient) => (
                                <option key={patient._id} value={patient._id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        />
                    </div>

                    {/* Status filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={filters.paymentStatus}
                            onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                        >
                            <option value="">Payment status</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Clear filters button */}
                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                        Showing {filteredAppointments.length} of {appointments.length} appointments
                    </p>
                    {(filters.date || filters.doctorId || filters.userId || filters.paymentStatus) && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-primary hover:text-primary/80 font-medium"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Appointments List */}
            {filteredAppointments.length === 0 ? (
                <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {appointments.length === 0
                            ? 'No appointments have been scheduled yet.'
                            : 'Try adjusting your filters.'}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fees
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Notes
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Delete appointment
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {appointment.userId?.name || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {appointment.userId?.email || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <img
                                                src={appointment.doctorId?.profileImage}
                                                alt={appointment.doctorId?.name}
                                                className="h-10 w-10 rounded-full object-cover mr-3"
                                            />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {appointment.doctorId?.name || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {appointment.doctorId?.specialization || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(appointment.date)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {appointment.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full`}>
                                            {appointment.paymentStatus || 'pay at clinic'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${appointment.doctorId?.fees || 0}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                        {appointment.notes || '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <button
                                            onClick={() => handleDelete(appointment)}
                                            className='bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700 hover:scale-110 transition-all shadow-md mx-auto'
                                            aria-label="Delete appointment"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
