import React, { useState } from 'react';
import { BaseNode } from '../nodes/baseNode';

export const DatabaseNode = ({ id, data }) => {
  const [query, setQuery] = useState(data?.query || 'SELECT * FROM users WHERE id = {{user_id}}');
  const [database, setDatabase] = useState(data?.database || 'postgresql');

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      description="Execute SQL queries against databases"
      inputs={[
        { id: 'connection', label: 'Connection' },
        { id: 'parameters', label: 'Parameters' }
      ]}
      outputs={[
        { id: 'results', label: 'Results' },
        { id: 'error', label: 'Error' }
      ]}
      color="indigo"
      icon="🗄️"
      className="database-node"
      minWidth={300}
      minHeight={140}
    >
      <div className="form-group">
        <label>Database Type:</label>
        <select 
          value={database} 
          onChange={(e) => setDatabase(e.target.value)}
          className="node-select"
        >
          <option value="postgresql">PostgreSQL</option>
          <option value="mysql">MySQL</option>
          <option value="sqlite">SQLite</option>
          <option value="mongodb">MongoDB</option>
        </select>
      </div>
      <div className="form-group">
        <label>Query:</label>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="node-textarea"
          rows={4}
          placeholder="Enter SQL query with {{parameters}}"
        />
      </div>
    </BaseNode>
  );
};