import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import Carousel from "./components/Carousel";
import Loading from "./components/LoadingIndicator";
import { API } from "./constants/api";

function App() {
  const [isCats, setIsCats] = useState(true);
  const [isSharks, setIsSharks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    let type = "";
    if (isCats && isSharks) {
      type = "both";
    } else if (isCats) {
      type = "cats";
    } else if (isSharks) {
      type = "sharks";
    }

    if (type) {
      setIsLoading(true);
      // intentionally add delay for showing loading indicator
      setTimeout(() => {
        fetch(API.GET_PHOTO_LIST_BY_TYPE(type))
          .then((res) => res.json())
          .then((data) => {
            // preload images
            data.photoList.forEach((url) => {
              const img = new Image();
              img.src = url;
            });
            setPhotoList(data.photoList);
          })
          .catch((_e) => {
            // set photo list to empty list for error hanlding
            setPhotoList([]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 1000);
    } else {
      setPhotoList([]);
    }
  }, [isCats, isSharks]);

  return (
    <div>
      <div className="type-container">
        <Button
          variant={isSharks ? "contained" : "outlined"}
          onClick={(_e) => {
            setIsSharks((curIsSharks) => !curIsSharks);
          }}
        >
          Sharks
        </Button>
        <Button
          variant={isCats ? "contained" : "outlined"}
          onClick={(_e) => {
            setIsCats((curIsCats) => !curIsCats);
          }}
        >
          Cats
        </Button>
      </div>
      <Carousel photoList={photoList} allowAutoSlide={true} height={600} />
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
