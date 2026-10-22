import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainContent from "../../components/common/MainContent/MainContent";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  deleteAdmissionProcess,
  getAllAdmissionProcess,
} from "../../redux/slice/admissionProcess/admissionProcessSlice";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";
import { EmptyState } from "../../components/common/GridList/GridList";

const AdmissionProcess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { admissionProcess, isLoading, error } = useAppSelector(
    (state) => state.admissionProcessSlice
  );

  useEffect(() => {
    dispatch(getAllAdmissionProcess());
  }, [dispatch]);

  return (
    <MainContent
      status={isLoading}
      error={error}
      to="admissionProcess"
      count={admissionProcess.length}
      variant="table"
    >
      {admissionProcess.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={ui.tableWrap}>
          <table className={ui.table}>
            <thead>
              <tr>
                <th className={`${ui.th} w-16`}>#</th>
                <th className={ui.th}>Step</th>
                <th className={ui.th}>Description</th>
                <th className={`${ui.th} w-28 text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admissionProcess.map((item, index) => (
                <tr key={item._id} className="hover:bg-Orange_97 transition-colors">
                  <td className={`${ui.td} font-[700] text-primary`}>{String(index + 1).padStart(2, "0")}</td>
                  <td className={`${ui.td} font-[600] text-dimBlack min-w-[160px]`}>{item.step}</td>
                  <td className={`${ui.td} min-w-[260px]`}>{item.description}</td>
                  <td className={ui.td}>
                    <CardActions
                      className="justify-end"
                      onEdit={() => navigate(`/admissionProcess/update/${item._id}`)}
                      onDelete={() => dispatch(deleteAdmissionProcess(item._id)).unwrap()}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainContent>
  );
};

export default AdmissionProcess;
