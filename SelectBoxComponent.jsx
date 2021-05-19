import React, { Component } from 'react';
import Select from 'react-select';
import chroma from 'chroma-js';

export const SelectBox = (options) => {
    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '" "',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });

    const data = { color: 'black' }
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma('#28a745');
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor:
                        !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
                },
            };
        },
        input: styles => ({ ...styles, ...dot() }),
        placeholder: styles => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };
    return (
        <Select
            defaultValue={null}
            // isClearable
            styles={{ menuPortal: base => ({ zIndex: 9999999 }) }}
            isSearchable
            name="color"
            menuPosition='absolute'
            menuPlacement='auto'
            // onChange={opt => {options.callBack(opt.value)}}
            onChange={opt => options.options.callBack(opt.value)}
            options={options.options.options}
            styles={colourStyles}

        />
    );
}