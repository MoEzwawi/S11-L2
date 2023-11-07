import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Spinner, Alert } from "react-bootstrap";
import Job from "./Job";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/actions";



const MainSearch = () => {
  const [query, setQuery] = useState("");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";
  const jobsFromReduxStore = useSelector(state => state.jobs.jobsList)
  console.log('jobsFromReduxStore', jobsFromReduxStore)
  console.log('query', query)
  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(fetchJobs(baseEndpoint, query + "&limit=20"))
    setIsBeginning(false)
    setIsLoading(true)
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [jobsFromReduxStore])

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1 className="display-1">Remote Jobs Search</h1>
        </Col>
        <Col xs={1} className="mt-4">
          <Link to={'/favs'}>
            <div className="btn btn-warning rounded-pill">Favourites</div>
          </Link>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control type="search" value={query} onChange={handleChange} placeholder="type and press Enter" />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5 text-center">
          {isLoading && <Spinner animation="border" variant="primary" className="mt-4" />}
          {(!isBeginning && !isLoading && (jobsFromReduxStore.length > 0)) && jobsFromReduxStore.map(jobData => (
            <Job key={jobData._id} data={jobData} />
          ))}
          {(!isBeginning && !isLoading && (jobsFromReduxStore.length === 0)) && <Alert variant="danger">No jobs found for your query {`"${query}"`}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default MainSearch;
