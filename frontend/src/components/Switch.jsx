import React from 'react';

const Switch = ({ isOn, handleSwitch }) => {
    return (
        <>
            <input
                checked={isOn}
                onChange={handleSwitch}
                className="react-switch-checkbox"
                id={`react-switch-new`}
                type="checkbox"
            />
            <label
                className="react-switch-label"
                htmlFor={`react-switch-new`}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default Switch