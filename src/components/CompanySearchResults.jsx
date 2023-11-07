import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToFavs } from "../redux/actions";
import { fetchJobs } from "../redux/actions";


const CompanySearchResults = () => {
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams();
  const dispatch = useDispatch()
  const baseEndpoint =
    'https://strive-benchmark.herokuapp.com/api/jobs?company='
  const jobsFromReduxStore = useSelector(state => state.jobs.jobsList)
  console.log(jobsFromReduxStore)


  useEffect(() => {
    dispatch(fetchJobs(baseEndpoint, params.company));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [jobsFromReduxStore])


  return (
    <Container>
      <Row>
        <Col className="my-3">
          <div className="d-flex align-items-center">
            <h1 className="display-4">Job posting for: {params.company}</h1>
            <Link to={'/'}>
              <div className="btn btn-info rounded-pill ms-5 me-4">Home</div>
            </Link>
            <Link to={'/favs'}>
              <div className="btn btn-warning rounded-pill">Favourites</div>
            </Link>
          </div>
          <Row>
            {isLoading ? (
              <Col className="text-center">
                <Spinner animation="border" variant="primary" className="mt-4" />
              </Col>
            ) : (<Col>
              <Button variant="warning" className="m-2" onClick={() => {
                dispatch(addToFavs(params.company))
              }}>Add to favourites</Button>
              {jobsFromReduxStore.map(jobData => (
                <Job key={jobData._id} data={jobData} />
              ))}
            </Col>)}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
