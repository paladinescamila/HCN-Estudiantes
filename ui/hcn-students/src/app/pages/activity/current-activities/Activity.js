import React, { useEffect, useState, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as actionsActivitySelected } from "../../../modules/ActivitySelected/redux/activityRedux";
import "../Activity.css";
import { actions } from "../../../modules/Activities/redux/activitiesRedux";
import NoCards from "../../../helpers/NoCards";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ModalInfo } from "../../activity_dev/helpers/GeneralInfo";
import { warningBeginActivity } from "../../../helpers/ModalTexts";

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

function Activity() {
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { listActivities } = useSelector((state) => state.activities);
  const { userId } = useSelector((state) => state.auth);
  const { currentCourse } = useSelector((state) => state.course);
  const [showModalInfoW, setShowModalInfoW] = useState(false);

  const startActivity = () => {
    history.push("/activity");
  };

  //This function is to ensure that the API request its only call once
  useEffect(() => {
    setLoading(true);
    if (isMountedRef.current) {
      async function fetchApi() {
        await dispatch(actions.getActivities({ studentId: userId, courseId: currentCourse.id })).then((response) => {
          if (!response.sucess) {
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
          setLoading(false);
        });
      }
      fetchApi();
    }
  }, [currentCourse.id, dispatch, isMountedRef, userId]);

  //Function of the button to change to the development of an activity.
  const BeginActivity = async (e, card) => {
    e.preventDefault();
    let mounted = true;
    if (card.status !== "En progreso" && card.status !== "Nueva") {
      toast.error("Esta actividad ya fue enviada", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        await dispatch(actionsActivitySelected.getActivityForm(card.id)).then((response) => {
          if (mounted) {
            if (response.success) {
              setShowModalInfoW(false);
              dispatch(actionsActivitySelected.setId(card.id));
              dispatch(actionsActivitySelected.setSections(card.sections));
              dispatch(actionsActivitySelected.setName(card.name));
              dispatch(actionsActivitySelected.setCC(card.clinicCase));
              if (card.difficultyLevel === "1") {
                dispatch(actionsActivitySelected.setDifficulty(0));
              } else if (card.difficultyLevel === "2") {
                dispatch(actionsActivitySelected.setDifficulty(1));
              } else if (card.difficultyLevel === "3") {
                dispatch(actionsActivitySelected.setDifficulty(2));
              }
              card.status === "En progreso" ? startActivity() : setShowModalInfoW(true);
            }
            toast.error(response.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      } catch (err) {
        toast.error("Error:" + err, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  let statusConf;

  //Paint in different colors the progressions tags and the button text.
  const colorTag = (status) => {
    return status === "Nueva"
      ? { buttonText: "Comenzar", color: "rgb(170, 161, 161)" }
      : status === "En progreso"
      ? { buttonText: "Continuar", color: "rgb(175, 95, 0)" }
      : { buttonText: "Continuar", color: "rgb(36, 164, 109)" };
  };

  const difficultyLevel = (lvl) => {
    return lvl === "1" ? "Nivel básico" : lvl === "2" ? "Nivel intermedio" : lvl === "3" ? "Nivel experto" : "";
  };

  //Function that goes through the arrangement of the activities and displays them with their styles in the UI.
  const CardsActivities = (card, index) => {
    statusConf = colorTag(card.status);
    return (
      <Card key={index} className="activity">
        <Card.Body>
          <div className="headerInfo">
            <Card.Title tag="h5">
              <span>{card.name} </span>
              <span
                style={{
                  border: "1px solid " + statusConf.color + "",
                  color: statusConf.color,
                }}
                className="status"
              >
                {card.status}
              </span>
            </Card.Title>
            <Card.Text className="difficulty">Dificultad: {difficultyLevel(card.difficultyLevel)}</Card.Text>
          </div>
          <Card.Text> {card.description} </Card.Text>
          <div className="dateInfo">
            <p>
              <b>Fecha de publicación: </b>
              {card.publishDate}
            </p>
            <p>
              <b>Fecha de entrega: </b>
              {card.deadline}
            </p>
          </div>
        </Card.Body>

        <Button
          variant="outline-primary"
          className={card.status === "Nueva" || card.status === "En progreso" ? "button" : "btnDisabled"}
          disabled={loading}
          onClick={(e) => BeginActivity(e, card)}
        >
          {statusConf.buttonText}
        </Button>
      </Card>
    );
  };

  return (
    <div className="backgroundStyle">
      <div className="grid3">
        {loading ? (
          <Card style={{ margin: "20px" }} className="baseCard">
            <Card.Body>
              <CircularProgress
                size={20}
                className="progressLoading"
                style={{
                  color: "rgb(36, 164, 109)",
                  margin: "0px",
                  paddingLeft: "0",
                  paddingRight: "0",
                  marginRight: "5px",
                }}
              />
              Cargando...
            </Card.Body>
          </Card>
        ) : listActivities !== undefined && listActivities.length > 0 ? (
          listActivities.map(CardsActivities)
        ) : (
          <NoCards type="actividades" />
        )}
      </div>
      {showModalInfoW && <ModalInfo show={showModalInfoW} handleClose={() => startActivity()} textInfo={warningBeginActivity} />}
    </div>
  );
}

export default withRouter(Activity);
