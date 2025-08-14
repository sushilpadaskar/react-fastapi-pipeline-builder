import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const WebhookNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'POST');
  const [timeout, setTimeout] = useState(data?.timeout || 30);

  return (
    <BaseNode
      id={id}
      data={data}
      title="Webhook"
      description="Send HTTP requests to external APIs"
      inputs={[
        { id: 'payload', label: 'Payload' },
        { id: 'headers', label: 'Headers' },
        { id: 'auth', label: 'Auth' }
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'status', label: 'Status Code' },
        { id: 'error', label: 'Error' }
      ]}
      color="teal"
      icon="🌐"
      className="webhook-node"
      minWidth={280}
      minHeight={160}
    >
      <div className="form-group">
        <label>URL:</label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="node-input"
        />
      </div>
      <div className="form-group">
        <label>Method:</label>
        <select 
          value={method} 
          onChange={(e) => setMethod(e.target.value)}
          className="node-select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="form-group">
        <label>Timeout (seconds):</label>
        <input
          type="number"
          min="1"
          max="300"
          value={timeout}
          onChange={(e) => setTimeout(parseInt(e.target.value))}
          className="node-input"
        />
      </div>
    </BaseNode>
  );
};