import React, { useEffect } from "react";


import { getAllMembers } from "../../redux/slice/members/memberSlice";





import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import MainContent from "../../components/common/MainContent/MainContent";
import GridList from "../../components/common/GridList/GridList";
import MemberCard from "../../components/MemberCard/MemberCard";

const Members: React.FC = () => {
  const dispatch = useAppDispatch();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.memberSlice
  );


  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="team-members" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <MemberCard
            id={record._id!}
            name={record.name}
            qualification={record.qualification!}
            description={record.description}
            photo={record.photo?.url!}
            email={record.email}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Members;
