import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateNotes } from "./noteSlice";

function Edit() {
  const { id } = useParams();
  const notes = useSelector((state) => state.data);
  const selectedNote = notes.find((val) => val._id === id);
  const [data, setData] = useState(selectedNote);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const EditNote = async (e) => {
    console.log("hi",data);
    // e.preventDefalut()
    e.preventDefault();
    dispatch(updateNotes(data));

    try {
      const res = await fetch(`https://notes-api-jdue.onrender.com/editNotes/${data._id}`, {
        method: "PUT",
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
    <div className="container  d-flex jusitfy-content-center align-items-center">
      <div className="card w-50">
        <form className="w-50" onSubmit={EditNote}>
          <div className="mb-3 row">
            <label for="staticTitle" className="col-sm-2 col-form-label">
              Title
            </label>
            <div className="col-sm-10 col-md-6">
              <input
                className="w-75"
                type="text"
                placeholder="enter the text"
                value={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <label for="inputDescription" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10 col-md-6">
              <textarea
                className="form-control mt-1"
                id="description"
                rows="3"
                value={data.des}
                onChange={(e) => {
                  setData({ ...data, des: e.target.value });
                }}
              ></textarea>
            </div>
          </div>

          <div className="mb-3 row">
            <label for="inputColor" className="col-sm-2 col-form-label">
              color for Note
            </label>
            <div className="col-sm-10 col-md-6">
              <select
                className="w-75"
                value={data.color}
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
            <input type="submit" value="update Notes" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
