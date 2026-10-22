import Benefits from "../pages/benefits/Benefits";
import Testimonials from "../pages/testimonials/Testimonials";
import Faq from "../pages/FAQ/Faq";
import Subjects from "../pages/subjects/Subjects";
import Activities from "../pages/Activities/Activities";
import FeeStructures from "../pages/FeeStructures/FeeStructures";
import Contact from "../pages/Contact/Contact";
import StudentSupports from "../pages/StudentSupports/StudentSupports";
import Events from "../pages/events/Events";
import MissionVision from "../pages/mission-vision/MissionVision";
import Members from "../pages/Member/Members";
import History from "../pages/history/History";
import SpecialFeatures from "../pages/specialfeatures/SpecialFeatures";
import AdmissionProcess from "../pages/AdmissionProcess/AdmissionProcess";
import Rooms from "../pages/rooms/Rooms";
import { titleFor } from "./labels";

import { SiBentobox, SiContactlesspayment } from "react-icons/si";
import { SiLibreofficewriter } from "react-icons/si";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa6";
import { LuBookOpenCheck } from "react-icons/lu";
import { BsClockHistory, BsFillHouseGearFill } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { AdditionalServices } from "../pages/additionalServices/AdditionalServices";
import { MdOutlineContactSupport, MdOutlineEvent, MdOutlineSportsEsports } from "react-icons/md";
import { FaAward, FaBook } from "react-icons/fa";
import Awards from "../pages/Awards/Awards";

export const DashBoardLinks = [
  {
    path: "benefits",
    label: titleFor("benefits"),
    icon: <SiBentobox />,
    childComponente: <Benefits />,
  },

  {
    path: "testimonials",
    label: titleFor("testimonials"),
    icon: <SiLibreofficewriter />,
    childComponente: <Testimonials />,
  },
  {
    path: "student-support",
    label: titleFor("student-support"),
    icon: <MdOutlineContactSupport />,
    childComponente: <StudentSupports />,
  },
  {
    path: "faq",
    label: titleFor("faq"),
    icon: <FaPersonCircleQuestion />,
    childComponente: <Faq />,
  },
  {
    path: "history",
    label: titleFor("history"),
    icon: <BsClockHistory />,
    childComponente: <History />,
  },
  {
    path: "mission-vision",
    label: titleFor("mission-vision"),
    icon: <GrOverview />,
    childComponente: <MissionVision />,
  },
  {
    path: "team-members",
    label: titleFor("team-members"),
    icon: <FaUserTie />,
    childComponente: <Members />,
  },
  {
    path: "Specialfeatures",
    label: titleFor("Specialfeatures"),
    icon: <SiBentobox />,
    childComponente: <SpecialFeatures />,
  },
  {
    path: "admissionProcess",
    label: titleFor("admissionProcess"),
    icon: <LuBookOpenCheck />,
    childComponente: <AdmissionProcess />,
  },
  {
    path: "FeeStructures",
    label: titleFor("FeeStructures"),
    icon: <SiBentobox />,
    childComponente: <FeeStructures />,
  },
  {
    path: "subjects",
    label: titleFor("subjects"),
    icon: <FaBook/>,
    childComponente: <Subjects />,
  },
  {
    path: "activities",
    label: titleFor("activities"),
    icon: <MdOutlineSportsEsports />,
    childComponente: <Activities />,
  },
  {
    path: "Contact",
    label: titleFor("Contact"),
    icon: <SiContactlesspayment />,
    childComponente: <Contact />,
  },
  {
    path: "/rooms",
    label: titleFor("/rooms"),
    icon: <BsFillHouseGearFill />,
    childComponente: <Rooms />,
  },
  {
    path: "/awards",
    label: titleFor("/awards"),
    icon: <FaAward />,
    childComponente: <Awards />,
  },
  {
    path: "/additionalservices",
    label: titleFor("/additionalservices"),
    icon: <GrServices />,
    childComponente: <AdditionalServices />,
  },
  {
    path: "/events",
    label: titleFor("/events"),
    icon: <MdOutlineEvent />,
    childComponente: <Events />,
  },

];

