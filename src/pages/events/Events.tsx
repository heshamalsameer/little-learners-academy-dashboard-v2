import React, { useEffect } from "react";


import { getAllEvents,deleteEvent } from "../../redux/slice/events/eventSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import SubjectCard from "../../components/SubjectCard/SubjectCard";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.eventSlice
  );


  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="events" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <SubjectCard
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            to="events"
            deleteAction={deleteEvent}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Events;
