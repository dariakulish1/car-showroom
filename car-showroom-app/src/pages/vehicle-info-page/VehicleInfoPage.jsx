import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./VehicleInfoPage.scss";
import SimpleImageSlider from "react-simple-image-slider";
import { Circles } from "react-loader-spinner";
import Input from "../../components/Input/Input";

const VehicleInfoPage = () => {
  const { vehicleId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [nameText, setNameText] = useState('');
  const [rateChoice, setRateChoice] = useState(1);
  const [comments, setComments] = useState([]);
  const [rates, setRates] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [commentError, setCommentError] = useState(false);

  const handleCommentChange = (event) => {
    const value = event.target.value;
    setCommentText(value);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setNameText(value);
  };

  const handleRateChange = (event) => {
    setRateChoice(Number(event.target.value));
  };

  useEffect(() => {
    const allComments = JSON.parse(localStorage.getItem("userComments")) || [];
    setComments( allComments.filter((item) => item.vehicleId === vehicleId)
    );
  }, [vehicleId]);

  const handleSendComment = () => {
    const isNameEmpty = !nameText.trim();
    const isCommentEmpty = !commentText.trim();

    setNameError(isNameEmpty);
    setCommentError(isCommentEmpty);
    if (isNameEmpty || isCommentEmpty) {
      return;
    }

    const newComment = {
      vehicleId,
      comment: commentText,
      name: nameText,
      rate: rateChoice,
    };

    const allComments = JSON.parse(localStorage.getItem("userComments")) || [];

    const updatedComments = [...allComments, newComment];
    localStorage.setItem("userComments", JSON.stringify(updatedComments));
    setComments(
      updatedComments.filter(
        (item) => item.vehicleId === vehicleId
      )
    );
    setCommentText("");
    setRateChoice(1);
    setNameError(false);
    setCommentError(false);
  };

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${vehicleId}`)
    .then((res) => res.json())
    .then((res) => {
      setVehicleData(res);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log("error", err)
    });
  }, [vehicleId])

  const images = vehicleData?.images?.map((img) => ({ url: img })) || [];

  return(
    <div className="vehicle-info-page">
      <Link className="vehicle-info-page__back-btn" to="#" onClick={() => window.history.back()}>&#60; Back</Link>
      <div className="vehicle-info-page__title-section">
        <h1>{vehicleData?.title} Info Page</h1>
      </div>
      {isLoading ? (
        <div className="loading-circles">
          <Circles
          height="80"
          width="80"
          color="#608df7"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          />
        </div>) : (
        <><div className="vehicle-info-page__main-info-section">
        {images.length > 0 && ( <SimpleImageSlider
          className="vehicle-info-page__info-image"
          width={500}
          height={500}
          images={images}
          showBullets={true}
          showNavs={true}
          bgColor={'transparent'}
        />)}
        <div className="vehicle-info-page__info-text">
          <p className="vehicle-info-page__info-text-decoration"><b>Availability Status:</b> {vehicleData?.availabilityStatus}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Brand:</b> {vehicleData?.brand}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Price:</b> {vehicleData?.price}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Rating:</b> {vehicleData?.rating}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Return Policy:</b> {vehicleData?.returnPolicy}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Shipping Information:</b> {vehicleData?.shippingInformation}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Stock Keeping Unit:</b> {vehicleData?.sku}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Warranty Information:</b> {vehicleData?.warrantyInformation}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Weight:</b> {vehicleData?.weight}</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Discount Percentage:</b> {vehicleData?.discountPercentage}%</p>
          <p className="vehicle-info-page__info-text-decoration"><b>Description:</b> {vehicleData?.description}</p>
        </div>
      </div>
      <div className="vehicle-info-page__reviews-and-comment-section">
        <div className="vehicle-info-page__reviews-section">
          {
            vehicleData?.reviews?.map((user) => (
              <div key={user.reviewerEmail} className="vehicle-info-page__user-comment-section">
                <div className="vehicle-info-page__user-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                <div className="vehicle-info-page__comment-box">
                  <div className="vehicle-info-page__user-review">
                    <b>{user.reviewerName !== 0 ? user.reviewerName  : user.reviewerEmail}</b>
                    <div className="vehicle-info-page__user-rating" 
                      style={{
                        background:
                          user.rating > 4
                            ? "#4FB056"
                            : user.rating >= 3
                              ? "#D9C334"
                              : "#CF1600",
                      }}><p style={{padding: '0px', margin: '0px'}}>{user.rating}</p></div>
                  </div>
                  <p>{user.comment}</p>
                </div>
              </div>
            ))
          }
        </div>
        <div className="vehicle-info-page__comment-section">
          <h3 className="vehicle-info-page__title-comment-text">Add your comment</h3>
            <div className="vehicle-info-page__user-form-field">
              <Input handleNameChange={handleNameChange} value={nameText} type="text" inputPlaceholder="Name" inputLabel="Name" />
              {nameError && <p style={{color: "red"}}>The name field must not be empty</p>}
            </div>
            <p>Rate:</p>
            <div>
              <input type="radio" id="rateChoice1" name="rate" value={1} checked={rateChoice === 1} onChange={handleRateChange}/>
              <label for="rateChoice1">1</label>
              <input type="radio" id="rateChoice2" name="rate" value={2} checked={rateChoice === 2} onChange={handleRateChange}/>
              <label for="rateChoice2">2</label>
              <input type="radio" id="rateChoice3" name="rate" value={3} checked={rateChoice === 3} onChange={handleRateChange}/>
              <label for="rateChoice3">3</label>
              <input type="radio" id="rateChoice4" name="rate" value={4} checked={rateChoice === 4} onChange={handleRateChange}/>
              <label for="rateChoice4">4</label>
              <input type="radio" id="rateChoice5" name="rate" value={5} checked={rateChoice === 5} onChange={handleRateChange}/>
              <label for="rateChoice5">5</label>
            </div>
            <div className="vehicle-info-page__user-form-field">
              <textarea className="vehicle-info-page__comment-input" type='text' value={commentText} onChange={handleCommentChange} placeholder='Comment' />
              {commentError && <p style={{color: "red"}}>The comment field must not be empty</p>}
            </div>
          <button onClick={handleSendComment} className="vehicle-info-page__send-btn" type="button" name="sendButton">Send</button>
          {comments.length > 0 && (
            <>
              <h3 className="vehicle-info-page__title-comment-text">Your comments:</h3>
              <div className="vehicle-info-page__user-boxes-section">
                {comments.map((item, index) => (
                  <div key={index} className="vehicle-info-page__user-comment-box">
                    <div className="vehicle-info-page__name-rate-section">
                      <b>{item.name}</b>
                      <div className="vehicle-info-page__user-rating" 
                        style={{
                          background:
                            item.rate > 4
                              ? "#4FB056"
                              : item.rate >= 3
                                ? "#D9C334"
                                : "#CF1600",
                        }}><p style={{padding: '0px', margin: '0px'}}>{item.rate}</p></div>
                    </div>
                    <p>{item.comment}</p>
                  </div>
                ))}
              </div>
              
            </>
          )}
        </div>
      </div>
      </>)}
    </div>
  );
};

export default VehicleInfoPage;
