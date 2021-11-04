import React from 'react';

const Broker = ({broker}) => {

    const { name, address} = broker;

    return (         
        <tr>
            <td className="border px-4 py-2">{name}</td>
            <td className="border px-4 py-2">{address ? address : 'No tiene dirección ingresada'}</td>
        </tr>
     );
}
 
export default Broker;