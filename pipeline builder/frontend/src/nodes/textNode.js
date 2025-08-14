import { useState, useEffect, useRef } from 'react';
import { BaseNode } from '../nodes/baseNode';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 200, height: 120 });
  const textAreaRef = useRef(null);

  useEffect(() => {
    const variableRegex = /\{\{\s*(\w+)\s*\}\}/g;
    const foundVariables = [];
    let match;

    while ((match = variableRegex.exec(currText)) !== null) {
      if (!foundVariables.includes(match[1])) {
        foundVariables.push(match[1]);
      }
    }

    setVariables(foundVariables);
  }, [currText]);

  useEffect(() => {
    if (textAreaRef.current) {
      const textarea = textAreaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.max(60, textarea.scrollHeight + 10);
      const newWidth = Math.max(200, Math.min(400, currText.length * 8 + 50));
      
      setDimensions({ width: newWidth, height: newHeight + 80 });
      textarea.style.height = `${newHeight - 20}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <div 
      className="base-node text-node"
      style={{ 
        width: dimensions.width,
        height: dimensions.height,
        background: 'linear-gradient(135deg, var(--color-blue-50), var(--color-blue-100))',
        border: '2px solid var(--color-blue-200)'
      }}
    >
      
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={variable}
          style={{ 
            top: `${30 + (index * 25)}px`,
            background: 'var(--color-blue-400)'
          }}
          className="node-handle"
        />
      ))}

      <div className="node-header">
        <div className="node-icon">📝</div>
        <h3 className="node-title">Text</h3>
      </div>

      <div className="node-content">
        <div className="form-group">
          <label>Text:</label>
          <textarea
            ref={textAreaRef}
            value={currText}
            onChange={handleTextChange}
            className="node-textarea"
            placeholder="Enter text with {{variables}}"
            style={{ 
              width: '100%',
              minHeight: '60px',
              resize: 'none',
              overflow: 'hidden'
            }}
          />
        </div>
        {variables.length > 0 && (
          <div className="variables-info">
            <small>Variables: {variables.join(', ')}</small>
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: 'var(--color-blue-400)' }}
        className="node-handle"
      />
    </div>
  );
};