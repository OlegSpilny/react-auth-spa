import React from 'react';
import { 
  Container,
  Row, 
  Col,
} from 'reactstrap';

export default ({ children, ...rest }) => {
  return (
  	<Container>
      <Row>
        <Col xs='12' md='6' lg='4' className='offset-md-3 offset-lg-4 mt-5'>
        	{ children }
        </Col>
      </Row>
    </Container>
  )
};