import { Settings, Bell, Menu } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import adminAvatar from "@/assets/admin-avatar.jpg";

const TopNav = ({ pageTitle, onMenuClick }) => {
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
        {/* Notificatbetween */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
            3
          </span>
        </button>
        {/* Settings */}
        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
          <Settings className="h-5 w-5" />
        </button>
        {/* Profile */}
        {/* <div className="flex items-center gap-5 border-l border-border">
          <div className="text-right flex flex-col">
            <p className="text-sm font-medium text-foreground">Admin Name</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
           <div className="h-10 w-10 ring-2 ring-primary/20 bg-purple-100">
            {/* // <AvatarImage src={adminAvatar} alt="Admin" />
            // <AvatarFallback className="bg-primary text-primary-foreground">AN</AvatarFallback> */}
        {/* </div> 
        </div> */}

        <div className="w-[200px] flex items-center justify-around border-l border-border">
          <div className="text-right flex flex-col">
            <p className="text-sm font-medium text-foreground">Admin Name</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>

          <div className="h-10 w-10 ring-2 ring-primary/20 bg-purple-100"></div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
