import { Settings, Bell, Menu, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

const StudentTopNav = ({ pageTitle, onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 flex h-[10vh] items-center justify-between bg-white px-6 shadow-sm">
      {/* Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-200 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-auto flex justify-end">
          <h2 className="text-xl font-semibold text-foreground">{pageTitle}</h2>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden md:flex items-center gap-4 mr-5 ml-auto">
        {/* Notifications */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            1
          </span>
        </button>
        {/* Change Password */}
        <Link to="/student/change-password" className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors" title="Change Password">
          <KeyRound className="h-5 w-5" />
        </Link>

        <div className="w-[200px] flex items-center justify-around border-l border-border">
          <div className="text-right flex flex-col">
            <p className="text-sm font-medium text-foreground">Student</p>
            <p className="text-xs text-muted-foreground">My Profile</p>
          </div>

          <div className="h-10 w-10 ring-2 ring-primary/20 bg-purple-100 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default StudentTopNav;
