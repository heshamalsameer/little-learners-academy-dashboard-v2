import React, { useEffect } from "react";

import TestimonialsCard from "../../components/TestimonialsCard/TestimonialsCard";


import { getAllTestimonials } from "../../redux/slice/testimonials/testimonialSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

const Testimonials: React.FC = () => {
  const dispatch = useAppDispatch();

  const { testimonials, isLoading, error } = useAppSelector(
    (state) => state.testimonialSlice
  );


  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="testimonials" count={testimonials.length}>
      <GridList
        records={testimonials}
        renderItems={(record) => (
          <TestimonialsCard
            id={record._id}
            name={record.name}
            evaluation={record.evaluation!}
            image={record.image?.url}
            description={record.description}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Testimonials;
