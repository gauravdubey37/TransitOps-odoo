import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/shared/Sidebar';
import { Header } from '../components/shared/Header';
import { ChevronRight, Home } from 'lucide-react';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        
        {/* Workspace Content */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          {/* Breadcrumb Section */}
          {pathnames.length > 0 && (
            <nav className="mb-4 flex items-center space-x-1.5 text-xs text-muted-foreground">
              <Link to="/dashboard" className="hover:text-foreground flex items-center">
                <Home className="h-3.5 w-3.5 mr-1" />
                Home
              </Link>
              {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                const formattedName = value.charAt(0).toUpperCase() + value.slice(1);

                return (
                  <React.Fragment key={to}>
                    <ChevronRight className="h-3 w-3" />
                    {isLast ? (
                      <span className="font-semibold text-foreground">{formattedName}</span>
                    ) : (
                      <Link to={to} className="hover:text-foreground">
                        {formattedName}
                      </Link>
                    )}
                  </React.Fragment>
                );
              })}
            </nav>
          )}

          {/* Router View */}
          <div className="min-h-[calc(100vh-140px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
