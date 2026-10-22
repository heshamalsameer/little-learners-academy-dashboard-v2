import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { fetchMessages, deleteMessage } from "../../redux/slice/messageSlice";
import { AppDispatch, RootState } from "../../redux/store";
import Loading from "../../components/common/Loading/Loading";
import PageHeader from "../../components/common/ui/PageHeader";
import Modal from "../../components/Modal/Modal";
import { ui } from "../../components/common/ui/ui";
import { EmptyState } from "../../components/common/GridList/GridList";

const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loadingStatus, error } = useSelector((state: RootState) => state.messages);
  const [pending, setPending] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const confirmDelete = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      await dispatch(deleteMessage(pending)).unwrap();
      toast.success("Message deleted");
      setPending(null);
    } catch {
      toast.error("Couldn't delete the message, please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title="Messages"
        subtitle={loadingStatus === "Pending" && !messages.length ? undefined : `${messages.length} message${messages.length === 1 ? "" : "s"} from the contact form`}
      />
      <Loading status={loadingStatus} error={error} variant="table" hasData={messages.length > 0}>
        {messages.length === 0 ? (
          <EmptyState message="No messages yet." />
        ) : (
          <div className={ui.tableWrap}>
            <table className={ui.table}>
              <thead>
                <tr>
                  <th className={ui.th}>Parent</th>
                  <th className={ui.th}>Contact</th>
                  <th className={ui.th}>Student</th>
                  <th className={ui.th}>Message</th>
                  <th className={`${ui.th} w-20 text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg: any) => (
                  <tr key={msg._id} className="hover:bg-Orange_97 transition-colors">
                    <td className={`${ui.td} font-[600] text-dimBlack whitespace-nowrap`}>{msg.ParentName}</td>
                    <td className={`${ui.td} whitespace-nowrap`}>
                      <a href={`mailto:${msg.EmailAddress}`} className="block text-dimBlack hover:text-primary">
                        {msg.EmailAddress}
                      </a>
                      <span className="text-[13px] text-Grey_40">{msg.PhoneNumber}</span>
                    </td>
                    <td className={`${ui.td} whitespace-nowrap`}>
                      {msg.StudentName}
                      {msg.StudentAge && <span className="text-Grey_40"> · {msg.StudentAge} yrs</span>}
                      {msg.ProgramOfIntrest && (
                        <span className="block text-[13px] text-Grey_40">{msg.ProgramOfIntrest}</span>
                      )}
                    </td>
                    <td className={`${ui.td} min-w-[260px]`}>{msg.Message}</td>
                    <td className={`${ui.td} text-right`}>
                      <button
                        aria-label="Delete"
                        onClick={() => setPending(msg._id)}
                        className={`${ui.iconBtn} bg-white border-red-500 text-red-500 hover:bg-red-500 hover:text-white`}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Loading>
      <Modal open={!!pending} busy={busy} onClose={() => !busy && setPending(null)} handleClickDelete={confirmDelete} />
    </div>
  );
};

export default Contact;
