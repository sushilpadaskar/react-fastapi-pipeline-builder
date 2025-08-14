import { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [precision, setPrecision] = useState(data?.precision || 2);

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const handlePrecisionChange = (e) => {
    setPrecision(parseInt(e.target.value));
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Math"
      description="Perform mathematical operations on numeric inputs"
      inputs={[
        { id: 'a', label: 'Number A' },
        { id: 'b', label: 'Number B' }
      ]}
      outputs={[
        { id: 'result', label: 'Result' }
      ]}
      color="orange"
      icon="➕"
      className="math-node"
      minWidth={220}
    >
      <div className="form-group">
        <label>Operation:</label>
        <select 
          value={operation} 
          onChange={handleOperationChange}
          className="node-select"
        >
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (-)</option>
          <option value="multiply">Multiplication (×)</option>
          <option value="divide">Division (÷)</option>
          <option value="power">Power (^)</option>
          <option value="modulo">Modulo (%)</option>
        </select>
      </div>
      <div className="form-group">
        <label>Decimal Places:</label>
        <input
          type="number"
          min="0"
          max="10"
          value={precision}
          onChange={handlePrecisionChange}
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};