import React from 'react';
import { SelectBox } from './SelectBoxComponent'

const selectOptions = [
    { value: 'Delete', label: 'Delete', color: '#FF5630', isFixed: true },
    { value: 'Approve', label: 'Approve', color: '#36B37E' },
];

class checkboxList extends React.Component {

    render() {
        const {
        } = this.props;

        return (
            <SelectBox options={{ options: selectOptions, callBack: ''/*this.setSelectedOptions*/ }} />
        );
    }
}

export default checkboxList;