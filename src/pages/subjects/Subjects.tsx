import React, { useEffect } from "react";


import { getAllSubjects,deleteSubject } from "../../redux/slice/subjects/subjectSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import SubjectCard from "../../components/SubjectCard/SubjectCard";

const Subjects: React.FC = () => {
  const dispatch = useAppDispatch();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.subjectSlice
  );


  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="subjects" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <SubjectCard
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            to="subjects"
            deleteAction={deleteSubject}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Subjects;
