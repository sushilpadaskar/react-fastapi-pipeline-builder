import { useCallback } from 'react';
import ReactFlow, { 
  Controls, 
  Background, 
  MiniMap,
  Panel, 
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { PipelineToolbar } from './toolbar';
import { SubmitButton } from './submit';
import { DatabaseNode } from './nodes/databaseNode';
import { FilterNode } from './nodes/filterNode';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { MathNode } from './nodes/mathNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { TimerNode } from './nodes/timerNode';
import { WebhookNode } from './nodes/webHook';
import './App.css';

export const nodeTypes = {
  input: InputNode,
  output: OutputNode,
  llm: LLMNode,
  text: TextNode,
  math: MathNode,
  filter: FilterNode,
  database: DatabaseNode,
  timer: TimerNode,
  webhook: WebhookNode
};

const initialNodes = [
  {
    id: '1',
    type: 'input',
    position: { x: 50, y: 100 },
    data: { inputName: 'user_input', inputType: 'Text' }
  },
  {
    id: '2',
    type: 'text',
    position: { x: 300, y: 50 },
    data: { text: 'Hello {{name}}, your age is {{age}} years!' }
  },
  {
    id: '3',
    type: 'llm',
    position: { x: 600, y: 100 },
    data: {}
  },
  {
    id: '4',
    type: 'output',
    position: { x: 850, y: 100 },
    data: { outputName: 'final_result', outputType: 'Text' }
  },
  
  {
    id: '5',
    type: 'math',
    position: { x: 50, y: 300 },
    data: { operation: 'multiply', precision: 2 }
  },
  {
    id: '6',
    type: 'filter',
    position: { x: 300, y: 250 },
    data: { condition: 'score', operator: 'greater', value: '80' }
  },
  {
    id: '7',
    type: 'database',
    position: { x: 600, y: 300 },
    data: { 
      query: 'SELECT * FROM users WHERE age > {{min_age}}',
      database: 'postgresql'
    }
  },
  {
    id: '8',
    type: 'timer',
    position: { x: 50, y: 500 },
    data: { delay: 5, unit: 'seconds', repeat: false }
  },
  {
    id: '9',
    type: 'webhook',
    position: { x: 350, y: 450 },
    data: { 
      url: 'https://api.example.com/notify',
      method: 'POST',
      timeout: 30
    }
  }
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    sourceHandle: 'value',
    targetHandle: 'name',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    sourceHandle: 'output',
    targetHandle: 'prompt',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    sourceHandle: 'response',
    targetHandle: 'value',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    sourceHandle: 'result',
    targetHandle: 'data',
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: 'e8-9',
    source: '8',
    target: '9',
    sourceHandle: 'delayed',
    targetHandle: 'payload',
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback((type) => {
    const newNode = {
      id: `${type}-${Date.now()}`,
      type,
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      data: getDefaultNodeData(type),
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const getDefaultNodeData = (type) => {
    const defaults = {
      input: { inputName: 'new_input', inputType: 'Text' },
      output: { outputName: 'new_output', outputType: 'Text' },
      text: { text: 'Enter text with {{variables}}' },
      llm: {},
      math: { operation: 'add', precision: 2 },
      filter: { condition: '', operator: 'equals', value: '' },
      database: { query: 'SELECT * FROM table', database: 'postgresql' },
      timer: { delay: 1000, unit: 'milliseconds', repeat: false },
      webhook: { url: '', method: 'POST', timeout: 30 }
    };
    return defaults[type] || {};
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1> Pipeline Builder</h1>
        <p>Demonstrating Node Abstraction with 9 Different Node Types</p>
      </div>

      <div className="toolbar-container">
        <PipelineToolbar onAddNode={addNode} />
      </div>

      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="react-flow"
        >
          <Controls />
          <Background color="#aaa" gap={16} />
          <MiniMap 
            nodeColor={(node) => {
              const colors = {
                input: '#10b981',
                output: '#ef4444', 
                text: '#3b82f6',
                llm: '#8b5cf6',
                math: '#f97316',
                filter: '#eab308',
                database: '#6366f1',
                timer: '#ec4899',
                webhook: '#14b8a6'
              };
              return colors[node.type] || '#6b7280';
            }}
          />
          
          <Panel position="Bottom-right">
            <SubmitButton />
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default App