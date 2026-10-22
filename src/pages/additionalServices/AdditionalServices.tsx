import { useEffect, useState } from "react";
import { RiAddLine } from "react-icons/ri";
import AddServicesModal from "../../components/additionalServicesModal/AddServicesModal";
import { RowofServices } from "../../components/additionalServicesModal/RowofServices";
import PageHeader from "../../components/common/ui/PageHeader";
import { ui } from "../../components/common/ui/ui";
import { TableSkeleton } from "../../components/common/ui/Skeleton";
import { EmptyState } from "../../components/common/GridList/GridList";
import Loading from "../../components/common/Loading/Loading";
import { API_BASE } from "../../services/api";

type service = {
  _id?: string;
  service: string;
  price: string;
};

export const AdditionalServices = () => {
  const [services, setservices] = useState<service[]>([]);
  const [status, setStatus] = useState<"Pending" | "Success" | "Fail">("Pending");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/additional-services`)
      .then((response) => {
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        return response.json();
      })
      .then((data) => {
        setservices(data.data ?? []);
        setStatus("Success");
      })
      .catch(() => setStatus("Fail"));
  }, []);

  return (
    <div className="page">
      <PageHeader
        title="Additional Services"
        subtitle={status === "Pending" ? undefined : `${services.length} service${services.length === 1 ? "" : "s"}`}
        action={
          <button className={`${ui.btn} ${ui.primary}`} onClick={() => setOpen(true)}>
            <RiAddLine size={18} /> Add Service
          </button>
        }
      />
      <AddServicesModal isOpen={open} setIsopen={setOpen} services={services} setservices={setservices} />
      {status === "Pending" ? (
        <TableSkeleton rows={4} cols={3} />
      ) : (
        <Loading status={status} error="Couldn't load services" hasData={services.length > 0}>
          {services.length === 0 ? (
            <EmptyState />
          ) : (
            <div className={ui.tableWrap}>
              <table className={ui.table}>
                <thead>
                  <tr>
                    <th className={ui.th}>Service</th>
                    <th className={ui.th}>Price</th>
                    <th className={`${ui.th} w-28 text-right`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((item, index) => (
                    <RowofServices
                      key={item._id ?? index}
                      index={index}
                      ele={item}
                      services={services}
                      setservices={setservices}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Loading>
      )}
    </div>
  );
};
