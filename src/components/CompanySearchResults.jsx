import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavs } from "../redux/actions";
import { fetchJobs } from "../redux/actions";


const CompanySearchResults = () => {
  const params = useParams();
  const dispatch = useDispatch()
  const jobsFromReduxStore = useSelector(state => state.jobs.jobsList)
  console.log(jobsFromReduxStore)


  useEffect(() => {
    dispatch(fetchJobs(params.company));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


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
          {jobsFromReduxStore.map(jobData => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
