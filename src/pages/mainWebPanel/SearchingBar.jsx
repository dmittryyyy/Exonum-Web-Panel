import { React } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { ShowCatalog } from './requestComponents/ShowCatalog';

export const SearchingBar = ({ navBarItem, setNavBarItem, setDataJsonFormat, setDataTableFormat, setColumnsTable, dataJsonFormat }) => {

    const nodeBarItems = [
        { name: 'Search transaction', id: 1 },
        { name: 'Search order', id: 2 },
        { name: 'Service Application', id: 3 },
        { name: 'Search user wallet', id: 4 },
        { name: 'Search device key', id: 5 },
        { name: 'Search orders users', id: 6 },
    ];
    
    const hideTable = () => {
        setDataJsonFormat();
        setDataTableFormat();
    }

    return (
            <ListGroup>
            <h3>Choose type search</h3>
                {nodeBarItems.map((item, index) =>
                    <ListGroupItem
                        onClick={() => setNavBarItem(item)}
                        active={item.id === navBarItem.id}
                        key={index}
                    >
                        {item.name}
                    </ListGroupItem>
                )}
                            <div className="buttonListGroup">
                <ShowCatalog setDataJsonFormat={setDataJsonFormat} setDataTableFormat={setDataTableFormat} setColumnsTable={setColumnsTable}/>
                {dataJsonFormat ? (
        <button className='btnHideData' onClick={hideTable}>Hide data</button>
      ) : (
        ''
      )}
            </div>
            </ListGroup>
    )
}
