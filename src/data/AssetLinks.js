// ============================================
// 🖼️ CENTRALIZED ASSET LINKS
// ============================================
// All image paths / URLs in one place.
// When you move images to Supabase, just replace
// the local imports with Supabase URLs like:
//   Hero_Home: "https://your-project.supabase.co/storage/v1/object/public/images/hero-home.jpg",
// ============================================

// --- Local Imports ---
import heroHome from "../assets/Hero/hee.jpg";
import heroClasses from "../assets/Hero/classCardHeader.jpg";
import heroCourses from "../assets/Hero/courses.png";
import heroAbout from "../assets/Images/About.png";
import heroContact from "../assets/Images/Contact.png";

import cardIcon from "../assets/Hero/icon.png";

import teacherPhoto from "../assets/Images/sir.png";
import missionImage from "../assets/Images/mission.png";
import visionImage from "../assets/Images/vision.png";
import studentPhoto from "../assets/Images/student.png";
import girlImage from "../assets/image.png";

import footerRect6 from "../assets/Footer/Rectangle 6.png";
import footerRect7 from "../assets/Footer/Rectangle 7.png";
import footerName from "../assets/Footer/name.png";
import footerMail from "../assets/Footer/mail.png";
import footerCall from "../assets/Footer/call.png";
import footerMap from "../assets/Footer/map.png";
import footerFb from "../assets/Footer/fb.png";
import footerInsta from "../assets/Footer/insta.png";
import footerYoutube from "../assets/Footer/youtube.png";


// ============================================
// Export as a single object
// ============================================

export const Assets = {

  // ---- Hero / Header Background Images ----
  Hero_Home: heroHome,
  Hero_Classes: heroClasses,
  Hero_Courses: heroCourses,
  Hero_About: heroAbout,
  Hero_Contact: heroContact,

  // ---- Icons ----
  Card_Icon: cardIcon,

  // ---- About / Teacher ----
  Teacher_Photo: teacherPhoto,
  Mission_Image: missionImage,
  Vision_Image: visionImage,

  // ---- Students ----
  Student_Photo: studentPhoto,
  Girl_Image: girlImage,

  // ---- Footer ----
  Footer_Rect6: footerRect6,
  Footer_Rect7: footerRect7,
  Footer_Name: footerName,
  Footer_Mail: footerMail,
  Footer_Call: footerCall,
  Footer_Map: footerMap,
  Footer_Fb: footerFb,
  Footer_Insta: footerInsta,
  Footer_Youtube: footerYoutube,
};

export default Assets;
