import React from 'react'

export const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-2xl text-primary font-semibold">
          Patients and their health, always at the heart of everything we do
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
        <p>
          The <strong className="text-primary">NovaCare Medical Center</strong> was established in 2012 with the goal of creating
          a new standard in outpatient healthcare in Romania and Cluj, elevating the quality of medical services to a superior level.
        </p>

        <p>
          Today, we take pride in our team of over <strong>100 primary care physicians and specialists</strong>,
          nurses, medical secretaries, and other colleagues across the entire NovaCare network who ensure the
          comfort and care of our patients every single day.
        </p>

        <div className="bg-primary/5 rounded-lg p-8 my-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment to You</h2>
          <p className="mb-6">
            We work diligently and attentively to ensure that our patients have a pleasant, positive, and complete experience:
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <span className="text-3xl text-primary font-bold">{'\u2713'}</span>
              <p className="text-gray-700">
                We are always attentive to <strong>your opinions and feedback</strong>
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl text-primary font-bold">{'\u2713'}</span>
              <p className="text-gray-700">
                You will be <strong>actively involved</strong> in care and treatment decisions
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl text-primary font-bold">{'\u2713'}</span>
              <p className="text-gray-700">
                You are always <strong>welcome</strong> and will feel relaxed and well-cared for
              </p>
            </li>
            <li className="flex items-start gap-4">
              <span className="text-3xl text-primary font-bold">{'\u2713'}</span>
              <p className="text-gray-700">
                You will meet a team of <strong>experienced and highly qualified physicians</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
