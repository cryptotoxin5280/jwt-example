import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudUploadAlt} from '@fortawesome/free-solid-svg-icons';

const FileUploadButton = (props) => {
  const hiddenFileInput = React.useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    props.handleFile(file);
  };

  return(
    <>
      <FontAwesomeIcon
        icon={faCloudUploadAlt}
        size='lg'
        color="green"
        onClick = {handleClick}
      />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  );

};

export default FileUploadButton;
