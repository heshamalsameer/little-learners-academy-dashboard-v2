import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchFeeStructures, removeFeeStructure } from "../../redux/slice/feeStructureSlice";
import SimpleListPage from "../../components/common/ui/SimpleListPage";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";

const FeeStructures: React.FC = () => {
  const { feeStructures, loading, error } = useSelector((state: RootState) => state.feeStructures);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFeeStructures());
  }, [dispatch]);

  return (
    <SimpleListPage
      title="Fee Structure"
      addPath="/add-fee-structure"
      loading={loading}
      error={error}
      count={feeStructures.length}
      variant="table"
    >
      <div className={ui.tableWrap}>
        <table className={ui.table}>
          <thead>
            <tr>
              <th className={ui.th}>Program</th>
              <th className={ui.th}>Age Group</th>
              <th className={ui.th}>Annual Tuition</th>
              <th className={ui.th}>Registration Fee</th>
              <th className={ui.th}>Activity Fee</th>
              <th className={`${ui.th} w-28 text-right`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeStructures.map((fee) => (
              <tr key={fee._id} className="hover:bg-Orange_97 transition-colors">
                <td className={`${ui.td} font-[600] text-dimBlack whitespace-nowrap`}>{fee.program}</td>
                <td className={`${ui.td} whitespace-nowrap`}>{fee.ageGroup}</td>
                <td className={`${ui.td} whitespace-nowrap`}>{fee.annualTuition}</td>
                <td className={`${ui.td} whitespace-nowrap`}>{fee.registrationFee}</td>
                <td className={`${ui.td} whitespace-nowrap`}>{fee.activityFee}</td>
                <td className={ui.td}>
                  <CardActions
                    className="justify-end"
                    onEdit={() => navigate(`/edit-fee-structure/${fee._id}`)}
                    onDelete={() => dispatch(removeFeeStructure(fee._id)).unwrap()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SimpleListPage>
  );
};

export default FeeStructures;
