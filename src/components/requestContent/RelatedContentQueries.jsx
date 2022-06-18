import { React } from 'react';
import { Accordion } from 'react-bootstrap';

import './RequestContent.scss';

export const RelatedContentQueries = ({ dataRelatedReq }) => {

  return (
    <div className='resultWrapper'>
      {dataRelatedReq ?
        <Accordion defaultActiveKey= '0' alwaysOpen>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>JSON Format</Accordion.Header>
            <Accordion.Body>
              <pre>{JSON.stringify(dataRelatedReq, null, 2)}</pre>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        : ''}
    </div>
  )
}
