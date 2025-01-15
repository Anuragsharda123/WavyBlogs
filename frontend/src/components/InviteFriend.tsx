import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";

const InviteFriend: React.FC = () => {
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    friends: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          message: Yup.string().required("Message is required"),
        })
      )
      .required("At least one friend is required"),
  });

  const initialValues = {
    friends: [{ name: "", email: "", message: "" }],
  };

  const handleSubmit = (values: any) => {
    console.log("Submitted Data:", values);
  };

  return (
    <div className="h-100" >
      <p className="h5 d-flex">
        <svg
          width="24"
          height="25"
          viewBox="0 0 26 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="me-4 pt-1"
          onClick={() => {
            navigate("/app/dashboard");
          }}
        >
          <path
            d="M25.3467 10.4067C25.3467 10.9899 24.9133 11.472 24.3509 11.5483L24.1946 11.5588L1.15258 11.5588C0.516294 11.5588 0.000482559 11.043 0.000482559 10.4067C0.000482559 9.82341 0.433908 9.34138 0.99625 9.26509L1.15258 9.25458L24.1946 9.25458C24.8309 9.25458 25.3467 9.77039 25.3467 10.4067Z"
            fill="#292929"
            fillOpacity="0.8"
          />
          <path
            d="M11.2588 18.8446C11.7097 19.2935 11.7112 20.023 11.2623 20.4739C10.8541 20.8838 10.2142 20.9223 9.76242 20.5886L9.63296 20.4774L0.339355 11.2237C-0.0717716 10.8144 -0.109172 10.1721 0.227171 9.72034L0.339287 9.59096L9.63289 0.335757C10.0837 -0.113233 10.8132 -0.111723 11.2622 0.339131C11.6704 0.748998 11.7062 1.38912 11.3706 1.83946L11.2588 1.96844L2.78547 10.4078L11.2588 18.8446Z"
            fill="#292929"
            fillOpacity="0.8"
          />
        </svg>
        Friends
      </p>
      <span className="ms-5 fw-bold text-secondary">
        Invite some friends Jasmine, show them your Waves and let's see what they can do!
      </span>

      <div className="container my-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="p-4 shadow-sm rounded bg-white">
              <FieldArray name="friends">
                {({ remove, push }) => (
                  <div>
                    {values.friends.map((_, index) => (
                      <div key={index} className="mb-4">
                        <h5>
                          Friend #{index + 1}{" "}
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-link text-danger ms-2 p-0"
                              onClick={() => remove(index)}
                            >
                              Remove
                            </button>
                          )}
                        </h5>
                        <div className="row g-3">
                          <div className="col-md-4">
                            <label htmlFor={`friends.${index}.name`} className="form-label">
                              Full Name
                            </label>
                            <Field
                              name={`friends.${index}.name`}
                              type="text"
                              className="form-control"
                              placeholder="Name"
                            />
                            <ErrorMessage
                              name={`friends.${index}.name`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor={`friends.${index}.email`} className="form-label">
                              Email
                            </label>
                            <Field
                              name={`friends.${index}.email`}
                              type="email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <ErrorMessage
                              name={`friends.${index}.email`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                          <div className="col-md-4">
                            <label htmlFor={`friends.${index}.message`} className="form-label">
                              Message
                            </label>
                            <Field
                              name={`friends.${index}.message`}
                              as="textarea"
                              className="form-control"
                              placeholder="Message"
                              rows={1}
                            />
                            <ErrorMessage
                              name={`friends.${index}.message`}
                              component="div"
                              className="text-danger mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between align-items-center">
                      <button
                        type="button"
                        className="btn btn-link text-decoration-none"
                        onClick={() =>
                          push({ name: "", email: "", message: "" })
                        }
                      >
                        + Add More
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InviteFriend;