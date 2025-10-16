import React from 'react'

export function AuthCard({
    title,
    children,
    onSubmit,
    buttonText,
    haveAccountQuestionText,
    haveAccountAnswerText,
    footerLinkHref = "#",
    showRememberMe = true,
    errorMessage = null,
}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
            <div className="w-96 bg-white rounded-lg shadow-xl">
                {/* Card header*/}
                <div className="bg-primary  mb-4 grid h-28 place-items-center rounded-t-lg">
                    <h3 className="text-3xl font-bold text-white">
                        {title}
                    </h3>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Card body */}
                    <div className="flex flex-col gap-4 px-8 pb-4">
                        {children}

                        {showRememberMe && (
                            <div className="-ml-2.5 flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember-me"
                                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                                    Remember Me
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Card footer */}
                    <div className="pt-0 px-8 pb-8">
                        <button
                            type="submit"
                            className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg cursor-pointer transition-transform hover:scale-105 duration-200 shadow-md"
                        >
                            {buttonText}
                        </button>

                        {haveAccountQuestionText && haveAccountAnswerText && (
                            <p className="mt-6 flex justify-center text-sm text-gray-600">
                                {haveAccountQuestionText}
                                <a
                                    href={footerLinkHref}
                                    className="ml-1 font-bold text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    {haveAccountAnswerText}
                                </a>
                            </p>
                        )}
                    </div>

                    {errorMessage && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mx-4 mb-4 rounded">
                            {errorMessage.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )
                    }
                </form>
            </div>
        </div>
    );
}
