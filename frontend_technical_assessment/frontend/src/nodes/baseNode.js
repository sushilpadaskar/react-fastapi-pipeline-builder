import { Handle, Position } from 'reactflow';
import '../nodes/css/baseNode.css';

export const BaseNode = ({ 
  id, 
  data, 
  title, 
  description,
  inputs = [],
  outputs = [],
  children,
  className = '',
  color = 'blue',
  icon = null,
  minWidth = 200,
  minHeight = 100
}) => {
  return (
    <div className={`base-node ${className}`} style={{ 
      minWidth, 
      minHeight,
      background: `linear-gradient(135deg, var(--color-${color}-50), var(--color-${color}-100))`,
      border: `2px solid var(--color-${color}-200)`
    }}>
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={input.id || `input-${index}`}
          style={{ 
            top: `${20 + (index * 30)}px`,
            background: `var(--color-${color}-400)`
          }}
          className="node-handle"
        />
      ))}

      <div className="node-header">
        {icon && <div className="node-icon">{icon}</div>}
        <h3 className="node-title">{title}</h3>
      </div>

      <div className="node-content">
        {description && <p className="node-description">{description}</p>}
        {children}
      </div>

      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={output.id || `output-${index}`}
          style={{ 
            top: `${20 + (index * 30)}px`,
            background: `var(--color-${color}-400)`
          }}
          className="node-handle"
        />
      ))}
    </div>
  );
};