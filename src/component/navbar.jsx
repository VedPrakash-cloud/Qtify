import { useState } from "react";
import Logo from "../assets/logo.svg";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    feedback: "",
  });
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.feedback
    ) {
      alert("Please fill all the boxes");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("feedback")) || [];

    const updated = [...existing, formData];

    localStorage.setItem("feedback", JSON.stringify(updated));

    setFormData({ name: "", email: "", subject: "", feedback: "" });
    setIsClicked(false);
    setOpen(true);
  };

  const feedbackClose = () => {
    setIsClicked(false);
  };

  return (
    <div>
      <div className=" bg-[#34C94B] p-4 flex justify-between">
        <button onClick={()=>{navigate('/')}}>
          <img src={Logo} alt="logo.svg" width={100} height={100} />
        </button>
        <div className="hidden md:flex border border-black rounded-md">
          <input
            type="text"
            placeholder="Search an album of your choice"
            className="w-96 p-2 rounded-l-md outline-none"
          />
          <button type="button">
            <CiSearch
              size={50}
              className="border-l border-black bg-white text-black h-full px-3 rounded-r-md"
            />
          </button>
        </div>
        <button
          type="button"
          onClick={() => setIsClicked(true)}
          className="hidden md:block bg-[#121212] px-4 py-2 rounded-xl text-[#34C94B] font-semibold text-xl"
        >
          Give Feedback
        </button>
        <button
          className="md:hidden block text-white text-4xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "X" : "☰"}
        </button>
      </div>

      {/*Mobile hamburger menu */}

      <div className="bg-[#34C94B]">
        {isOpen && (
          <div className="grid grid-flow-row justify-items-center gap-4 py-2 items-center">
            <div className="flex border border-black rounded-md">
              <input
                type="text"
                placeholder="Search an album of your choice"
                className="w-80 p-2 rounded-l-md outline-none"
              />
              <button type="button">
                <CiSearch
                  size={50}
                  className="border-l border-black bg-white text-black h-full px-3 rounded-r-md"
                />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsClicked(true)}
              className="bg-[#121212] px-4 py-2 rounded-xl text-[#34C94B] font-semibold text-xl"
            >
              Give Feedback
            </button>
          </div>
        )}
      </div>

      {/*modal and snackbar menu */}

      <Modal
        isOpen={isClicked}
        onRequestClose={() => setIsClicked(false)}
        ariaHideApp={true}
        className="bg-[#FFFFFF] rounded-2xl p-6 w-[400px] m-auto outline-none"
        overlayClassName="fixed bg-black/60 inset-0 flex justify-center items-center z-50"
      >
        <div>
          <div className="flex justify-between justify-items-end font-semibold">
            <p className="w-96 flex justify-center">Feedback</p>
            <button type="button" onClick={feedbackClose}>
              X
            </button>
          </div>
          <form action="submit" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Full name"
              className=" border border-green-400 rounded-md w-full p-1 my-2 shadow-md outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              className=" border border-green-400 rounded-md w-full p-1 my-2 shadow-md outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              className=" border border-green-400 rounded-md w-full p-1 my-2 shadow-md outline-none"
              onChange={handleChange}
              required
            />
            <textarea
              rows={5}
              name="feedback"
              value={formData.feedback}
              className=" border border-green-400 rounded-md w-full p-1 my-2 shadow-md outline-none"
              onChange={handleChange}
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                onClick={handleFormSubmit}
                className="bg-[#34C94B] text-[#FFFFFF] font-semibold p-2 shadow-lg rounded-lg"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="Feedback saved sucessfully!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Feedback saved successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}
