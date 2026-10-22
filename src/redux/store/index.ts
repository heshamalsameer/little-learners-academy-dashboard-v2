import { configureStore } from "@reduxjs/toolkit";

import faqs from "../slice/Faq/faqSlice";
import testimonialSlice from "../slice/testimonials/testimonialSlice";
import admissionProcessSlice from "../slice/admissionProcess/admissionProcessSlice";
import missionVision from "../slice/mission-vision/missionVisionSlice";
import memberSlice from "../slice/members/memberSlice";
import histories from "../slice/historySlice";
import benefits from "../slice/benefitsSlice";
import specialFeaturesReducer from "../../redux/slice/specialFeaturesSlice";
import subjectSlice from "../slice/subjects/subjectSlice";
import activitySlice from "../slice/activities/activitySlice";
import eventSlice from "../slice/events/eventSlice"
import authSlice from "../slice/auth/authSlice"
import feeStructures from "../slice/feeStructureSlice";
import StudentSupport from "../slice/studentSupport/studentSupportSlice"
import messages from "../slice/messageSlice"
import AwardSlice from "../slice/awards/awardSlice"
export const store = configureStore({
  reducer: {
    testimonialSlice,
    faqs,
    authSlice,
    missionVision,
    memberSlice,
    histories,
    benefits,
    specialFeatures: specialFeaturesReducer,
    feeStructures,
    subjectSlice,
    activitySlice,
    admissionProcessSlice,
    eventSlice,
    StudentSupport,
    messages,
    AwardSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
