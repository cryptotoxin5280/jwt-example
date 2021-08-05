import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Modal, Table} from 'react-bootstrap';
import FileUploadButton from '../FileUploadButton';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faCloudDownloadAlt,
  faTrash
} from '@fortawesome/free-solid-svg-icons';

const apiUrl = `http://${window.location.hostname}:4000/api/v1`;
const headers = {
  'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
  'Content-Type': 'multipart/form-data'
};

const ConfigFilesModal = (props) => {
  const [files, setFiles] = useState([]);

  const handleDeleteFile = async (fileId) => {
    await axios.delete(`${apiUrl}/configFiles/${fileId}`, {
      headers: headers
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleDownloadFile = async (fileId) => {
    await axios.get(`${apiUrl}/configFiles/${fileId}`, {
      headers: headers
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleClose = () => {
    props.setIsVisible(false);
  };

  const handleUploadFile = async (file) => {
    let data = new FormData();
    data.append('file', file);
    await axios.post(`${apiUrl}/devices/${props.deviceId}/configFiles`,
      data,
      {
        headers: headers
      })
      .catch((error) => {
        console.error(error);
      }
    );
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!props.deviceId) {
        return;
      }
      await axios.get(`${apiUrl}/devices/${props.deviceId}/configFiles`, {
        headers: headers
      })
      .then((res) => {
        setFiles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    };
    fetchFiles();
  }, [props.deviceId]);

  return (
    <div>
      <Modal
        show={props.isVisible}
      >
        <Modal.Header>
          <Modal.Title>
            Config Files
          </Modal.Title>
          <div className='d-flex flex-row-reverse'>
            <span title='Close the dialog'>
              <button
                className='btn-close'
                onClick={handleClose}
              />
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex flex-row-reverse'>
            <span title='Upload a file'>
              <FileUploadButton
                handleFile={handleUploadFile}
                deviceId={props.deviceId}
              />
            </span>
          </div>
          <Table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? files.map((file) => (
                <tr key={file._id}>
                  <td>
                    {file.filename}
                  </td>
                  <td>
                    <span className='p-2' title='Download File'>
                      <FontAwesomeIcon
                        icon={faCloudDownloadAlt}
                        size='sm'
                        color='black'
                        onClick = {() => handleDownloadFile(file._id)}
                      />
                    </span>
                    <span className='p-2' title='Delete File'>
                      <FontAwesomeIcon
                        icon={faTrash}
                        size='sm'
                        color='red'
                        onClick = {() => handleDeleteFile(file._id)}
                      />
                    </span>
                  </td>
                </tr>)):
                <tr>
                  <td key='notfound' colSpan={5}>
                    No files found.
                  </td>
                </tr>
              }
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConfigFilesModal;
