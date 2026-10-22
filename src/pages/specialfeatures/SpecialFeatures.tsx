import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchSpecialFeatures, removeSpecialFeature } from "../../redux/specialFeatureAct/specialFeatureAct";
import { RootState, AppDispatch } from "../../redux/store";
import SimpleListPage, { mediaUrl } from "../../components/common/ui/SimpleListPage";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";

const SpecialFeatures: React.FC = () => {
  const { specialFeatures, loading, error } = useSelector((state: RootState) => state.specialFeatures);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSpecialFeatures());
  }, [dispatch]);

  return (
    <SimpleListPage
      title="Special Features"
      addPath="/add-edit-special-feature"
      loading={loading}
      error={error}
      count={specialFeatures.length}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {specialFeatures.map((feature: any) => {
          const icon = mediaUrl(feature.image) || mediaUrl(feature.icon);
          return (
            <div key={feature._id} className={`${ui.card} p-6 flex flex-col`}>
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 shrink-0 bg-Orange_90 border-2 border-Grey_15 rounded-lg flex items-center justify-center">
                  {icon ? (
                    <img src={icon} alt="" className="w-8 h-8 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-[20px] font-[800]">{feature.name?.[0]}</span>
                  )}
                </div>
                <CardActions
                  onEdit={() => navigate("/add-edit-special-feature", { state: feature })}
                  onDelete={() => dispatch(removeSpecialFeature(feature._id)).unwrap()}
                />
              </div>
              <h3 className={`${ui.cardTitle} mt-5`}>{feature.name}</h3>
              <p className={`${ui.cardText} mt-2`}>{feature.description}</p>
            </div>
          );
        })}
      </div>
    </SimpleListPage>
  );
};

export default SpecialFeatures;
