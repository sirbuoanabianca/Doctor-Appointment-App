import { useParams } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

export const Appointment = () => {
  const { docId } = useParams();
  const { doctors, bookAppointment } = useContext(AppContext);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [filteredDocs, setFilteredDocs] = useState([]);


  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const fetchDoctorDetails = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    setDoctorDetails(doctor);
  };

  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      //we display slots starting from tomorrow
      currentDate.setDate(today.getDate() + i + 1);

      const timeSlots = [];
      for (let hour = 9; hour <= 17; hour++) {
        const hourTime = `${hour.toString().padStart(2, '0')}:00`;
        const dateString = currentDate.toISOString().split('T')[0];

        const isBooked = doctorDetails?.slots_booked?.some(
          slot => slot.date === dateString && slot.time === hourTime
        );

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate.setHours(hour, 0, 0, 0)),
            time: hourTime
          });
        }
      }

      slots.push({
        date: new Date(today.getTime() + (i + 1) * 24 * 60 * 60 * 1000),
        timeSlots: timeSlots
      });
    }

    setDocSlots(slots);
  };

  const handleBookAppointment = () => {
    if (!slotTime) {
      alert('Please select a time slot');
      return;
    }

    const selectedDate = docSlots[slotIndex].date;
    const dateString = selectedDate.toISOString().split('T')[0];

    bookAppointment(docId, dateString, slotTime);
    alert('Appointment booked successfully!');

    getAvailableSlots();
    setSlotTime('');
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [doctors, docId]);

  useEffect(() => {
    if (doctorDetails) {
      getAvailableSlots();
    }
  }, [doctorDetails]);

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
              src={doctorDetails.image}
              alt={doctorDetails.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">{doctorDetails.name}</h1>
                <p className="text-gray-600">{doctorDetails.speciality}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {doctorDetails.degree}
                </p>
              </div>
              <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                {doctorDetails.experience}
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

        <button
          onClick={handleBookAppointment}
          className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!slotTime}
        >
          Book an appointment
        </button>
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
                  src={doctor.image}
                  alt={doctor.name}
                  className='w-full h-full object-cover object-top'
                />

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
                <div className='absolute top-4 right-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300'>
                  {doctor.experience}
                </div>
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
