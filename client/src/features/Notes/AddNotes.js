import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postNotes } from "./noteSlice";
import { useNavigate } from "react-router-dom";

function AddNotes() {
  const [data, setData] = useState({ title: "", des: "", color: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const AddNote = async (e) => {
    console.log("hi");
    e.preventDefault();
    dispatch(postNotes(data));

    try {
      const res = await fetch("https://notes-api-jdue.onrender.com/addNote", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const datas = await res.json();
      console.log(datas);
    } catch (err) {
      console.log(err);
    }

    console.log(data, "in addnote component");

    navigate("/DisplayData");
  };
  return (
    <div className="container  d-flex  ">
      <div className="card w-50 mx-auto my-auto">
        <form className="w-100" onSubmit={AddNote}>
          <div className="mb-3 row">
            <label
              for="staticTitle"
              className="col-sm-12 col-md-4 col-form-label"
            >
              Title
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                className="w-75"
                type="text"
                placeholder="enter the text"
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label
              for="inputDescription"
              className="col-sm-12 col-md-4 col-form-label"
            >
              Description
            </label>
            <div className="col-sm-10 col-md-6">
              <textarea
                className="form-control mt-1"
                id="description"
                rows="3"
                onChange={(e) => {
                  setData({ ...data, des: e.target.value });
                }}
              ></textarea>
            </div>
          </div>

          <div className="mb-3 row">
            <label
              for="inputColor"
              className="col-sm-12 col-md-4 col-form-label"
            >
              color for Note
            </label>
            <div className="col-sm-10 col-md-6">
              <select
                className="w-75"
                onChange={(e) => {
                  setData({ ...data, color: e.target.value });
                }}
              >
                <option value="">--Please choose an option--</option>
                <option value="pink">Pink</option>
                <option value="grey">Grey</option>
                <option value="violet">violet</option>
                <option value="#35724C">Amazon</option>
                <option value="#774E15"> Russet</option>
              </select>
            </div>
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <input type="submit" value="add Notes" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotes;
