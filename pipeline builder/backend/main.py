from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Set

app = FastAPI(title="VectorShift Pipeline API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Check if pipeline forms a DAG using DFS cycle detection."""
    if not nodes:
        return True
    
    node_ids: Set[str] = {node.id for node in nodes}
    
    graph: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    for edge in edges:
        if edge.source in node_ids and edge.target in node_ids:
            graph[edge.source].append(edge.target)
    
    state: Dict[str, int] = {node_id: 0 for node_id in node_ids}
    
    def has_cycle(node_id: str) -> bool:
        if state[node_id] == 1:  
            return True
        if state[node_id] == 2:  
            return False
        
        state[node_id] = 1  
        
        for neighbor in graph[node_id]:
            if has_cycle(neighbor):
                return True
        
        state[node_id] = 2  
        return False
    
    return not any(state[node_id] == 0 and has_cycle(node_id) for node_id in node_ids)

@app.get("/")
async def root():
    """Health check endpoint."""
    return {"message": "VectorShift Pipeline API", "status": "running"}

@app.post("/pipelines/parse", response_model=PipelineResponse)
async def parse_pipeline(pipeline: PipelineRequest):
    """Parse pipeline and return analysis."""
    try:
        return PipelineResponse(
            num_nodes=len(pipeline.nodes),
            num_edges=len(pipeline.edges),
            is_dag=is_dag(pipeline.nodes, pipeline.edges)
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Pipeline parsing failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)