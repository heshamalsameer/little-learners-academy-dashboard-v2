import React, { useEffect } from "react";


import { getAllStudentSupports } from "../../redux/slice/studentSupport/studentSupportSlice";

import {deleteStudentSupport} from "../../redux/slice/studentSupport/studentSupportSlice"

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
const StudentSupports: React.FC = () => {
  const dispatch = useAppDispatch();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.StudentSupport
  );


  useEffect(() => {
    dispatch(getAllStudentSupports());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="student-support" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <ActivityCard
            to="student-support"
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            handleDelete={deleteStudentSupport}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default StudentSupports;
