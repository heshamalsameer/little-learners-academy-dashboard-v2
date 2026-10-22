import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchHistories, removeHistory } from "../../redux/history/historyAct";
import { RootState, AppDispatch } from "../../redux/store";
import SimpleListPage from "../../components/common/ui/SimpleListPage";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";

const History: React.FC = () => {
  const { histories, loading, error } = useSelector((state: RootState) => state.histories);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchHistories());
  }, [dispatch]);

  const sorted = [...histories].sort((a, b) => Number(a.year) - Number(b.year));

  return (
    <SimpleListPage title="History" addPath="/add-edit-history" loading={loading} error={error} count={histories.length}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sorted.map((history) => (
          <div key={history._id} className={`${ui.card} p-6 flex flex-col`}>
            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center px-3 h-10 rounded-lg bg-Orange_90 border-2 border-Grey_15 text-[20px] font-[800]">
                {history.year}
              </span>
              <CardActions
                onEdit={() => navigate("/add-edit-history", { state: history })}
                onDelete={() => dispatch(removeHistory(history._id)).unwrap()}
              />
            </div>
            <h3 className={`${ui.cardTitle} mt-5`}>{history.title}</h3>
            <p className={`${ui.cardText} mt-2`}>{history.description}</p>
          </div>
        ))}
      </div>
    </SimpleListPage>
  );
};

export default History;
