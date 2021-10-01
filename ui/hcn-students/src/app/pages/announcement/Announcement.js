import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { actions } from "../../modules/Announcements/redux/announcementsRedux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Announcement.css";
import NoCards from "../../helpers/NoCards";
import CircularProgress from "@material-ui/core/CircularProgress";

export function Announcement() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { currentCourse } = useSelector((actions) => actions.course);
  const CardsAnnouncements = (card, index) => {
    return (
      <Card key={index} className="box">
        <Card.Body>
          <Card.Title tag="h5" style={{ paddingTop: "10px", paddingBottom: "5px" }}>
            {card.name}
          </Card.Title>
          <Card.Text style={{ paddingBottom: "8px" }}>{card.description}</Card.Text>
          <Card.Subtitle tag="h6" className="mb-2 text-muted">
            {card.publishDate}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    );
  };

  //This function is to ensure that the API request its only call once
  useEffect(() => {
    setLoading(true);
    dispatch(actions.getAnnouncements(currentCourse.id)).then((response) => {
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
  }, [currentCourse.id, dispatch]);

  const { listAnnouncements } = useSelector((state) => state.announcement);

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
        ) : listAnnouncements !== undefined && listAnnouncements.length > 0 ? (
          listAnnouncements.map(CardsAnnouncements)
        ) : (
          <NoCards type="anuncios" />
        )}
      </div>
    </div>
  );
}

export default Announcement;
