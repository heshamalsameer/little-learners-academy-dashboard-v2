import React, { useEffect } from "react";

import CardMissionVision from "../../components/CardMissionVision/CardMissionVision";

import { getAllMissionVision } from "../../redux/slice/mission-vision/missionVisionSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import MainContent from "../../components/common/MainContent/MainContent";
import GridList from "../../components/common/GridList/GridList";

const MissionVision: React.FC = () => {
  const dispatch = useAppDispatch()

  const { records, isLoading, error } = useAppSelector(
    (state) => state.missionVision
  );

  useEffect(() => {
    dispatch(getAllMissionVision());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="mission-vision" count={records.length}>
      <GridList
        records={records}
        renderItems={(record) => (
          <CardMissionVision
            id={record._id!}
            title={record.title}
            description={record.description}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default MissionVision;
