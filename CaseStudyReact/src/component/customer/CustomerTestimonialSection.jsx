import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // For animation classes

function TestmonialSection() {
  const testimonials = [
    {
      img: "src/assets/testimonial-1.jpg",
      text: "Hexacover made the entire insurance process so simple! Their fast claim approval saved me a lot of stress after my accident. Highly recommended!",
      name: "Rahul Mehta",
      role: "Software Engineer",
    },
    {
      img: "src/assets/testimonial-2.jpg",
      text: "Finding affordable car insurance was tough until I came across Hexacover. Their policies are flexible, and I saved a lot compared to other providers.",
      name: "Sneha Iyer",
      role: "Marketing Manager",
    },
    {
      img: "src/assets//testimonial-3.jpg",
      text: "Exceptional service! The customer support team guided me through the claim process smoothly. I’ve never had an insurance experience this hassle-free.",
      name: "Arun Kumar",
      role: "Business Owner",
    },
  ];

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="text-center mx-auto" style={{ maxWidth: "500px" }}>
          <h1 className="display-6 mb-5">What They Say About Our Insurance</h1>
        </div>
        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="testimonial-item text-center bg-white p-4 rounded shadow-sm">
                <img
                  className="img-fluid rounded-circle mx-auto mb-4"
                  src={testimonial.img}
                  alt={`Testimonial ${index + 1}`}
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <p className="fs-5">{testimonial.text}</p>
                <h5 className="mt-3">{testimonial.name}</h5>
                <span className="text-muted">{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestmonialSection;