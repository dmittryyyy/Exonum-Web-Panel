import { React } from 'react';
import { Accordion } from 'react-bootstrap';

import './RequestContent.scss';

export const RelatedContentQueries = ({ chainsDataJson, dataOnId }) => {

  return (
    <div className='resultWrapper'>
      {chainsDataJson.length > 0 ?
        <Accordion defaultActiveKey= '0' alwaysOpen>
          <Accordion.Item eventKey='0'>
            <Accordion.Header>JSON Format</Accordion.Header>
            <Accordion.Body>
              <pre>{JSON.stringify(chainsDataJson, null, 2)}</pre>
              <br />
              <pre>{JSON.stringify(dataOnId, null, 2)}</pre>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        : ''}
    </div>
  )
}
