import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_URL = import.meta.env.SERVER_API_URL || 'http://localhost:5000';

export const Appointment = () => {
  const { docId } = useParams();
  const { doctors, token } = useContext(AppContext);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notes, setNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const fetchDoctorDetails = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    setDoctorDetails(doctor);
  };

  const getAvailableSlots = async () => {
    if (!docId) return;

    try {
      setLoading(true);
      setError(null);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const startDate = tomorrow.toISOString().split('T')[0];

      const response = await axios.get(
        `${API_URL}/api/appointment/slots/${docId}`,
        {
          params: {
            date: startDate,
            days: 30
          }
        }
      );

      if (response.data.success) {
        const slots = [];
        const slotsData = response.data.slots;

        Object.keys(slotsData).forEach((dateString) => {
          const slotData = slotsData[dateString];
          const date = new Date(dateString);

          const timeSlots = slotData.availableSlots.map(time => ({
            datetime: new Date(`${dateString}T${time}`),
            time: time
          }));

          slots.push({
            date: date,
            timeSlots: timeSlots
          });
        });

        setDocSlots(slots);
      }
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Failed to load available slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!slotTime) {
      alert('Please select a time slot');
      return;
    }

    if (!token) {
      alert('Please login to book an appointment');
      return;
    }

    try {
      setBookingLoading(true);
      setError(null);

      const selectedDate = docSlots[slotIndex].date;
      const dateString = selectedDate.toISOString().split('T')[0];

      const response = await axios.post(
        `${API_URL}/api/appointment/bookAppointment`,
        {
          doctorId: docId,
          date: dateString,
          time: slotTime,
          notes: notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        alert(response.data.message || 'Appointment booked successfully!');

        await getAvailableSlots();

        setSlotTime('');
        setNotes('');
      }
    } catch (err) {
      console.error('Error booking appointment:', err);
      const errorMessage = err.response?.data?.message || 'Failed to book appointment. Please try again.';
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctors, docId]);

  useEffect(() => {
    if (docId) {
      getAvailableSlots();
    }
  }, [docId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (doctorDetails) {
      if (doctorDetails.speciality) {
        setFilteredDocs(doctors.filter(doc => doc.speciality === doctorDetails.speciality));
      } else {
        setFilteredDocs(doctors);
      }
    }
  }, [doctors, doctorDetails]);

  return doctorDetails ? (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-8">
        <div className="md:flex">
          <div className="md:w-64 h-64 md:h-auto flex-shrink-0">
            <img
              src={doctorDetails.profileImage}
              alt={doctorDetails.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{doctorDetails.name}</h1>
                <p className="text-gray-600">{doctorDetails.specialization}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {doctorDetails.degree}
                </p>
              </div>
              <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                {doctorDetails.experience} years experience
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{doctorDetails.about}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-900 font-semibold">
                Appointment fee: <span className="text-primary">{doctorDetails.fees} RON</span>
              </p>

            </div>
          </div>
        </div>
      </div>

      {/* Book appointment */}

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Choose a slot</h2>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading available slots...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
        <div className="mb-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {docSlots.map((slot, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`relative flex flex-col min-w-[90px] rounded-xl cursor-pointer transition-all duration-300 overflow-hidden border-2 ${slotIndex === index
                    ? 'border-primary shadow-xl scale-105'
                    : 'border-gray-200 hover:border-primary hover:shadow-md'
                  }`}
              >
                <div className={`py-2 px-3 text-center font-bold text-xs uppercase ${slotIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {monthNames[slot.date.getMonth()].slice(0, 3)} {slot.date.getFullYear()}
                </div>

                <div className={`py-4 px-3 text-center ${slotIndex === index ? 'bg-primary text-white' : 'bg-white'
                  }`}>
                  <div className="text-3xl font-bold mb-1">{slot.date.getDate()}</div>
                  <div className={`text-xs font-medium ${slotIndex === index ? 'text-white opacity-90' : 'text-gray-500'
                    }`}>
                    {daysOfWeek[slot.date.getDay()]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Available time slots</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {docSlots[slotIndex]?.timeSlots.map((timeSlot, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(timeSlot.time)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${timeSlot.time === slotTime
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary'
                  }`}
              >
                {timeSlot.time}
              </button>
            ))}
          </div>
          {docSlots[slotIndex]?.timeSlots.length === 0 && (
            <p className="text-gray-500 text-sm">No available slots for this date</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            rows="4"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            placeholder="Add any notes or special requests for your appointment..."
          ></textarea>
        </div>

        <button
          onClick={handleBookAppointment}
          className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!slotTime || bookingLoading}
        >
          {bookingLoading ? 'Booking...' : 'Book an appointment'}
        </button>
        </>
        )}
      </div>


      {/* Related doctors  */}
      <h2 className="text-2xl font-semibold text-gray-900 text-center mt-30 mb-12">Related doctors</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 m-20'>
          {filteredDocs.map((doctor) => (
            <div
              key={doctor._id}
              className='border-2 border-primary rounded-lg overflow-hidden hover:translate-y-[-10px] transition-all duration-500 group relative hover:bg-primary'
            >
              <div className='h-72 w-full bg-gray-50 overflow-hidden relative'>
                <img
                  src={doctor.profileImage}
                  alt={doctor.name}
                  className='w-full h-full object-cover object-top'
                />

                <div className='absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300'>
                  {doctor.experience} years experience
                </div>

                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40'>
                  <Link
                    to={`/appointment/${doctor._id}`}
                    className='bg-white text-primary px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl'
                  >
                    Book appointment
                  </Link>
                </div>
              </div>

              <div className='p-4 relative group-hover:bg-primary transition-colors duration-300'>
                <h3 className='text-lg font-semibold text-gray-800 group-hover:text-white transition-colors duration-300'>{doctor.name}</h3>
                <p className='text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300'>{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>


    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <div className="text-lg text-gray-600">Loading...</div>
    </div>
  );
};
