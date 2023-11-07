import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavs } from "../redux/actions";

const CompanySearchResults = () => {
  const [jobs, setJobs] = useState([]);
  const params = useParams();
  const dispatch = useDispatch()

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <div className="d-flex">
            <h1 className="display-4">Job posting for: {params.company}</h1>
            <Link to={'/'}>
              <div className="btn btn-info rounded-pill mx-3">Home</div>
            </Link>
            <Link to={'/favs'}>
              <div className="btn btn-warning rounded-pill">Favourites</div>
            </Link>
          </div>
          <Button variant="warning" onClick={() => {
            dispatch(addToFavs(params.company))
          }}>Add to favourites</Button>
          {jobs.map(jobData => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
