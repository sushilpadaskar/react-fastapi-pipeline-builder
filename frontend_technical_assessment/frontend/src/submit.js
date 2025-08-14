import { useState } from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const reactFlowInstance = useReactFlow();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      
      const nodes = reactFlowInstance.getNodes();
      const edges = reactFlowInstance.getEdges();
            
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes,
          edges: edges
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setLastResponse(result);
      
      const dagStatus = result.is_dag ? "Valid DAG" : " ontains cycles (not a DAG)";
      const message = `
      Pipeline Analysis Results:

      Nodes: ${result.num_nodes}
      Connections: ${result.num_edges}  
      Structure: ${dagStatus}

      ${result.is_dag ? 
       "Your pipeline is ready to execute! " : 
       "Warning: Cycles detected. Please review your connections. "
      }`;
      
      alert(message);
      
    } catch (error) {
      console.error('Error submitting pipeline:', error);
      alert(`Error submitting pipeline: ${error.message}\n\nMake sure the backend is running on http://localhost:8000`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className={`submit-button ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? ' Analyzing...' : ' Submit Pipeline'}
      </button>
      
      {lastResponse && (
        <div className="last-result">
          <small>
            Last result: {lastResponse.num_nodes} nodes, {lastResponse.num_edges} edges, 
            {lastResponse.is_dag ? ' Valid DAG' : ' Contains cycles'}
          </small>
        </div>
      )}
    </div>
  );
};