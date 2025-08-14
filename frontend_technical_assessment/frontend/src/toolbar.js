export const PipelineToolbar = ({ onAddNode }) => {
  const nodeTypes = [
    { type: 'input', label: 'Input', icon: '📥' },
    { type: 'output', label: 'Output', icon: '📤' },
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'llm', label: 'LLM', icon: '🤖' },
    { type: 'math', label: 'Math', icon: '➕' },
    { type: 'filter', label: 'Filter', icon: '🔍' },
    { type: 'database', label: 'Database', icon: '🗄️' },
    { type: 'timer', label: 'Timer', icon: '⏰' },
    { type: 'webhook', label: 'Webhook', icon: '🌐' }
  ];

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3>Add Nodes:</h3>
        <div className="node-buttons">
          {nodeTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => onAddNode(type)}
              className="node-button"
              title={`Add ${label} node`}
            >
              <span className="node-icon">{icon}</span>
              <span className="node-label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};