import React from 'react';

const UserNotRegisteredError = () => {
  return (
    <div data-source-location="components/UserNotRegisteredError:5:4" data-dynamic-content="false" className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div data-source-location="components/UserNotRegisteredError:6:6" data-dynamic-content="false" className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-slate-100">
        <div data-source-location="components/UserNotRegisteredError:7:8" data-dynamic-content="false" className="text-center">
          <div data-source-location="components/UserNotRegisteredError:8:10" data-dynamic-content="false" className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100">
            <svg data-source-location="components/UserNotRegisteredError:9:12" data-dynamic-content="false" className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path data-source-location="components/UserNotRegisteredError:10:14" data-dynamic-content="false" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 data-source-location="components/UserNotRegisteredError:13:10" data-dynamic-content="false" className="text-3xl font-bold text-slate-900 mb-4">Access Restricted</h1>
          <p data-source-location="components/UserNotRegisteredError:14:10" data-dynamic-content="false" className="text-slate-600 mb-8">
            You are not registered to use this application. Please contact the app administrator to request access.
          </p>
          <div data-source-location="components/UserNotRegisteredError:17:10" data-dynamic-content="false" className="p-4 bg-slate-50 rounded-md text-sm text-slate-600">
            <p data-source-location="components/UserNotRegisteredError:18:12" data-dynamic-content="false">If you believe this is an error, you can:</p>
            <ul data-source-location="components/UserNotRegisteredError:19:12" data-dynamic-content="false" className="list-disc list-inside mt-2 space-y-1">
              <li data-source-location="components/UserNotRegisteredError:20:14" data-dynamic-content="false">Verify you are logged in with the correct account</li>
              <li data-source-location="components/UserNotRegisteredError:21:14" data-dynamic-content="false">Contact the app administrator for access</li>
              <li data-source-location="components/UserNotRegisteredError:22:14" data-dynamic-content="false">Try logging out and back in again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>);

};

export default UserNotRegisteredError;