import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import logo from './logo.png'
import userProfile from './user-profile.png'
import dropdownIcon from './dropdown-icon.svg'
import doctorsGroup from './doctors-group.png'
import clockIcon from './clock-icon.png'
import dermaIcon from './icon-dermatology.png'
import gastroIcon from './icon-gastro.png'
import generalIcon from './icon-physician.png'
import gynoIcon from './icon-gynecology.png'
import neuroIcon from './icon-neurologist.png'
import pedIcon from './icon-pediatrician.png'
import empathyIcon from './icon-empathy.png'
import magnifyingIcon from './icon-magnifying-glass.png'
import solutionIcon from './icon-solutions.png'


import doc1 from './doctor1.png'
import doc2 from './doctor2.png'
import doc3 from './doctor3.png'
import doc4 from './doctor4.png'
import doc5 from './doctor5.png'
import doc6 from './doctor6.png'
import doc7 from './doctor7.png'
import doc8 from './doctor8.png'
import doc9 from './doctor9.png'
import doc10 from './doctor10.png'
import doc11 from './doctor11.png'
import doc12 from './doctor12.png'
import doc13 from './doctor13.png'


export const assets = {

    logo,
    userProfile,
    dropdownIcon,
    doctorsGroup,
    clockIcon,
    dermaIcon,
    gastroIcon,
    generalIcon,
    gynoIcon,
    neuroIcon,
    pedIcon,    
    empathyIcon,
    magnifyingIcon,
    solutionIcon,
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: generalIcon
    },
    {
        speciality: 'Gynecologist',
        image: gynoIcon
    },
    {
        speciality: 'Dermatologist',
        image: dermaIcon
    },
    {
        speciality: 'Pediatricians',
        image: pedIcon
    },
    {
        speciality: 'Neurologist',
        image: neuroIcon
    },
    {
        speciality: 'Gastroenterologist',
        image: gastroIcon
    },
]

export const doctorsData = [
    {
        _id: 'doc1',
        name: 'Dr. Andrei Popescu',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc2',
        name: 'Dr. Elena Ionescu',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 300,
        slots_booked: []
    },
    {
        _id: 'doc3',
        name: 'Dr. Maria Gheorghiu',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 150,
        slots_booked: []
    },
    {
        _id: 'doc4',
        name: 'Dr. Cristian Dumitru',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 200,
        slots_booked: []
    },
    {
        _id: 'doc5',
        name: 'Dr. Alexandru Stanciu',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc6',
        name: 'Dr. Mihai Popa',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc7',
        name: 'Dr. Daniel Constantinescu',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '6 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc8',
        name: 'Dr. Ioan Munteanu',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 300,
        slots_booked: []
    },
    {
        _id: 'doc9',
        name: 'Dr. David Diaconu',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 150,
        slots_booked: []
    },
    {
        _id: 'doc10',
        name: 'Dr. Vlad Serban',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 200,
        slots_booked: []
    },
    {
        _id: 'doc11',
        name: 'Dr. Andreea Vasilescu',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc12',
        name: 'Dr. Stefan Nicolescu',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },
    {
        _id: 'doc13',
        name: 'Dr. Eduard Marinescu',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 250,
        slots_booked: []
    },

]