import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./pages/Layout";
import { DashBoardLinks } from "./constants";

import "./services/axios-global";
import NewItem from "./components/common/NewItem/NewItem";
import TestimonialForm from "./components/Forms/TestimonialForm/TestimonialForm";
import MissionVisionForm from "./components/Forms/MissionVisionForm/MissionVisionForm";
import MemberForm from "./components/Forms/MemberForm/MemberForm";
import Benefits from "./pages/benefits/Benefits";
import AddEditBenefit from "./pages/benefits/AddEditBenefit";
import AddEditHistory from "./pages/history/AddEditHistory";
import SpecialFeatures from "./pages/specialfeatures/SpecialFeatures";
import AddEditSpecialFeature from "./pages/specialfeatures/AddEditSpecialFeature";
import AddEditFaq from "./pages/FAQ/AddEditFaq";
import AdmissionProcessForm from "./components/Forms/AdmissionProcessForm/AdmissionProcessForm";

import SubjectForm from "./components/Forms/SubjectForm/SubjectForm";
import ActivityForm from "./components/Forms/ActivityForm/ActivityForm";

import FeeStructures from "./pages/FeeStructures/FeeStructures";
import AddEditFeeStructure from "./pages/FeeStructures/AddEditFeeStructure";
import EventForm from "./components/Forms/EventForm/EventForm";
import Login from "./pages/login/Login";
import ProtectedRoute from "./services/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import StudentSupportForm from "./components/Forms/StudentSupportForm/StudentSupportForm";
import AwardForm from "./components/Forms/‏‏AwardForm/AwardForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashBoardLayout />
            </ProtectedRoute>
          }
        >
          {DashBoardLinks.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={item.childComponente}
              />
            );
          })}
          <Route
            path="/testimonials/add"
            element={
              <NewItem>
                <TestimonialForm />
              </NewItem>
            }
          />
          <Route
            path="/testimonials/update/:id"
            element={
              <NewItem>
                <TestimonialForm />
              </NewItem>
            }
          />

          <Route
            path="/activities/update/:id"
            element={
              <NewItem>
                <ActivityForm />
              </NewItem>
            }
          />
          <Route
            path="/activities/add"
            element={
              <NewItem>
                <ActivityForm />
              </NewItem>
            }
          />

          <Route
            path="/student-support/update/:id"
            element={
              <NewItem>
                <StudentSupportForm />
              </NewItem>
            }
          />
          <Route
            path="/student-support/add"
            element={
              <NewItem>
                <StudentSupportForm />
              </NewItem>
            }
          />

          <Route
            path="/awards/update/:id"
            element={
              <NewItem>
                <AwardForm />
              </NewItem>
            }
          />
          <Route
            path="/awards/add"
            element={
              <NewItem>
                <AwardForm />
              </NewItem>
            }
          />

          <Route
            path="/subjects/add"
            element={
              <NewItem>
                <SubjectForm />
              </NewItem>
            }
          />
          <Route
            path="/subjects/update/:id"
            element={
              <NewItem>
                <SubjectForm />
              </NewItem>
            }
          />

          <Route
            path="/events/add"
            element={
              <NewItem>
                <EventForm />
              </NewItem>
            }
          />
          <Route
            path="/events/update/:id"
            element={
              <NewItem>
                <EventForm />
              </NewItem>
            }
          />

          <Route
            path="/team-members/add"
            element={
              <NewItem>
                <MemberForm />
              </NewItem>
            }
          />
          <Route
            path="/team-members/update/:id"
            element={
              <NewItem>
                <MemberForm />
              </NewItem>
            }
          />
          <Route
            path="/mission-vision/add"
            element={
              <NewItem>
                <MissionVisionForm />
              </NewItem>
            }
          />
          <Route
            path="/mission-vision/update/:Ptitle"
            element={
              <NewItem>
                <MissionVisionForm />
              </NewItem>
            }
          />
          <Route path="" element={<Benefits />} />
          <Route path="/add-benefit" element={<AddEditBenefit />} />
          <Route path="/edit-benefit/:id" element={<AddEditBenefit />} />
          <Route path="/add-edit-history" element={<AddEditHistory />} />
          <Route path="/special-features" element={<SpecialFeatures />} />
          <Route
            path="/add-edit-special-feature"
            element={<AddEditSpecialFeature />}
          />
          <Route path="/add-faq" element={<AddEditFaq />} />
          <Route path="/faq/:id" element={<AddEditFaq />} />
          <Route
            path="/admissionProcess/add"
            element={
              <NewItem>
                <AdmissionProcessForm />
              </NewItem>
            }
          />
          <Route
            path="/admissionProcess/update/:id"
            element={
              <NewItem>
                <AdmissionProcessForm />
              </NewItem>
            }
          />
          <Route path="/special-features" element={<SpecialFeatures />} />
          <Route
            path="/add-edit-special-feature"
            element={<AddEditSpecialFeature />}
          />
          <Route path="/fee-structure" element={<FeeStructures />} />
          <Route path="/add-fee-structure" element={<AddEditFeeStructure />} />
          <Route
            path="/edit-fee-structure/:id"
            element={<AddEditFeeStructure />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
