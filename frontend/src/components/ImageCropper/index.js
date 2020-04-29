import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import Button from "components/Button";
import styles from "./ImageCropper.module.scss";
import "react-image-crop/dist/ReactCrop.css";
export default class ImageCropper extends PureComponent {
  constructor() {
    super();
    this.state = {
      crop: {
        unit: "%",
        width: 30,
        aspect: 1,
      },
    };
  }
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop: percentCrop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      this.props.setCroppedSrc(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          reject();
        }
        blob.name = fileName;

        const file = new File([blob], Date.now().toString() + ".jpg", {
          type: "image/jpeg",
        });
        this.props.setImage(file);

        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }
  handleClick = () => {
    this.props.toggleCropper();
  };
  render() {
    const { crop, croppedImageUrl } = this.state;
    const src = this.props.src;
    return (
      <div className={styles.mainWrapper}>
        {src && (
          <>
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              className={styles.reactCrop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
          </>
        )}
        {croppedImageUrl && (
          <>
            <img
              alt="Crop"
              className={styles.croppedImage}
              src={croppedImageUrl}
            />
          </>
        )}
        <Button
          className={styles.doneBtn}
          onClick={this.handleClick}
          type="solid"
          text="Done"
        />
      </div>
    );
  }
}
