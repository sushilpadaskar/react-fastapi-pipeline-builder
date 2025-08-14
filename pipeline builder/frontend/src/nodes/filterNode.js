import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      description="Filter data based on specified conditions"
      inputs={[
        { id: 'data', label: 'Data' }
      ]}
      outputs={[
        { id: 'passed', label: 'Passed' },
        { id: 'failed', label: 'Failed' }
      ]}
      color="yellow"
      icon="🔍"
      className="filter-node"
      minWidth={240}
    >
      <div className="form-group">
        <label>Field:</label>
        <input
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="e.g., age, price, status"
          className="node-input"
        />
      </div>
      <div className="form-group">
        <label>Operator:</label>
        <select 
          value={operator} 
          onChange={(e) => setOperator(e.target.value)}
          className="node-select"
        >
          <option value="equals">Equals (=)</option>
          <option value="not_equals">Not Equals (≠)</option>
          {/* <option value="greater">Greater Than (>)</option> */}
          {/* <option value="less">Less Than (<)</option> */}
          <option value="contains">Contains</option>
          <option value="starts_with">Starts With</option>
        </select>
      </div>
      <div className="form-group">
        <label>Value:</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Comparison value"
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};