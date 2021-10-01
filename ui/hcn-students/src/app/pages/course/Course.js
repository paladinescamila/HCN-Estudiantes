import React, { useEffect, useState, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import SchoolIcon from "@material-ui/icons/School";
import "./Course.css";
import { actions } from "../../modules/Courses/redux/coursesRedux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoCards from "../../helpers/NoCards";
import { useHistory, withRouter } from "react-router-dom";

function useIsMountedRef() {
  const isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  });
  return isMountedRef;
}

function Course() {
  const history = useHistory();
  const isMountedRef = useIsMountedRef();
  const { userId } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { listCourses } = useSelector((state) => state.course);

  const openCourse = (e, card) => {
    e.preventDefault();
    dispatch(actions.setCurrentCourse({ id: card.id, name: card.name }));
    history.push("/announcements");
  };

  //This function is to ensure that the API request its only call once
  useEffect(() => {
    setLoading(true);
    if (isMountedRef.current) {
      async function fetchApi() {
        await dispatch(actions.getCourses(userId)).then((response) => {
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
  }, [dispatch, isMountedRef, userId]);

  const CardsCourses = (card, index) => {
    return (
      <Button key={index} className="section-cards" onClick={(e) => openCourse(e, card)}>
        <div className="row">
          <SchoolIcon className="col-md-3 mt-3" style={{ fontSize: "600%", verticalAlign: "middle", textAlign: "center" }} />
          <div className="card-body-c col-md-9">
            <h5 className="card-title-c col-sm-12 m-0 mb-3 p-0"> {card.name}</h5>
            <div className="row">
              <span className="col-12 m-0 mb-3 teacher-sec">
                <i>Nombre del docente:</i> {card.teacherName}
              </span>
              <span className="col-2 m-0 mb-0 schedule-sec"> Horarios: </span>
              <div className="col-9 pl-4 ml-2 schedule-sec">
                {Object.values(card.schedules).map((schedule, _index) => {
                  return <div key={_index}>{schedule} </div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </Button>
    );
  };

  return (
    <div className="widget-dev">
      <div className="card-group-course">
        {loading ? (
          <Card className="baseCard">
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
        ) : listCourses !== undefined && listCourses.length > 0 ? (
          listCourses.map(CardsCourses)
        ) : (
          <NoCards type="cursos" />
        )}
      </div>
    </div>
  );
}

export default withRouter(Course);
