import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'milliseconds');
  const [repeat, setRepeat] = useState(data?.repeat || false);

  const getDelayInMs = () => {
    switch (unit) {
      case 'seconds': return delay * 1000;
      case 'minutes': return delay * 60 * 1000;
      case 'hours': return delay * 60 * 60 * 1000;
      default: return delay;
    }
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Timer"
      description="Add time delays and scheduling to workflows"
      inputs={[
        { id: 'trigger', label: 'Trigger' }
      ]}
      outputs={[
        { id: 'delayed', label: 'Delayed Output' }
      ]}
      color="pink"
      icon="⏰"
      className="timer-node"
      minWidth={220}
    >
      <div className="form-group">
        <label>Delay:</label>
        <input
          type="number"
          min="1"
          value={delay}
          onChange={(e) => setDelay(parseInt(e.target.value))}
          className="node-input"
        />
      </div>
      <div className="form-group">
        <label>Unit:</label>
        <select 
          value={unit} 
          onChange={(e) => setUnit(e.target.value)}
          className="node-select"
        >
          <option value="milliseconds">Milliseconds</option>
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
        </select>
      </div>
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={repeat}
            onChange={(e) => setRepeat(e.target.checked)}
          />
          Repeat
        </label>
      </div>
      <div className="delay-info">
        <small>Total delay: {getDelayInMs()}ms</small>
      </div>
    </BaseNode>
  );
};