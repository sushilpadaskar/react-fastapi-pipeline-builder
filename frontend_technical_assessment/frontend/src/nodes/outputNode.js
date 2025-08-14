import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      description="Data output node"
      inputs={[{ id: 'value' }]}
      color="red"
      icon="📤"
      className="output-node"
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
        <select value={outputType} onChange={handleTypeChange} className="node-select">
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};