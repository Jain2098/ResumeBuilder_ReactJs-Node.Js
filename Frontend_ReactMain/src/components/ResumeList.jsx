import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "./Api";
import yellowBg from "../img/yellow-bg.jpg";
import ConfirmDialog from "./ConfirmDialog";

export default function ResumeList() {
  const [data, setData] = useState([]);
  const[isDeleted, setIsDeleted] = useState(false);
  useEffect(() => {
    try {
      // const url = `${Api.defaults.baseURL}/get_all`;
      Api.get("/get_all")
        .then((res) => {
          setData(res.data);
          // console.log(res.data[0].jsonData.uniqueid);
          // console.log(res.data[0].jsonData);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }

  }, [isDeleted]);

  return (
    <Fragment>
        <div className="container pt-2 bg-black pb-3 mt-2 rounded">
          <h1 className="text-center py-3 h1_modify">Resume List</h1>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {data.map((item) => {
                const correct_item = item;
                // console.log(correct_item.uniqueid)
                // console.log(correct_item)
                return (
                    <div key={correct_item.uniqueid}>
                        <SingleList data={correct_item} setIsDeleted={setIsDeleted}/>
                    </div>
                )
            })}
          </div>
        </div>
    </Fragment>
  );
}


function SingleList({ data, setIsDeleted }) {
  const [randomImage, setRandomImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isFormDeleted, setIsFormDeleted] = useState(false);
  
  useEffect(() => {
    if (isFormDeleted) {
      Api.delete(`/delete?uniqueid=${data.uniqueid}`)
        .then((res) => {
          setIsDeleted(true);
          alert("Resume Deleted Successfully");
          setIsFormDeleted(false); // Reset the deletion state
          setShowConfirmDialog(false); // Close the confirmation dialog
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFormDeleted, data.uniqueid, setIsDeleted]);

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("https://source.unsplash.com/1280x720");
        const imageUrl = response.url;
        setRandomImage(imageUrl);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setRandomImage(yellowBg);
      }
    };

    if (!data.img) {
      fetchRandomImage();
    }
  }, [data.img]);

  const handleOpenDialog = () => {
    setShowConfirmDialog(true);
  };

  const handleCloseDialog = () => {
    setShowConfirmDialog(false);
  };


  return (
    <>
      <div className="col resumelist">
        <div className="card" >
        <Link to={`/preview/${data.uniqueid}`}>

        {data.img ? (
              <img src={data.img} className="card-img-top" alt="userImage" />
            ) : loading ? (
              <div className="d-flex justify-content-center align-content-center " style={{width:"100%", height:"100%"}}>Loading...</div>
            ) : (
              <img src={randomImage} className="card-img-top" alt="randomImage" />
            )}

        </Link>
          {/* <img src="..." className="card-img-top" alt="..."> */}
          <div className="card-body">
            <Link to={`/preview/${data.uniqueid}`}> <h5 className="card-title text-center fs-md-4">{`${data.personalInfo.firstname} ${data.personalInfo.lastname}`}</h5> </Link>
            <p className="card-text">
              {/* show objective 15 words */}
              {data.objective ? (data.objective.split(" ").slice(0, 12).join(" ")+ "...") : "No Objective"}
            </p>

            <div className="d-flex justify-content-evenly gap-2">
              <Link to={`/preview/${data.uniqueid}`} className="btn btn-primary">Preview</Link>
              <button className="btn btn-danger" onClick={handleOpenDialog}>Delete</button>
              <Link to={`/edit/${data.uniqueid}`} className="btn btn-warning">Edit</Link>
              </div>
          </div>
        </div>
      </div>
      {showConfirmDialog && 
      <ConfirmDialog 
        setIsFormDeleted={setIsFormDeleted} 
        handleClose={handleCloseDialog}
        />}
    </>
  );
}
