export const sectionTitles: Record<string, string> = {
  benefits: "Benefits",
  testimonials: "Testimonials",
  "student-support": "Student Support",
  faq: "FAQ",
  history: "History",
  "mission-vision": "Mission & Vision",
  "team-members": "Team Members",
  specialfeatures: "Special Features",
  admissionprocess: "Admission Process",
  feestructures: "Fee Structure",
  subjects: "Subjects",
  activities: "Activities",
  contact: "Messages",
  rooms: "Rooms",
  awards: "Awards",
  additionalservices: "Additional Services",
  events: "Events",
};

export const titleFor = (path: string) =>
  sectionTitles[path.replace(/^\//, "").toLowerCase()] ?? path;
