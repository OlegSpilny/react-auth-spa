import React from 'react';
import { 
  TabPane,
  Row, 
  Col,
} from 'reactstrap';

export default ({ index, children, ...rest }) => {
  return (
    <TabPane tabId={index}>
      <Row>
        <Col sm='12' className='mt-3'>
          { children }
        </Col>
      </Row>
    </TabPane>
  )  
};