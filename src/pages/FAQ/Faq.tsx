import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiAddLine } from "react-icons/ri";
import { fetchFAQs, removeFAQ } from "../../redux/faq/faqAct";
import { RootState, AppDispatch } from "../../redux/store";
import Loading from "../../components/common/Loading/Loading";
import PageHeader from "../../components/common/ui/PageHeader";
import CardActions from "../../components/common/ui/CardActions";
import { ui } from "../../components/common/ui/ui";
import { EmptyState } from "../../components/common/GridList/GridList";

const FAQPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { faqs, loading, error } = useSelector((state: RootState) => state.faqs);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  return (
    <div className="page">
      <PageHeader
        title="FAQ"
        subtitle={loading && !faqs.length ? undefined : `${faqs.length} question${faqs.length === 1 ? "" : "s"}`}
        action={
          <button className={`${ui.btn} ${ui.primary}`} onClick={() => navigate("/add-faq")}>
            <RiAddLine size={18} /> Add New
          </button>
        }
      />
      <Loading
        status={loading ? "Pending" : error ? "Fail" : "Success"}
        error={error}
        variant="table"
        hasData={faqs.length > 0}
      >
        {faqs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th className={ui.th}>Question</th>
                  <th className={ui.th}>Answer</th>
                  <th className={`${ui.th} w-28 text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr key={faq._id} className="hover:bg-Orange_97 transition-colors">
                    <td className={`${ui.td} font-[600] text-dimBlack min-w-[220px]`}>{faq.question}</td>
                    <td className={`${ui.td} min-w-[280px]`}>{faq.answer}</td>
                    <td className={ui.td}>
                      <CardActions
                        className="justify-end"
                        onEdit={() => navigate(`/faq/${faq._id}`)}
                        onDelete={() => dispatch(removeFAQ(faq._id)).unwrap()}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
    </div>
  );
};

export default FAQPage;
