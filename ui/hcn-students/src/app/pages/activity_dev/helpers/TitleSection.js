import React, { useState } from "react";
import "./TitleSection.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { actions as actionsActivity } from "../../../modules/ActivitySelected/redux/activityRedux";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";

export function TitleSection(activityName) {
  const buttonText = "Enviar";
  const buttonTextBack = "Cerrar";
  const history = useHistory();
  const dispatch = useDispatch();
  const { difficulty, id, timer } = useSelector((state) => state.activity);
  const { userName, userEmail } = useSelector((actions) => actions.auth);
  const currentPath = useLocation().pathname;
  const [loading, setLoading] = useState(false);
  const [loadingClose, setLoadingClose] = useState(false);
  const [showModalEndActivity, setShowModalEndActivity] = useState(false);

  const handleConfirmation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(actionsActivity.endActivity({ activityId: id, data: { email: userEmail, recipientName: userName }, timer: timer })).then(
        (response) => {
          console.log(response);
          if (!response.success) {
            setLoading(false);
            setShowModalEndActivity(false);
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            setShowModalEndActivity(false);
            toast.success(response.mssg, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            dispatch(actionsActivity.setTimer(response.timer));
            console.log(response.timer, timer);
            history.push("/activity-completed");
          }
        }
      );
    } catch (err) {
      toast.error(err, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  const handleClose = (e) => {
    e.preventDefault();
    setShowModalEndActivity(false);
  };

  const openConfirmationModal = (e) => {
    e.preventDefault();
    setShowModalEndActivity(true);
  };

  const backActivity = async (e) => {
    setLoadingClose(true);
    e.preventDefault();
    if (difficulty === 1 || difficulty === 2 || (difficulty === 0 && currentPath === "/activity")) {
      try {
        await dispatch(actionsActivity.updateTimer({ activityId: id, timer: timer })).then((response) => {
          if (!response.success) {
            setLoadingClose(false);
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            dispatch(actionsActivity.cleanActivity());
            history.push("/activities");
          }
        });
      } catch (err) {
        toast.error(err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoadingClose(false);
      }
    } else {
      history.push("/activity");
    }
  };

  return (
    <div className="container-fluid" style={{ paddingBottom: "10px" }}>
      <div className="row align-items-center">
        <div className="col-sm" align="left">
          <p id="titleActivity" style={{ margin: "0px" }}>
            {activityName}
          </p>
        </div>
        <div className="col-sm" align="right">
          <Button
            variant="outline-primary"
            style={{ padding: "5px 30px", margin: "0px 10px" }}
            className="buttonSecondary"
            onClick={(e) => backActivity(e)}
            disabled={loadingClose}
          >
            {loadingClose && <CircularProgress size={20} style={{ marginRight: 20 }} />}
            {buttonTextBack}
          </Button>
          <Button
            variant="outline-primary"
            style={{ padding: "5px 30px", margin: "0px" }}
            className="button"
            onClick={(e) => openConfirmationModal(e)}
          >
            {buttonText}
          </Button>
        </div>
        {showModalEndActivity && (
          <Modal show={showModalEndActivity} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title> Confirmación de envío de actividad </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p4">
              <span>¿Está seguro/a de enviar la actividad?</span>
            </Modal.Body>
            <Modal.Footer>
              <Button className="buttonSecondary" disabled={loading} onClick={(e) => handleClose(e)}>
                Cancelar
              </Button>
              <Button className="button" disabled={loading} onClick={(e) => handleConfirmation(e)}>
                {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}
