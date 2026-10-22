import React, { useEffect } from "react";


import { getAllActivities } from "../../redux/slice/activities/activitySlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {deleteActivity} from "../../redux/slice/activities/activitySlice"

import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ActivityCard from "../../components/ActivityCard/ActivityCard";

const Activities: React.FC = () => {
  const dispatch = useAppDispatch();

  const { records, isLoading, error } = useAppSelector(
    (state) => state.activitySlice
  );


  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="activities" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <ActivityCard
            to="activities"
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            handleDelete={deleteActivity}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Activities;
