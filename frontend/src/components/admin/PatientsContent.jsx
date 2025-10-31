import React from 'react'

export const PatientsContent = ({ patients, onDeletePatient }) => {

    return (
        <>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage patients</h2>
                {patients.length === 0 ? (
                    <p className="text-gray-600">No patients found.</p>
                ) : (
                    <ul className="space-y-4">
                        {patients.map(patient => (
                            <li key={patient._id} className="relative border-2 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white">
                                <button className="absolute top-4 right-4 px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors shadow-sm" onClick={() => onDeletePatient(patient._id)}
                                >
                                    Delete patient
                                </button>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 pr-36">{patient.name}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">Email:</span>
                                        <span className="text-gray-900">{patient.email}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">Phone:</span>
                                        <span className="text-gray-900">{patient.phone}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">CNP:</span>
                                        <span className="text-gray-900">{patient.CNP}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">Birth Date:</span>
                                        <span className="text-gray-900">{patient.DateOfBirth?.split('T')[0]}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">Street:</span>
                                        <span className="text-gray-900">{patient.StreetAddress}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">City:</span>
                                        <span className="text-gray-900">{patient.City}</span>
                                    </div>
                                    <div className="flex items-start">
                                        <span className="font-semibold text-gray-700 min-w-[120px]">County:</span>
                                        <span className="text-gray-900">{patient.County}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}
