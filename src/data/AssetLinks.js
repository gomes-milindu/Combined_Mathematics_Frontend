// ============================================
// 🖼️ CENTRALIZED ASSET LINKS
// ============================================
// All image paths / URLs in one place.
// When you move images to Supabase, just replace
// the local imports with Supabase URLs like:
//   Hero_Home: "https://your-project.supabase.co/storage/v1/object/public/images/hero-home.jpg",
// ============================================

// --- Supabase URLs ---
const heroHome = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/hee.jpg";
const heroClasses = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/Classes%20Page/classCardHeader.jpg";
const heroCourses = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/Course%20PAge/courses.png";
const heroAbout = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/About%20Page/About.png";
const heroContact = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/Contact%20Page/Contact.png";

// --- Local Imports ---

const cardIcon = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/icon.png";

const teacherPhoto = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/sir.jpeg";
const missionImage = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/About%20Page/mission.png";
const visionImage = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/About%20Page/vision.png";
const studentPhoto = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/Student.png";
const girlImage = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/Vector2Mob.png";

const footerRect6 = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/Rectangle%206.png";
const footerRect7 = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/Rectangle%207.png";
const footerName = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/name.png";
const footerMail = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/mail.png";
const footerCall = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/call.png";
const footerMap = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/map.png";
const footerFb = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/fb.png";
const footerInsta = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/insta.png";
const footerYoutube = "https://afablbkjnkbxwieszbtb.supabase.co/storage/v1/object/public/HomePage/youtube.png";


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
