import { useLocation } from 'react-router-dom';
import { auth } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';


export default function PageNotFound({ "data-collection-item-id": __dataCollectionItemId }) {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  const { data: authData, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const user = await auth.me();
        return { user, isAuthenticated: true };
      } catch (error) {
        return { user: null, isAuthenticated: false };
      }
    }
  });

  return (
    <div data-source-location="PageNotFound:23:8" data-dynamic-content="true" className="min-h-screen flex items-center justify-center p-6 bg-slate-50" data-collection-item-id={__dataCollectionItemId}>
            <div data-source-location="PageNotFound:24:12" data-dynamic-content="true" className="max-w-md w-full">
                <div data-source-location="PageNotFound:25:16" data-dynamic-content="true" className="text-center space-y-6">
                    {/* 404 Error Code */}
                    <div data-source-location="PageNotFound:27:20" data-dynamic-content="false" className="space-y-2">
                        <h1 data-source-location="PageNotFound:28:24" data-dynamic-content="false" className="text-7xl font-light text-slate-300">404</h1>
                        <div data-source-location="PageNotFound:29:24" data-dynamic-content="false" className="h-0.5 w-16 bg-slate-200 mx-auto"></div>
                    </div>
                    
                    {/* Main Message */}
                    <div data-source-location="PageNotFound:33:20" data-dynamic-content="true" className="space-y-3">
                        <h2 data-source-location="PageNotFound:34:24" data-dynamic-content="false" className="text-2xl font-medium text-slate-800">
                            Page Not Found
                        </h2>
                        <p data-source-location="PageNotFound:37:24" data-dynamic-content="true" className="text-slate-600 leading-relaxed">
                            The page <span data-source-location="PageNotFound:38:37" data-dynamic-content="true" className="font-medium text-slate-700" data-collection-item-field="pageName" data-collection-item-id={__dataCollectionItemId}>"{pageName}"</span> could not be found in this application.
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' &&
          <div data-source-location="PageNotFound:44:24" data-dynamic-content="false" className="mt-8 p-4 bg-slate-100 rounded-lg border border-slate-200">
                            <div data-source-location="PageNotFound:45:28" data-dynamic-content="false" className="flex items-start space-x-3">
                                <div data-source-location="PageNotFound:46:32" data-dynamic-content="false" className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                                    <div data-source-location="PageNotFound:47:36" data-dynamic-content="false" className="w-2 h-2 rounded-full bg-orange-400"></div>
                                </div>
                                <div data-source-location="PageNotFound:49:32" data-dynamic-content="false" className="text-left space-y-1">
                                    <p data-source-location="PageNotFound:50:36" data-dynamic-content="false" className="text-sm font-medium text-slate-700">Admin Note</p>
                                    <p data-source-location="PageNotFound:51:36" data-dynamic-content="false" className="text-sm text-slate-600 leading-relaxed">
                                        This could mean that the AI hasn't implemented this page yet. Ask it to implement it in the chat.
                                    </p>
                                </div>
                            </div>
                        </div>
          }
                    
                    {/* Action Button */}
                    <div data-source-location="PageNotFound:60:20" data-dynamic-content="true" className="pt-6">
                        <button data-source-location="PageNotFound:61:24" data-dynamic-content="true"
            onClick={() => window.location.href = '/'}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              
                            <svg data-source-location="PageNotFound:65:28" data-dynamic-content="false" className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path data-source-location="PageNotFound:66:32" data-dynamic-content="false" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>);

}