import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import images from "~/assets/images";
import styles from "./Image.module.scss";

const Image = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFaffback] = useState("");
    const handleError = () => {
      setFaffback(customFallback);
    };

    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref} //Vì tách components thì ko tìm thấy DOM element của thẻ img nên phải truyền ref
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  classNames: PropTypes.string,
  fallback: PropTypes.string,
};

export default Image;
