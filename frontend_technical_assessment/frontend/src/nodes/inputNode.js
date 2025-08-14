import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      description="Data input node"
      outputs={[{ id: 'value' }]}
      color="green"
      icon="📥"
      className="input-node"
    >
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={currName}
          onChange={handleNameChange}
          className="node-input"
        />
      </div>
      <div className="form-group">
        <label>Type:</label>
        <select value={inputType} onChange={handleTypeChange} className="node-select">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};