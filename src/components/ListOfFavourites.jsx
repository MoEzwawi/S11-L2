import { Container, Col, Row, Alert, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { removeFromFavs } from "../redux/actions"



const ListOfFavourites = () => {
    const favs = useSelector(state => state.favourites.content)
    console.log(favs)
    const dispatch = useDispatch()
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <h1 className="my-3">List of favourites</h1>
                </Col>
                <Col xs={4}>
                    <Link to={'/'}>
                        <div className="btn btn-info rounded-pill mt-3">Home</div>
                    </Link>
                </Col>
            </Row>
            {favs.length ? (
                favs.map((fav, i) => {
                    return (
                        <Row className="align-items-center my-3" key={i}>
                            <Col xs={7}>
                                <Link to={`/${fav}`}><p className="m-0">{fav}</p></Link>
                            </Col>
                            <Col xs={2}>
                                <Button className="btn btn-danger rounded-pill m-0" onClick={() => {
                                    dispatch(removeFromFavs(fav))
                                }}>Remove</Button>
                            </Col>
                        </Row>
                    )
                })) : (
                <Alert variant="danger">No company is present in your list of favourites</Alert>
            )}
        </Container>
    )
}

export default ListOfFavourites