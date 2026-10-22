import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchBenefits, removeBenefit } from "../../redux/benefit/benefit";
import { RootState, AppDispatch } from "../../redux/store";
import SimpleListPage, { mediaUrl } from "../../components/common/ui/SimpleListPage";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";

const Benefits: React.FC = () => {
  const { benefits, loading, error } = useSelector((state: RootState) => state.benefits);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  const list = Array.isArray(benefits) ? benefits : [];

  return (
    <SimpleListPage title="Benefits" addPath="/add-benefit" loading={loading} error={error} count={list.length}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((benefit) => {
          const icon = mediaUrl(benefit.icon);
          return (
            <div key={benefit._id} className={`${ui.card} p-6 flex flex-col`}>
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 shrink-0 bg-Orange_90 border-2 border-Grey_15 rounded-lg flex items-center justify-center">
                  {icon ? (
                    <img src={icon} alt="" className="w-8 h-8 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-[20px] font-[800]">{benefit.title?.[0]}</span>
                  )}
                </div>
                <CardActions
                  onEdit={() => navigate(`/edit-benefit/${benefit._id}`)}
                  onDelete={() => dispatch(removeBenefit(benefit._id)).unwrap()}
                />
              </div>
              <h3 className={`${ui.cardTitle} mt-5`}>{benefit.title}</h3>
              <p className={`${ui.cardText} mt-2`}>{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </SimpleListPage>
  );
};

export default Benefits;
